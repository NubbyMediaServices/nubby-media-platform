import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { AppShell } from "@/components/layout/AppShell";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { MediaPage } from "@/pages/MediaPage";
import { UploadPage } from "@/pages/UploadPage";
import { SharedPage } from "@/pages/SharedPage";
import { AuditPage } from "@/pages/AuditPage";
import { ProfilePage } from "@/pages/ProfilePage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="media" element={<MediaPage />} />
        <Route path="upload" element={<UploadPage />} />
        <Route path="shared" element={<SharedPage />} />
        <Route path="audit" element={<AuditPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
