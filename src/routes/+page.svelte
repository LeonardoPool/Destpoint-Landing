<script lang="ts">
	import heroImage from '$lib/images/heroimage.png';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import travelokaLogo from '$lib/images/empresas/Traveloka logo.svg';
	import airbnbLogo from '$lib/images/empresas/airbnb logo.svg';
	import expediaLogo from '$lib/images/empresas/Expedia logo.svg';
	import skyscannerLogo from '$lib/images/empresas/Skyscanner logo.svg';
	import americanAirlinesLogo from '$lib/images/empresas/american-airlines logo.svg';
	import '$lib/styles/hero.css';
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import promoCozumel from '$lib/images/promos/PromoCozumel.jpeg';
	import promoSecrets from '$lib/images/promos/PromoSecrets.jpeg';
	import promoReef28 from '$lib/images/promos/Reef28.jpeg';
	import { getPromotions, getSupportImages } from '$lib/promoService';

	const defaultPromos = [
		{
			id: 'default-1',
			title: 'Cozumel Increíble',
			subtitle: 'Disfruta del paraíso caribeño en Cozumel con tarifas especiales de hospedaje, snorkel guiado incluido y desayunos gratis para toda la familia.',
			image: promoCozumel
		},
		{
			id: 'default-2',
			title: 'Secrets Resorts & Spas',
			subtitle: 'Escapada de lujo todo incluido solo para adultos. Obtén hasta un 40% de descuento, cenas gourmet ilimitadas y amenidades VIP exclusivas.',
			image: promoSecrets
		},
		{
			id: 'default-3',
			title: 'The Reef 28 - Playa del Carmen',
			subtitle: 'Experiencia cosmopolita All-Suites en el corazón de Playa del Carmen. Tarifas de promoción especial con barra libre premium y acceso a club de playa.',
			image: promoReef28
		}
	];

	let promotions = $state<Array<{ id?: string; title: string; subtitle: string; image: string }>>(defaultPromos);
	let currentPromoIndex = $state(0);
	let isHovered = $state(false);
	let lightboxImage = $state<string | null>(null);
	let lightboxTitle = $state('');
	let lightboxSubtitle = $state('');

	onMount(() => {
		const loadPromotions = async () => {
			try {
				const dbPromos = await getPromotions();
				const dbSupport = await getSupportImages();
				
				const today = new Date();
				
				// Filter promotions: only active ones (expiration date is today or future)
				const activePromos = dbPromos.filter(p => new Date(p.expirationDate) >= today);
				
				// Filter support images: only active ones
				const activeSupport = dbSupport.filter(s => new Date(s.expirationDate) >= today);
				
				// Map to match the HTML bindings: title, subtitle, image
				const mappedPromos = activePromos.map(p => ({
					id: p.id,
					title: p.title,
					subtitle: p.description,
					image: p.imageUrl
				}));

				const mappedSupport = activeSupport.map(s => ({
					id: s.id,
					title: s.title,
					subtitle: s.description,
					image: s.imageUrl
				}));

				let combinedList = [...mappedPromos];

				// Fill with support images if under 3
				if (combinedList.length < 3) {
					for (const support of mappedSupport) {
						if (combinedList.length >= 3) break;
						if (!combinedList.some(item => item.id === support.id)) {
							combinedList.push(support);
						}
					}
				}

				// Fill with default fallbacks if still under 3
				if (combinedList.length < 3) {
					for (const fallback of defaultPromos) {
						if (combinedList.length >= 3) break;
						combinedList.push({
							id: fallback.id,
							title: fallback.title,
							subtitle: fallback.subtitle,
							image: fallback.image
						});
					}
				}

				promotions = combinedList;
			} catch (error) {
				console.error('Error loading promotions from Firebase:', error);
			}
		};

		loadPromotions();

		const interval = setInterval(() => {
			if (!isHovered && lightboxImage === null) {
				currentPromoIndex = (currentPromoIndex + 1) % promotions.length;
			}
		}, 5000);

		return () => {
			clearInterval(interval);
		};
	});

	const features = [
		{
			id: 1,
			title: 'Producto multidestino sólido',
			desc: 'We always prioritize our customer comfort and satisfaction. That\'s why we only accept the best hotel and destination'
		},
		{
			id: 2,
			title: 'Respaldo operativo confiable',
			desc: 'Although the price tends to be cheaper but it will not affect the quality of service'
		},
		{
			id: 3,
			title: 'Relaciones estratégicas sostenibles',
			desc: 'Don\'t worry if suddenly you have problem and want to reschedule or refund, you can get fully.'
		}
	];

	const resort = {
		name: 'Heaven Resort',
		rating: 4.8,
		price: 450,
		guide: 'Jake Anderson',
		guideTitle: 'Best Tour Guide'
	};
