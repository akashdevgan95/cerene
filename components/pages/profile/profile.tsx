"use client";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

//hooks
import useAuth from "@/hooks/use-auth";
import { useUpdateProfile } from "@/api/profile";

const Profile = () => {
  const { profile, user } = useAuth();
  const [firstName, setFirstName] = useState(profile?.first_name || "");
  const [lastName, setLastName] = useState(profile?.last_name || "");
  const [email, setEmail] = useState(user?.email);
  const {
    mutate: updateProfile,
    isSuccess,
    isError,
    isPending,
    error,
  } = useUpdateProfile();

  const handleUpdateProfile = () => {
    updateProfile({
      user_id: user?.id,
      first_name: firstName,
      last_name: lastName,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile updated successfully");
    }

    if (isError) {
      toast.error("Error updating profile");
    }
  }, [isSuccess, isError]);

  return (
    <Card className="border border-border shadow-sm bg-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-card-foreground">
          <User className="w-5 h-5 text-primary" />
          <span>Personal Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-foreground">
              First Name
            </Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border-border bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-foreground">
              Last Name
            </Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border-border bg-background"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            disabled
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-border bg-background"
          />
          <p className="text-xs text-muted-foreground italic">
            This is your login email and cannot be changed.
          </p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90"
          disabled={!firstName || !lastName || isPending}
          onClick={handleUpdateProfile}
        >
          Update Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default Profile;
