<script lang="ts">
	import logoImg from '$lib/images/AzuwaTravel.jpeg';
</script>

<footer class="footer">
	<div class="footer-content">
		<!-- Left section -->
		<div class="footer-left">
			<div class="footer-logo">
				<!-- Logo mark -->
				<img src={logoImg} alt="Azuwa Travel Logo" class="footer-logo-img" />
				<span class="footer-logo-name">AzuwaTravel</span>
			</div>
			<p class="footer-desc">
				Wanderlust meets wander well – Experience seamless travel with our Servicios.
			</p>
		</div>

		<!-- Middle sections -->
		<div class="footer-links">
			<div class="footer-column">
				<h4 class="footer-heading">Empresa</h4>
				<ul>
					<li><a href="/">Sobre Nosotros</a></li>
					<li><a href="/">Blog</a></li>
					<li><a href="/">Clientes</a></li>
					<li><a href="/">Paquetes</a></li>
					<li><a href="/">Comunidad</a></li>
				</ul>
			</div>

			<div class="footer-column">
				<h4 class="footer-heading">Ayuda</h4>
				<ul>
					<li><a href="/">Atención al Cliente</a></li>
					<li><a href="/">Preguntas Frecuentes</a></li>
					<li><a href="/">Política de Devolución</a></li>
				</ul>
			</div>
		</div>

		<!-- Right section - Social -->
		<div class="footer-social">
			<h4 class="footer-heading">Siguenos</h4>
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
		<p class="footer-copyright">2026 AzuwaTravel. All right reserved. HANDCRAFTED</p>
		<div class="footer-legal">
			<a href="/">Privacy Policy</a>
			<a href="/">Terms of Service</a>
			<a href="/">Cookies Settings</a>
		</div>
	</div>
</footer>
