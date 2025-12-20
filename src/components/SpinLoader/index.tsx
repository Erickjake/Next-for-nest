
type SpinLoaderProps = {
  className?: string;
  loaderClassName?: string;
};


export function SpinLoader({ className = '' }: SpinLoaderProps) {
  const classes = `flex items-center justify-center ${className}`;
  return (
    <div className={classes}>
      <div className="w-10 h-10 border-4 border-white border-solid border-t-transparent rounded-full animate-spin "></div>
    </div>
  );
}

export default SpinLoader;
