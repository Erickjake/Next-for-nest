import { LoginForm } from "@/src/components/admin/LoginForm";
import ErrorMessage from "@/src/components/ErrorMessage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Login',
};

export default async function AdminLoginPage() {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));
  if (!allowLogin) {
    return (
      <ErrorMessage contentTitle="403" content="Login não está permitido no momento" />
    );
  }

  return (
    <LoginForm />
  );
}
