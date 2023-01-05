import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { pokemonDataSliceReducer } from "./pokemonCardSlice";
import { pokemonDetailSliceReducer } from "./pokemonDetailSlice";
import { imageSliceReducer } from "./pokemonImageSlice";
import { pokemonLikeReducer } from "./pokemonLikeSlice";

// store 생성.
export const store = configureStore({
    // store에 등록할 리듀서들. 
    reducer: {
        imageType: imageSliceReducer,
        pokemonData: pokemonDataSliceReducer,
        detailData: pokemonDetailSliceReducer,
        likeData: pokemonLikeReducer
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();