import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shield, Lock, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

//components
import { ChangePasswordModal } from "@/components/modals/change-password";
import { DeleteAccountModal } from "@/components/modals/delete-account";

const Privacy = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);
  return (
    <>
      <Card className="border border-border shadow-sm bg-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-card-foreground">
            <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
            <span>Privacy & Security</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="justify-start border-border"
              onClick={() => setIsOpen(true)}
            >
              <Lock className="w-4 h-4 mr-2" />
              Change Password
            </Button>
            <Button variant="outline" className="justify-start border-border">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
          <Separator className="bg-border hidden" />
          <div className="space-y-2 hidden">
            <h4 className="font-medium text-sm text-card-foreground">
              Data Protection
            </h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• All conversations are encrypted end-to-end</p>
              <p>• Your data is never shared with third parties</p>
              <p>• HIPAA compliant storage and processing</p>
            </div>
          </div>
          <Button
            variant="destructive"
            className="w-fit hidden"
            onClick={() => setIsDeleteAccountOpen(true)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Account
          </Button>
        </CardContent>
      </Card>
      <ChangePasswordModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <DeleteAccountModal
        isOpen={isDeleteAccountOpen}
        onClose={() => setIsDeleteAccountOpen(false)}
      />
    </>
  );
};

export default Privacy;
