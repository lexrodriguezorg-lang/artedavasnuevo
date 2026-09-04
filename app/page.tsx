"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";

type HeroSlide = {
  name: string;
  type: string;
  eyebrow: string;
  headline: string;
  subheadline?: string;
  price: string;
  image: string;
  desktopImage?: string;
  video?: string;
  poster?: string;
  position: string;
  href: string;
  ctaLabel?: string;
  saveable?: boolean;
};

const heroSlides: HeroSlide[] = [
  {
    name: "Nido",
    type: "Mecedora",
    eyebrow: "Nido · Tejida a mano",
    headline: "Que el día\nbaje el ritmo.",
    subheadline: "Tu lugar para volver a ti.",
    price: "Hecha a mano",
    image: "/catalog-exact/nido-ambiente.jpg",
    position: "nido",
    href: "https://artedavas.com/mecedoras",
    ctaLabel: "Ver Nido",
  },
  {
    name: "Kioto",
    type: "Banca zapatero",
    eyebrow: "Nueva colección Japón · Kioto",
    headline: "La bienvenida a casa\nempieza aquí.",
    price: "desde $420.000",
    image: "/hero-full/kioto.webp",
    desktopImage: "/hero-full/davas-hero-kioto-pc-v2.webp",
    position: "kioto",
    href: "https://artedavas.com/bancas/banca-zapatero-kioto",
  },
  {
    name: "Ensō",
    type: "Silla",
    eyebrow: "Nueva colección Japón · Ensō",
    headline: "Una forma libre.\nUn lugar propio.",
    price: "$360.000",
    image: "/hero-full/davas-hero-enso-mobile.jpg",
    desktopImage: "/hero-full/davas-hero-enso-pc.jpg",
    position: "enso",
    href: "https://artedavas.com/sillas/silla-enso",
  },
  {
    name: "AKA",
    type: "Silla",
    eyebrow: "Nueva colección Japón · AKA",
    headline: "El color que no\npide permiso.",
    price: "$420.000",
    image: "/hero-full/davas-hero-aka-mobile.jpg",
    desktopImage: "/hero-full/davas-hero-aka-pattern-pc.jpg",
    position: "aka",
    href: "https://artedavas.com/sillas/silla-aka",
  },
  {
    name: "Kanazawa",
    type: "Banca zapatero",
    eyebrow: "Nueva colección Japón · Kanazawa",
    headline: "Llegar también\nes parte de habitar.",
    price: "$550.000",
    image: "/hero-full/kanazawa.webp",
    desktopImage: "/hero-full/davas-hero-kanazawa-pc-v3.webp",
    position: "kanazawa",
    href: "https://artedavas.com/bancas/banca-zapatero-kanazawa",
  },
];

