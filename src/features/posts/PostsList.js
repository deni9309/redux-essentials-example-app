import React, { useMemo } from "react";

import { useGetPostsQuery } from "../api/apiSlice";

import { Spinner } from "../../components/Spinner";
import { PostExcerpt } from "./PostExcerpt";

export const PostsList = () => {
    // const dispatch = useDispatch();

    // const orderedPostIds = useSelector(selectPostIds);

    // const postStatus = useSelector(state => state.posts.status);
    // const error = useSelector(state => state.posts.error);

    // useEffect(() => {
    //     if (postStatus === 'idle') {
    //         dispatch(fetchPosts());
    //     }
    // }, [postStatus, dispatch]);

    const {
        data: posts = [],
        isLoading,
        isSuccess,
        isError,
        error
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
        content = sortedPosts.map(post => (
            <PostExcerpt key={post.id} post={post} />
        ));
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {content}
        </section>
    );
};