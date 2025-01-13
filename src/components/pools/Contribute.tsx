"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
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
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useFetch } from "@/hooks/useFetch";
import LoadingSpinner from "../ui/LoadingSpinner";

export default function ContributeToPool() {
  const params = useParams();
  const { id } = params;
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState(1);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");

  const { data: poolData } = useFetch(`pool/${id}`);

  const handleConnectWallet = () => {
    setTimeout(() => {
      setIsWalletConnected(true);
      setStep(2);
    }, 1000);
  };

  const handleContribute = () => {
    if (!amount) return;
    setTransactionStatus("processing");
    setTimeout(() => {
      setTransactionStatus(Math.random() > 0.2 ? "success" : "error");
      setStep(3);
    }, 2000);
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
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">
                  Contribution Amount ({poolData.assetType})
                </Label>
                <Input
                  id="amount"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  min="0"
                />
              </div>
              <Button className="w-full" onClick={handleConnectWallet}>
                Connect Wallet
              </Button>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md">
                <p className="text-green-500 text-sm">
                  Wallet connected successfully
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">
                  Contribution Amount ({poolData.assetType})
                </Label>
                <Input
                  id="amount"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  min="0"
                />
              </div>
              <Button className="w-full" onClick={handleContribute}>
                Contribute {amount} {poolData.assetType}
              </Button>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              {transactionStatus === "processing" && (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                  <p>Processing transaction...</p>
                </div>
              )}
              {transactionStatus === "success" && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <p className="text-green-500">Contribution successful!</p>
                </div>
              )}
              {transactionStatus === "error" && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md flex items-center space-x-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <p className="text-red-500">
                    Transaction failed. Please try again.
                  </p>
                </div>
              )}
              <div className="space-y-2">
                <Label>Contributed Amount</Label>
                <p className="font-medium">
                  {amount} {poolData.assetType}
                </p>
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
          {step === 3 && (
            <Button
              className="w-full"
              onClick={() => {
                setStep(1);
                setAmount("");
                setTransactionStatus("idle");
                setIsWalletConnected(false);
              }}
            >
              Make Another Contribution
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
