
type BookReview = {
    id: string;
    bookTitle: string;
    bookIsbn: string;
    bookIsbn13: string;
    rating: number;
};

async function getReview(isbn: string): Promise<BookReview> {
    const res = await fetch(`http://localhost:8080/api/reviews/${isbn}`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const text = await res.text();
    console.log("API Response:", text);
    return JSON.parse(text);
}

export default async function BookReviewPage({ params: paramsPromise }: { params: Promise<{ isbn: string }> }) {
    const params = await paramsPromise;
    const review = await getReview(params.isbn);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-24">
            <div className="w-full max-w-2xl rounded-lg bg-gray-800 p-8 shadow-lg">
                <h1 className="mb-4 text-4xl font-bold">{review.bookTitle}</h1>
                <p className="mb-2 text-lg">ISBN-10: {review.bookIsbn}</p>
                <p className="mb-2 text-lg">ISBN-13: {review.bookIsbn13}</p>
                <p className="text-lg">Rating: {review.rating}</p>
            </div>
        </main>
    );
}
