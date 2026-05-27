// Shared shop UI — Cart drawer, product modal, checkout flow.
// Each landing creates its own state via useShop() and renders <ShopOverlays/>.
// Themed via the `theme` prop so each direction can style differently.

const { useState, useMemo, useEffect, useCallback } = React;

window.useShop = function useShop() {
  const [items, setItems] = useState([]); // {productId, presentId, qty}
  const [cartOpen, setCartOpen] = useState(false);
  const [modalProductId, setModalProductId] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(null); // null | 'ship' | 'pay' | 'done'
  const [order, setOrder] = useState(null);
  const [toast, setToast] = useState(null);

  const addItem = useCallback((productId, presentId, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.productId === productId && x.presentId === presentId);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + qty };
        return copy;
      }
      return [...prev, { productId, presentId, qty }];
    });
    const p = window.PRODUCTS.find((x) => x.id === productId);
    setToast(`${p.name} agregado`);
    setTimeout(() => setToast(null), 1800);
  }, []);

  const setQty = useCallback((idx, qty) => {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((_, i) => i !== idx);
      const copy = [...prev];
      copy[idx] = { ...copy[idx], qty };
      return copy;
    });
  }, []);

  const removeItem = useCallback((idx) => setItems((prev) => prev.filter((_, i) => i !== idx)), []);

  const subtotal = useMemo(
    () =>
      items.reduce((acc, it) => {
        const p = window.PRODUCTS.find((x) => x.id === it.productId);
        return acc + (p ? p.price * it.qty : 0);
      }, 0),
    [items],
  );

  const itemCount = useMemo(() => items.reduce((a, it) => a + it.qty, 0), [items]);

  const startCheckout = () => setCheckoutStep('ship');
  const completeOrder = (info) => {
    const orderNumber = 'OR-' + Math.random().toString(36).slice(2, 7).toUpperCase();
    setOrder({ number: orderNumber, items: [...items], subtotal, ...info });
    setCheckoutStep('done');
  };

  const buildOrderMessage = () => {
    const lines = [];
    lines.push('Hola Origin ☕ quiero pedir:');
    lines.push('');
    items.forEach((it) => {
      const p = window.PRODUCTS.find((x) => x.id === it.productId);
      const g = window.PRESENT_OPTIONS.find((x) => x.id === it.presentId);
      lines.push(`• ${it.qty}× ${p.name} — ${p.size} · ${g.label} — ${window.formatMXN(p.price * it.qty)}`);
    });
    lines.push('');
    lines.push(`Subtotal: ${window.formatMXN(subtotal)}`);
    lines.push('');
    lines.push('¿Me pasan datos para envio?');
    return lines.join('\n');
  };

  const sendToInstagram = useCallback(() => {
    if (items.length === 0) return;
    const msg = buildOrderMessage();
    try {
      if (navigator.clipboard) navigator.clipboard.writeText(msg);
    } catch (e) {}
    window.open('https://ig.me/m/origin_tfto', '_blank', 'noopener');
    setToast('Mensaje copiado — pégalo en el DM');
    setTimeout(() => setToast(null), 3500);
  }, [items, subtotal]);

  const resetShop = () => {
    setItems([]);
    setCheckoutStep(null);
    setCartOpen(false);
    setOrder(null);
  };

  return {
    items, cartOpen, setCartOpen,
    modalProductId, setModalProductId,
    checkoutStep, setCheckoutStep,
    order, toast,
    addItem, setQty, removeItem,
    subtotal, itemCount,
    startCheckout, completeOrder, resetShop,
    sendToInstagram, buildOrderMessage,
  };
};

