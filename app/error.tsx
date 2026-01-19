'use client';
import ErrorMessage from "@/src/components/ErrorMessage";
import { useEffect } from "react";


type SlugErrorProps = {
  error: Error;
  reset: () => void;
};

export default function SlugError({ error }: SlugErrorProps) {
  useEffect(() => {
    console.log("Error in slug page:", error);
  }, [error]);
  return (
    <ErrorMessage
      pageTitle="Internal Server Error"
      contentTitle="501"
      content='Ocorreu um erro ao carregar a postagem. Por favor, tente novamente.'
    />
  );
}
