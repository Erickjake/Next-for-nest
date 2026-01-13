import clsx from "clsx";

export default function NotFound() {
  return (
    <div className={clsx('min-h-80 bg-slate-100 text-slate-900', 'mb-16 p-8 rounded-xl flex items-center justify-center text-center')}>
      <div>
        <h1 className="text-7xl/tight mb-4 font-extrabold">404</h1>
        <p>Error  404 - Page Not Found</p>
      </div>
    </div>
  );
}


