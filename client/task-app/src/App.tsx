import { AppRouter } from "./routes/appRouter";
import { Toaster } from "react-hot-toast";
import Logo from "../assets/Logo.svg";
import "./App.css";
function App() {
  return (
    <>
      <AppRouter />
      <Toaster position="top-center" reverseOrder={false} />
      <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
        <aside className="grid-flow-col items-center">
          <img className="size-12" src={Logo} alt="Logo" />
          <p>
            RzCorp Copyright © {new Date().getFullYear()} - All right reserved
          </p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end"></nav>
      </footer>
    </>
  );
}

export default App;
