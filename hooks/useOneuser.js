import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useUserEmail = (email) => {
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['user', email],
    enabled: !!email, // only runs if `email` is provided
    queryFn: async () => {
      const res = await axios.get(`/api/user/${email}`);
      console.log(res.data)
      return res.data;
    },
  });

  return { user, isLoading, error, refetch };
};

export default useUserEmail;
