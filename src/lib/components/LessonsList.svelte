<script lang="ts">
    import { pb } from "$lib/pocketbase";
    import { onMount } from "svelte";
    import Loading from "./Loading.svelte";

    export let studentId: string | undefined = undefined;
    let lessons: any[] = [];
    let loading = false;

    onMount(async () => {
        // The filter by teacher is applied at pocketbase side. WOW! :)
        loading = true;
        lessons = (
            await pb.collection("lessons").getFullList({
                expand: "student",
                sort: "date",
                ...(!!studentId ? { filter: `student="${studentId}"` } : {}),
            })
        ).reverse();
        loading = false;
    });
</script>

{#if loading}
    <Loading />
{:else}
    <div class="flex flex-col space-y-2">
        {#each lessons as lss}
            <div
                class="flex flex-row justify-start space-x-8 items-center w-full bg-white 
            shadow-xl rounded-xl h-[4.5rem] px-4"
            >
                <p>
                    {new Date(lss.date).toLocaleString().split(",")[0]}
                </p>
                <p>
                    {lss.duration} minuti
                </p>
                <p class="font-medium m-0">{lss.expand.student.name}</p>
            </div>
        {/each}
    </div>
{/if}
