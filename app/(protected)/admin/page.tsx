'use client';

import { toast } from "sonner";
import { admin } from "@/actions/admin";
import { UserRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// TODO: Refatorar essa página para controle de usuários && teste de API

export default function Admin() {

  const onServerActionClick = () => {
    admin()
      .then((data) => {
        if (data.success) {
          toast.success(data.success);
        }

        if (data.error) {
          toast.error(data.error);
        }
      })
  }

  const onApiRouteClick = () => {
    fetch("/api/admin")
      .then((response) => {
        if (response.ok) {
          toast.success("Allowed API Route!");
        } else {
          toast.error("Forbidden API Route!");
        }
      })
  };

  return (
    <Card className="w-6/12">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          Work in Progress
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={"none"}>
          <FormSuccess message="Only admins" />
          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
            <p className="text-sm font-medium">
              Admin-only API route
            </p>
            <Button onClick={onApiRouteClick}>
              Click to test
            </Button>
          </div>
          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
            <p className="text-sm font-medium">
              Admin-only server action
            </p>
            <Button onClick={onServerActionClick}>
              Click to test
            </Button>
          </div>
        </RoleGate>
      </CardContent>
    </Card>
  );
};