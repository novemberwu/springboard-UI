"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const [isbn, setIsbn] = useState('');
    const router = useRouter();

    const handleNavigate = () => {
        if (isbn.length === 13) {
            router.push(`/reviews/${isbn}`);
        } else {
            alert('Please enter a valid 13-digit ISBN.');
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-green-50 p-24">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                <h1 className="mb-6 text-center text-3xl font-bold text-green-800">Welcome to Book Reviews</h1>
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        placeholder="Enter 13-digit ISBN"
                        className="rounded-md border border-gray-300 p-3 text-lg focus:border-green-500 focus:outline-none"
                    />
                    <button
                        onClick={handleNavigate}
                        className="rounded-md bg-green-600 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-green-700"
                    >
                        Find Review
                    </button>
                </div>
            </div>
        </main>
    );
}
