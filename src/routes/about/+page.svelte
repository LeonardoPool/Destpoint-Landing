<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import '$lib/styles/hero.css';
	import '$lib/styles/about.css';

	const pillars = [
		{
			title: 'Especialización regional',
			description: 'Diseñamos producto multidestino en México y Centroamérica con inventario curado y trazabilidad operativa.'
		},
		{
			title: 'Operación confiable',
			description: 'Coordinación real de proveedores, disponibilidad confirmada y acompañamiento antes, durante y después del viaje.'
		},
		{
			title: 'Modelo B2B',
			description: 'Impulsamos agencias de viajes con herramientas comerciales, respuesta ágil y soporte experto para vender mejor.'
		}
	];
</script>

<svelte:head>
	<title>Sobre Nosotros — Destpoint</title>
</svelte:head>

<Navbar currentPath="/about" />

<main class="about-page">
	<section class="about-hero">
		<h1>Sobre Nosotros</h1>
		<p class="about-lead">
        Destpoint es una operadora mayorista mexicana especializada en el diseño, integración y comercialización de productos turísticos multidestino, con base estratégica en el Mundo Maya: sureste de México, Guatemala, Belice, Honduras y El Salvador.
		</p>
	</section>

	<section class="about-grid" aria-label="Pilares Destpoint">
		{#each pillars as pillar}
			<article class="about-card">
				<h2>{pillar.title}</h2>
				<p>{pillar.description}</p>
			</article>
		{/each}
	</section>

	<section class="about-cta">
		<h2>Tu agencia vende. Nosotros operamos.</h2>
		<p>
			Construimos experiencias memorables con estructura sólida, para que puedas enfocarte en crecer tu cartera de clientes.
		</p>
		<div class="about-cta-actions">
			<a href="/" class="about-btn about-btn--primary">Volver al inicio</a>
			<a href="/community" class="about-btn about-btn--ghost">Conocer comunidad</a>
		</div>
	</section>
</main>
