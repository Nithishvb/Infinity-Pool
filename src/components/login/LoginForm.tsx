"use client";

import React from "react";
import { useAppKit } from "@/config/config";
import { Button } from "@/components/ui/button";

export const LoginForm = () => {
  const modalapp = useAppKit();  

  const openAppKit = () => {
    modalapp.open();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold">Login to Infinity pool</h2>
        </div>
        <div className="space-y-4">
          <Button
            onClick={openAppKit}
            className="w-full bg-[#5E5CDE] hover:bg-[#4A48B0] text-white py-2 rounded"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
