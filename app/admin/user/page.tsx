import SpinLoader from "@/src/components/SpinLoader";
import { UpdateUser } from "@/src/components/UpdateUser";
import { Metadata } from "next";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: "Seus Dados",
}
export default async function AdminUserPage() {
  return (
    <Suspense fallback={<SpinLoader className="mb-16" />}>
      <UpdateUser />
    </Suspense>
  )
}
