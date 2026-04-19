import { useQuery } from '@tanstack/react-query';

import userService from '../services/users';

const useUsers = () => {
  const { isPending, data } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  });

  return {
    isPending,
    users: data ? data : [],
  };
};

export default useUsers;
