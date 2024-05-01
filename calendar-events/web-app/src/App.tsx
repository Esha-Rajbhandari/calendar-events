import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import { Suspense, lazy } from "react";
import AuthRoute from "./components/AuthRoute";

const HomePage = lazy(() => import("./pages/Home"));

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/home"
        element={
          <AuthRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <HomePage />
            </Suspense>
          </AuthRoute>
        }
      />
    </Routes>
  );
};

export default App;
