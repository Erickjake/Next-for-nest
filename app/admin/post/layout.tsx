import { MenuAdmin } from "@/src/components/admin/MenuAdmin";


type AdminPostLayoutProps = Readonly<{
  children: React.ReactNode;
}>;


export default function AdminPostLayout({ children }: Readonly<{
  children: AdminPostLayoutProps["children"];
}>) {
  return (
    <>
      <MenuAdmin />{children}
    </>
  );
}
