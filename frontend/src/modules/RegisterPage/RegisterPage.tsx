import { Register } from "@/components/Register/Register";
import { Breadcrumbs } from "@/shared/Breadcrumbs/Breadcrumbs";
import { useLocation } from "react-router-dom";

export const RegisterPage = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <>
      <div className="max-w-[1370px] px-[15px] mx-auto my-0">
        <Breadcrumbs pathnames={pathnames} />
      </div>
      <Register />
    </>
  );
}