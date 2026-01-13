import Link from "next/link";

export function Footer() {
  return (
    <footer className="text-center py-4 border-t mt-8">
      <p className="text-sm text-slate-500">
        &copy; {new Date().getFullYear()} - <Link href="/">The Blog</Link>
      </p>
    </footer>
  );
}

export default Footer;
