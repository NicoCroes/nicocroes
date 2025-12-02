import { useQuery } from "@tanstack/react-query";
import {
  getGeneralData,
  getDpWorksList,
  getColorWorksList,
  getDpWorkBySlug,
  getColorWorkBySlug,
} from "../lib/dataQueries";

export function useGeneralData() {
  return useQuery({
    queryKey: ["generalData"],
    queryFn: getGeneralData,
  });
}

export function useDpWorksList() {
  return useQuery({
    queryKey: ["dpWorksList"],
    queryFn: getDpWorksList,
  });
}

export function useColorWorksList() {
  return useQuery({
    queryKey: ["colorWorksList"],
    queryFn: getColorWorksList,
  });
}

export function useDpWork(slug: string) {
  return useQuery({
    queryKey: ["dpWork", slug],
    queryFn: () => getDpWorkBySlug(slug),
    enabled: !!slug,
  });
}

export function useColorWork(slug: string) {
  return useQuery({
    queryKey: ["colorWork", slug],
    queryFn: () => getColorWorkBySlug(slug),
    enabled: !!slug,
  });
}
