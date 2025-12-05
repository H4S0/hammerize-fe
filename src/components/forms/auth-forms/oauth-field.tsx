import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import DiscordLogo from '../../../../public/discord-icon-43736.png';

const OAuthField = () => {
  return (
    <div className="flex gap-2 w-full justify-center">
      <Button variant="outline" className="flex-1">
        Discord
        <img src={DiscordLogo} alt="discord" className="w-5 h-5" />
      </Button>
      <Button variant="outline" className="flex-1">
        GitHub
        <Github />
      </Button>
    </div>
  );
};

export default OAuthField;
