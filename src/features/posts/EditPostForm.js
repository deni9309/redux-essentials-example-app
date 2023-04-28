import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

import { postUpdated, selectPostById } from "./postsSlice";
import { selectUserById } from "../users/usersSlice";

export const EditPostForm = ({
    match,
}) => {
    const { postId } = match.params;

    const post = useSelector(state => selectPostById(state, postId));
    const postAuthor = useSelector(state => selectUserById(state, post.user));

    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const dispatch = useDispatch();
    const history = useHistory();

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(postUpdated({ id: postId, title, content }));

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