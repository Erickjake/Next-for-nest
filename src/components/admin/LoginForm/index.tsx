'use client'

import { loginAction } from "@/src/actions/login/login-action";
import { Button } from "@/src/components/Button";
import InputText from "@/src/components/InputText";
import { cn } from "@/src/lib/utils";
import { LogInIcon } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export function LoginForm() {
  const initialState = {
    username: '',
    error: '',
  }
  const [state, action, isPending] = useActionState(loginAction, initialState)
  useEffect(() => {
    if (state.error) {
      toast.dismiss()
      toast.error(state.error)

    }
  }, [state.error])

  return (
    <div className={cn("flex items-center justify-center text-center max-w-sm mx-auto mt-16 mb-32")}>
      <form action={action} className="flex-1 flex flex-col gap-6">
        <InputText type="text" name="username" labelText="Usuário" disabled={isPending} defaultValue={state.username} />
        <InputText type="password" name="password" labelText="Senha" disabled={isPending} />
        <Button disabled={isPending} type="submit" className="mt-4" variant={"default"} size={"md"}><LogInIcon className="w-4 h-4" /> Entrar</Button>
        {!!state.error && <p className="text-red-500">{state.error}</p>}
      </form>
    </div >
  );
}
