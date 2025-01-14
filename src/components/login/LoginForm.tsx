"use client";

import React, { useEffect } from "react";
import { useAppKit , useAppKitEvents } from "@/config/config";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const { open, } = useAppKit();  
  const { data } = useAppKitEvents();
  const router = useRouter();

  const openAppKit = () => {
   open();
  };

  useEffect(() => {
    if(data.event === "CONNECT_SUCCESS"){
      toast.success("User signed in");
      router.push("/pool");
    }
    if(data.event === "CONNECT_ERROR"){
      toast.error("User signed in");
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold">Login to Infinity pool</h2>
        </div>
        <div className="space-y-4 flex justify-center">
          <Button
            onClick={openAppKit}
            className="w-3/5 bg-[#5E5CDE] hover:bg-[#4A48B0] text-white py-2 rounded"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
