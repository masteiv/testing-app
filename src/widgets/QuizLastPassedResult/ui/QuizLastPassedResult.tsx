import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getNameUser, getResultQuizUser, quizActions, QuizResultPercent } from 'entities/Quiz';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Typography } from 'shared/ui/Typography/Typography';

import styles from './QuizLastPassedResult.module.scss';

export const QuizLastPassedResult = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [resultQuizData] = useSelector(getResultQuizUser)?.filter(
        (resultQuizData) => resultQuizData.isLastTestPassedByUser,
    );
    const nameUser = useSelector(getNameUser);
    const [isDisabledBtn, setIsDisabledBtn] = useState(false);

    useEffect(() => {
        if (!resultQuizData) {
            setIsDisabledBtn(true);
        }
    }, [resultQuizData]);

    // Функция обработчик, если пользователь решит пройти тест заново
    const onClickButtonAgainHandler = useCallback(() => {
        if (resultQuizData?.currentTestId) {
            navigate(`/test/${resultQuizData?.currentTestId}`);
            dispatch(quizActions.removeLastPassedTestByUser());
            dispatch(quizActions.removeResultQuizUser(resultQuizData.currentTestId));
        }
    }, [dispatch, navigate, resultQuizData?.currentTestId]);

    // Функция обработчик, для перехода на главную страницу
    const onClickButtonMainPageRedirectHandler = useCallback(() => {
        navigate('/');
    }, [navigate]);

    return (
        <div className={styles.wrapper}>
            <Typography tag="h2">Ваше имя: {nameUser}</Typography>
            <Typography tag="h1">Последний пройденный тест:</Typography>
            <Typography tag="h2">Название теста: {resultQuizData?.nameTest ?? 'Нет данных'}</Typography>
            <QuizResultPercent quizData={resultQuizData} />
            <Typography tag="p">Дата прохождения теста: {resultQuizData?.passedDate ?? 'Нет данных'}</Typography>
            <div className={styles.btnWrapper}>
                <Button onClick={onClickButtonAgainHandler} disabled={isDisabledBtn}>
                    Пройти тест еще раз
                </Button>
                <Button onClick={onClickButtonMainPageRedirectHandler} theme={ButtonTheme.SECOND}>
                    На главную страницу
                </Button>
            </div>
        </div>
    );
};
