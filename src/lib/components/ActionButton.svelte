<script lang="ts">
    export let label: string;
    export let onClick: () => void = () => null;
    export let disable: boolean = false;
</script>

<div
    on:mousedown|preventDefault={!disable ? onClick : null}
    class="action-button"
>
    <h4 class="m-0">{label}</h4>
    <span class="icon h-10">
        <slot />
    </span>
</div>
