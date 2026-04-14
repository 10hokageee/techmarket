import { changeQuantity, clearCart, deleteProduct } from "@/features/addToCart";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.cart.products);
  const navigate = useNavigate();
  if (products.length === 0) {
    return <section className="p-10 text-center flex items-center justify-center flex-col">
      <p className="xl:text-[32px]/[48px] mb-[10px] font-poppins font-semibold"> Your cart is empty</p>

      <button onClick={() => navigate(-1)} className="bg-[#0156FF] py-[8px] max-w-[130px] w-[100%] rounded-[20px] text-white text-[14px]/[21px] font-poppins font-normal">Back</button>
    </section>;
  }

  const totalCartPrice = products.reduce((acc, product) => {
    const price = parseFloat(product.sale_price || product.original_price);
    return acc + price * product.quanity;
  }, 0);


  return (
    <section className="pb-[28px] xl:pb-[67px]">
      <div className="max-w-[1370px] px-[15px] mx-auto my-0">
        <h1 className="text-[18px]/[27px] font-poppins font-semibold mb-[16px] xl:text-[32px]/[48px] xl:mb-[29px]">Shopping Cart</h1>
        <div className="md:flex md:gap-[33px] md:justify-between">
          <div className="xl:w-[100%]">
            {products.map(product => {
              const unitPrice = parseFloat(product.sale_price || product.original_price);

              return (
                <div key={product.id} className="flex flex-wrap border-b-[1px] border-b-[#CACDD8] mb-[17px] gap-[13px] pb-[18px] w-[100%] xl:flex-nowrap">
                  <div className="flex gap-[18px] items-center">
                    <img className="w-[68px] h-[68px] xl:w-[120px] xl:h-[120px]" src={product.images[0]} alt="" />
                    <h2 className="text-[10px]/[15px] font-poppins font-normal xl:text-[14px]/[21px]">{product.name}</h2>
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
                        <div>
                          <ChevronUp onClick={() => dispatch(changeQuantity({ id: product.id, d: 1 }))} color="#A2A6B0" size={`16px`} className="mb-[10px]" />
                          <ChevronDown onClick={() => dispatch(changeQuantity({ id: product.id, d: -1 }))} color="#A2A6B0" size={`16px`} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <X onClick={() => dispatch(deleteProduct(product.id))} className="border-[2px] border-[CACDD8] rounded-[50%] cursor-pointer" color="#A1A1A1" size="16px"  />
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
              <button className="w-[100%] bg-[#0156FF] py-[8px] rounded-[30px] text-[13px]/[20px] font-poppins font-semibold text-white mb-[10px] cursor-pointer xl:text-[14px]/[21px] xl:py-[15px]">Proceed to Checkout</button>
              <button className="relative w-[100%] bg-[#FFB800] py-[8px] rounded-[30px] text-[13px]/[20px] font-poppins font-semibold text-[#232C65] mb-[10px] cursor-pointer xl:text-[14px]/[21px] xl:py-[15px]">Proceed to Checkout by Paypal
              </button>
              <button onClick={() => dispatch(clearCart([]))} className="relative w-[100%] bg-black py-[8px] rounded-[30px] text-[13px]/[20px] font-poppins font-semibold text-white mb-[10px] cursor-pointer xl:text-[14px]/[21px] xl:py-[15px]">Clear Shopping Cart
              </button>
            </div>

            <div className="max-w-[220px] w-[100%] flex items-center xl:max-w-[400px]">
              <img className="w-[61px] h-[21px] mr-[8px]" src="/icons/zip-logo.svg" alt="" />
              <p className="relative font-poppins font-light text-[10px]/[121%] pl-[9px] after:bg-[#00AEB8] after:content-[''] after:w-[2px] after:h-[18px] after:absolute after:left-0 after:top-[50%] after:transform after:translate-y-[-50%] xl:text-[12px]/[120%]">
                own it now, up to 6 months interest free

                <a className="underline" href="">learn more</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}