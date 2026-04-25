import { ProductsDetails } from "@/components/ProductDetails/ProductsDetails";
import { getProductDetails } from "@/services/getProductDetails";
import type { Product } from "@/types/Product";
import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { PageNotFound } from "../PageNotFound/PageNotFound";
import { Loader } from "@/components/Loader/Loader";
import { AboutDetailBlock } from "@/components/AboutDetailBlock/AboutDetailBlock";
import { Breadcrumbs } from "@/shared/Breadcrumbs/Breadcrumbs";
import { SupportBlock } from "@/components/SupportBlock/SupportBlock";
import { FeaturesBlock } from "@/components/FeaturesBlock/FeaturesBlock";
import { analyticsEvent } from "@/utils/analytics";

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  const [searchParams] = useSearchParams();
  const color = searchParams.get('color');

  useEffect(() => {
    analyticsEvent("page_view", {
      page: "Product details"
    })

    if (id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(true);
      getProductDetails(+id, color ?? undefined)
        .then(setProduct)
        .finally(() => setLoading(false));
    }
  }, [id, color]);

  if (loading) {
    return <Loader />
  }

  if (!product) {
    return <PageNotFound />;
  }

  return (
    <div>
      <div className="max-w-[1370px] w-[100%] px-[15px] mx-auto my-0">
        <Breadcrumbs pathnames={pathnames} lastLabel={product.name} />
      </div>

      <ProductsDetails product={product} />

      <AboutDetailBlock />
      <SupportBlock />
      <FeaturesBlock />
    </div>
  );
}