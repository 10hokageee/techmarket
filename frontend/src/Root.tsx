import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { HomePage } from "./modules/HomePage/HomePage";
import { PageNotFound } from "./modules/PageNotFound/PageNotFound";
import { CatalogPage } from "./modules/CatalogPage/CatalogPage";

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path=":category">
            <Route index element={<CatalogPage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};