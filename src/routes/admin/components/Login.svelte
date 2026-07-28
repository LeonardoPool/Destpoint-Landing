<script lang="ts">
	import logoImg from '$lib/images/AzuwaTravel.jpeg';

	let { onSuccess } = $props<{ onSuccess: () => void }>();

	let email = $state('');
	let password = $state('');
	let errorMsg = $state('');
	let isLoading = $state(false);

	const handleLogin = (e: SubmitEvent) => {
		e.preventDefault();
		errorMsg = '';
		isLoading = true;

		// Simulated short delay for natural feeling
		setTimeout(() => {
			if (email === 'promos@azuwatravel.com' && password === 'AzuwaTr@vaL_2026') {
				isLoading = false;
				onSuccess();
			} else {
				isLoading = false;
				errorMsg = 'Correo o contraseña incorrectos. Inténtalo de nuevo.';
			}
		}, 600);
	};
</script>

<div class="login-wrapper">
	<div class="login-card">
		<div class="login-header">
			<img src={logoImg} alt="Azuwa Travel Logo" class="brand-logo-img" />
			<h2>Azuwa Travel Admin</h2>
			<p>Ingresa tus credenciales para acceder al portal de administración</p>
		</div>

		<form onsubmit={handleLogin} class="login-form">
			{#if errorMsg}
				<div class="error-banner">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="12" cy="12" r="10"></circle>
						<line x1="12" y1="8" x2="12" y2="12"></line>
						<line x1="12" y1="16" x2="12.01" y2="16"></line>
					</svg>
					<span>{errorMsg}</span>
				</div>
			{/if}

			<div class="input-group">
				<label for="email">Correo Electrónico</label>
				<div class="input-relative">
					<svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
						<polyline points="22,6 12,13 2,6"></polyline>
					</svg>
					<input 
						type="email" 
						id="email" 
						placeholder="ejemplo@azuwatravel.com" 
						bind:value={email} 
						required 
						disabled={isLoading}
					/>
				</div>
			</div>

			<div class="input-group">
				<label for="password">Contraseña</label>
				<div class="input-relative">
					<svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
						<path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
					</svg>
					<input 
						type="password" 
						id="password" 
						placeholder="••••••••••••" 
						bind:value={password} 
						required 
						disabled={isLoading}
					/>
				</div>
			</div>

			<button type="submit" class="btn-submit" disabled={isLoading}>
				{#if isLoading}
					<div class="spinner"></div>
					Verificando...
				{:else}
					Iniciar Sesión
				{/if}
			</button>
		</form>
	</div>
</div>

<style>
	.login-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		background: #f8fafc;
		font-family: 'Circular Std', 'DM Sans', sans-serif;
		padding: 1.5rem;
		box-sizing: border-box;
	}

	.login-card {
		background: #ffffff;
		border: 1px solid #e2e8f0;
		border-radius: 24px;
		padding: 3rem 2.5rem;
		width: 100%;
		max-width: 440px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02);
		color: #334155;
		box-sizing: border-box;
	}

	@media (max-width: 480px) {
		.login-card {
			padding: 2.5rem 1.5rem;
		}
	}

	.login-header {
		text-align: center;
		margin-bottom: 2.2rem;
	}

	.brand-logo-img {
		width: auto;
		height: 52px;
		object-fit: contain;
		margin-bottom: 1.2rem;
		border-radius: 8px;
	}

	.login-header h2 {
		font-size: 1.6rem;
		font-weight: 700;
		color: #184a57;
		margin: 0 0 0.5rem;
		letter-spacing: -0.02em;
	}

	.login-header p {
		font-size: 0.9rem;
		color: #64748b;
		margin: 0;
		line-height: 1.5;
	}

	.login-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.error-banner {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		background: rgba(239, 68, 68, 0.08);
		border: 1px solid rgba(239, 68, 68, 0.2);
		padding: 0.9rem 1rem;
		border-radius: 12px;
		color: #ef4444;
		font-size: 0.85rem;
		line-height: 1.4;
	}

	.error-banner svg {
		flex-shrink: 0;
		margin-top: 0.1rem;
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.input-group label {
		font-size: 0.85rem;
		font-weight: 600;
		color: #475569;
	}

	.input-relative {
		position: relative;
		display: flex;
		align-items: center;
	}

	.input-icon {
		position: absolute;
		left: 1rem;
		color: #64748b;
		pointer-events: none;
	}

	.input-relative input {
		width: 100%;
		padding: 0.85rem 1rem 0.85rem 2.8rem;
		border-radius: 12px;
		border: 1px solid #cbd5e1;
		background: #ffffff;
		color: #0f172a;
		font-size: 0.95rem;
		transition: all 0.25s ease;
		box-sizing: border-box;
		font-family: inherit;
	}

	.input-relative input:focus {
		outline: none;
		border-color: #184a57;
		background: #ffffff;
		box-shadow: 0 0 0 3px rgba(24, 74, 87, 0.15);
	}

	.input-relative input::placeholder {
		color: #94a3b8;
	}

	.btn-submit {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 0.9rem;
		border-radius: 12px;
		border: none;
		background: #184a57;
		color: #ffffff;
		font-weight: 600;
		font-size: 0.95rem;
		cursor: pointer;
		transition: all 0.25s ease;
		margin-top: 0.5rem;
		font-family: inherit;
		box-shadow: 0 4px 12px rgba(24, 74, 87, 0.15);
	}

	.btn-submit:hover:not(:disabled) {
		background: #0f323c;
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(24, 74, 87, 0.25);
	}

	.btn-submit:active:not(:disabled) {
		transform: translateY(0);
	}

	.btn-submit:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		background: #cbd5e1;
		color: #94a3b8;
		box-shadow: none;
	}

	/* Spinner */
	.spinner {
		width: 18px;
		height: 18px;
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
