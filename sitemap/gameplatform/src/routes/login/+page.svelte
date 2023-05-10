<script>
  let email = "";
  let password = "";
  
  function handleSubmit() {
    // Handle form submission here
    console.log("Email:", email);
    console.log("Password:", password);
  }
</script>

<style>
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  label {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  input[type="email"], input[type="password"] {
    padding: 0.5rem;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    border: 2px solid #ccc;
    border-radius: 0.5rem;
    width: 100%;
    max-width: 25rem;
  }
  
  button[type="submit"] {
    padding: 0.5rem;
    font-size: 1.2rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }
  
  button[type="submit"]:hover {
    background-color: #3E8E41;
  }
</style>

<form on:submit|preventDefault={handleSubmit}>
  <label for="email">Email:</label>
  <input type="email" id="email" bind:value={email} required>
  
  <label for="password">Password:</label>
  <input type="password" id="password" bind:value={password} required>
  
  <button type="submit">Log In</button>
</form>