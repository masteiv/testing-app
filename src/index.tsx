import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/App';
import { setupStore } from './app/providers/store';
import { StoreProvider } from './app/providers/store/ui/StoreProvider/StoreProvider';

import 'app/styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <BrowserRouter>
        <StoreProvider store={setupStore()}>
            <App />
        </StoreProvider>
    </BrowserRouter>,
);
