import { Navigate, Route, Routes } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import ChatLayout from "../layouts/ChatLayout";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Chat from "../pages/chat/Chat";
import Profile from "../pages/chat/Profile";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route
                path="/login"
                element={
                <AuthLayout>
                    <Login />
                </AuthLayout>
                }
            />

            <Route
                path="/signup"
                element={
                <AuthLayout>
                    <Signup />
                </AuthLayout>
                }
            />

            <Route
                path="/chat"
                element={
                <ChatLayout>
                    <Chat />
                </ChatLayout>
                }
            />

            <Route
                path="/profile"
                element={
                <ChatLayout>
                    <Profile />
                </ChatLayout>
                }
            />


            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
