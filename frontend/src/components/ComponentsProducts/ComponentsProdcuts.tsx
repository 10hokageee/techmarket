import type { Product } from "@/types/Product";
import { ProductsList } from "../ProductsList/ProductsList";

type ComponentsProductsProps = {
  products: Product[];
  errorMessage: string;
};

export const ComponentsProducts: React.FC<ComponentsProductsProps> = ({
  products,
  errorMessage,
}) => {
  const message =
    errorMessage ||
    (!errorMessage && products.length === 0
      ? "There are no products"
      : null);

  return (
    <section className="pb-[80px]">
      <div className="max-w-[1370px] px-[15px] mx-auto my-0 w-[100%]">
        {products.length > 0 && (
          <ProductsList
            products={products}
            title="PC parts"
            bgBanner="url(images/msi-monitors-bg.png)"
            toProducts="pc_part"
          />
        )}

        {message && (
          <div>
            <h1 className="font-poppins font-semibold text-[22px] leading-[33px] text-black mb-[25px]">
              PC parts
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