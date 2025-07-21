
import { getServicesDetails } from "@/app/services/getDoctor";
import DoctorDetailsClient from "@/app/components/doctorDetails/DoctorDetailsClient";

export default async function Page({ params }) {
  const doctorData = await getServicesDetails(params.id);

  return <div >
    <DoctorDetailsClient doctorData={doctorData} />
  </div>;
}
