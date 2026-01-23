interface PageTitleProps {
  title: string;
}

export default function PageTitle({ title }: PageTitleProps) {
  return (
    <div className="pl-4 sm:pl-6 lg:pl-8 pt-12 pb-8 max-w-[55%] ml-auto">
      <div className="flex items-center">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-black">
          {title}
        </h1>
        <div className="hidden md:block flex-1 h-px bg-black ml-4"></div>
      </div>
    </div>
  );
}
