<script lang="ts">
    import DeleteIcon from "$lib/icons/DeleteIcon.svelte";
    import { pb, removeLesson } from "$lib/pocketbase";
    import { onMount } from "svelte";
    import Loading from "./Loading.svelte";

    export let studentId: string | undefined = undefined;
    let lessons: (App.LessonDTO & App.ExpandStudent)[] = [];

    let loading = false;

    onMount(async () => {
        // The filter by teacher is applied at pocketbase side. WOW! :)
        loading = true;
        lessons = (
            await pb
                .collection("lessons")
                .getFullList<App.LessonDTO & App.ExpandStudent>({
                    expand: "student",
                    sort: "date",
                    ...(!!studentId
                        ? { filter: `student="${studentId}"` }
                        : {}),
                })
        ).reverse();
        console.log(lessons);
        loading = false;
    });

    async function deleteLesson(id : App.Id) {
        await removeLesson(id);
        lessons = lessons.filter((v) => v.id != id);
    }

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
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <span
                    class="button-ligth-pressed p-2 rounded-md"
                    on:click={() => deleteLesson(lss.id)}
                >
                    <DeleteIcon />
                </span>
            </div>
        {/each}
    </div>
{/if}