const collectionSlides = [
  {
    name: "Ensō",
    type: "Silla",
    line: "Una forma libre. Un lugar propio.",
    image: "/collection/davas-silla-enso-ambientada-limpia.jpg",
    sketch: "/collection-sketch/enso-tecnico.jpg",
    sketchOrientation: "portrait",
    imageFit: "cover",
    embeddedCopy: false,
    weave: "Tejido lineal · vino y marfil",
    structure: "Tubo metálico · naranja",
    note: "El aro continuo define el respaldo y abraza el asiento.",
    href: "https://artedavas.com/sillas/silla-enso",
  },
  {
    name: "AKA",
    type: "Silla",
    line: "El color que no pide permiso.",
    image: "/hero-full/davas-hero-aka-pattern-pc.jpg",
    sketch: "/collection-sketch/aka-tecnico.jpg",
    sketchOrientation: "portrait",
    imageFit: "cover",
    embeddedCopy: false,
    weave: "Precolombino · rojo y rosa",
    structure: "Metal · rojo",
    note: "Respaldo y asiento se leen como dos planos tejidos.",
    href: "https://artedavas.com/sillas/silla-aka",
  },
  {
    name: "Kioto",
    type: "Banca zapatero",
    line: "La bienvenida empieza en los detalles.",
    image: "/hero-full/davas-hero-kioto-pc-v2.webp",
    sketch: "/collection-sketch/kioto-organico.jpg",
    sketchOrientation: "landscape",
    imageFit: "cover",
    embeddedCopy: false,
    weave: "Mimbre PVC · azul",
    structure: "Metal · rojo",
    note: "Tres alturas: asiento, bandeja y base para organizar la llegada.",
    href: "https://artedavas.com/bancas/banca-zapatero-kioto-precolombino",
  },
  {
    name: "Kanazawa",
    type: "Banca zapatero",
    line: "Llegar también es parte de habitar.",
    image: "/hero-full/davas-hero-kanazawa-pc-v3.webp",
    sketch: "/collection-sketch/kanazawa-organico.jpg",
    sketchOrientation: "landscape",
    imageFit: "cover",
    embeddedCopy: false,
    weave: "Mimbre PVC · natural",
    structure: "Hierro · madera",
    note: "El asiento tejido remata dos niveles abiertos para calzado.",
    href: "https://artedavas.com/bancas/banca-zapatero-kanazawa",
  },
  {
    name: "Genkan",
    type: "Combo recibidor",
    line: "Antes de entrar, la casa ya te recibe.",
    image: "/collection/genkan-story.jpg",
    sketch: "/collection-sketch/genkan-tecnico.jpg",
    sketchOrientation: "portrait",
    imageFit: "contain",
    embeddedCopy: true,
    weave: "Kasuri, Mori y Akari · marfil y vino",
    structure: "Madera y metal",
    note: "Tres piezas pensadas como un recibidor completo.",
    href: "https://artedavas.com/catalogo",
  },
];

type CatalogView = "studio" | "ambient";

const catalogEntries: Array<{
  name: string;
  featured: string;
  studio?: string;
  ambient?: string;
  ambientSurface: string;
  defaultView: CatalogView;
  href: string;
}> = [
  {
    name: "Mecedoras",
    featured: "Nido",
    studio: "/catalog-exact/nido-pieza.jpg",
    ambient: "/catalog-exact/nido-ambiente.jpg",
    ambientSurface: "#d8cab8",
    defaultView: "studio",
    href: "https://artedavas.com/mecedoras",
  },
  {
    name: "Sillas",
    featured: "Silla tejida",
    studio: "/catalog-exact/silla-tejida-geometrica-pieza.png",
    ambient: "/catalog-exact/silla-tejida-geometrica-ambiente.jpg",
    ambientSurface: "#b99b77",
    defaultView: "studio",
    href: "https://artedavas.com/sillas",
  },
  {
    name: "Comedores",
    featured: "Comedor tejido",
    studio: "/catalog-exact/comedor-tejido-pieza.jpg",
    ambient: "/catalog-exact/comedor-tejido-ambiente.jpg",
    ambientSurface: "#cfb98d",
    defaultView: "studio",
    href: "https://artedavas.com/comedores",
  },
  {
    name: "Combos",
    featured: "Pavo Real Plus",
    studio: "/catalog-exact/pavo-real-plus-combo-pieza.jpg",
    ambient: "/catalog-exact/pavo-real-plus-combo-ambiente.jpg",
    ambientSurface: "#74644a",
    defaultView: "studio",
    href: "https://artedavas.com/combos",
  },
  {
    name: "Mesas",
    featured: "Angola 3",
    studio: "/catalog-exact/angola-3-pieza.jpg",
    ambient: "/catalog-exact/angola-3-ambiente.jpg",
    ambientSurface: "#a18b6c",
    defaultView: "studio",
    href: "https://artedavas.com/mesas",
  },
  {
    name: "Sofás",
    featured: "Diamante Plus",
    studio: "/catalog-exact/diamante-plus-pieza.jpg",
    ambient: "/catalog-exact/diamante-plus-ambiente.jpg",
    ambientSurface: "#c9a57d",
    defaultView: "studio",
    href: "https://artedavas.com/sofas",
  },
  {
    name: "Percheros",
    featured: "Rama Teca",
    studio: "/catalog-exact/rama-teca-pieza.jpg",
    ambient: "/catalog-exact/rama-teca-ambiente.jpg",
    ambientSurface: "#d5c9b7",
    defaultView: "studio",
    href: "https://artedavas.com/percheros",
  },
  {
    name: "Sillas Bar",
    featured: "París",
    studio: "/catalog-exact/paris-bar-pieza.jpg",
    ambient: "/catalog-exact/paris-bar-ambiente.jpg",
    ambientSurface: "#8b6b47",
    defaultView: "studio",
    href: "https://artedavas.com/sillas-bar",
  },
  {
    name: "Bancos",
    featured: "Kioto",
    studio: "/catalog-exact/kioto-pieza.jpg",
    ambient: "/catalog-exact/kioto-ambiente.jpg",
    ambientSurface: "#826e5d",
    defaultView: "studio",
    href: "https://artedavas.com/bancas",
  },
];

