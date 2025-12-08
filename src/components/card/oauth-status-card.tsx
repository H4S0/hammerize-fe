import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import HammerizeLogo from '../../../public/hammerize-logo-png.png';
import { Button } from '../ui/button';
import { Link } from '@tanstack/react-router';

type StatusCardProps = {
  title: string;
  description: string;
  type: 'success' | 'fail';
};

const OAuthStatusCard = ({ title, description, type }: StatusCardProps) => {
  return (
    <Card className="w-full max-w-lg sm:max-w-lg">
      <CardHeader>
        <img
          src={HammerizeLogo}
          alt="hammerize-logo"
          className="w-30 h-30 object-contain"
        />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      {type === 'success' && (
        <CardContent>
          <Link to="/dashboard">
            <Button>Go to dashboard</Button>
          </Link>
        </CardContent>
      )}
    </Card>
  );
};

export default OAuthStatusCard;
