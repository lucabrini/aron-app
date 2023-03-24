<script lang="ts">
    import { getStudentInfo } from "$lib/pocketbase";
    import ActionButton from "$lib/components/ActionButton.svelte";
    import BackIcon from "$lib/icons/BackIcon.svelte";
    import Loading from "$lib/components/Loading.svelte";

    export let id: string;
    export let onClick: () => void;
</script>

{#await getStudentInfo(id)}
    <Loading />
{:then studentInfo}
    <!-- Qui ci metto il view profile di uno studente -->
    <h2 class="mt-4">{studentInfo.name}</h2>
    <div>
        <h3>Strumenti</h3>
        <div class="flex flex-col ">
            <!-- svelte-ignore empty-block -->
        </div>
        <h3>Lezioni</h3>
        <div class="flex flex-col ">
            <!-- svelte-ignore empty-block -->
        </div>
    </div>
    <div
        class="fixed bottom-[5.5rem] w-full p-2 -left-[1.5px]  prose flex flex-row justify-between"
    >
        <ActionButton label="Indietro" {onClick}>
            <BackIcon />
        </ActionButton>
    </div>
{/await}
