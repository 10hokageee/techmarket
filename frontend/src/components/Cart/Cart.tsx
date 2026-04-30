import { changeQuantity, clearCart, deleteProduct } from "@/features/addToCart";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { getOrder, order } from "@/utils/order";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Loader } from "../Loader/Loader";
import toast from "react-hot-toast";
import { categoryToSlug } from "@/utils/categoryToSlug";
import { analyticsEvent } from "@/utils/analytics";

export const Cart = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.cart.products);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalCartPrice = products.reduce((acc, product) => {
    const price = parseFloat(product.sale_price || product.original_price);
    return acc + price * product.quanity;
  }, 0);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const checkPayment = (orderId: number) => {
    intervalRef.current = setInterval(async () => {
      try {
        const orderData = await getOrder(orderId);

        if (orderData.payment_status === "PAID") {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }

          setPayment(false);
          dispatch(clearCart());
          toast.success("Payment successful!");

          if (orderData.receipt) {
            localStorage.setItem("last_receipt", orderData.receipt);
            window.open(orderData.receipt, "_blank");
          }
        }
      } catch (e) {
        console.log(e);

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        setPayment(false);

        toast.error("Payment check failed.");
      }
    }, 3000);
  };

  const handleOrder = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const items = products.map((product) => ({
        product: product.id,
        quantity: product.quanity,
      }));

      setLoading(true);

      const res = await order(items);

      setPayment(true);

      window.open(`${res.payment_url}`, "_blank");

      checkPayment(res.id);

      analyticsEvent("begin_checkout", {
        proceed_to_checkout: true,
      })
    } catch (e) {

      toast.error(e.message || "Something went wrong");

    } finally {
      setLoading(false);
    }
  };

  const handleCancelPayment = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setPayment(false);
    toast.error("Payment cancelled.");
  };

  if (products.length === 0) {
    return (
      <section className="p-10 text-center flex items-center justify-center flex-col">
        <p className="xl:text-[32px]/[48px] mb-[10px] font-poppins font-semibold">
          Your cart is empty
        </p>
        <button
          onClick={() => navigate(-1)}
          className="bg-[#0156FF] py-[8px] max-w-[130px] w-[100%] rounded-[20px] text-white text-[14px]/[21px] font-poppins font-normal cursor-pointer hover:bg-[#0044cc] transition-all duration-300 ease-in-out"
        >
          Back
        </button>
        <NavLink
          className="mb-[15px] text-[11px]/[20px] text-[#0156FF] font-poppins font-normal mt-[15px] hover:text-[#0044cc] transition-all duration-300 ease-in-out hover:text-[#0044cc] transition-all duration-300 ease-in-out"
          to="/SuccessOrders"
        >
          Check my orders
        </NavLink>
      </section>
    );
  }

  if (loading) {
    return <Loader />;
  }

  if (payment) {
    return (
      <div className="flex justify-center items-center flex-col py-[80px]">
        <p className="text-[18px]/[27px] font-poppins font-semibold xl:text-[24px]/[30px] mb-[20px]">
          Waiting for payment confirmation...
        </p>
        <button
          onClick={handleCancelPayment}
          className="w-[163px] bg-[#0156FF] py-[8px] rounded-[30px] text-[13px]/[20px] font-poppins font-semibold text-white mb-[10px] cursor-pointer xl:text-[14px]/[21px] xl:py-[15px] cursor-pointer hover:bg-[#0044cc] transition-all duration-300 ease-in-out"
        >
          Cancel payment
        </button>
      </div>
    );
  }

  return (
    <section className="pb-[28px] xl:pb-[67px]">
      <div className="max-w-[1370px] px-[15px] mx-auto my-0">
        <h1 className="text-[18px]/[27px] font-poppins font-semibold mb-[16px] xl:text-[32px]/[48px] xl:mb-[29px]">
          Shopping Cart
        </h1>

        <div className="md:flex md:gap-[33px] md:justify-between">
          <div className="xl:w-[100%]">
            {products.map((product) => {
              const unitPrice = parseFloat(product.sale_price || product.original_price);
              const slug = categoryToSlug[product.category];

              return (
                <div key={product.id} className="flex flex-wrap border-b-[1px] border-b-[#CACDD8] mb-[17px] gap-[13px] pb-[18px] w-[100%] xl:flex-nowrap">
                  <div className="flex gap-[18px] items-center">
                    <img className="w-[68px] h-[68px] xl:w-[120px] xl:h-[120px] object-contain" src={product.images[0]} alt="" />
                    <NavLink to={`/${slug}/${product.id}`} className="text-[10px]/[15px] font-poppins font-normal xl:text-[14px]/[21px]">{product.name}</NavLink>
                  </div>
                  <div className="flex gap-[45px] w-[100%] justify-between items-center">
                    <div className="flex flex-col gap-[7px]">
                      <span className="text-[11px]/[17px] font-poppins font-semibold xl:text-[14px]/[21px]">Price</span>
                      <span className="text-[12px]/[18px] font-poppins font-semibold xl:text-[14px]/[21px]">${unitPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col gap-[7px]">
                      <span className="text-[11px]/[17px] font-poppins font-semibold xl:text-[14px]/[21px]">Qty</span>
                      <div className="bg-[#F5F7FF] rounded-[15px] flex w-[56px] justify-between px-[11px] py-[5px] items-center cursor-pointer xl:w-[100px]">
                        <span className="text-[11px]/[210%] font-poppins font-semibold text-center block xl:text-[14px]">{product.quanity}</span>
                        <div className="z-20">
                          <ChevronUp onClick={() => dispatch(changeQuantity({ id: product.id, d: 1 }))} color="#A2A6B0" size={`16px`} className="mb-[10px]" />
                          <ChevronDown onClick={() => dispatch(changeQuantity({ id: product.id, d: -1 }))} color="#A2A6B0" size={`16px`} />
                        </div>
                      </div>
                    </div>
                    <div>
                      <X onClick={() => dispatch(deleteProduct(product.id))} className="border-[2px] border-[CACDD8] rounded-[50%] cursor-pointer" color="#A1A1A1" size="16px" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-[#F5F7FF] p-[10px] flex flex-col gap-[25px] items-center justify-center xl:max-w-[446px] xl:w-[100%]">
            <div className="flex flex-row gap-[7px] items-center justify-center">
              <span className="text-[11px]/[17px] font-poppins font-semibold xl:text-[18px]/[210%]">Total Price:</span>
              <span className="text-[12px]/[18px] font-poppins font-semibold xl:text-[18px]/[210%]">${totalCartPrice.toFixed(2)}</span>
            </div>
            <div>
              <button onClick={handleOrder} className="w-[100%] bg-[#0156FF] py-[8px] rounded-[30px] text-[13px]/[20px] font-poppins font-semibold text-white mb-[10px] cursor-pointer xl:text-[14px]/[21px] xl:py-[15px] hover:bg-[#0044cc] transition-all duration-300 ease-in-out">
                Proceed to Checkout
              </button>
              <button onClick={() => dispatch(clearCart())} className="relative w-[100%] bg-black py-[8px] rounded-[30px] text-[13px]/[20px] font-poppins font-semibold text-white mb-[10px] cursor-pointer xl:text-[14px]/[21px] xl:py-[15px]">
                Clear Shopping Cart
              </button>
              <NavLink className="text-[11px]/[20px] text-[#0156FF] font-poppins font-normal mt-[15px] text-center block hover:text-[#0044cc] transition-all duration-300 ease-in-out" to="/SuccessOrders">
                Check my orders
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};