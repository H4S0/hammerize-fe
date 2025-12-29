import {
  InviteMemberSchema,
  inviteMemeberToWorkspace,
} from '@/utils/api/workspace';
import { isApiResponse } from '@/utils/axios-config/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { Button } from '../ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '../ui/field';
import InstantFieldError from './instant-field-error';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Input } from '../ui/input';
import { useQueryClient } from '@tanstack/react-query';
import { Spinner } from '../ui/spinner';

const InviteMemberForm = ({
  workspaceId,
  setOpen,
}: {
  workspaceId: string;
  setOpen: (open: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof InviteMemberSchema>>({
    resolver: zodResolver(InviteMemberSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof InviteMemberSchema>> = async (
    data
  ) => {
    try {
      const res = await inviteMemeberToWorkspace(workspaceId, data);
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ['workspace', workspaceId] });
      setOpen(false);
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
    <form id="form-rhf-invite" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Link code</FieldLabel>
              <Input placeholder="example@mail.ba" {...field} />
              <InstantFieldError fieldState={fieldState} />
            </Field>
          )}
        />

        <Controller
          name="role"
          control={form.control}
          render={({ field, fieldState }) => (
            <FieldSet>
              <FieldLabel>Role</FieldLabel>
              <FieldDescription>
                Select the role for the invited member. Member can only view
                summaries and add platforms, admin has full access (managment)
                over added platforms.
              </FieldDescription>
              <RadioGroup
                defaultValue="slack"
                value={field.value}
                onValueChange={field.onChange}
              >
                <Field orientation="horizontal">
                  <RadioGroupItem value="member" />
                  <FieldLabel className="font-normal">Member</FieldLabel>
                </Field>
                <Field orientation="horizontal">
                  <RadioGroupItem value="admin" />
                  <FieldLabel className="font-normal">Admin</FieldLabel>
                </Field>
              </RadioGroup>
              <InstantFieldError fieldState={fieldState} />
            </FieldSet>
          )}
        />
      </FieldGroup>

      <Button
        className="mt-5 w-32"
        type="submit"
        form="form-rhf-invite"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? <Spinner /> : 'Invite member'}
      </Button>
    </form>
  );
};

export default InviteMemberForm;
