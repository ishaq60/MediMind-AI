import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useUsersList = () => {
  const { data: users = [], refetch, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axios.get('/api/alluser');
      return res.data.res || res.data;
    },
  });

  return { users, refetch, isLoading, isError, error };
};

export default useUsersList;
