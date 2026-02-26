'use client'; // Essencial para rodar no navegador

import { useEffect, useState } from 'react';
import { formatDistanceToNow } from '@/src/utils/format-datetime';

export default function PostDate({ date }: { date: string }) {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    // Isso só executa após o componente montar no navegador
    setFormattedDate(formatDistanceToNow(date));
  }, [date]);

  // Enquanto não formata no cliente, exibe um espaço vazio ou a data fixa
  if (!formattedDate) return <span className="opacity-0">...</span>;

  return (
    <span className='text-[11px] text-zinc-400'>
      Atualizado {formattedDate}
    </span>
  );
}
