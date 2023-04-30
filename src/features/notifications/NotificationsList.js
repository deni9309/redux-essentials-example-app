import React from "react";
import { useSelector } from "react-redux";
import { formatDistanceToNow, parseISO } from "date-fns";

import { selectAllUsers } from '../users/usersSlice';
import { selectAllNotifications } from "./notificationsSlice";

export const NotificationsList = () => {
    const notifications = useSelector(selectAllNotifications);
    const users = useSelector(selectAllUsers);

    const renderedNotifications = notifications.map(n => {
        const date = parseISO(n.date);
        const timeAgo = formatDistanceToNow(date);

        const user = users.find(user => user.id === n.user) || {
            name: 'Unknown User'
        };

        return (
            <article key={n.id} className="notification">
                <div>
                    <b>{user.name}</b> {n.message}
                </div>
                <div title={n.date}>
                    <i>{timeAgo} ago.</i>
                </div>
            </article>
        );
    });

    return (
        <section className="notificationsList">
            <h2>Notifications</h2>
            {renderedNotifications}
        </section>
    );
};

