import Link from 'next/link';

export default function Page() {
    return (
        // These are Tailwind classes:
        <main className="flex min-h-screen flex-col p-6">
            <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
                <h1 className="text-white text-3xl font-bold">Page Title</h1>
            </div>
            <div className="flex flex-grow">
                <div className="flex flex-col w-full max-w-2xl mx-auto">    </div>
            </div>

        </main>
    )
}