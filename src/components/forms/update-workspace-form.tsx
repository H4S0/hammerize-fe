import { updateWorkspace, UpdateWorkspaceSchema } from '@/utils/api/workspace';
import { isApiResponse } from '@/utils/axios-config/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import { Field, FieldDescription, FieldGroup, FieldLabel } from '../ui/field';
import InstantFieldError from './instant-field-error';
import { Input } from '../ui/input';
import PlatformCard from '../card/platform-card';
import { ScrollArea } from '../ui/scroll-area';
import { Platform } from '@/utils/api/platform';
import { Button } from '../ui/button';

type UpdateWorkspaceFormProps = {
  workspaceId: string;
  name: string;
  description: string;
  platforms: Platform[];
  platformChatIds: string[];
};

const UpdateWorkspaceForm = ({
  workspaceId,
  name,
  description,
  platforms,
  platformChatIds,
}: UpdateWorkspaceFormProps) => {
  const form = useForm<z.infer<typeof UpdateWorkspaceSchema>>({
    resolver: zodResolver(UpdateWorkspaceSchema),
    defaultValues: {
      name: name,
      description: description,
      platformChatIds: platformChatIds,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof UpdateWorkspaceSchema>> = async (
    data
  ) => {
    try {
      const res = await updateWorkspace(workspaceId, data);
      toast.success(res.message);
    } catch (err) {
      if (isApiResponse(err)) {
        toast.error(err.message || 'Something went wrong');
      } else {
        toast.error('Network error, please try again');
      }
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input placeholder="Workspace name" {...field} />
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
              <Input placeholder="This workspace is about finance" {...field} />
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
                Select platforms that should belong to this workspace.
              </FieldDescription>

              <ScrollArea className="h-30 p-2">
                {platforms.length === 0 ? (
                  <p className="text-sm text-muted-foreground px-2">
                    No platforms available
                  </p>
                ) : (
                  platforms.map((platform) => {
                    const isChecked =
                      field.value?.includes(platform._id) ?? false;

                    return (
                      <PlatformCard
                        key={platform._id}
                        platformChat={platform}
                        checkbox
                        checked={isChecked}
                        onCheckedChange={(checked) => {
                          const current = field.value ?? [];

                          field.onChange(
                            checked
                              ? [...current, platform._id]
                              : current.filter((id) => id !== platform._id)
                          );
                        }}
                      />
                    );
                  })
                )}
              </ScrollArea>

              <InstantFieldError fieldState={fieldState} />
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? 'Saving...' : 'Save changes'}
      </Button>
    </form>
  );
};

export default UpdateWorkspaceForm;
