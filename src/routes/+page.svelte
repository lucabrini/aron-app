<script lang="ts">
    import ProgressIcon from "$lib/icons/ProgressIcon.svelte";
    import { currentUser, pb } from "$lib/pocketbase";
    import { onMount } from "svelte";
    import Loading from "$lib/components/Loading.svelte";

    let lessons: object & { duration: number }[] = [];
    let loading = false;

    onMount(async () => {
        loading = true;
        lessons = await pb.collection("lessons").getFullList();
        loading = false;
    });

    $: totalMinutes = lessons.reduce(
        (total: number, currentValue) => total + currentValue.duration,
        0
    );
</script>

{#if loading}
    <Loading />
{:else}
    <div class="prose flex flex-col space-y-4">
        <h2 class="mt-4">Ciao {$currentUser?.name}!</h2>
        <div class="bg-white rounded-lg shadow-lg p-4">
            <h3 class="m-0">Progresso</h3>
            <div class="flex flex-row space-x-4 items-center mt-2">
                <span class="icon h-12">
                    <ProgressIcon />
                </span>
                <p class="m-0">
                    Nell'ultima settimana hai insegnato per un totale di
                    <span class="font-bold">
                        {(totalMinutes / 60) >> 0}:{totalMinutes % 60} ore
                    </span> 🥳
                </p>
            </div>
        </div>
        <a class="button button-dark-pressed" href="/add-lesson"> Aggiungi lezione svolta </a>
    </div>
{/if}
