import { createBrowserRouter, Navigate, useLocation } from "react-router-dom";
import { getCurrentAuthentication } from "../app/api/auth/auth-slice";
import { useSelector } from "react-redux";
import { AuthLayout } from "@/layouts/auth-layout";
import { Homepage } from "@/pages/home/home-page";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const user = useSelector(getCurrentAuthentication);
    const location = useLocation();

    return (
        user ? children
            : <Navigate to={`/login?redirectTo=${encodeURIComponent(location.pathname)}`} replace></Navigate>
    );
};

export const router = createBrowserRouter([
    {
        path: '/login',
        lazy: async () => {
            const { default: LoginPage } = await import('../pages/auth/login-page');
            return {
                element: <AuthLayout> <LoginPage /></AuthLayout>
            };
        }
    },
    {
        path: '/register',
        lazy: async () => {
            const { default: RegisterPage } = await import('../pages/auth/register-page');
            return {
                element: <AuthLayout> <RegisterPage /></AuthLayout>
            };
        }
    },
    {
        path: '',
        element: (
        <ProtectedRoute>
            <Homepage />
        </ProtectedRoute>),
    }
]);