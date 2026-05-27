// Direction A — "Sticker Pack"
// Maximalist coral/cream, oversized bubbly type, real product photography,
// stickers, marquee tagline. Full-bleed landing — optimized for mobile/iPhone.

window.LandingA = function LandingA({ tweaks }) {
  const shop = window.useShop();

  const theme = {
    bg: '#D88B70',
    bgDeep: '#B86A52',
    surface: '#FBF1DB',
    cream: '#F6E59A',
    accent: '#F6E59A',
    text: '#2A1A14',
    textInverse: '#FBF1DB',
    muted: 'rgba(42,26,20,0.6)',
    display: tweaks.typePair.display,
    body: tweaks.typePair.body,
    cardRadius: 24
  };

  const heroVariant = tweaks.heroA;

  return (
    <div className="landing-a" style={{ background: theme.bg, color: theme.text, fontFamily: theme.body }}>
      {/* NAV */}
      <header className="la-nav">
        <a className="la-nav-logo" href="#">
          <span className="la-dot" />
          ORIGIN <span className="la-nav-tagline">· the f*king true origin</span>
        </a>
        <nav className="la-nav-links">
          <a href="#productos">Productos</a>
          <a href="#origen">Origen</a>
          <a href="#diario">Diario</a>
          <a href="#tiendas">Tiendas</a>
        </nav>
        <div className="la-nav-actions">
          <a href="https://www.instagram.com/origin_tfto" target="_blank" rel="noopener" className="la-nav-pill">@origin_tfto</a>
          <button className="la-cart-btn" onClick={() => shop.setCartOpen(true)} aria-label="Carrito">
            <CartIcon />
            {shop.itemCount > 0 && <span className="la-cart-badge">{shop.itemCount}</span>}
          </button>
        </div>
      </header>

      {/* HERO */}
      {heroVariant === 'photo' && <HeroPhoto theme={theme} shop={shop} />}
      {heroVariant === 'marquee' && <HeroMarquee theme={theme} shop={shop} />}
      {heroVariant === 'jumbo' && <HeroJumbo theme={theme} shop={shop} />}

      {/* MARQUEE STRIP */}
      <section className="la-marquee-strip" style={{ borderTop: `2px solid ${theme.text}`, borderBottom: `2px solid ${theme.text}` }}>
        <div className="la-marquee-track" style={{ fontFamily: theme.display, color: theme.text }}>
          {Array.from({ length: 8 }).map((_, i) =>
            <React.Fragment key={i}>
              <span>The f*king true origin</span>
              <span className="la-marquee-star" style={{ color: theme.surface }}>✦</span>
              <span>Yecuatla, Veracruz</span>
              <span className="la-marquee-star" style={{ color: theme.surface }}>✦</span>
              <span>1200–1600 m.s.n.m</span>
              <span className="la-marquee-star" style={{ color: theme.surface }}>✦</span>
            </React.Fragment>
          )}
        </div>
      </section>

      {/* STICKER STRIP */}
      <section className="la-stickers" aria-label="Sellos" style={{ background: theme.bg }}>
        <span className="la-sticker la-sticker-1" style={{ background: theme.cream, color: theme.text, fontFamily: theme.display }}>
          1200–1600 m.s.n.m
        </span>
        <span className="la-sticker la-sticker-2" style={{ background: theme.text, color: theme.cream, fontFamily: theme.display }}>
          ★ Yecuatla ★
        </span>
        <span className="la-sticker la-sticker-3" style={{ background: theme.surface, color: theme.text, fontFamily: theme.display }}>
          tueste artesanal
        </span>
        <span className="la-sticker la-sticker-4" style={{ background: theme.cream, color: theme.text, fontFamily: theme.display }}>
          sin filtros · sin asteriscos
        </span>
        <span className="la-sticker la-sticker-5" style={{ background: theme.text, color: theme.cream, fontFamily: theme.display }}>
          grano · molido
        </span>
        <span className="la-sticker la-sticker-6" style={{ background: theme.surface, color: theme.text, fontFamily: theme.display }}>
          chingón de a deveras
        </span>
      </section>

      {/* PRODUCTS */}
      <section id="productos" className="la-products" style={{ background: theme.surface }}>
        <div className="la-products-hd">
          <div className="la-eyebrow" style={{ color: theme.text }}>· Tres bolsas · una verdad ·</div>
          <h2 className="la-products-title" style={{ fontFamily: theme.display, color: theme.text }}>
            Elige tu <em style={{ background: theme.bg, color: theme.surface }}>dosis</em>
          </h2>
          <p style={{ color: theme.muted, maxWidth: 580 }}>
            Mismo grano. Mismo tueste. Cambia el tamaño, no la integridad.
            Disponible en <strong>grano entero</strong> o <strong>molido</strong> — tú decides cómo le quieres entrar.
          </p>
        </div>

        <div className="la-products-grid">
          {window.PRODUCTS.map((p) =>
            <article key={p.id} className="la-product" style={{ background: theme.bg, '--accent': theme.cream }}>
              <div className="la-product-tag" style={{ background: theme.cream, color: theme.text, fontFamily: theme.display }}>
                {p.tag}
              </div>
              <div className="la-product-img">
                <img src={p.bagImg} alt={p.name} />
                <span className="la-product-size" style={{ fontFamily: theme.display, color: theme.text, background: theme.cream }}>
                  {p.size}
                </span>
              </div>
              <div className="la-product-body" style={{ color: theme.text }}>
                <div className="la-product-eyebrow">{p.eyebrow}</div>
                <h3 style={{ fontFamily: theme.display }}>{p.name}</h3>
                <p>{p.blurb}</p>
                <div className="la-product-meta-row">
                  <span className="la-product-meta-pill" style={{ borderColor: theme.text }}>
                    {p.rinde}
                  </span>
                  <span className="la-product-meta-pill" style={{ borderColor: theme.text }}>
                    Grano o molido
                  </span>
                </div>
                <div className="la-product-notes">
                  {p.notes.map((n) => <span key={n}>{n}</span>)}
                </div>
                <div className="la-product-foot">
                  <div className="la-product-price" style={{ fontFamily: theme.display }}>
                    {window.formatMXN(p.price)}
                  </div>
                  <button
                    className="la-product-cta"
                    onClick={() => shop.setModalProductId(p.id)}
                    style={{ background: theme.text, color: theme.cream, fontFamily: theme.display }}
                  >
                    Lo quiero →
                  </button>
                </div>
              </div>
            </article>
          )}
        </div>

        <div className="la-products-foot">
          <Squiggle color={theme.bgDeep} />
          <p style={{ fontFamily: theme.display, color: theme.text }}>
            Envío gratis desde $1200. <span style={{ background: theme.cream, padding: '2px 8px' }}>Sin pretextos.</span>
          </p>
        </div>
      </section>

      {/* BRAND BLOCK — Yecuatla = "lugar de las tres serpientes" */}
      <section id="origen" className="la-brand" style={{ background: theme.bg }}>
        <div className="la-brand-img la-brand-img-snakes">
          <img src="assets/snakes.png" alt="Tres serpientes con tazas de café — Yecuatla en náhuatl" />
        </div>
        <div className="la-brand-text" style={{ color: theme.text }}>
          <div className="la-eyebrow" style={{ color: theme.text }}>· Origen ·</div>
          <h2 style={{ fontFamily: theme.display, color: theme.surface }}>
            Yecuatla:<br />
            <span style={{ color: theme.cream }}>lugar de las<br />tres serpientes.</span>
          </h2>
          <p>
            Origin es un café proveniente de <strong>Yecuatla, Veracruz</strong>,
            cultivado entre los <strong>1200 y 1600 m.s.n.m</strong>. Su nombre,
            que en náhuatl significa <em>"lugar de las tres serpientes"</em>,
            refleja una tierra de ríos, montañas y gran biodiversidad que dan
            forma a un café lleno de carácter.
          </p>
          <p style={{ opacity: 0.85 }}>
            <strong>Fragancia y aroma:</strong> medio-alto, con notas de
            piloncillo, almendra y chocolate.<br />
            <strong>Retrogusto:</strong> duradero, con toques de caramelo y nuez tostada.
          </p>
          <div className="la-brand-stats" style={{ fontFamily: theme.display }}>
            <div>
              <strong style={{ color: theme.surface }}>1200–1600m</strong>
              <span>altitud</span>
            </div>
            <div>
              <strong style={{ color: theme.surface }}>Arábica</strong>
              <span>varietal</span>
            </div>
            <div>
              <strong style={{ color: theme.surface }}>4/5</strong>
              <span>intensidad</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="la-footer" style={{ background: theme.text, color: theme.cream }}>
        <img src="assets/carriers.png" alt="" className="la-foot-illo" aria-hidden />
        <div className="la-foot-mega" style={{ fontFamily: theme.display }}>ORIGIN</div>
        <div className="la-foot-grid">
          <div>
            <small>Síguenos</small>
            <a href="https://www.instagram.com/origin_tfto" target="_blank" rel="noopener">@origin_tfto</a>
            <a href="mailto:contacto@origin.cafe">contacto@origin.cafe</a>
          </div>
          <div>
            <small>Tienda</small>
            <a href="#">Productos</a>
            <a href="#">Envíos</a>
            <a href="#">Mayoreo</a>
          </div>
          <div>
            <small>Origen</small>
            <a href="#">Yecuatla, Veracruz</a>
            <a href="#">Tres serpientes</a>
            <a href="#">El tueste</a>
          </div>
          <div className="la-foot-quote">
            <em>"The f*king true origin."</em>
          </div>
        </div>
        <div className="la-foot-base">
          <span>© 2025 Café ORIGIN</span>
          <span>Hecho con amor (y café) en Veracruz, Méx.</span>
        </div>
      </footer>

      <window.ShopOverlays shop={shop} theme={theme} />
    </div>
  );
};

