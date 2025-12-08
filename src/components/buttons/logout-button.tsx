import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/utils/auth/auth';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';

const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      navigate({ to: '/login', replace: true });
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="w-full flex justify-between items-center"
      onClick={handleLogout}
      disabled={isLoading}
      size="sm"
    >
      <LogOut />
      Logout
    </Button>
  );
};

export default LogoutButton;
