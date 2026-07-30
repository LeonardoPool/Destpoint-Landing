<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { slide } from 'svelte/transition';
	import '$lib/styles/hero.css';
	import '$lib/styles/about.css';

	let showMore = $state(false);
</script>

<svelte:head>
	<title>Sobre Nosotros</title>
</svelte:head>

<Navbar currentPath="/about" />

<main class="about-page">
	<section class="about-hero">
		<h1>Sobre Nosotros</h1>
		<div class="about-content-wrapper">
			<p class="about-lead">
				En AZUWA Travel diseñamos, organizamos y gestionamos experiencias de viaje para personas, parejas, familias, grupos y empresas que buscan atención profesional, seguridad y acompañamiento en cada etapa de su experiencia.
			</p>

			<p class="about-lead">
				Combinamos asesoría personalizada con herramientas tecnológicas que facilitan la búsqueda y reservación de hoteles, vuelos, traslados, circuitos, excursiones y otros servicios turísticos en destinos nacionales e internacionales. Nuestro objetivo es comprender las necesidades, preferencias y presupuesto de cada cliente para presentar alternativas claras, confiables y adaptadas a cada tipo de viaje.
			</p>

			{#if showMore}
				<div transition:slide={{ duration: 400 }}>
					<p class="about-lead">
						Además de viajes vacacionales, contamos con servicios especializados para la planeación de bodas destino, viajes y celebraciones de quince años, lunas de miel, aniversarios y experiencias para grupos. Para el sector empresarial, desarrollamos viajes de incentivo, reuniones, convenciones y programas corporativos diseñados de acuerdo con los objetivos, characteristics y presupuesto de cada organización.
					</p>

					<p class="about-lead">
						En AZUWA Travel creemos que un viaje comienza mucho antes de llegar al destino. Por ello, acompañamos a nuestros clientes desde la planeación y selección de servicios hasta el seguimiento durante y después de su experiencia. Trabajamos con atención al detalle, transparencia y proveedores turísticos confiables para brindar tranquilidad y respaldo en cada reservación.
					</p>

					<p class="about-lead">
						Más que vender viajes, creamos experiencias significativas y construimos relaciones duraderas con quienes nos eligen. Ya sea para unas vacaciones familiares, una escapada en pareja, una celebración especial o un evento empresarial, nuestro compromiso es transformar cada idea en una experiencia bien organizada, memorable y segura.
					</p>
				</div>
			{/if}

			<div class="show-more-container">
				<button 
					class="btn-show-more" 
					class:expanded={showMore} 
					onclick={() => showMore = !showMore} 
					aria-expanded={showMore}
				>
					<span>{showMore ? 'Ver menos' : 'Ver más'}</span>
					<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
			</div>
		</div>
	</section>
</main>

<Footer />
