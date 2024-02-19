import { Wrapper } from 'shared/ui/Wrapper/Wrapper';
import { QuizLastPassedResult } from 'widgets/QuizLastPassedResult';
import { QuizResultList } from 'widgets/QuizResultList';

const ResultPage = () => {
    return (
        <Wrapper>
            <QuizLastPassedResult />
            <QuizResultList />
        </Wrapper>
    );
};

export default ResultPage;
