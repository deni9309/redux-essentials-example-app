import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { fetchNotifications, selectAllNotifications } from '../features/notifications/notificationsSlice';

export const Navbar = () => {
    const dispatch = useDispatch();

    const notifications = useSelector(selectAllNotifications);
    const numberUnreadNotifications = notifications.filter(n => !n.read).length;

    const fetchNewNotifications = () => {
        dispatch(fetchNotifications());
    };

    let unreadNotificationsBadge;
    if (numberUnreadNotifications > 0) {
        unreadNotificationsBadge = (
            <span className="badge">{numberUnreadNotifications}</span>
        );
    }

    return (
        <nav>
            <section className='logo'>
                <h1 className='logo-title'>POST it</h1>

                <div className="navContent">
                    <div className="navLinks">
                        <NavLink to="/posts" className={isActive => isActive ? "active" : ""}>
                            Posts
                        </NavLink>

                        <NavLink to="/users" className={isActive => (isActive ? "active" : "")}>
                            Users
                        </NavLink>

                        <NavLink to="/notifications" className={isActive => isActive ? "active" : ""}>
                            Notifications {unreadNotificationsBadge}
                        </NavLink>
                    </div>
                    <button className="navButton" onClick={fetchNewNotifications}>
                        Refresh Notifications
                    </button>
                </div>
            </section>
        </nav>
    );
};
