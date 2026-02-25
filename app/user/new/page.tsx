import { CreateUserForm } from "@/src/components/CreateUserForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar Conta",
}
export default async function CreateUserPage() {
  return <CreateUserForm />
}
