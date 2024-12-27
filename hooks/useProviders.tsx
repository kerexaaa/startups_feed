"use client";

import { getProviders } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

type ProvidersContextType = {
  providers: Awaited<ReturnType<typeof getProviders>>;
  isLoading: boolean;
};

const ProvidersContext = createContext<ProvidersContextType | undefined>(
  undefined
);

type MyProvidersContextType = {
  children: React.ReactNode;
};

export const ProvidersContextProvider = ({
  children,
}: MyProvidersContextType) => {
  const [providers, setProviders] = useState<Awaited<
    ReturnType<typeof getProviders>
  > | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async (): Promise<void> => {
      try {
        const res = await getProviders();
        setProviders(res);
        console.log("Providers fetched!", res);
      } catch (error) {
        console.log("Error while fetching providers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (typeof window !== "undefined") {
      fetchProviders();
    }
  }, []);

  const value = { providers, isLoading };

  return (
    <ProvidersContext.Provider value={value}>
      {children}
    </ProvidersContext.Provider>
  );
};

export const useProviders = () => {
  const ctx = useContext(ProvidersContext);

  if (ctx === undefined) {
    throw new Error(
      "useDataContext must be used within in a ProvidersContextProvider"
    );
  }

  return ctx;
};
