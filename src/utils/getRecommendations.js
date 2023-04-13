export default async function getRecommmendations(token) {
  const response = await fetch(
    `https://api.spotify.com/v1/search?type=track&limit=5&market=US&q=genre:${selectedGenre}`,
    {
      headers: {
        Authorization: `Bearer ${token ? token : refreshToken.value}`,
      },
    }
  ).catch((error) => console.error(error));
  return response.json();
}
