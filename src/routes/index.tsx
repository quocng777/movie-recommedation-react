import { createBrowserRouter, Navigate, useLocation } from "react-router-dom";
import { getCurrentAuthentication } from "../app/api/auth/auth-slice";
import { useSelector } from "react-redux";
import { AuthLayout } from "@/layouts/auth-layout";
import { Homepage } from "@/pages/home/home-page";
import { MainLayout } from "@/layouts/main-layout";
import { Suspense } from "react";
import { FallbackScreen } from "@/components/custom/fallback-screen";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector(getCurrentAuthentication);
  const location = useLocation();

  return user ? (
    children
  ) : (
    <Navigate
      to={`/login?redirectTo=${encodeURIComponent(location.pathname)}`}
      replace
    ></Navigate>
  );
};

export const router = createBrowserRouter([
  {
    path: "/login",
    lazy: async () => {
      const { default: LoginPage } = await import("../pages/auth/login-page");
      return {
        element: (
          <Suspense fallback={<FallbackScreen />}>
            <AuthLayout>
              {" "}
              <LoginPage />
            </AuthLayout>
          </Suspense>
        ),
      };
    },
  },
  {
    path: "/register",
    lazy: async () => {
      const { default: RegisterPage } = await import(
        "../pages/auth/register-page"
      );
      return {
        element: (
          <Suspense fallback={<FallbackScreen />}>
            <AuthLayout>
              {" "}
              <RegisterPage />
            </AuthLayout>
          </Suspense>
        ),
      };
    },
  },
  {
    path: "",
    lazy: async () => {
      const { Homepage } = await import("../pages/home/home-page");
      return {
        element: (
          <Suspense fallback={<FallbackScreen />}>
            <MainLayout>
              <Homepage />
            </MainLayout>
          </Suspense>
        ),
      };
    },
  },
  {
    path: "/protected",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <Homepage />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/movie/:id",
    lazy: async () => {
    const { MovieDetail} = await import("../pages/movie/movie-detail");

      return {
        element: (
          <MainLayout>
            <AuthLayout>
              {" "}
              <MovieDetail />
            </AuthLayout>
          </MainLayout>
        ),
      };
    },
  },
]);
