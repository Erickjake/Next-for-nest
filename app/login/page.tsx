import { LoginForm } from "@/src/components/LoginForm";
import ErrorMessage from "@/src/components/ErrorMessage";
import { Metadata } from "next";
import { Suspense } from "react";
import SpinLoader from "@/src/components/SpinLoader";

export const metadata: Metadata = {
  title: 'Login',
};

export default async function AdminLoginPage() {
  // Verifica se a variável é explicitamente '1' ou 'true'
  const allowLogin = process.env.ALLOW_LOGIN === '1' || process.env.ALLOW_LOGIN === 'true';

  if (!allowLogin) {
    return (
      <ErrorMessage contentTitle="403" content="Login não está permitido no momento" />
    );
  }

  return (
    <Suspense fallback={<SpinLoader />}>
      <LoginForm />
    </Suspense>
  );
}
