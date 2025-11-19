import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { EnrollmentModal } from '../components/common/EnrollmentModal';

export const MainLayout: React.FC = () => {
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<{
    name: string;
    fee: string;
  }>({
    name: 'Course Selection',
    fee: 'Contact us'
  });

  const handleEnrollClick = (courseName?: string, courseFee?: string) => {
    if (courseName && courseFee) {
      setSelectedCourse({ name: courseName, fee: courseFee });
    }
    setEnrollModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onEnrollClick={() => handleEnrollClick()} />
      
      <main className="flex-grow">
        <Outlet context={{ handleEnrollClick }} />
      </main>

      <Footer />

      <EnrollmentModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        courseName={selectedCourse.name}
        courseFee={selectedCourse.fee}
      />
    </div>
  );
};
