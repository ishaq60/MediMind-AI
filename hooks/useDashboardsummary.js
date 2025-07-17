import { useQuery } from "@tanstack/react-query";

const useDashboardSummary = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/summary");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  return { data, isLoading, error };
};

export default useDashboardSummary;
