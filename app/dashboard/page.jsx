"use client";

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loading from '../components/Loading';

const DashboardHomePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Wait for session to load

    const userType = "admin";
if (!session) {
      router.push('/dashboard/user');
}
    else if (userType === 'admin') {
      router.push('/dashboard/admin');
    } else if (userType === 'user') {
      router.push('/dashboard/user');
    } else if (userType === 'doctor') {
      router.push('/dashboard/doctor');
    }
  }, [session, status, router]);

  return (
    <div className="container mx-auto min-h-screen flex items-center justify-center">
    <p className="text-lg font-semibold">Loading...</p>

<Loading />
    </div>
  );
};

export default DashboardHomePage;
