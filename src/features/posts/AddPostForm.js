import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postAdded } from "./postsSlice";

export const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');

    const dispatch = useDispatch();

    const users = useSelector(state => state.users);

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);
    const onAuthorChanged = (e) => setUserId(e.target.value);

    const onPublishPostClicked = () => {
        if (title && content && userId) {
            dispatch(postAdded(title, content, userId));

            setTitle('');
            setContent('');
            setUserId('');
        }
    };

    const canPublish = Boolean(title) && Boolean(content) && Boolean(userId);

    const usersOptions = users.map(u => (
        <option key={u.id} value={u.id}>
            {u.name}
        </option>
    ));

    return (
        <section>
            <h2>Add a New Post</h2>
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
                    <option value={ undefined}>--Select an author--</option>
                    {usersOptions}
                </select>

                <label htmlFor="postContent">Content:</label>
                <textarea
                    type="text"
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                    rows={5}
                ></textarea>

                <button type="button" onClick={onPublishPostClicked} disabled={!canPublish}>
                    Publish Post
                </button>
            </form>
        </section>
    );
};