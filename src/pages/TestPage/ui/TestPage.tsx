import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getNameUser, useFetchQuizDataQuery } from 'entities/Quiz';
import { Wrapper } from 'shared/ui/Wrapper/Wrapper';
import { QuestionForm } from 'widgets/QuestionForm/ui/QuestionForm';

const TestPage = () => {
    const { data: quizData } = useFetchQuizDataQuery();
    const { id } = useParams();
    const nameUser = useSelector(getNameUser);
    let foundQuiz;
    if (id && quizData) {
        foundQuiz = quizData?.find((quiz) => quiz.id === +id);
    }

    return <Wrapper>{foundQuiz && nameUser && <QuestionForm quizData={foundQuiz} currentTestId={id} />}</Wrapper>;
};

export default TestPage;
