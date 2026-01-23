
type AdminPostiDPageProps = {
  params: Promise<{ id: string }>;
};
export default async function AdminPostiDPage({ params }: AdminPostiDPageProps) {
  const { id } = await params;
  return (
    <div className="py-16 text-6xl">
      <h1>Admin Post Page {id}</h1>
    </div>
  );
}
