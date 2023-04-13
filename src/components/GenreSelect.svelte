<script>
  import { onMount } from "svelte";
  import Card from "./Card.svelte";
  import Autocomplete from "@smui-extra/autocomplete";
  import generateMidi from "../utils/generateMidi";
  import getTrackTest from "../utils/getTrackTest";
  import getAnalysis from "../utils/getAnalysis";
  import getKey from "../utils/getKey";
  import getMode from "../utils/getMode";
  import { getToken } from "../utils/getToken";
  import { getGenres } from "../utils/getGenres";
  export let genres = [];

  export let selectedGenre = "";
  let track;
  let analysis;

  onMount(async function () {
    // Check if access token is in the cookies
    const cookies = document.cookie.split(";"); // Get all cookies as an array
    const token =
      cookies
        .find((cookie) => cookie?.trim()?.startsWith("spotify_token"))
        ?.split("=")[1] ?? "";

    if (token) {
      await getGenres(token).then((data) => (genres = data.genres));
      track = await getTrackTest(token);
      analysis = await getAnalysis(token);
    } else {
      getToken();
    }
    console.log({ genres, track, analysis });
  });

  let recommendations = [];

  function handleChange(event) {
    selectedGenre = event.target.value;
    getRecommendations();
  }
</script>

<main>
  {#if genres}
    <select value={selectedGenre} on:change={handleChange}>
      {#each genres as genre}
        <option value={genre}>{genre}</option>
      {/each}
    </select>
    <div>
      <Autocomplete
        class="genre-select"
        options={genres}
        textfield$variant="outlined"
        bind:value={selectedGenre}
        label="Outlined"
      />

      <pre class="status">Selected: {selectedGenre || ""}</pre>
    </div>
  {:else}
    loading
  {/if}

  <!-- TODO: Select Country -> "Retrieve tracks from ... in priority" -->
  {#if recommendations?.tracks?.items.length > 0}
    <p>The recommandations are</p>
    {#each recommendations?.tracks?.items as track}
      <Card>
        <div slot="header">
          Song: {track.name}
          Artist:
          {#each track?.artists as artist}
            {artist.name}
          {/each}
          <!-- <img src={track.images[2].url} alt={`${track.name}-image`} /> -->
        </div>
        <p />
      </Card>
    {/each}
  {/if}

  <button on:click={generateMidi}>Download midi</button>

  {#if track && analysis}
    <Card>
      <div slot="header">
        Song: {track.name}
        Artist:
        {#each track?.artists as artist}
          {artist.name}
        {/each}
        <img src={track.album.images[2].url} alt={`${track.name}-image`} />
      </div>
      Key: {getKey(analysis.track.key)}
      Mode: {getMode(analysis.track.mode)}
      Tempo: {Math.round(analysis.track.tempo)}
      Duration: {(track.duration_ms / 60000).toFixed(2).replace(".", ":")}
    </Card>
  {/if}
</main>
