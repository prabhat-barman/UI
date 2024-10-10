import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../constants";
import LoginPage from "../pages/LoginPage";
import HtmlToPdf from "../components/PDF/HtmlToPdf";

export default function RoutesComponent(): JSX.Element {
  return (
    <Suspense fallback={<div></div>}>
      <Routes>
        <Route path={ROUTES.Login} element={<LoginPage />} />
        <Route path={ROUTES.PasswordReset} element={<LoginPage />} />
        <Route path={ROUTES.pdf} element={<HtmlToPdf />} />
      </Routes>
    </Suspense>
  );
}
