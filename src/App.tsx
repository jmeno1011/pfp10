import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Dashboard, Home, Login } from "./pages";
import ProtectedRoute from "./routes/ProtectedRoute";
import useAuthStore from "./store/auth";

function App() {
  const user = useAuthStore((state) => state.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={"/"} />}
        />
        <Route element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
