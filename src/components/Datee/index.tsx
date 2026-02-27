'use client'; // Essencial para rodar no navegador

import { formatDistanceToNowFrom } from '@/src/utils/format-datetime';
import { useEffect, useState } from 'react';

export default function PostDate({ date }: { date: string }) {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    // Isso só executa após o componente montar no navegador
    setFormattedDate(formatDistanceToNowFrom(date, Date.now()));
  }, [date]);

  // Enquanto não formata no cliente, exibe um espaço vazio ou a data fixa
  if (!formattedDate) return <span className="opacity-0">...</span>;

  return (
    <span className='text-[11px] text-zinc-400'>
      Atualizado {formattedDate}
    </span>
  );
}
