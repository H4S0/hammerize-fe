import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

import { LinkIcon } from 'lucide-react';
import { Platform } from '@/utils/api/platform';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PlatformSettingsDropdown from '../dropdown/platform-settings-dropdown';
import { Separator } from '../ui/separator';
import { Checkbox } from '../ui/checkbox';
import { Link } from '@tanstack/react-router';
import { Button } from '../ui/button';

type PlatformCardProps = {
  platformChat: Platform;
  checkbox?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  canManage?: boolean;
  view?: boolean;
};

const PlatformCard = ({
  platformChat,
  checkbox,
  checked,
  onCheckedChange,
  canManage,
  view,
}: PlatformCardProps) => {
  return (
    <Card>
      <CardContent className="flex flex-row p-2 justify-between items-center">
        <div className="flex flex-row items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start gap-2">
            <CardTitle>{platformChat.chatName}</CardTitle>

            <div className="flex items-center gap-2">
              <CardDescription>{platformChat.platform}</CardDescription>
              <Separator orientation="vertical" className="py-3" />
              <CardDescription>
                {platformChat.summariesCount || 0}
              </CardDescription>
            </div>
          </div>
        </div>

        {canManage &&
          (checkbox ? (
            <Checkbox
              className="p-2"
              checked={checked}
              onCheckedChange={onCheckedChange}
            />
          ) : (
            <PlatformSettingsDropdown platformChatId={platformChat._id} />
          ))}

        {view && (
          <Link
            to="/dashboard/workspace/certain-workspace/certain-platform/$platformId"
            params={{ platformId: platformChat._id }}
          >
            <Button size="sm" variant="outline">
              <LinkIcon />
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default PlatformCard;
