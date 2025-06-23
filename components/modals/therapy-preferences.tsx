"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Settings, User, MessageCircle, Mic } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TherapyPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGender: string;
  currentTone: string;
  onSave: (gender: string, tone: string) => void;
  isLoading: boolean;
}

export function TherapyPreferencesModal({
  isOpen,
  onClose,
  currentGender,
  currentTone,
  onSave,
  isLoading,
}: TherapyPreferencesModalProps) {
  const [gender, setGender] = useState("");
  const [tone, setTone] = useState("");

  useEffect(() => {
    setGender(currentGender);
    setTone(currentTone);
  }, [currentGender, currentTone]);

  const handleSave = async () => {
    onSave(gender, tone);
  };

  const handleCancel = () => {
    setGender(currentGender);
    setTone(currentTone);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-primary" />
            <span>Therapy Preferences</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* AI Therapist Gender */}
          <div className="space-y-3">
            <Label className="text-base font-medium flex items-center">
              <User className="w-4 h-4 mr-2 text-primary" />
              AI Therapist Gender
            </Label>
            <RadioGroup value={gender} onValueChange={setGender}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="neutral" id="neutral" />
                <Label htmlFor="neutral">Gender-Neutral</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Communication Style */}
          <div className="space-y-3">
            <Label className="text-base font-medium flex items-center">
              <MessageCircle className="w-4 h-4 mr-2 text-primary" />
              Communication Style
            </Label>
            <RadioGroup value={tone} onValueChange={setTone}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="empathetic" id="empathetic" />
                <Label htmlFor="empathetic">Empathetic & Warm</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="motivational" id="motivational" />
                <Label htmlFor="motivational">Motivational</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="neutral" id="neutral" />
                <Label htmlFor="neutral">Balanced and professional</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={handleCancel} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
