import { MenuAdmin } from "@/src/components/admin/MenuAdmin";
import SpinLoader from "@/src/components/SpinLoader";
import { requireLoginSessionForApiOrRedirect } from "@/src/lib/login/manage-login";
import { Suspense } from "react";

type AdminPostLayoutProps = Readonly<{
  children: React.ReactNode;
}>;


// 1. Criamos um componente interno ASYNC.
// É ele que vai "segurar" o carregamento.
async function AdminContent({ children }: { children: React.ReactNode }) {
  // A verificação acontece aqui, DENTRO do limite do Suspense
  await requireLoginSessionForApiOrRedirect();

  return (
    <>
      <MenuAdmin />
      {children}
    </>
  );
}

// 2. O Layout principal apenas define a barreira de Suspense
export default function AdminPostLayout({ children }: AdminPostLayoutProps) {
  return (
    // Agora sim: O Suspense envolve o componente que tem o 'await'
    <Suspense fallback={<SpinLoader />}>
      <AdminContent>
        {children}
      </AdminContent>
    </Suspense>
  );
}
