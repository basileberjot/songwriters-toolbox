export async function getGenres(token) {
  const response = await fetch(
    "https://api.spotify.com/v1/recommendations/available-genre-seeds",
    {
      headers: {
        Authorization: `Bearer ${token ? token : refreshToken.value}`,
      },
    }
  ).catch((error) => console.error(error));
  return response.json();
}
