<script lang="ts">
	export let spacing: number | string | undefined = 0;
	export let direction: 'horizontal' | 'vertical' | undefined = 'vertical';
	export let auto: boolean | undefined = false;

	let style: string;

	if (auto) {
		style = direction === 'vertical'
		? 'margin-top: auto;'
		: 'margin-left: auto;';
	} else {
		style = direction === 'vertical'
		? `margin-top: ${spacing}px;`
		: `margin-left: ${spacing}px;`;
	}
</script>

<div style={style}></div>
