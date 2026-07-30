<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import logoImg from '$lib/images/AzuwaTravel.jpeg';
	import promoCozumel from '$lib/images/promos/PromoCozumel.jpeg';
	import promoSecrets from '$lib/images/promos/PromoSecrets.jpeg';
	import promoReef28 from '$lib/images/promos/Reef28.jpeg';
	import { 
		getPromotions, addPromotion, updatePromotion, deletePromotion,
		getSupportImages, addSupportImage, updateSupportImage, deleteSupportImage,
		type PromoItem, type SupportImageItem
	} from '$lib/promoService';

	let { onLogout } = $props<{ onLogout: () => void }>();

	let activeModule = $state<'promotions' | 'blog'>('promotions');
	let promoSubTab = $state<'promos' | 'support'>('promos');

	// Lists
	let promotionsList = $state<PromoItem[]>([]);
	let supportImagesList = $state<SupportImageItem[]>([]);
	let isLoadingData = $state(true);

	// Mock Data for blog module (kept from earlier as it is a mock)
	let mockBlogPosts = $state([
		{
			id: 1,
			title: 'Top 10 Playas Escondidas en Belice',
			category: 'Guías de Viaje',
			author: 'Sofía Martínez',
			date: '2026-07-15',
			status: 'Publicado'
		},
		{
			id: 2,
			title: 'Guía Definitiva: Cenotes de Yucatán',
			category: 'Aventura',
			author: 'Carlos Gómez',
			date: '2026-07-22',
			status: 'Publicado'
		},
		{
			id: 3,
			title: 'Consejos para viajar a Roatán en 2026',
			category: 'Consejos',
			author: 'Elena Ruiz',
			date: '2026-07-28',
			status: 'Borrador'
		}
	]);

	// Load all data from Firestore
	const loadData = async () => {
		isLoadingData = true;
		try {
			let dbPromos = await getPromotions();
			
			if (dbPromos.length === 0) {
				console.log('Sembrando promociones por defecto desde el Dashboard...');
				const oneYearFromNow = new Date();
				oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

				// 1. Cozumel
				const resCozumel = await fetch(promoCozumel);
				const blobCozumel = await resCozumel.blob();
				const fileCozumel = new File([blobCozumel], 'PromoCozumel.jpeg', { type: 'image/jpeg' });
				await addPromotion(
					'Cozumel Increíble',
					'Disfruta del paraíso caribeño en Cozumel con tarifas especiales de hospedaje, snorkel guiado incluido y desayunos gratis para toda la familia.',
					fileCozumel,
					'',
					oneYearFromNow
				);

				// 2. Secrets
				const resSecrets = await fetch(promoSecrets);
				const blobSecrets = await resSecrets.blob();
				const fileSecrets = new File([blobSecrets], 'PromoSecrets.jpeg', { type: 'image/jpeg' });
				await addPromotion(
					'Secrets Resorts & Spas',
					'Escapada de lujo todo incluido solo para adultos. Obtén hasta un 40% de descuento, cenas gourmet ilimitadas y amenidades VIP exclusivas.',
					fileSecrets,
					'',
					oneYearFromNow
				);

				// 3. Reef 28
				const resReef28 = await fetch(promoReef28);
				const blobReef28 = await resReef28.blob();
				const fileReef28 = new File([blobReef28], 'Reef28.jpeg', { type: 'image/jpeg' });
				await addPromotion(
					'The Reef 28 - Playa del Carmen',
					'Experiencia cosmopolita All-Suites en el corazón de Playa del Carmen. Tarifas de promoción especial con barra libre premium y acceso a club de playa.',
					fileReef28,
					'',
					oneYearFromNow
				);

				dbPromos = await getPromotions();
			}
			
			promotionsList = dbPromos;
			supportImagesList = await getSupportImages();
		} catch (error) {
			console.error('Error cargando datos de Firebase:', error);
			alert('Ocurrió un error al cargar la información. Revisa tu consola.');
		} finally {
			isLoadingData = false;
		}
	};

	onMount(() => {
		loadData();
	});

	// Date calculations for Vigencia constraints
	const today = new Date();
	const yyyy = today.getFullYear();
	const mm = String(today.getMonth() + 1).padStart(2, '0');
	const dd = String(today.getDate()).padStart(2, '0');
	const minDateStr = `${yyyy}-${mm}-${dd}`;
	const maxDateStr = `${yyyy + 3}-${mm}-${dd}`;

	// Form State
	let showModal = $state(false);
	let modalMode = $state<'add' | 'edit'>('add');
	let editingItemId = $state<string | null>(null);
	
	let formTitle = $state('');
	let formDescription = $state('');
	let formExpirationDate = $state(minDateStr);
	let formImageUrl = $state('');
	let formImageFile = $state<File | null>(null);
	let fileInputRef = $state<HTMLInputElement | null>(null);
	let isSubmitting = $state(false);
	
	let imageSourceType = $state<'file' | 'url'>('file');
	let filePreviewUrl = $state('');

	const resetForm = () => {
		formTitle = '';
		formDescription = '';
		formExpirationDate = minDateStr;
		formImageUrl = '';
		formImageFile = null;
		filePreviewUrl = '';
		imageSourceType = 'file';
		editingItemId = null;
		if (fileInputRef) fileInputRef.value = '';
	};

	const handleFileChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			formImageFile = target.files[0];
			filePreviewUrl = URL.createObjectURL(formImageFile);
		}
	};

	const openAddModal = () => {
		modalMode = 'add';
		resetForm();
		showModal = true;
	};

	const openEditModal = (item: PromoItem | SupportImageItem) => {
		modalMode = 'edit';
		editingItemId = item.id || null;
		formTitle = item.title;
		formDescription = item.description;
		formImageUrl = item.imageUrl;
		
		// Convert Date to YYYY-MM-DD
		const dateObj = new Date(item.expirationDate);
		const y = dateObj.getFullYear();
		const m = String(dateObj.getMonth() + 1).padStart(2, '0');
		const d = String(dateObj.getDate()).padStart(2, '0');
		formExpirationDate = `${y}-${m}-${d}`;
		
		formImageFile = null;
		filePreviewUrl = '';
		
		if (item.imageUrl && !item.imageUrl.includes('firebasestorage.googleapis.com')) {
			imageSourceType = 'url';
		} else {
			imageSourceType = 'file';
		}
		
		showModal = true;
	};

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		
		// Validate dates
		const selectedDate = new Date(formExpirationDate + 'T00:00:00');
		const minDate = new Date(minDateStr + 'T00:00:00');
		const maxDate = new Date(maxDateStr + 'T23:59:59');

		if (selectedDate < minDate || selectedDate > maxDate) {
			alert(`La fecha de vigencia debe ser entre hoy y máximo 3 años (${minDateStr} al ${maxDateStr}).`);
			return;
		}

		if (modalMode === 'add' && !formImageFile && !formImageUrl) {
			alert('Por favor selecciona un archivo de imagen o proporciona una URL de imagen.');
			return;
		}

		isSubmitting = true;

		try {
			if (promoSubTab === 'promos') {
				if (modalMode === 'add') {
					await addPromotion(
						formTitle,
						formDescription,
						formImageFile,
						formImageUrl,
						selectedDate
					);
				} else if (editingItemId) {
					await updatePromotion(
						editingItemId,
						formTitle,
						formDescription,
						formImageFile,
						formImageUrl,
						selectedDate
					);
				}
			} else {
				// support subtab
				if (modalMode === 'add') {
					await addSupportImage(
						formTitle,
						formDescription,
						formImageFile,
						formImageUrl,
						selectedDate
					);
				} else if (editingItemId) {
					await updateSupportImage(
						editingItemId,
						formTitle,
						formDescription,
						formImageFile,
						formImageUrl,
						selectedDate
					);
				}
			}
			showModal = false;
			resetForm();
			await loadData();
		} catch (error) {
			console.error('Error al guardar:', error);
			alert('Error al guardar. Revisa tu conexión de Firebase.');
		} finally {
			isSubmitting = false;
		}
	};

	const handleDelete = async (id: string, imageUrl: string) => {
		if (!confirm('¿Estás seguro de que deseas eliminar este elemento?')) return;
		
		try {
			if (promoSubTab === 'promos') {
				await deletePromotion(id, imageUrl);
			} else {
				await deleteSupportImage(id, imageUrl);
			}
			await loadData();
		} catch (error) {
			console.error('Error al eliminar:', error);
			alert('No se pudo eliminar el elemento de la base de datos.');
		}
	};

	const handleDeletePost = (id: number) => {
		mockBlogPosts = mockBlogPosts.filter(p => p.id !== id);
	};
