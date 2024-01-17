"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function UserAuthForm({ className, ...props }) {
  const [data, setData] = useState({ fplid: null });

  const loginUser = async (e) => {
    e.preventDefault();
    signIn("credentials", {
      ...data,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={loginUser}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="fpl id">
              FPL Team ID
            </Label>
            <Input
              id="fplid"
              name="fplid"
              type="number"
              value={data.value}
              onChange={(e) => {
                setData({ ...data, fplid: e.target.value });
              }}
              //   disabled={isLoading}
              className="rounded text-center"
              required
            />
          </div>
          <Button
            variant="outline"
            type="submit"
            // disabled={isLoading}
            className="rounded"
          >
            {/* {isLoading && <>spinner</>} */}
            Log in
          </Button>
        </div>
      </form>
    </div>
  );
}
