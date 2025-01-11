"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ChevronDown } from "lucide-react";
import { PoolTable } from "./PoolTable";
import TableToolbar from "./TableToolbar";

const mockPools = [
  {
    id: 1,
    name: "DeFi Yield Farming",
    description: "High-yield farming pool focusing on DeFi protocols",
    assetType: "ETH",
    totalFunds: 1500000,
    status: "open",
  },
  {
    id: 2,
    name: "NFT Collector's Fund",
    description: "Collective investment in rare NFTs",
    assetType: "SOL",
    totalFunds: 750000,
    status: "open",
  },
  {
    id: 3,
    name: "Stablecoin Savings",
    description: "Low-risk pool for stablecoin yield optimization",
    assetType: "MULTI",
    totalFunds: 2000000,
    status: "closed",
  },
  {
    id: 4,
    name: "Web3 Startup Incubator",
    description: "Early-stage investments in Web3 startups",
    assetType: "ETH",
    totalFunds: 5000000,
    status: "open",
  },
  {
    id: 5,
    name: "Metaverse Land Acquisition",
    description: "Strategic investments in virtual real estate",
    assetType: "SOL",
    totalFunds: 1200000,
    status: "open",
  },
];

export default function ExplorePools() {
  const [assetFilter, setAssetFilter] = useState<string | undefined>();
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPools = mockPools.filter(
    (pool) =>
      (!assetFilter || pool.assetType === assetFilter) &&
      (!statusFilter || pool.status === statusFilter) &&
      (pool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pool.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto py-10 px-20 h-screen overflow-hidden">
      <h1 className="text-4xl font-bold mb-6">Explore Investment Pools</h1>
      <TableToolbar
        searchTerm={searchTerm}
        setAssetFilter={setAssetFilter}
        setSearchTerm={setSearchTerm}
        setStatusFilter={setStatusFilter}
      />
      <div className="w-[100%]">
        <Table>
          <TableHeader className="">
            <TableRow className="hover:bg-transparent border-b border-gray-700 bordergray-200">
              <TableHead className="text-sm font-semibold text-gray-300">
                POOLS NAME
              </TableHead>
              <TableHead className="text-sm font-semibold text-gray-300">
                POOL DESCRIPTION
              </TableHead>
              <TableHead className="text-center text-sm font-semibold text-gray-300">
                ASSET TYPE
              </TableHead>
              <TableHead className="text-center text-sm font-semibold text-gray-300">
                TOTAL FUND
                <ChevronDown className="inline ml-1 h-4 w-4" />
              </TableHead>
              <TableHead className="text-sm font-semibold text-gray-300">
                STATUS
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPools.map((pool) => (
              <PoolTable
                key={pool.id}
                name={pool.name}
                description={pool.description}
                assetType={pool.assetType}
                totalFunds={pool.totalFunds}
                status={pool.status}
                id={pool.id}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
