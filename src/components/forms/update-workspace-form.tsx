import {
  Role,
  updateWorkspace,
  UpdateWorkspaceSchema,
} from '@/utils/api/workspace';
import { isApiResponse } from '@/utils/axios-config/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '../ui/field';
import InstantFieldError from './instant-field-error';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import PlatformCard from '../card/platform-card';
import ServerCard from '../card/server-card';
import { Platform, Server } from '@/utils/api/platform';
import { useQueryClient } from '@tanstack/react-query';
import { useWorkspacePlatforms } from '@/hooks/use-workspace-platform';
import { Spinner } from '../ui/spinner';

type UpdateWorkspaceFormProps = {
  workspaceId: string;
  name: string;
  description: string;
  platforms: Platform[];
  servers: Server[];
  platformChatIds: string[];
  userWorkspaceRole: Role;
};

const UpdateWorkspaceForm = ({
  workspaceId,
  name,
  description,
  platforms,
  servers,
  platformChatIds,
  userWorkspaceRole,
}: UpdateWorkspaceFormProps) => {
  const queryClient = useQueryClient();
  const canManage = userWorkspaceRole === 'admin';

  const form = useForm<z.infer<typeof UpdateWorkspaceSchema>>({
    resolver: zodResolver(UpdateWorkspaceSchema),
    defaultValues: {
      name,
      description,
      platformChatIds,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof UpdateWorkspaceSchema>> = async (
    data
  ) => {
    try {
      const res = await updateWorkspace(workspaceId, data);
      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ['workspace-platforms', workspaceId],
      });
    } catch (err) {
      if (isApiResponse(err)) {
        toast.error(err.message || 'Something went wrong');
      } else {
        toast.error('Network error, please try again');
      }
    }
  };

  const standalonePlatforms = platforms.filter(
    (platform) => !platform.serverId
  );

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input
                {...field}
                disabled={!canManage}
                placeholder="Workspace name"
              />
              <InstantFieldError fieldState={fieldState} />
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Description</FieldLabel>
              <Input
                {...field}
                disabled={!canManage}
                placeholder="This workspace is about finance"
              />
              <InstantFieldError fieldState={fieldState} />
            </Field>
          )}
        />

        <Controller
          name="platformChatIds"
          control={form.control}
          render={({ field, fieldState }) => {
            const platformState = useWorkspacePlatforms(
              field.value,
              field.onChange
            );

            return (
              <Field>
                <FieldLabel>Platforms & Servers</FieldLabel>
                <FieldDescription>
                  Select platforms and server channels that belong to this
                  workspace.
                </FieldDescription>

                <ScrollArea className="h-56 p-2">
                  {standalonePlatforms.length > 0 && (
                    <>
                      <div className="space-y-2">
                        <p className="px-1 text-xs font-semibold uppercase text-muted-foreground">
                          Platforms
                        </p>

                        {standalonePlatforms.map((platform) => (
                          <PlatformCard
                            key={platform._id}
                            platformChat={platform}
                            checkbox
                            canManage={canManage}
                            checked={platformState.selectedIds.includes(
                              platform._id
                            )}
                            onCheckedChange={(checked) =>
                              platformState.toggleOne(platform._id, checked)
                            }
                          />
                        ))}
                      </div>

                      <Separator className="my-3" />
                    </>
                  )}

                  <div className="space-y-2">
                    <p className="px-1 text-xs font-semibold uppercase text-muted-foreground">
                      Servers
                    </p>

                    {servers.map((server) => (
                      <ServerCard
                        key={server.serverId}
                        server={server}
                        canManage={canManage}
                        selectedIds={platformState.selectedIds}
                        onAddMany={platformState.addMany}
                        onRemoveMany={platformState.removeMany}
                        onToggleOne={platformState.toggleOne}
                      />
                    ))}
                  </div>
                </ScrollArea>

                <InstantFieldError fieldState={fieldState} />
              </Field>
            );
          }}
        />
      </FieldGroup>

      {canManage && (
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? <Spinner /> : 'Save changes'}
        </Button>
      )}
    </form>
  );
};

export default UpdateWorkspaceForm;
