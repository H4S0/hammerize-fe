import { Server } from '@/utils/api/platform';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from '@tanstack/react-router';
import { Button } from '../ui/button';
import { Link2 } from 'lucide-react';

const ServerCard = ({ server }: { server: Server }) => {
  return (
    <Card>
      <CardContent className="flex flex-row p-3 justify-between items-center">
        <div className="flex flex-row items-center gap-2">
          <Avatar>
            <AvatarImage src={server.serverImage} />
            <AvatarFallback>
              {server.serverName.split(' ')[0][0] +
                server.serverName.split(' ')[1][0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1 items-start">
            <CardTitle>{server.serverName}</CardTitle>
            <CardDescription>{server.channelCount} channels</CardDescription>
          </div>
        </div>

        <Link
          to="/dashboard/bots-page/server-page/$serverId"
          params={{ serverId: server.serverId }}
        >
          <Button size="sm" variant="outline">
            <Link2 />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ServerCard;
