import { IPoolDetails } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";

const API_URL = "http://localhost:3000/api";

export const useFetch = (url: string) => {
  const [data, setData] = useState<IPoolDetails | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPoolDetails();
  }, []);

  const fetchPoolDetails = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/${url}`);
      const res = await response.json();
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.log("Error fetch pool details :", (err as Error).message);
      setError((err as Error).message);
      setLoading(false);
    }
  }, []);

  return { data, loading, error };
};
