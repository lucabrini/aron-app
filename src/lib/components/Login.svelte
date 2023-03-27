<script lang="ts">
    import { pb } from "$lib/pocketbase";
    import { SpinLine } from "svelte-loading-spinners";

    let username: string;
    let password: string;

    let loading = false;

    async function login() {
        loading = true;
        await pb.collection("teachers").authWithPassword(username, password);
        loading = false;
    }
</script>

<div class="relative rounded-2xl h-1/3 top-[20%] prose p-4 bg-white shadow-xl">
    <h2>Studio Musicale</h2>
    <form on:submit|preventDefault class="space-y-2">
        <input
            placeholder="Username"
            type="text"
            bind:value={username}
            class="w-full input"
        />
        <input
            placeholder="Password"
            type="password"
            bind:value={password}
            class="w-full input"
        />
        <button class="button" disabled={loading} on:click={login}>
            {#if loading}
                <SpinLine size="40" color="#ffffff" unit="px" duration="5s" />
            {:else}
                Login
            {/if}
        </button>
    </form>
</div>