// ── ProductModal ────────────────────────────────────────────────────────────
window.ProductModal = function ProductModal({ shop, theme }) {
  const product = window.PRODUCTS.find((p) => p.id === shop.modalProductId);
  const [present, setPresent] = useState('grano');
  const [qty, setQty] = useState(1);
  useEffect(() => {
    if (product) { setPresent('grano'); setQty(1); }
  }, [product?.id]);
  useEffect(() => {
    if (!product) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [!!product]);
  if (!product) return null;

  const closeModal = () => shop.setModalProductId(null);
  const handleAdd = () => {
    shop.addItem(product.id, present, qty);
    closeModal();
    setTimeout(() => shop.setCartOpen(true), 200);
  };

  return (
    <div className="shop-scrim" onClick={closeModal} style={{ '--bg': theme.surface, '--text': theme.text, '--accent': theme.accent }}>
      <div className="shop-modal" onClick={(e) => e.stopPropagation()} style={{ background: theme.surface, color: theme.text, borderRadius: theme.cardRadius, fontFamily: theme.body }}>
        <button className="shop-close" onClick={closeModal} aria-label="Cerrar">×</button>
        <div className="shop-modal-grid">
          <div className="shop-modal-img" style={{ background: present === 'molido' ? '#A8A199' : theme.accent, borderRadius: theme.cardRadius * 0.7 }}>
            <img src={product.bagImg} alt={product.name} />
            <span className="shop-modal-img-tag" style={{ background: theme.text, color: theme.surface, fontFamily: theme.body }}>
              {present === 'grano' ? 'GRANO ENTERO' : 'MOLIDO'}
            </span>
          </div>
          <div className="shop-modal-body">
            <div className="shop-eyebrow" style={{ fontFamily: theme.body, color: theme.muted }}>{product.eyebrow}</div>
            <h3 className="shop-modal-title" style={{ fontFamily: theme.display, color: theme.text }}>{product.name}</h3>
            <div className="shop-modal-meta">
              <span>{product.size}</span><span>·</span><span>{product.rinde}</span><span>·</span><span>{product.intensity}</span>
            </div>
            <p className="shop-modal-blurb">{product.blurb}</p>
            <div className="shop-notes">
              {product.notes.map((n) => (
                <span key={n} className="shop-chip" style={{ borderColor: theme.text }}>{n}</span>
              ))}
            </div>

            <div className="shop-field-label">Presentación</div>
            <div className="shop-grind">
              {window.PRESENT_OPTIONS.map((g) => (
                <button
                  key={g.id}
                  className={'shop-grind-btn ' + (present === g.id ? 'on' : '')}
                  onClick={() => setPresent(g.id)}
                  style={{
                    background: present === g.id ? theme.text : 'transparent',
                    color: present === g.id ? theme.surface : theme.text,
                    borderColor: theme.text,
                  }}
                >
                  <strong>{g.label}</strong>
                  <span>{g.sub}</span>
                </button>
              ))}
            </div>

            <div className="shop-qty-row">
              <div className="shop-qty">
                <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Menos">−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(qty + 1)} aria-label="Más">+</button>
              </div>
              <button
                className="shop-btn-primary"
                onClick={handleAdd}
                style={{ background: theme.text, color: theme.surface, fontFamily: theme.body }}
              >
                Agregar · {window.formatMXN(product.price * qty)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── CartDrawer ──────────────────────────────────────────────────────────────
window.CartDrawer = function CartDrawer({ shop, theme }) {
  useEffect(() => {
    if (!shop.cartOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [shop.cartOpen]);
  if (!shop.cartOpen) return null;
  return (
    <div className="shop-scrim" onClick={() => shop.setCartOpen(false)}>
      <aside className="shop-drawer" onClick={(e) => e.stopPropagation()} style={{ background: theme.surface, color: theme.text, fontFamily: theme.body }}>
        <div className="shop-drawer-hd">
          <h3 style={{ fontFamily: theme.display }}>Tu carrito</h3>
          <button className="shop-close" onClick={() => shop.setCartOpen(false)} aria-label="Cerrar">×</button>
        </div>

        {shop.items.length === 0 ? (
          <div className="shop-empty">
            <div className="shop-empty-mark" style={{ fontFamily: theme.display, color: theme.muted }}>∅</div>
            <p>Tu carrito está vacío.<br />Empieza por elegir tu bolsa.</p>
            <button
              className="shop-btn-primary"
              onClick={() => shop.setCartOpen(false)}
              style={{ background: theme.text, color: theme.surface }}
            >Ver el café</button>
          </div>
        ) : (
          <React.Fragment>
            <div className="shop-drawer-body">
              {shop.items.map((it, i) => {
                const p = window.PRODUCTS.find((x) => x.id === it.productId);
                const g = window.PRESENT_OPTIONS.find((x) => x.id === it.presentId);
                return (
                  <div key={i} className="shop-line">
                    <div className="shop-line-img" style={{ background: it.presentId === 'molido' ? '#A8A199' : theme.accent }}>
                      <img src={p.bagImg} alt="" />
                    </div>
                    <div className="shop-line-body">
                      <div className="shop-line-top">
                        <strong style={{ fontFamily: theme.display }}>{p.name}</strong>
                        <button className="shop-x-mini" onClick={() => shop.removeItem(i)} aria-label="Quitar">×</button>
                      </div>
                      <div className="shop-line-meta">{p.size} · {g.label}</div>
                      <div className="shop-line-bottom">
                        <div className="shop-qty shop-qty-sm">
                          <button onClick={() => shop.setQty(i, it.qty - 1)}>−</button>
                          <span>{it.qty}</span>
                          <button onClick={() => shop.setQty(i, it.qty + 1)}>+</button>
                        </div>
                        <span className="shop-line-price">{window.formatMXN(p.price * it.qty)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="shop-drawer-ft">
              <div className="shop-totals">
                <div><span>Subtotal</span><span>{window.formatMXN(shop.subtotal)}</span></div>
                <div className="shop-totals-sm"><span>Envío</span><span>Te lo cotizamos por DM</span></div>
              </div>
              <div className="shop-ig-howto" style={{ borderColor: theme.text, color: theme.text }}>
                <div className="shop-ig-howto-hd">
                  <IGIcon />
                  <strong>¿Cómo funciona?</strong>
                </div>
                <ol>
                  <li><span className="shop-ig-step">1</span> Le picas a <strong>Pedir por DM</strong>.</li>
                  <li><span className="shop-ig-step">2</span> Te copiamos tu pedido al portapapeles y te abrimos el chat de <strong>@origin_tfto</strong>.</li>
                  <li><span className="shop-ig-step">3</span> En el DM, <strong>pega el mensaje</strong> (mantén apretado → Pegar) y mándalo.</li>
                  <li><span className="shop-ig-step">4</span> Te contestamos con datos de envío y forma de pago. ✦</li>
                </ol>
              </div>
              <button
                className="shop-btn-primary shop-btn-block shop-btn-ig"
                onClick={() => { shop.setCartOpen(false); shop.sendToInstagram(); }}
                style={{ background: theme.text, color: theme.surface }}
              >
                <IGIcon /> Pedir por DM · {window.formatMXN(shop.subtotal)}
              </button>
              <button className="shop-link" onClick={() => shop.setCartOpen(false)}>Seguir comprando</button>
            </div>
          </React.Fragment>
        )}
      </aside>
    </div>
  );
};

// ── Checkout (multi-step) ───────────────────────────────────────────────────
window.Checkout = function Checkout({ shop, theme }) {
  const [ship, setShip] = useState({ name: '', email: '', address: '', city: '', cp: '', state: 'Veracruz' });
  const [pay, setPay] = useState({ card: '', exp: '', cvc: '', name: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!shop.checkoutStep) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [!!shop.checkoutStep]);

  if (!shop.checkoutStep) return null;

  const validShip = () => {
    const e = {};
    if (!ship.name.trim()) e.name = 'Falta tu nombre';
    if (!/^\S+@\S+\.\S+$/.test(ship.email)) e.email = 'Correo inválido';
    if (!ship.address.trim()) e.address = 'Falta dirección';
    if (!ship.city.trim()) e.city = 'Falta ciudad';
    if (!/^\d{5}$/.test(ship.cp)) e.cp = '5 dígitos';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validPay = () => {
    const e = {};
    if (ship.cp && !/^\d{14,19}$/.test(pay.card.replace(/\s/g, ''))) e.card = '14–19 dígitos';
    if (!/^\d{2}\/\d{2}$/.test(pay.exp)) e.exp = 'MM/AA';
    if (!/^\d{3,4}$/.test(pay.cvc)) e.cvc = '3–4 dígitos';
    if (!pay.name.trim()) e.name = 'Falta nombre';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const shipping = shop.subtotal >= 300 ? 0 : 89;
  const total = shop.subtotal + (shop.checkoutStep === 'done' ? (shop.order?.shipping || 0) : shipping);

  return (
    <div className="shop-scrim" onClick={() => shop.checkoutStep !== 'done' && shop.setCheckoutStep(null)}>
      <div className="shop-checkout" onClick={(e) => e.stopPropagation()} style={{ background: theme.surface, color: theme.text, fontFamily: theme.body }}>
        {shop.checkoutStep !== 'done' && (
          <button className="shop-close" onClick={() => shop.setCheckoutStep(null)} aria-label="Cerrar">×</button>
        )}

        {shop.checkoutStep !== 'done' && (
          <div className="shop-stepper">
            <div className={'shop-step ' + (shop.checkoutStep === 'ship' ? 'on' : 'done')}>
              <span className="shop-step-num">1</span><span>Envío</span>
            </div>
            <div className="shop-step-line" />
            <div className={'shop-step ' + (shop.checkoutStep === 'pay' ? 'on' : '')}>
              <span className="shop-step-num">2</span><span>Pago</span>
            </div>
            <div className="shop-step-line" />
            <div className="shop-step">
              <span className="shop-step-num">3</span><span>Listo</span>
            </div>
          </div>
        )}

        {shop.checkoutStep === 'ship' && (
          <div className="shop-checkout-body">
            <h3 style={{ fontFamily: theme.display }}>¿A dónde te lo mando?</h3>
            <div className="shop-form">
              <Field label="Nombre completo" value={ship.name} onChange={(v) => setShip({ ...ship, name: v })} err={errors.name} />
              <Field label="Correo" value={ship.email} onChange={(v) => setShip({ ...ship, email: v })} err={errors.email} type="email" />
              <Field label="Calle y número" value={ship.address} onChange={(v) => setShip({ ...ship, address: v })} err={errors.address} full />
              <Field label="Ciudad" value={ship.city} onChange={(v) => setShip({ ...ship, city: v })} err={errors.city} />
              <Field label="C.P." value={ship.cp} onChange={(v) => setShip({ ...ship, cp: v.replace(/\D/g, '').slice(0, 5) })} err={errors.cp} />
            </div>
            <div className="shop-checkout-ft">
              <div className="shop-checkout-summary">
                <span>{shop.itemCount} {shop.itemCount === 1 ? 'bolsa' : 'bolsas'}</span>
                <strong>{window.formatMXN(shop.subtotal + shipping)}</strong>
                <small>{shipping === 0 ? 'Envío gratis' : `+ ${window.formatMXN(shipping)} envío`}</small>
              </div>
              <button
                className="shop-btn-primary"
                onClick={() => validShip() && shop.setCheckoutStep('pay')}
                style={{ background: theme.text, color: theme.surface }}
              >Continuar al pago →</button>
            </div>
          </div>
        )}

        {shop.checkoutStep === 'pay' && (
          <div className="shop-checkout-body">
            <h3 style={{ fontFamily: theme.display }}>Confirma el pago</h3>
            <div className="shop-form">
              <Field label="Número de tarjeta" value={pay.card}
                onChange={(v) => setPay({ ...pay, card: v.replace(/\D/g, '').slice(0, 19).replace(/(.{4})/g, '$1 ').trim() })}
                err={errors.card} full placeholder="1234 5678 9012 3456" />
              <Field label="Vencimiento" value={pay.exp}
                onChange={(v) => {
                  const d = v.replace(/\D/g, '').slice(0, 4);
                  setPay({ ...pay, exp: d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d });
                }}
                err={errors.exp} placeholder="MM/AA" />
              <Field label="CVC" value={pay.cvc} onChange={(v) => setPay({ ...pay, cvc: v.replace(/\D/g, '').slice(0, 4) })} err={errors.cvc} />
              <Field label="Nombre en la tarjeta" value={pay.name} onChange={(v) => setPay({ ...pay, name: v })} err={errors.name} full />
            </div>
            <div className="shop-checkout-ft">
              <div className="shop-checkout-summary">
                <span>Total</span>
                <strong>{window.formatMXN(shop.subtotal + shipping)}</strong>
                <small>{shipping === 0 ? 'Envío gratis · 3–5 días' : 'Envío estándar · 3–5 días'}</small>
              </div>
              <div className="shop-checkout-actions">
                <button className="shop-link" onClick={() => shop.setCheckoutStep('ship')}>← Atrás</button>
                <button
                  className="shop-btn-primary"
                  onClick={() => validPay() && shop.completeOrder({ ship, shipping, total: shop.subtotal + shipping })}
                  style={{ background: theme.text, color: theme.surface }}
                >Pagar {window.formatMXN(shop.subtotal + shipping)}</button>
              </div>
            </div>
          </div>
        )}

        {shop.checkoutStep === 'done' && shop.order && (
          <div className="shop-checkout-body shop-done">
            <div className="shop-done-mark" style={{ background: theme.accent, color: theme.text, fontFamily: theme.display }}>✓</div>
            <h3 style={{ fontFamily: theme.display }}>¡Listo, {shop.order.ship.name.split(' ')[0]}!</h3>
            <p>Tu pedido <strong>#{shop.order.number}</strong> va camino a {shop.order.ship.city}. Te mandamos tracking en cuanto salga del tostador.</p>
            <div className="shop-done-summary">
              {shop.order.items.map((it, i) => {
                const p = window.PRODUCTS.find((x) => x.id === it.productId);
                const g = window.PRESENT_OPTIONS.find((x) => x.id === it.presentId);
                return (
                  <div key={i} className="shop-done-line">
                    <span>{it.qty}×</span>
                    <span>{p.name} · {g.label}</span>
                    <span>{window.formatMXN(p.price * it.qty)}</span>
                  </div>
                );
              })}
              <div className="shop-done-line shop-done-total">
                <span></span><span>Total {shop.order.shipping === 0 ? '(envío gratis)' : `+ ${window.formatMXN(shop.order.shipping)} envío`}</span>
                <strong>{window.formatMXN(shop.order.total)}</strong>
              </div>
            </div>
            <button className="shop-btn-primary" onClick={shop.resetShop} style={{ background: theme.text, color: theme.surface }}>
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

function IGIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ marginRight: 4, verticalAlign: '-2px', display: 'inline-block' }}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function Field({ label, value, onChange, err, type = 'text', full, placeholder }) {
  return (
    <label className={'shop-field ' + (full ? 'shop-field-full' : '') + (err ? ' shop-field-err' : '')}>
      <span>{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      {err && <em>{err}</em>}
    </label>
  );
}

// ── Toast ────────────────────────────────────────────────────────────────────
window.ShopToast = function ShopToast({ shop, theme }) {
  if (!shop.toast) return null;
  return (
    <div className="shop-toast" style={{ background: theme.text, color: theme.surface, fontFamily: theme.body }}>
      <span className="shop-toast-mark" style={{ background: theme.accent, color: theme.text }}>✓</span>
      {shop.toast} · <button onClick={() => shop.setCartOpen(true)} style={{ color: theme.surface }}>Ver carrito →</button>
    </div>
  );
};

// ── Combined overlay mount ─────────────────────────────────────────────────
window.ShopOverlays = function ShopOverlays({ shop, theme }) {
  return (
    <React.Fragment>
      <window.ProductModal shop={shop} theme={theme} />
      <window.CartDrawer shop={shop} theme={theme} />
      <window.Checkout shop={shop} theme={theme} />
      <window.ShopToast shop={shop} theme={theme} />
    </React.Fragment>
  );
};
