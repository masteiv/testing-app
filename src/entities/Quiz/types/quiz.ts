export interface QuizAnswerType {
    answer: string;
    value: string;
}

export interface QuizQuestionType {
    question: string;
    correctAnswerValue: string;
    id: number;
    answers: QuizAnswerType[];
}

export interface QuizEntityType {
    id: number;
    name: string;
    questions: QuizQuestionType[];
}

export interface ResultQuizUser {
    currentTestId?: number;
    nameTest?: string;
    selectedAnswersByUser?: Array<{
        idAnswer: number;
        selectedAnswerValue: number;
        rightAnswerValue: number;
    }>;
    countRightAnswers?: number;
    activeCurrentQuestion?: number;
    isLastTestPassedByUser?: boolean;
    passedDate?: string;
}

export interface QuizSliceState {
    quizReducer: {
        resultQuizUser: ResultQuizUser[];
        nameUser: string;
    };
}
