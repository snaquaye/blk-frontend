type NoContentProps = {
    message?: string;
};

export default function NoContent({ message }: NoContentProps) {
  return (
    <div className="no-content py-6 flex items-center justify-center bg-gray-100 text-gray-500 italic">
      <p>{message || "No content available at the moment."}</p>
    </div>
  );
}