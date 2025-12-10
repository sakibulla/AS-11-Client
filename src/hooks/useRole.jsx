import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useRole = () => {
  const { user } = useAuth();

  const { isLoading:roleLoading, data: role = "user" } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email, // Only run when email exists
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/users/${user?.email}/role`);
      const data = await res.json();
      return data.role; // Extract only the role string
    },
  });

  return { role, roleLoading };
};

export default useRole;
