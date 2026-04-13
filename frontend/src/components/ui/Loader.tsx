const Loader = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="h-2 w-2 animate-bounce rounded-full bg-offwhite-font [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 animate-bounce rounded-full bg-offwhite-font [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 animate-bounce rounded-full bg-offwhite-font"></div>
    </div>
  );
};

export default Loader;
