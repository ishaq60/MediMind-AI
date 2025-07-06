// app/doctor/[id]/page.js — Server Component by default
import { getServicesDetails } from '@/app/services/getDoctor';

const DoctorDetailsPage = async ({ params }) => {
  const details = await getServicesDetails(params.id);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">{details.name}</h1>
      <p className="text-gray-700">Specialty: {details.specialty}</p>
      <p className="text-gray-700">Hospital: {details.hospital}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default DoctorDetailsPage;
