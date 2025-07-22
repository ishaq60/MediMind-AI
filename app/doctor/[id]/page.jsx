
;
import DoctorDetailsClient from "@/app/components/doctorDetails/DoctorDetailsClient";
// import DoctorDetailsClient from "@/app/components/DoctorDetailsClient";
import { getServicesDetails } from "@/app/services/getDoctor";


export default async function Page({ params }) {
  const doctorData = await getServicesDetails(params.id);

  return <div >
    <DoctorDetailsClient doctorData={doctorData} />
  </div>;
}
