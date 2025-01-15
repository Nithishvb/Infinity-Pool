import {
  createAppKit,
  useAppKit,
  useAppKitState,
  useAppKitAccount,
  useAppKitTheme,
  useAppKitEvents,
  useWalletInfo,
  useAppKitNetwork,
  useDisconnect,
} from "@reown/appkit/react";
import { SolanaAdapter } from "@reown/appkit-adapter-solana";
import {
  solanaTestnet,
  type AppKitNetwork,
} from "@reown/appkit/networks";

export const projectId =
  process.env.NEXT_PUBLIC_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694";

export const networks = [solanaTestnet] as [
  AppKitNetwork,
  ...AppKitNetwork[]
];

// Setup wagmi adapter
export const solanaAdapter = new SolanaAdapter({});

// Create modal
const modal = createAppKit({
  adapters: [solanaAdapter],
  networks,
  metadata: {
    name: "AppKit Next.js Example",
    description: "AppKit Next.js App Router Example",
    url: "https://reown.com/appkit",
    icons: ["https://avatars.githubusercontent.com/u/179229932?s=200&v=4"]
  },
  projectId,
  features: {
    email: true,
    socials: ["google"],
    analytics: false,
  },
});

export {
  modal,
  useAppKit,
  useAppKitState,
  useAppKitTheme,
  useAppKitEvents,
  useAppKitAccount,
  useWalletInfo,
  useAppKitNetwork,
  useDisconnect,
};
