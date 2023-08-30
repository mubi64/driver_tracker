import { FrappeProvider } from "frappe-react-sdk";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";

const DeliveryTracker = lazy(() => import("./pages/DeliveryTracker"));

function App() {
  return (
    <FrappeProvider socketPort={import.meta.env.VITE_SOCKT_PORT ?? ""}>
      <BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
        <Suspense fallback={<Loader isOpen={true} />}>
          <Routes>
            <Route path="/" element={<DeliveryTracker />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </FrappeProvider>
  );
}

export default App;
