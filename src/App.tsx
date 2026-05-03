import { Navigate, Route, Routes } from "react-router-dom";

import PremiumPublicLayout from "./components/public/PremiumPublicLayout";
import RoleProtectedRoute from "./components/auth/RoleProtectedRoute";

import HomePage from "./pages/public/HomePage";
import PortfolioPage from "./pages/public/PortfolioPage";
import ServicesPage from "./pages/public/ServicesPage";
import ContactPage from "./pages/public/ContactPage";
import BookingPage from "./pages/public/BookingPage";

import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminGalleryManagerPage from "./pages/admin/AdminGalleryManagerPage";
import AdminCreateGalleryPage from "./pages/admin/AdminCreateGalleryPage";
import AdminUploadPage from "./pages/admin/AdminUploadPage";
import AdminClientManagerPage from "./pages/admin/AdminClientManagerPage";
import AdminInvoiceManagerPage from "./pages/admin/AdminInvoiceManagerPage";
import AdminAuditLogsPage from "./pages/admin/AdminAuditLogsPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";

import ClientLayout from "./components/layout/ClientLayout";
import ClientLoginPage from "./pages/client/ClientLoginPage";
import ClientDashboardPage from "./pages/client/ClientDashboardPage";
import ClientGalleriesPage from "./pages/client/ClientGalleriesPage";
import ClientGalleryDetailPage from "./pages/client/ClientGalleryDetailPage";
import ClientDownloadsPage from "./pages/client/ClientDownloadsPage";
import ClientInvoicePage from "./pages/client/ClientInvoicePage";
import ClientSettingsPage from "./pages/client/ClientSettingsPage";
import ClientFavoritesPage from "./pages/client/ClientFavoritesPage";
import ClientProofingNotesPage from "./pages/client/ClientProofingNotesPage";
import ClientDownloadStatusPage from "./pages/client/ClientDownloadStatusPage";
import ClientSessionDetailsPage from "./pages/client/ClientSessionDetailsPage";
import ClientProfilePage from "./pages/client/ClientProfilePage";
import ClientContractPage from "./pages/client/ClientContractPage";
import ClientSupportPage from "./pages/client/ClientSupportPage";

function App() {
  return (
    <Routes>
      {/* PUBLIC WEBSITE */}
      <Route element={<PremiumPublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* AUTH ROUTES */}
      <Route path="/login" element={<ClientLoginPage />} />
      <Route path="/client/login" element={<ClientLoginPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* ADMIN PORTAL — PROTECTED */}
      <Route
        path="/admin"
        element={
          <RoleProtectedRoute allowedRoles={["ADMIN", "STAFF"]}>
            <AdminLayout />
          </RoleProtectedRoute>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="galleries" element={<AdminGalleryManagerPage />} />
        <Route path="galleries/create" element={<AdminCreateGalleryPage />} />
        <Route path="upload" element={<AdminUploadPage />} />
        <Route path="clients" element={<AdminClientManagerPage />} />
        <Route path="invoices" element={<AdminInvoiceManagerPage />} />
        <Route path="audit-logs" element={<AdminAuditLogsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>

      {/* 
        CLIENT PORTAL — TEMPORARILY UNPROTECTED FOR LOCALHOST UI TESTING

        This is intentional for now.

        Earlier issue:
        - Client login redirected home
        - RoleProtectedRoute caused a role mismatch / redirect loop
        - Backend has not been redeployed yet for final auth/CORS/role testing

        Later:
        - Redeploy backend
        - Test https://api.nubbymedia.com/api/users/me
        - Confirm exact client role response
        - Restore RoleProtectedRoute around this ClientLayout
      */}
      <Route path="/client" element={<ClientLayout />}>
        <Route index element={<ClientDashboardPage />} />

        <Route path="galleries" element={<ClientGalleriesPage />} />
        <Route path="galleries/:galleryId" element={<ClientGalleryDetailPage />} />

        <Route path="downloads" element={<ClientDownloadsPage />} />
        <Route path="invoice" element={<ClientInvoicePage />} />
        <Route path="settings" element={<ClientSettingsPage />} />

        <Route path="favorites" element={<ClientFavoritesPage />} />
        <Route path="proofing" element={<ClientProofingNotesPage />} />
        <Route path="download-status" element={<ClientDownloadStatusPage />} />
        <Route path="session-details" element={<ClientSessionDetailsPage />} />
        <Route path="profile" element={<ClientProfilePage />} />
        <Route path="contract" element={<ClientContractPage />} />
        <Route path="support" element={<ClientSupportPage />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;