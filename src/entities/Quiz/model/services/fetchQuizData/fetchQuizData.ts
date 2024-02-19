import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { type QuizEntityType } from '../../../types/quiz';

export const quizApi = createApi({
    reducerPath: 'quizApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    // tagTypes: ['Quiz'],
    endpoints: (build) => ({
        fetchQuizData: build.query<QuizEntityType[], void>({
            query: () => ({
                url: '/quizData',
            }),
            // providesTags: () => ['Quiz'],
        }),
    }),
});

export const { useFetchQuizDataQuery } = quizApi;
