import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { toast } from "sonner";

//modal
import { TherapyPreferencesModal } from "@/components/modals/therapy-preferences";

//hooks
import { usePreferences, useUpdatePreferences } from "@/api/preferences";
import useAuth from "@/hooks/use-auth";

const Preferences = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { data: preferences, isLoading: isLoadingPreferences } =
    usePreferences();
  const {
    mutate: updatePreferences,
    isSuccess,
    isError,
    isPending,
  } = useUpdatePreferences();
  const [gender, setGender] = useState("");
  const [tone, setTone] = useState("");

  useEffect(() => {
    if (preferences) {
      setGender(preferences?.preferred_gender || "");
      setTone(preferences?.preferred_tone || "");
    }
  }, [isLoadingPreferences]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Preferences updated successfully");
    }
    if (isError) {
      toast.error("Error updating preferences");
    }
  }, [isSuccess, isError]);

  const handleSave = (gender: string, tone: string) => {
    setGender(gender);
    setTone(tone);
    updatePreferences({
      preferred_gender: gender,
      preferred_tone: tone,
    });
    setIsOpen(false);
  };

  return (
    <>
      <Card className="border border-border shadow-sm bg-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-card-foreground">
            <Settings className="w-5 h-5 text-primary" />
            <span>Therapy Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-card-foreground">
                AI Therapist Gender
              </Label>
              <p className="text-sm text-muted-foreground">
                Currently set to {gender}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-border"
              onClick={() => setIsOpen(true)}
            >
              Change
            </Button>
          </div>
          <Separator className="bg-border" />
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-card-foreground">
                Communication Style
              </Label>
              <p className="text-sm text-muted-foreground">
                Currently set to {tone}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-border"
              onClick={() => setIsOpen(true)}
            >
              Adjust
            </Button>
          </div>
        </CardContent>
      </Card>
      <TherapyPreferencesModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        currentGender={gender}
        currentTone={tone}
        onSave={handleSave}
        isLoading={isPending}
      />
    </>
  );
};

export default Preferences;
