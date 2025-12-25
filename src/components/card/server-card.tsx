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
};

const ServerCard = ({
  server,
  canManage,
  checked,
  indeterminate,
  onToggleServer,
}: ServerCardProps) => {
  const checkboxState = indeterminate ? 'indeterminate' : checked;

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

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Server options</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuCheckboxItem
                checked={checkboxState}
                onSelect={(e) => e.preventDefault()} // 🔑 CRITICAL
                onCheckedChange={(value) => {
                  onToggleServer(value === true);
                }}
              >
                Add server to workspace
              </DropdownMenuCheckboxItem>

              <DropdownMenuItem className="gap-2">
                <Rows3 size={16} />
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
