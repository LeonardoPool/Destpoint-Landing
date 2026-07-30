<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '$lib/styles/hero.css';

	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let service = $state('');
	let message = $state('');
	let statusMessage = $state('');
	let isSubmitting = $state(false);

	const servicesList = [
		'Hotelería',
		'Tours',
		'Traslados',
		'Avión',
		'Parques temáticos',
		'Cruceros',
		'Paquetes europeos'
	];

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		if (!name || !email || !phone || !service || !message) {
			statusMessage = 'Por favor, completa todos los campos.';
			return;
		}

		isSubmitting = true;
		statusMessage = '';

		try {
			await new Promise((resolve) => setTimeout(resolve, 1500));
			statusMessage = '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.';
			name = '';
			email = '';
			phone = '';
			service = '';
			message = '';
		} catch (error) {
			statusMessage = 'Ocurrió un error al enviar el formulario. Inténtalo de nuevo.';
		} finally {
			isSubmitting = false;
		}
	};
</script>

<svelte:head>
	<title>Contacto — Azuwa Travel</title>
</svelte:head>

<Navbar currentPath="/contact" />

<main class="contact-page">
	<section class="contact-hero">
		<span class="contact-kicker">¿Tienes planes de viaje?</span>
		<h1>Ponte en contacto con nosotros</h1>
		<p class="contact-subtitle">
			Cuéntanos tus ideas y diseñaremos una experiencia de viaje a tu medida con el mejor servicio.
		</p>
	</section>

	<div class="contact-container">
		<!-- Left: Form -->
		<div class="contact-form-card">
			<form onsubmit={handleSubmit}>
				<div class="form-group">
					<label for="name">Nombre completo</label>
					<input 
						type="text" 
						id="name" 
						placeholder="Escribe tu nombre" 
						bind:value={name} 
						required 
						disabled={isSubmitting}
					/>
				</div>

				<div class="form-row">
					<div class="form-group">
						<label for="email">Correo electrónico</label>
						<input 
							type="email" 
							id="email" 
							placeholder="ejemplo@correo.com" 
							bind:value={email} 
							required 
							disabled={isSubmitting}
						/>
					</div>
					<div class="form-group">
						<label for="phone">Número telefónico</label>
						<input 
							type="tel" 
							id="phone" 
							placeholder="+52 (999) 0000000" 
							bind:value={phone} 
							required 
							disabled={isSubmitting}
						/>
					</div>
				</div>

				<div class="form-group">
					<label for="service">Servicio de interés</label>
					<select id="service" bind:value={service} required disabled={isSubmitting}>
						<option value="" disabled selected>Selecciona un servicio</option>
						{#each servicesList as item}
							<option value={item}>{item}</option>
						{/each}
					</select>
				</div>

				<div class="form-group">
					<label for="message">Solicitud / Detalles del viaje</label>
					<textarea 
						id="message" 
						rows="5" 
						placeholder="Cuéntanos a dónde quieres viajar, fechas tentativas, número de personas, etc..." 
						bind:value={message} 
						required 
						disabled={isSubmitting}
					></textarea>
				</div>

				{#if statusMessage}
					<p class="status-msg" class:success={statusMessage.includes('éxito')}>{statusMessage}</p>
				{/if}

				<button type="submit" class="btn-submit" disabled={isSubmitting}>
					{#if isSubmitting}
						<div class="spinner-small"></div>
						Enviando...
					{:else}
						Enviar mensaje
					{/if}
				</button>
			</form>
		</div>

		<!-- Right: Contact info & details -->
		<div class="contact-info-card">
			<div>
				<h2 class="info-card-title">Información de contacto</h2>
				<p class="info-card-desc">
					Nuestro equipo te acompañará antes, durante y después de cada viaje para garantizar tu tranquilidad.
				</p>

				<div class="contact-details-list">
					<div class="detail-item">
						<div class="detail-icon">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
								<polyline points="22,6 12,13 2,6"></polyline>
							</svg>
						</div>
						<div>
							<h3 class="detail-label">Correo de Azuwa</h3>
							<a href="mailto:hola@azuwatravel.com" class="detail-link">hola@azuwatravel.com</a>
						</div>
					</div>

					<div class="detail-item">
						<div class="detail-icon">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
							</svg>
						</div>
						<div>
							<h3 class="detail-label">Número telefónico</h3>
							<a href="tel:+529999911900" class="detail-link">+52 (999) 9911900</a>
						</div>
					</div>
				</div>
			</div>

			<div class="info-card-footer">
				<p class="office-schedule">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
				<p class="office-schedule">Sábados: 9:00 AM - 2:00 PM</p>
			</div>
		</div>
	</div>
</main>

<Footer />

<style>
.contact-page {
	padding: 4rem 5rem 6rem;
	color: #0c0c0c;
	background-color: #fafafa;
}

@media (max-width: 1024px) {
	.contact-page {
		padding: 3rem 3rem 5rem;
	}
}

@media (max-width: 768px) {
	.contact-page {
		padding: 2rem 1.5rem 4rem;
	}
}

.contact-hero {
	max-width: 800px;
	margin: 0 auto 3rem;
	text-align: center;
}

.contact-kicker {
	font-size: 0.85rem;
	font-weight: 700;
	color: #184a57;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	display: inline-block;
	margin-bottom: 0.5rem;
}

.contact-hero h1 {
	font-size: clamp(2rem, 4vw, 3rem);
	font-weight: 700;
	line-height: 1.2;
	color: #0c0c0c;
	margin-bottom: 1rem;
	letter-spacing: -0.02em;
}

.contact-subtitle {
	font-size: 1.1rem;
	line-height: 1.6;
	color: #64748b;
}

.contact-container {
	display: grid;
	grid-template-columns: 1.3fr 1fr;
	gap: 3rem;
	max-width: 1100px;
	margin: 0 auto;
	align-items: stretch;
}

@media (max-width: 900px) {
	.contact-container {
		grid-template-columns: 1fr;
		gap: 2.5rem;
	}
}

.contact-form-card {
	background: #ffffff;
	border-radius: 20px;
	padding: 2.5rem;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
	border: 1px solid #f1f5f9;
}

@media (max-width: 600px) {
	.contact-form-card {
		padding: 1.5rem;
	}
}

.form-group {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	margin-bottom: 1.5rem;
}

.form-row {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1.2rem;
}

@media (max-width: 600px) {
	.form-row {
		grid-template-columns: 1fr;
		gap: 0;
	}
}

.form-group label {
	font-size: 0.85rem;
	font-weight: 600;
	color: #475569;
	text-align: left;
}

.form-group input,
.form-group select,
.form-group textarea {
	padding: 0.8rem 1rem;
	font-size: 0.95rem;
	font-family: inherit;
	border: 1px solid #cbd5e1;
	border-radius: 10px;
	background-color: #ffffff;
	color: #1e293b;
	transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
	outline: none;
	border-color: #184a57;
	box-shadow: 0 0 0 3px rgba(24, 74, 87, 0.1);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
	color: #94a3b8;
}

.btn-submit {
	width: 100%;
	padding: 0.9rem;
	background: #184a57;
	color: #ffffff;
	font-weight: 600;
	font-size: 0.95rem;
	border: none;
	border-radius: 10px;
	cursor: pointer;
	transition: background-color 0.2s, transform 0.1s;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
}

.btn-submit:hover {
	background: #123741;
}

.btn-submit:active {
	transform: scale(0.99);
}

.status-msg {
	margin-bottom: 1.5rem;
	padding: 0.8rem 1rem;
	border-radius: 8px;
	font-size: 0.9rem;
	font-weight: 500;
	background-color: #fef2f2;
	color: #b91c1c;
	border: 1px solid #fee2e2;
	text-align: left;
}

.status-msg.success {
	background-color: #f0fdf4;
	color: #15803d;
	border: 1px solid #dcfce7;
}

.contact-info-card {
	background: linear-gradient(135deg, #184a57 0%, #0f3039 100%);
	color: #ffffff;
	border-radius: 20px;
	padding: 2.5rem;
	box-shadow: 0 10px 30px rgba(24, 74, 87, 0.15);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: 400px;
	text-align: left;
}

@media (max-width: 900px) {
	.contact-info-card {
		min-height: auto;
	}
}

@media (max-width: 600px) {
	.contact-info-card {
		padding: 1.5rem;
	}
}

.info-card-title {
	font-size: 1.4rem;
	font-weight: 700;
	margin-bottom: 0.75rem;
}

.info-card-desc {
	font-size: 0.93rem;
	line-height: 1.6;
	color: rgba(255, 255, 255, 0.8);
	margin-bottom: 2.5rem;
}

.contact-details-list {
	display: flex;
	flex-direction: column;
	gap: 2rem;
	margin-bottom: 2.5rem;
}

.detail-item {
	display: flex;
	align-items: flex-start;
	gap: 1rem;
}

.detail-icon {
	width: 44px;
	height: 44px;
	background-color: rgba(255, 255, 255, 0.1);
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #ffffff;
	flex-shrink: 0;
}

.detail-label {
	font-size: 0.78rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: rgba(255, 255, 255, 0.5);
	margin-bottom: 0.25rem;
}

.detail-link {
	font-size: 1.05rem;
	font-weight: 500;
	color: #ffffff;
	text-decoration: none;
	transition: opacity 0.2s;
}

.detail-link:hover {
	opacity: 0.85;
}

.info-card-footer {
	border-top: 1px solid rgba(255, 255, 255, 0.1);
	padding-top: 1.5rem;
	margin-top: 1.5rem;
}

.office-schedule {
	font-size: 0.82rem;
	color: rgba(255, 255, 255, 0.6);
	line-height: 1.5;
}

.spinner-small {
	width: 16px;
	height: 16px;
	border: 2px solid rgba(255, 255, 255, 0.3);
	border-top-color: #ffffff;
	border-radius: 50%;
	animation: spin 0.8s linear infinite;
}

@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}
</style>
