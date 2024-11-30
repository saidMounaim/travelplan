import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface FeatureCardProps {
  icon: any;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="border-orange-200">
      <CardHeader>
        {icon}
        <CardTitle className="text-orange-600">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
