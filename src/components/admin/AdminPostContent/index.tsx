import { connection } from "next/server";

type Props = {
  id: string;
};

export default async function AdminPostContent({ id }: Props) {
  await connection();

  return (
    <div className="py-16 text-6xl">
      <h1>Admin Post Page {id}</h1>
    </div>
  );
}
