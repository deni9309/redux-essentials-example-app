import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { fetchNotifications } from '../features/notifications/notificationsSlice';

export const Navbar = () => {
    const dispatch = useDispatch();

    const fetchNewNotifications = () => {
        dispatch(fetchNotifications());
    };

    return (
        <nav>
            <section>
                <h1>REDux Social Feed</h1>

                <div className="navContent">
                    <div className="navLinks">
                        <NavLink to="/posts" className={isActive => isActive ? "active" : ""}>
                            Posts
                        </NavLink>

                        <NavLink to="/users" className={isActive => (isActive ? "active" : "")}>
                            Users
                        </NavLink>

                        <NavLink to="/notifications" className={isActive => isActive ? "active" : ""}>
                            Notifications
                        </NavLink>
                    </div>
                    <button className="button" onClick={fetchNewNotifications}>
                        Refresh Notifications
                    </button>
                </div>
            </section>
        </nav>
    );
};
