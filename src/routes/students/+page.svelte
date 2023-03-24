<script lang="ts">
    import { page } from "$app/stores";
    import { getStudentInfo } from "$lib/pocketbase";
    import StudentsList from "$lib/components/StudentsList.svelte";
    import ActionButton from "$lib/components/ActionButton.svelte";
    import BackIcon from "$lib/icons/BackIcon.svelte";
    import Loading from "$lib/components/Loading.svelte";

    let studentId = $page.url.searchParams.get("student");

    console.log(studentId);
</script>

<div class="prose">
    {#if !studentId}
        <h2 class="mt-4">I tuoi allievi</h2>
        <StudentsList onClick={(id) => (studentId = id)} />
    {:else}
        {#await getStudentInfo(studentId)}
            <Loading />
        {:then studentInfo}
            <!-- Qui ci metto il view profile di uno studente -->
            <h2 class="mt-4">{studentInfo.name}</h2>
            <div
                class="fixed bottom-[5.5rem] w-full p-2 -left-[1.5px]  prose flex flex-row justify-between"
            >
                <ActionButton
                    label="Indietro"
                    onClick={() => (studentId = null)}
                >
                    <BackIcon />
                </ActionButton>
            </div>
        {/await}
    {/if}
</div>
