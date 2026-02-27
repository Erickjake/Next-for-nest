'use client';

import { updatePasswordAction } from '@/src/actions/user/update-password-action';
import clsx from 'clsx';
// 1. Importei também o ShieldCheckIcon para o cabeçalho
import { LockKeyholeIcon, ShieldCheckIcon } from 'lucide-react';
import { useActionState, useEffect } from 'react';
import { toast } from 'react-toastify';
import InputText from '../../InputText';
import { Button } from '../../Button';

export function UpdatePasswordForm() {
  const [state, action, isPending] = useActionState(updatePasswordAction, {
    errors: [],
    success: false,
  });

  useEffect(() => {
    toast.dismiss();

    if (state.errors.length > 0) {
      state.errors.forEach(error => toast.error(error));
    }

    if (state.success) {
      toast.success('Senha atualizada com sucesso!');
    }
  }, [state]);

  return (
    // 2. O contentor principal que centraliza tudo no ecrã com um preenchimento lateral seguro (px-4)
    <div className="flex items-center justify-center mt-16 mb-32 mx-auto w-full px-4">

      {/* 3. O "Cartão" visual: fundo, sombra, bordas arredondadas e suporte a dark mode */}
      <div className={clsx(
        "w-full max-w-md p-8 space-y-8",
        "bg-white dark:bg-slate-900",
        "border border-gray-200 dark:border-slate-800",
        "rounded-2xl shadow-xl dark:shadow-2xl"
      )}>

        {/* 4. Cabeçalho do Cartão: Ícone, Título e Descrição */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-2">
            <ShieldCheckIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Segurança da Conta
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Atualize a sua senha para manter a sua conta protegida.
          </p>
        </div>

        {/* 5. O Formulário em si */}
        <form action={action} className="flex flex-col gap-5">
          <InputText
            type="password"
            name="currentPassword"
            labelText="Senha antiga"
            placeholder="A sua senha atual"
            disabled={isPending}
            defaultValue=""
          />

          <InputText
            type="password"
            name="newPassword"
            labelText="Senha nova"
            placeholder="Crie uma nova senha"
            disabled={isPending}
            defaultValue=""
          />

          <InputText
            type="password"
            name="newPassword2"
            labelText="Repetir senha nova"
            placeholder="Repita a nova senha"
            disabled={isPending}
            defaultValue=""
          />

          {/* 6. Rodapé do formulário com uma linha divisória e o botão ocupando toda a largura */}
          <div className="pt-4 mt-2 border-t border-gray-100 dark:border-slate-800">
            <Button
              size="md"
              disabled={isPending}
              type="submit"
              variant="default"
              // Ajustámos a classe do botão para centralizar o conteúdo e dar espaço ao ícone
              className="w-full flex items-center justify-center gap-2 py-6 text-base"
            >
              <LockKeyholeIcon className="w-5 h-5" />
              {/* Feedback visual: muda o texto se estiver a carregar */}
              {isPending ? 'A atualizar...' : 'Atualizar senha'}
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
}
