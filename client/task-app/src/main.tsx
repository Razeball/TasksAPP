import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import logo from "./assets/Logo.svg";
import AuthProvider from "./context/AuthContext.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
          <aside className="grid-flow-col items-center">
            <img className="size-12" src={logo} alt="Logo" />
            <p>
              RzCorp Copyright © {new Date().getFullYear()} - All right reserved
            </p>
          </aside>
          <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end"></nav>
        </footer>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
