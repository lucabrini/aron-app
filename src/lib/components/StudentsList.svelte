<script lang="ts">
    import { pb } from "$lib/pocketbase";
    import { onMount } from "svelte";
    import Loading from "./Loading.svelte";
    let students: any[] = [];

    let loading = false;

    onMount(async () => {
        loading = true;
        // The filter by teacher is applied at pocketbase side. WOW! :)
        const results = await pb.collection("students").getList(1, 100, {
            expand: "instrument",
        });
        students = results.items;
        loading = false;
    });

    export let onClick: (studentId: string) => void = () => null;
</script>

{#if loading}
    <Loading />
{:else}
    <div class="flex flex-col space-y-2">
        {#each students as std}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="flex flex-row justify-between items-center w-full bg-white 
            shadow-xl rounded-xl h-[4.5rem] px-4"
                on:click|preventDefault={() => onClick(std.id)}
            >
                <p class="font-medium m-0">{std.name}</p>
                <p class="text-lg">{std.expand.instrument[0].emoticon}</p>
            </div>
        {/each}
    </div>
{/if}
