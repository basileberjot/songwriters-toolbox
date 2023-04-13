export default async function getTrackTest(token) {
  const response = await fetch(
    "https://api.spotify.com/v1/tracks/6MQAB3vorg90FA3tQpbYXK",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).catch((error) => console.error(error));
  return response.json();
}
