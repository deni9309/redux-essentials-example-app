import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav>
            <section>
                <h1>REDux Social Feed</h1>

                <div className="navContent">
                    <div className="navLinks">
                        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                            Posts
                        </NavLink>
                    </div>
                </div>
            </section>
        </nav>
    )
};