// ── Hero variants ──────────────────────────────────────────────────────────

function HeroPhoto({ theme }) {
  return (
    <section className="la-hero la-hero-clean">
      <div className="la-clean-eyebrow" style={{ fontFamily: theme.body, color: theme.text }}>
        · Café veracruzano · Yecuatla · 1200–1600 m.s.n.m ·
      </div>
      <h1 className="la-clean-title" style={{ fontFamily: theme.display, color: theme.surface }}>
        ORIGIN<span style={{ color: theme.cream }}>.</span>
      </h1>
      <p className="la-clean-sub" style={{ fontFamily: theme.display, color: theme.text }}>
        <span style={{ color: theme.cream, background: theme.text, padding: '0 14px', borderRadius: 8, display: 'inline-block', transform: 'rotate(-1.5deg)' }}>The f*king true origin</span>
      </p>
      <div className="la-clean-foot">
        <p style={{ color: theme.text, fontFamily: theme.body }}>
          Café de altura cultivado en la sierra de Yecuatla, Veracruz.
          <strong> Tres tamaños · grano o molido.</strong> Sin filtros, sin pretensiones, sin asteriscos.
        </p>
        <button
          className="la-hero-cta"
          onClick={() => document.getElementById('productos')?.scrollIntoView?.({ behavior: 'smooth' })}
          style={{ background: theme.text, color: theme.surface, fontFamily: theme.display }}
        >
          Pídelo ahora →
        </button>
      </div>
    </section>
  );
}

