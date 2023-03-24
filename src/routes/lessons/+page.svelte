<script lang="ts">
    import ActionButton from "$lib/components/ActionButton.svelte";
    import LessonsList from "$lib/components/LessonsList.svelte";
    import PlusIcon from "$lib/icons/PlusIcon.svelte";

    function redirectToAddLesson(){
        location.pathname = "/add-lesson"
    }

</script>

<div class="prose">
    <h2 class="mt-4">Le tue ultime lezioni</h2>
    <LessonsList />
    <div
        class="fixed bottom-[5.5rem] w-full p-2 -left-[1.5px] prose flex flex-row justify-end"
    >
        <ActionButton label="Aggiungi" onClick={() => redirectToAddLesson()}>
            <PlusIcon />
        </ActionButton>
    </div>
</div>
