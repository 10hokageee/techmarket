import { Cart } from "@/components/Cart/Cart";
import { Breadcrumbs } from "@/shared/Breadcrumbs/Breadcrumbs";
import { useLocation } from "react-router-dom";

export const CartPage = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  return (
    <>
      <div className="max-w-[1370px] w-[100%] px-[15px] my-0 mx-auto">
        <Breadcrumbs pathnames={pathnames} />
      </div>

      <Cart />
    </>
  );
}