import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "r3wsr7it",
  dataset: "production",
  useCdn: true,
  apiVersion: "2025-12-02",
});
