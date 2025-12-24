import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { z } from 'zod';
import HammerizeLogo from '../../../../public/hammerize-logo-png.png';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { updateWorkspaceInvitationStatus } from '@/utils/api/workspace';
import { toast } from 'sonner';
import { isApiResponse } from '@/utils/axios-config/axios';

const WorkspaceInvitationSchema = z.object({
  workspaceName: z.string(),
  inviterEmail: z.email(),
  inviterUsername: z.string(),
});

type WorkspaceInvitationSearch = z.infer<typeof WorkspaceInvitationSchema>;

export const Route = createFileRoute('/_auth/workspace-invitation/$token')({
  validateSearch: (search): WorkspaceInvitationSearch | null => {
    const result = WorkspaceInvitationSchema.safeParse(search);

    if (!result.success) {
      return null;
    }

    return result.data;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { token } = Route.useParams();
  const search = Route.useSearch();
  const navigate = useNavigate();

  if (!search || !token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-muted/40">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Invalid Invitation</CardTitle>
            <CardDescription>
              This invitation link is invalid or has expired.
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex justify-center">
            <Link to="/dashboard">
              <Button variant="secondary" asChild>
                Go back to dashboard
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const handleUpdateInvitationStatus = async (
    status: 'accepted' | 'declined'
  ) => {
    try {
      const res = await updateWorkspaceInvitationStatus(token, {
        status: status,
      });
      toast.success(res.message);
      navigate({ to: '/dashboard/workspace' });
    } catch (err) {
      if (isApiResponse(err)) {
        toast.error(err.message || 'Something went wrong');
      } else {
        toast.error('Network error, please try again');
      }
    }
  };

  console.log(search);
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <Card className="w-full max-w-md">
        <CardHeader>
          <img src={HammerizeLogo} alt="hammerize-logo" className="w-20 h-20" />
          <CardTitle>Workspace Invitation</CardTitle>
          <CardDescription>
            You&apos;ve been invited to join{' '}
            <strong>{search.workspaceName}</strong>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Card className="border-dashed">
            <CardContent className="flex items-center justify-between px-4 py-3">
              <div className="flex flex-col gap-1">
                <CardTitle className="text-base">
                  {search.inviterUsername}
                </CardTitle>
                <CardDescription>{search.inviterEmail}</CardDescription>
              </div>

              <CardDescription className="text-sm">invited you</CardDescription>
            </CardContent>
          </Card>
        </CardContent>

        <CardFooter className="flex items-center justify-center gap-2">
          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={() => handleUpdateInvitationStatus('declined')}
          >
            <X className="mr-1 h-4 w-4" />
            Decline
          </Button>
          <Button
            size="lg"
            className="w-full"
            onClick={() => handleUpdateInvitationStatus('accepted')}
          >
            <Check className="mr-1 h-4 w-4" />
            Accept
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
