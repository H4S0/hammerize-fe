import { Link, LinkProps, ToPathOption } from '@tanstack/react-router';

export type FormHeaderCardProps = {
  title: string;
  description: string;
  link: LinkProps['to'];
  linkLabel: string;
};

const FormHeaderCard = ({
  title,
  description,
  link,
  linkLabel,
}: FormHeaderCardProps) => {
  return (
    <>
      <h2 className="text-3xl text-center">{title}</h2>
      <div className="flex items-center justify-center gap-1 mb-6">
        <p className="text-muted-foreground">{description}</p>
        <Link to={link} className="text-primary underline underline-offset-3">
          {linkLabel}
        </Link>
      </div>
    </>
  );
};

export default FormHeaderCard;
