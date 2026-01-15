import { formatDateTime, formatDistanceToNow } from "@/src/utils/format-datetime"

type PostDateProps = {
  datetime: string
}

export default function PostDate({ datetime }: PostDateProps) {
  return (
    <time className="text-sm/tight text-gray-600" dateTime={datetime} title={formatDistanceToNow
      (datetime)}>{formatDateTime
        (datetime)}</time>
  )
}
