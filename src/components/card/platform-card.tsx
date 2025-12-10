import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, MessageSquare, Bot, AlertTriangle, Link } from 'lucide-react';
import { Platform } from '@/utils/api/platform';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PlatformSettingsDropdown from '../dropdown/platform-settings-dropdown';
import { Separator } from '../ui/separator';

const PlatformCard = ({ platformChat }: { platformChat: Platform }) => {
  const isLinked = !!platformChat.adminUserId;

  return (
    <Card>
      <CardContent className="flex flex-row p-3 justify-between items-center">
        <div className="flex flex-row items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start gap-2">
            <CardTitle>{platformChat.chatName}</CardTitle>

            <div className="flex items-center gap-2">
              {isLinked ? (
                <Badge className="bg-green-500 text-white">Active</Badge>
              ) : (
                <Badge className="bg-yellow-500 text-white">Pending</Badge>
              )}

              {!isLinked && (
                <div className="flex items-center gap-2 text-yellow-700 text-xs mt-1">
                  <AlertTriangle className="w-3 h-3" />
                  Needs linking
                </div>
              )}

              <Separator orientation="vertical" className="py-3" />

              <CardDescription>{platformChat.platform}</CardDescription>
            </div>
          </div>
        </div>

        <PlatformSettingsDropdown />
      </CardContent>
    </Card>
  );
};

export default PlatformCard;
