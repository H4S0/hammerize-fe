import NewEmailModal from '@/components/modal/new-email-modal';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

const UpdateEmailForm = ({ currentEmail }: { currentEmail: string }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email address</CardTitle>
        <CardDescription>Update your email address</CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel>Current email</FieldLabel>
            <NewEmailModal />
          </div>
          <Input placeholder="text@example.ha" value={currentEmail} disabled />
        </Field>
      </CardContent>
    </Card>
  );
};

export default UpdateEmailForm;
