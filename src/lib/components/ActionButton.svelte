<script lang="ts">
    export let label: string;
    export let onClick: () => void = () => null;
</script>

<div on:mousedown|preventDefault={onClick} class="action-button">
    <h4 class="m-0">{label}</h4>
    <span class="icon h-10">
        <slot />
    </span>
</div>

<style lang="postcss">
    .action-button {
        @apply bg-white w-1/3 p-2 shadow-xl rounded-lg flex flex-row 
        justify-between items-center space-x-2;
    }
</style>
