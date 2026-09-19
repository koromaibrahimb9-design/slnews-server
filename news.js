export default async function handler(req, res) {
  try {
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: "NEWS_API_KEY is not configured"
      });
    }

    const controller = new AbortController();

    // Stop waiting after 10 seconds
    const timeout = setTimeout(() => {
      controller.abort();
    }, 10000);

    const url =
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=${apiKey}`;

    const response = await fetch(url, {
      method: "GET",
      signal: controller.signal
    });

    clearTimeout(timeout);

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: data.message || "NewsAPI request failed"
      });
    }

    return res.status(200).json({
      success: true,
      articles: data.articles || []
    });

  } catch (error) {
    if (error.name === "AbortError") {
      return res.status(504).json({
        success: false,
        error: "NewsAPI took too long to respond"
      });
    }

    return res.status(500).json({
      success: false,
      error: error.message || "Server error"
    });
  }
}
