import Link from "next/link";

interface AuthorBioProps {
  name: string;
  bio: string;
  imageUrl?: string;
  slug?: string;
}

export default function AuthorBio({
  name,
  bio,
  imageUrl,
  slug = "#",
}: AuthorBioProps) {
  return (
    <div className="bg-gray-100 p-6 flex gap-6 items-start">
      {/* Author Avatar */}
      <Link href={slug} className="flex-shrink-0">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={name}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
      </Link>

      {/* Author Info */}
      <div className="flex-1">
        <p className="text-sm text-gray-700 leading-relaxed">
          <span className="font-bold">{name}</span> - {bio}
        </p>
      </div>
    </div>
  );
}
