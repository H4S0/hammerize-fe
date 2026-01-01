import UnlinkAndNewCredentialsModal from '@/components/modal/unlink-credentials-modal';
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
import UnlinkPlatformModal from '@/components/modal/unlink-platform-modal';

export type ProviderOpts = 'github' | 'discord';

type EmailMethodsProps = {
  currentEmail: string;
  provider: ProviderOpts;
};

const EmailMethods = ({ currentEmail, provider }: EmailMethodsProps) => {
  const { theme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email address and linking methods</CardTitle>
        <CardDescription>
          Update your email address and change linking methods
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field className="gap-1">
          <div className="flex items-center justify-between">
            <FieldLabel>Current email</FieldLabel>
            <UnlinkAndNewCredentialsModal provider={provider} />
          </div>
          <Input placeholder="text@example.ha" value={currentEmail} disabled />

          {provider && (
            <>
              <h3 className="mt-2 font-semibold text-xl">Sign-in methods</h3>
              <Card className="w-full max-w-xs mt-2">
                <CardContent className="p-2 flex flex-row items-center justify-between">
                  <div className="flex flex-row gap-2 items-center">
                    {provider === 'github' ? (
                      <Github />
                    ) : (
                      <img
                        src={
                          theme === 'dark' ? DiscordWhiteLogo : DiscordBlackLogo
                        }
                        alt="discord"
                        className="w-5 h-5"
                      />
                    )}

                    <CardTitle> {currentEmail}</CardTitle>
                  </div>
                  <UnlinkPlatformModal />
                </CardContent>
              </Card>
            </>
          )}
        </Field>
      </CardContent>
    </Card>
  );
};

export default EmailMethods;
