import type { Metadata } from "next";
import "./globals.css";
import { Container } from "@/src/components/Container";
import { ToastifyContainer } from "@/src/components/ToastifyContainer";
import { Header } from "@/src/components/Header";
import { Footer } from "@/src/components/Footer";



export const metadata: Metadata = {
  title: {
    default: 'The blog - Este é um blog com Next.js',
    template: '%s | The Blog',
  },
  description: 'Essa seria a descrição dessa página.',
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Container>
          <Header />
          {children}
          <Footer />
        </Container>
        <ToastifyContainer />
      </body>
    </html>
  );
}
