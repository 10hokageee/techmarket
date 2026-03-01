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
import { ComponentsProdcuts } from "@/components/ComponentsProdcuts/ComponentsProdcuts";

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getProducts().then(productsFromServer => setProducts(productsFromServer))
      .catch(() => setErrorMessage('Something went wrong'))
  }, [])

  const productsByFilter = (category: string) => {
    return products.filter(product => product.category.toLowerCase() === category.toLowerCase())
  }

  return (
    <React.Fragment>
      <Slider />
      <NewProducts errorMessage={errorMessage} products={products} />
      <ZipBlock />
      <CurstomeProducts errorMessage={errorMessage} products={productsByFilter('Others product')} />
      <LaptopsList errorMessage={errorMessage} products={productsByFilter('Laptops')} />
      <DesktopsList errorMessage={errorMessage} products={productsByFilter('Desktop PC`s')} />
      <ComponentsProdcuts errorMessage={errorMessage} products={productsByFilter('PC parts')} />
      <Brands />
    </React.Fragment>
  );
};