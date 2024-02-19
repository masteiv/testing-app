import { type ChangeEvent, type SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getResultQuizUser, quizActions, type QuizEntityType } from 'entities/Quiz';
import QuizQuestion from 'entities/Quiz/ui/QuizQuestion/QuizQuestion';
import { formatDate } from 'shared/lib/date/date';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from 'shared/ui/Button/Button';
import { Typography } from 'shared/ui/Typography/Typography';

import styles from './QuestionForm.module.scss';
interface QuestionFormProps {
    quizData: QuizEntityType;
    currentTestId?: string;
}

export const QuestionForm = ({ quizData, currentTestId }: QuestionFormProps) => {
    const [activeCurrentQuestion, setActiveCurrentQuestion] = useState(0);
    const [selectedAnswerId, setSelectedAnswerId] = useState('');
    const [isDisabledBtn, setIsDisabledBtn] = useState(true);
    const currentQuestion = quizData.questions[activeCurrentQuestion];
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const resultQuizUser = useSelector(getResultQuizUser)?.find((quiz) => quiz.currentTestId === +currentTestId!);

    // Устанавливается в стейт вопрос из текущего теста на котором был пользователь в последний раз, если произойдет перезагрузка страницы, пользователь будет направлен на тот вопрос, на котором он находился в последний раз
    useEffect(() => {
        if (resultQuizUser?.activeCurrentQuestion) {
            setActiveCurrentQuestion(resultQuizUser.activeCurrentQuestion);
        }
    }, [resultQuizUser?.activeCurrentQuestion]);

    const onHandleSubmitQuestionForm = (event: SyntheticEvent) => {
        event.preventDefault();
        if (!selectedAnswerId) {
            return;
        }
        let selectedAnswersData = [];
        let countRightAnswers = resultQuizUser?.countRightAnswers || 0;
        const activeQuestion = activeCurrentQuestion + 1;

        if (resultQuizUser?.selectedAnswersByUser && Array.isArray(resultQuizUser?.selectedAnswersByUser)) {
            selectedAnswersData = [...resultQuizUser?.selectedAnswersByUser];
            selectedAnswersData.push({
                idAnswer: currentQuestion.id,
                selectedAnswerValue: +selectedAnswerId,
                rightAnswerValue: +currentQuestion.correctAnswerValue,
            });
        } else {
            selectedAnswersData.push({
                idAnswer: currentQuestion.id,
                selectedAnswerValue: +selectedAnswerId,
                rightAnswerValue: +currentQuestion.correctAnswerValue,
            });
        }

        if (currentQuestion.correctAnswerValue === selectedAnswerId) {
            countRightAnswers++;
        }

        // Если пользователь находится на последнем вопросе, он будет перенаправлен на страницу результатов
        if (activeCurrentQuestion === quizData.questions.length - 1) {
            navigate('/result');
            dispatch(
                quizActions.setResultQuizUser({
                    currentTestId: quizData.id,
                    nameTest: quizData.name,
                    activeCurrentQuestion: undefined,
                    selectedAnswersByUser: selectedAnswersData,
                    countRightAnswers,
                    isLastTestPassedByUser: true,
                    passedDate: formatDate(new Date()),
                }),
            );
        } else {
            // Переход пользователя на следующий вопрос
            setActiveCurrentQuestion((prevState) => ++prevState);
            setSelectedAnswerId('');
            setIsDisabledBtn(true);
            dispatch(
                quizActions.setResultQuizUser({
                    currentTestId: quizData.id,
                    nameTest: quizData.name,
                    activeCurrentQuestion: activeQuestion,
                    selectedAnswersByUser: selectedAnswersData,
                    countRightAnswers,
                }),
            );
        }
    };

    const onAnswerChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSelectedAnswerId(event.target.value);
        setIsDisabledBtn(false);
    }, []);

    return (
        <>
            <Typography tag="h2">{currentQuestion.question}</Typography>
            <form onSubmit={onHandleSubmitQuestionForm}>
                <div className={styles.formWrapper}>
                    {currentQuestion.answers.map((answer) => (
                        <QuizQuestion
                            key={answer.answer}
                            id={answer.value}
                            value={answer.value}
                            label={answer.answer}
                            onAnswerChangeHandler={onAnswerChangeHandler}
                            name="answer"
                        />
                    ))}
                </div>
                <Button disabled={isDisabledBtn} type="submit">
                    Ответить
                </Button>
            </form>
        </>
    );
};