</script>

<svelte:head>
	<title>Destpoint — Operadora Mayorista</title>
</svelte:head>

<!-- ─── Navbar ──────────────────────────────────────────────── -->
<Navbar currentPath="/" />

<!-- ─── Hero ────────────────────────────────────────────────── -->
<section class="hero">

	<!-- Left column -->
	<div class="hero-left">
		<h1 class="hero-title">
			El mundo, a tu manera.
		</h1>
		<p class="hero-desc">
AZUWA Travel es una agencia de viajes especializada en experiencias nacionales e internacionales para parejas, familias, grupos y empresas. Organizamos vacaciones, bodas destino, quince años, lunas de miel, incentivos y convenciones, combinando atención personalizada, tecnología, seguridad y acompañamiento profesional antes, durante y después de cada viaje.
		</p>

		<div class="follow-us">
		</div>
	</div>

	<!-- Right column -->
	<div class="hero-right">

		<!-- Main hero image -->
		<img src={heroImage} alt="Destpoint travel destination" class="hero-img" />



		<!-- Scroll-down circular badge -->
		<div class="scroll-badge">
			<!-- Rotating circular text -->
			<svg
				class="scroll-ring"
				viewBox="0 0 100 100"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					<path
						id="textCircle"
						d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
					/>
				</defs>
				<text
					font-size="8.2"
					fill="#2e2e2e"
					letter-spacing="2.3"
					font-family="'Circular Std','DM Sans',sans-serif"
				>
					<textPath href="#textCircle">scroll.down · scroll.down · </textPath>
				</text>
			</svg>
			<!-- Animated mouse icon in the centre -->
			<div class="mouse-wrap">
				<div class="mouse-body">
					<div class="mouse-dot"></div>
				</div>
			</div>
		</div>

	</section>

