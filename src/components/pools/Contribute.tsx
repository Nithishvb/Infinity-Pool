"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useFetch } from "@/hooks/useFetch";
import LoadingSpinner from "../ui/LoadingSpinner";
import {
  useAppKitAccount,
  useAppKit,
  useAppKitProvider,
} from "@/config/config";
import type { Provider } from "@reown/appkit-adapter-solana/react";
import { useAppKitConnection } from "@reown/appkit-adapter-solana/react";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL
} from "@solana/web3.js";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function ContributeToPool() {
  const [amount, setAmount] = useState<number>(0);
  const [step, setStep] = useState(1);
  const [isSigned, setIsSigned] = useState<boolean>(false);

  const params = useParams();
  const { id } = params;
  const router = useRouter();

  const { data: poolData } = useFetch(`pool/${id}`);

  const { address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<Provider>("solana");
  const { connection } = useAppKitConnection();
  const wallet = useAppKit();

  const handleContribute = async () => {
    try {
      if (!amount || !address) return;
      setIsSigned(true);

      if (connection) {
        const latestBlockhash = await connection?.getLatestBlockhash();

        const lamports = amount * LAMPORTS_PER_SOL;
        const transaction = new Transaction({
          feePayer: new PublicKey(address),
          recentBlockhash: latestBlockhash?.blockhash,
        }).add(
          SystemProgram.transfer({
            fromPubkey: new PublicKey(address),
            toPubkey: new PublicKey(
              ""
            ),
            lamports,
          })
        );

        await walletProvider.sendTransaction(
          transaction,
          connection
        );
        setIsSigned(false);
        toast.success(`SOL amount ${amount} was added to the pool`);
        router.push(`/pool/${id}`);
      }
    } catch (err) {
      const errMsg = (err as Error).message;
      if(errMsg.includes("User rejected")){
        toast.error(errMsg);
      }else{
        toast.error("Error signing transaction, Please try again later");
      }
      setIsSigned(false);
    }
  };

  const handleConnectWallet = () => {
    console.log("Wallet connected");
  };

  if (!poolData) {
    return (
      <div className="flex justify-center h-screen items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-0">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Contribute to Pool</CardTitle>
          <CardDescription>Add funds to {poolData.name}</CardDescription>
          <button onClick={() => wallet.open()}>Click me</button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Asset Type</span>
            <span className="font-medium">{poolData.assetType}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Total Funds</span>
            <span className="font-medium">
              ${poolData.totalCollectedSol.toLocaleString()}
            </span>
          </div>
          <Separator />
          {!address ? (
            <div className="space-y-4">
              <Button className="w-full" onClick={handleConnectWallet}>
                Connect Wallet
              </Button>
            </div>
          ) : (
            <div>
              <div className="space-y-2">
                <Label htmlFor="amount">
                  Contribution Amount ({poolData.assetType})
                </Label>
                <Input
                  id="amount"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                  type="number"
                  min="0"
                />
              </div>
              <div className="mt-5">
                <Button className="w-full" onClick={handleContribute} disabled={isSigned}>
                  {isSigned ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing transaction...
                    </>
                  ) : (
                    `Add ${amount} ${poolData.assetType}`
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && step < 3 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}