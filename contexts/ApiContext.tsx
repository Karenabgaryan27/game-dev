"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { db, auth } from "@/config/firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import useAlert from "@/hooks/alert/useAlert";
import { useAuthContext } from "./AuthContext";

type StateType = {
  // movies: {id: string, name: string, releaseDate: number, receivedAnOscar: boolean, country:string}[]
  events: { isLoading: boolean; list: { [key: string]: any }[] };
  users: {}[];
};

type ApiContextType = {
  fetchedData: StateType;
  fetchedUser: {[key:string]: any}
  setFetchedData: (newState: StateType) => void;
  getEvents: ({ setIsLoading }: { [key: string]: any }) => void;
  addEvent: ({ setIsLoading }: { [key: string]: any }) => void;
  updateEvent: ({ id, setIsLoading, ...fields }: { [key: string]: any }) => void;
  deleteEvent: ({ id, setIsLoading }: { [key: string]: any }) => void;
  getUser: ({ setIsLoading }: { [key: string]: any }) => void;
};

export const ApiContext = createContext<ApiContextType | null>(null);

export default function ApiProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [fetchedData, setFetchedData] = useState<StateType>({
    events: {
      isLoading: false,
      list: [],
    },
    users: [],
  });

  const [fetchedUser,setFetchedUser] = useState<{[key:string]:any}>({})

  const {currentUser} = useAuthContext()
  const { successAlert, errorAlert } = useAlert();

  const eventsCollectionRef = collection(db, "events");
  const usersCollectionRef = collection(db, "users");

  const getEvents = async ({ setIsLoading = (_: boolean) => {} }) => {
    setIsLoading(true);
    setFetchedData((prev) => ({ ...prev, events: { ...prev.events, isLoading: true } }));

    try {
      const orderedMoviesQuery = query(eventsCollectionRef, orderBy("createdAt", "desc"));
      const res = await getDocs(orderedMoviesQuery);
      const data = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFetchedData((prev) => ({ ...prev, events: { isLoading: false, list: data } }));

      // if (data[0].ttl instanceof Timestamp) {
      //   console.log(data[0].ttl.toDate(), ' fetchedData');
      // }
    } catch (err: any) {
      errorAlert(err.message || "Internal server error. Please try again later.");
      console.error(err, "=getEvents= request error");
    }
    setIsLoading(false);
    setFetchedData((prev) => ({ ...prev, events: { ...prev.events, isLoading: false } }));
  };

  const addEvent = async ({
    setIsLoading = (_: boolean) => {},
    expires = 0,
    callback = () => {},
    ...fields
  }) => {
    setIsLoading(true);

    const filteredData = {
      ...Object.fromEntries(Object.entries(fields).filter(([_, v]) => v)),
      ...(expires > 1 ? { ttl: Timestamp.fromDate(new Date(expires)) } : {}),
      createdAt: new Date(),
      createdBy: auth?.currentUser?.displayName,
      userId: auth?.currentUser?.uid,
    };

    try {
      const res = await addDoc(eventsCollectionRef, filteredData);
      getEvents({});
      console.log(res);
      successAlert("Event has been created successfully.");
    } catch (err: any) {
      errorAlert(err.message || "Internal server error. Please try again later.");
      console.error(err, "=addEvent= request error");
    }
    setIsLoading(false);
    callback();
  };

  const updateEvent = async ({
    id = "",
    expires = 0,
    callback = () => {},
    setIsLoading = (_: boolean) => {},
    ...fields
  }) => {
    setIsLoading(true);

    const filteredData = {
      ...Object.fromEntries(Object.entries(fields).filter(([_, v]) => v)),
      ...(expires > 1 ? { ttl: Timestamp.fromDate(new Date(expires)) } : {}),
      updatedAt: new Date(),
    };

    try {
      const movieDoc = doc(db, "events", id);
      await updateDoc(movieDoc, filteredData);
      getEvents({});
      successAlert("Movie has been updated successfully.");
    } catch (err: any) {
      errorAlert(err.message || "Internal server error. Please try again later.");
      console.error(err, "=updateEvent= request error");
    }
    setIsLoading(false);
    callback();
  };

  const deleteEvent = async ({ id = "", callback = () => {}, setIsLoading = (_: boolean) => {} }) => {
    setIsLoading(true);
    try {
      const movieDoc = doc(db, "events", id);
      await deleteDoc(movieDoc);
      getEvents({});
      successAlert("Event has been deleted successfully.");
    } catch (err: any) {
      errorAlert(err.message || "Internal server error. Please try again later.");
      console.error(err, "=deleteEvent= request error");
    }
    setIsLoading(false);
    callback();
  };

  const getUser = async ({ id = "", setIsLoading = (_: boolean) => {} }) => {
    setIsLoading(true);

    try {
      const userDocRef = doc(usersCollectionRef, id);
      const res = await getDoc(userDocRef);

      if (res.exists()) {
        const data = { id: res.id, ...res.data() };
        setFetchedUser(data)
        console.log(data);
      } else {
        console.log("No such document!");
      }
    } catch (err: any) {
      errorAlert(err.message || "Internal server error. Please try again later.");
      console.error(err, "=getUser= request error");
    }
    setIsLoading(false);
  };

    useEffect(() => {
      if(!currentUser?.uid) return
      getUser({id: currentUser?.uid})
      
    }, [currentUser]);

  return (
    <ApiContext.Provider
      value={{
        fetchedData,
        ...fetchedData,
        fetchedUser,
        setFetchedData,
        getEvents,
        addEvent,
        deleteEvent,
        updateEvent,
        getUser,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}

export const useApiContext = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApiContext must be used within an ApiProvider");
  }
  return context;
};
