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
import localData from "@/localData";

const { exampleImage, placeholderImage, placeholderImage2, MadelineImage } = localData.images;

type FetchedEventsProps = {
  isLoading: boolean;
  list: { [key: string]: any }[];
};

type FetchedUsersProps = {
  isLoading: boolean;
  list: { [key: string]: any }[];
};

type FetchedCurrentUserProps = {
  isLoading: boolean;
  details: { [key: string]: any };
};
type FetchedUserProps = {
  isLoading: boolean;
  details: { [key: string]: any };
};

type FetchedPagesProps = {
  homePage: {
    id: string;
    isLoading: boolean;
    sections: { [key: string]: any };
  };
};

type ApiContextType = {
  fetchedUsers: FetchedUsersProps;
  fetchedCurrentUser: FetchedCurrentUserProps;
  fetchedUser: FetchedUserProps;
  fetchedEvents: FetchedEventsProps;
  fetchedPages: FetchedPagesProps;
  getEvents: ({ setIsLoading }: { [key: string]: any }) => void;
  addEvent: ({ setIsLoading }: { [key: string]: any }) => void;
  updateEvent: ({ id, setIsLoading, ...fields }: { [key: string]: any }) => void;
  deleteEvent: ({ id, setIsLoading }: { [key: string]: any }) => void;
  getCurrentUser: ({ setIsLoading }: { [key: string]: any }) => void;
  getUser: ({ setIsLoading }: { [key: string]: any }) => void;
  getUsers: ({ setIsLoading }: { [key: string]: any }) => void;
  updateContent: ({ id, slug, setIsLoading, ...fields }: { [key: string]: any }) => void;
  updateUser: ({ id, setIsLoading, updatedFields }: { [key: string]: any }) => void;
  deleteUser: ({ id, setIsLoading }: { [key: string]: any }) => void;
};

export const ApiContext = createContext<ApiContextType | null>(null);

