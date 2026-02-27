'use client'

import { cn } from "@/src/lib/utils"
import InputText from "../../InputText"
import { Button } from "../../Button"
import { startTransition, useActionState, useEffect, useState } from "react"
import Dialog from "../../Dialog"
import { PublicUserDto } from "@/src/lib/user/schemas"
import { updateUserAction } from "@/src/actions/user/update-user-action"
import { toast } from "react-toastify"
import { deleteUserAction } from "@/src/actions/user/delete-user-action"
import { TrashIcon, UserCircleIcon } from "lucide-react"
import { UpdatePasswordForm } from "../UpdateUserPassword"

type UpdateUserFormProps = {
  user: PublicUserDto
}

export function UpdateUserForm({ user }: UpdateUserFormProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [state, action, isPending] = useActionState(updateUserAction, {
    user,
    errors: [],
    success: false
  })

  useEffect(() => {
    toast.dismiss()
    if (state.errors.length > 0) {
      state.errors.forEach(e => toast.error(e))
    }
    if (state.success) {
      toast.success('Informações atualizadas com sucesso!')
    }
  }, [state])

  function handleOpenDeleteDialog(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    setIsDialogOpen(true)
  }

  function handleConfirmDelete() {
    startTransition(async () => {
      const res = await deleteUserAction();

      if (res?.errors) {
        toast.dismiss()
        res.errors.forEach(e => toast.error(e))
      } else {
        toast.dismiss()
        toast.success('Conta excluída com sucesso!')
      }
      setIsDialogOpen(false)
    })
  }

  return (
    <div className="flex-1 flex flex-col gap-8 max-w-3xl mx-auto w-full py-8 px-4">
      <div className={cn('bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 overflow-hidden')}>
        <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-800 bg-linear-to-r from-gray-50 to-white/60 dark:from-gray-900/60 dark:to-gray-900/40">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <UserCircleIcon className="w-7 h-7 text-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white leading-tight">
                Configurações da Conta
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Atualize as suas informações pessoais e credenciais de acesso de forma segura.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-10">
          <section aria-labelledby="personal-data-heading">
            <h3 id="personal-data-heading" className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
              Dados Pessoais
            </h3>

            <form action={action} className="flex flex-col gap-5" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputText
                  id="name"
                  type="text"
                  name="name"
                  labelText="Nome Completo"
                  placeholder="O seu nome"
                  defaultValue={user.name}
                  required
                  className="focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-indigo-500"
                />
                <InputText
                  id="email"
                  type="email"
                  name="email"
                  labelText="E-mail"
                  placeholder="O seu e-mail"
                  defaultValue={user.email}
                  required
                  className="focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-indigo-500"
                />
              </div>

              <div className="mt-2 flex items-center justify-end gap-3">
                <Button
                  type="submit"
                  variant="default"
                  disabled={isPending}
                  className={cn(
                    'px-6 py-2.5 rounded-lg text-sm font-medium transition transform motion-safe:duration-150',
                    isPending
                      ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                      : 'bg-gray-900 text-white hover:bg-gray-800 active:scale-95',
                    'dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100'
                  )}
                  aria-disabled={isPending} size={"sm"}                >
                  {isPending ? 'A guardar...' : 'Salvar Alterações'}
                </Button>
              </div>
            </form>
          </section>

          <hr className="border-gray-100 dark:border-gray-800" />

          <section aria-labelledby="security-heading">
            <h3 id="security-heading" className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
              Segurança e Palavra-passe
            </h3>
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700/50">
              <UpdatePasswordForm />
            </div>
          </section>
        </div>
      </div>

      <div className="p-6 md:p-8 bg-red-50 dark:bg-red-950/10 rounded-2xl border border-red-200 dark:border-red-900/40 mt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl flex items-start gap-4">
            <div className="p-2 rounded-md bg-red-100 dark:bg-red-900/30">
              <TrashIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-700 dark:text-red-400">
                Excluir conta permanentemente
              </h3>
              <p className="mt-1 text-sm text-red-600/90 dark:text-red-300/80 leading-relaxed">
                Uma vez excluída, não há como voltar atrás. Todos os seus dados, configurações e posts serão removidos permanentemente.
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="danger"
            onClick={handleOpenDeleteDialog}
            className={cn(
              'px-6 py-2.5 rounded-lg text-sm font-semibold transition transform motion-safe:hover:-translate-y-0.5 whitespace-nowrap',
              'bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300',
              'dark:bg-red-950/30 dark:text-red-500 dark:border-red-900/50 dark:hover:bg-red-900/40'
            )}
            aria-describedby="danger-desc" size={"sm"}          >
            Apagar minha conta
          </Button>
        </div>
      </div>

      <Dialog
        title="Apagar minha conta"
        content="Ao apagar a sua conta, todos os seus dados e posts serão excluídos. Essa ação é IRREVERSÍVEL. Clique em Confirmar para prosseguir ou Cancelar para fechar esta janela."
        isVisible={isDialogOpen}
        onCancel={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        disableBackdropClick={false}
      />
    </div>
  )
}
