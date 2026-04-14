import { Login } from "@/components/Login/Login";
import { Breadcrumbs } from "@/shared/Breadcrumbs/Breadcrumbs";
import { useLocation } from "react-router-dom";

export const LoginPage = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <>
      <div className="max-w-[1370px] px-[15px] mx-auto my-0">
        <Breadcrumbs pathnames={pathnames} />
      </div>

      <Login />
    </>
  );
}