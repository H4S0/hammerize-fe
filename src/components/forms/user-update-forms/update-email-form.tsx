import NewEmailModal from '@/components/modal/new-email-modal';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Github, X } from 'lucide-react';
import DiscordBlackLogo from '../../../../public/discord-icon-43736.png';
import DiscordWhiteLogo from '../../../../public/discord-white-icon.png';
import { useTheme } from '@/components/theme/theme-provider';
import { Button } from '@/components/ui/button';
import UnlinkPlatformModal from '@/components/modal/unlink-platform-modal';

type UpdateEmailFormProps = {
  currentEmail: string;
  provider: 'github' | 'discord';
};

const UpdateEmailForm = ({ currentEmail, provider }: UpdateEmailFormProps) => {
  const { theme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email address</CardTitle>
        <CardDescription>Update your email address</CardDescription>
      </CardHeader>
      <CardContent>
        <Field className="gap-1">
          <div className="flex items-center justify-between">
            <FieldLabel>Current email</FieldLabel>
            <NewEmailModal />
          </div>
          <Input placeholder="text@example.ha" value={currentEmail} disabled />

          <h3 className="mt-2 font-semibold text-xl">Sign-in methods</h3>
          <Card className="w-full max-w-xs mt-2">
            <CardContent className="p-2 flex flex-row items-center justify-between">
              <div className="flex flex-row gap-2 items-center">
                {provider === 'github' ? (
                  <Github />
                ) : (
                  <img
                    src={theme === 'dark' ? DiscordWhiteLogo : DiscordBlackLogo}
                    alt="discord"
                    className="w-5 h-5"
                  />
                )}

                <CardTitle> {currentEmail}</CardTitle>
              </div>
              <UnlinkPlatformModal />
            </CardContent>
          </Card>
        </Field>
      </CardContent>
    </Card>
  );
};

export default UpdateEmailForm;
