<script lang="ts">
    import { getStudentInfo, getStudentLessons } from "$lib/pocketbase";
    import ActionButton from "$lib/components/ActionButton.svelte";
    import BackIcon from "$lib/icons/BackIcon.svelte";
    import Loading from "$lib/components/Loading.svelte";
    import { onMount } from "svelte";

    export let id: string;
    export let onClick: () => void;

    let studentInfo: App.StudentDTO & App.ExpandInstrument;
    let studentLessons: App.LessonDTO[];
    let loading = true;

    onMount(async () => {
        studentInfo = await getStudentInfo(id);
        studentLessons = await getStudentLessons(id);
        loading = false;
    });
</script>

{#if loading}
    <Loading />
{:else}
    <!-- Qui ci metto il view profile di uno studente -->
    <h2 class="mt-4">{studentInfo.name}</h2>
    <div>
        <h3>Strumenti</h3>
        <div class="flex flex-col space-y-2 ">
            {#each studentInfo.expand.instrument as instrument}
                <div
                    class="bg-white p-4 rounded-lg gap-2 w-full flex flex-row shadow-md"
                >
                    <span>{instrument.emoticon}</span>
                    <span>{instrument.name}</span>
                </div>
            {/each}
        </div>
        <h3>Lezioni</h3>
        <div class="flex flex-col space-y-2 ">
            {#each studentLessons as lesson}
                <div
                    class="bg-white p-4 rounded-lg gap-2 w-full flex flex-row shadow-md justify-between"
                >
                    <span
                        >{new Date(lesson.date)
                            .toLocaleString()
                            .split(",")[0]}</span
                    >
                    <span>{lesson.duration} minuti</span>
                </div>
            {/each}
            <a
                class="button button-dark-pressed"
                href={"/lessons/create?student=" + id}
            >
                Aggiungi lezione svolta
            </a>
        </div>
    </div>
    <div
        class="fixed bottom-[5.5rem] w-full p-2 -left-[1.5px]  prose flex flex-row justify-between"
    >
        <ActionButton label="Indietro" {onClick}>
            <BackIcon />
        </ActionButton>
    </div>
{/if}
