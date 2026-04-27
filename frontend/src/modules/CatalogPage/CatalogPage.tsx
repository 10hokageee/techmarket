import { Catalog } from "@/components/Catalog/Catalog";
import { analyticsEvent } from "@/utils/analytics";
import { useEffect } from "react";

export const CatalogPage = () => {

  useEffect(() => {
    analyticsEvent("page_view", {
      page_path: "Catalog"
    })
  }, [])

  return (
    <Catalog />
  );
}