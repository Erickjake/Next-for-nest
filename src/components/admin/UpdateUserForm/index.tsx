'use client'

import { cn } from "@/src/lib/utils"
import InputText from "../../InputText"
import { Button } from "../../Button"
import { useState } from "react"
import Dialog from "../../Dialog"
import { PublicUserDto } from "@/src/lib/user/schemas"


type UpdateUserFormProps = {
  user: PublicUserDto
}
export function UpdateUserForm({ user }: UpdateUserFormProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)



  function handleDeleteAccount(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setIsDialogOpen(true)
  }
  return (
    <div className="flex-1 flex flex-col gap-8 max-w-2xl mx-auto w-full">
      {/* Card Principal de Edição */}
      <div className={cn('p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800')}>
        <div className="space-y-2 mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Configurações da Conta
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Atualize suas informações pessoais e credenciais de acesso.
          </p>
        </div>

        <form action={''} className={cn('flex flex-col gap-5')}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputText type='text' name='name' labelText='Nome' placeholder='Seu nome' required />
            <InputText type='email' name='email' labelText='E-mail' placeholder='Seu e-mail' required />
          </div>

          <hr className="border-gray-100 dark:border-gray-800 my-2" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputText type='password' name='password' labelText='Nova Senha' placeholder='Sua senha' />
            <InputText type='password' name='password2' labelText='Confirmar Senha' placeholder='Sua senha novamente' />
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              type="submit"
              variant="default"
              size="md"
              className={cn(
                'px-8 py-3 rounded-full text-sm font-semibold transition-all cursor-pointer',
                'bg-gray-900 text-white hover:bg-gray-700 active:scale-95',
                'dark:bg-white dark:text-black dark:hover:bg-gray-200 shadow-md hover:shadow-lg'
              )}
            >
              Salvar Alterações
            </Button>
          </div>
        </form>
      </div>

      {/* Zona de Perigo - Apagar Conta */}
      <div className="p-6 bg-red-50/50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-red-600 dark:text-red-500">Excluir conta</h3>
            <p className="text-sm text-red-500/80 dark:text-red-400/80">
              Uma vez excluída, todos os seus dados serão removidos permanentemente.
            </p>
          </div>
          <Button
            variant="danger"
            size="md"
            onClick={handleDeleteAccount}
            className={cn(
              'px-6 py-2 rounded-full text-sm font-semibold transition-all',
              'bg-white text-red-600 border border-red-200 hover:bg-red-600 hover:text-white',
              'dark:bg-transparent dark:text-red-500 dark:border-red-900/50 dark:hover:bg-red-900/20'
            )}
          >
            Apagar minha conta
          </Button>
          <Dialog
            content="Ao apagar meu usuário, meus dados e todos os meus posts também serão excluídos. Essa ação é IRREVERSÍVEL. Em alguns segundos os botões serão liberados. Clique em OK para confirmar ou Cancelar para fechar essa janela."
            onCancel={() => setIsDialogOpen(false)}
            onConfirm={() => {
              handleDeleteAccount({} as React.MouseEvent<HTMLButtonElement, MouseEvent>)
              setIsDialogOpen(false)
            }}
            isVisible={isDialogOpen}
            disableBackdropClick={false}
            title='Apagar meu usuário'
          />
        </div>
      </div>
    </div>
  )
}
