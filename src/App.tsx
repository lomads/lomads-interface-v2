//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';
import theme from './theme';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Provider, useSelector } from 'react-redux';
import configureStore, { persistor } from 'store'
import { PersistGate } from 'redux-persist/lib/integration/react';
import { SafeNFTsProvider } from "context/safeNFTs";
import { Web3AuthProvider } from "context/web3Auth";
import { DAOProvider } from 'context/dao';
import { SafeTokensProvider } from "context/safeTokens";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from 'routes'
import PrivateRoute from 'components/PrivateRoute';
import { Toaster } from 'react-hot-toast';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
//
import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { goerli, arbitrum, avalanche, base, gnosis, optimism, polygon } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
//
export const store = configureStore();

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const client = new ApolloClient({
    uri: "https://hub.snapshot.org/graphql",
    cache: new InMemoryCache()
});

//
// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy(alchemy.com) and Infura(infura.io)
const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet, goerli, arbitrum, avalanche, base, gnosis, optimism, polygon],
    [publicProvider()],
)

// Set up wagmi config
const config = createConfig({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({ chains }),
        new CoinbaseWalletConnector({
            chains,
            options: {
                appName: 'wagmi',
            },
        }),
        new WalletConnectConnector({
            chains,
            options: {
                projectId: '...',
            },
        }),
        new InjectedConnector({
            chains,
            options: {
                name: 'Injected',
                shimDisconnect: true,
            },
        }),
    ],
    publicClient,
    webSocketPublicClient,
})
//
const App = () => {
    return (
        <WagmiConfig config={config}>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <ApolloProvider client={client}>
                        <PersistGate persistor={persistor}>
                            <Web3AuthProvider>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <Router basename={''}>
                                        <Routes>
                                            {routes.map((route, index) => {
                                                return (
                                                    <Route
                                                        element={
                                                            <DAOProvider privateRoute={route.private}>
                                                                <SafeNFTsProvider>
                                                                    <SafeTokensProvider>
                                                                        <PrivateRoute
                                                                            orRender={
                                                                                <route.layout>
                                                                                    <route.component />
                                                                                </route.layout>
                                                                            }
                                                                            private={route.private}
                                                                        />
                                                                    </SafeTokensProvider>
                                                                </SafeNFTsProvider>
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
                                </LocalizationProvider>
                            </Web3AuthProvider>
                            <Toaster position="bottom-right" />
                        </PersistGate>
                    </ApolloProvider>
                </Provider>
            </ThemeProvider>
        </WagmiConfig>
    );
};

export default App;
