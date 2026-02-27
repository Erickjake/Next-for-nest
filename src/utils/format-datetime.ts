export function formatDistanceToNowFrom(rawDate: string, now: number): string {
  const date = new Date(rawDate);
  const diffMs = now - date.getTime();

  const minutes = Math.floor(diffMs / 60000);

  if (minutes < 1) return 'agora mesmo';
  if (minutes < 60) return `há ${minutes} minutos`;

  const hours = Math.floor(minutes / 60);

  if (hours < 24) return `há ${hours} horas`;

  const days = Math.floor(hours / 24);

  return `há ${days} dias`;
}
