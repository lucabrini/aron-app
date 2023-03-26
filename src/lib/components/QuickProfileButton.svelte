<script>
    import LogoutIcon from "$lib/icons/LogoutIcon.svelte";
    import UserIcon from "$lib/icons/UserIcon.svelte";
    import { pb } from "$lib/pocketbase";

    let showDropdown = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class="icon h-10" on:click={() => (showDropdown = !showDropdown)}>
    <UserIcon />
</span>

{#if showDropdown}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
        class="top-0 left-0 fixed h-screen w-screen bg-black bg-opacity-40 z-20"
        on:click={() => (showDropdown = !showDropdown)}
    >
        <div
            on:click|stopPropagation
            class="p-2 fixed rounded-lg shadow-md bg-white h-32 w-52 top-20 right-2"
        >
            <button
                on:click={() => pb.authStore.clear()}
                class="w-full p-2 rounded-lg button-ligth-pressed font-medium text-lg flex flex-row gap-2 items-center"
            >
                <LogoutIcon /> Esci
            </button>
        </div>
    </div>
{/if}
