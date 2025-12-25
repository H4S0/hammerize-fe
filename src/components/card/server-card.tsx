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
import { Link2, Menu, Rows3 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type ServerCardProps = {
  server: Server;
  canManage?: boolean;
  checked: boolean;
  indeterminate?: boolean;
  onToggleServer: (checked: boolean) => void;
  onOpenChannels: () => void;
};

const ServerCard = ({
  server,
  canManage,
  checked,
  indeterminate,
  onToggleServer,
  onOpenChannels,
}: ServerCardProps) => {
  return (
    <Card>
      <CardContent className="flex flex-row p-3 justify-between items-center">
        <div className="flex flex-row items-center gap-2">
          <Avatar>
            <AvatarImage src={server.serverImage} />
            <AvatarFallback>
              {server.serverName
                .split(' ')
                .map((w) => w[0])
                .join('')
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1 items-start">
            <CardTitle>{server.serverName}</CardTitle>
            <CardDescription>{server.channelCount} channels</CardDescription>
          </div>
        </div>

        {canManage ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Menu />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>Server options</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* OPTION A */}
              <DropdownMenuCheckboxItem
                checked={indeterminate ? 'indeterminate' : checked}
                onCheckedChange={(v) => onToggleServer(Boolean(v))}
              >
                Add server to workspace
              </DropdownMenuCheckboxItem>

              {/* OPTION B */}
              <DropdownMenuItem
                className="justify-between"
                onClick={onOpenChannels}
              >
                <Rows3 />
                Manage channels
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            to="/dashboard/bots-page/server-page/$serverId"
            params={{ serverId: server.serverId }}
          >
            <Button size="sm" variant="outline">
              <Link2 />
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default ServerCard;
