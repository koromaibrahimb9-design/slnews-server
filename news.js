export default async function handler(req, res) {
  try {
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: "NEWS_API_KEY is not configured"
      });
    }

    const url =
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: data.message || "News API request failed"
      });
    }

    return res.status(200).json({
      success: true,
      articles: data.articles || []
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error while fetching news"
    });
  }
}
