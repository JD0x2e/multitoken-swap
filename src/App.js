import "./App.css";
import Swap from "./components/Swap/Swap";


import { createClient, WagmiConfig, configureChains } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'


const avalancheChain = {
  id: 43_114,
  name: 'Avalanche',
  network: 'avalanche',
  nativeCurrency: {
  decimals: 18,
  name: 'Avalanche',
  symbol: 'AVAX',
  },
  rpcUrls: {
  default: 'https://avalanche-mainnet.infura.io/v3/',
  },
  blockExplorers: {
  default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
  testnet: false,
}

const { chains } = configureChains(
  [avalancheChain],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== avalancheChain.id) return null;
        return { http: chain.rpcUrls.default };
      },
    }),
  ],
);

const wagmiClient = createClient(
  getDefaultClient({
    chains,
  })
);

export default function App() {
  return (
      <WagmiConfig client={wagmiClient}>
        <ConnectKitProvider>
          <div className="App">
            <Swap />
            {/* <Exchange /> */}
          </div>
        </ConnectKitProvider>
      </WagmiConfig>
  );
}
