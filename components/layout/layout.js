import { useContext } from "react";

import MainHeader from "./main-header.js";
import NotificationContext from "../../contexts/notification-context.js";
import Notification from '../notification/notification.js';

export default function Layout({ children }) {
    const context = useContext(NotificationContext);
    const notification = context.notification;
    return (
        <>
            <MainHeader />
            <main>{children}</main>
            {notification && (
                <Notification
                    title={notification.title}
                    message={notification.message}
                    status={notification.status}
                />
            )}
        </>
    );
}