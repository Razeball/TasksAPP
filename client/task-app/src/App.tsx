import { AppRouter } from "./routes/appRouter";
import { Toaster } from "react-hot-toast";

import "./App.css";
function App() {
  return (
    <>
      <AppRouter />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
