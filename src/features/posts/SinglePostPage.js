import React from "react";
import { Link } from 'react-router-dom';

import { useGetPostQuery } from "../api/apiSlice";
import { Spinner } from "../../components/Spinner";

import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";

export const SinglePostPage = ({ match }) => {
    const { postId } = match.params;

    const { data: post, isFetching, isSuccess, isError } = useGetPostQuery(postId);

    let content;
    if (isFetching) {
        content = <Spinner text="Loading..." />
    } else if (isSuccess) {
        content = (
            <article className="post">
                <h2>{post.title}</h2>
                <div>
                    <PostAuthor userId={post.user} />
                    <TimeAgo timestamp={post.date} />
                    <hr />
                </div>
                <p className="post-content">{post.content}</p>
                <ReactionButtons post={post} />
                <Link to={`/editPost/${post.id}`} className="button">Edit Post</Link>
            </article>
        );
    }
    else if (isError) {
        content = <article><h2>Post not found!</h2></article>
    }

    return (
        <section>
            {content}
        </section>
    );
};