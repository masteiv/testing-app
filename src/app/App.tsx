import { useEffect } from 'react';

import { quizActions } from '../entities/Quiz';
import type { ResultQuizUser } from '../entities/Quiz/types/quiz';
import { NAME_USER, RESULT_QUIZ_USER } from '../shared/const/localStorage';
import { useAppDispatch } from '../shared/lib/hooks/useAppDispatch/useAppDispatch';

import { AppRoutes } from './providers/routes';

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const resultQuizUserStorage: ResultQuizUser[] = JSON.parse(localStorage.getItem(RESULT_QUIZ_USER) || '[]');
        const nameUser: string = JSON.parse(localStorage.getItem(NAME_USER) || '""');

        dispatch(quizActions.setResultQuizUserFromLocalStorage(resultQuizUserStorage));
        dispatch(quizActions.setNameUser(nameUser));
    }, [dispatch]);

    return (
        <div className="App">
            <AppRoutes />
        </div>
    );
}

export default App;
