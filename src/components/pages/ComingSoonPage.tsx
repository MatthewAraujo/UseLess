import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ComingSoonPageProps {
  title: string;
  description: string;
}

export const ComingSoonPage = ({ title, description }: ComingSoonPageProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          This feature is coming soon...
        </p>
      </CardContent>
    </Card>
  );
}; 