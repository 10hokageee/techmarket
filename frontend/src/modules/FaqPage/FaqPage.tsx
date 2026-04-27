import { FaqBlock } from "@/components/FaqBlock/FaqBlock";
import { analyticsEvent } from "@/utils/analytics";
import { useEffect } from "react";

export const FaqPage = () => {

  useEffect(() => {
    analyticsEvent("page_view", {
      page_path: "FAQ"
    })
  }, [])

  return (
    <FaqBlock />
  );
}