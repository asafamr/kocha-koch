import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppPage } from "./pages/AppPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppPage />
  </StrictMode>,
);
