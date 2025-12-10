import { CirclePlus } from 'lucide-react';
import DiscordLogo from '../../../public/discord-icon-43736.png';
import SlackLogo from '../../../public/Slack_icon_2019.svg.png';
import TelegramLogo from '../../../public/telegram.png';
import PlatformInviteCard from '../card/platform-invite-card';
import LinkBotModal from '../modal/link-bot-modal';
import { Separator } from '../ui/separator';

import { useQuery } from '@tanstack/react-query';
import { inviteUrlsOptions } from '@/utils/queries/platform';

const staticBotItems = [
  {
    label: 'Slack',
    description: 'Connect a Slack workspace',
    icon: <img src={SlackLogo} alt="slack-logo" className="h-9 w-9" />,
    buttonLabel: 'Generate Link Token',
  },
];

const NewBotSection = () => {
  const { data: allUrlsData, isLoading: isUrlsLoading } =
    useQuery(inviteUrlsOptions);

  const urls = allUrlsData?.data;

  const discordItem = {
    label: 'Discord',
    description: 'Connect a Discord server',
    icon: <img src={DiscordLogo} alt="discord-logo" className="h-9 w-9" />,
    inviteLink: urls?.discord || '',
    buttonLabel: 'Invite Discord Bot',
    isDisabled: isUrlsLoading || !urls?.discord,
  };

  const telegramItem = {
    label: 'Telegram',
    description: 'Connect a Telegram group',
    icon: <img src={TelegramLogo} alt="telegram-logo" className="h-9 w-9" />,
    inviteLink: urls?.telegram || '',
    buttonLabel: 'Invite Telegram Bot',
    isDisabled: isUrlsLoading || !urls?.telegram,
  };

  const newBotItems = [
    discordItem,
    telegramItem,
    ...staticBotItems.map((item) => ({
      ...item,
      inviteLink: item.label === 'Slack' ? urls?.slack || null : null,
      isDisabled: item.label === 'Slack' ? isUrlsLoading : false,
    })),
  ];

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
        {newBotItems.map((item) => (
          <PlatformInviteCard key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
};

export default NewBotSection;
