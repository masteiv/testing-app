import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routesConfig } from 'shared/config/routeConfig/routeConfig';

export const AppRoutes = () => {
    return (
        <Routes>
            {Object.values(routesConfig).map(({ element, path }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        <Suspense fallback="loading...">
                            <div>{element}</div>
                        </Suspense>
                    }
                />
            ))}
        </Routes>
    );
};
