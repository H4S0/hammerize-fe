import { updateServer, UpdateServerSchema } from '@/utils/api/platform';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { Field, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import InstantFieldError from './instant-field-error';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { isApiResponse } from '@/utils/axios-config/axios';

type EditServerForm = {
  serverId: string;
  serverName: string;
};

const EditServerForm = ({ serverName, serverId }: EditServerForm) => {
  const form = useForm<z.infer<typeof UpdateServerSchema>>({
    resolver: zodResolver(UpdateServerSchema),
    defaultValues: {
      name: serverName,
    },
  });

  const handleSubmit: SubmitHandler<
    z.infer<typeof UpdateServerSchema>
  > = async (data) => {
    try {
      const res = await updateServer(serverId, data);
      toast.success(res.message);
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
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Server name</FieldLabel>
              <Input placeholder="user's server" {...field} />
              <InstantFieldError fieldState={fieldState} />
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit" size="sm" className="mt-3">
        Update server name
      </Button>
    </form>
  );
};

export default EditServerForm;