const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

type CollectionPiece = (typeof collectionSlides)[number];

function DesignNotes({ piece }: { piece: CollectionPiece }) {
  if (piece.name === "Yūyake") {
    return (
      <div className="design-sheet design-sheet-yuyake">
        <div className="yuyake-sheet-head"><span>DAVA&apos;S · CUADERNO 03</span><span>COLECCIÓN JAPÓN</span></div>
        <div className="yuyake-sheet-title"><small>SILLA · ESTUDIO DE FORMA</small><strong>Yūyake</strong></div>
        <div className="yuyake-study-art"><img src={piece.sketch} alt="Estudio dibujado de la silla circular Yūyake" /></div>
        <p className="yuyake-main-note">Un aro continuo sostiene respaldo y asiento sin cerrar la silueta.</p>
        <div className="yuyake-materials">
          <span><b>TEJIDO</b> Marfil · azul · naranja</span>
          <span><b>ESTRUCTURA</b> Tubo metálico · azul</span>
          <span><b>MEDIDAS</b> Validar con ficha de taller</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`design-sheet design-sheet-${piece.sketchOrientation}`}>
      <img src={piece.sketch} alt={`Lámina completa de diseño de ${piece.name}`} />
    </div>
  );
}

export default function Home() {
  const [heroActive, setHeroActive] = useState(0);
  const [collectionActive, setCollectionActive] = useState(0);
  const [collectionDirection, setCollectionDirection] = useState<"next" | "prev">("next");
  const [menuOpen, setMenuOpen] = useState(false);
  const [collectionVisible, setCollectionVisible] = useState(false);
  const [catalogActive, setCatalogActive] = useState(0);
  const [catalogView, setCatalogView] = useState<CatalogView>(catalogEntries[0].defaultView);
  const [mobileNotesOpen, setMobileNotesOpen] = useState(false);
  const [savedPieces, setSavedPieces] = useState<string[]>([]);
  const collectionRef = useRef<HTMLElement>(null);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("davas-saved-pieces");
    if (stored) {
      try {
        const validNames = new Set(heroSlides.filter((slide) => slide.saveable !== false).map((slide) => slide.name));
        setSavedPieces((JSON.parse(stored) as string[]).filter((name) => validNames.has(name)));
      } catch { setSavedPieces([]); }
    }
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const delay = heroSlides[heroActive].video ? 15000 : 7200;
    const timer = window.setTimeout(() => setHeroActive((current) => (current + 1) % heroSlides.length), delay);
    return () => window.clearTimeout(timer);
  }, [heroActive]);

  useEffect(() => {
    const section = collectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setCollectionVisible(entry.isIntersecting), { threshold: 0.22 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting)),
      { threshold: 0.12, rootMargin: "0px 0px -5%" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const turnCollection = (step: number) => {
    setCollectionDirection(step > 0 ? "next" : "prev");
    setMobileNotesOpen(false);
    setCollectionActive((current) => (current + step + collectionSlides.length) % collectionSlides.length);
  };

  const navigateTo = (id: string) => {
    setMenuOpen(false);
    window.setTimeout(() => goTo(id), 360);
  };

  const onMagazineTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStart.current = event.touches[0]?.clientX ?? null;
  };

  const onMagazineTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStart.current === null) return;
    const distance = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
    if (Math.abs(distance) > 48) turnCollection(distance < 0 ? 1 : -1);
    touchStart.current = null;
  };

  const chooseCatalog = (index: number) => {
    setCatalogActive(index);
    setCatalogView(catalogEntries[index].defaultView);
  };

  const toggleSavedPiece = (name: string) => {
    setSavedPieces((current) => {
      const next = current.includes(name) ? current.filter((piece) => piece !== name) : [...current, name];
      window.localStorage.setItem("davas-saved-pieces", JSON.stringify(next));
      return next;
    });
  };

  const hero = heroSlides[heroActive];
  const catalogItem = catalogEntries[catalogActive];

  useEffect(() => {
    const next = catalogEntries[(catalogActive + 1) % catalogEntries.length];
    [next.studio, next.ambient].filter(Boolean).forEach((source) => {
      const image = new window.Image();
      image.src = source!;
    });
  }, [catalogActive]);

  return (
    <main>
      <section className="full-hero" id="inicio" aria-label="Piezas destacadas de la Colección Japón">
        <header className={menuOpen ? "home-header menu-is-open" : "home-header"}>
          <button className="menu-toggle" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            <i /><i />
          </button>
          <nav className={menuOpen ? "home-nav is-open" : "home-nav"} aria-label="Navegación principal">
            <div className="mobile-menu-brand"><img src="/davas-logo-white.png" alt="DAVA'S Arte & Diseño" /><span>Arte hecho a mano en Bogotá</span></div>
            <button className="is-current" onClick={() => navigateTo("inicio")}>Inicio</button>
            <button onClick={() => navigateTo("catalogo")}>Catálogo</button>
            <button onClick={() => navigateTo("coleccion")}>Colección Japón</button>
            <button className="nav-courses" onClick={() => { window.location.href = "/cursos"; }}>Cursos <span>Nuevo</span></button>
            <button onClick={() => navigateTo("taller")}>Taller</button>
            <button onClick={() => navigateTo("visitanos")}>Showroom</button>
            <div className="mobile-menu-saved">
              <p>Mis piezas guardadas</p>
              {savedPieces.length ? <div>{savedPieces.map((name) => <button key={name} onClick={() => { setHeroActive(heroSlides.findIndex((slide) => slide.name === name)); navigateTo("inicio"); }}>♥ {name}</button>)}</div> : <span>Toca el corazón de una pieza para encontrarla aquí.</span>}
            </div>
          </nav>
          <img src="/davas-logo-white.png" alt="DAVA'S Arte & Diseño" className="home-logo" />
        </header>

        <div className="hero-images" aria-live="polite">
          {heroSlides.map((slide, index) => (
            <div className={`hero-image ${slide.position} ${index === heroActive ? "is-active" : ""}`} key={slide.name} aria-hidden={index !== heroActive}>
              {slide.video && index === heroActive ? (
                <video autoPlay muted loop playsInline preload={index === 0 ? "auto" : "metadata"} poster={slide.poster} aria-label={`${slide.type} ${slide.name}`}>
                  <source src={slide.video} type="video/mp4" />
                </video>
              ) : slide.video ? (
                <img src={slide.poster ?? slide.image} alt={`${slide.type} ${slide.name}`} />
              ) : slide.desktopImage ? (
                <picture>
                  <source media="(min-width: 901px)" srcSet={slide.desktopImage} />
                  <img src={slide.image} alt={`${slide.type} ${slide.name}`} />
                </picture>
              ) : <img src={slide.image} alt={`${slide.type} ${slide.name}`} />}
            </div>
          ))}
        </div>
        <div className={`hero-veil hero-veil-${hero.position}`} />

        <div className={`hero-story hero-story-${hero.position}`} key={`copy-${hero.name}`}>
          <p><span />{hero.eyebrow}</p>
          <h1>{hero.headline}</h1>
          {hero.subheadline && <small>{hero.subheadline}</small>}
        </div>

        <div className="hero-product" key={`product-${hero.name}`}>
          <div className="hero-product-line">
            <strong>{hero.type} {hero.name}</strong><i /><span>{hero.price}</span>
          </div>
          <div className="hero-product-actions">
            <a href={hero.href}>{hero.ctaLabel ?? "Ver esta pieza"} <span>→</span></a>
            {hero.saveable !== false && <button className={savedPieces.includes(hero.name) ? "hero-save is-saved" : "hero-save"} onClick={() => toggleSavedPiece(hero.name)} aria-label={savedPieces.includes(hero.name) ? `Quitar ${hero.name} de guardadas` : `Guardar ${hero.name}`} aria-pressed={savedPieces.includes(hero.name)}>♥</button>}
          </div>
        </div>

        <div className="hero-pager" aria-label="Piezas destacadas">
          {heroSlides.map((slide, index) => (
            <button key={slide.name} className={index === heroActive ? "is-active" : ""} onClick={() => setHeroActive(index)} aria-label={`Ver ${slide.name}`} aria-current={index === heroActive ? "true" : undefined}>
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
        <button className="hero-next" aria-label="Siguiente pieza" onClick={() => setHeroActive((heroActive + 1) % heroSlides.length)}>→</button>
      </section>

      <section className="catalog-studio" id="catalogo">
        <header className="catalog-heading" data-reveal="up">
          <div><p>Catálogo DAVA&apos;S <span>· 9 categorías</span></p><h2>Mírala sola. <em>Imagínala en casa.</em></h2></div>
          <a href="https://artedavas.com/catalogo"><span className="desktop-label">Ver catálogo completo</span><span className="mobile-label">Ver completo</span> →</a>
        </header>

        <div className="catalog-experience" data-reveal="up">
          <div className="catalog-canvas-stack">
            <div className={`catalog-canvas is-active is-${catalogView} catalog-item-${catalogActive}`} key={catalogItem.name} style={{ "--ambient-surface": catalogItem.ambientSurface } as React.CSSProperties}>
              {catalogItem.studio && <img className="catalog-studio-image" src={catalogItem.studio} alt={`${catalogItem.featured} sobre fondo blanco`} decoding="sync" fetchPriority="high" />}
              {catalogItem.ambient && <img className="catalog-ambient-backdrop" src={catalogItem.ambient} alt="" aria-hidden="true" decoding="async" />}
              {catalogItem.ambient && <img className="catalog-ambient-image" src={catalogItem.ambient} alt={`${catalogItem.featured} en ambiente`} decoding="sync" fetchPriority="high" />}

              <div className="catalog-view-switch" aria-label="Cambiar presentación">
                {catalogItem.studio && <button className={catalogView === "studio" ? "is-active" : ""} onClick={() => setCatalogView("studio")}><span>01</span> La pieza</button>}
                {catalogItem.ambient && <button className={catalogView === "ambient" ? "is-active" : ""} onClick={() => setCatalogView("ambient")}><span>{catalogItem.studio ? "02" : "01"}</span> En ambiente</button>}
              </div>

              <div className="catalog-current"><span>{catalogItem.featured}</span><h3>{catalogItem.name}</h3><a href={catalogItem.href}>Entrar a {catalogItem.name.toLowerCase()} →</a></div>
            </div>
          </div>

          <nav className="catalog-index" aria-label="Categorías del catálogo">
            {catalogEntries.map((item, index) => (
              <button className={index === catalogActive ? "is-active" : ""} key={item.name} onClick={() => chooseCatalog(index)}>
                <span>{String(index + 1).padStart(2, "0")}</span><strong>{item.name}</strong><i>{item.featured}</i>
              </button>
            ))}
          </nav>
          <button className="catalog-mobile-next" aria-label="Mostrar la siguiente categoría" onClick={() => chooseCatalog((catalogActive + 1) % catalogEntries.length)}>→</button>
        </div>
      </section>

      <section className={`magazine-stage ${collectionVisible ? "is-open" : ""}`} id="coleccion" ref={collectionRef} onTouchStart={onMagazineTouchStart} onTouchEnd={onMagazineTouchEnd}>
        <div className="magazine-cover cover-left" aria-hidden="true"><span>COLECCIÓN</span></div>
        <div className="magazine-cover cover-right" aria-hidden="true"><span>JAPÓN</span></div>

        <div className={`magazine-spread ${mobileNotesOpen ? "notes-open" : ""}`}>
          {collectionSlides.map((item, index) => {
            const isActive = index === collectionActive;
            return (
              <div className={`magazine-slide ${isActive ? `is-active turn-${collectionDirection}` : ""}`} key={item.name} aria-hidden={!isActive}>
                <article className="magazine-page magazine-copy-page">
                  <DesignNotes piece={item} />
                </article>

                <article className={`magazine-page magazine-image-page ${item.embeddedCopy ? "story-page" : ""}`}>
                  <div className={`magazine-product-visual fit-${item.imageFit}`}><img src={item.image} alt={`${item.type} ${item.name}`} /></div>
                  <div className={`magazine-finished-copy ${item.embeddedCopy ? "is-embedded" : ""}`}>
                    {!item.embeddedCopy && <><span>{item.type}</span><h2>{item.name}</h2><p>{item.line}</p></>}
                    <div className="magazine-finished-actions"><button onClick={() => setMobileNotesOpen(true)} tabIndex={isActive ? 0 : -1}>Abrir apuntes</button><a href={item.href} tabIndex={isActive ? 0 : -1}>Conocer esta pieza →</a></div>
                  </div>
                  <div className={isActive && mobileNotesOpen ? "mobile-notes-drawer is-open" : "mobile-notes-drawer"} aria-hidden={!isActive || !mobileNotesOpen}>
                    <button className="mobile-notes-close" onClick={() => setMobileNotesOpen(false)} tabIndex={isActive ? 0 : -1}>Cerrar ×</button>
                    <DesignNotes piece={item} />
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        <button className="magazine-arrow prev" aria-label="Página anterior" onClick={() => turnCollection(-1)}>←</button>
        <button className="magazine-arrow next" aria-label="Página siguiente" onClick={() => turnCollection(1)}>→</button>

        <nav className="magazine-index" aria-label="Índice de la colección">
          {collectionSlides.map((item, index) => (
            <button key={item.name} className={index === collectionActive ? "is-active" : ""} onClick={() => { setCollectionDirection(index > collectionActive ? "next" : "prev"); setMobileNotesOpen(false); setCollectionActive(index); }} aria-label={`Abrir página de ${item.name}`}>
              <span>{String(index + 1).padStart(2, "0")}</span><strong>{item.name}</strong>
            </button>
          ))}
        </nav>
      </section>

      <section className="workshop-story" id="taller">
        <div className="workshop-message" data-reveal="left">
          <p>Diseño a medida · Taller propio</p>
          <h2>¿Lo imaginaste?<br /><em>Lo hacemos.</em></h2>
          <div className="workshop-line" />
          <blockquote>Taller propio en Bogotá: hierro, pintura electrostática, madera y tejido a mano. Elige la forma, cambia el color o tráenos una idea.</blockquote>
          <div className="workshop-actions"><a href="https://artedavas.com/taller">Conocer el taller →</a><a href="https://wa.me/573005260637" target="_blank" rel="noreferrer">Hablar de una pieza</a></div>
        </div>

        <div className="workshop-images" data-reveal="right">
          <figure className="workshop-hero-image"><img src="/home/taller-artesanos.webp" alt="Artesanos de DAVA'S trabajando en el taller" /><figcaption>Diseño · manos · oficio</figcaption></figure>
          <figure className="workshop-small-image one"><img src="/home/taller-orgulloso.webp" alt="Artesano de DAVA'S" /></figure>
          <figure className="workshop-small-image two"><img src="/home/taller-tejido.webp" alt="Detalle de tejido hecho a mano" /></figure>
        </div>
      </section>

      <section className="community-stories" id="clientes">
        <div className="community-copy" data-reveal="left">
          <p>Historias en casa</p>
          <h2>Las piezas siguen<br /><em>viviendo contigo.</em></h2>
          <span className="community-line" />
          <p className="community-body">Queremos reunir las fotos reales de quienes ya hicieron una pieza DAVA&apos;S parte de su casa. Cada historia puede entrar a esta galería.</p>
          <a href="https://wa.me/573005260637?text=Quiero%20compartir%20una%20foto%20de%20mi%20pieza%20DAVA%27S" target="_blank" rel="noreferrer">Compartir mi foto →</a>
        </div>
        <div className="community-gallery" aria-label="Galería de piezas DAVA'S en casa">
          <figure><img src="/catalog-ambient/davas-mecedoras-en-casa.jpg" alt="Mecedora DAVA'S en un espacio habitado" /><figcaption>Una pieza, una casa, una historia.</figcaption></figure>
          <figure><img src="/catalog-ambient/davas-sillas-en-casa.jpg" alt="Sillas DAVA'S en una casa" /></figure>
          <figure><img src="/catalog-ambient/davas-bancos-en-casa.webp" alt="Banco DAVA'S en casa" /></figure>
        </div>
      </section>

      <section className="courses-story" id="cursos">
        <div className="courses-image"><img src="/home/taller-tejido.webp" alt="Tejido a mano en el taller DAVA'S" /></div>
        <div className="courses-copy">
          <p>Escuela DAVA&apos;S · El oficio se comparte</p>
          <h2>Aprende a tejer.<br /><em>Llévate el Kit.</em></h2>
          <p>Conoce el material, aprende el patrón y continúa el proceso en casa con el Kit de tejido DAVA&apos;S. La página completa de Cursos se incorporará después.</p>
          <a href="/cursos">Conocer Escuela y Kit →</a>
        </div>
      </section>

      <section className="visit-us" id="visitanos">
        <img src="/home/showroom.webp" alt="Showroom DAVA'S en Bogotá" className="visit-bg" /><div className="visit-veil" />
        <div className="visit-label" data-reveal="left"><span>Taller & showroom · Bogotá</span><h2>Ven a<br /><em>probarla.</em></h2></div>
        <div className="visit-card" data-reveal="right">
          <p>Visítanos con cita</p><h3>Cra 21 #49–13</h3><div className="visit-hours">Lunes a sábado · Bogotá</div>
          <p className="visit-note">Hay cosas que una foto no cuenta: el peso de la estructura, la textura del hilo y cómo se siente una pieza cuando te sientas.</p>
          <div className="visit-actions"><a href="https://wa.me/573005260637" target="_blank" rel="noreferrer">Agendar visita</a><a href="https://www.google.com/maps/search/Carrera+21+%2349-13+Bogot%C3%A1+Colombia" target="_blank" rel="noreferrer">Ver en Maps ↗</a></div>
        </div>
      </section>

      <footer className="home-footer">
        <div className="footer-opening"><img src="/davas-logo-white.png" alt="DAVA'S Arte & Diseño" /><h2>Tu casa no se parece a ninguna.<br /><em>Tu pieza tampoco.</em></h2></div>
        <div className="footer-grid">
          <div><p>Explora</p><a href="https://artedavas.com/catalogo">Catálogo completo</a><button onClick={() => goTo("coleccion")}>Colección Japón</button><a href="https://artedavas.com/taller">El taller</a><a href="/cursos">Cursos</a></div>
          <div><p>Visítanos</p><span>Cra 21 #49–13</span><span>Bogotá · Colombia</span><a href="https://www.google.com/maps/search/Carrera+21+%2349-13+Bogot%C3%A1+Colombia">Abrir mapa ↗</a></div>
          <div><p>Hablemos</p><a href="https://wa.me/573005260637">WhatsApp · 300 526 0637</a><a href="https://artedavas.com">ARTEDAVAS.COM</a></div>
        </div>
        <div className="footer-bottom"><span>© DAVA&apos;S 2026 · Arte & Diseño</span><span>Hecho a mano en Bogotá</span><span>Colombia</span></div>
      </footer>
    </main>
  );
}
