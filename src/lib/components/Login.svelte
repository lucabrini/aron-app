<script lang="ts">
    import { currentUser, pb } from "$lib/pocketbase";

    let username: string;
    let password: string;

    async function login() {
        await pb.collection("teachers").authWithPassword(username, password);
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
        <button class="button" on:click={login}> Login </button>
    </form>
</div>
