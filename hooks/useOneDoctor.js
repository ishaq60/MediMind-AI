import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useDoctorfind= (name) => {
  const {
    data: doctor,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['doctor', name],
    enabled: !!name, // only runs if `email` is provided
    queryFn: async () => {
      const res = await axios.get(`/api/onedoctor/${name}`);
      console.log(res.data)
      return res.data;
    },
  });

  return { doctor, isLoading, error, refetch };
};

export default useDoctorfind;
