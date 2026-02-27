'use client';

import { formatDistanceToNowFrom } from "@/src/utils/format-datetime";

type PostDateProps = {
  dateTime: string;
};

export function PostDate({ dateTime }: PostDateProps) {
  const now = Date.now();

  return (
    <time
      className="text-slate-600 text-sm/tight"
      dateTime={dateTime}
      title={formatDistanceToNowFrom(dateTime, now)}
    >
      {formatDistanceToNowFrom(dateTime, now)}
    </time>
  );
}
