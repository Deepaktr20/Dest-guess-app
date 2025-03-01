import { configureStore } from "@reduxjs/toolkit";
import { scoreReducer,incrementCorrect,incrementIncorrect,resetScore } from "./slices/scoreSlices";

const store=configureStore({
    reducer:{
        score:scoreReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export { store, incrementCorrect,incrementIncorrect,resetScore }