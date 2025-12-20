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

const CreateWorkspaceForm = ({
  setIsOpen,
}: {
  setIsOpen: (open: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof CreateWorkspaceSchema>>({
    resolver: zodResolver(CreateWorkspaceSchema),
  });
  const platformsQuery = useQuery(platformChatsOptions);

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
        const apiError = err;

        toast.error(
          apiError.message || 'Something went wrong please try again'
        );
      } else {
        toast.error('Something went wrong please,check your connection');
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
          name="platformChatIds"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Platforms</FieldLabel>
              <FieldDescription>
                Please make sure to select platforms that you want to be part of
                this workspace, you can edit this later(remove or add
                platforms).
              </FieldDescription>
              <ScrollArea className="p-2 h-30">
                {platformsQuery.data?.data?.others.map((platform) => {
                  const isChecked = field.value?.includes(platform._id);

                  return (
                    <PlatformCard
                      platformChat={platform}
                      checkbox
                      checked={isChecked}
                      onCheckedChange={(checked) => {
                        const currentIds = field.value || [];

                        if (checked) {
                          field.onChange([...currentIds, platform._id]);
                        } else {
                          field.onChange(
                            currentIds.filter((id) => id !== platform._id)
                          );
                        }
                      }}
                    />
                  );
                })}
              </ScrollArea>
              <InstantFieldError fieldState={fieldState} />
            </Field>
          )}
        />
      </FieldGroup>

      <Button className="mt-5 w-32" type="submit" form="form-rhf-link">
        Submit
      </Button>
    </form>
  );
};

export default CreateWorkspaceForm;
