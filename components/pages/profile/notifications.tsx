import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useNotifications, useUpdateNotifications } from "@/api/notifications";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const Notifications = () => {
  const [sessionReminders, setSessionReminders] = useState(true);
  const [dailyCheckins, setDailyCheckins] = useState(true);
  const [progressUpdates, setProgressUpdates] = useState(true);

  const { data: notifications } = useNotifications();
  const {
    mutate: updateNotifications,
    isSuccess,
    isError,
  } = useUpdateNotifications();

  useEffect(() => {
    if (notifications) {
      setSessionReminders(notifications.session_reminders);
      setDailyCheckins(notifications.daily_checkins);
      setProgressUpdates(notifications.progress_updates);
    }
  }, [notifications]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Notifications updated successfully");
    }
    if (isError) {
      toast.error("Error updating notifications");
    }
  }, [isSuccess, isError]);

  return (
    <>
      <Card className="border border-border shadow-sm bg-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-card-foreground">
            <Bell className="w-5 h-5 text-primary" />
            <span>Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-card-foreground">Session Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Get notified about upcoming sessions
              </p>
            </div>
            <Switch
              checked={sessionReminders}
              onCheckedChange={(checked) => {
                setSessionReminders(checked);
                updateNotifications({
                  session_reminders: checked,
                });
              }}
            />
          </div>
          <Separator className="bg-border" />
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-card-foreground">Daily Check-ins</Label>
              <p className="text-sm text-muted-foreground">
                Mood tracking reminders
              </p>
            </div>
            <Switch
              checked={dailyCheckins}
              onCheckedChange={(checked) => {
                setDailyCheckins(checked);
                updateNotifications({
                  daily_checkins: checked,
                });
              }}
            />
          </div>
          <Separator className="bg-border" />
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-card-foreground">Progress Updates</Label>
              <p className="text-sm text-muted-foreground">
                Weekly insights and achievements
              </p>
            </div>
            <Switch
              checked={progressUpdates}
              onCheckedChange={(checked) => {
                setProgressUpdates(checked);
                updateNotifications({
                  progress_updates: checked,
                });
              }}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Notifications;
