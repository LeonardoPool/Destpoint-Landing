<script lang="ts">
	import subtractImg from '$lib/images/Subtract.png';
	import '$lib/styles/hero.css';
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