export default function ApiProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [fetchedEvents, setFetchedEvents] = useState<FetchedEventsProps>({
    isLoading: false,
    list: [],
  });

  const [fetchedUsers, setFetchedUsers] = useState<FetchedUsersProps>({
    isLoading: false,
    list: [],
  });

  const [fetchedCurrentUser, setFetchedCurrentUser] = useState<FetchedCurrentUserProps>({
    isLoading: false,
    details: {},
  });

  const [fetchedUser, setFetchedUser] = useState<FetchedCurrentUserProps>({
    isLoading: false,
    details: {},
  });

  const [fetchedPages, setFetchedPages] = useState<FetchedPagesProps>({
    homePage: {
      id: "",
      isLoading: true,
      sections: {
        header: {
          title: "Header",
          description: "Lorem Ipsum is simply dummy text of the  typesetting.",
          images: [{ id: "1", title: "", url: placeholderImage }],
        },

        features: {
          title: "features",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          images: [
            { id: "1", title: "", url: placeholderImage2 },
            { id: "2", title: "", url: placeholderImage2 },
            { id: "3", title: "", url: placeholderImage2 },
          ],

          items: [
            { title: "", descripiton: "", image: { id: "1", title: "", url: placeholderImage2 } },
            { title: "", descripiton: "", image: { id: "1", title: "", url: placeholderImage2 } },
            { title: "", descripiton: "", image: { id: "1", title: "", url: placeholderImage2 } },
          ],
        },

        contact: {
          title: "Contact section",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          images: [{ id: "1", title: "", url: placeholderImage }],
        },
      },
    },
  });

  const { currentUser, state } = useAuthContext();
  const { successAlert, errorAlert } = useAlert();

  const eventsCollectionRef = collection(db, "events");
  const usersCollectionRef = collection(db, "users");
  const websiteContentRef = collection(db, "website-content");

  // EVENTS
  const getEvents = async ({ setIsLoading = (_: boolean) => {} }) => {
    setIsLoading(true);
    setFetchedEvents((prev) => ({ ...prev, isLoading: true }));

    try {
      const orderedEventsQuery = query(eventsCollectionRef, orderBy("createdAt", "asc"));
      const res = await getDocs(orderedEventsQuery);
      const data = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFetchedEvents((prev) => ({ ...prev, isLoading: false, list: data }));

      // if (data[0].ttl instanceof Timestamp) {
      //   console.log(data[0].ttl.toDate(), ' fetchedData');
      // }
    } catch (err: any) {
      errorAlert(err.message || "Internal server error. Please try again later.");
      console.error(err, "=getEvents= request error");
    }
    setIsLoading(false);
    setFetchedEvents((prev) => ({ ...prev, isLoading: false }));
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
      successAlert("Event has been updated successfully.");
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

  // USERS
  const getCurrentUser = async ({ id = "", setIsLoading = (_: boolean) => {} }) => {
    setIsLoading(true);
    setFetchedCurrentUser((prev) => ({ ...prev, isLoading: true }));

    try {
      const userDocRef = doc(usersCollectionRef, id);
      const res = await getDoc(userDocRef);

      const data = { id: res.id, ...res.data() };
      setFetchedCurrentUser((prev) => ({ ...prev, details: data, isLoading: false }));
    } catch (err: any) {
      errorAlert(err.message || "Internal server error. Please try again later.");
      console.error(err, "=getCurrentUser= request error");
    }
    setIsLoading(false);
    setFetchedCurrentUser((prev) => ({ ...prev, isLoading: false }));
  };

  const getUser = async ({ id = "", setIsLoading = (_: boolean) => {} }) => {
    setIsLoading(true);
    setFetchedUser((prev) => ({ ...prev, isLoading: true }));

    try {
      const userDocRef = doc(usersCollectionRef, id);
      const res = await getDoc(userDocRef);

      const data = { id: res.id, ...res.data() };
      setFetchedUser((prev) => ({ ...prev, details: data, isLoading: false }));
    } catch (err: any) {
      errorAlert(err.message || "Internal server error. Please try again later.");
      console.error(err, "=getUser= request error");
    }
    setIsLoading(false);
    setFetchedUser((prev) => ({ ...prev, isLoading: false }));
  };

  const getUsers = async ({ setIsLoading = (_: boolean) => {} }) => {
    setIsLoading(true);
    setFetchedUsers((prev) => ({ ...prev, isLoading: true }));

    try {
      const orderedEventsQuery = query(usersCollectionRef, orderBy("createdAt", "asc"));
      const res = await getDocs(orderedEventsQuery);
      const data = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFetchedUsers((prev) => ({ ...prev, isLoading: false, list: data }));

    } catch (err: any) {
      errorAlert(err.message || "Internal server error. Please try again later.");
      console.error(err, "=getUsers= request error");
    }
    setIsLoading(false);
    setFetchedUsers((prev) => ({ ...prev, isLoading: false }));
  };

  const updateUser = async ({
    id = "",
    updatedFields = {},
    setIsLoading = (_: boolean) => {},
    callback = () => {},
  }) => {
    setIsLoading(true);

    try {
      const userDoc = doc(db, "users", id);
      await updateDoc(userDoc, updatedFields);
      getEvents({});
      successAlert("User information has been updated successfully.");
    } catch (err: any) {
      errorAlert(err.message || "Internal server error. Please try again later.");
      console.error(err, "=updateUser= request error");
    }
    setIsLoading(false);
    callback();
  };

  const deleteUser = async ({ id = "", callback = () => {}, setIsLoading = (_: boolean) => {} }) => {

    setIsLoading(true);

    try {
      const userDoc = doc(db, "users", id);
      await deleteDoc(userDoc);
     
      getUsers({});
      successAlert("User has been deleted successfully.");
      callback();
    } catch (err: any) {
      errorAlert(err.message || "Internal server error. Please try again later.");
      console.error(err, "=userEvent= request error");
    }
    setIsLoading(false);
  };

  // PARTICIPATIONRECORDS

  // WEBSITECONTENT
  const getContents = async ({ setIsLoading = (_: boolean) => {} }) => {
    setIsLoading(true);
    setFetchedPages((prev) => ({ ...prev, homePage: { ...prev.homePage, isLoading: true } }));
    try {
      const res = await getDocs(websiteContentRef);
      const data = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFetchedPages((prev) => ({
        ...prev,
        homePage: {
          id: data[0].id,
          isLoading: false,
          sections: { ...prev.homePage.sections, ...data[0] },
        },
      }));
    } catch (err: any) {
      errorAlert(err.message || "Internal server error. Please try again later.");
      console.error(err, "=getContents= request error");
    }
    setIsLoading(false);
    setFetchedPages((prev) => ({ ...prev, homePage: { ...prev.homePage, isLoading: false } }));
  };

  const updateContent = async ({ id = "", slug = "", setIsLoading = (_: boolean) => {}, ...fields }) => {
    setIsLoading(true);

    const filteredData = {
      [slug]: { ...Object.fromEntries(Object.entries(fields).filter(([_, v]) => v)) },
      updatedAt: new Date(),
    };

    console.log(filteredData, " filteredData");

    try {
      const contentDoc = doc(db, "website-content", id);
      await updateDoc(contentDoc, filteredData);
      getContents({});
      successAlert("Content has been updated successfully.");
    } catch (err: any) {
      errorAlert(err.message || "Internal server error. Please try again later.");
      console.error(err, "=updateContent= request error");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!currentUser?.uid) return;
    getCurrentUser({ id: currentUser?.uid });
    getUsers({})
  }, [currentUser,state.isDBUserCreated]);

  useEffect(() => {
    getContents({});
  }, []);

  return (
    <ApiContext.Provider
      value={{
        fetchedEvents,
        fetchedUsers,
        fetchedCurrentUser,
        fetchedUser,
        fetchedPages,
        getEvents,
        addEvent,
        deleteEvent,
        updateEvent,
        getCurrentUser,
        getUser,
        getUsers,
        updateContent,
        updateUser,
        deleteUser
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
