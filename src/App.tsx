import { AuthProtectedRoute, HomeLayout } from "@/layouts";
import { NotFoundPage } from "@/pages/notfound";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "@/pages/auth";
import { DashboardPage } from "@/pages/dashboard";
import { EventsPage } from "@/pages/events";
import { CategoriesPage } from "@/pages/categories";
import { PermissionsPage } from "@/pages/permissions";
import { UsersPage } from "@/pages/users";
import { PaymentsPage } from "@/pages/payments";

function App() {
  return (
    <Routes>
      <Route>
        {/* Auth Route */}
        <Route element={<AuthProtectedRoute />}>
          <Route path="/auth/login" element={<LoginPage />} />
        </Route>

        <Route element={<HomeLayout />}>
          {/* Products */}
          <Route path="" element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="permissions" element={<PermissionsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="payments" element={<PaymentsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
