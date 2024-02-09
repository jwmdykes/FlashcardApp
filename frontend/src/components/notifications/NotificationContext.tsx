"use client";

import React, { Key, createContext, useContext, useId, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface Notification {
  message: string;
  type: "success" | "failure" | "";
  id: Key;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id">) => void;
  removeNotification: (id: Key) => void;
}

const defaultContextValue: NotificationContextType = {
  notifications: [],
  addNotification: () => {},
  removeNotification: () => {},
};

const NotificationContext =
  createContext<NotificationContextType>(defaultContextValue);

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification: (notification: Omit<Notification, "id">) => void = ({
    message,
    type,
  }) => {
    const id = uuidv4();
    setNotifications((prev) => {
      if (prev.length > 3) {
        prev.shift();
      }
      return [...prev, { id, message, type }];
    });
    setTimeout(() => removeNotification(id), 2000);
  };

  const removeNotification = (id: Key) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
