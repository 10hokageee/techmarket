import { SuccessOrders } from "@/components/SuccessOrders/SuccessOrders";
import { analyticsEvent } from "@/utils/analytics";
import { useEffect } from "react";

export const SuccessOrdersPage = () => {

  useEffect(() => {
    analyticsEvent("page_view", {
      page: "Success orders"
    })
  }, [])

  return (
    <SuccessOrders />
  );
}