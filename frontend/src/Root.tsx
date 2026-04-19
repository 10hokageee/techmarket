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
import { RegisterPage } from "./modules/RegisterPage/RegisterPage";
import { ScrollToTop } from "./utils/scrollToTop";
import { OurTeamPage } from "./modules/OurTeamPage/OurTeamPage";
import { SuccessOrdersPage } from "./modules/SuccessOrdersPage/SuccessOrdersPage";

export const Root = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path=":category">
            <Route index element={<CatalogPage />} />
            <Route path=":id" element={<ProductDetailsPage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
          <Route path="About" element={<AboutUsPage />} />
          <Route path="FAQ" element={<FaqPage />} />
          <Route path="Cart" element={<CartPage />} />
          <Route path="Login" element={<LoginPage />} />
          <Route path="Register" element={<RegisterPage />} />
          <Route path="Team" element={<OurTeamPage />} />
          <Route path="SuccessOrders" element={<SuccessOrdersPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};