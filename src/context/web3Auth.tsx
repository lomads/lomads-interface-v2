import React from "react";
import { get as _get } from "lodash";
import { ADAPTER_EVENTS, WALLET_ADAPTER_TYPE } from "@web3auth/base";
import type { LOGIN_PROVIDER_TYPE } from "@toruslabs/openlogin";
import { ethers } from "ethers";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CoinbaseAdapter } from "@web3auth/coinbase-adapter";
import Web3Token from "web3-token";
import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { CHAIN_CONFIG } from "constants/chainConfig";
import { WEB3AUTH_NETWORK, CHAIN_IDS_TO_NAMES } from "constants/chains";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";
import { useAppSelector } from "helpers/useAppSelector";
import { useAppDispatch } from "helpers/useAppDispatch";
import {
  logoutAction,
  setTokenAction,
  setUserAction,
} from "store/actions/session";

const whiteLabel = {
  name: "Lomads",
  defaultLanguage: "en",
  dark: false,
};

export const Web3AuthContext = createContext<any>({
  web3Auth: null,
  provider: null,
  w3Provider: null,
  chainId: null,
  account: null,
  isLoading: false,
  login: async (
    adapter: WALLET_ADAPTER_TYPE,
    provider?: LOGIN_PROVIDER_TYPE,
    login_hint?: string
  ) => {},
  logout: async () => {},
  switchChain: async (chainId: string) => {},
});

export function useWeb3Auth() {
  return useContext(Web3AuthContext);
}

interface IWeb3AuthState {
  children?: React.ReactNode;
}

interface IWeb3AuthProps {
  children?: ReactNode;
}

