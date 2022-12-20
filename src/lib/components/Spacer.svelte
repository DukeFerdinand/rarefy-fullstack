<script lang="ts">
	export let spacing: number;
	export let direction: 'horizontal' | 'vertical' | undefined;
</script>

<div
	style={direction === 'vertical' || !direction
		? `margin-top: ${spacing}px`
		: `margin-left: ${spacing}px`}
/>
