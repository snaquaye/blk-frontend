export default function NoImage({message}: {message?: string}) {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 bg-white">
            <p className="font-bold text-black">{message}</p>
            <span className="text-black">(No Image)</span>
        </div>
    );
}
