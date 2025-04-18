import { Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth";
import { useEffect } from "react";
import RootLayout from "../components/layout/RootLayout";

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
  }, [user, navigate]);

  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}
