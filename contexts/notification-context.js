import { createContext, useState } from "react";

const NotificationContext = createContext({
    notification: null, // {title, message, status}
    showNotification() { notification },
    hideNotification() { }
});

export function NotificationContextProvider({ children }) {
    const [activeNotification, setActiveNotification] = useState(null);

    function showNotificationHandler(notification) {
        setActiveNotification(notification);
    }
    function hideNotificationHandler() {
        setActiveNotification(null);
    }

    const ctx = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler
    }

    return (
        <NotificationContext.Provider value={ctx}>
            {children}
        </NotificationContext.Provider>
    );
}

export default NotificationContext;