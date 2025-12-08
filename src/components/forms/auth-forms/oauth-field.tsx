import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import DiscordLogo from '../../../../public/discord-icon-43736.png';
import { useState } from 'react';
import { BE_URL } from '@/utils/axios-config/get-valid-token';

const OAuthField = () => {
  const [loading, setLoading] = useState<'github' | 'discord' | null>(null);

  const handleOAuth = async (provider: 'github' | 'discord') => {
    try {
      setLoading(provider);

      const res = await fetch(
        `${BE_URL}/auth/oauth/redirect?provider=${provider}`
      );
      const data = await res.json();

      if (data?.data?.redirectUrl) {
        window.location.href = data.data.redirectUrl;
      } else {
        console.error('Invalid redirect URL from backend', data);
        setLoading(null);
      }
    } catch (err) {
      console.error(err);
      setLoading(null);
    }
  };

  return (
    <div className="flex gap-2 w-full justify-center">
      <Button
        variant="outline"
        className="flex-1"
        onClick={() => handleOAuth('discord')}
        disabled={loading === 'discord'}
      >
        Discord
        <img src={DiscordLogo} alt="discord" className="w-5 h-5" />
      </Button>
      <Button
        variant="outline"
        className="flex-1"
        onClick={() => handleOAuth('github')}
        disabled={loading === 'github'}
      >
        GitHub
        <Github />
      </Button>
    </div>
  );
};

export default OAuthField;
