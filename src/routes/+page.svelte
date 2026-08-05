<script lang="ts">
  import heroImage from "$lib/images/heroimage.png";
  import Navbar from "$lib/components/Navbar.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import travelokaLogo from "$lib/images/empresas/Traveloka logo.svg";
  import airbnbLogo from "$lib/images/empresas/airbnb logo.svg";
  import expediaLogo from "$lib/images/empresas/Expedia logo.svg";
  import skyscannerLogo from "$lib/images/empresas/Skyscanner logo.svg";
  import americanAirlinesLogo from "$lib/images/empresas/american-airlines logo.svg";
  import "$lib/styles/hero.css";
  import { onMount } from "svelte";
  import { fade, scale } from "svelte/transition";
  import promoCozumel from "$lib/images/promos/PromoCozumel.jpeg";
  import promoSecrets from "$lib/images/promos/PromoSecrets.jpeg";
  import promoReef28 from "$lib/images/promos/Reef28.jpeg";
  import {
    getPromotions,
    getSupportImages,
    addPromotion,
  } from "$lib/promoService";
  import { searchPhotos } from "$lib/pexelsService";

  let beachImage = $state<string | null>(null);
  let eiffelImage = $state<string | null>(null);
  let parisImage = $state<string | null>(null);
  let exploreImage = $state<string | null>(null);
  let resortThumbImage = $state<string | null>(null);
  let guideAvatarImage = $state<string | null>(null);

  const defaultPromos = [
    {
      id: "default-1",
      title: "Cozumel Increíble",
      subtitle:
        "Disfruta del paraíso caribeño en Cozumel con tarifas especiales de hospedaje, snorkel guiado incluido y desayunos gratis para toda la familia.",
      image: promoCozumel,
    },
    {
      id: "default-2",
      title: "Secrets Resorts & Spas",
      subtitle:
        "Escapada de lujo todo incluido solo para adultos. Obtén hasta un 40% de descuento, cenas gourmet ilimitadas y amenidades VIP exclusivas.",
      image: promoSecrets,
    },
    {
      id: "default-3",
      title: "The Reef 28 - Playa del Carmen",
      subtitle:
        "Experiencia cosmopolita All-Suites en el corazón de Playa del Carmen. Tarifas de promoción especial con barra libre premium y acceso a club de playa.",
      image: promoReef28,
    },
  ];

  let promotions =
    $state<
      Array<{ id?: string; title: string; subtitle: string; image: string }>
    >(defaultPromos);
  let currentPromoIndex = $state(0);
  let isHovered = $state(false);
  let lightboxImage = $state<string | null>(null);
  let lightboxTitle = $state("");
  let lightboxSubtitle = $state("");

  const seedDefaultPromotions = async () => {
    try {
      console.log("Sembrando promociones por defecto en Firestore...");
      const oneYearFromNow = new Date();
      oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

      // 1. Cozumel
      const resCozumel = await fetch(promoCozumel);
      const blobCozumel = await resCozumel.blob();
      const fileCozumel = new File([blobCozumel], "PromoCozumel.jpeg", {
        type: "image/jpeg",
      });
      await addPromotion(
        "Cozumel Increíble",
        "Disfruta del paraíso caribeño en Cozumel con tarifas especiales de hospedaje, snorkel guiado incluido y desayunos gratis para toda la familia.",
        fileCozumel,
        "",
        oneYearFromNow,
      );

      // 2. Secrets
      const resSecrets = await fetch(promoSecrets);
      const blobSecrets = await resSecrets.blob();
      const fileSecrets = new File([blobSecrets], "PromoSecrets.jpeg", {
        type: "image/jpeg",
      });
      await addPromotion(
        "Secrets Resorts & Spas",
        "Escapada de lujo todo incluido solo para adultos. Obtén hasta un 40% de descuento, cenas gourmet ilimitadas y amenidades VIP exclusivas.",
        fileSecrets,
        "",
        oneYearFromNow,
      );

      // 3. Reef 28
      const resReef28 = await fetch(promoReef28);
      const blobReef28 = await resReef28.blob();
      const fileReef28 = new File([blobReef28], "Reef28.jpeg", {
        type: "image/jpeg",
      });
      await addPromotion(
        "The Reef 28 - Playa del Carmen",
        "Experiencia cosmopolita All-Suites en el corazón de Playa del Carmen. Tarifas de promoción especial con barra libre premium y acceso a club de playa.",
        fileReef28,
        "",
        oneYearFromNow,
      );

      console.log("Promociones por defecto sembradas exitosamente.");
    } catch (e) {
      console.error("Error al sembrar las promociones por defecto:", e);
    }
  };

  onMount(() => {
    const loadPromotions = async () => {
      try {
        let dbPromos = await getPromotions();

        if (dbPromos.length === 0) {
          await seedDefaultPromotions();
          dbPromos = await getPromotions();
        }

        const dbSupport = await getSupportImages();

        const today = new Date();

        // Filter promotions: only active ones (expiration date is today or future)
        const activePromos = dbPromos.filter(
          (p) => new Date(p.expirationDate) >= today,
        );

        // Filter support images: only active ones
        const activeSupport = dbSupport.filter(
          (s) => new Date(s.expirationDate) >= today,
        );

        // Map to match the HTML bindings: title, subtitle, image
        const mappedPromos = activePromos.map((p) => ({
          id: p.id,
          title: p.title,
          subtitle: p.description,
          image: p.imageUrl,
        }));

        const mappedSupport = activeSupport.map((s) => ({
          id: s.id,
          title: s.title,
          subtitle: s.description,
          image: s.imageUrl,
        }));

        let combinedList = [...mappedPromos];

        // Fill with support images if under 15
        if (combinedList.length < 15) {
          for (const support of mappedSupport) {
            if (combinedList.length >= 15) break;
            if (!combinedList.some((item) => item.id === support.id)) {
              combinedList.push(support);
            }
          }
        }

        promotions = combinedList.slice(0, 15);
      } catch (error) {
        console.error("Error loading promotions from Firebase:", error);
      }
    };

    loadPromotions();

    const loadPexelsImages = async () => {
      try {
        const beachPhotos = await searchPhotos("riviera maya", 1);
        if (beachPhotos.length > 0) beachImage = beachPhotos[0];

        const eiffelPhotos = await searchPhotos("cancun", 1);
        if (eiffelPhotos.length > 0) eiffelImage = eiffelPhotos[0];

        const parisPhotos = await searchPhotos("france", 1);
        if (parisPhotos.length > 0) parisImage = parisPhotos[0];

        const explorePhotos = await searchPhotos(
          "luxury travel vacation resort",
          1,
        );
        if (explorePhotos.length > 0) exploreImage = explorePhotos[0];

        const resortThumbPhotos = await searchPhotos("luxury hotel room", 1);
        if (resortThumbPhotos.length > 0)
          resortThumbImage = resortThumbPhotos[0];

        const guideAvatarPhotos = await searchPhotos(
          "friendly tour guide portrait",
          1,
        );
        if (guideAvatarPhotos.length > 0)
          guideAvatarImage = guideAvatarPhotos[0];
      } catch (error) {
        console.error("Error loading Pexels images:", error);
      }
    };

    loadPexelsImages();

    const interval = setInterval(() => {
      if (!isHovered && lightboxImage === null && promotions.length > 0) {
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
      title: "Itinerarios personalizados",
      desc: "Diseñamos viajes adaptados a tu estilo, presupuesto e intereses.",
    },
    {
      id: 2,
      title: "Todo organizado en un solo lugar",
      desc: "Reservamos vuelos, hoteles, traslados y experiencias para que viajes sin complicaciones.",
    },
    {
      id: 3,
      title: "Asesoría antes, durante y después del viaje",
      desc: "Nuestro equipo te acompaña en cada etapa para que disfrutes con tranquilidad.",
    },
  ];

  const resort = {
    name: "Heaven Resort",
    rating: 4.8,
    price: 450,
    guide: "Jake Anderson",
    guideTitle: "Best Tour Guide",
  };
</script>

<svelte:head>
  <title>AzuwaTravel — Agencia de viajes</title>
</svelte:head>

<!-- ─── Navbar ──────────────────────────────────────────────── -->
<Navbar currentPath="/" />

<!-- ─── Próximamente: Buscador de Hotelería ─────────────────── -->
<section class="booking-soon-section">
  <div class="booking-soon-container">
    <h2 class="booking-soon-title">Próximamente: reserva tu propia aventura</h2>

    <div class="search-mockup-wrapper">
      <!-- The search engine mockup -->
      <div class="search-engine-mockup">
        <div class="search-field">
          <div class="field-icon-label">
            <svg
              class="field-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span class="field-label">Destino</span>
          </div>
          <span class="field-value">¿A dónde quieres ir?</span>
        </div>
        <div class="search-field">
          <div class="field-icon-label">
            <svg
              class="field-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span class="field-label">Fechas</span>
          </div>
          <span class="field-value">Lun, 10 Ago - Dom, 17 Ago</span>
        </div>
        <div class="search-field">
          <div class="field-icon-label">
            <svg
              class="field-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span class="field-label">Huéspedes</span>
          </div>
          <span class="field-value">2 adultos, 1 hab.</span>
        </div>
        <button class="btn-search-mock" disabled>Buscar</button>
      </div>

      <!-- Locked Overlay -->
      <div class="locked-overlay">
        <div class="lock-icon-container">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lock-svg"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ─── Hero ────────────────────────────────────────────────── -->
<section class="hero">
  <!-- Left column -->
  <div class="hero-left">
    <h1 class="hero-title">El mundo, a tu manera.</h1>
    <p class="hero-desc">
      AZUWA Travel es una agencia de viajes especializada en experiencias
      nacionales e internacionales para parejas, familias, grupos y empresas.
      Organizamos vacaciones, bodas destino, quince años, lunas de miel,
      incentivos y convenciones, combinando atención personalizada, tecnología,
      seguridad y acompañamiento profesional antes, durante y después de cada
      viaje.
    </p>

    <div class="follow-us"></div>
  </div>

  <!-- Right column -->
  <div class="hero-right">
    <!-- Main hero image -->
    <img src={heroImage} alt="Destpoint travel destination" class="hero-img" />

    <!-- Scroll-down circular badge removed from here to make it global floating -->
  </div>
</section>

<!-- ─── Nuestras Promociones ───────────────────────────── -->
<section class="promotions-section">
  <h2 class="section-main-title">Nuestras Promociones</h2>
  <div class="promotions-section-grid">
    <div class="promotions-section-left">
      <!-- 3D Card Stack Container -->
      <div
        class="promo-stack-container"
        onmouseenter={() => (isHovered = true)}
        onmouseleave={() => (isHovered = false)}
      >
        <!-- Left/Right navigation buttons -->
        <button
          class="stack-nav-btn prev"
          onclick={() =>
            promotions.length > 0 &&
            (currentPromoIndex =
              (currentPromoIndex - 1 + promotions.length) % promotions.length)}
          aria-label="Anterior"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div class="cards-stack">
          {#each promotions as promo, index}
            <div
              class="stack-card-wrapper"
              class:active={index === currentPromoIndex}
              class:left={promotions.length > 1 &&
                index ===
                  (currentPromoIndex - 1 + promotions.length) %
                    promotions.length}
              class:right={promotions.length > 2 &&
                index === (currentPromoIndex + 1) % promotions.length}
              onclick={() => {
                if (index !== currentPromoIndex) {
                  currentPromoIndex = index;
                }
              }}
            >
              <div class="stack-card">
                <img
                  src={promo.image}
                  alt={promo.title}
                  class="stack-card-img"
                />
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
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
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
          onclick={() =>
            promotions.length > 0 &&
            (currentPromoIndex = (currentPromoIndex + 1) % promotions.length)}
          aria-label="Siguiente"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
    <div class="promotions-section-right">
      <!-- Active Promotion Info (Above the stack) -->
      <div class="active-promo-info">
        <!-- <span class="promo-badge">OFERTA EXCLUSIVA</span> -->
        <h3 class="promo-title">
          {promotions[currentPromoIndex]?.title || ""}
        </h3>
        <p class="promo-desc">
          {promotions[currentPromoIndex]?.subtitle || ""}
        </p>
      </div>
      <!-- Dots Indicators -->
      <div class="stack-dots">
        {#each promotions as _, index}
          <button
            class="stack-dot"
            class:active={currentPromoIndex === index}
            onclick={() => (currentPromoIndex = index)}
            aria-label="Ir a promo {index + 1}"
          ></button>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- Lightbox Modal -->
{#if lightboxImage !== null}
  <div
    class="lightbox-backdrop"
    onclick={() => (lightboxImage = null)}
    role="dialog"
    aria-modal="true"
    transition:fade={{ duration: 300 }}
  >
    <div
      class="lightbox-content-image-only"
      onclick={(e) => e.stopPropagation()}
      transition:scale={{ duration: 300, start: 0.95 }}
    >
      <button
        class="lightbox-close-btn"
        onclick={() => (lightboxImage = null)}
        aria-label="Cerrar modal"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <img
        src={lightboxImage}
        alt="Detalle de promoción"
        class="lightbox-image-only"
      />
    </div>
  </div>
{/if}

<!-- ─── Travel Partners ───────────────────────────────────── -->
<!--
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
-->

<!-- ─── Why Choose Us ────────────────────────────────────── -->
<section class="why-us">
  <div class="why-us-container">
    <!-- Left column -->
    <div class="why-us-left">
      <h2 class="why-us-title">
        Descubre el mundo con experiencias diseñadas para ti
      </h2>
      <p class="why-us-desc">
        Creamos viajes que combinan destinos, hospedaje, transporte y
        actividades para que solo te preocupes por disfrutar cada momento.
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
      <!-- Image grid -->
      <div class="image-grid">
        <div class="img-large">
          {#if beachImage}
            <img
              src={beachImage}
              alt="Riviera Maya"
              class="img-placeholder"
              style="object-fit: cover; width: 100%; height: 100%;"
            />
          {:else}
            <div class="img-placeholder img-placeholder--beach"></div>
          {/if}
        </div>
        <div class="img-small-col">
          {#if eiffelImage}
            <img
              src={eiffelImage}
              alt="Cancún"
              class="img-placeholder"
              style="object-fit: cover; width: 100%; height: 100%;"
            />
          {:else}
            <div class="img-placeholder img-placeholder--eiffel"></div>
          {/if}
          {#if parisImage}
            <img
              src={parisImage}
              alt="Francia"
              class="img-placeholder"
              style="object-fit: cover; width: 100%; height: 100%;"
            />
          {:else}
            <div class="img-placeholder img-placeholder--paris"></div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ─── Explore Section ──────────────────────────────────── -->
<section class="explore">
  <div class="explore-container">
    {#if exploreImage}
      <img
        src={exploreImage}
        alt="Explore destination"
        class="explore-image-placeholder"
      />
    {:else}
      <div class="explore-image-placeholder"></div>
    {/if}
    <div class="glass-card">
      <h2 class="explore-title">Inspírate para tu próxima aventura</h2>
      <p class="explore-desc">
        Descubre destinos, consejos de viaje, experiencias auténticas y
        recomendaciones de nuestros expertos para planificar cada escapada con
        confianza.
      </p>
      <button class="btn-explore">Explorar artículos</button>
    </div>
  </div>
</section>

<!-- ─── Footer ──────────────────────────────────────────── -->
<!-- Scroll-down circular badge (Floating Global) -->
<div
  class="scroll-badge"
  onclick={() =>
    typeof window !== "undefined" &&
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" })}
  role="button"
  tabindex="0"
  onkeydown={(e) =>
    typeof window !== "undefined" &&
    e.key === "Enter" &&
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" })}
  aria-label="Desplazarse hacia abajo"
>
  <!-- Rotating circular text -->
  <svg
    class="scroll-ring"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <path
        id="textCircleGlobal"
        d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
      />
    </defs>
    <text
      font-size="8.2"
      fill="#2e2e2e"
      letter-spacing="2.3"
      font-family="'Circular Std','DM Sans',sans-serif"
    >
      <textPath href="#textCircleGlobal">scroll.down · scroll.down · </textPath>
    </text>
  </svg>
  <!-- Animated mouse icon in the centre -->
  <div class="mouse-wrap">
    <div class="mouse-body">
      <div class="mouse-dot"></div>
    </div>
  </div>
</div>

<Footer />

<style>
  .booking-soon-section {
    padding: 10rem 5rem;
    background-color: #f4fafd;

    /* Overlapping radial gradients to create an organic, painted feel */
    background-image: 
    /* Top left: Soft, desaturated turquoise */
      radial-gradient(
        circle at 10% 10%,
        rgba(23, 233, 223, 0.25) 0%,
        transparent 50%
      ),
      /* Center right: Pale aquamarine */
        radial-gradient(
          circle at 85% 25%,
          rgba(127, 255, 212, 0.291) 0%,
          transparent 55%
        ),
      /* Bottom left: Soft baby blue (our light "navy" alternative) */
        radial-gradient(
          circle at 15% 90%,
          rgba(135, 188, 228, 0.3) 0%,
          transparent 60%
        ),
      /* Bottom right: Warm seashell/sand (New balancing color) */
        radial-gradient(
          circle at 90% 90%,
          rgba(248, 237, 220, 0.782) 0%,
          transparent 55%
        );

    background-size: cover;
    background-position: center;
    text-align: center;
  }

  @media (max-width: 1024px) {
    .booking-soon-section {
      padding: 3rem 3rem 1rem;
    }
  }

  @media (max-width: 768px) {
    .booking-soon-section {
      padding: 2rem 1.5rem 0.5rem;
    }
  }

  .booking-soon-container {
    width: 100%;
    height: 100%;
  }

  .booking-soon-title {
    font-size: clamp(2rem, 5vw, 2.8rem);
    font-weight: 700;
    color: #01173b;
    margin-bottom: 3rem;
    letter-spacing: -0.02em;
  }

  .search-mockup-wrapper {
    position: relative;
    max-width: 900px;
    margin: 0 auto;
    border-radius: 20px;
    padding: 1px;
    background: linear-gradient(
      135deg,
      rgba(24, 74, 87, 0.1) 0%,
      rgba(24, 74, 87, 0.05) 100%
    );
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }

  .search-engine-mockup {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr auto;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem 2rem;
    background: #f8fafc;
    border-radius: 19px;
    filter: blur(1px);
    opacity: 0.9;
    pointer-events: none;
    user-select: none;
  }

  @media (max-width: 768px) {
    .search-engine-mockup {
      grid-template-columns: 1fr;
      text-align: left;
      padding: 1.5rem;
    }
  }

  .search-field {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.5rem 1rem;
    border-right: 1px solid #e2e8f0;
  }

  @media (max-width: 768px) {
    .search-field {
      border-right: none;
      border-bottom: 1px solid #e2e8f0;
      padding: 0.5rem 0;
    }
  }

  .field-icon-label {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: #64748b;
  }

  .field-icon {
    flex-shrink: 0;
    color: #184a57;
  }

  .field-label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #64748b;
  }

  .field-value {
    font-size: 0.95rem;
    font-weight: 500;
    color: #1e293b;
  }

  .btn-search-mock {
    background: #184a57;
    color: #ffffff;
    padding: 0.85rem 2rem;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: not-allowed;
  }

  /* Locked Overlay Styling */
  .locked-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 19px;
    z-index: 5;
  }

  .lock-icon-container {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: rgba(24, 74, 87, 0.1);
    color: #184a57;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(24, 74, 87, 0.15);
    animation: pulse 2s infinite ease-in-out;
  }

  .lock-svg {
    width: 20px;
    height: 20px;
  }

  .locked-text {
    font-size: 0.95rem;
    font-weight: 600;
    color: #184a57;
    background: rgba(255, 255, 255, 0.9);
    padding: 0.4rem 1.2rem;
    border-radius: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.9;
    }
  }
</style>
