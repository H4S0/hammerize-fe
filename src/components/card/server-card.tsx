import { Server } from '@/utils/api/platform';
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from '@tanstack/react-router';
import { Button } from '../ui/button';
import { Link2, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import CheckingServerModal from '../modal/checking-server-modal';

type ServerCardProps = {
  server: Server;
  canManage?: boolean;

  /** RHF-controlled state */
  selectedIds: string[];

  /** mutations coming from form */
  onAddMany: (ids: string[]) => void;
  onRemoveMany: (ids: string[]) => void;
  onToggleOne: (id: string, checked: boolean) => void;
};

const ServerCard = ({
  server,
  canManage,
  selectedIds,
  onAddMany,
  onRemoveMany,
  onToggleOne,
}: ServerCardProps) => {
  /** all channel ids belonging to this server */
  const ids = server.platformChatIds ?? [];

  /** derive checkbox state */
  const selected = ids.filter((id) => selectedIds.includes(id));
  const checked = ids.length > 0 && selected.length === ids.length;
  const indeterminate = selected.length > 0 && !checked;

  return (
    <Card>
      <CardContent className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
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

          <div className="flex flex-col items-start gap-1">
            <CardTitle>{server.serverName}</CardTitle>
            <CardDescription>{server.channelCount} channels</CardDescription>
          </div>
        </div>

        {canManage ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                <Menu />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Server options</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuCheckboxItem
                checked={indeterminate ? 'indeterminate' : checked}
                onSelect={(e) => e.preventDefault()}
                onCheckedChange={(value) => {
                  if (value === true) {
                    onAddMany(ids);
                  } else {
                    onRemoveMany(ids);
                  }
                }}
              >
                Add server to workspace
              </DropdownMenuCheckboxItem>

              <CheckingServerModal
                serverName={server.serverName}
                serverId={server.serverId}
                selectedIds={selectedIds}
                onToggleOne={onToggleOne}
              />
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