<!-- ─── Nuestras Promociones ───────────────────────────── -->
<section class="promotions-section">
	<h2 class="section-main-title">Nuestras Promociones</h2>

	<!-- Active Promotion Info (Above the stack) -->
	<div class="active-promo-info">
		<span class="promo-badge">OFERTA EXCLUSIVA</span>
		<h3 class="promo-title">{promotions[currentPromoIndex].title}</h3>
		<p class="promo-desc">{promotions[currentPromoIndex].subtitle}</p>
	</div>

	<!-- 3D Card Stack Container -->
	<div 
		class="promo-stack-container"
		onmouseenter={() => isHovered = true}
		onmouseleave={() => isHovered = false}
	>
		<!-- Left/Right navigation buttons -->
		<button 
			class="stack-nav-btn prev"
			onclick={() => currentPromoIndex = (currentPromoIndex - 1 + promotions.length) % promotions.length}
			aria-label="Anterior"
		>
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
				<polyline points="15 18 9 12 15 6" />
			</svg>
		</button>

		<div class="cards-stack">
			{#each promotions as promo, index}
				<div 
					class="stack-card-wrapper"
					class:active={index === currentPromoIndex}
					class:left={index === (currentPromoIndex - 1 + promotions.length) % promotions.length}
					class:right={index === (currentPromoIndex + 1) % promotions.length}
					onclick={() => {
						if (index !== currentPromoIndex) {
							currentPromoIndex = index;
						}
					}}
				>
					<div class="stack-card">
						<img src={promo.image} alt={promo.title} class="stack-card-img" />
						
						<div class="stack-card-overlay">
							<button 
								class="zoom-details-btn"
								onclick={(e) => {
									e.stopPropagation();
									lightboxImage = promo.image;
									lightboxTitle = promo.title;
									lightboxSubtitle = promo.subtitle;
								}}
							>
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<circle cx="11" cy="11" r="8"></circle>
									<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
									<line x1="11" y1="8" x2="11" y2="14"></line>
									<line x1="8" y1="11" x2="14" y2="11"></line>
								</svg>
								Ver más detalles
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<button 
			class="stack-nav-btn next"
			onclick={() => currentPromoIndex = (currentPromoIndex + 1) % promotions.length}
			aria-label="Siguiente"
		>
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
				<polyline points="9 18 15 12 9 6" />
			</svg>
		</button>
	</div>

	<!-- Dots Indicators -->
	<div class="stack-dots">
		{#each promotions as _, index}
			<button 
				class="stack-dot"
				class:active={currentPromoIndex === index}
				onclick={() => currentPromoIndex = index}
				aria-label="Ir a promo {index + 1}"
			></button>
		{/each}
	</div>
</section>

<!-- Lightbox Modal -->
{#if lightboxImage !== null}
	<div 
		class="lightbox-backdrop"
		onclick={() => lightboxImage = null}
		role="dialog"
		aria-modal="true"
		transition:fade={{ duration: 300 }}
	>
		<div class="lightbox-content-image-only" onclick={(e) => e.stopPropagation()} transition:scale={{ duration: 300, start: 0.95 }}>
			<button class="lightbox-close-btn" onclick={() => lightboxImage = null} aria-label="Cerrar modal">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</button>

			<img src={lightboxImage} alt="Detalle de promoción" class="lightbox-image-only" />
		</div>
	</div>
{/if}

<!-- ─── Travel Partners ───────────────────────────────────── -->
<section class="partners" aria-label="Empresas aliadas">
	<p class="partners-label">Our Travel Partner</p>
	<div class="partners-logos">
		<img src={travelokaLogo} alt="Traveloka" class="partner-logo partner-logo--traveloka" />
		<img src={airbnbLogo} alt="Airbnb" class="partner-logo partner-logo--airbnb" />
		<img src={expediaLogo} alt="Expedia" class="partner-logo partner-logo--expedia" />
		<img src={skyscannerLogo} alt="Skyscanner" class="partner-logo partner-logo--skyscanner" />
		<img src={americanAirlinesLogo} alt="American Airlines" class="partner-logo partner-logo--american" />
	</div>
</section>



<!-- ─── Why Choose Us ────────────────────────────────────── -->
<section class="why-us">
	<div class="why-us-container">
		<!-- Left column -->
		<div class="why-us-left">
			<h2 class="why-us-title">Convertimos destinos en producto vendible</h2>
			<p class="why-us-desc">
				Integramos hotelería, transporte y experiencias para crear productos turísticos estructurados, listos para comercializarse de forma eficiente por agencias de viajes.
			</p>

			<div class="features-list">
				{#each features as feature (feature.id)}
					<div class="feature-item">
						<div class="feature-number">{feature.id}</div>
						<div>
							<h3 class="feature-title">{feature.title}</h3>
							<p class="feature-desc">{feature.desc}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Right column -->
		<div class="why-us-right">
			<!-- Customers badge -->
			<div class="customers-badge">
				<div class="customer-avatars">
					<div class="avatar avatar-1"></div>
					<div class="avatar avatar-2"></div>
					<div class="avatar avatar-3"></div>
				</div>
				<div>
					<p class="customers-count">10K+</p>
					<p class="customers-label">Alianzas comerciales</p>
				</div>
			</div>

			<!-- Image grid -->
			<div class="image-grid">
				<div class="img-large">
					<div class="img-placeholder img-placeholder--beach"></div>
				</div>
				<div class="img-small-col">
					<div class="img-placeholder img-placeholder--eiffel"></div>
					<div class="img-placeholder img-placeholder--paris"></div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ─── Explore Section ──────────────────────────────────── -->
<section class="explore">
	<div class="explore-container">
		<!-- Left column -->
		<div class="explore-left">
			<div class="explore-image-wrapper">
				<div class="explore-image-placeholder"></div>
				
				<!-- Resort card overlay -->
				<div class="resort-card">
					<div class="resort-thumb"></div>
					<div class="resort-info">
						<h3 class="resort-name">{resort.name}</h3>
						<div class="resort-meta">
							<div class="resort-rating">
								<svg class="star-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
									<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
								</svg>
								<span>({resort.rating})</span>
							</div>
							<p class="resort-price">Starts from <span>${resort.price}</span></p>
						</div>
					</div>
				</div>

				<!-- Guide badge overlay -->
				<div class="guide-badge">
					<div class="guide-avatar"></div>
					<div>
						<p class="guide-name">{resort.guide}</p>
						<p class="guide-title">{resort.guideTitle}</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Right column -->
		<div class="explore-right">
			<h2 class="explore-title">Únete a la red de agencias Destpoint</h2>
			<p class="explore-desc">
				Accede a producto estructurado, multidestino y con respaldo real para hacer crecer tu negocio.
			</p>
			<button class="btn-explore">Explore more</button>
		</div>
	</div>
</section>

<!-- ─── Footer ──────────────────────────────────────────── -->
<Footer />
