import { type RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { ResultPage } from 'pages/ResultPage';
import { TestPage } from 'pages/TestPage';

export enum AppRoutes {
    MAIN = 'main',
    TEST = 'test',
    RESULT = 'result',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.TEST]: '/test',
    [AppRoutes.RESULT]: '/result',
};

export const routesConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.TEST]: {
        path: RoutePath.test,
        element: <TestPage />,
    },
    [AppRoutes.RESULT]: {
        path: RoutePath.result,
        element: <ResultPage />,
    },
};
