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

type ServerCardBaseProps = {
  server: Server;
  canManage?: boolean;
};

type ServerCardSelectableProps = {
  selectedIds: string[];
  onAddMany: (ids: string[]) => void;
  onRemoveMany: (ids: string[]) => void;
  onToggleOne: (id: string, checked: boolean) => void;
};

type ServerCardProps =
  | (ServerCardBaseProps & ServerCardSelectableProps)
  | ServerCardBaseProps;

const isSelectable = (
  props: ServerCardProps
): props is ServerCardBaseProps & ServerCardSelectableProps => {
  return 'selectedIds' in props;
};

const ServerCard = (props: ServerCardProps) => {
  const { server, canManage } = props;

  const ids = server.platformChatIds ?? [];
  const selectable = isSelectable(props);

  const selected = selectable
    ? ids.filter((id) => props.selectedIds.includes(id))
    : [];

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

              {selectable && (
                <>
                  <DropdownMenuCheckboxItem
                    checked={indeterminate ? 'indeterminate' : checked}
                    onSelect={(e) => e.preventDefault()}
                    onCheckedChange={(value) => {
                      if (value === true) {
                        props.onAddMany(ids);
                      } else {
                        props.onRemoveMany(ids);
                      }
                    }}
                  >
                    Add server to workspace
                  </DropdownMenuCheckboxItem>

                  <CheckingServerModal
                    serverName={server.serverName}
                    serverId={server.serverId}
                    selectedIds={props.selectedIds}
                    onToggleOne={props.onToggleOne}
                  />
                </>
              )}
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
