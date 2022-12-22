<script lang="ts">
	export let spacing: number | string;
	export let direction: 'horizontal' | 'vertical' | undefined = 'vertical';
</script>

<div
	style={direction === 'vertical' || !direction
		? `margin-top: ${spacing}px`
		: `margin-left: ${spacing}px`}
/>
