"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { db, auth } from "@/config/firebase";
import {
  collection,
  setDoc,
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

const { exampleImage, placeholderImage, eventPlaceholderImage, MadelineImage } = localData.images;

type FetchedEventsProps = {
  isLoading: boolean;
  list: { [key: string]: any }[];
};
type FetchEventsHistoryRecordsProps = {
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
  setFetchedCurrentUser: (_: any) => void;
  fetchedUser: FetchedUserProps;
  fetchedEvents: FetchedEventsProps;
  fetchEventsHistoryRecords: FetchEventsHistoryRecordsProps;
  fetchedPages: FetchedPagesProps;

  getEvents: ({ setIsLoading }: { [key: string]: any }) => void;
  addEvent: ({ setIsLoading }: { [key: string]: any }) => void;
  updateEvent: ({ id, setIsLoading, ...fields }: { [key: string]: any }) => void;
  deleteEvent: ({ id, setIsLoading }: { [key: string]: any }) => void;
  addEventParticipationRecord: ({ setIsLoading }: { [key: string]: any }) => void;
  updateEventParticipationRecord: ({ setIsLoading }: { [key: string]: any }) => void;
  deleteEventParticipationRecord: ({ setIsLoading }: { [key: string]: any }) => void;
  getEventParticipationRecords: ({ setIsLoading }: { [key: string]: any }) => void;

  addEventsHistoryRecord: ({}: { [key: string]: any }) => Promise<void>;
  updateEventsHistoryRecord: ({}: { [key: string]: any }) => Promise<void>;
  getEventsHistoryRecord: ({}: { [key: string]: any }) => Promise<void>;
  getEventsHistoryRecords: ({}: { [key: string]: any }) => Promise<void>;

  getUser: ({ setIsLoading }: { [key: string]: any }) => void;
  getUsers: ({ setIsLoading }: { [key: string]: any }) => void;
  updateUser: ({ id, setIsLoading, updatedFields }: { [key: string]: any }) => void;
  deleteUser: ({ id, setIsLoading }: { [key: string]: any }) => void;
  updateUserCollection: ({
    userId,
    collectionName,
    collectionId,
    setIsLoading,
    updatedFields,
  }: {
    [key: string]: any;
  }) => void;
  getUserCollection: ({ userId, collectionName, collectionId, setIsLoading }: { [key: string]: any }) => void;

  updateContent: ({ id, slug, setIsLoading, ...fields }: { [key: string]: any }) => void;
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
  const [fetchEventsHistoryRecords, setFetchEventsHistoryRecords] = useState<FetchEventsHistoryRecordsProps>({
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
            { id: "1", title: "", url: eventPlaceholderImage },
            { id: "2", title: "", url: eventPlaceholderImage },
            { id: "3", title: "", url: eventPlaceholderImage },
          ],

          items: [
            { title: "", descripiton: "", image: { id: "1", title: "", url: eventPlaceholderImage } },
            { title: "", descripiton: "", image: { id: "1", title: "", url: eventPlaceholderImage } },
            { title: "", descripiton: "", image: { id: "1", title: "", url: eventPlaceholderImage } },
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

  const addEvent = async ({ setIsLoading = (_: boolean) => {}, fields = {}, callback = () => {} }) => {
    setIsLoading(true);

    console.log(fields);
    try {
      const res = await addDoc(eventsCollectionRef, fields);
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
    updatedFields = {},
    callback = () => {},
    setIsLoading = (_: boolean) => {},
  }) => {
    setIsLoading(true);

    try {
      const eventDoc = doc(db, "events", id);
      await updateDoc(eventDoc, updatedFields);
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
      const eventDoc = doc(db, "events", id);
      await deleteDoc(eventDoc);
      getEvents({});
      successAlert("Event has been deleted successfully.");
    } catch (err: any) {
      errorAlert(err.message || "Internal server error. Please try again later.");
      console.error(err, "=deleteEvent= request error");
    }
    setIsLoading(false);
    callback();
  };

  const addEventParticipationRecord = async ({
    eventId = "",
    fields = {},
    setIsLoading = (_: boolean) => {},
    callback = () => {},
  }) => {
    setIsLoading(true);
    try {
      await addDoc(collection(db, "events", eventId, "participationRecords"), fields);
      // getEvents({});
      successAlert("Record has been created successfully.");
    } catch (err: any) {
      errorAlert(err.message || "Internal server error. Please try again later.");
      console.error(err, "=addEventParticipationRecord= request error");
    }
    setIsLoading(false);
    callback();
  };

  const updateEventParticipationRecord = async ({
    eventId = "",
    recordId = "",
    fields = {},
    setIsLoading = (_: boolean) => {},
    callback = () => {},
  }) => {
    setIsLoading(true);
    try {
      await updateDoc(doc(db, "events", eventId, "participationRecords", recordId), fields);
      // getEvents({});
      successAlert("Record has been updated successfully.");
    } catch (err: any) {
      errorAlert(err.message || "Internal server error. Please try again later.");
      console.error(err, "=updateEventParticipationRecord= request error");
    }
    setIsLoading(false);
    callback();
  };

  const deleteEventParticipationRecord = async ({
    eventId = "",
    recordId = "",
    setIsLoading = (_: boolean) => {},
    callback = () => {},
  }) => {
    setIsLoading(true);
    try {
      await deleteDoc(doc(db, "events", eventId, "participationRecords", recordId));
      // getEvents({});
      successAlert("Record has been deleted successfully.");
    } catch (err: any) {
      errorAlert(err.message || "Internal server error. Please try again later.");
      console.error(err, "=deleteEventParticipationRecord= request error");
    }
    setIsLoading(false);
    callback();
  };

  const getEventParticipationRecords = async ({
    eventId = "",
    setIsLoading = (_: boolean) => {},
    successCallback = (_: any) => {},
  }) => {
    setIsLoading(true);

    try {
      const res = await getDocs(collection(db, "events", eventId, "participationRecords"));
      const data = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      successCallback({ data });
    } catch (err: any) {
      errorAlert(err.message || "Internal server error. Please try again later.");
      console.error(err, "=getEventParticipationRecords= request error");
    }
    setIsLoading(false);
  };

  // EVENTSHISTORY
  const addEventsHistoryRecord = async ({
    participantId = "",
    fields = {},
    successCallback = () => {},
    setIsLoading = (_: boolean) => {},
  }) => {
    setIsLoading(true);
    try {
      await setDoc(doc(db, "eventsHistory", participantId), fields);
      successCallback();
    } catch (err: any) {
      errorAlert(err.message || "Internal server error. Please try again later.");
      console.error(err, "=addEventsHistoryRecord= request error");
    }
    setIsLoading(false);
  };
  const updateEventsHistoryRecord = async ({
    participantId = "",
    updatedFields = {},
    successCallback = () => {},
    setIsLoading = (_: boolean) => {},
  }) => {
    setIsLoading(true);
    try {
      await updateDoc(doc(db, "eventsHistory", participantId), updatedFields);
      successCallback();
    } catch (err: any) {
      errorAlert(err.message || "Internal server error. Please try again later.");
      console.error(err, "=updateEventsHistoryRecord= request error");
    }
    setIsLoading(false);
  };
  const getEventsHistoryRecord = async ({
    participantId = "",
    successCallback = (_: any) => {},
    setIsLoading = (_: boolean) => {},
  }) => {
    setIsLoading(true);
    try {
      const res = await getDoc(doc(db, "eventsHistory", participantId));
      const data = { id: res.id, ...res.data() };
      successCallback({ data });
    } catch (err: any) {
      errorAlert(err.message || "Internal server error. Please try again later.");
      console.error(err, "=getEventsHistoryRecord= request error");
    }
    setIsLoading(false);
  };
  const getEventsHistoryRecords = async ({
    successCallback = (_: any) => {},
    setIsLoading = (_: boolean) => {},
  }) => {
    setIsLoading(true);
    setFetchEventsHistoryRecords(prev=>({...prev, isLoading:true}))
    try {
      const res = await getDocs(collection(db, "eventsHistory"));
      const data = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      successCallback({ data });
      setFetchEventsHistoryRecords(prev=>({...prev,list: data, isLoading:true}))
    } catch (err: any) {
      errorAlert(err.message || "Internal server error. Please try again later.");
      console.error(err, "=getEventsHistoryRecords= request error");
    }
    setIsLoading(false);
    setFetchEventsHistoryRecords(prev=>({...prev, isLoading:false}))
  };

  // USERS

  const getUser = async ({ id = "", setIsLoading = (_: boolean) => {} }) => {
    setIsLoading(true);
    setFetchedUser((prev) => ({ ...prev, isLoading: true }));

    try {
      const [res, res2] = await Promise.all([
        getDoc(doc(usersCollectionRef, id)),
        getDoc(doc(db, "users", id, "media", "banner")),
      ]);
      const data = { id: res.id, ...res.data() };
      const mediaData = { id: res2.id, ...res2.data() };

      if (currentUser?.uid === id) {
        setFetchedCurrentUser((prev) => ({
          ...prev,
          details: { ...data, collectionMedia: { ...mediaData } },
          isLoading: false,
        }));
      } else {
        setFetchedUser((prev) => ({
          ...prev,
          details: { ...data, collectionMedia: { ...mediaData } },
          isLoading: false,
        }));
      }
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
      getUsers({});
      successAlert("User information has been updated successfully.");
    } catch (err: any) {
      errorAlert(err.message || "Internal server error. Please try again later.");
      console.error(err, "=updateUser= request error");
    }
    setIsLoading(false);
    callback();
  };

  const updateUserCollection = async ({
    userId = "",
    collectionName = "",
    collectionId = "",
    updatedFields = {},
    setIsLoading = (_: boolean) => {},
    callback = () => {},
  }) => {
    setIsLoading(true);

    try {
      await setDoc(doc(db, "users", userId, collectionName, collectionId), updatedFields, { merge: true });
      // await addDoc(collection(db, "users", userId, "gallery"), {
      //   updatedFields,
      // });
      // await updateDoc(doc(db, "users", userId, collectionName, collectionId), {
      //   updatedFields,
      // });
      // getUser({id: userId});
      // getUsers({});
    } catch (err: any) {
      errorAlert(err.message || "Internal server error. Please try again later.");
      console.error(err, "=updateUserCollection= request error");
    }
    setIsLoading(false);
    callback();
  };

  const getUserCollection = async ({
    userId = "",
    collectionName = "",
    collectionId = "",
    setIsLoading = (_: boolean) => {},
    callback = () => {},
  }) => {
    setIsLoading(true);
    console.log(userId, collectionName, collectionId);
    try {
      await getDoc(doc(db, "users", userId, collectionName, collectionId));
    } catch (err: any) {
      errorAlert(err.message || "Internal server error. Please try again later.");
      console.error(err, "=updateUserCollection= request error");
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
    getUser({ id: currentUser?.uid });
    getUsers({});
    getEventsHistoryRecords({})
  }, [currentUser, state.isDBUserCreated]);

  useEffect(() => {
    getContents({});
  }, []);

  return (
    <ApiContext.Provider
      value={{
        fetchedEvents,
        fetchedUsers,
        fetchEventsHistoryRecords,
        fetchedCurrentUser,
        setFetchedCurrentUser,
        fetchedUser,
        fetchedPages,

        getEvents,
        addEvent,
        deleteEvent,
        updateEvent,
        addEventParticipationRecord,
        updateEventParticipationRecord,
        deleteEventParticipationRecord,
        getEventParticipationRecords,

        addEventsHistoryRecord,
        updateEventsHistoryRecord,
        getEventsHistoryRecord,
        getEventsHistoryRecords,

        getUser,
        getUsers,
        updateUser,
        deleteUser,
        updateUserCollection,
        getUserCollection,

        updateContent,
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
