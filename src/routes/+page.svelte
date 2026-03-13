<script lang="ts">
	import subtractImg from '$lib/images/Subtract.png';
	import travelokaLogo from '$lib/images/empresas/Traveloka logo.svg';
	import airbnbLogo from '$lib/images/empresas/airbnb logo.svg';
	import expediaLogo from '$lib/images/empresas/Expedia logo.svg';
	import skyscannerLogo from '$lib/images/empresas/Skyscanner logo.svg';
	import americanAirlinesLogo from '$lib/images/empresas/american-airlines logo.svg';
	import '$lib/styles/hero.css';

	let currentSlide = 0;

	const destinations = [
		{
			id: 1,
			name: 'Venice',
			country: 'Italy',
			image: 'linear-gradient(135deg, #ff6b6b 0%, #ffe66d 100%)',
			rating: 4.5,
			price: 900
		},
		{
			id: 2,
			name: 'Bali',
			country: 'Indonesia',
			image: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
			rating: 4.5,
			price: 480
		},
		{
			id: 3,
			name: 'Bangkok',
			country: 'Thailand',
			image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
			rating: 4.5,
			price: 440
		},
		{
			id: 4,
			name: 'Santorini',
			country: 'Greek',
			image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
			rating: 4.5,
			price: 900
		}
	];

	function nextSlide() {
		currentSlide = (currentSlide + 1) % destinations.length;
	}

	function prevSlide() {
		currentSlide = (currentSlide - 1 + destinations.length) % destinations.length;
	}

	const features = [
		{
			id: 1,
			title: 'Best Choice',
			desc: 'We always prioritize our customer comfort and satisfaction. That\'s why we only accept the best hotel and destination'
		},
		{
			id: 2,
			title: 'Competitive Prices',
			desc: 'Although the price tends to be cheaper but it will not affect the quality of service'
		},
		{
			id: 3,
			title: 'Refund and Reschedule',
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
<nav class="navbar">
	<a href="/" class="logo">
		<!-- Logo mark: rounded square with "D" + "ESTPOINT" → reads DESTPOINT -->
		<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="0.75" y="0.75" width="24.5" height="24.5" rx="4.25" stroke="#111" stroke-width="1.5" />
			<text x="13" y="18" text-anchor="middle" font-size="13" font-weight="700" fill="#111" font-family="sans-serif">D</text>
		</svg>
		<span class="logo-name">ESTPOINT</span>
	</a>

	<ul class="nav-links">
		<li><a href="/" class="active">Inicio</a></li>
		<li><a href="/about">Sobre Nosotros</a></li>
		<li>
			<button class="nav-pkg-btn">
				Packages
				<!-- Chevron down -->
				<svg width="11" height="11" viewBox="0 0 12 12" fill="none">
					<path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</button>
		</li>
		<li><a href="/faq">FAQ</a></li>
		<li><a href="/community">Community</a></li>
	</ul>

	<div class="nav-actions">
		<button class="btn-login">Inicia Sesión</button>
		<button class="btn-signup">Regístrate</button>
	</div>
</nav>

<!-- ─── Hero ────────────────────────────────────────────────── -->
<section class="hero">

	<!-- Left column -->
	<div class="hero-left">
		<h1 class="hero-title">
			Operadora<br />Mayorista
		</h1>
		<p class="hero-desc">
			Your journey begins here with our curated travel experiences.<br />
			Discover new horizons, create lasting memories, and explore the<br />
			world with our expertly crafted itineraries.
		</p>

		<div class="follow-us">
			<span class="follow-label">Síguenos en nuestras redes</span>
			<div class="socials">

				<!-- Facebook -->
				<button class="social-btn" aria-label="Facebook">
					<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
					</svg>
				</button>

				<!-- Instagram -->
				<button class="social-btn" aria-label="Instagram">
					<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
						<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
						<line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
					</svg>
				</button>

				<!-- Twitter / X -->
				<button class="social-btn" aria-label="Twitter">
					<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
					</svg>
				</button>

			</div>
		</div>
	</div>

	<!-- Right column -->
	<div class="hero-right">

		<!-- Main hero image (Subtract.png) -->
		<img src={subtractImg} alt="Destpoint travel destination" class="hero-img" />

		<!-- Destination card overlay -->
		<div class="dest-card">
			<!-- Thumbnail placeholder: replace with actual image when available -->
			<div class="card-thumb"></div>
			<div>
				<p class="card-name">Coco De Heaven</p>
				<div class="card-rating">
					<!-- Star icon -->
					<svg class="star-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
						<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
					</svg>
					(4.5)
				</div>
				<p class="card-from">Starts from <span class="card-price">$400</span></p>
			</div>
		</div>

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

	</div>
</section>

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

<!-- ─── Popular Destinations ──────────────────────────────── -->
<section class="destinations">
	<div class="destinations-header">
		<div>
			<h2 class="destinations-title">Popular Destinations</h2>
			<p class="destinations-desc">See our popular destinations that our client choose</p>
		</div>
		<div class="destinations-nav">
			<button class="nav-btn nav-btn--prev" on:click={prevSlide} aria-label="Previous destination">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<polyline points="15 18 9 12 15 6" />
				</svg>
			</button>
			<button class="nav-btn nav-btn--next" on:click={nextSlide} aria-label="Next destination">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<polyline points="9 18 15 12 9 6" />
				</svg>
			</button>
		</div>
	</div>

	<div class="carousel-wrapper">
		<div class="carousel-container">
			{#each destinations as dest, index (dest.id)}
				<div class="carousel-slide" style="--order: {index}; --current: {currentSlide};" class:active={index === currentSlide}>
					<div class="card">
						<div class="card-image" style="background: {dest.image}"></div>
						<div class="card-content">
							<h3 class="card-title">{dest.name}, {dest.country}</h3>
							<div class="card-rating">
								<svg class="star-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
									<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
								</svg>
								<span>({dest.rating})</span>
							</div>
							<p class="card-price">Starts from <span class="price-value">${dest.price}</span></p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ─── Why Choose Us ────────────────────────────────────── -->
<section class="why-us">
	<div class="why-us-container">
		<!-- Left column -->
		<div class="why-us-left">
			<h2 class="why-us-title">Embark On Unforgettable Journeys With Our Premium Travel Services</h2>
			<p class="why-us-desc">
				Picture-perfect getaways are just a click away. Find your slice of paradise, whether it's a tropical island, a charming city, or an enchanting countryside retreat.
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
					<p class="customers-label">Satisfied Customer</p>
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
			<h2 class="explore-title">With Our Service We Will Explore Something Different</h2>
			<p class="explore-desc">
				Uncover hidden gems and immerse yourself in vibrant cultures. From breathtaking landscapes to awe-inspiring destinations, let us guide you to the most extraordinary places on the planet.
			</p>
			<button class="btn-explore">Explore more</button>
		</div>
	</div>
</section>

<!-- ─── Footer ──────────────────────────────────────────── -->
<footer class="footer">
	<div class="footer-content">
		<!-- Left section -->
		<div class="footer-left">
			<div class="footer-logo">
				<!-- Logo mark -->
				<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect x="0.75" y="0.75" width="24.5" height="24.5" rx="4.25" stroke="#1a9fd8" stroke-width="1.5" />
					<text x="13" y="18" text-anchor="middle" font-size="13" font-weight="700" fill="#1a9fd8" font-family="sans-serif">D</text>
				</svg>
				<span class="footer-logo-name">Destpoint</span>
			</div>
			<p class="footer-desc">
				Wanderlust meets wander well – Experience seamless travel with our services.
			</p>
		</div>

		<!-- Middle sections -->
		<div class="footer-links">
			<div class="footer-column">
				<h4 class="footer-heading">Company</h4>
				<ul>
					<li><a href="/">About Us</a></li>
					<li><a href="/">Blog</a></li>
					<li><a href="/">Customers</a></li>
					<li><a href="/">Packages</a></li>
					<li><a href="/">Community</a></li>
				</ul>
			</div>

			<div class="footer-column">
				<h4 class="footer-heading">Help</h4>
				<ul>
					<li><a href="/">Support</a></li>
					<li><a href="/">FAQs</a></li>
					<li><a href="/">Refund Policy</a></li>
				</ul>
			</div>
		</div>

		<!-- Right section - Social -->
		<div class="footer-social">
			<h4 class="footer-heading">Follow Us</h4>
			<div class="social-links">
				<a href="/" class="social-link" aria-label="Facebook">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
					</svg>
					Facebook
				</a>
				<a href="/" class="social-link" aria-label="Instagram">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
						<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
						<line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
					</svg>
					Instagram
				</a>
				<a href="/" class="social-link" aria-label="Twitter">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
					</svg>
					Twitter
				</a>
			</div>
		</div>
	</div>

	<!-- Divider -->
	<div class="footer-divider"></div>

	<!-- Bottom section -->
	<div class="footer-bottom">
		<p class="footer-copyright">2026 Destpoint. All right reserved. HANDCRAFTED</p>
		<div class="footer-legal">
			<a href="/">Privacy Policy</a>
			<a href="/">Terms of Service</a>
			<a href="/">Cookies Settings</a>
		</div>
	</div>
</footer>
