<script lang="ts">
    import { page } from "$app/stores";
    import StudentProfile from "$lib/components/StudentProfile.svelte";
    import StudentsList from "$lib/components/StudentsList.svelte";

    let studentId = $page.url.searchParams.get("student");
</script>

<div class="prose">
    {#if !studentId}
        <h2 class="mt-4">I tuoi allievi</h2>
        <StudentsList onClick={(id) => (studentId = id)} />
    {:else}
        <StudentProfile id={studentId} onClick={() => (studentId = null)} />
    {/if}
</div>
