import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { HomePage } from "./modules/HomePage/HomePage";
import { PageNotFound } from "./modules/PageNotFound/PageNotFound";
import { CatalogPage } from "./modules/CatalogPage/CatalogPage";
import { AboutUsPage } from "./modules/AboutUsPage/AboutUs";
import { ProductDetailsPage } from "./modules/ProductDetailsPage/ProductDetailsPage";
import { FaqPage } from "./modules/FaqPage/FaqPage";
import { CartPage } from "./modules/CartPage/CartPage";
import { LoginPage } from "./modules/LoginPage/LoginPage";

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path=":category">
            <Route index element={<CatalogPage />} />
            <Route path=":id" element={<ProductDetailsPage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
          <Route path="about" element={<AboutUsPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};