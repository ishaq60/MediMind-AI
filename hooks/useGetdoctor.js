import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useDoctorById = (id) => {
  const {
    data: doctor,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['doctor', id],
    enabled: !!id, // only runs if `id` is provided
    queryFn: async () => {
      const res = await axios.get(`/services/api/get-one/${id}`);
      return res.data;
    },
  });

  return { doctor, isLoading, error, refetch };
};

export default useDoctorById;
