import type { QuizSliceState } from '../../../types/quiz';

export const getNameUser = (state: QuizSliceState) => state?.quizReducer?.nameUser;
