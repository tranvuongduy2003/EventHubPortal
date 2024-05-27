import { AuthProtectedRoute, HomeLayout } from "@/layouts";
import { LoginPage } from "@/pages/auth";
import {
  CategoriesPage,
  CreateCategoryPage,
  EditCategoryPage,
} from "@/pages/categories";
import { DashboardPage } from "@/pages/dashboard";
import { CreateEventPage, EditEventPage, EventsPage } from "@/pages/events";
import { NotFoundPage } from "@/pages/notfound";
import { PaymentsPage } from "@/pages/payments";
import { PermissionsPage } from "@/pages/permissions";
import { CreateUserPage, EditUserPage, UsersPage } from "@/pages/users";
import { Navigate, Route, Routes } from "react-router-dom";

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

          {/* Events */}
          <Route path="events" element={<EventsPage />} />
          <Route path="events/create" element={<CreateEventPage />} />
          <Route path="events/edit/:eventId" element={<EditEventPage />} />

          {/* Categories */}
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="categories/create" element={<CreateCategoryPage />} />
          <Route
            path="categories/edit/:categoryId"
            element={<EditCategoryPage />}
          />

          {/* Permissions */}
          <Route path="permissions" element={<PermissionsPage />} />

          {/* Users */}
          <Route path="users" element={<UsersPage />} />
          <Route path="users/create" element={<CreateUserPage />} />
          <Route path="users/edit/:userId" element={<EditUserPage />} />

          <Route path="payments" element={<PaymentsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
