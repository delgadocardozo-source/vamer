/**
 * CMS ligero para VAMER: carga site-config.json o override en localStorage.
 * Claves: vamer_cms_site (JSON texto del sitio), vamer_cms_prices (JSON precios, se aplica en vamer.html).
 */
(function () {
    const STORAGE_SITE = "vamer_cms_site";
    const STORAGE_PRICES = "vamer_cms_prices";

    function fontLinkId() {
        return "vamer-cms-font-link";
    }

    function applyTypography(meta) {
        if (!meta || !meta.fontGoogleParam) return;
        const id = fontLinkId();
        let link = document.getElementById(id);
        if (!link) {
            link = document.createElement("link");
            link.id = id;
            link.rel = "stylesheet";
            document.head.appendChild(link);
        }
        link.href = "https://fonts.googleapis.com/css2?family=" + encodeURIComponent(meta.fontGoogleParam) + "&display=swap";
        const name = meta.fontName || "Inter";
        document.body.style.fontFamily = "'" + name.replace(/'/g, "") + "', ui-sans-serif, system-ui, sans-serif";
    }

    function setText(id, text) {
        const el = document.getElementById(id);
        if (el && text != null) el.textContent = text;
    }

    function setHtml(id, html) {
        const el = document.getElementById(id);
        if (el && html != null) el.innerHTML = html;
    }

    function setAttr(id, attr, val) {
        const el = document.getElementById(id);
        if (el && val != null) el.setAttribute(attr, val);
    }

    function metricToneClass(tone) {
        const map = {
            blue: "text-vamerBlue",
            emerald: "text-emerald-600",
            amber: "text-amber-600",
            rose: "text-rose-600"
        };
        return map[tone] || "text-vamerBlue";
    }

    function applySiteConfig(cfg) {
        window.__VAMER_SITE_CFG = cfg;

        if (cfg.meta && cfg.meta.pageTitle) document.title = cfg.meta.pageTitle;

        if (cfg.brand) {
            setText("cms-brand-name", cfg.brand.name);
            setText("cms-brand-tagline", cfg.brand.tagline);
        }
        if (cfg.nav) {
            setText("cms-nav-lotes", cfg.nav.lotes);
            setText("cms-nav-admin", cfg.nav.adminAccess);
            setText("cms-mobile-inicio", cfg.nav.mobileInicio);
            setText("cms-mobile-lotes", cfg.nav.mobileLotes);
            setText("cms-mobile-admin", cfg.nav.mobileAdmin);
            setText("cms-mobile-dashboard", cfg.nav.mobileDashboard);
            setText("cms-admin-nav-label", cfg.nav.adminNavLabel);
            setText("cms-mobile-admin-label", cfg.nav.adminNavLabel);
            setText("cms-cerrar-ses-nav", cfg.nav.cerrarSesion);
            setText("cms-mobile-cerrar", cfg.nav.cerrarSesion);
            setText("cms-avatar-txt", cfg.nav.adminAvatar);
        }

        if (cfg.hero) {
            const h = cfg.hero;
            setAttr("cms-hero-img", "src", h.image);
            setAttr("cms-hero-img", "alt", h.imageAlt || "");
            setText("cms-hero-mode-pres", h.modeTogglePresentation);
            setText("cms-hero-mode-leads", h.modeToggleLeads);
        }

        if (cfg.metrics && Array.isArray(cfg.metrics)) {
            cfg.metrics.forEach((m, i) => {
                setText("cms-metric-" + i + "-label", m.label);
                const valEl = document.getElementById("cms-metric-" + i + "-value");
                if (valEl) {
                    valEl.textContent = m.value;
                    valEl.className = "text-3xl font-black mt-2 " + metricToneClass(m.tone);
                }
            });
        }

        if (cfg.valueProp) {
            const v = cfg.valueProp;
            setText("cms-value-title", v.title);
            setText("cms-value-text", v.text);
            if (v.bullets && v.bullets.length) {
                v.bullets.forEach((b, i) => setText("cms-value-li-" + i, b));
            }
            setAttr("cms-value-img", "src", v.image);
            setAttr("cms-value-img", "alt", v.imageAlt || "");
        }

        if (cfg.encarnacion) {
            const e = cfg.encarnacion;
            setText("cms-enc-title", e.title);
            setText("cms-enc-intro", e.intro);
            const bg = document.getElementById("cms-encarnacion-bg");
            if (bg && e.backgroundImage) bg.style.backgroundImage = "url('" + e.backgroundImage.replace(/'/g, "") + "')";
            if (e.cards && e.cards.length) {
                e.cards.forEach((c, i) => {
                    setText("cms-enc-card-" + i + "-t", c.title);
                    setText("cms-enc-card-" + i + "-d", c.text);
                });
            }
        }

        if (cfg.legal) {
            const l = cfg.legal;
            setText("cms-legal-title", l.title);
            if (l.items) l.items.forEach((t, i) => setText("cms-legal-li-" + i, t));
            if (l.stats && l.stats.length) {
                l.stats.forEach((s, i) => {
                    setText("cms-legal-st-" + i + "-l", s.label);
                    setText("cms-legal-st-" + i + "-v", s.value);
                });
            }
        }

        if (cfg.testimonials) {
            const t = cfg.testimonials;
            setText("cms-testi-title", t.title);
            if (t.items) {
                t.items.forEach((it, i) => {
                    setText("cms-testi-" + i + "-q", it.quote);
                    setText("cms-testi-" + i + "-a", it.author);
                });
            }
        }

        if (cfg.lotesPage) {
            const lp = cfg.lotesPage;
            setText("cms-lotes-h", lp.title);
            setText("cms-lotes-sub", lp.subtitle);
            setText("cms-lotes-est-label", lp.estadoLabel);
            setText("cms-est-disp", lp.estadoDisponible);
            setText("cms-est-res", lp.estadoReservado);
            setText("cms-est-vend", lp.estadoVendido);
            setText("cms-lotes-sec-t", lp.sectionTitle);
            setText("cms-lotes-sec-h", lp.sectionHelp);
            setText("cms-price-t", lp.priceBlockTitle);
            setText("cms-price-h", lp.priceBlockHelp);
            setText("cms-lbl-manzana", lp.lblManzana);
            setText("cms-sum-lots-lbl", lp.summaryLots);
            setText("cms-sum-min-lbl", lp.summaryMin);
            setText("cms-sum-max-lbl", lp.summaryMax);
            setText("cms-sum-avg-lbl", lp.summaryAvg);
            const ths = lp.tableHeaders;
            if (ths && ths.length >= 6) {
                setText("cms-th-0", ths[0]);
                setText("cms-th-1", ths[1]);
                setText("cms-th-2", ths[2]);
                setText("cms-th-3", ths[3]);
                setText("cms-th-4", ths[4]);
                setText("cms-th-5", ths[5]);
            }
            window.__VAMER_COTIZAR_LABEL = lp.cotizar || "Cotizar";
            setText("cms-sim-title", lp.simTitle);
            setText("cms-sim-help", lp.simHelp);
            setText("cms-cuotero-empty", lp.cuoteroEmpty);
            setText("cms-lbl-lote-sel", lp.lblLoteSel);
            setText("cms-lbl-precio", lp.lblPrecio);
            setText("cms-lbl-plazo", lp.lblPlazo);
            setText("cms-lbl-tasa", lp.lblTasa);
            setText("cms-lbl-entrega", lp.lblEntrega);
            setText("cms-lbl-cuota", lp.lblCuota);
            setText("cms-cuota-nota", lp.cuotaNota);
            setText("cms-btn-contacto", lp.btnContacto);
        }

        if (cfg.loginPage) {
            const lg = cfg.loginPage;
            setText("cms-login-title", lg.title);
            setText("cms-login-sub", lg.subtitle);
            const u = document.getElementById("cms-login-user");
            const p = document.getElementById("cms-login-pass");
            if (u) u.placeholder = lg.userPlaceholder || "";
            if (p) p.placeholder = lg.passPlaceholder || "";
            setText("cms-login-submit", lg.submit);
            setText("cms-link-cms", lg.linkCmsLabel);
            setText("cms-link-cms-hint", lg.linkCmsHint);
        }

        if (cfg.footer) {
            const f = document.getElementById("cms-footer");
            if (f) f.textContent = "\u00A9 " + cfg.footer;
        }

        if (cfg.integration) {
            const wa = document.getElementById("cms-wa-link");
            if (wa && cfg.integration.whatsappUrl) wa.href = cfg.integration.whatsappUrl;
            window.__VAMER_WHATSAPP_LEADS = cfg.integration.whatsappLeadsUrl || cfg.integration.whatsappUrl;
        }

        if (cfg.adminDashboard) {
            const ad = cfg.adminDashboard;
            setText("cms-adm-title", ad.title);
            setText("cms-adm-subtitle", ad.subtitle);
            setText("cms-adm-cms-btn", ad.cmsLinkLabel);
            setText("cms-adm-demo-badge", ad.demoBadge);

            if (ad.kpiTop && Array.isArray(ad.kpiTop)) {
                ad.kpiTop.forEach((k, i) => {
                    setText("cms-adm-top-" + i + "-lbl", k.label);
                    setText("cms-adm-top-" + i + "-val", k.value);
                    setText("cms-adm-top-" + i + "-hint", k.hint);
                });
            }
            if (ad.kpiMid && Array.isArray(ad.kpiMid)) {
                ad.kpiMid.forEach((k, i) => {
                    setText("cms-adm-mid-" + i + "-lbl", k.label);
                    setText("cms-adm-mid-" + i + "-val", k.value);
                    setText("cms-adm-mid-" + i + "-hint", k.hint);
                });
            }

            if (ad.commissionistas) {
                const c = ad.commissionistas;
                setText("cms-adm-com-title", c.title);
                setText("cms-adm-com-report", c.reportButton);
                if (c.headers && Array.isArray(c.headers)) {
                    c.headers.forEach((h, i) => setText("cms-adm-com-th-" + i, h));
                }
                if (c.rows && Array.isArray(c.rows)) {
                    c.rows.forEach((row, r) => {
                        setText("cms-adm-com-" + r + "-name", row.name);
                        setText("cms-adm-com-" + r + "-sales", row.sales);
                        setText("cms-adm-com-" + r + "-comm", row.commission);
                        setText("cms-adm-com-" + r + "-status", row.status);
                    });
                }
            }

            if (ad.rubro) {
                const rb = ad.rubro;
                setText("cms-adm-rubro-title", rb.title);
                setText("cms-adm-rubro-note", rb.footnote);
                if (rb.boxes && Array.isArray(rb.boxes)) {
                    rb.boxes.forEach((b, i) => {
                        setText("cms-adm-rubro-" + i + "-lbl", b.label);
                        setText("cms-adm-rubro-" + i + "-val", b.value);
                    });
                }
            }
        }
    }

    function deepClone(o) {
        return JSON.parse(JSON.stringify(o));
    }

    function mergeArrays(targetArr, sourceArr) {
        if (!Array.isArray(sourceArr)) return deepClone(targetArr);
        if (!Array.isArray(targetArr) || targetArr.length === 0) return deepClone(sourceArr);
        const out = [];
        const max = Math.max(targetArr.length, sourceArr.length);
        for (let i = 0; i < max; i++) {
            const s = sourceArr[i],
                t = targetArr[i];
            if (s === undefined) {
                out[i] = deepClone(t);
                continue;
            }
            if (t === undefined) {
                out[i] = deepClone(s);
                continue;
            }
            if (s !== null && typeof s === "object" && !Array.isArray(s) && t !== null && typeof t === "object" && !Array.isArray(t)) {
                out[i] = deepMerge(t, s);
            } else {
                out[i] = deepClone(s);
            }
        }
        return out;
    }

    function deepMerge(target, source) {
        if (source === null || source === undefined) return deepClone(target);
        if (typeof source !== "object") return deepClone(source);
        if (Array.isArray(source)) return mergeArrays(Array.isArray(target) ? target : [], source);
        const base = target && typeof target === "object" && !Array.isArray(target) ? deepClone(target) : {};
        Object.keys(source).forEach(function (k) {
            const sv = source[k],
                tv = base[k];
            if (sv !== null && typeof sv === "object" && !Array.isArray(sv)) {
                base[k] = deepMerge(tv || {}, sv);
            } else if (Array.isArray(sv)) {
                base[k] = mergeArrays(Array.isArray(tv) ? tv : [], sv);
            } else {
                base[k] = sv;
            }
        });
        return base;
    }

    async function loadSiteConfig() {
        let baseline = null;
        try {
            const r = await fetch("data/site-config.json", { cache: "no-store" });
            if (r.ok) baseline = await r.json();
        } catch (e) {}
        let patch = null;
        const stored = localStorage.getItem(STORAGE_SITE);
        if (stored) {
            try {
                patch = JSON.parse(stored);
            } catch (e) {}
        }
        if (baseline && patch) return deepMerge(deepClone(baseline), patch);
        if (baseline) return baseline;
        if (patch) return patch;
        throw new Error("No se pudo cargar site-config (usa Live Server o subi data/site-config.json)");
    }

    window.VAMER_CMS = {
        STORAGE_SITE: STORAGE_SITE,
        STORAGE_PRICES: STORAGE_PRICES,
        loadSiteConfig: loadSiteConfig,
        applySiteConfig: applySiteConfig,
        applyTypography: applyTypography,
        async loadAndApply() {
            const cfg = await loadSiteConfig();
            applyTypography(cfg.meta);
            applySiteConfig(cfg);
        }
    };
})();
