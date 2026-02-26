import SpinLoader from "@/src/components/SpinLoader";
import { Metadata } from "next";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: "Alterar Senha",
}
export default async function AdminUserPagePassword() {
  return (
    <Suspense fallback={<SpinLoader className="mb-16" />}>
      <h1 className="text-2xl font-bold mb-8">Alterar Senha</h1>
    </Suspense>
  )
}
