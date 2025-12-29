import { linkPlatform, LinkPlatformSchema } from '@/utils/api/platform';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import z from 'zod';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '../ui/field';
import { Input } from '../ui/input';
import InstantFieldError from './instant-field-error';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { isApiResponse } from '@/utils/axios-config/axios';
import { useQueryClient } from '@tanstack/react-query';
import { Spinner } from '../ui/spinner';

const PlatformLinkForm = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (isOpen: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof LinkPlatformSchema>>({
    resolver: zodResolver(LinkPlatformSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof LinkPlatformSchema>> = async (
    data
  ) => {
    try {
      const res = await linkPlatform(data);
      toast.success(res.message);

      queryClient.invalidateQueries({ queryKey: ['user-platform-chat'] });
      form.reset();
      setIsModalOpen(false);
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
    <div>
      <form id="form-rhf-link" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="linkToken"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Link code</FieldLabel>
                <Input placeholder="xx321x32x" {...field} />
                <InstantFieldError fieldState={fieldState} />
              </Field>
            )}
          />

          <Controller
            name="platform"
            control={form.control}
            render={({ field, fieldState }) => (
              <FieldSet>
                <FieldLabel>Subscription Plan</FieldLabel>
                <FieldDescription>
                  Yearly and lifetime plans offer significant savings.
                </FieldDescription>
                <RadioGroup
                  defaultValue="slack"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <Field orientation="horizontal">
                    <RadioGroupItem value="slack" />
                    <FieldLabel className="font-normal">Slack</FieldLabel>
                  </Field>
                  <Field orientation="horizontal">
                    <RadioGroupItem value="telegram" />
                    <FieldLabel className="font-normal">Telegram</FieldLabel>
                  </Field>
                  <Field orientation="horizontal">
                    <RadioGroupItem value="discord" />
                    <FieldLabel className="font-normal">Discord</FieldLabel>
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
          form="form-rhf-link"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? <Spinner /> : 'Submit'}
        </Button>
      </form>
    </div>
  );
};

export default PlatformLinkForm;
