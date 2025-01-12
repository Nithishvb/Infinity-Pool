"use client";

import PoolDashboard from "@/components/pool-dashboard/PoolDashBoard";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { IPoolDetails } from "@/lib/types";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PoolDetails() {
  const [poolsDetails, setPoolDetails] = useState<IPoolDetails | undefined>(
    undefined
  );
  const router = useParams();
  const { id } = router;

  useEffect(() => {
    fetchPoolDetails();
  }, []);

  const fetchPoolDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/pool/${id}`);
      const res = await response.json();
      setPoolDetails(res.data);
    } catch (err) {
      console.log("Error fetch pool details :", (err as Error).message);
    }
  };

  if (!poolsDetails) {
    return (
      <div className="flex justify-center h-screen items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <div className="container mx-auto py-8 px-4 md:px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 px-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {poolsDetails?.name}
            </h1>
            <p className="mt-1 text-gray-300">{poolsDetails?.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
              Withdraw Funds
            </Button>
            <Button className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-white px-4 py-2 bg-white rounded-md text-black font-light transition duration-200 ease-linear">
              <Plus className="mr-1 h-4 w-4" /> Create Proposal
            </Button>
          </div>
        </div>
        <PoolDashboard poolsDetails={poolsDetails} />
      </div>
    </div>
  );
}
