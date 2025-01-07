import { createBrowserRouter, Navigate, useLocation } from "react-router-dom";
import { getCurrentAuthentication } from "../app/api/auth/auth-slice";
import { useSelector } from "react-redux";
import { AuthLayout } from "@/layouts/auth-layout";
import { SearchPage } from "@/pages/search/search-page";
import { MainLayout } from "@/layouts/main-layout";
import { lazy, Suspense } from "react";
import { FallbackScreen } from "@/components/custom/fallback-screen";
import InterruptsPage from "@/pages/error/interrupts";
import NotFoundPage from "@/pages/error/not-found-page";
import { PlaylistDetailsPage } from "@/pages/playlist/playlist-details-page";
import { ActivateAccountPage } from "@/pages/auth/activate-account-page";

const RegisterPageLazy = lazy(() => import("../pages/auth/register-page"));
const PlaylistPageLazy = lazy(() => import("../pages/playlist/playlist-page.tsx"));

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector(getCurrentAuthentication);
  const location = useLocation();

  return user 
    ? ( children) 
    : (
    <Navigate
      to={`/login?redirectTo=${encodeURIComponent(location.pathname)}`}
      replace
    />
  );
};

export const router = createBrowserRouter([
  {
    path: "/movie/:id",
    lazy: async () => {
      const { MovieDetail } = await import("../pages/movie/movie-detail");

      return {
        element: (
          <Suspense fallback={<FallbackScreen />}>
            <MainLayout>
              <AuthLayout>
                {" "}
                <MovieDetail />
              </AuthLayout>
            </MainLayout>
          </Suspense>
        ),
      };
    },
  },
  {
    path: "/search",
    element: (
      <Suspense fallback={<FallbackScreen />}>
        <MainLayout>
          <SearchPage />
        </MainLayout>
      </Suspense>
    ),
  },
  {
    path: "/login",
    lazy: async () => {
      const { default: LoginPage } = await import("../pages/auth/login-page");
      return {
        element: (
          <Suspense fallback={<FallbackScreen />}>
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          </Suspense>
        ),
      };
    },
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<FallbackScreen />}>
        <RegisterPageLazy />
      </Suspense>
    ),
  },
  {
    path: "/reset-password",
    lazy: async () => {
      const { default: ResetPasswordPage } = await import("../pages/auth/reset-password-page.tsx");
      return {
        element: (
          <Suspense fallback={<FallbackScreen />}>
            <AuthLayout>
              <ResetPasswordPage />
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
    path: "/interrupts",
    element: <InterruptsPage />,
  },
  {
    path: "/playlists",
    element: (
      <Suspense fallback={<FallbackScreen />}>
        <ProtectedRoute>
          <MainLayout>
            <PlaylistPageLazy />
          </MainLayout>
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/playlists/:playlistId",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <PlaylistDetailsPage />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/activate-account",
    element: (
      <ActivateAccountPage />
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
