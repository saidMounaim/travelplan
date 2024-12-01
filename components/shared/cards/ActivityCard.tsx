import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activities } from "@/lib/types";

const ActivityCard = ({ activity }: { activity: Activities }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {activity.time} - {activity.activity}
        </CardTitle>
        <CardDescription>{activity.duration}</CardDescription>
      </CardHeader>
      <CardContent>
        {activity.image && (
          <img
            src={activity.image}
            alt={activity.activity}
            width={400}
            height={200}
            className="rounded-md mb-4 object-cover w-full"
          />
        )}
        <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
