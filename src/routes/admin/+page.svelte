<script lang="ts">
	import Login from './components/Login.svelte';
	import Dashboard from './components/Dashboard.svelte';

	let isLoggedIn = $state(false);
</script>

<svelte:head>
	<title>Panel de Administración — Destpoint</title>
	<meta name="description" content="Portal de administración de Destpoint Operadora Mayorista para gestionar promociones y artículos del blog." />
</svelte:head>

{#if !isLoggedIn}
	<Login onSuccess={() => isLoggedIn = true} />
{:else}
	<Dashboard onLogout={() => isLoggedIn = false} />
{/if}
