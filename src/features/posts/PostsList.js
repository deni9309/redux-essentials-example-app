import React, { useMemo } from "react";
import classnames from "classnames";

import { useGetPostsQuery } from "../api/apiSlice";

import { Spinner } from "../../components/Spinner";
import { PostExcerpt } from "./PostExcerpt";

export const PostsList = () => {
    const {
        data: posts = [],
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetPostsQuery();

    const sortedPosts = useMemo(() => {
        const orderedPosts = posts.slice();

        orderedPosts.sort((a, b) => b.date.localeCompare(a.date));

        return orderedPosts;
    }, [posts]);

    let content;
    if (isLoading) {
        content = <Spinner text="Loading..." />

    } else if (isSuccess) {
        const renderedPosts = sortedPosts.map(post => (
            <PostExcerpt key={post.id} post={post} />
        ));

        const containerClassname = classnames('posts-container', {
            disabled: isFetching
        });

        content = <div className={containerClassname}>{renderedPosts}</div>

    } else if (isError) {
        content = <div>{error.toString()}</div>
    }

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            <button onClick={refetch}>Refetch Posts</button>
            {content}
        </section>
    );
};