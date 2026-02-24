import React, { useEffect, useState } from "react";
import { Brands } from "../../components/Brands/Brands";
import { Slider } from "../../components/Slider/Slider";
import { ZipBlock } from "../../components/ZipBlock/ZipBlock";
import { NewProducts } from "../../components/NewProducts/NewProducts";
import type { Product } from "../../types/Product";
import { getProducts } from "../../services/getProdcutsService";
import { CurstomeProducts } from "@/components/CustomeProducts/CustomeProducts";
import { LaptopsList } from "@/components/LaptopsList/LaptopsList";
import { DesktopsList } from "@/components/DesktopsList/DesktopsList";
import { MonitorList } from "@/components/MonitorsList/MonitorsList";

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(productsFromServer => setProducts(productsFromServer))
      .catch(e => console.log(e))
  }, [])

  const slicedProducts = products.slice(0, 4);

  return (
    <React.Fragment>
      <Slider />
      <NewProducts products={products} />
      <ZipBlock />
      <CurstomeProducts products={slicedProducts} />
      <LaptopsList products={slicedProducts} />
      <DesktopsList products={slicedProducts} />
      <MonitorList products={slicedProducts}/>
      <Brands />
    </React.Fragment>
  );
};