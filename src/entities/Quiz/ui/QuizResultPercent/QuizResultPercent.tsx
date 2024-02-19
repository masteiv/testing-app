import classNames from 'classnames';
import { Typography } from 'shared/ui/Typography/Typography';

import { type ResultQuizUser } from '../../types/quiz';

import styles from './QuizResultPercent.module.scss';

export const QuizResultPercent = ({ quizData }: { quizData: ResultQuizUser }) => {
    let percentPassedQuiz = 0;

    if (quizData?.countRightAnswers && quizData?.selectedAnswersByUser) {
        percentPassedQuiz = (quizData.countRightAnswers * 100) / quizData.selectedAnswersByUser.length;
    }

    const percentLabelClassNames = classNames({
        [styles.unsatisfactoryPercent]: percentPassedQuiz <= 50,
        [styles.satisfactoryPercent]: percentPassedQuiz >= 51 && percentPassedQuiz <= 75,
        [styles.goodPercent]: percentPassedQuiz > 75,
    });

    return (
        <Typography tag="h2">
            Ваши баллы:{' '}
            {percentPassedQuiz ? (
                <Typography tag="span" className={percentLabelClassNames}>
                    {percentPassedQuiz}%
                </Typography>
            ) : (
                'Нет данных'
            )}
        </Typography>
    );
};
