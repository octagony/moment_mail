"use client";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import useMailPicker from "@/hooks/useMailPicker";
import { generateRandomEmail } from "@/utils/urlConstants";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";

export default function MailPicker() {
  const { email, mutate } = useMailPicker(generateRandomEmail);
  return (
    <>
      <div className="flex items-center flex-col gap-2">
        <span>Your email is</span>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input placeholder="Email" value={email} />
          <Button
            type="submit"
            onClick={async () => {
              await mutate(generateRandomEmail);
            }}
          >
            <RefreshCcw />
          </Button>
        </div>
      </div>
    </>
  );
}