import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import DiscordLogo from '../../../../public/discord-icon-43736.png';
import { useState } from 'react';
import { BE_URL } from '@/utils/axios-config/get-valid-token';

const OAuthField = () => {
  const [loading, setLoading] = useState<'github' | 'discord' | null>(null);

  const handleOAuth = (provider: 'github' | 'discord') => {
    setLoading(provider);

    window.location.href = `${BE_URL}/auth/oauth/redirect?provider=${provider}`;
  };

  return (
    <div className="flex gap-2 w-full justify-center">
      <Button
        variant="outline"
        className="flex-1 flex items-center justify-center gap-2"
        onClick={() => handleOAuth('discord')}
        disabled={loading === 'discord'}
      >
        {loading === 'discord' ? 'Connecting...' : 'Discord'}
        <img src={DiscordLogo} alt="discord" className="w-5 h-5" />
      </Button>

      <Button
        variant="outline"
        className="flex-1 flex items-center justify-center gap-2"
        onClick={() => handleOAuth('github')}
        disabled={loading === 'github'}
      >
        {loading === 'github' ? 'Connecting...' : 'GitHub'}
        <Github />
      </Button>
    </div>
  );
};

export default OAuthField;
