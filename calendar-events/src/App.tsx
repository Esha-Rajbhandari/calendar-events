import { Route, Routes } from "react-router-dom";

import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("./pages/Home"));

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default App;
