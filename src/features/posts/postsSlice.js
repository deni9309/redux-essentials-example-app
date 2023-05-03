import {
    createSlice,
    createAsyncThunk,
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { client } from "../../api/client";

/* Reducer functions must always create new state values immutably, by making copies! 
 It's safe to call mutating functions like Array.push() 
 or modify object fields like state.someField = someValue inside of createSlice(), 
 because it converts those mutations into safe immutable updates internally 
 using the Immer library, but don't try to mutate any data outside of createSlice!
*/

// managing normalized state with createEntityAdapter -> puts data in shape like: { ids: [], entities: {} }
const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
});

const initialState = postsAdapter.getInitialState({
    status: 'idle',
    error: null,
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts');

    return response.data;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await client.post('/fakeApi/posts', initialPost);

    return response.data;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload;
            const existingPost = state.entities[postId]; //state.posts.find(p => p.id === postId);

            if (existingPost) {
                existingPost.reactions[reaction]++; // not mutating (using Immer)
            }
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload;

            const existingPost = state.entities[id]; //state.posts.find(p => p.id === id);

            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';

                // Add any fetched posts to the array
                // Use 'upsertMany' reducer as a 'mutating' update utility
                postsAdapter.upsertMany(state, action.payload); //state.posts = state.posts.concat(action.payload);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';

                state.error = action.error.message;
            })
            .addCase(addNewPost.fulfilled, postsAdapter.addOne) //.addCase(addNewPost.fulfilled, (state, action) => {
        //      state.posts.push(action.payload); // not mutating state -> using Immer library
        // });
    },
});

export const { postAdded, reactionAdded, postUpdated } = postsSlice.actions;

export default postsSlice.reducer;

// Export the customized selectors for 'postsAdapter' using 'getSelectors'
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postsAdapter.getSelectors(state => state.posts);

// creating 'memoized' selector so UserPage will rerender only if 'posts' or 'userId' have changed
export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.user === userId)
);

// handwritten selectors
// export const selectAllPosts = (state) => state.posts.posts;
// export const selectPostById = (state, postId) =>
//     state.posts.posts.find(p => p.id === postId);