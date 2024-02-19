import { type QuizSliceState } from '../../../types/quiz';

export const getResultQuizUser = (state: QuizSliceState) => state?.quizReducer?.resultQuizUser;
