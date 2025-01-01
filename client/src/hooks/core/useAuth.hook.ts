import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { logout as logoutAction } from '@/lib/actions/auth.actions';

const useAuth = () => {
  const router = useRouter();

  const logout = useCallback(async () => {
    const response = await logoutAction();

    if (response) {
      router.push('/login');
    }
  }, []);

  return { logout };
};

export { useAuth };
