import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

import { postUpdated } from "./postsSlice";

export const EditPostForm = ({ match }) => {
    const { postId } = match.params;

    const post = useSelector(state => state.posts.find(p => p.id === postId));
    const users = useSelector(state => state.users);

    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [userId, setUserId] = useState(post.user);

    const dispatch = useDispatch();
    const history = useHistory();

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);
    const onAuthorChanged = (e) => setUserId(e.target.value);

    const onSavePostClicked = () => {
        if (title && content && userId) {
            dispatch(postUpdated({ id: postId, title, content, user: userId }));

            history.push(`/posts/${postId}`);
        }
    };

    const canUpdate = Boolean(title) && Boolean(content) && Boolean(userId);

    const usersOptions = users.map(u => (
        <option key={u.id} value={u.id}>
            {u.name}
        </option>
    ));

    return (
        <section>
            <h2>Edit Your Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    {usersOptions}
                </select>

                <label htmlFor="postContent">Content:</label>
                <input
                    type="text"
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />

                <button type="button" onClick={onSavePostClicked} disabled={!canUpdate}>
                    Save Post
                </button>
            </form>
        </section>
    );
};