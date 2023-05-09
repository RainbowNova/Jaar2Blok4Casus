<h1>Welcome to SvelteKit</h1>

<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<a href="/Test">klik voor test</a>
<h2>Hier komt een getal: {number}</h2>
<button on:click={incrementBtn}>Klik voor een hoger nummer</button>

<script>
    let number = 0;
    function incrementBtn(){
        number += 1;
    }
</script>