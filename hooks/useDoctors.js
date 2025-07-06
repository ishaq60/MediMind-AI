import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useDoctorsList = () => {
  const { data: doctors = [], refetch, isLoading } = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      const res = await axios.get('/services/api/get-all');
      return res.data.res || res.data;
    },
  });

  return [ doctors, refetch, isLoading ];
};

export default useDoctorsList;
