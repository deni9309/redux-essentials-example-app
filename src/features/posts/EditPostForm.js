import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

import { selectUserById } from "../users/usersSlice";
import { useGetPostQuery, useEditPostMutation } from "../api/apiSlice";

export const EditPostForm = ({
    match,
}) => {
    const { postId } = match.params;

    const { data: post } = useGetPostQuery(postId);
    const [updatePost, { isLoading }] = useEditPostMutation();
    const postAuthor = useSelector(state => selectUserById(state, post.user));

    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const history = useHistory();

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);

    const onSavePostClicked = async () => {
        if (title && content) {
            await updatePost({ id: postId, title, content });

            history.push(`/posts/${postId}`);
        }
    };

    const canUpdate = Boolean(title) && Boolean(content);

    return (
        <section>
            <h2 className="no-margin-bottom">Edit Post</h2>
            <hr />
            <cite>by {postAuthor?.name || `Unknown author`}</cite>
            <form>
                <div className="mark">
                    <label htmlFor="postTitle">Post Title:</label>
                    <input
                        type="text"
                        id="postTitle"
                        name="postTitle"
                        value={title}
                        onChange={onTitleChanged}
                    />
                </div>

                <label htmlFor="postContent">Content:</label>
                <textarea
                    type="text"
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                    rows={5}
                ></textarea>

                <button type="button" onClick={onSavePostClicked} disabled={!canUpdate}>
                    Save Post
                </button>
            </form>
        </section>
    );
};