import { createWorkspace, CreateWorkspaceSchema } from '@/utils/api/workspace';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import InstantFieldError from './instant-field-error';
import { Button } from '../ui/button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { platformChatsOptions } from '@/utils/queries/platform';
import PlatformCard from '../card/platform-card';
import { ScrollArea } from '../ui/scroll-area';
import { toast } from 'sonner';
import { isApiResponse } from '@/utils/axios-config/axios';
import { Textarea } from '../ui/textarea';
import ServerCard from '../card/server-card';
import { useWorkspacePlatforms } from '@/hooks/use-workspace-platform';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';

const CreateWorkspaceForm = ({
  setIsOpen,
}: {
  setIsOpen: (open: boolean) => void;
}) => {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof CreateWorkspaceSchema>>({
    resolver: zodResolver(CreateWorkspaceSchema),
    defaultValues: {
      platformChatIds: [],
    },
  });

  const { data, isLoading, isError, error } = useQuery(platformChatsOptions);

  const handleSubmit: SubmitHandler<
    z.infer<typeof CreateWorkspaceSchema>
  > = async (data) => {
    try {
      const res = await createWorkspace(data);

      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      setIsOpen(false);
    } catch (err) {
      if (isApiResponse(err)) {
        toast.error(err.message || 'Something went wrong, please try again');
      } else {
        toast.error('Something went wrong, check your connection');
      }
    }
  };

  return (
    <form id="form-rhf-link" onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Workspace name</FieldLabel>
              <Input placeholder="user's workspace" {...field} />
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
              <Textarea
                placeholder="This workspace is about finance company field"
                {...field}
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

            const servers = data?.data?.servers ?? [];
            const others = data?.data?.others ?? [];

            return (
              <Field>
                <FieldLabel>Platforms & Servers</FieldLabel>
                <FieldDescription>
                  Select platforms and server channels that belong to this
                  workspace.
                </FieldDescription>

                <ScrollArea className="h-56 p-2">
                  {isLoading && <SkeletonPlatforms />}

                  {isError && (
                    <p className="text-sm text-destructive">
                      Failed to load platforms. Please refresh.
                    </p>
                  )}

                  {!isLoading && !isError && (
                    <div className="space-y-3">
                      <SectionTitle>Platforms</SectionTitle>

                      {others.length > 0 ? (
                        others.map((platform) => (
                          <PlatformCard
                            key={platform._id}
                            platformChat={platform}
                            checkbox
                            canManage
                            checked={platformState.selectedIds.includes(
                              platform._id
                            )}
                            onCheckedChange={(checked) =>
                              platformState.toggleOne(platform._id, checked)
                            }
                          />
                        ))
                      ) : (
                        <EmptyText>
                          You don’t have any linked platforms.
                        </EmptyText>
                      )}

                      <Separator />

                      <SectionTitle>Servers</SectionTitle>

                      {servers.length > 0 ? (
                        servers.map((server) => (
                          <ServerCard
                            key={server.serverId}
                            server={server}
                            canManage
                            selectedIds={platformState.selectedIds}
                            onAddMany={platformState.addMany}
                            onRemoveMany={platformState.removeMany}
                            onToggleOne={platformState.toggleOne}
                          />
                        ))
                      ) : (
                        <EmptyText>
                          There are no linked servers on this account.
                        </EmptyText>
                      )}
                    </div>
                  )}
                </ScrollArea>

                <InstantFieldError fieldState={fieldState} />
              </Field>
            );
          }}
        />
      </FieldGroup>

      <Button
        className="mt-5 w-32"
        size="sm"
        type="submit"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? 'Creating...' : 'Submit'}
      </Button>
    </form>
  );
};

export default CreateWorkspaceForm;

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-1 text-xs font-semibold uppercase text-muted-foreground">
      {children}
    </p>
  );
}

function EmptyText({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}

function SkeletonPlatforms() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-14 w-full" />
      <Separator />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-14 w-full" />
    </div>
  );
}
