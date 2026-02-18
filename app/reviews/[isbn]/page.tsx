
type BookReview = {
    id: string;
    bookTitle: string;
    bookIsbn: string;
    bookIsbn13: string;
    rating: number;
};

function StarRating({ rating }: { rating: number }) {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    return (
        <div className="flex items-center text-yellow-400">
            {'★'.repeat(fullStars)}{'☆'.repeat(emptyStars)}
        </div>
    );
}

async function getReview(isbn: string): Promise<BookReview | null> {
    const res = await fetch(`http://localhost:8080/api/reviews/${isbn}`, { cache: 'no-store' });
    if (!res.ok) {
        // Optionally, handle specific HTTP errors here if needed
        return null; 
    }
    const text = await res.text();
    console.log("API Response:", text);

    if (!text || text.trim().length === 0) {
        return null;
    }

    try {
        return JSON.parse(text);
    } catch (error) {
        console.error("Failed to parse JSON response:", error);
        return null;
    }
}

export default async function BookReviewPage({ params: paramsPromise }: { params: Promise<{ isbn: string }> }) {
    const params = await paramsPromise;
    const review = await getReview(params.isbn);

    if (!review) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-24">
                <div className="w-full max-w-2xl rounded-lg bg-gray-800 p-8 shadow-lg">
                    <h1 className="mb-4 text-4xl font-bold">Review not found for ISBN: {params.isbn}</h1>
                    <p className="text-lg">Please check the ISBN and try again.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-24">
            <div className="w-full max-w-2xl rounded-lg bg-gray-800 p-8 shadow-lg">
                <h1 className="mb-4 text-4xl font-bold">{review.bookTitle}</h1>
                <p className="mb-2 text-lg">ISBN-10: {review.bookIsbn}</p>
                <p className="mb-2 text-lg">ISBN-13: {review.bookIsbn13}</p>
                <div className="flex items-center">
                    <p className="text-lg mr-2">Rating:</p>
                    <StarRating rating={review.rating} />
                </div>
            </div>
        </main>
    );
}
