import { env } from '$env/dynamic/public';

/**
 * Searches photos on Pexels using the configured API Key.
 * @param query The search query (e.g. "beach", "eiffel tower").
 * @param perPage The number of photos to return.
 * @returns A promise that resolves to an array of image URL strings.
 */
export async function searchPhotos(query: string, perPage: number = 1): Promise<string[]> {
	const apiKey = env.PUBLIC_PEXELS_API_KEY || "cxXI16SaeuxL1n78lx5BtOtDVoQJOfL2rW4QycWr57YnRcMA3rSdjxOf";
	if (!apiKey) {
		console.warn('PUBLIC_PEXELS_API_KEY is not configured in environment variables.');
		return [];
	}

	try {
		const response = await fetch(
			`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}`,
			{
				headers: {
					Authorization: apiKey
				}
			}
		);

		if (!response.ok) {
			console.error(`Pexels API error: ${response.status} ${response.statusText}`);
			return [];
		}

		const data = await response.json();
		if (data && Array.isArray(data.photos)) {
			return data.photos.map((photo: any) => photo.src.large2x || photo.src.large || photo.src.medium);
		}
		return [];
	} catch (error) {
		console.error('Error fetching photos from Pexels:', error);
		return [];
	}
}
