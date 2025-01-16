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
import * as anchor from "@project-serum/anchor";
import InfinityPool from "@/config/idl.json";
import { PublicKey } from "@solana/web3.js";

const connection = new anchor.web3.Connection(
  "https://api.devnet.solana.com",
  "confirmed"
);
const provider = new anchor.AnchorProvider(connection, wallet, {
  preflightCommitment: "confirmed",
});
anchor.setProvider(provider);

export default function CreatePool() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const programId = new PublicKey(
    ""
  );

  const program = new anchor.Program(
    InfinityPool as anchor.Idl,
    programId,
    provider
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

  async function onSubmit(values: z.infer<typeof createPoolSchema>) {
    try {
      setIsSubmitting(true);

      const [poolPDA] = await PublicKey.findProgramAddressSync(
        [Buffer.from('pool')],
        program.programId
      );    

      const tx = await program.methods
        .initializePool(
          values.poolName,
          values.description,
          new anchor.BN(values.minContribution),
          new anchor.BN(values.maxContribution),
          new anchor.BN(values.targetSol)
        )
        .accounts({
          pool: poolPDA,
          creator: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

        console.log('Transaction signature:', tx);
        console.log('Pool PDA:', poolPDA.toString());

      const result = await fetch("http://localhost:3000/api/pool", {
        method: "POST",
        body: JSON.stringify(values),
      });
      await result.json();
      setIsSubmitting(false);
      form.reset();
      toast.success("Pool Created successfully");
      router.push("/pool");
    } catch (err) {
      console.log("Error creating pools :", err);
      toast.error("Error creating pools");
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
