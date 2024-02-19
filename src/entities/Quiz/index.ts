export type { QuizAnswerType, QuizEntityType, QuizQuestionType } from './types/quiz';
export { quizApi, useFetchQuizDataQuery } from '../Quiz/model/services/fetchQuizData/fetchQuizData';
export { QuizCard } from './ui/QuizCard/QuizCard';
export { quizReducer, quizActions } from './model/slice/QuizSlice';
export { getResultQuizUser } from './model/selectors/getResultQuizUser/getResultQuizUser';
export { QuizResultPercent } from './ui/QuizResultPercent/QuizResultPercent';
export { getNameUser } from './model/selectors/getNameUser/getNameUser';
