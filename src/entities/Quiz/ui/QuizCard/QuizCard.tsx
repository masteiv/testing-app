import classNames from 'classnames';

import styles from './QuizCard.module.scss';

interface QuizCardProps {
    name: string;
    onSetSelectedQuiz: (id: number) => void;
    id: number;
    selectedQuizCard: number;
}

export const QuizCard = ({ name, onSetSelectedQuiz, id, selectedQuizCard }: QuizCardProps) => {
    const classNamesQuizCard = classNames({
        [styles.quizCard]: true,
        [styles.quizCardActive]: id === selectedQuizCard,
    });

    return (
        <article
            onClick={() => {
                onSetSelectedQuiz(id);
            }}
            className={classNamesQuizCard}
        >
            {name}
        </article>
    );
};
