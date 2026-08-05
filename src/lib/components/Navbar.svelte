<script lang="ts">
  import logoImg from "$lib/images/AzuwaTravel.jpeg";

  let { currentPath = "/" } = $props<{ currentPath?: string }>();
  let isMenuOpen = $state(false);
</script>

<nav class="navbar">
  <a href="/" class="logo" aria-label="Destpoint inicio">
    <img src={logoImg} alt="Destpoint Logo" class="logo-img" />
  </a>

  <!-- Hamburger Toggle Button -->
  <button
    class="menu-toggle"
    onclick={() => (isMenuOpen = !isMenuOpen)}
    aria-label="Menu principal"
    aria-expanded={isMenuOpen}
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      {#if isMenuOpen}
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      {:else}
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      {/if}
    </svg>
  </button>

  <!-- Backdrop overlay for mobile menu -->
  {#if isMenuOpen}
    <div
      class="menu-backdrop"
      onclick={() => (isMenuOpen = false)}
      role="presentation"
    ></div>
  {/if}

  <ul class="nav-links" class:open={isMenuOpen}>
    <li>
      <a
        href="/"
        class:active={currentPath === "/"}
        onclick={() => (isMenuOpen = false)}>Inicio</a
      >
    </li>
    <li>
      <a
        href="/about"
        class:active={currentPath === "/about"}
        onclick={() => (isMenuOpen = false)}>Sobre Nosotros</a
      >
    </li>
    <li class="nav-dropdown-container">
      <button class="nav-pkg-btn">
        Servicios
        <svg
          width="11"
          height="11"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          class="dropdown-arrow"
        >
          <path
            d="M2 4.5L6 8.5L10 4.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <ul class="dropdown-menu">
        <li>
          <a
            href="javascript:void(0)"
            onclick={(e) => {
              e.preventDefault();
              isMenuOpen = false;
            }}>Hotelería</a
          >
        </li>
        <li>
          <a
            href="javascript:void(0)"
            onclick={(e) => {
              e.preventDefault();
              isMenuOpen = false;
            }}>Tours</a
          >
        </li>
        <li>
          <a
            href="javascript:void(0)"
            onclick={(e) => {
              e.preventDefault();
              isMenuOpen = false;
            }}>Traslados</a
          >
        </li>
        <li>
          <a
            href="javascript:void(0)"
            onclick={(e) => {
              e.preventDefault();
              isMenuOpen = false;
            }}>Avión</a
          >
        </li>
        <li>
          <a
            href="javascript:void(0)"
            onclick={(e) => {
              e.preventDefault();
              isMenuOpen = false;
            }}>Parques temáticos</a
          >
        </li>
        <li>
          <a
            href="javascript:void(0)"
            onclick={(e) => {
              e.preventDefault();
              isMenuOpen = false;
            }}>Cruceros</a
          >
        </li>
        <li>
          <a
            href="javascript:void(0)"
            onclick={(e) => {
              e.preventDefault();
              isMenuOpen = false;
            }}>Paquetes europeos</a
          >
        </li>
      </ul>
    </li>
    <li>
      <a
        href="javascript:void(0)"
        onclick={(e) => {
          e.preventDefault();
          isMenuOpen = false;
        }}>Blog</a
      >
    </li>
    <li>
      <a
        href="/contact"
        class:active={currentPath === "/contact"}
        onclick={() => (isMenuOpen = false)}>Contacto</a
      >
    </li>

    <!-- Cloned Login Action for Mobile view -->
    <li class="mobile-only-action">
      <a
        href="/admin"
        class="btn-login-mobile"
        onclick={() => (isMenuOpen = false)}>Iniciar sesión</a
      >
    </li>
  </ul>

  <div class="nav-actions">
    <a href="/admin" class="btn-login">Iniciar sesión</a>
  </div>
</nav>

<style>
.navbar {
    /* Keep navbar visually transparent so underlying sections show through.
       Positioning it at the top keeps it above content (z-index) so the
       translucent backgrounds below are visible. */
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1200;
    background: transparent;
    color: #062238; /* default darker-blue text for contrast */
  }

  .nav-dropdown-container {
    position: relative;
    display: inline-block;
  }
  
  /* Show the dropdown menu on hover */
  .nav-dropdown-container:hover .dropdown-menu {
    display: block;
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
  }
  
  .dropdown-arrow {
    transition: transform 0.2s ease;
  }
  
  .nav-dropdown-container:hover .dropdown-arrow {
    transform: rotate(180deg);
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    /* Translucent background so underlying section shows through */
    background: rgba(255,255,255,0.75);
    backdrop-filter: blur(6px);
    border-radius: 12px;
    box-shadow: 0 12px 30px rgba(3, 18, 34, 0.08);
    border: 1px solid rgba(255,255,255,0.12);
    padding: 0.6rem;
    list-style: none;
    min-width: 180px;
    z-index: 100;
    display: block;
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.2s ease,
      transform 0.2s ease,
      visibility 0.2s;
    color: #062238; /* dark blue text for contrast */
  }

  .dropdown-menu li {
    margin: 0;
    padding: 0;
  }

  .dropdown-menu li a {
    display: block;
    padding: 0.6rem 1rem;
    /* Darker blue for better contrast over translucent background */
    color: #062238;
    text-decoration: none;
    font-size: 0.88rem;
    font-weight: 500;
    border-radius: 8px;
    text-align: left;
    transition:
      background-color 0.15s ease,
      color 0.15s ease;
  }

  .dropdown-menu li a:hover {
    background-color: rgba(24,74,87,0.06);
    color: #184a57; /* keep blue accent on hover */
  }

  /* Responsive mobile toggle button styling */
  .menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    color: #1e293b;
    padding: 0.5rem;
    z-index: 1100;
    border-radius: 8px;
    transition: background-color 0.2s;
  }

  .menu-toggle:hover {
    background-color: #f1f5f9;
  }

  .menu-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.3);
    backdrop-filter: blur(4px);
    z-index: 999;
  }

  .mobile-only-action {
    display: none;
  }

  @media (max-width: 768px) {
    .menu-toggle {
      display: block;
    }

    .nav-actions {
      display: none !important;
    }

    .nav-links {
      display: flex !important; /* Override hero.css none display */
      visibility: hidden;
      flex-direction: column;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 290px;
      background: #ffffff;
      box-shadow: -10px 0 40px rgba(0, 0, 0, 0.1);
      padding: 6rem 2rem 2rem;
      gap: 1.5rem;
      z-index: 1000;
      transform: translateX(100%);
      transition:
        transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        visibility 0.3s;
      align-items: flex-start;
    }

    .nav-links.open {
      transform: translateX(0) !important;
      visibility: visible;
    }

    .nav-links li {
      width: 100%;
    }

    .nav-dropdown-container {
      width: 100%;
    }

    .dropdown-menu {
      position: static;
      transform: none;
      opacity: 1;
      visibility: visible;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      box-shadow: none;
      border: none;
      padding: 0.5rem 0 0 1rem;
      min-width: 0;
    }

    .dropdown-menu li a {
      padding: 0.5rem 0.8rem;
      font-size: 0.88rem;
    }

    .dropdown-arrow {
      display: none;
    }

    .mobile-only-action {
      display: block;
      margin-top: 1.5rem;
      border-top: 1px solid #e2e8f0;
      padding-top: 1.5rem;
    }

    .btn-login-mobile {
      display: block;
      width: 100%;
      text-align: center;
      padding: 0.8rem;
      background-color: #184a57;
      color: #ffffff;
      text-decoration: none;
      border-radius: 10px;
      font-weight: 600;
      font-size: 0.95rem;
      transition: background-color 0.2s;
    }

    .btn-login-mobile:hover {
      background-color: #123741;
    }
  }

  @media (max-width: 480px) {
    .nav-links {
      width: 100%; /* Fullscreen width drawer for extremely small phones */
    }
  }
</style>
