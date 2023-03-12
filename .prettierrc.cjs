module.exports = {
  plugins: [
    require.resolve("prettier-plugin-astro"),
    require.resolve("prettier-plugin-svelte"),
  ],
  overrides: [
    {
      files: ["*.astro", "*.svelte"],
      options: {
        parser: "svelte",
      },
    },
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
