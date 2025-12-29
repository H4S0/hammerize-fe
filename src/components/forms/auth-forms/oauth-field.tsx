import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import DiscordBlackLogo from '../../../../public/discord-icon-43736.png';
import DiscordWhiteLogo from '../../../../public/discord-white-icon.png';
import { useState } from 'react';
import { BE_URL } from '@/utils/axios-config/get-valid-token';
import { useTheme } from '@/components/theme/theme-provider';
import { Spinner } from '@/components/ui/spinner';

const OAuthField = () => {
  const [loading, setLoading] = useState<'github' | 'discord' | null>(null);
  const { theme } = useTheme();
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
        {loading === 'discord' ? <Spinner /> : 'Discord'}
        <img
          src={theme === 'dark' ? DiscordWhiteLogo : DiscordBlackLogo}
          alt="discord"
          className="w-5 h-5"
        />
      </Button>

      <Button
        variant="outline"
        className="flex-1 flex items-center justify-center gap-2"
        onClick={() => handleOAuth('github')}
        disabled={loading === 'github'}
      >
        {loading === 'github' ? <Spinner /> : 'GitHub'}
        <Github />
      </Button>
    </div>
  );
};

export default OAuthField;
