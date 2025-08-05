'use client'; // ✅ Required at the top

import React from 'react';
import { useParams } from 'next/navigation';
import useOneDoctorFindId from '@/hooks/useOneDoctorid';
import Doctordetailsview from '@/app/components/doctorsrelated/Doctordetailsview';


const DoctorDetailsPage = () => {
  const params = useParams();
  const doctorId = params.id;

  const { doctor, isLoading, error } = useOneDoctorFindId(doctorId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading doctor.</div>;

  return (
    <div>
      <Doctordetailsview doctor={doctor}></Doctordetailsview>
    </div>
  );
};

export default DoctorDetailsPage;
