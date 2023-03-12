<script>
  import { onMount } from "svelte";

  export let genres = [];

  export let selectedGenre = "";

  function handleChange(event) {
    selectedGenre = event.target.value;
  }
  const clientId = import.meta.env.PUBLIC_CLIENT_ID;
  const clientSecret = import.meta.env.PUBLIC_CLIENT_SECRET;
  const redirectUri = "http://localhost:3001";
  const scope = "user-read-private user-read-email"; // Replace with the scopes your app requires
  const tokenUrl = "https://accounts.spotify.com/api/token";
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;

  onMount(async function () {
    // Check if authorization code is in URL params
    const params = new URLSearchParams(window.location.search);
    const authorizationCode = params.get("code");
    console.log({ authorizationCode });
    if (authorizationCode) {
      console.log("we don't have a token but an anthorization code");
      // Make a POST request to the Spotify Accounts Service's token endpoint to exchange the authorization code for an access token
      const data = {
        grant_type: "authorization_code",
        code: authorizationCode,
        redirect_uri: redirectUri, // Replace with your app's redirect URI
        client_id: clientId,
        client_secret: clientSecret,
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data),
      };

      const tokenRes = await fetch(tokenUrl, options)
        .then((response) => response.json())
        .catch((error) => {
          console.error("Error:", error);
        });
      console.log({ tokenRes });
      document.cookie = `spotify_token=${tokenRes.access_token}`;
      document.cookie = `refresh_token=${tokenRes.refresh_token}`;
    } else {
      console.log("we have to authorize");
      // If we don't have an authorization code in the URL, redirect to the auth page
      location.href = authUrl;
    }

    // Check if access token is in the cookies
    const cookies = document.cookie.split(";"); // Get all cookies as an array
    const token = cookies
      .find((cookie) => cookie.trim().startsWith("spotify_token"))
      .split("=")[1];

    console.log({ token });
    async function getData() {
      if (token) {
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
    }
    if (token) {
      await getData().then((data) => (genres = data.genres));
    }
    console.log({ genres });
  });
</script>

<main>
  {#if genres}
    <select value={selectedGenre} on:change={handleChange}>
      {#each genres as genre}
        <option value={genre}>{genre}</option>
      {/each}
    </select>
  {:else}
    loading
  {/if}
</main>
