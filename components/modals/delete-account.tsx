"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Download, Trash2 } from "lucide-react";
import { toast } from "sonner";

//client
import { client } from "@/utils/supabase/client";

//hooks
import useAuth from "@/hooks/use-auth";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteAccountModal({
  isOpen,
  onClose,
}: DeleteAccountModalProps) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [confirmText, setConfirmText] = useState("");
  const [dataExported, setDataExported] = useState(false);
  const [understandConsequences, setUnderstandConsequences] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleExportData = async () => {
    setIsLoading(true);

    // Simulate data export
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    setDataExported(true);

    toast.success("Data Export Complete");
  };

  const handleDeleteAccount = async () => {
    if (confirmText !== "DELETE MY ACCOUNT") {
      toast.error("Please type 'DELETE MY ACCOUNT' to confirm.");
      return;
    }

    setIsLoading(true);

    const { error, data } = await client.auth.admin.deleteUser(user?.id || "");

    console.log("error", error);
    console.log("data", data);

    if (error) {
      toast.error(error.message);
    }

    if (data.user) {
      toast.success("Account Deleted");
      onClose();
    }

    setIsLoading(false);
  };

  const handleCancel = () => {
    setStep(1);
    setConfirmText("");
    setDataExported(false);
    setUnderstandConsequences(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            <span>Delete Account</span>
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            {/* Warning */}
            <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div className="space-y-2">
                    <h4 className="font-medium text-red-800 dark:text-red-200">
                      This action cannot be undone
                    </h4>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      Deleting your account will permanently remove all your
                      data, including:
                    </p>
                    <ul className="text-sm text-red-700 dark:text-red-300 space-y-1 ml-4">
                      <li>• All therapy session history</li>
                      <li>• Mood tracking data and insights</li>
                      <li>• Personal preferences and settings</li>
                      <li>• Subscription and billing information</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Export Option */}
            <div className="space-y-4">
              <h4 className="font-medium">Before you go...</h4>
              <p className="text-sm text-muted-foreground">
                Would you like to export your data first? This will include all
                your therapy sessions, mood data, and insights in a downloadable
                format.
              </p>

              <Button
                onClick={handleExportData}
                disabled={isLoading || dataExported}
                className="w-full"
                variant="outline"
              >
                <Download className="w-4 h-4 mr-2" />
                {isLoading
                  ? "Exporting..."
                  : dataExported
                  ? "Data Exported ✓"
                  : "Export My Data"}
              </Button>
            </div>

            {/* Confirmation Checkbox */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="understand"
                checked={understandConsequences}
                onCheckedChange={(checked) =>
                  setUnderstandConsequences(checked as boolean)
                }
              />
              <Label htmlFor="understand" className="text-sm leading-5">
                I understand that deleting my account is permanent and cannot be
                undone. All my data will be permanently removed from MindfulAI's
                servers.
              </Label>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => setStep(2)}
                className="flex-1"
                disabled={!understandConsequences}
              >
                Continue to Delete
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            {/* Final Confirmation */}
            <div className="space-y-4">
              <h4 className="font-medium">Final Confirmation</h4>
              <p className="text-sm text-muted-foreground">
                To confirm account deletion, please type{" "}
                <span className="font-mono font-bold">DELETE MY ACCOUNT</span>{" "}
                below:
              </p>

              <div className="space-y-2">
                <Label htmlFor="confirmDelete">Confirmation Text</Label>
                <Input
                  id="confirmDelete"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="Type: DELETE MY ACCOUNT"
                  className="font-mono"
                />
              </div>
            </div>

            {/* Final Warning */}
            <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
              <CardContent className="p-4 text-center">
                <Trash2 className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <p className="text-sm text-red-700 dark:text-red-300 font-medium">
                  This will permanently delete your account and all associated
                  data.
                </p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1"
                disabled={isLoading}
              >
                Back
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                className="flex-1"
                disabled={isLoading || confirmText !== "DELETE MY ACCOUNT"}
              >
                {isLoading ? "Deleting..." : "Delete Account"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
