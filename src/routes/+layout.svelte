<script>
    import Login from "$lib/components/Login.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import { currentUser } from "$lib/pocketbase";
    import "../app.css";
</script>

{#if !$currentUser}
    <Login />
{:else}
    <Navbar />
    <slot />
{/if}
