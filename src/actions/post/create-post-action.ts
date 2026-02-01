type createPostActionState = {
  numero: number;
};
export async function createPostAction(
  state: createPostActionState,
): Promise<createPostActionState> {
  console.log({ state });
  return {
    numero: 1,
  };
}
