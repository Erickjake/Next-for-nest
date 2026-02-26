'use client'

import { loginAction } from "@/src/actions/login/login-action";
import { Button } from "@/src/components/Button";
import InputText from "@/src/components/InputText";
import { cn } from "@/src/lib/utils";
import { LogInIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { HoneypotInput } from "../HoneypotInput";

export function LoginForm() {
  const initialState = {
    email: '',
    errors: [],
  }

  const router = useRouter()
  const searchParams = useSearchParams();
  const userChanged = searchParams.get('userChanged');
  const created = searchParams.get('created');
  const [state, action, isPending] = useActionState(loginAction, initialState)

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss()
      state.errors.forEach(error => toast.error(error))
    }
  }, [state.errors])

  useEffect(() => {
    if (userChanged === '1') {
      toast.dismiss()
      toast.success('Usuário Modificado com sucesso!');
      const url = new URL(window.location.href);
      url.searchParams.delete('userChanged');
      router.replace(url.toString(), { scroll: false });
    }
    if (created === '1') {
      toast.dismiss()
      toast.success('Conta criada com sucesso!');
      const url = new URL(window.location.href);
      url.searchParams.delete('created');
      router.replace(url.toString(), { scroll: false });
    }
  }, [userChanged, created, router]);


  return (
    <div className={cn("flex items-center justify-center text-center max-w-sm mx-auto mt-16 mb-32")}>
      <form action={action} className="flex-1 flex flex-col gap-6">
        <InputText type="text" name="email" labelText="E-mail" disabled={isPending} defaultValue={state.email} placeholder="Digite seu e-mail" required />
        <InputText type="password" name="password" labelText="Senha" disabled={isPending} placeholder="Digite sua senha" required />
        <HoneypotInput />
        <Button disabled={isPending} type="submit" className="mt-4" variant={"default"} size={"md"}><LogInIcon className="w-4 h-4" /> Entrar</Button>
        <Link href="/user/new">Criar conta</Link>
      </form>
    </div >
  );
}
