import { Button } from "@/src/components/Button";
import InputCheckBox from "@/src/components/InputCheckBox";
import InputText from "@/src/components/InputText";

export default async function AdminPostNewPage() {
  return (
    <div className=" flex gap-6 flex-col ">
      <InputText labelText="Nome" name="title" />
      <InputText labelText="Email" name="email" />
      <InputCheckBox labelText="Aceito os termos e condições" />
      <InputCheckBox labelText="Publicar" />
      <Button variant="default" size={"md"} type="submit">Create Post</Button>
    </div>
  );
}
