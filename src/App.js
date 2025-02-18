import React, { Fragment } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import { Navbar } from './app/Navbar';
import { PostsList } from './features/posts/PostsList';
import { AddPostForm } from './features/posts/AddPostForm';
import { SinglePostPage } from './features/posts/SinglePostPage';
import { EditPostForm } from './features/posts/EditPostForm';
import { UserPage } from './features/users/UserPage';
import { UsersList } from './features/users/UsersList';
import { NotificationsList } from './features/notifications/NotificationsList';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="App">
                <Switch>
                    <Route exact path="/notifications" component={NotificationsList} />
                    <Route exact path="/posts" render={() => (
                        <Fragment>
                            <AddPostForm />
                            <PostsList />
                        </Fragment>
                    )}
                    />
                    <Route exact path="/posts/:postId" component={SinglePostPage} />
                    <Route exact path="/editPost/:postId" component={EditPostForm} />
                    <Route exact path="/users" component={UsersList} />
                    <Route exact path="/users/:userId" component={UserPage} />
                    <Redirect to="/posts" />
                </Switch>
            </div>
        </Router>
    )
}

export default App;
