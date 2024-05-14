export const Spinner = () => {
  return (
    <div className="absolute inset-0 h-screen w-full z-50 backdrop-blur-sm bg-slate-700/30 flex items-center justify-center">
      <span className="loader"></span>
    </div>
  );
};
