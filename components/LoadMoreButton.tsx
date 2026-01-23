interface LoadMoreButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
}

export default function LoadMoreButton({ onClick, isLoading = false }: LoadMoreButtonProps) {
  return (
    <div className="flex justify-center py-8">
      <div className="flex items-center space-x-1">
        <button
          onClick={onClick}
          disabled={isLoading}
          className="w-24 h-8 p-2 flex items-center justify-center border border-[2px] border-black text-sm hover:bg-gray-100 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
}
