<script>
    import { onMount, onDestroy } from 'svelte';
  
    export let messages = [];
  
    let greeting = '';
    
    const setRandomGreeting = () => {
        greeting = messages[Math.floor(Math.random() * messages.length)];
    };

    const handleButtonClick = () => {
        setRandomGreeting();
    };
    
    onMount(() => {
        setRandomGreeting();
    });
    
    onDestroy(() => {
        greeting = '';
    });
    </script>
  
  <div>
    <h3>{greeting}! Thank you for visiting!</h3>
    <button on:click={handleButtonClick}>
      New Greeting
    </button>
  </div>