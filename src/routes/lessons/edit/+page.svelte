<script lang="ts">
    import { page } from "$app/stores";
    import { addLesson, currentUser, getStudentInfo } from "$lib/pocketbase";
    import StudentsList from "$lib/components/StudentsList.svelte";
    import { SpinLine } from "svelte-loading-spinners";
    import ActionButton from "$lib/components/ActionButton.svelte";
    import BackIcon from "$lib/icons/BackIcon.svelte";
    import CheckIcon from "$lib/icons/CheckIcon.svelte";
    import Loading from "$lib/components/Loading.svelte";

    let studentId = $page.url.searchParams.get("student");

    let date: Date;
    let duration: number;

    let loading = false;

    async function saveLesson() {
        loading = true;
        const lessons = await addLesson({
            teacher: $currentUser!.id,
            student: studentId!,
            date: date.toString(),
            duration: duration,
        });
        if (!!lessons) window.location.pathname = "/lessons";
    }
    
</script>

<div class="prose h-full m-0">
    <h2 class="mt-4">Aggiungi lezione</h2>
    {#if !studentId}
        <h3 class="mt-4">Seleziona studente</h3>
        <StudentsList onClick={(id) => (studentId = id)} />
    {:else}
        {#await getStudentInfo(studentId)}
            <Loading />
        {:then info}
            <h3 class="mt-4">{info.name}</h3>
            <div class="bg-white p-2 rounded-xl shadow-xl h-1/4 ">
                <form on:submit|preventDefault class="flex flex-col space-y-4">
                    <div>
                        <label for="date-input">
                            <h4 class="m-1">Giorno lezione</h4>
                        </label>
                        <input
                            id="date-input"
                            type="date"
                            class="input input-date w-full"
                            bind:value={date}
                        />
                    </div>
                    <div>
                        <label for="duration-input">
                            <h4 class="m-0">
                                Durata lezione
                                <span class="font-normal">(in minuti)</span>
                            </h4>
                        </label>
                        <input
                            inputmode="numeric"
                            pattern="[0-9]*"
                            id="duration-input"
                            type="number"
                            class="input w-full"
                            bind:value={duration}
                        />
                    </div>
                </form>
            </div>
        {/await}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="fixed bottom-[5.5rem] w-full p-2 -left-[1.5px]  prose flex flex-row justify-between"
        >
            <ActionButton label="Indietro" onClick={() => (studentId = null)}>
                <BackIcon />
            </ActionButton>
            <ActionButton
                disable={loading}
                label="Salva"
                onClick={() => saveLesson()}
            >
                {#if !loading}
                    <CheckIcon />
                {:else}
                    <SpinLine
                        size="40"
                        color="#ffffff"
                        unit="px"
                        duration="5s"
                    />
                {/if}
            </ActionButton>
        </div>
    {/if}
</div>
