import { getPublicUserFromApi } from "@/src/lib/user/api/get-user"
import { UpdateUserForm } from "../admin/UpdateUserForm"
import ErrorMessage from "../ErrorMessage"

export async function UpdateUser() {
  const user = await getPublicUserFromApi()

  if (!user) {
    return (
      <ErrorMessage contentTitle="😅"
        content="Usuário não encontrado." />

    )
  }
  return <UpdateUserForm user={user} />

}
