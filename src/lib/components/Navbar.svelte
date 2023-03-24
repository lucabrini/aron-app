<script lang="ts">
    import HomeIcon from "$lib/icons/HomeIcon.svelte";
    import LessonsIcon from "$lib/icons/LessonsIcon.svelte";
    import StudentsIcons from "$lib/icons/StudentsIcons.svelte";

    import { page } from "$app/stores";
    $: currentPath = $page.url.pathname;

    function redirectTo(path: string) {
        location.pathname = path;
    }

    let config = [
        {
            path: "/",
            icon: HomeIcon,
            label: "Home",
        },
        {
            path: "/lessons",
            icon: LessonsIcon,
            label: "Lezioni",
        },
        {
            path: "/students",
            icon: StudentsIcons,
            label: "Allievi",
        },
    ];
</script>

<div class="navbar">
    {#each config as navConfig}
        <div
            on:mousedown={() => redirectTo(navConfig.path)}
            class={`navbar-item ${
                navConfig.path === currentPath ? "active" : ""
            }`}
        >
            <svelte:component this={navConfig.icon} />
            <span>{navConfig.label}</span>
        </div>
    {/each}
</div>

<style lang="postcss">
    .navbar {
        @apply w-full h-20 bg-white absolute bottom-0 left-0 rounded-t-2xl 
        shadow-2xl flex flex-row justify-around items-center text-zinc-800;
    }

    .navbar-item {
        @apply flex flex-col items-center gap-1 py-2 px-4 rounded-lg;
    }

    .active {
        @apply bg-zinc-800 text-white shadow;
        transition: all;
        transition-duration: 200;
    }
</style>
