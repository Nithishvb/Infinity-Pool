"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createPoolSchema } from "@/lib/zod/schemas/pool";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import InfinityPoolIdl from "@/config/idl.json";
import { PublicKey } from "@solana/web3.js";
import { useAppKitProvider } from "@/config/config";
import { useAppKitConnection, type Provider } from "@reown/appkit-adapter-solana/react";
import { AnchorProvider , web3, BN, Idl , Program } from '@coral-xyz/anchor';

// const connection = new Connection("https://api.devnet.solana.com", "processed");


export default function CreatePool() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { walletProvider } = useAppKitProvider<Provider>("solana");
  const { connection } = useAppKitConnection();

  const router = useRouter();

  const programId = new PublicKey(
    ""
  );

  const form = useForm<z.infer<typeof createPoolSchema>>({
    resolver: zodResolver(createPoolSchema),
    defaultValues: {
      poolName: "",
      description: "",
      assetType: "SOL",
      targetSol: 0,
      minContribution: 0,
      maxContribution: 0,
    },
  });

  // function getProgram(provider: anchor.Provider) {
  //   return new anchor.Program(
  //     InfinityPoolIdl as anchor.Idl,
  //     programId,
  //     provider
  //   );
  // }

  async function onSubmit(values: z.infer<typeof createPoolSchema>) {
    try {
      setIsSubmitting(true);

      // Ensure walletProvider and connection are properly initialized
      if (
        !walletProvider ||
        !walletProvider.publicKey ||
        !walletProvider.signTransaction ||
        !connection
      ) {
        toast.error("Wallet not connected");
        setIsSubmitting(false);
        return;
      }

      // const provider = new anchor.AnchorProvider(
      //   connection,
      //   {
      //     publicKey: new PublicKey(walletProvider.publicKey),
      //     signTransaction: walletProvider.signTransaction,
      //     signAllTransactions: walletProvider.signAllTransactions,
      //   },
      //   {}
      // );


      const [poolPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("pool")],
        programId
      );

      // const lamports = await connection.getMinimumBalanceForRentExemption(5);

      // const latestBlockhash = await connection?.getLatestBlockhash();

      // const transaction = new Transaction({
      //   feePayer: new PublicKey(""),
      //   recentBlockhash: latestBlockhash?.blockhash,
      // }).add(
      //   SystemProgram.createAccount({
      //     fromPubkey: new PublicKey(""),
      //     newAccountPubkey: poolPDA,
      //     lamports,
      //     space: 5,
      //     programId,
      //   })
      // );

      // await walletProvider.sendTransaction(transaction, connection);

      const provider = new AnchorProvider(connection, 
        {
          publicKey: new PublicKey(""),
          signTransaction: walletProvider.signTransaction,
          signAllTransactions: walletProvider.signAllTransactions,
        },
         { commitment: 'confirmed' });

      const program = new Program(InfinityPoolIdl as Idl, provider);

      // Validate programId
      if (!programId) {
        throw new Error("Program ID is not defined");
      }

      console.log("program.methods via rpc", program.rpc, poolPDA);

      const tx = await program.rpc.initializePool(
        values.poolName,
        values.description,
        new BN(values.minContribution),
        new BN(values.maxContribution),
        new BN(values.targetSol),
        {
          accounts: {
            pool: poolPDA,
            creator: provider.wallet.publicKey,
            systemProgram: web3.SystemProgram.programId,
          },
        }
      );

      // Call the initializePool method
      // const tx = await program.methods
      //   .initializePool(
      //     values.poolName,
      //     values.description,
      //     new anchor.BN(values.minContribution),
      //     new anchor.BN(values.maxContribution),
      //     new anchor.BN(values.targetSol)
      //   )
      //   .accounts({
      //     pool: poolPDA,
      //     creator: provider.wallet.publicKey,
      //     systemProgram: anchor.web3.SystemProgram.programId,
      //   })
      //   .rpc();

      console.log("Transaction signature:", tx);
      console.log("Pool PDA:", poolPDA.toString());

      // API call to store pool metadata in the backend
      const result = await fetch("http://localhost:3000/api/pool", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });

      if (!result.ok) {
        throw new Error("Failed to save pool metadata");
      }

      const jsonResponse = await result.json();
      console.log("API Response:", jsonResponse);

      setIsSubmitting(false);
      form.reset();
      toast.success("Pool Created successfully");
      router.push("/pool");
    } catch (err) {
      console.error("Error creating pool:", err);
      toast.error("Error creating pool");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-0 min-h-screen">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold">
            Create a New Investment Pool
          </CardTitle>
          <CardDescription>
            Set up your investment pool in just a few steps. Fill out the
            details below to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="poolName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900">Pool Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter pool name"
                        {...field}
                        className="bg-white border-gray-200 focus-visible:ring-0 focus-visible:border-gray-300"
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500">
                      Choose a unique name for your investment pool.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the purpose and goals of this pool"
                        {...field}
                        className="bg-white border-gray-200 focus-visible:ring-0 focus-visible:border-gray-300 resize-none"
                        rows={4}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500">
                      Provide a clear description of the {"pool's"} objectives.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="assetType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900">
                        Asset Type
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white border-gray-200 focus:ring-0 focus:border-gray-300">
                            <SelectValue placeholder="Select asset type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="SOL">SOL</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription className="text-gray-500">
                        Choose the type of asset for this pool.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="targetSol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900">
                        Target Sol
                      </FormLabel>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(+e.target.value)}
                        className="bg-white border-gray-200 focus-visible:ring-0 focus-visible:border-gray-300"
                      />
                      <FormDescription className="text-gray-500">
                        Set the target SOL for the pool.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="minContribution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900">
                        Minimum Contribution
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(+e.target.value)}
                          className="bg-white border-gray-200 focus-visible:ring-0 focus-visible:border-gray-300"
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500">
                        Set the minimum contribution SOL.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxContribution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900">
                        Maximum Contribution
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(+e.target.value)}
                          className="bg-white border-gray-200 focus-visible:ring-0 focus-visible:border-gray-300"
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500">
                        Set the maximum contribution SOL.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="w-full bg-black hover:bg-black/90 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Pool...
              </>
            ) : (
              "Create Pool"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
