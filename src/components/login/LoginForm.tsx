"use client";

import React, { useEffect } from "react";
import { useAppKit, useAppKitAccount, useAppKitEvents } from "@/config/config";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const { open } = useAppKit();
  const { data } = useAppKitEvents();
  const { address, embeddedWalletInfo } = useAppKitAccount();
  const router = useRouter();

  const openAppKit = () => {
    open();
  };

  useEffect(() => {
    if (data.event === "CONNECT_SUCCESS") {
      storeUserdata();
    }
    if (data.event === "CONNECT_ERROR") {
      toast.error("User signed in");
    }
  }, [data]);

  const storeUserdata = async () => {
    try {
      const userData = {
        email: embeddedWalletInfo?.user?.email || "",
        walletAddress: address,
        loginProvider: embeddedWalletInfo?.user?.email ? "EMAIL" : "WALLET",
        isVerified: true,
      };
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        body: JSON.stringify(userData),
      });
      const res = await response.json();
      localStorage.setItem("userAuth", JSON.stringify(res.data));
      toast.success("User signed in");
      router.push("/pool");
    } catch (err) {
      console.log("Error creating user :", err);
    }
  };

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
