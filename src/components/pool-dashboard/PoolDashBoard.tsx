"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ChevronRight, Users, Wallet } from "lucide-react";
import { ProposalsList } from "./ProposalsList";
import { MembersList } from "./MembersList";
import { AssetsList } from "./AssetsList";

// Mock data for the example
const poolData = {
  name: "DeFi Yield Optimization",
  description:
    "A collective pool focused on maximizing yields through DeFi protocols",
  assetType: "ETH",
  totalFunds: 2500000,
  targetFunds: 3000000,
  memberCount: 48,
  proposalCount: 12,
  activeProposals: 3,
};

export default function PoolDashboard() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-[#1A1A1A] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Total Funds
            </CardTitle>
            <Wallet className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              ${poolData.totalFunds.toLocaleString()}
            </div>
            <Progress
              value={(poolData.totalFunds / poolData.targetFunds) * 100}
              className="h-2 mt-2"
            />
            <p className="text-xs text-gray-400 mt-2">
              {((poolData.totalFunds / poolData.targetFunds) * 100).toFixed(1)}%
              of target
            </p>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1A1A] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Members
            </CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {poolData.memberCount}
            </div>
            <p className="text-xs text-gray-400 mt-2">Active participants</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1A1A] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Asset Type
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {poolData.assetType}
            </div>
            <p className="text-xs text-gray-400 mt-2">Primary currency</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1A1A] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Active Proposals
            </CardTitle>
            <Badge variant="secondary" className="bg-gray-800 text-gray-300">
              {poolData.activeProposals}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {poolData.proposalCount}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Total proposals created
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-[#1A1A1A] border-gray-800">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-gray-800 text-gray-400 data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="proposals"
            className="data-[state=active]:bg-gray-800 text-gray-400 data-[state=active]:text-white"
          >
            Proposals
          </TabsTrigger>
          <TabsTrigger
            value="assets"
            className="data-[state=active]:bg-gray-800 text-gray-400 data-[state=active]:text-white"
          >
            Assets
          </TabsTrigger>
          <TabsTrigger
            value="members"
            className="data-[state=active]:bg-gray-800 text-gray-400 data-[state=active]:text-white"
          >
            Members
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-[#1A1A1A] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Recent Proposals</CardTitle>
                <CardDescription className="text-gray-400">
                  Latest proposals requiring attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProposalsList limit={3} />
                <Button
                  variant="ghost"
                  className="w-full mt-4 text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  View All Proposals
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-[#1A1A1A] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Top Contributors</CardTitle>
                <CardDescription className="text-gray-400">
                  Members with highest contributions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MembersList limit={3} />
                <Button
                  variant="ghost"
                  className="w-full mt-4 text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  View All Members
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="proposals">
          <Card className="bg-[#1A1A1A] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">All Proposals</CardTitle>
              <CardDescription className="text-gray-400">
                View and vote on all pool proposals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProposalsList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="assets">
          <Card className="bg-[#1A1A1A] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Pool Assets</CardTitle>
              <CardDescription className="text-gray-400">
                Assets currently owned by the pool
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AssetsList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="members">
          <Card className="bg-[#1A1A1A] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Pool Members</CardTitle>
              <CardDescription className="text-gray-400">
                All members and their contributions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MembersList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
