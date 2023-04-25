import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
    { id: '1', title: 'First Post!', content: 'Hello Redux!', user: '2' },
    { id: '2', title: 'Second Post', content: 'Hello from ReactJS', user: '1' }
];

/* Reducer functions must always create new state values immutably, by making copies! 
 It's safe to call mutating functions like Array.push() 
 or modify object fields like state.someField = someValue inside of createSlice(), 
 because it converts those mutations into safe immutable updates internally 
 using the Immer library, but don't try to mutate any data outside of createSlice!
*/

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload); // safe to use because of Immer
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        user: userId,
                    }
                };
            },
        },
        postUpdated(state, action) {
            const { id, title, content, user } = action.payload;

            const existingPost = state.find(p => p.id === id);

            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
                existingPost.user = user
            }
        },
    },
});

export const { postAdded, postUpdated } = postsSlice.actions;

export default postsSlice.reducer;