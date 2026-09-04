"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";

type HeroSlide = {
  name: string;
  type: string;
  eyebrow: string;
  headline: string;
  price: string;
  image: string;
  desktopImage?: string;
  video?: string;
  mobileVideo?: string;
  mobilePoster?: string;
  poster?: string;
  kineticLines?: string[];
  lettering?: {
    main: string;
    accent: string;
    note: string;
  };
  closingLogo?: boolean;
  duration?: number;
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
    headline: "Hecha para ser feliz.",
    price: "Hecha a mano",
    image: "/hero-full/davas-hero-nido-hq-poster.jpg",
    video: "/hero-full/davas-hero-nido-hq.mp4",
    mobileVideo: "/hero-full/davas-hero-nido-mobile-framed-hq.mp4",
    mobilePoster: "/hero-full/davas-hero-nido-mobile-framed-hq-poster.jpg",
    poster: "/hero-full/davas-hero-nido-hq-poster.jpg",
    lettering: {
      main: "Que el día",
      accent: "baje el ritmo.",
      note: "Tu lugar para volver a ti.",
    },
    duration: 9000,
    position: "nido",
    href: "https://artedavas.com/mecedoras",
    ctaLabel: "Ver Nido",
  },
  {
    name: "Kioto",
    type: "Banca zapatero",
    eyebrow: "Nueva colección Japón · Kioto",
    headline: "Todo lo que traes.\nTodo en su lugar.",
    price: "desde $420.000",
    image: "/hero-full/kioto.webp",
    desktopImage: "/hero-full/davas-hero-kioto-pc-v2.webp",
    lettering: {
      main: "Llegar y sentir",
      accent: "que todo encaja.",
      note: "Una bienvenida que ordena la casa.",
    },
    position: "kioto",
    href: "https://artedavas.com/bancas/banca-zapatero-kioto",
  },
  {
    name: "AKA",
    type: "Silla",
    eyebrow: "Nueva colección Japón · AKA",
    headline: "El color llama.\nEl tejido responde.",
    price: "$420.000",
    image: "/hero-full/davas-hero-aka-mobile.jpg",
    desktopImage: "/hero-full/davas-hero-aka-pattern-pc-4k.webp",
    lettering: {
      main: "Que tu casa",
      accent: "hable de ti.",
      note: "Color tejido a mano. Carácter en cada hilo.",
    },
    position: "aka",
    href: "https://artedavas.com/sillas/silla-aka",
  },
  {
    name: "Kanazawa",
    type: "Banca zapatero",
    eyebrow: "Nueva colección Japón · Kanazawa",
    headline: "Llegar. Soltar.\nVolver a casa.",
    price: "$550.000",
    image: "/hero-full/kanazawa.webp",
    desktopImage: "/hero-full/davas-hero-kanazawa-pc-v3.webp",
    lettering: {
      main: "La calma empieza",
      accent: "al llegar.",
      note: "Guardar. Sentarse. Volver a casa.",
    },
    position: "kanazawa",
    href: "https://artedavas.com/bancas/banca-zapatero-kanazawa",
  },
  {
    name: "Mecedoras",
    type: "DAVA'S",
    eyebrow: "Una historia hecha a mano",
    headline: "El oficio lleva nuestro nombre.",
    price: "Hechas en Bogotá",
    image: "/hero-full/davas-hero-mecedoras-cierre-v2-hq-poster.jpg",
    video: "/hero-full/davas-hero-mecedoras-cierre-v2-hq.mp4",
    mobileVideo: "/hero-full/davas-hero-mecedoras-cierre-v2-mobile-clean-hq.mp4",
    mobilePoster: "/hero-full/davas-hero-mecedoras-cierre-v2-mobile-clean-hq-poster.jpg",
    poster: "/hero-full/davas-hero-mecedoras-cierre-v2-hq-poster.jpg",
    closingLogo: true,
    duration: 16200,
    position: "mecedoras",
    href: "#catalogo",
    ctaLabel: "Seguir al catálogo",
    saveable: false,
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
    imageFit: "contain",
    embeddedCopy: false,
    weave: "Tejido lineal · vino y marfil",
    structure: "Tubo metálico · naranja",
    note: "El aro continuo define el respaldo y abraza el asiento.",
    href: "https://artedavas.com/sillas/silla-enso",
  },
  {
    name: "Nara",
    type: "Aparador",
    line: "El orden también puede ser una forma de belleza.",
    image: "/collection/nara-ambient-v2.webp",
    sketch: "/collection-sketch/nara-tecnico-v2.webp",
    sketchOrientation: "portrait",
    imageFit: "contain",
    embeddedCopy: false,
    weave: "Puertas tejidas · verde y crudo",
    structure: "Hierro · cubierta en madera",
    note: "La trama frontal guarda; la rejilla interior deja respirar cada objeto.",
    href: "https://artedavas.com/catalogo",
  },
  {
    name: "AKA",
    type: "Silla",
    line: "El color que no pide permiso.",
    image: "/collection/aka-ambient-v2.webp",
    sketch: "/collection-sketch/aka-tecnico.jpg",
    sketchOrientation: "portrait",
    imageFit: "contain",
    embeddedCopy: false,
    weave: "Precolombino · rojo y rosa",
    structure: "Metal · rojo",
    note: "Respaldo y asiento se leen como dos planos tejidos.",
    href: "https://artedavas.com/sillas/silla-aka",
  },
  {
    name: "Kasuri",
    type: "Banca",
    line: "Un patrón que convierte la llegada en un gesto propio.",
    image: "/collection/kasuri-ambient-v2.webp",
    sketch: "/collection-sketch/kasuri-tecnico-v2.webp",
    sketchOrientation: "portrait",
    imageFit: "contain",
    embeddedCopy: false,
    weave: "Patrón Kasuri · vino y crudo",
    structure: "Madera natural",
    note: "El dibujo recorre el asiento completo y remata cada extremo a mano.",
    href: "https://artedavas.com/catalogo",
  },
  {
    name: "Kioto",
    type: "Banca zapatero",
    line: "Todo lo que traes. Todo en su lugar.",
    image: "/hero-full/kioto.webp",
    sketch: "/collection-sketch/kioto-tecnico-v2.webp",
    sketchOrientation: "portrait",
    imageFit: "contain",
    embeddedCopy: false,
    weave: "Tejido lineal · azul marino",
    structure: "Metal · rojo",
    note: "Dos niveles reúnen asiento y almacenamiento en una estructura ligera.",
    href: "https://artedavas.com/bancas/banca-zapatero-kioto",
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
    ambient: "/catalog-exact/diamante-plus-ambiente-v2.webp",
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
  const heroVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
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
    const timer = window.setTimeout(() => setHeroActive((current) => (current + 1) % heroSlides.length), heroSlides[heroActive].duration ?? 7600);
    return () => window.clearTimeout(timer);
  }, [heroActive]);

  useEffect(() => {
    heroVideoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === heroActive) {
        video.currentTime = 0;
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
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
      <section className="full-hero" id="inicio" aria-label="Piezas destacadas de DAVA'S">
        <header className={`${menuOpen ? "home-header menu-is-open" : "home-header"}${hero.closingLogo ? " is-closing" : ""}`}>
          <button className="menu-toggle" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            <i /><i />
          </button>
          <nav className={menuOpen ? "home-nav is-open" : "home-nav"} aria-label="Navegación principal">
            <div className="mobile-menu-brand"><img src="/davas-logo-white.png" alt="DAVA'S Arte & Diseño" /><span>Arte hecho a mano en Bogotá</span></div>
            <button className="is-current" onClick={() => navigateTo("inicio")}>Inicio</button>
            <button onClick={() => { window.location.href = "/catalogo"; }}>Catálogo</button>
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
            <div className={`hero-image ${slide.position} ${slide.video ? "video-slide" : ""} ${index === heroActive ? "is-active" : ""}`} key={slide.name} aria-hidden={index !== heroActive}>
              {slide.video ? (
                <>
                  <picture aria-hidden="true">
                    {slide.mobilePoster && <source media="(max-width: 600px)" srcSet={slide.mobilePoster} />}
                    <img src={slide.poster ?? slide.image} alt="" />
                  </picture>
                  <video ref={(node) => { heroVideoRefs.current[index] = node; }} muted playsInline preload={index === 0 ? "auto" : "metadata"} aria-label={`${slide.type} ${slide.name}`}>
                    {slide.mobileVideo && <source media="(max-width: 600px)" src={slide.mobileVideo} type="video/mp4" />}
                    <source src={slide.video} type="video/mp4" />
                  </video>
                </>
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

        {hero.closingLogo ? (
          <div className="hero-closing-mark" aria-label="DAVA'S Arte & Diseño">
            <img src="/davas-logo-white.png" alt="DAVA'S Arte & Diseño" />
          </div>
        ) : hero.lettering ? (
          <div className={`hero-story hero-lettering hero-lettering-${hero.position}`} key={`copy-${hero.name}`}>
            <p><span />{hero.eyebrow}</p>
            <div className="hero-lettering-display">
              <strong>{hero.lettering.main}</strong>
              <em>{hero.lettering.accent}</em>
            </div>
            <small>{hero.lettering.note}</small>
          </div>
        ) : hero.kineticLines ? (
          <div className={`hero-story hero-story-cinematic hero-story-${hero.position}`} key={`copy-${hero.name}`}>
            <p><span />{hero.eyebrow}</p>
            <div className="hero-cinematic-words">{hero.kineticLines.map((line) => <strong key={line}>{line}</strong>)}</div>
          </div>
        ) : (
          <div className={`hero-story hero-story-${hero.position}`} key={`copy-${hero.name}`}>
            <p><span />{hero.eyebrow}</p>
            <h1>{hero.headline}</h1>
          </div>
        )}

        {!hero.closingLogo && (
          <div className={`hero-product hero-product-${hero.position}`} key={`product-${hero.name}`}>
            <div className="hero-product-line">
              <strong>{hero.type} {hero.name}</strong><i /><span>{hero.price}</span>
            </div>
            <div className="hero-product-actions">
              <a href={hero.href}>{hero.ctaLabel ?? "Ver esta pieza"} <span>→</span></a>
              {hero.saveable !== false && <button className={savedPieces.includes(hero.name) ? "hero-save is-saved" : "hero-save"} onClick={() => toggleSavedPiece(hero.name)} aria-label={savedPieces.includes(hero.name) ? `Quitar ${hero.name} de guardadas` : `Guardar ${hero.name}`} aria-pressed={savedPieces.includes(hero.name)}>♥</button>}
            </div>
          </div>
        )}

        <div className={`hero-pager${hero.closingLogo ? " is-closing" : ""}`} aria-label="Piezas destacadas">
          {heroSlides.map((slide, index) => (
            <button key={slide.name} className={index === heroActive ? "is-active" : ""} onClick={() => setHeroActive(index)} aria-label={`Ver ${slide.name}`} aria-current={index === heroActive ? "true" : undefined}>
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
        <button className={`hero-next${hero.closingLogo ? " is-closing" : ""}`} aria-label="Siguiente pieza" onClick={() => setHeroActive((heroActive + 1) % heroSlides.length)}>→</button>
      </section>

      <section className="catalog-studio" id="catalogo">
        <header className="catalog-heading" data-reveal="catalog-head">
          <div><p>Catálogo DAVA&apos;S <span>· 9 categorías</span></p><h2>Mírala sola. <em>Imagínala en casa.</em></h2></div>
          <a href="/catalogo"><span className="desktop-label">Ver catálogo completo</span><span className="mobile-label">Ver completo</span> →</a>
        </header>

        <div className="catalog-experience" data-reveal="catalog-stage">
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
          <p>Casas reales · opiniones reales</p>
          <h2>Así se ven<br /><em>en tu casa.</em></h2>
          <span className="community-line" />
          <p className="community-body">No son renders ni casas prestadas. Son piezas DAVA&apos;S viviendo con quienes las eligieron.</p>
          <div className="community-rating"><strong>4,9</strong><span>★★★★★</span><small>14 opiniones en Google</small></div>
          <div className="community-actions">
            <a href="https://www.google.com/maps/place/ARTE+DAVAS/@4.6377403,-74.0729988,20.25z/data=!4m14!1m7!3m6!1s0x8e3f9a367a613281:0x6354cc7a462445e0!2sARTE+DAVAS!8m2!3d4.6377589!4d-74.0728021!16s%2Fg%2F11l6l1nf5d!3m5!1s0x8e3f9a367a613281:0x6354cc7a462445e0!8m2!3d4.6377589!4d-74.0728021!16s%2Fg%2F11l6l1nf5d?entry=ttu&amp;g_ep=EgoyMDI2MDgzMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer">Leer reseñas →</a>
            <a href="https://wa.me/573005260637?text=Quiero%20compartir%20una%20foto%20de%20mi%20pieza%20DAVA%27S" target="_blank" rel="noreferrer">Compartir mi foto</a>
          </div>
          <div className="community-reviews" aria-label="Reseñas de clientes en Google">
            <blockquote>“Me restauraron una silla Acapulco de unos diez años. Quedó impecable, mejor que nueva.”<cite>Amelia Rey · Google</cite></blockquote>
            <blockquote>“Se nota la dedicación en cada detalle. Muy buenos acabados, atención y cumplimiento.”<cite>Danna Zharick · Google</cite></blockquote>
          </div>
        </div>
        <div className="community-gallery" aria-label="Fotografías reales de clientes DAVA'S">
          <figure><img src="/clients-real/casa-1-cocina.jpg" alt="Pieza DAVA'S en la cocina de un cliente" /><figcaption>Donde empieza el café de la mañana.</figcaption></figure>
          <figure><img src="/clients-real/casa-2-balcon-urbano.jpg" alt="Pieza DAVA'S en un balcón urbano" /></figure>
          <figure><img src="/clients-real/casa-3-balcon-jardin.jpg" alt="Pieza DAVA'S en un balcón jardín" /></figure>
          <figure><img src="/clients-real/casa-4-terraza.jpg" alt="Piezas DAVA'S en la terraza de un cliente" /></figure>
          <figure><img src="/clients-real/casa-5-patio.jpg" alt="Pieza DAVA'S en el patio de un cliente" /></figure>
        </div>
      </section>

      <section className="courses-banner" id="cursos">
        <div className="courses-compact">
          <div className="courses-compact-copy" data-reveal="left">
            <p>DAVA&apos;S Escuela de Tejido</p>
            <h2>Aprende el oficio.<br /><em>Teje tu primera pieza.</em></h2>
            <span>Puedes empezar solo con el curso o pedir el kit con estructura DAVA&apos;S, material y herramienta para practicar en casa.</span>
            <div className="courses-compact-actions">
              <a href="/cursos">Conocer el curso <b>→</b></a>
              <a href="https://wa.me/573005260637?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20el%20curso%20con%20kit%20de%20tejido%20DAVA%27S" target="_blank" rel="noreferrer">Pedir mi kit ↗</a>
            </div>
          </div>
          <figure className="courses-kit-card" data-reveal="right">
            <div className="courses-kit-image" role="img" aria-label="Kit con estructura DAVA'S, mimbre PVC en varios colores y herramienta básica" />
            <figcaption>
              <div><b>Curso + kit · Colombia</b><span>Estructura, mimbre PVC y herramienta básica.</span></div>
              <strong>Desde $450.000</strong>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="visit-us" id="visitanos">
        <img src="/home/showroom.webp" alt="Showroom DAVA'S en Bogotá" className="visit-bg" /><div className="visit-veil" />
        <div className="visit-label" data-reveal="left"><span>Taller & showroom · Bogotá</span><h2>Ven a<br /><em>probarla.</em></h2></div>
        <div className="visit-card" data-reveal="right">
          <p>Visítanos con cita</p><h3>Cra 21 #49–13</h3><div className="visit-hours">Lunes a sábado · Bogotá</div>
          <p className="visit-note">Hay cosas que una foto no cuenta: el peso de la estructura, la textura del hilo y cómo se siente una pieza cuando te sientas.</p>
          <div className="visit-actions"><a href="https://wa.me/573005260637" target="_blank" rel="noreferrer">Agendar visita</a><a href="https://www.google.com/maps/place/ARTE+DAVAS/@4.6377403,-74.0729988,20.25z/data=!4m14!1m7!3m6!1s0x8e3f9a367a613281:0x6354cc7a462445e0!2sARTE+DAVAS!8m2!3d4.6377589!4d-74.0728021!16s%2Fg%2F11l6l1nf5d!3m5!1s0x8e3f9a367a613281:0x6354cc7a462445e0!8m2!3d4.6377589!4d-74.0728021!16s%2Fg%2F11l6l1nf5d?entry=ttu&amp;g_ep=EgoyMDI2MDgzMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer">Ver en Maps ↗</a></div>
        </div>
      </section>

      <a className="whatsapp-float" href="https://wa.me/573005260637" target="_blank" rel="noreferrer" aria-label="Escribir a DAVA'S por WhatsApp">
        <svg className="whatsapp-glyph" aria-hidden="true" viewBox="0 0 32 32" fill="none">
          <path d="M16 4.25A11.34 11.34 0 0 0 6.3 21.46L4.8 27.75l6.48-1.44A11.34 11.34 0 1 0 16 4.25Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11.16 10.28c.27-.58.55-.59.8-.6h.68c.22 0 .58.09.88.77.3.68 1.03 2.52 1.12 2.7.09.19.15.4.03.63-.12.23-.18.37-.36.57-.18.2-.38.44-.54.59-.18.17-.37.36-.16.72.21.36.93 1.54 2 2.49a9.2 9.2 0 0 0 2.65 1.63c.33.17.53.14.73-.08.2-.23.84-.98 1.06-1.31.22-.34.44-.28.74-.17.3.11 1.94.91 2.27 1.08.33.17.55.25.63.39.08.14.08.81-.19 1.59-.27.78-1.57 1.49-2.16 1.58-.56.09-1.28.13-2.06-.12-.47-.15-1.08-.35-1.86-.69a15.67 15.67 0 0 1-6.18-5.46c-.47-.64-1.33-1.87-1.33-3.16 0-1.29.67-1.92.91-2.18Z" fill="currentColor" />
        </svg>
      </a>

      <footer className="home-footer" id="contacto">
        <div className="footer-opening"><img src="/davas-logo-white.png" alt="DAVA'S Arte & Diseño" /><h2>Tu casa no se parece a ninguna.<br /><em>Tu pieza tampoco.</em></h2></div>
        <div className="footer-grid">
          <div><p>Explora</p><a href="/catalogo">Catálogo completo</a><button onClick={() => goTo("coleccion")}>Colección Japón</button><a href="https://artedavas.com/taller">El taller</a><a href="/cursos">Cursos</a></div>
          <div><p>Visítanos</p><span>Cra 21 #49–13</span><span>Bogotá · Colombia</span><a href="https://www.google.com/maps/place/ARTE+DAVAS/@4.6377403,-74.0729988,20.25z/data=!4m14!1m7!3m6!1s0x8e3f9a367a613281:0x6354cc7a462445e0!2sARTE+DAVAS!8m2!3d4.6377589!4d-74.0728021!16s%2Fg%2F11l6l1nf5d!3m5!1s0x8e3f9a367a613281:0x6354cc7a462445e0!8m2!3d4.6377589!4d-74.0728021!16s%2Fg%2F11l6l1nf5d?entry=ttu&amp;g_ep=EgoyMDI2MDgzMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer">Abrir mapa ↗</a></div>
          <div><p>Hablemos</p><a href="https://wa.me/573005260637">WhatsApp · 300 526 0637</a><a href="https://artedavas.com">ARTEDAVAS.COM</a></div>
        </div>
        <div className="footer-bottom"><span>© DAVA&apos;S 2026 · Arte & Diseño</span><span>Hecho a mano en Bogotá</span><span>Colombia</span></div>
      </footer>
    </main>
  );
}
