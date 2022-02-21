import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { StoreProvider } from './contexts/storeContext';
import store from './stores';
import ErrorPage from './components/ErrorPage';
import RegistrationForm from './components/RegistrationForm';

const App = (): JSX.Element | null => {
    return (
        <ErrorBoundary FallbackComponent={ErrorPage}>
            <StoreProvider store={store}>
                <RegistrationForm />
            </StoreProvider>
        </ErrorBoundary>
    );
};

export default App;
