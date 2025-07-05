import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useDoctorsList = () => {
  const { data: doctorsList = [], refetch, isLoading } = useQuery({
    queryKey: ['doctorslist'],
    queryFn: async () => {
      const res = await axios.get('/services/api/get-all');
      return res.data.res || res.data;
    },
  });

  return [ doctorsList, refetch, isLoading ];
};

export default useDoctorsList;
