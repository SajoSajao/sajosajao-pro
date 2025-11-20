import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from './components/common/ScrollToTop';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { CourseDetails } from './pages/CourseDetails';
import { Contact } from './pages/Contact';
import { TermsOfService } from './pages/TermsOfService';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { DashboardHome } from './pages/DashboardHome';
import { CustomerEnquiries } from './pages/CustomerEnquiries';
import { ContactMessages } from './pages/ContactMessages';
import UserManagement from './pages/UserManagement';
import { ROUTES } from './constants/routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Admin Login - No Layout */}
        <Route path={ROUTES.ADMIN.LOGIN} element={<AdminLogin />} />
        
        {/* Admin Dashboard */}
        <Route path={ROUTES.ADMIN.DASHBOARD} element={<AdminDashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="enquiries" element={<CustomerEnquiries />} />
          <Route path="messages" element={<ContactMessages />} />
          <Route path="users" element={<UserManagement />} />
          {/* Add more admin routes here */}
        </Route>
        
        {/* Main Site with Layout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.COURSES} element={<Courses />} />
          <Route path={ROUTES.COURSE_DETAILS} element={<CourseDetails />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path={ROUTES.TERMS} element={<TermsOfService />} />
          <Route path={ROUTES.PRIVACY} element={<PrivacyPolicy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
