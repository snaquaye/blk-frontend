interface PageTitleProps {
  title: string;
}

export default function PageTitle({ title }: PageTitleProps) {
  return (
    <div className="pt-12 pb-8">
      <div className="flex items-center justify-center">
        <div className="hidden md:block h-px bg-black mr-4 flex-1"></div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-black">
          {title}
        </h1>
        <div className="hidden md:block h-px bg-black ml-4 flex-1"></div>
      </div>
    </div>
  );
}
