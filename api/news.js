export default async function handler(request) {
    try {
        const apiKey = process.env.NEWS_API_KEY;

        if (!apiKey) {
            return Response.json(
                { error: "News API key is not configured." },
                { status: 500 }
            );
        }

        const url =
            "https://newsapi.org/v2/top-headlines?" +
            "country=us&pageSize=20";

        const response = await fetch(url, {
            headers: {
                "X-Api-Key": apiKey
            }
        });

        const data = await response.json();

        if (!response.ok) {
            return Response.json(
                { error: data.message || "NewsAPI request failed." },
                { status: response.status }
            );
        }

        return Response.json(data);

    } catch (error) {

        return Response.json(
            { error: "Unable to fetch news." },
            { status: 500 }
        );

    }
}
