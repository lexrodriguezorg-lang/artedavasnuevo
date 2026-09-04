"use client";

import { useState } from "react";
import "./catalogo.css";

type CatalogView = "studio" | "ambient";
type CatalogCategory = { name: string; featured: string; detail: string; studio: string; ambient: string; href: string };

const categories: CatalogCategory[] = [
  { name: "Mecedoras", featured: "Nido", detail: "30 piezas · desde $300.000", studio: "/catalog-exact/nido-pieza.jpg", ambient: "/catalog-exact/nido-ambiente.jpg", href: "https://artedavas.com/mecedoras" },
  { name: "Sillas", featured: "Silla tejida", detail: "73 piezas · desde $250.000", studio: "/catalog-exact/silla-tejida-geometrica-pieza.webp", ambient: "/catalog-exact/silla-tejida-geometrica-ambiente.jpg", href: "https://artedavas.com/sillas" },
  { name: "Comedores", featured: "Comedor tejido", detail: "58 piezas · desde $780.000", studio: "/catalog-exact/comedor-tejido-pieza.jpg", ambient: "/catalog-exact/comedor-tejido-ambiente.jpg", href: "https://artedavas.com/comedores" },
  { name: "Conjuntos", featured: "Pavo Real Plus", detail: "19 piezas · desde $800.000", studio: "/catalog-exact/pavo-real-plus-combo-pieza.jpg", ambient: "/catalog-exact/pavo-real-plus-combo-ambiente.jpg", href: "https://artedavas.com/combos" },
  { name: "Mesas", featured: "Angola 3", detail: "36 piezas · desde $200.000", studio: "/catalog-exact/angola-3-pieza.jpg", ambient: "/catalog-exact/angola-3-ambiente.jpg", href: "https://artedavas.com/mesas" },
  { name: "Sofás", featured: "Diamante Plus", detail: "22 piezas · desde $550.000", studio: "/catalog-exact/diamante-plus-pieza.jpg", ambient: "/catalog-exact/diamante-plus-ambiente-v2.webp", href: "https://artedavas.com/sofas" },
  { name: "Percheros", featured: "Rama Teca", detail: "2 piezas · desde $300.000", studio: "/catalog-exact/rama-teca-pieza.jpg", ambient: "/catalog-exact/rama-teca-ambiente.jpg", href: "https://artedavas.com/percheros" },
  { name: "Sillas Bar", featured: "París", detail: "47 piezas · desde $200.000", studio: "/catalog-exact/paris-bar-pieza.jpg", ambient: "/catalog-exact/paris-bar-ambiente.jpg", href: "https://artedavas.com/sillas-bar" },
  { name: "Bancos", featured: "Kioto", detail: "6 piezas · desde $420.000", studio: "/catalog-exact/kioto-pieza.jpg", ambient: "/catalog-exact/kioto-ambiente.jpg", href: "https://artedavas.com/bancas" },
  { name: "Recibidores y espejos", featured: "Akari", detail: "1 pieza · desde $980.000", studio: "/collection/akari-ambient.jpg", ambient: "/collection/akari.webp", href: "https://artedavas.com/catalogo" },
];

export default function CatalogoPage() {
  const [active, setActive] = useState(0);
  const [view, setView] = useState<CatalogView>("studio");
  const item = categories[active];

  const choose = (index: number) => { setActive(index); setView("studio"); };
  const move = (step: number) => choose((active + step + categories.length) % categories.length);

  return (
    <main className="catalog-page">
      <header className="catalog-page-header">
        <nav aria-label="Navegación principal">
          <a href="/">Inicio</a><a className="is-current" href="/catalogo">Catálogo</a><a href="/#coleccion">Colección Japón</a><a href="/cursos">Cursos</a><a href="/#clientes">Clientes</a><a href="/#taller">Taller</a><a href="/#visitanos">Showroom</a>
        </nav>
        <a className="catalog-logo" href="/" aria-label="Volver al inicio"><img src="/davas-logo-white.png" alt="DAVA'S Arte & Diseño" /></a>
      </header>

      <section className="catalog-intro">
        <div><p>El catálogo · DAVA&apos;S · 2026</p><h1>Elige una categoría.</h1></div>
        <p>Diez formas de encontrar la pieza que va a vivir contigo.</p>
      </section>

      <section className="catalog-browser" aria-label="Categorías del catálogo DAVA'S">
        <nav className="catalog-category-index" aria-label="Elegir categoría">
          {categories.map((category, index) => (
            <button className={active === index ? "is-active" : ""} key={category.name} onClick={() => choose(index)} aria-current={active === index ? "true" : undefined}>
              <span>{String(index + 1).padStart(2, "0")}</span><strong>{category.name}</strong><small>{category.featured}</small>
            </button>
          ))}
        </nav>

        <div className={`catalog-focus is-${view}`} key={item.name}>
          <div className="catalog-focus-media">
            <img className="catalog-focus-studio" src={item.studio} alt={`${item.featured}, producto de ${item.name}`} />
            <img className="catalog-focus-ambient" src={item.ambient} alt={`${item.featured} en ambiente`} />
            <div className="catalog-view-switch" aria-label="Cambiar presentación">
              <button className={view === "studio" ? "is-active" : ""} onClick={() => setView("studio")}><span>01</span> La pieza</button>
              <button className={view === "ambient" ? "is-active" : ""} onClick={() => setView("ambient")}><span>02</span> En ambiente</button>
            </div>
          </div>

          <article className="catalog-focus-copy">
            <span>{String(active + 1).padStart(2, "0")} · {item.featured}</span>
            <h2>{item.name}</h2><p>{item.detail}</p>
            <a href={item.href}>Entrar a {item.name.toLowerCase()} →</a>
          </article>

          <div className="catalog-mobile-arrows" aria-label="Navegar categorías">
            <button onClick={() => move(-1)} aria-label="Categoría anterior">←</button><span>{active + 1} / {categories.length}</span><button onClick={() => move(1)} aria-label="Siguiente categoría">→</button>
          </div>
        </div>
      </section>
    </main>
  );
}
