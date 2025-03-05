
import React from 'react';
import DashboardComponent from '@/components/dashboard/Dashboard';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24">
        <DashboardComponent />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
