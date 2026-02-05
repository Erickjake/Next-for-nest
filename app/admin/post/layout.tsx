import { MenuAdmin } from "@/src/components/admin/MenuAdmin";
import SpinLoader from "@/src/components/SpinLoader";
import { Suspense } from "react";


type AdminPostLayoutProps = Readonly<{
  children: React.ReactNode;
}>;


export default function AdminPostLayout({ children }: Readonly<{
  children: AdminPostLayoutProps["children"];
}>) {
  return (
    <>
      <Suspense fallback={<SpinLoader />}>
        <MenuAdmin />{children}
      </Suspense>
    </>
  );
}
