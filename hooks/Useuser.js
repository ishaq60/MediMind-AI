import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useUsersList = () => {
  const { data: alluser = [], refetch, isLoading, isError, error } = useQuery({
    queryKey: ['alluser'],
    queryFn: async () => {
      const res = await axios.get('/api/alluser');
      return res.data.res || res.data;
    },
  });

  return { alluser, refetch, isLoading, isError, error };
};

export default useUsersList;
