"use client";
import { useState, useEffect } from "react";

const useProfile = () => {
  const [data, setData] = useState(null);  // Initialize with null
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        setIsLoading(false);
      });
  }, []);

  return { isLoading, data };
};

export default useProfile;
