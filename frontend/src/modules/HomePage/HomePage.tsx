import React, { useEffect, useState } from "react";
import { Brands } from "../../components/Brands/Brands";
import { Slider } from "../../components/Slider/Slider";
import { ZipBlock } from "../../components/ZipBlock/ZipBlock";
import { NewProducts } from "../../components/NewProducts/NewProducts";
import type { Product } from "../../types/Product";
import { getProducts } from "../../services/getProdcutsService";

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(productsFromServer => setProducts(productsFromServer))
      .catch(e => console.log(e))
  }, [])


  return (
    <React.Fragment>
      <Slider />
      <NewProducts products={products} />
      <ZipBlock />
      <Brands />
    </React.Fragment>
  );
};