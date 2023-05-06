// Import the RTK Query methods from React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define our single API slice object
export const apiSlice = createApi({
    reducerPath: 'api',   // defines the expected top-level state slice field (if omitted by default is `state.api`) 

    baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),

    endpoints: builder => ({
        getPosts: builder.query({   // The `getPosts` endpoint is a "query" operation that returns data
            query: () => '/posts'    // The URL for the request is '/fakeApi/posts'
        }),
        getPost: builder.query({
            query: postId => `/posts/${postId}`
        }),
        addNewPost: builder.mutation({
            query: initialPost => ({
                url: '/posts',
                method: 'POST',
                body: initialPost
            })
        }),
    }),
});


// Export the auto-generated hooks for all endpoints
export const {
    useGetPostsQuery,
    useGetPostQuery,
    useAddNewPostMutation
} = apiSlice;