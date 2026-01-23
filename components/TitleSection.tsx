import Link from "next/link";

type TitleSectionProps = {
    title: string;
    description: string;
    author: string;
    date: string;
}

export default function TitleSection({title, description, author, date}: TitleSectionProps) {
    return (
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white text-black py-6 px-8 text-center shadow-sm">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3 italic">
                {title}
              </h1>
              <p className="text-gray-600 text-sm mb-3">{description}</p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <span>Written by <Link href="#" className="text-black underline">{author}</Link></span>
                <span>•</span>
                <span>{date}</span>
              </div>
            </div>
          </div>
        </div>
    );
}