import React, { type SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getNameUser, getResultQuizUser, quizActions, QuizCard, useFetchQuizDataQuery } from 'entities/Quiz';
import type { ResultQuizUser } from 'entities/Quiz/types/quiz';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from 'shared/ui/Button/Button';

import Input from '../../../shared/ui/Input/Input';
import { Typography } from '../../../shared/ui/Typography/Typography';

import styles from './SelectQuizList.module.scss';

export const SelectQuizList = () => {
    const { data: quizData, isLoading } = useFetchQuizDataQuery();
    const [selectedQuizCard, setSelectedQuizCard] = useState(1);
    const [isActiveQuiz, setIsActiveQuiz] = useState<number | undefined>();
    const [notPassedQuizData, setNotPassedQuizData] = useState<ResultQuizUser>({});
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const resultQuizUser = useSelector(getResultQuizUser)?.find((quiz) => quiz.currentTestId === selectedQuizCard);
    const nameUser = useSelector(getNameUser);

    useEffect(() => {
        setName(nameUser);
    }, [nameUser]);

    useEffect(() => {
        if (resultQuizUser) {
            // Для сохранения информации о выбранном тесте
            setNotPassedQuizData(resultQuizUser);
            // Если тест еще не пройден полностью, состояние меняет надпись кнопки
            setIsActiveQuiz(resultQuizUser.activeCurrentQuestion ? resultQuizUser.currentTestId : undefined);
        }
    }, [resultQuizUser, selectedQuizCard]);

    // Функция устанавливает текущую активную карточку теста, которую выбрал пользователь
    const onSetSelectedQuiz = useCallback((id: number) => {
        setSelectedQuizCard(id);
    }, []);

    const onHandleSubmitForm = (event: SyntheticEvent) => {
        event.preventDefault();
        if (!name) {
            return;
        }
        navigate(`/test/${selectedQuizCard}`);
        dispatch(quizActions.removeLastPassedTestByUser());
        if (!notPassedQuizData.activeCurrentQuestion) {
            dispatch(quizActions.removeResultQuizUser(selectedQuizCard));
        }
    };

    const onChangeInputName = useCallback(
        (value: string) => {
            setName(value);
            dispatch(quizActions.setNameUser(value));
        },
        [dispatch],
    );

    if (isLoading) {
        return <Typography tag="p">Загрузка!</Typography>;
    }

    return (
        <div className={styles.quizCardsWrapper}>
            {quizData?.map((quiz) => (
                <QuizCard
                    key={quiz.id}
                    id={quiz.id}
                    name={quiz.name}
                    onSetSelectedQuiz={onSetSelectedQuiz}
                    selectedQuizCard={selectedQuizCard}
                />
            ))}
            <form onSubmit={onHandleSubmitForm} className={styles.form}>
                <Input onChange={onChangeInputName} value={name} />
                <Button type="submit">
                    {isActiveQuiz === selectedQuizCard ? 'Продолжить прохождение теста' : 'Начать'}
                </Button>
            </form>
        </div>
    );
};
