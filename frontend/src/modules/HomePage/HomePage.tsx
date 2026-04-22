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
import { ComponentsProducts } from "@/components/ComponentsProducts/ComponentsProdcuts";
import { Loader } from "@/components/Loader/Loader";

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    setTimeout(() => {
      getProducts().then(productsFromServer => setProducts(productsFromServer))
        .catch(() => setErrorMessage('Something went wrong'))
        .finally(() => setLoading(false));
    }, 300)
  }, [])

  const productsByFilter = (category: string) => {
    return products.filter(product => product.category.toLowerCase() === category.toLowerCase())
  }


  return (
    <React.Fragment>
      {loading && (
        <Loader />
      )}
      <Slider />
      <NewProducts errorMessage={errorMessage} products={products} />
      <ZipBlock />
      <CurstomeProducts errorMessage={errorMessage} products={productsByFilter('Others product')} />
      <LaptopsList errorMessage={errorMessage} products={productsByFilter('Laptops')} />
      <DesktopsList errorMessage={errorMessage} products={productsByFilter('Desktop PC`s')} />
      <ComponentsProducts errorMessage={errorMessage} products={productsByFilter('PC parts')} />
      <Brands />
    </React.Fragment>
  );
};