import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { quizApi, quizReducer } from 'entities/Quiz';

const rootReducer = combineReducers({
    [quizApi.reducerPath]: quizApi.reducer,
    quizReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(quizApi.middleware),
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