</script>

<div class="dashboard-container">
	<!-- Sidebar -->
	<aside class="sidebar">
		<div class="sidebar-header">
			<img src={logoImg} alt="Logo" class="sidebar-logo-img" />
			<div class="brand-info">
				<h3>Azuwa Travel</h3>
				<span>Panel de Control</span>
			</div>
		</div>

		<nav class="sidebar-nav">
			<button 
				class="nav-item" 
				class:active={activeModule === 'promotions'} 
				onclick={() => activeModule = 'promotions'}
			>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
					<polyline points="2 17 12 22 22 17"></polyline>
					<polyline points="2 12 12 17 22 12"></polyline>
				</svg>
				<span>Promociones</span>
			</button>

			<button 
				class="nav-item" 
				class:active={activeModule === 'blog'} 
				onclick={() => activeModule = 'blog'}
			>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
					<polyline points="14 2 14 8 20 8"></polyline>
					<line x1="16" y1="13" x2="8" y2="13"></line>
					<line x1="16" y1="17" x2="8" y2="17"></line>
					<polyline points="10 9 9 9 8 9"></polyline>
				</svg>
				<span>Blog</span>
			</button>
		</nav>

		<div class="sidebar-footer">
			<button class="btn-logout" onclick={onLogout}>
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
					<polyline points="16 17 21 12 16 7"></polyline>
					<line x1="21" y1="12" x2="9" y2="12"></line>
				</svg>
				<span>Cerrar Sesión</span>
			</button>
		</div>
	</aside>

	<!-- Main Content Area -->
	<main class="main-content">
		<!-- Header -->
		<header class="content-header">
			<div class="header-left">
				<h2>
					{#if activeModule === 'promotions'}
						{promoSubTab === 'promos' ? 'Administrar Promociones' : 'Imágenes de Soporte'}
					{:else}
						Artículos del Blog
					{/if}
				</h2>
				<p>Gestiona el contenido que se muestra en la página principal</p>
			</div>

			<div class="header-right">
				{#if activeModule === 'promotions'}
					<button class="btn-primary" onclick={openAddModal}>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
							<line x1="12" y1="5" x2="12" y2="19"></line>
							<line x1="5" y1="12" x2="19" y2="12"></line>
						</svg>
						Agregar {promoSubTab === 'promos' ? 'Promo' : 'Soporte'}
					</button>
				{:else}
					<button class="btn-primary" onclick={() => alert('Módulo de creación de blog en desarrollo.')}>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
							<line x1="12" y1="5" x2="12" y2="19"></line>
							<line x1="5" y1="12" x2="19" y2="12"></line>
						</svg>
						Crear Artículo
					</button>
				{/if}
			</div>
		</header>

		<!-- Sub-Navigation for promotions subtabs -->
		{#if activeModule === 'promotions'}
			<div class="subtabs-container">
				<button 
					class="subtab-btn" 
					class:active={promoSubTab === 'promos'} 
					onclick={() => promoSubTab = 'promos'}
				>
					Promociones
				</button>
				<button 
					class="subtab-btn" 
					class:active={promoSubTab === 'support'} 
					onclick={() => promoSubTab = 'support'}
				>
					Imágenes de Soporte
				</button>
			</div>
		{/if}

		<!-- Content Panels -->
		<div class="content-body">
			{#if isLoadingData}
				<div class="spinner-container">
					<div class="spinner-large"></div>
					<p>Conectando con Firebase base de datos...</p>
				</div>
			{:else if activeModule === 'promotions'}
				<!-- Grid of either active promos or support images -->
				<div class="promos-grid">
					{#each (promoSubTab === 'promos' ? promotionsList : supportImagesList) as item (item.id)}
						{@const isExpired = new Date(item.expirationDate) < new Date()}
						<div class="dashboard-card" class:expired={isExpired}>
							<div class="card-img-wrapper">
								<img src={item.imageUrl} alt={item.title} />
								<span class="badge {isExpired ? 'expired' : 'active'}">
									{isExpired ? 'Vencida' : 'Activa'}
								</span>
							</div>
							<div class="card-details">
								<h3>{item.title}</h3>
								<p>{item.description}</p>
								<div class="card-meta">
									<strong>Vigencia:</strong> {new Date(item.expirationDate).toLocaleDateString()}
								</div>
								<div class="card-actions">
									<button class="btn-action edit" onclick={() => openEditModal(item)}>
										Editar
									</button>
									<button class="btn-action delete" onclick={() => handleDelete(item.id!, item.imageUrl)}>
										Eliminar
									</button>
								</div>
							</div>
						</div>
					{:else}
						<div class="empty-state">
							<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
								<circle cx="12" cy="12" r="10"></circle>
								<line x1="12" y1="8" x2="12" y2="12"></line>
								<line x1="12" y1="16" x2="12.01" y2="16"></line>
							</svg>
							<p>No hay elementos en esta categoría. Agrega uno nuevo presionando el botón superior.</p>
						</div>
					{/each}
				</div>
			{:else}
				<!-- Blog table list (mock) -->
				<div class="blog-table-container">
					<table class="blog-table">
						<thead>
							<tr>
								<th>Título del Artículo</th>
								<th>Categoría</th>
								<th>Autor</th>
								<th>Fecha</th>
								<th>Estado</th>
								<th class="actions-col">Acciones</th>
							</tr>
						</thead>
						<tbody>
							{#each mockBlogPosts as post (post.id)}
								<tr>
									<td class="post-title-cell">{post.title}</td>
									<td><span class="category-tag">{post.category}</span></td>
									<td>{post.author}</td>
									<td>{post.date}</td>
									<td>
										<span class="status-indicator {post.status === 'Publicado' ? 'published' : 'draft'}">
											{post.status}
										</span>
									</td>
									<td class="actions-cell">
										<button class="btn-action edit" onclick={() => alert(`Editar post: ${post.title}`)}>
											Editar
										</button>
										<button class="btn-action delete" onclick={() => handleDeletePost(post.id)}>
											Eliminar
										</button>
									</td>
								</tr>
							{:else}
								<tr>
									<td colspan="6" class="table-empty">No hay artículos publicados.</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		</div>
	</main>
</div>

<!-- Add/Edit Modal (Firebase Integrated) -->
{#if showModal}
	<div 
		class="modal-backdrop" 
		onclick={() => !isSubmitting && (showModal = false)} 
		role="dialog"
		transition:fade={{ duration: 200 }}
	>
		<div 
			class="modal-content" 
			onclick={(e) => e.stopPropagation()}
			transition:scale={{ duration: 200, start: 0.95 }}
		>
			<div class="modal-header">
				<h3>{modalMode === 'add' ? 'Agregar Nueva' : 'Editar'} {promoSubTab === 'promos' ? 'Promoción' : 'Imagen de Soporte'}</h3>
				<button class="modal-close" disabled={isSubmitting} onclick={() => showModal = false}>&times;</button>
			</div>
			
			<form onsubmit={handleSubmit} class="modal-form">
				<div class="form-group">
					<label for="title">Título</label>
					<input 
						id="title" 
						type="text" 
						placeholder="Ej. Escapada a Cancún" 
						bind:value={formTitle} 
						required 
						disabled={isSubmitting} 
					/>
				</div>

				<div class="form-group">
					<label for="description">Descripción Corta</label>
					<textarea 
						id="description" 
						placeholder="Escribe los detalles de la oferta..." 
						bind:value={formDescription} 
						rows="3" 
						required
						disabled={isSubmitting}
					></textarea>
				</div>

				<div class="form-group">
					<label for="expirationDate">Vigencia (Hasta 3 años)</label>
					<input 
						id="expirationDate" 
						type="date" 
						min={minDateStr} 
						max={maxDateStr}
						bind:value={formExpirationDate} 
						required 
						disabled={isSubmitting} 
					/>
					<small class="form-helper">Sólo se permiten fechas futuras, hasta un máximo de 3 años.</small>
				</div>

				<div class="form-group">
					<label>Origen de la Imagen</label>
					<div class="image-source-toggle">
						<button 
							type="button" 
							class="toggle-btn" 
							class:active={imageSourceType === 'file'} 
							onclick={() => {
								imageSourceType = 'file';
							}}
							disabled={isSubmitting}
						>
							Subir Archivo
						</button>
						<button 
							type="button" 
							class="toggle-btn" 
							class:active={imageSourceType === 'url'} 
							onclick={() => {
								imageSourceType = 'url';
								formImageFile = null;
								filePreviewUrl = '';
							}}
							disabled={isSubmitting}
						>
							Enlace de Imagen
						</button>
					</div>
				</div>

				{#if imageSourceType === 'file'}
					<div class="form-group">
						<label>Imagen del elemento</label>
						
						{#if filePreviewUrl || formImageUrl}
							<div class="image-preview-container">
								<img src={filePreviewUrl || formImageUrl} alt="Vista previa de la promoción" />
								<div class="image-preview-overlay">
									<button 
										type="button" 
										class="btn-remove-image" 
										onclick={() => {
											formImageFile = null;
											filePreviewUrl = '';
											formImageUrl = '';
											if (fileInputRef) fileInputRef.value = '';
										}}
										disabled={isSubmitting}
									>
										<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<polyline points="3 6 5 6 21 6"></polyline>
											<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
										</svg>
										Quitar / Cambiar Imagen
									</button>
								</div>
							</div>
						{:else}
							<div class="upload-dropzone" onclick={() => !isSubmitting && fileInputRef?.click()} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && !isSubmitting && fileInputRef?.click()}>
								<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
									<polyline points="17 8 12 3 7 8"></polyline>
									<line x1="12" y1="3" x2="12" y2="15"></line>
								</svg>
								<p>Arrastra una imagen o haz clic para buscar</p>
								<span>Formatos admitidos: JPG, PNG, WEBP</span>
							</div>
						{/if}
						
						<input 
							id="imageFile" 
							type="file" 
							accept="image/*"
							bind:this={fileInputRef}
							onchange={handleFileChange}
							style="display: none;"
							disabled={isSubmitting}
						/>
					</div>
				{:else}
					<div class="form-group">
						<label for="imageUrl">Introduce URL de Imagen externa</label>
						<input 
							id="imageUrl" 
							type="url" 
							placeholder="https://ejemplo.com/imagen.jpg" 
							bind:value={formImageUrl} 
							disabled={isSubmitting}
						/>
						
						{#if formImageUrl}
							<div class="form-group" style="margin-top: 0.5rem;">
								<label>Vista previa de URL</label>
								<div class="image-preview-container">
									<img src={formImageUrl} alt="Vista previa externa" onerror={(e) => (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/600x400?text=Error+al+cargar+imagen'} />
								</div>
							</div>
						{/if}
					</div>
				{/if}

				<div class="modal-actions">
					<button 
						type="button" 
						class="btn-secondary" 
						disabled={isSubmitting} 
						onclick={() => showModal = false}
					>
						Cancelar
					</button>
					<button type="submit" class="btn-primary" disabled={isSubmitting}>
						{#if isSubmitting}
							<div class="spinner-small"></div>
							Guardando...
						{:else}
							Guardar
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	.dashboard-container {
		display: flex;
		min-height: 100vh;
		background: #f8fafc;
		font-family: 'Circular Std', 'DM Sans', sans-serif;
	}

	/* Sidebar Styling */
	.sidebar {
		width: 260px;
		background: #0f172a;
		color: #ffffff;
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
	}

	.sidebar-header {
		padding: 2rem 1.5rem;
		display: flex;
		align-items: center;
		gap: 0.8rem;
		border-bottom: 1px solid rgba(255,255,255,0.06);
	}

	.sidebar-logo-img {
		width: auto;
		height: 38px;
		object-fit: contain;
		border-radius: 6px;
	}

	.brand-info h3 {
		font-size: 1.05rem;
		font-weight: 700;
		margin: 0;
	}

	.brand-info span {
		font-size: 0.75rem;
		color: #94a3b8;
	}

	.sidebar-nav {
		flex: 1;
		padding: 2rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		padding: 0.8rem 1rem;
		border-radius: 12px;
		border: none;
		background: transparent;
		color: #94a3b8;
		font-size: 0.95rem;
		font-weight: 500;
		cursor: pointer;
		text-align: left;
		transition: all 0.2s ease;
		font-family: inherit;
	}

	.nav-item:hover {
		color: #ffffff;
		background: rgba(255, 255, 255, 0.04);
	}

	.nav-item.active {
		color: #ffffff;
		background: #184a57;
		box-shadow: 0 4px 12px rgba(24, 74, 87, 0.2);
	}

	.sidebar-footer {
		padding: 1.5rem;
		border-top: 1px solid rgba(255,255,255,0.06);
	}

	.btn-logout {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.6rem;
		padding: 0.75rem;
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.15);
		background: transparent;
		color: #f1f5f9;
		font-size: 0.88rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
		font-family: inherit;
	}

	.btn-logout:hover {
		background: rgba(239, 68, 68, 0.1);
		border-color: rgba(239, 68, 68, 0.3);
		color: #ef4444;
	}

	/* Main Content Styling */
	.main-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
	}

	.content-header {
		padding: 2.5rem 3rem 1.5rem;
		background: #ffffff;
		border-bottom: 1px solid #e2e8f0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.header-left h2 {
		font-size: 1.8rem;
		font-weight: 700;
		color: #0f172a;
		margin: 0 0 0.4rem;
	}

	.header-left p {
		font-size: 0.9rem;
		color: #64748b;
		margin: 0;
	}

	.btn-primary {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: #184a57;
		color: #ffffff;
		border: none;
		border-radius: 10px;
		padding: 0.75rem 1.4rem;
		font-size: 0.9rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		box-shadow: 0 4px 12px rgba(24, 74, 87, 0.15);
		font-family: inherit;
	}

	.btn-primary:hover:not(:disabled) {
		background: #0f323c;
		transform: translateY(-1px);
		box-shadow: 0 6px 16px rgba(24, 74, 87, 0.25);
	}

	/* Sub-Navigation Subtabs */
	.subtabs-container {
		display: flex;
		gap: 1.5rem;
		padding: 0 3rem;
		background: #ffffff;
		border-bottom: 1px solid #e2e8f0;
	}

	.subtab-btn {
		background: transparent;
		border: none;
		padding: 1rem 0.5rem;
		font-size: 0.95rem;
		font-weight: 600;
		color: #64748b;
		cursor: pointer;
		position: relative;
		transition: color 0.2s;
		font-family: inherit;
	}

	.subtab-btn:hover {
		color: #0f172a;
	}

	.subtab-btn.active {
		color: #184a57;
	}

	.subtab-btn.active::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: #184a57;
		border-radius: 99px;
	}

	.content-body {
		padding: 3rem;
		flex: 1;
	}

	/* Spinner & Loader */
	.spinner-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 5rem 0;
		color: #64748b;
		font-size: 0.95rem;
		gap: 1.2rem;
	}

	.spinner-large {
		width: 48px;
		height: 48px;
		border: 4px solid rgba(24, 74, 87, 0.1);
		border-top-color: #184a57;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	.spinner-small {
		width: 16px;
		height: 16px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top-color: #ffffff;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	/* Promotions Grid */
	.promos-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1.5rem;
	}

	.dashboard-card {
		background: #ffffff;
		border-radius: 14px;
		border: 1px solid #e2e8f0;
		overflow: hidden;
		box-shadow: 0 4px 16px rgba(0,0,0,0.02);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		display: flex;
		flex-direction: column;
	}

	.dashboard-card.expired {
		border-color: #fca5a5;
		background: #fffcfc;
	}

	.dashboard-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
	}

	.card-img-wrapper {
		height: 160px;
		position: relative;
		background: #f1f5f9;
		overflow: hidden;
	}

	.card-img-wrapper img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.dashboard-card:hover .card-img-wrapper img {
		transform: scale(1.05);
	}

	.badge {
		position: absolute;
		top: 1rem;
		right: 1rem;
		padding: 0.35rem 0.8rem;
		border-radius: 99px;
		font-size: 0.75rem;
		font-weight: 700;
	}

	.badge.active {
		background: #dcfce7;
		color: #15803d;
	}

	.badge.expired {
		background: #fee2e2;
		color: #ef4444;
	}

	.card-details {
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.card-details h3 {
		font-size: 1.25rem;
		font-weight: 700;
		color: #0f172a;
		margin: 0 0 0.75rem;
	}

	.card-details p {
		
		font-size: 0.9rem;
		color: #64748b;
		line-height: 1.5;
		margin: 0 0 1rem;
		height: 48px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.card-meta {
		font-size: 0.82rem;
		color: #475569;
		margin-bottom: 1.5rem;
		background: #f1f5f9;
		padding: 0.4rem 0.8rem;
		border-radius: 6px;
		display: inline-block;
		align-self: flex-start;
	}

	.dashboard-card.expired .card-meta {
		background: #ffebeb;
		color: #b91c1c;
	}

	.card-actions {
		display: flex;
		gap: 0.75rem;
		margin-top: auto;
	}

	.btn-action {
		flex: 1;
		padding: 0.6rem;
		border-radius: 8px;
		font-size: 0.85rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
		font-family: inherit;
	}

	.btn-action.edit {
		background: #f1f5f9;
		color: #475569;
		border: 1px solid #cbd5e1;
	}

	.btn-action.edit:hover {
		background: #e2e8f0;
		color: #0f172a;
	}

	.btn-action.delete {
		background: rgba(239, 68, 68, 0.08);
		color: #ef4444;
		border: 1px solid rgba(239, 68, 68, 0.2);
	}

	.btn-action.delete:hover {
		background: #ef4444;
		color: #ffffff;
		border-color: #ef4444;
	}

	.empty-state {
		grid-column: 1 / -1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 6rem 2rem;
		background: #ffffff;
		border-radius: 18px;
		border: 2px dashed #cbd5e1;
		color: #64748b;
		text-align: center;
		gap: 1rem;
	}

	.empty-state p {
		margin: 0;
		font-size: 0.95rem;
	}

	/* Blog Table styling */
	.blog-table-container {
		background: #ffffff;
		border-radius: 16px;
		border: 1px solid #e2e8f0;
		overflow: hidden;
		box-shadow: 0 4px 20px rgba(0,0,0,0.03);
	}

	.blog-table {
		width: 100%;
		border-collapse: collapse;
		text-align: left;
		font-size: 0.9rem;
	}

	.blog-table th {
		background: #f8fafc;
		padding: 1.1rem 1.5rem;
		color: #475569;
		font-weight: 600;
		border-bottom: 1px solid #e2e8f0;
	}

	.blog-table td {
		padding: 1.1rem 1.5rem;
		color: #334155;
		border-bottom: 1px solid #e2e8f0;
		vertical-align: middle;
	}

	.blog-table tbody tr:last-child td {
		border-bottom: none;
	}

	.post-title-cell {
		font-weight: 600;
		color: #0f172a;
	}

	.category-tag {
		background: #f1f5f9;
		color: #475569;
		padding: 0.25rem 0.6rem;
		border-radius: 6px;
		font-size: 0.78rem;
		font-weight: 500;
	}

	.status-indicator {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.75rem;
		font-weight: 700;
		padding: 0.25rem 0.6rem;
		border-radius: 99px;
	}

	.status-indicator.published {
		background: #dcfce7;
		color: #166534;
	}

	.status-indicator.draft {
		background: #fef9c3;
		color: #854d0e;
	}

	.actions-cell {
		display: flex;
		gap: 0.5rem;
	}

	.actions-cell .btn-action {
		padding: 0.4rem 0.8rem;
	}

	.table-empty {
		text-align: center;
		padding: 3rem !important;
		color: #64748b;
	}

	/* Modal Styling */
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(15, 23, 42, 0.4);
		backdrop-filter: blur(8px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
		padding: 1.5rem;
	}

	.modal-content {
		background: #ffffff;
		border-radius: 20px;
		width: 100%;
		max-width: 480px;
		box-shadow: 0 20px 40px rgba(0,0,0,0.15);
		overflow: hidden;
		max-height: 85vh;
		display: flex;
		flex-direction: column;
	}

	.modal-header {
		padding: 1.5rem;
		border-bottom: 1px solid #e2e8f0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-shrink: 0;
	}

	.modal-header h3 {
		font-size: 1.25rem;
		font-weight: 700;
		margin: 0;
		color: #0f172a;
	}

	.modal-close {
		background: transparent;
		border: none;
		font-size: 1.6rem;
		cursor: pointer;
		color: #94a3b8;
		transition: color 0.2s;
	}

	.modal-close:hover:not(:disabled) {
		color: #0f172a;
	}

	.modal-form {
		padding: 2rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		overflow-y: auto;
		flex-grow: 1;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-group label {
		font-size: 0.85rem;
		font-weight: 600;
		color: #475569;
	}

	.form-group input, .form-group textarea {
		padding: 0.8rem;
		border-radius: 8px;
		border: 1px solid #cbd5e1;
		font-size: 0.95rem;
		font-family: inherit;
		box-sizing: border-box;
		width: 100%;
	}

	.form-group input:focus, .form-group textarea:focus {
		outline: none;
		border-color: #184a57;
		box-shadow: 0 0 0 3px rgba(24, 74, 87, 0.15);
	}

	.form-helper {
		font-size: 0.75rem;
		color: #64748b;
		margin-top: 0.1rem;
	}

	.modal-actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.75rem;
		margin-top: 1rem;
	}

	.btn-secondary {
		background: #f1f5f9;
		color: #475569;
		border: none;
		border-radius: 8px;
		padding: 0.65rem 1.2rem;
		font-size: 0.9rem;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s;
		font-family: inherit;
	}

	.btn-secondary:hover:not(:disabled) {
		background: #e2e8f0;
	}

	/* Responsive tweaks */
	@media (max-width: 768px) {
		.dashboard-container {
			flex-direction: column;
		}

		.sidebar {
			width: 100%;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			padding: 1rem;
			box-sizing: border-box;
		}

		.sidebar-header {
			padding: 0;
			border-bottom: none;
		}

		.sidebar-nav {
			flex-direction: row;
			padding: 0;
			margin: 0 1rem;
		}

		.nav-item {
			padding: 0.6rem 0.8rem;
		}

		.sidebar-footer {
			padding: 0;
			border-top: none;
		}

		.btn-logout {
			padding: 0.6rem;
		}

		.btn-logout span {
			display: none;
		}

		.content-header {
			padding: 1.5rem;
		}

		.subtabs-container {
			padding: 0 1.5rem;
		}

		.content-body {
			padding: 1.5rem;
		}
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* Image Source Toggle */
	.image-source-toggle {
		display: flex;
		background: #f1f5f9;
		padding: 0.25rem;
		border-radius: 10px;
		gap: 0.25rem;
		margin-bottom: 0.5rem;
	}

	.image-source-toggle .toggle-btn {
		flex: 1;
		padding: 0.6rem;
		border: none;
		border-radius: 8px;
		font-size: 0.85rem;
		font-weight: 600;
		cursor: pointer;
		background: transparent;
		color: #64748b;
		transition: all 0.2s ease;
		font-family: inherit;
	}

	.image-source-toggle .toggle-btn:hover:not(:disabled) {
		color: #0f172a;
	}

	.image-source-toggle .toggle-btn.active {
		background: #ffffff;
		color: #184a57;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	}

	/* Upload Dropzone */
	.upload-dropzone {
		border: 2px dashed #cbd5e1;
		border-radius: 12px;
		padding: 2rem 1.5rem;
		text-align: center;
		background: #fafbfd;
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		outline: none;
	}

	.upload-dropzone:hover {
		border-color: #184a57;
		background: rgba(24, 74, 87, 0.02);
	}

	.upload-dropzone svg {
		color: #94a3b8;
		transition: color 0.2s ease;
	}

	.upload-dropzone:hover svg {
		color: #184a57;
	}

	.upload-dropzone p {
		font-size: 0.9rem;
		font-weight: 500;
		color: #475569;
		margin: 0;
	}

	.upload-dropzone span {
		font-size: 0.75rem;
		color: #94a3b8;
	}

	/* Image Preview Area */
	.image-preview-container {
		position: relative;
		border-radius: 12px;
		overflow: hidden;
		border: 1px solid #cbd5e1;
		background: #f8fafc;
		aspect-ratio: 16 / 9;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		max-height: 200px;
	}

	.image-preview-container img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.image-preview-overlay {
		position: absolute;
		inset: 0;
		background: rgba(15, 23, 42, 0.65);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.2s ease;
		backdrop-filter: blur(2px);
	}

	.image-preview-container:hover .image-preview-overlay {
		opacity: 1;
	}

	.btn-remove-image {
		background: #ef4444;
		color: #ffffff;
		border: none;
		border-radius: 8px;
		padding: 0.55rem 1.1rem;
		font-size: 0.8rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.btn-remove-image:hover:not(:disabled) {
		background: #dc2626;
		transform: scale(1.03);
	}
</style>
