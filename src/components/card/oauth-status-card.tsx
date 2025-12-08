import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import HammerizeLogo from '../../../public/hammerize-logo-png.png';

type StatusCardProps = {
  title: string;
  description: string;
};

const OAuthStatusCard = ({ title, description }: StatusCardProps) => {
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
    </Card>
  );
};

export default OAuthStatusCard;
