"use server"

export async function fetchData<T>(endpoint: string, baseUrl: string = process.env.FETCH_URL as string): Promise<T> {
    const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
    }

    // Get response as text since it's base64-encoded
    const base64Text = await response.text();
    
    try {
        // Decode the base64 string
        const decodedText = Buffer.from(base64Text, 'base64').toString('utf-8');
        
        // Parse the decoded text as JSON
        return JSON.parse(decodedText) as T;
    } catch (error) {
        console.error("Error decoding base64 response:", error);
        throw new Error("Failed to decode API response");
    }
}