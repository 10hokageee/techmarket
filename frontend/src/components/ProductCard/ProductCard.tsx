import { NavLink } from "react-router-dom";
import type { Product } from "../../types/Product";
import { StarRating } from "../StarRating/StarRating";
import { categoryToSlug } from "@/utils/categoryToSlug";

type ProductProps = {
  product: Product;
};

export const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const image = product.images[0];
  const slug = categoryToSlug[product.category];

  return (
    <NavLink to={`/${slug}/${product.id}`}>
      <article className="group relative box-border w-[234px] md:w-[227px] h-[346px] border border-[#cacdd8] pt-[26px] pb-[21px] px-[25px] bg-white">

        <div className="absolute top-[7px] left-[25px] flex gap-[6px]">
          {product.status === true ? (
            <>
              <img src="icons/stock-icon.svg" alt="" />
              <span className="font-poppins font-normal text-[10px] leading-[210%] text-[#78a962]">
                in stock
              </span>
            </>
          ) : (
            <>
              <img src="icons/check-availability-icon.svg" alt="" />
              <span className="font-poppins font-normal text-[10px] leading-[210%] text-[#C94D3F]">
                sold out
              </span>
            </>
          )}
        </div>

        <div className="overflow-hidden">
          <img
            className="mx-auto w-[150px] h-[150px] object-contain transition-transform duration-300 group-hover:scale-110"
            src={image}
            alt={product.description}
          />
        </div>

        <StarRating rating={Number(product.rating_avg)} />

        <span className="block mb-[18px] font-poppins font-normal text-[13px] leading-[20px] text-black">
          {product.name}
        </span>

        {product.sale_price ? (
          <>
            <span className="block font-poppins font-normal text-[14px] leading-[140%] line-through text-[#666]">
              ${product.original_price}
            </span>

            <span className="block font-poppins font-semibold text-[18px] leading-[140%] text-black">
              ${product.sale_price}
            </span>
          </>
        ) : (
          <span className="block font-poppins font-semibold text-[18px] leading-[140%] text-black">
            ${product.original_price}
          </span>
        )}
      </article>
    </NavLink>
  );
};