export const Web3AuthProvider: FunctionComponent<IWeb3AuthState> = ({
  children,
}: IWeb3AuthProps) => {
  const dispatch = useAppDispatch();
  const { web3AuthNetwork = "", chain = "" } = useAppSelector(
    (store: any) => store.session
  );
  const [web3Auth, setWeb3Auth] = useState<Web3AuthNoModal | null>(null);
  const [state, setState] = useState<any>({
    w3Provider: null,
    provider: null,
    account: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleAccountsChanged = async () => {
    try {
      await localStorage.clear();
      sessionStorage.clear();
      dispatch(setTokenAction(null));
      dispatch(setUserAction(null));
      dispatch(logoutAction());
      await logout();
      await localStorage.setItem("MANUAL_DISCONNECT", "true");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (window?.ethereum)
      //@ts-ignore
      window?.ethereum.on("accountsChanged", handleAccountsChanged);
    return () => {
      if (window?.ethereum)
        //@ts-ignore
        window?.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const subscribeAuthEvents = (web3auth: Web3AuthNoModal) => {
      // Can subscribe to all ADAPTER_EVENTS and LOGIN_MODAL_EVENTS
      web3auth.on(ADAPTER_EVENTS.CONNECTED, async (data: unknown) => {
        if (web3auth && web3auth?.provider) {
          const provider = new ethers.providers.Web3Provider(
            web3auth?.provider
          );
          const signer = provider.getSigner();
          const account = await signer.getAddress();
          const { chainId } = await provider.getNetwork();
          setState({
            provider: provider,
            account: account,
            chainId,
            w3Provider: web3auth?.provider,
          });
        }
      });

      web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
        console.log("connecting");
      });

      web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
        console.log("disconnected");
      });

      web3auth.on(ADAPTER_EVENTS.ERRORED, (error: unknown) => {
        console.error("some error or user has cancelled login request", error);
      });
    };

    async function getChainId() {
      try {
        if (!window?.ethereum) {
          console.log("MetaMask is not installed");
          return;
        }
        const provider = new ethers.providers.Web3Provider(window?.ethereum);
        const network = await provider.getNetwork();
        const chainId = network.chainId;
        return chainId;
      } catch (error) {
        return null;
      }
    }

    async function init() {
      try {
        setIsLoading(true);
        const clientId = _get(WEB3AUTH_NETWORK, `cyan.clientId`);
        const chainId = await getChainId();
        const chainName: any = CHAIN_IDS_TO_NAMES[`${chainId}`];

        if (!chainName) {
          console.log("Wrong network");
          return;
        }

        const web3AuthInstance = new Web3AuthNoModal({
          web3AuthNetwork: "cyan",
          chainConfig: _get(CHAIN_CONFIG, chainName, "polygon"),
          enableLogging: true,
          clientId: clientId || "",
        });

        subscribeAuthEvents(web3AuthInstance);
        const torusPlugin = new TorusWalletConnectorPlugin({
          torusWalletOpts: { buttonPosition: "bottom-left" },
          walletInitOptions: {
            whiteLabel: {
              theme: { isDark: true, colors: { primary: "#00a8ff" } },
              logoDark: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
              logoLight: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
            },
            useWalletConnect: true,
            enableLogging: true,
          },
        });
        await web3AuthInstance.addPlugin(torusPlugin);
        const adapter = new OpenloginAdapter({
          adapterSettings: {
            whiteLabel,
          },
        });
        web3AuthInstance.configureAdapter(adapter);
        const metamaskAdapter = new MetamaskAdapter({
          clientId,
          sessionTime: 3600, // 1 hour in seconds
        });
        web3AuthInstance.configureAdapter(metamaskAdapter);

        const coinbaseAdapter: any = new CoinbaseAdapter({
          clientId: clientId,
          sessionTime: 3600,
        });
        web3AuthInstance.configureAdapter(coinbaseAdapter);

        await web3AuthInstance.init();
        setWeb3Auth(web3AuthInstance);
        if (web3AuthInstance && web3AuthInstance?.provider) {
          const provider = new ethers.providers.Web3Provider(
            web3AuthInstance?.provider
          );
          const signer = provider.getSigner();
          const account = await signer.getAddress();
          const { chainId } = await provider.getNetwork();
          setState({
            provider: provider,
            account: account,
            chainId,
            w3Provider: web3AuthInstance?.provider,
          });
        } else {
          if (
            window?.location?.pathname.indexOf("/login") === -1 &&
            window.location.pathname.indexOf("preview") === -1
          )
            window.location.href = "/login";
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, [chain, web3AuthNetwork]);

  const login = async (
    adapter: WALLET_ADAPTER_TYPE,
    loginProvider: LOGIN_PROVIDER_TYPE,
    login_hint?: string
  ) => {
    try {
      setIsLoading(true);
      if (!web3Auth) {
        console.log("web3auth not initialized yet");
        return;
      }

      await web3Auth.connectTo(adapter, {
        loginProvider,
        login_hint,
      });

      if (web3Auth?.provider) {
        const provider = new ethers.providers.Web3Provider(web3Auth?.provider);
        const signer = provider.getSigner();
        const account = await signer.getAddress();
        const { chainId } = await provider.getNetwork();
        setState({
          provider: provider,
          account: account,
          chainId,
          w3Provider: web3Auth?.provider,
        });
        const token = await Web3Token.sign(
          async (msg: string) => await signer.signMessage(msg),
          "365d"
        );
        return token;
      }
      return null;
    } catch (error) {
      console.log("error", error);
      // await logout()
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    try {
      await web3Auth.logout();
    } catch (e) {}
    setState({ provider: null, account: null, w3Provider: null });
  };

  const switchChain = async (nextChainId: string) => {
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      // eslint-disable-next-line no-throw-literal
      throw "web3auth not initialized yet";
    }
    try {
      console.log("asdfasdf");
      return await web3Auth.switchChain({ chainId: nextChainId });
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const contextProvider = {
    web3Auth,
    provider: state?.provider,
    w3Provider: state?.w3Provider,
    account: state?.account,
    chainId: state?.chainId,
    isLoading,
    login,
    logout,
    switchChain,
  };
  return (
    <Web3AuthContext.Provider value={contextProvider}>
      {children}
    </Web3AuthContext.Provider>
  );
};
