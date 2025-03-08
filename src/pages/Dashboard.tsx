
import React from 'react';
import DashboardComponent from '@/components/dashboard/Dashboard';
import RouterHeader from '@/components/layout/RouterHeader';
import Footer from '@/components/layout/Footer';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background bg-hero-pattern">
      <RouterHeader />
      <main className="flex-1 pt-24">
        <DashboardComponent />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
