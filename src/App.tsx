//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';
import theme from './theme';
import { Provider, useSelector } from 'react-redux';
import configureStore, { persistor } from 'store'
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Web3AuthProvider } from "context/web3Auth";
import { DAOProvider } from 'context/dao';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import routes from 'routes'
import PrivateRoute from 'components/PrivateRoute';
import { Toaster } from 'react-hot-toast';
export const store = configureStore();

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const App = () => {
	return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Web3AuthProvider>
                        <Router basename={''}>  
                                <Routes>
                                    {routes.map((route, index) => {
                                        return (
                                                <Route
                                                    element={
                                                        <DAOProvider privateRoute={route.private}>
                                                            <PrivateRoute
                                                                orRender={
                                                                    <route.layout>
                                                                        <route.component />
                                                                    </route.layout>
                                                                }
                                                                private={route.private}
                                                            />
                                                        </DAOProvider>
                                                    }
                                                    path={route.path}
                                                />
                                        );
                                    })}
                                    {/* <Route
                                        element={
                                                <PrivateRoute orRender= {
                                                <Landing>
                                                    <PageNotFound />
                                                </Landing>
                                            } 
                                        private={false}
                                        />}
                                        key={'notfound'}
                                        path={'*'}
                                    /> */}
                                </Routes>
                        </Router>
                    </Web3AuthProvider>
                    <Toaster position="bottom-right" />
                </PersistGate>
            </Provider>
        </ThemeProvider>
	);
};

export default App;
