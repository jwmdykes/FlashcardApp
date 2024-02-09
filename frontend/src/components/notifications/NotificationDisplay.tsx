"use client";

import { useNotifications } from "./NotificationContext";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { LayoutGroup } from "framer-motion";

const NotificationDisplay = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed bottom-0 right-0 m-4 space-y-2 flex flex-col gap-2">
      <LayoutGroup>
        <AnimatePresence>
          {notifications.map(({ id, message, type }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              onClick={() => removeNotification(id)}
              layout
              transition={{
                duration: 0.2,
                layout: {
                  duration: 0.3,
                },
              }}
              className={`flex gap-4 justify-center items-center rounded-t-md px-6 py-6 shadow-md border-b-4 hover:cursor-pointer ${
                type === "success" ? "bg-green-200" : "bg-red-200"
              } ${type === "success" ? "border-green-400" : "border-red-400"}`}
            >
              <div
                className={`flex justify-center items-center rounded-full h-8 w-8 ${
                  type === "success" ? "bg-green-400" : "bg-red-400"
                }`}
              >
                <FontAwesomeIcon
                  icon={type === "success" ? faCheck : faX}
                  className="text-white"
                ></FontAwesomeIcon>
              </div>
              {message}
            </motion.div>
          ))}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
};

export default NotificationDisplay;
