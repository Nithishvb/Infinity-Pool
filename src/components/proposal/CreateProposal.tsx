"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { createNewProposalSchema } from "@/lib/zod/schemas/proposal";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { getGovernanceProgramVersion, getSignatoryRecordAddress, VoteType, withCreateProposal, withSignOffProposal } from '@solana/spl-governance';
import { Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";
import { useAppKitAccount } from "@/config/config";

const GOVERNANCE_PROGRAM_ID = new PublicKey(
  "GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw",
);

export default function CreateProposal() {
  const params = useParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { address } = useAppKitAccount();

  const form = useForm<z.infer<typeof createNewProposalSchema>>({
    resolver: zodResolver(createNewProposalSchema),
    defaultValues: {
      description: "",
      type: "BUY",
      amount: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof createNewProposalSchema>) {
    try {
      setIsSubmitting(true);
      const proposalData = {
        description: values.description,
        type: values.type,
        amount: values.amount,
        poolId: params.id,
        proposerId: "cm5wkmh4q0000traoutqwwmae",
      };
      await handleGovernanceProposal();
      const response = await fetch("http://localhost:3000/api/proposal", {
        method: "POST",
        body: JSON.stringify(proposalData),
      });
      await response.json();
      toast.success("Proposal created successfully");
      router.push(`/pool/${params.id}`);
    } catch (err) {
      console.log("Error creating pools :", err);
      toast.error("Error creating pools");
    }
  };

  const handleGovernanceProposal = async () => {

    const programVersion = await getGovernanceProgramVersion(
      new Connection("https://api.testnet.solana.com"),
      GOVERNANCE_PROGRAM_ID,
    );

    const proposerAddress = new PublicKey(address || "");
    const poolId = new PublicKey(params.id || "");

    const proposalAddress = await withCreateProposal(
      [],
      GOVERNANCE_PROGRAM_ID,
      programVersion,
      proposerAddress,
      poolId,
      proposerAddress,
      "NFT Snipper",
      "Vote for buying an NFT #331",
      proposerAddress,
      poolId,
      undefined,
      VoteType.SINGLE_CHOICE,
      ["Approve"],
      true,
      proposerAddress,
    );

    const signatory = await getSignatoryRecordAddress(
      GOVERNANCE_PROGRAM_ID,
      proposalAddress,
      poolId,
    );

    const signOffInstructions: TransactionInstruction[] = [];
    await withSignOffProposal(
      signOffInstructions,
      GOVERNANCE_PROGRAM_ID,
      programVersion,
      proposerAddress,
      poolId,
      proposalAddress,
      poolId,
      signatory,
      undefined,
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-0">
      <Card className="max-w-2xl mx-auto bg-white border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create New Proposal
          </CardTitle>
          <CardDescription className="text-gray-400">
            Submit a new proposal for pool members to vote on
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Buy Solana Monkey Business #1234"
                        {...field}
                        className="border-gray-200 focus-visible:ring-0 focus-visible:border-gray-300"
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500">
                      Provide a clear and concise title for your proposal.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Action Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-gray-200 focus-visible:ring-0 focus-visible:border-gray-300">
                          <SelectValue placeholder="Select action type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border-gray-200 focus-visible:ring-0 focus-visible:border-gray-300">
                        <SelectItem value="BUY">Buy</SelectItem>
                        <SelectItem value="SELL">Sell</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-gray-500">
                      Choose the type of action for this proposal.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount Required</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        className="border-gray-200 focus-visible:ring-0 focus-visible:border-gray-300"
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500">
                      Specify the amount required for this proposal (if
                      applicable).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-black text-white"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Proposal"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
