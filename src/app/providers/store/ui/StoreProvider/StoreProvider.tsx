import { type ReactNode } from 'react';
import { Provider } from 'react-redux';

export const StoreProvider = ({ store, children }: { store: any; children: ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
};
