export {};

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      publicKey?: import("@solana/web3.js").PublicKey;
      connect: () => Promise<{ publicKey: import("@solana/web3.js").PublicKey }>;
      disconnect: () => Promise<void>;
      on: (event: string, callback: (args: any) => void) => void;
    };
  }
}
