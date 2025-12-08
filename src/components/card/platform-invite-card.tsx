import { JSX } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';

type PlatformInviteCardProps = {
  label: string;
  description: string;
  icon: JSX.Element;
  inviteLink: string;
  buttonLabel: string;
};

const PlatformInviteCard = ({ item }: { item: PlatformInviteCardProps }) => {
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
          onClick={() => window.open(item.inviteLink, '_blank')}
        >
          {item.buttonLabel}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlatformInviteCard;
