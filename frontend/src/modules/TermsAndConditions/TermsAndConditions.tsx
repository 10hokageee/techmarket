import { FaqBlock } from "@/components/TermsAndConditionsBlock/TermsAndConditionsBlock";
import { analyticsEvent } from "@/utils/analytics";
import { useEffect } from "react";

export const TermsAndConditions = () => {

  useEffect(() => {
    analyticsEvent("page_view", {
      page_path: "T&C"
    })
  }, [])

  return (
    <FaqBlock />
  );
}