function HeroMarquee({ theme }) {
  const letters = ['O', 'R', 'I', 'G', 'I', 'N'];
  const rowRef = React.useRef(null);

  React.useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const h1 = row.querySelector('.la-mega');
    if (!h1) return;

    const fit = () => {
      const cs = window.getComputedStyle(h1);
      const tmp = document.createElement('span');
      tmp.style.cssText = `font-family:${cs.fontFamily};font-weight:${cs.fontWeight};letter-spacing:${cs.letterSpacing};font-size:200px;visibility:hidden;position:fixed;top:-9999px;left:-9999px;white-space:nowrap;`;
      tmp.textContent = 'ORIGIN.';
      document.body.appendChild(tmp);
      const w = tmp.offsetWidth;
      document.body.removeChild(tmp);
      if (!w) return;
      h1.style.fontSize = Math.floor(window.innerWidth / w * 200) + 'px';
    };

    document.fonts.ready.then(fit);
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  return (
    <section className="la-hero la-hero-marquee">
      <div className="la-hero-eyebrow la-anim-fade-down" style={{ fontFamily: theme.body, color: theme.text }}>
        · Café veracruzano · Tostado en lotes · Desde 2025 ·
      </div>

      <span className="la-hero-float la-hero-float-1" style={{ background: theme.cream, color: theme.text, fontFamily: theme.display }}>
        ★ Yecuatla
      </span>
      <span className="la-hero-float la-hero-float-2" style={{ background: theme.text, color: theme.cream, fontFamily: theme.display }}>
        1200–1600 m.s.n.m
      </span>
      <span className="la-hero-float la-hero-float-3" style={{ background: theme.surface, color: theme.text, fontFamily: theme.display }}>
        nuevo lote
      </span>

      <div className="la-mega-row" ref={rowRef}>
        <h1 className="la-mega" style={{ fontFamily: theme.display, color: theme.surface }} aria-label="ORIGIN.">
          {letters.map((ch, i) => (
            <span
              key={i}
              className="la-mega-letter"
              style={{ animationDelay: `${0.15 + i * 0.08}s` }}
              aria-hidden
            >
              {ch}
            </span>
          ))}
          <span className="la-mega-dot" style={{ color: theme.cream }} aria-hidden>.</span>
        </h1>
      </div>

      <div className="la-hero-foot la-anim-fade-up">
        <p style={{ color: theme.text, fontFamily: theme.body }}>
          Café de altura cultivado en la sierra de Yecuatla, Veracruz. Sin filtros,
          sin pretensiones, sin asteriscos. <strong>Solo grano honesto.</strong>
        </p>
        <button
          className="la-hero-cta"
          onClick={() => document.getElementById('productos')?.scrollIntoView?.({ behavior: 'smooth' })}
          style={{ background: theme.text, color: theme.surface, fontFamily: theme.display }}
        >
          Pídelo ahora →
        </button>
      </div>
    </section>
  );
}

