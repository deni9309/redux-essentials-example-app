import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Spinner } from "../../components/Spinner";
import { selectAllUsers } from "../users/usersSlice";
import { useAddNewPostMutation } from "../api/apiSlice";

export const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');

    const [addNewPost, { isLoading }] = useAddNewPostMutation();
    const users = useSelector(selectAllUsers);

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);
    const onAuthorChanged = (e) => setUserId(e.target.value);

    const canPublish = [title, content, userId].every(Boolean) && !isLoading;

    const onPublishPostClicked = async () => {
        if (canPublish) {
            try {
                await addNewPost({ title, content, user: userId }).unwrap();

                setTitle('');
                setContent('');
                setUserId('');
            } catch (err) {
                console.error('Failed to save the post on server: ', err);
            }
        }
    };

    const usersOptions = users.map(u => (
        <option key={u.id} value={u.id}>
            {u.name}
        </option>
    ));

    const spinner = isLoading ? <Spinner size="30px" /> : null;

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
                    <option value={undefined}>--Select an author--</option>
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
                {spinner}
            </form>
        </section>
    );
};