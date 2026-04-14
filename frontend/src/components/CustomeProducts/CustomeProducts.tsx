import type { Product } from "@/types/Product";
import { ProductsList } from "../ProductsList/ProductsList";
import type React from "react";

type CurstomeProductsProps = {
  products: Product[];
  errorMessage: string;
};

export const CurstomeProducts: React.FC<CurstomeProductsProps> = ({
  products,
  errorMessage,
}) => {
  const message =
    errorMessage ||
    (!errorMessage && products.length === 0
      ? "There are no products"
      : null);

  return (
    <section className="pb-[36px]">
      <div className="max-w-[1370px] px-[15px] mx-auto my-0 w-[100%]">
        {products.length > 0 && (
          <ProductsList
            products={products}
            title="Custome Builds"
            bgBanner="url(images/custome-builds-bg.png)"
            toProducts="other"
          />
        )}

        {message && (
          <div>
            <h1 className="font-poppins font-semibold text-[22px] leading-[33px] text-black mb-[25px]">
              Custome products
            </h1>

            <p className="font-poppins font-normal text-[18px] leading-[120.5%] text-black">
              {message}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};