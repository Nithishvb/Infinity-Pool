"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ChevronDown, Plus } from "lucide-react";
import { PoolTable } from "./PoolTable";
import TableToolbar from "./TableToolbar";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { IPool } from "@/lib/types";
import LoadingSpinner from "../ui/LoadingSpinner";

export default function ExplorePools() {
  const [assetFilter, setAssetFilter] = useState<string | undefined>("NONE");
  const [statusFilter, setStatusFilter] = useState<string | undefined>("NONE");
  const [searchTerm, setSearchTerm] = useState("");
  const [pools, setPools] = useState<IPool[]>([]);

  const router = useRouter();

  useEffect(() => {
    fetchPools();
  }, []);

  const fetchPools = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/pool", {
        method: "GET",
      });
      const res = await response.json();
      console.log("Pools data", res);
      setPools(res.data);
    } catch (err) {
      console.log("Erro fetching pools :", (err as Error).message);
    }
  };

  const filteredPools = useMemo(() => {
    if (assetFilter === "NONE" && statusFilter === "NONE" && !searchTerm) {
      return pools;
    }

    return pools.filter((pool) => {
      const matchesAssetType =
        assetFilter === "NONE" || pool.assetType === assetFilter;
      const matchesStatus =
        statusFilter === "NONE" || pool.status === statusFilter;
      const matchesSearchTerm =
        pool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pool.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesAssetType && matchesStatus && matchesSearchTerm;
    });
  }, [pools, assetFilter, statusFilter, searchTerm]);

  const handlePoolClick = useCallback((poolId: string) => {
    router.push(`/pool/${poolId}`);
  }, [router]);

  return (
    <div className="container mx-auto py-10 px-20 h-screen overflow-hidden">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Explore Investment Pools</h1>
        <Button
          onClick={() => router.push("/pool/new")}
          className="flex px-5 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200"
        >
          <Plus className="mr-1 h-4 w-4" />
          Create pool
        </Button>
      </div>
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
          <TableBody className="w-full">
            {filteredPools.length > 0 ? (
              filteredPools.map((pool) => (
                <PoolTable
                  key={pool.id}
                  name={pool.name}
                  description={pool.description}
                  assetType={pool.assetType}
                  totalFunds={pool.totalCollectedSol}
                  status={pool.status}
                  id={pool.id}
                  handlePoolClick={handlePoolClick}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="p-8 text-center">
                  <div className="flex items-center justify-center w-full h-full">
                    <LoadingSpinner />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
