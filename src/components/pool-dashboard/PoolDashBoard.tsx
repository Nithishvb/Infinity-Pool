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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Funds</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${poolData.totalFunds.toLocaleString()}
            </div>
            <Progress
              value={(poolData.totalFunds / poolData.targetFunds) * 100}
              className="h-2 mt-2"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {((poolData.totalFunds / poolData.targetFunds) * 100).toFixed(1)}%
              of target
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{poolData.memberCount}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Active participants
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Asset Type</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{poolData.assetType}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Primary currency
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Proposals
            </CardTitle>
            <Badge variant="secondary">{poolData.activeProposals}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{poolData.proposalCount}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Total proposals created
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="proposals">Proposals</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Proposals</CardTitle>
                <CardDescription>
                  Latest proposals requiring attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProposalsList limit={3} />
                <Button variant="ghost" className="w-full mt-4">
                  View All Proposals
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
                <CardDescription>
                  Members with highest contributions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MembersList limit={5} />
                <Button variant="ghost" className="w-full mt-4">
                  View All Members
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="proposals">
          <Card>
            <CardHeader>
              <CardTitle>All Proposals</CardTitle>
              <CardDescription>
                View and vote on all pool proposals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProposalsList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="assets">
          <Card>
            <CardHeader>
              <CardTitle>Pool Assets</CardTitle>
              <CardDescription>
                Assets currently owned by the pool
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AssetsList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Pool Members</CardTitle>
              <CardDescription>
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
