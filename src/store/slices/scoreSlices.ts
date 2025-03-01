import { createSlice } from "@reduxjs/toolkit";

type ScoreState = {
    correct : number,
    incorrect: number;
    round: number;
    totalQuestions: number;
}

const initialState:ScoreState = {
    correct : 0,
    incorrect : 0,
    round : 1,
    totalQuestions : 1
}

const scoreSlice = createSlice({
    name : "score",
    initialState,
    reducers : {
        incrementCorrect(state){
            state.correct += 1;
            state.totalQuestions += 1;
            if(state.totalQuestions % 5 === 0){
                state.round+=1;
            }
        },
        incrementIncorrect(state){
            state.incorrect += 1;
            state.totalQuestions += 1;
            if (state.totalQuestions % 5 === 0) {
                state.round += 1;
            }
        },
        resetScore(state){
            state.correct = 0;
            state.incorrect = 0;
            state.round = 1;
            state.totalQuestions = 0;
        }
    }
})
export const { incrementCorrect, incrementIncorrect, resetScore } = scoreSlice.actions;
export const scoreReducer = scoreSlice.reducer;