import { createSlice, nanoid } from "@reduxjs/toolkit";
import { seedPostsData } from "../../utils/seedData";

/* Reducer functions must always create new state values immutably, by making copies! 
 It's safe to call mutating functions like Array.push() 
 or modify object fields like state.someField = someValue inside of createSlice(), 
 because it converts those mutations into safe immutable updates internally 
 using the Immer library, but don't try to mutate any data outside of createSlice!
*/

const postsSlice = createSlice({
    name: 'posts',
    initialState: seedPostsData,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload); // safe to use because of Immer
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userId,
                        reactions: {
                            thumbsUp: 0,
                            hooray: 0,
                            heart: 0,
                            rocket: 0,
                            eyes: 0
                        }
                    }
                };
            },
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload;

            const existingPost = state.find(p => p.id === id);

            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
            }
        },
    },
});

export const { postAdded, postUpdated } = postsSlice.actions;

export default postsSlice.reducer;