import { CirclePlus, Disc } from 'lucide-react';
import DiscordLogo from '../../../public/discord-icon-43736.png';
import TelegramLogo from '../../../public/Slack_icon_2019.svg.png';
import SlackLogo from '../../../public/telegram.png';
import PlatformInviteCard from '../card/platform-invite-card';
import LinkBotModal from '../modal/link-bot-modal';
import { Separator } from '../ui/separator';

const newBotItems = [
  {
    label: 'Discord',
    description: 'Connect a Discord server',
    icon: <img src={DiscordLogo} alt="discord-logo" className="h-9 w-9" />,
    inviteLink: '',
    buttonLabel: 'Invite Discord bot',
  },
  {
    label: 'Telegram',
    description: 'Connect a Telegram group',
    icon: <img src={TelegramLogo} alt="telegram-logo" className="h-9 w-9" />,
    inviteLink: '',
    buttonLabel: 'Invite Telegram bot',
  },
  {
    label: 'Slack',
    description: 'Connect a Slack workspace',
    icon: <img src={SlackLogo} alt="slack-logo" className="h-9 w-9" />,
    inviteLink: '',
    buttonLabel: 'Invite Slack bot',
  },
];

const NewBotSection = () => {
  return (
    <div className="mt-10">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <CirclePlus size={20} />
          <p className="text-2xl"> Add new platform</p>
        </div>
        <Separator orientation="vertical" className="py-3" />
        <LinkBotModal />
      </div>

      <div className="grid grid-cols-3 gap-3 mt-5">
        {newBotItems.map((item) => (
          <PlatformInviteCard item={item} />
        ))}
      </div>
    </div>
  );
};

export default NewBotSection;
