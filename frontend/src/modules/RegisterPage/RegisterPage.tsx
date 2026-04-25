import { Register } from "@/components/Register/Register";
import { Breadcrumbs } from "@/shared/Breadcrumbs/Breadcrumbs";
import { analyticsEvent } from "@/utils/analytics";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const RegisterPage = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  useEffect(() => {
    analyticsEvent("page_view", {
      page: "Register"
    })
  }, []);

  return (
    <>
      <div className="max-w-[1370px] px-[15px] mx-auto my-0">
        <Breadcrumbs pathnames={pathnames} />
      </div>
      <Register />
    </>
  );
}