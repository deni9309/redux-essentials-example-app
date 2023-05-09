// Import the RTK Query methods from React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define our single API slice object
export const apiSlice = createApi({
    reducerPath: 'api',   // defines the expected top-level state slice field (if omitted by default is `state.api`) 

    baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),

    tagTypes: ['Post'],

    endpoints: builder => ({
        getPosts: builder.query({     // The `getPosts` endpoint is a "query" operation that returns data
            query: () => '/posts',    // The URL for the request is '/fakeApi/posts'
            providesTags: (result = [], error, arg) => [
                'Post',
                ...result.map(({ id }) => ({ type: 'Post', id }))
            ]
        }),
        getPost: builder.query({
            query: postId => `/posts/${postId}`,
            providesTags: (result, error, arg) => [{ type: 'Post', id: arg }]
        }),
        addNewPost: builder.mutation({
            query: initialPost => ({
                url: '/posts',
                method: 'POST',
                body: initialPost
            }),
            invalidatesTags: ['Post']
        }),
        editPost: builder.mutation({
            query: post => ({
                url: `/posts/${post.id}`,
                method: 'PATCH',
                body: post
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }]
        }),
        addReaction: builder.mutation({
            query: ({ postId, reaction }) => ({
                url: `/posts/${postId}/reactions`,
                method: 'POST',
                body: { reaction }
            }),
            async onQueryStarted({ postId, reaction }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    // `updateQueryData` requires an endpoint and cache key args, to know which piece of cache state to update
                    apiSlice.util.updateQueryData('getPosts', undefined, draft => {

                        // `draft` is Immer-wrapped and can be "mutated" like in createSlice
                        const post = draft.find(post => post.id === postId);
                        if (post) {
                            post.reactions[reaction]++;
                        }
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            }
        }),
    })
});


// Export the auto-generated hooks for all endpoints
export const {
    useGetPostsQuery,
    useGetPostQuery,
    useAddNewPostMutation,
    useEditPostMutation,
    useAddReactionMutation,
} = apiSlice;