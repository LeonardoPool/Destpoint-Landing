<script lang="ts">
	import logoImg from '$lib/images/logo.png';

	let { currentPath = '/' } = $props<{ currentPath?: string }>();
</script>

<nav class="navbar">
	<a href="/" class="logo" aria-label="Destpoint inicio">
		<img src={logoImg} alt="Destpoint Logo" class="logo-img" />
	</a>

	<ul class="nav-links">
		<li><a href="/" class:active={currentPath === '/'}>Inicio</a></li>
		<li><a href="/about" class:active={currentPath === '/about'}>Sobre Nosotros</a></li>
		<li>
			<button class="nav-pkg-btn">
				Servicios
				<svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
					<path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</button>
		</li>
		<li><a href="/faq">FAQ</a></li>
		<li><a href="/community">Community</a></li>
	</ul>

	<div class="nav-actions">
		<button class="btn-login">Solicitar acceso</button>
		<button class="btn-signup">Agendar demo</button>
	</div>
</nav>
