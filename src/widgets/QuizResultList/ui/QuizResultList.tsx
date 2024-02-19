import { useSelector } from 'react-redux';
import { getResultQuizUser, QuizResultPercent } from 'entities/Quiz';
import { Typography } from 'shared/ui/Typography/Typography';

import styles from './QuizResultList.module.scss';

export const QuizResultList = () => {
    const resultQuizData = useSelector(getResultQuizUser);

    return (
        <div className={styles.wrapper}>
            <Typography tag="h3">История пройденных тестов:</Typography>
            <div className={styles.wrapperList}>
                {resultQuizData
                    ?.filter((quizData) => !quizData.isLastTestPassedByUser)
                    .map((quizInfo) => (
                        <div key={quizInfo.currentTestId}>
                            <Typography tag="p">Название теста: {quizInfo.nameTest}</Typography>
                            <QuizResultPercent quizData={quizInfo} />
                            <Typography tag="p">Дата прохождения теста: {quizInfo?.passedDate}</Typography>
                        </div>
                    ))}
            </div>
        </div>
    );
};
