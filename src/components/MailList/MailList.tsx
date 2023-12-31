"use client";
import { IMail } from "@/types/mail.interface";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useMails from "@/hooks/useMails";
import { useMailStore } from "@/store/mailStore";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import ActionButtons from "../ActionButtons/ActionButtons";

export default function MailList() {
  const [mail, domains] = useMailStore((store) => [
    store.email,
    store.domainInfo,
  ]);

  const [mailList, setMailList] = useState<IMail[]>([]);

  const { mails } = useMails<IMail[]>(domains?.at(0)!, domains?.at(1)!);

  const handleDeleteMail = (deleteMailId: number) => {
    const updatedMails = mailList?.filter((mail) => mail.id !== deleteMailId);
  };

  return (
    <div className="mt-12 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-center align-center">
        {mails?.map((mail) => (
          <Card className="w-full lg:w-1/4">
            <CardHeader>
              <CardTitle className="truncate mb-2">{mail.subject}</CardTitle>
              <CardDescription>
                From: {mail.from.split("@").at(1)}
              </CardDescription>
            </CardHeader>
            <ActionButtons mailId={mail.id} deleteMail={handleDeleteMail} />
          </Card>
        ))}
      </div>
    </div>
  );
}
