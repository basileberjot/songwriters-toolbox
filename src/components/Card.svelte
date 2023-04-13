<!-- Card.svelte -->

<div class="card">
  <div class="card-header">
    <slot name="header" />
  </div>
  <div class="card-body">
    <slot />
  </div>
</div>

<style>
  .card {
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .card-header {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: flex;
    gap: 30px;
  }
</style>
