import ErrorMessage from "@/src/components/ErrorMessage";

export default function NotFound() {
  return (
    <ErrorMessage
      pageTitle="404 - Page Not Found"
      contentTitle="Error 404 😢"
      content="The page you are looking for could not be found."
    />
  );
}


