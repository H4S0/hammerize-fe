import { JSX } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';

type PlatformInviteCardProps = {
  label: string;
  description: string;
  icon: JSX.Element;
  inviteLink: string | null;
  buttonLabel: string;
  isDisabled?: boolean;
  onActionClick?: (platform: string) => void;
};

const PlatformInviteCard = ({
  item,
  onActionClick,
}: {
  item: PlatformInviteCardProps;
  onActionClick?: (platform: string) => void;
}) => {
  const isDirectInvite = !!item.inviteLink;

  const handleClick = () => {
    if (isDirectInvite) {
      if (!item.inviteLink) {
        return;
      }
      window.open(item.inviteLink, '_blank');
    } else if (onActionClick) {
      onActionClick(item.label);
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="p-2 flex-row items-center gap-2">
        {item.icon}
        <h1 className="text-xl font-bold">{item.label}</h1>
      </CardHeader>
      <CardContent className="p-2 flex flex-col gap-2">
        <p className="text-muted-foreground">{item.description}</p>
        <Button
          className="w-full"
          disabled={item.isDisabled || (!isDirectInvite && !onActionClick)}
          onClick={handleClick}
        >
          {item.buttonLabel}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlatformInviteCard;
