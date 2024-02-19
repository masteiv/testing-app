import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { NAME_USER, RESULT_QUIZ_USER } from '../../../../shared/const/localStorage';
import { type ResultQuizUser } from '../../types/quiz';

interface QuizSliceState {
    resultQuizUser: ResultQuizUser[];
    nameUser: string;
}

const initialState: QuizSliceState = {
    resultQuizUser: [],
    nameUser: '',
};

export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        // Запись информации о тестах, которые проходил пользователь
        setResultQuizUser: (state, action: PayloadAction<ResultQuizUser>) => {
            const foundIndex = state.resultQuizUser.findIndex(
                (quiz) => quiz.currentTestId === action.payload.currentTestId,
            );
            if (foundIndex !== -1) {
                state.resultQuizUser.splice(foundIndex, 1, action.payload);
            } else {
                state.resultQuizUser.push(action.payload);
            }
            localStorage.setItem(RESULT_QUIZ_USER, JSON.stringify(state.resultQuizUser));
        },
        // Запись информации о тестах из localStorage
        setResultQuizUserFromLocalStorage: (state, action: PayloadAction<ResultQuizUser[]>) => {
            state.resultQuizUser = action.payload;
        },
        // Если пользователь проходит тест повторно, то удаляется данные об этом тесте
        removeResultQuizUser: (state, action: PayloadAction<number>) => {
            state.resultQuizUser = state.resultQuizUser.filter((quiz) => quiz.currentTestId !== action.payload);
            localStorage.setItem(RESULT_QUIZ_USER, JSON.stringify(state.resultQuizUser));
        },
        // Для удаления флага, который тест был пройден последним
        removeLastPassedTestByUser: (state) => {
            state.resultQuizUser = state.resultQuizUser.map((quiz) => {
                if (quiz.isLastTestPassedByUser) {
                    return { ...quiz, isLastTestPassedByUser: false };
                } else return { ...quiz };
            });
            localStorage.setItem(RESULT_QUIZ_USER, JSON.stringify(state.resultQuizUser));
        },
        setNameUser: (state, action: PayloadAction<string>) => {
            state.nameUser = action.payload;
            localStorage.setItem(NAME_USER, JSON.stringify(state.nameUser));
        },
    },
});

export const { actions: quizActions } = quizSlice;
export const { reducer: quizReducer } = quizSlice;
