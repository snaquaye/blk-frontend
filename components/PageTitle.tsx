interface PageTitleProps {
  title: string;
}

export default function PageTitle({ title }: PageTitleProps) {
  return (
    <div className="pt-12 pb-8 w-full">
      <div className="flex items-center justify-end">
        <h1
          className="whitespace-nowrap text-black"
          style={{
            fontFamily: "Montserrat",
            fontWeight: 800,
            fontStyle: "ExtraBold",
            fontSize: "100px",
            lineHeight: "100%",
            letterSpacing: "0%",
            textAlign: "center",
          }}
        >
          {title}
        </h1>
        <div className="h-px bg-black ml-4 w-16 md:w-24"></div>
      </div>
    </div>
  );
}