function HeroJumbo({ theme }) {
  return (
    <section className="la-hero la-hero-jumbo">
      <div className="la-jumbo-stack">
        <div className="la-jumbo-line la-jumbo-line-1" style={{ fontFamily: theme.display, color: theme.surface }}>
          sin filtros.
        </div>
        <div className="la-jumbo-line la-jumbo-line-2" style={{ fontFamily: theme.display, color: theme.cream }}>
          sin pretextos.
        </div>
        <div className="la-jumbo-line la-jumbo-line-3" style={{ fontFamily: theme.display, color: theme.text }}>
          puro café.
        </div>
        <div className="la-jumbo-bag">
          <img src="assets/bag-1kg.png" alt="" />
        </div>
      </div>
      <div className="la-hero-foot">
        <p style={{ color: theme.text, fontFamily: theme.body }}>
          Café arábica veracruzano. <strong>Yecuatla, 1200–1600 m.s.n.m.</strong>
          Tostado en lotes pequeños y vendido sin asteriscos.
        </p>
        <button
          className="la-hero-cta"
          onClick={() => document.getElementById('productos')?.scrollIntoView?.({ behavior: 'smooth' })}
          style={{ background: theme.text, color: theme.surface, fontFamily: theme.display }}
        >
          Probarlo →
        </button>
      </div>
    </section>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
    </svg>
  );
}

function Squiggle({ color }) {
  return (
    <svg viewBox="0 0 320 16" width="180" height="14" preserveAspectRatio="none" aria-hidden>
      <path d="M0 8 Q 20 0 40 8 T 80 8 T 120 8 T 160 8 T 200 8 T 240 8 T 280 8 T 320 8" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
