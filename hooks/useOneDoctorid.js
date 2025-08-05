import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useOneDoctorFindId= (id) => {
  const {
    data: doctor,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['doctor',id],
    enabled: !!id, // only runs if `email` is provided
    queryFn: async () => {
      const res = await axios.get(`/api/ondoctorbyid/${id}`);
      console.log(res.data)
      return res.data;
    },
  });

  return { doctor, isLoading, error, refetch };
};

export default useOneDoctorFindId;
