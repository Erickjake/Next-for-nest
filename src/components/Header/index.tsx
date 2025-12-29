import Link from "next/link";

export function Header() {
  return (
    <header>
      <h1 className="text-4xl text-center font-extrabold py-8 sm:text-5xl/normal sm:py-10 md:text-6xl/normal md:py-12 lg:text-7xl/normal lg:py-16 xl:text-8xl/normal xl:py-20"><Link href="/">Posts List</Link></h1>
    </header>
  );
}

export default Header;
