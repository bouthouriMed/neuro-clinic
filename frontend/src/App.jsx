import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import PublicLayout from "./components/layout/PublicLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { HeroVideoProvider } from "./contexts/HeroVideoContext";
import { AuthProvider } from "./contexts/AuthContext";
import SitePreloader from "./components/ui/SitePreloader";
import ScrollToTop from "./components/ScrollToTop";

const Home = lazy(() => import("./pages/public/Home"));
const About = lazy(() => import("./pages/public/About"));
const Services = lazy(() => import("./pages/public/Services"));
const BookAppointment = lazy(() => import("./pages/public/BookAppointment"));
const Contact = lazy(() => import("./pages/public/Contact"));
const Login = lazy(() => import("./pages/public/Login"));
const TermsAndConditions = lazy(
  () => import("./pages/public/TermsAndConditions"),
);
const DataDeletion = lazy(() => import("./pages/public/DataDeletion"));

const Overview = lazy(() => import("./pages/dashboard/Overview"));
const Appointments = lazy(() => import("./pages/dashboard/Appointments"));
const Patients = lazy(() => import("./pages/dashboard/Patients"));
const CalendarView = lazy(() => import("./pages/dashboard/CalendarView"));
const Notifications = lazy(() => import("./pages/dashboard/Notifications"));
const Schedule = lazy(() => import("./pages/dashboard/Schedule"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <HeroVideoProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<SitePreloader isLoading={true} />}>
            <Routes>
              {/* Public Website */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/book" element={<BookAppointment />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/data-deletion" element={<DataDeletion />} />
              </Route>

              {/* Login */}
              <Route path="/login" element={<Login />} />

              {/* Doctor Dashboard (Protected) */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Overview />} />
                <Route path="appointments" element={<Appointments />} />
                <Route path="patients" element={<Patients />} />
                <Route path="calendar" element={<CalendarView />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="schedule" element={<Schedule />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </HeroVideoProvider>
  );
}
