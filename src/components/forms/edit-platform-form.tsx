import {
  Platform,
  updatePlatform,
  UpdatePlatformSchema,
} from '@/utils/api/platform';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { Field, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import InstantFieldError from './instant-field-error';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { isApiResponse } from '@/utils/axios-config/axios';
import { useQueryClient } from '@tanstack/react-query';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';

const EditPlatformForm = ({ platformData }: { platformData: Platform }) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof UpdatePlatformSchema>>({
    resolver: zodResolver(UpdatePlatformSchema),
    defaultValues: {
      chatName: platformData.chatName,
      modes: platformData.summaryMode,
      isActive: platformData.isActive,
    },
  });

  const handleSubmit: SubmitHandler<
    z.infer<typeof UpdatePlatformSchema>
  > = async (data) => {
    try {
      const res = await updatePlatform(platformData._id, data);
      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ['server', platformData._id],
      });
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
    <form id="form-rhf-init" onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        <Controller
          name="chatName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Server name</FieldLabel>
              <Input placeholder="user's channel" {...field} />
              <InstantFieldError fieldState={fieldState} />
            </Field>
          )}
        />

        <Controller
          name="modes"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Server name</FieldLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Modes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short-term">Short term</SelectItem>
                  <SelectItem value="digest-mode">Digest mode</SelectItem>
                </SelectContent>
              </Select>
              <InstantFieldError fieldState={fieldState} />
            </Field>
          )}
        />

        <Controller
          name="isActive"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Active status</FieldLabel>
              <div className="flex items-center gap-2">
                <Switch
                  onCheckedChange={field.onChange}
                  checked={field.value}
                />
                <Separator orientation="vertical" className="py-2" />
                <p className="text-sm font-semibold">
                  Curretnly platform is {field.value ? 'active' : 'not active'}
                </p>
              </div>
              <InstantFieldError fieldState={fieldState} />
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit" size="sm" className="mt-3">
        Update platform chat
      </Button>
    </form>
  );
};

export default EditPlatformForm;
