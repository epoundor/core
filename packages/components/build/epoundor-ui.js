var st = Object.defineProperty;
var rt = (e, s, o) => s in e ? st(e, s, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[s] = o;
var T = (e, s, o) => rt(e, typeof s != "symbol" ? s + "" : s, o);
import { reactive as Fe, ref as N, watch as Ie, onMounted as he, onBeforeUnmount as nt, computed as S, defineComponent as $, useAttrs as at, createElementBlock as v, createCommentVNode as Y, openBlock as b, mergeProps as We, createElementVNode as h, renderSlot as x, normalizeClass as R, mergeModels as ie, useModel as Z, toDisplayString as P, withDirectives as lt, vModelDynamic as it, createBlock as j, resolveDynamicComponent as Me, withCtx as A, unref as le, createVNode as ye, Fragment as X, renderList as Q, createTextVNode as He, watchEffect as ct } from "vue";
const Ne = 1024, dt = () => {
  const e = Fe({
    width: window.innerWidth,
    height: window.innerHeight
  }), s = N(!1), o = () => {
    e.width = window.innerWidth, e.height = window.innerHeight;
  };
  Ie(
    () => e.width,
    () => e.width <= Ne - 1 ? (s.value = !0, null) : (s.value = !1, null)
  );
  function t() {
    e.width <= Ne - 1 ? s.value = !0 : s.value = !1;
  }
  return he(() => {
    t(), window.addEventListener("resize", o);
  }), nt(() => {
    window.removeEventListener("resize", o);
  }), { windowSize: e, isOnMobileDevice: s };
}, ut = (e) => {
  const s = S(() => e.totalItems.value), o = e.currentPage, t = e.pageSize, r = S(
    () => Math.ceil(s.value / t.value)
  ), a = S(() => (o.value - 1) * t.value), n = S(
    () => Math.min(o.value * t.value, s.value) - 1
  ), u = S(() => o.value < r.value), c = S(() => o.value > 1);
  function g(w) {
    w < 1 || w > r.value || (o.value = w);
  }
  function f() {
    g(o.value + 1), console.log("nextPage", o.value);
  }
  function k() {
    g(o.value - 1);
  }
  return {
    totalItems: s,
    currentPage: o,
    pageSize: t,
    totalPages: r,
    startIndex: a,
    endIndex: n,
    isNextEnabled: u,
    isPreviousEnabled: c,
    setPage: g,
    nextPage: f,
    previousPage: k
  };
}, $e = "-", mt = (e) => {
  const s = ft(e), {
    conflictingClassGroups: o,
    conflictingClassGroupModifiers: t
  } = e;
  return {
    getClassGroupId: (n) => {
      const u = n.split($e);
      return u[0] === "" && u.length !== 1 && u.shift(), qe(u, s) || pt(n);
    },
    getConflictingClassGroupIds: (n, u) => {
      const c = o[n] || [];
      return u && t[n] ? [...c, ...t[n]] : c;
    }
  };
}, qe = (e, s) => {
  var n;
  if (e.length === 0)
    return s.classGroupId;
  const o = e[0], t = s.nextPart.get(o), r = t ? qe(e.slice(1), t) : void 0;
  if (r)
    return r;
  if (s.validators.length === 0)
    return;
  const a = e.join($e);
  return (n = s.validators.find(({
    validator: u
  }) => u(a))) == null ? void 0 : n.classGroupId;
}, Ge = /^\[(.+)\]$/, pt = (e) => {
  if (Ge.test(e)) {
    const s = Ge.exec(e)[1], o = s == null ? void 0 : s.substring(0, s.indexOf(":"));
    if (o)
      return "arbitrary.." + o;
  }
}, ft = (e) => {
  const {
    theme: s,
    classGroups: o
  } = e, t = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const r in o)
    ze(o[r], t, r, s);
  return t;
}, ze = (e, s, o, t) => {
  e.forEach((r) => {
    if (typeof r == "string") {
      const a = r === "" ? s : je(s, r);
      a.classGroupId = o;
      return;
    }
    if (typeof r == "function") {
      if (bt(r)) {
        ze(r(t), s, o, t);
        return;
      }
      s.validators.push({
        validator: r,
        classGroupId: o
      });
      return;
    }
    Object.entries(r).forEach(([a, n]) => {
      ze(n, je(s, a), o, t);
    });
  });
}, je = (e, s) => {
  let o = e;
  return s.split($e).forEach((t) => {
    o.nextPart.has(t) || o.nextPart.set(t, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), o = o.nextPart.get(t);
  }), o;
}, bt = (e) => e.isThemeGetter, gt = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let s = 0, o = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  const r = (a, n) => {
    o.set(a, n), s++, s > e && (s = 0, t = o, o = /* @__PURE__ */ new Map());
  };
  return {
    get(a) {
      let n = o.get(a);
      if (n !== void 0)
        return n;
      if ((n = t.get(a)) !== void 0)
        return r(a, n), n;
    },
    set(a, n) {
      o.has(a) ? o.set(a, n) : r(a, n);
    }
  };
}, Ce = "!", Se = ":", ht = Se.length, vt = (e) => {
  const {
    prefix: s,
    experimentalParseClassName: o
  } = e;
  let t = (r) => {
    const a = [];
    let n = 0, u = 0, c = 0, g;
    for (let y = 0; y < r.length; y++) {
      let z = r[y];
      if (n === 0 && u === 0) {
        if (z === Se) {
          a.push(r.slice(c, y)), c = y + ht;
          continue;
        }
        if (z === "/") {
          g = y;
          continue;
        }
      }
      z === "[" ? n++ : z === "]" ? n-- : z === "(" ? u++ : z === ")" && u--;
    }
    const f = a.length === 0 ? r : r.substring(c), k = wt(f), w = k !== f, E = g && g > c ? g - c : void 0;
    return {
      modifiers: a,
      hasImportantModifier: w,
      baseClassName: k,
      maybePostfixModifierPosition: E
    };
  };
  if (s) {
    const r = s + Se, a = t;
    t = (n) => n.startsWith(r) ? a(n.substring(r.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: n,
      maybePostfixModifierPosition: void 0
    };
  }
  if (o) {
    const r = t;
    t = (a) => o({
      className: a,
      parseClassName: r
    });
  }
  return t;
}, wt = (e) => e.endsWith(Ce) ? e.substring(0, e.length - 1) : e.startsWith(Ce) ? e.substring(1) : e, xt = (e) => {
  const s = Object.fromEntries(e.orderSensitiveModifiers.map((t) => [t, !0]));
  return (t) => {
    if (t.length <= 1)
      return t;
    const r = [];
    let a = [];
    return t.forEach((n) => {
      n[0] === "[" || s[n] ? (r.push(...a.sort(), n), a = []) : a.push(n);
    }), r.push(...a.sort()), r;
  };
}, yt = (e) => ({
  cache: gt(e.cacheSize),
  parseClassName: vt(e),
  sortModifiers: xt(e),
  ...mt(e)
}), kt = /\s+/, _t = (e, s) => {
  const {
    parseClassName: o,
    getClassGroupId: t,
    getConflictingClassGroupIds: r,
    sortModifiers: a
  } = s, n = [], u = e.trim().split(kt);
  let c = "";
  for (let g = u.length - 1; g >= 0; g -= 1) {
    const f = u[g], {
      isExternal: k,
      modifiers: w,
      hasImportantModifier: E,
      baseClassName: y,
      maybePostfixModifierPosition: z
    } = o(f);
    if (k) {
      c = f + (c.length > 0 ? " " + c : c);
      continue;
    }
    let W = !!z, O = t(W ? y.substring(0, z) : y);
    if (!O) {
      if (!W) {
        c = f + (c.length > 0 ? " " + c : c);
        continue;
      }
      if (O = t(y), !O) {
        c = f + (c.length > 0 ? " " + c : c);
        continue;
      }
      W = !1;
    }
    const ce = a(w).join(":"), re = E ? ce + Ce : ce, H = re + O;
    if (n.includes(H))
      continue;
    n.push(H);
    const q = r(O, W);
    for (let D = 0; D < q.length; ++D) {
      const ne = q[D];
      n.push(re + ne);
    }
    c = f + (c.length > 0 ? " " + c : c);
  }
  return c;
};
function It() {
  let e = 0, s, o, t = "";
  for (; e < arguments.length; )
    (s = arguments[e++]) && (o = Ke(s)) && (t && (t += " "), t += o);
  return t;
}
const Ke = (e) => {
  if (typeof e == "string")
    return e;
  let s, o = "";
  for (let t = 0; t < e.length; t++)
    e[t] && (s = Ke(e[t])) && (o && (o += " "), o += s);
  return o;
};
function zt(e, ...s) {
  let o, t, r, a = n;
  function n(c) {
    const g = s.reduce((f, k) => k(f), e());
    return o = yt(g), t = o.cache.get, r = o.cache.set, a = u, u(c);
  }
  function u(c) {
    const g = t(c);
    if (g)
      return g;
    const f = _t(c, o);
    return r(c, f), f;
  }
  return function() {
    return a(It.apply(null, arguments));
  };
}
const _ = (e) => {
  const s = (o) => o[e] || [];
  return s.isThemeGetter = !0, s;
}, Je = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Xe = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Ct = /^\d+\/\d+$/, St = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Mt = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, $t = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, At = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Tt = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, J = (e) => Ct.test(e), p = (e) => !!e && !Number.isNaN(Number(e)), G = (e) => !!e && Number.isInteger(Number(e)), ke = (e) => e.endsWith("%") && p(e.slice(0, -1)), L = (e) => St.test(e), Pt = () => !0, Et = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Mt.test(e) && !$t.test(e)
), Qe = () => !1, Vt = (e) => At.test(e), Bt = (e) => Tt.test(e), Lt = (e) => !l(e) && !i(e), Rt = (e) => ee(e, et, Qe), l = (e) => Je.test(e), F = (e) => ee(e, tt, Et), _e = (e) => ee(e, Dt, p), Oe = (e) => ee(e, Ye, Qe), Nt = (e) => ee(e, Ze, Bt), be = (e) => ee(e, ot, Vt), i = (e) => Xe.test(e), ae = (e) => te(e, tt), Gt = (e) => te(e, Ut), De = (e) => te(e, Ye), jt = (e) => te(e, et), Ot = (e) => te(e, Ze), ge = (e) => te(e, ot, !0), ee = (e, s, o) => {
  const t = Je.exec(e);
  return t ? t[1] ? s(t[1]) : o(t[2]) : !1;
}, te = (e, s, o = !1) => {
  const t = Xe.exec(e);
  return t ? t[1] ? s(t[1]) : o : !1;
}, Ye = (e) => e === "position" || e === "percentage", Ze = (e) => e === "image" || e === "url", et = (e) => e === "length" || e === "size" || e === "bg-size", tt = (e) => e === "length", Dt = (e) => e === "number", Ut = (e) => e === "family-name", ot = (e) => e === "shadow", Ft = () => {
  const e = _("color"), s = _("font"), o = _("text"), t = _("font-weight"), r = _("tracking"), a = _("leading"), n = _("breakpoint"), u = _("container"), c = _("spacing"), g = _("radius"), f = _("shadow"), k = _("inset-shadow"), w = _("text-shadow"), E = _("drop-shadow"), y = _("blur"), z = _("perspective"), W = _("aspect"), O = _("ease"), ce = _("animate"), re = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], H = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], q = () => [...H(), i, l], D = () => ["auto", "hidden", "clip", "visible", "scroll"], ne = () => ["auto", "contain", "none"], m = () => [i, l, c], V = () => [J, "full", "auto", ...m()], Ae = () => [G, "none", "subgrid", i, l], Te = () => ["auto", {
    span: ["full", G, i, l]
  }, G, i, l], de = () => [G, "auto", i, l], Pe = () => ["auto", "min", "max", "fr", i, l], ve = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], K = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], B = () => ["auto", ...m()], U = () => [J, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...m()], d = () => [e, i, l], Ee = () => [...H(), De, Oe, {
    position: [i, l]
  }], Ve = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], Be = () => ["auto", "cover", "contain", jt, Rt, {
    size: [i, l]
  }], we = () => [ke, ae, F], C = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    g,
    i,
    l
  ], M = () => ["", p, ae, F], ue = () => ["solid", "dashed", "dotted", "double"], Le = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], I = () => [p, ke, De, Oe], Re = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    y,
    i,
    l
  ], me = () => ["none", p, i, l], pe = () => ["none", p, i, l], xe = () => [p, i, l], fe = () => [J, "full", ...m()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [L],
      breakpoint: [L],
      color: [Pt],
      container: [L],
      "drop-shadow": [L],
      ease: ["in", "out", "in-out"],
      font: [Lt],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [L],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [L],
      shadow: [L],
      spacing: ["px", p],
      text: [L],
      "text-shadow": [L],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", J, l, i, W]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [p, l, i, u]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": re()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": re()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: q()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: D()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": D()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": D()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: ne()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": ne()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": ne()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: V()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": V()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": V()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: V()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: V()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: V()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: V()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: V()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: V()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [G, "auto", i, l]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [J, "full", "auto", u, ...m()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [p, J, "auto", "initial", "none", l]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", p, i, l]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", p, i, l]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [G, "first", "last", "none", i, l]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": Ae()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: Te()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": de()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": de()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": Ae()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: Te()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": de()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": de()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": Pe()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": Pe()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: m()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": m()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": m()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...ve(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...K(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...K()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...ve()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...K(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...K(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": ve()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...K(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...K()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: m()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: m()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: m()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: m()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: m()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: m()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: m()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: m()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: m()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: B()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: B()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: B()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: B()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: B()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: B()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: B()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: B()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: B()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": m()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": m()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: U()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [u, "screen", ...U()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          u,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...U()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          u,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [n]
          },
          ...U()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...U()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...U()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...U()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", o, ae, F]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [t, i, _e]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", ke, l]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Gt, l, s]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [r, i, l]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [p, "none", i, _e]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          a,
          ...m()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", i, l]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", i, l]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: d()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: d()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...ue(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [p, "from-font", "auto", i, F]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: d()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [p, "auto", i, l]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: m()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", i, l]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", i, l]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: Ee()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: Ve()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: Be()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, G, i, l],
          radial: ["", i, l],
          conic: [G, i, l]
        }, Ot, Nt]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: d()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: we()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: we()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: we()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: d()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: d()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: d()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: C()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": C()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": C()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": C()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": C()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": C()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": C()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": C()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": C()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": C()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": C()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": C()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": C()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": C()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": C()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: M()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": M()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": M()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": M()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": M()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": M()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": M()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": M()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": M()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": M()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": M()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...ue(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...ue(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: d()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": d()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": d()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": d()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": d()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": d()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": d()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": d()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": d()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: d()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...ue(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [p, i, l]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", p, ae, F]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: d()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          f,
          ge,
          be
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: d()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", k, ge, be]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": d()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: M()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: d()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [p, F]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": d()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": M()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": d()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", w, ge, be]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": d()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [p, i, l]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...Le(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Le()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [p]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": I()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": I()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": d()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": d()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": I()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": I()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": d()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": d()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": I()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": I()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": d()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": d()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": I()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": I()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": d()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": d()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": I()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": I()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": d()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": d()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": I()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": I()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": d()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": d()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": I()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": I()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": d()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": d()
      }],
      "mask-image-radial": [{
        "mask-radial": [i, l]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": I()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": I()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": d()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": d()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": H()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [p]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": I()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": I()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": d()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": d()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: Ee()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: Ve()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: Be()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", i, l]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          i,
          l
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: Re()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [p, i, l]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [p, i, l]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          E,
          ge,
          be
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": d()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", p, i, l]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [p, i, l]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", p, i, l]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [p, i, l]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", p, i, l]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          i,
          l
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": Re()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [p, i, l]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [p, i, l]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", p, i, l]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [p, i, l]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", p, i, l]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [p, i, l]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [p, i, l]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", p, i, l]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": m()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": m()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": m()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", i, l]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [p, "initial", i, l]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", O, i, l]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [p, i, l]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", ce, i, l]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [z, i, l]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": q()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: me()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": me()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": me()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": me()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: pe()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": pe()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": pe()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": pe()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: xe()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": xe()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": xe()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [i, l, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: q()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: fe()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": fe()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": fe()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": fe()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: d()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: d()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", i, l]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": m()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": m()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": m()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": m()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": m()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": m()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": m()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": m()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": m()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": m()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": m()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": m()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": m()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": m()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": m()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": m()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": m()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": m()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", i, l]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...d()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [p, ae, F, _e]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...d()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, Ue = /* @__PURE__ */ zt(Ft), Wt = { class: "flex items-center" }, Ht = "ml-auto -mr-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex h-8 w-8 dark:bg-gray-800 dark:hover:bg-gray-700", jo = /* @__PURE__ */ $({
  inheritAttrs: !1,
  __name: "Alert",
  props: {
    type: { default: "info" },
    closable: { type: Boolean, default: !1 },
    icon: { type: Boolean, default: !1 },
    border: { type: Boolean, default: !1 }
  },
  emits: ["close"],
  setup(e, { emit: s }) {
    const o = e, t = s, r = at(), a = {
      danger: "text-red-800 dark:text-red-400",
      dark: "text-gray-800 dark:text-gray-300",
      info: "text-blue-800 dark:text-blue-400",
      success: "text-green-800 dark:text-green-400",
      warning: "text-yellow-800 dark:text-yellow-300"
    }, n = {
      danger: "bg-red-50",
      dark: "bg-gray-50",
      info: "bg-blue-50",
      success: "bg-green-50",
      warning: "bg-yellow-50"
    }, u = {
      danger: "text-red-500 dark:text-red-400 bg-red-50 hover:bg-red-200 focus:ring-red-400",
      dark: "text-gray-500 dark:text-gray-300 bg-gray-50 hover:bg-gray-200 focus:ring-gray-400 dark:hover:text-white",
      info: "text-blue-500 dark:text-blue-400 bg-blue-50 hover:bg-blue-200 focus:ring-blue-400",
      success: "text-green-500 dark:text-green-400 bg-green-50 hover:bg-green-200 focus:ring-green-400",
      warning: "text-yellow-500 dark:text-yellow-300 bg-yellow-50 hover:bg-yellow-200 focus:ring-yellow-400"
    }, c = S(
      () => Ue(Ht, u[o.type])
    ), g = {
      danger: "border-red-500 dark:text-red-400",
      dark: "border-gray-500 dark:text-gray-400",
      info: "border-blue-500 dark:text-blue-400",
      success: "border-green-500 dark:text-green-400",
      warning: "border-yellow-500 dark:text-yellow-400"
    }, f = {
      danger: [a.danger, n.danger].join(" "),
      dark: [a.dark, n.dark].join(" "),
      info: [a.info, n.info].join(" "),
      success: [a.success, n.success].join(" "),
      warning: [a.warning, n.warning].join(" ")
    }, k = S(
      () => Ue(
        "p-4 gap-3 text-sm dark:bg-gray-800 rounded-lg",
        f[o.type],
        (o.icon || o.closable) && "flex items-center",
        g[o.type],
        o.border && "border",
        r.class
      )
    ), w = N(!0);
    function E() {
      t("close"), w.value = !1;
    }
    return (y, z) => w.value ? (b(), v("div", We({ key: 0 }, y.$attrs, {
      class: k.value,
      role: "alert"
    }), [
      h("div", Wt, [
        y.icon || y.$slots.icon ? x(y.$slots, "icon", { key: 0 }, () => [
          z[0] || (z[0] = h("svg", {
            class: "size-5 shrink-0",
            fill: "currentColor",
            viewBox: "0 0 20 20",
            xmlns: "http://www.w3.org/2000/svg"
          }, [
            h("path", {
              "fill-rule": "evenodd",
              d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
              "clip-rule": "evenodd"
            })
          ], -1))
        ]) : Y("", !0),
        x(y.$slots, "title")
      ]),
      x(y.$slots, "default", { onCloseClick: E }),
      x(y.$slots, "close-icon", { onCloseClick: E }, () => [
        y.closable ? (b(), v("button", {
          key: 0,
          type: "button",
          class: R(c.value),
          "aria-label": "Close",
          onClick: E
        }, z[1] || (z[1] = [
          h("span", { class: "sr-only" }, "Dismiss", -1),
          h("svg", {
            class: "size-5",
            fill: "currentColor",
            viewBox: "0 0 20 20",
            xmlns: "http://www.w3.org/2000/svg"
          }, [
            h("path", {
              "fill-rule": "evenodd",
              d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
              "clip-rule": "evenodd"
            })
          ], -1)
        ]), 2)) : Y("", !0)
      ])
    ], 16)) : Y("", !0);
  }
}), qt = {
  key: 0,
  class: "text-black input-label"
}, Kt = ["name", "type", "disabled"], Jt = { key: 1 }, Xt = /* @__PURE__ */ $({
  __name: "Input",
  props: /* @__PURE__ */ ie({
    size: { default: "medium" },
    type: { default: "text" },
    label: {},
    name: {},
    message: {},
    disabled: { type: Boolean },
    isValid: { type: Boolean },
    isError: { type: Boolean }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const s = e, o = S(() => `${{
      small: "p-2 rounded",
      medium: "p-2.5 rounded-md",
      large: "p-4 rounded-lg"
    }[s.size]} ${s.isValid ? "valid" : ""} ${s.isError ? "error" : ""}`), t = Z(e, "modelValue");
    return (r, a) => (b(), v("label", {
      class: R(["flex flex-col gap-2 has-[:disabled]:opacity-40", {
        "text-captation": r.size === "small",
        "text-normal": r.size === "medium",
        "text-body": r.size === "large",
        "text-green-600": r.isValid,
        "text-red-600": r.isError
      }])
    }, [
      r.label ? (b(), v("span", qt, P(r.label), 1)) : Y("", !0),
      h("div", {
        class: R([[o.value], "flex border-gray-300 bg-gray-50 border items-center input-container"])
      }, [
        x(r.$slots, "prefix", {}, void 0, !0),
        lt(h("input", We(r.$attrs, {
          name: r.name,
          "onUpdate:modelValue": a[0] || (a[0] = (n) => t.value = n),
          type: r.type,
          disabled: r.disabled,
          class: "flex-1 bg-transparent focus-visible:border-none focus-visible:outline-none focus:outline-none focus:shadow-none focus:ring-0 border-0 w-full"
        }), null, 16, Kt), [
          [it, t.value]
        ]),
        x(r.$slots, "suffix", {}, void 0, !0)
      ], 2),
      r.message ? (b(), v("span", Jt, P(r.message), 1)) : Y("", !0),
      x(r.$slots, "helper", {}, void 0, !0)
    ], 2));
  }
}), oe = (e, s) => {
  const o = e.__vccOpts || e;
  for (const [t, r] of s)
    o[t] = r;
  return o;
}, Qt = /* @__PURE__ */ oe(Xt, [["__scopeId", "data-v-1507d908"]]);
class se {
  constructor(s) {
    this.element = s;
  }
  setUIAttribute(s, o) {
    this.element.setAttribute(`data-coreui-${s}`, o);
  }
  removeUIAttribute(s) {
    this.element.removeAttribute(`data-coreui-${s}`);
  }
  onClick(s) {
    this.element.addEventListener("click", s);
  }
}
class Yt extends se {
  constructor(s) {
    super(s), this.init();
  }
  select() {
    this.setUIAttribute("tab-selected", "true"), this.element.setAttribute("aria-selected", "true"), this.element.removeAttribute("tabindex"), this.element.focus();
  }
  reset() {
    this.removeUIAttribute("tab-selected"), this.element.setAttribute("aria-selected", "false"), this.element.tabIndex = -1;
  }
  init() {
  }
  setAriaControls(s) {
    this.element.setAttribute("aria-controls", `coreui-tab-${s}`);
  }
}
class Zt extends se {
  constructor(o, t, r) {
    super(o);
    T(this, "_tabs", []);
    T(this, "selectedIndex", N(0));
    T(this, "defaultIndex");
    this.defaultIndex = t, this.selectedIndex.value = r ?? 0, this.init();
  }
  get tabs() {
    return this._tabs;
  }
  init() {
    if (typeof this.defaultIndex < "u" && !this.selectedIndex.value && (this.selectedIndex.value = this.defaultIndex), this._tabs = Array.from(
      this.element.querySelectorAll("[data-coreui-tab]")
    ).map((o) => new Yt(o)), !this._tabs.length) return console.warn("There's no tab");
    this.setSelectedTab(this.selectedIndex.value), this._tabs.forEach((o, t) => {
      o.setAriaControls(t), o.element.addEventListener("keydown", this.onKeydown.bind(this)), o.onClick(() => {
        this.setSelectedTab(t);
      });
    });
  }
  setSelectedTab(o) {
    if (o < 0) {
      this.setSelectedTab(0);
      return;
    }
    for (var t = 0; t < this._tabs.length; t += 1) {
      const r = this.tabs[t];
      o === t ? (this.selectedIndex.value = o, r.select()) : r.reset();
    }
  }
  setSelectedToPreviousTab() {
    this.selectedIndex.value === 0 ? this.selectedIndex.value = this._tabs.length - 1 : this.selectedIndex.value--, this.setSelectedTab(this.selectedIndex.value);
  }
  setSelectedToNextTab() {
    this.selectedIndex.value === this._tabs.length - 1 ? this.selectedIndex.value = 0 : this.selectedIndex.value++, this.setSelectedTab(this.selectedIndex.value);
  }
  /* EVENT HANDLERS */
  onKeydown(o) {
    let t = !1;
    switch (o.key) {
      case "ArrowLeft":
        this.setSelectedToPreviousTab(), t = !0;
        break;
      case "ArrowRight":
        this.setSelectedToNextTab(), t = !0;
        break;
      case "Home":
        this.setSelectedTab(0), t = !0;
        break;
      case "End":
        this.setSelectedTab(this._tabs.length - 1), t = !0;
        break;
    }
    t && (o.stopPropagation(), o.preventDefault());
  }
}
const Oo = /* @__PURE__ */ $({
  __name: "Tabs",
  props: /* @__PURE__ */ ie({
    defaultIndex: { default: 0 }
  }, {
    selectedIndex: { default: 0 },
    selectedIndexModifiers: {}
  }),
  emits: ["update:selectedIndex"],
  setup(e) {
    const s = e, o = Z(e, "selectedIndex"), t = N(null);
    function r(a) {
      const { selectedIndex: n } = new Zt(
        a,
        s.defaultIndex,
        o.value
      );
      Ie(n, () => {
        o.value = n.value;
      });
    }
    return Ie(o, () => {
      t.value && r(t.value);
    }), he(() => {
      t.value && r(t.value);
    }), (a, n) => (b(), v("div", {
      ref_key: "tab_container",
      ref: t,
      role: "tablist"
    }, [
      x(a.$slots, "default")
    ], 512));
  }
});
class eo extends se {
  constructor(s) {
    super(s), this.element.addEventListener("click", () => this.element.toggleAttribute("aria-expanded"));
  }
}
class to extends se {
  constructor(o, t) {
    super(o);
    T(this, "active", N(!1));
    this.element.id = t;
  }
  select() {
    this.active.value = !0, this.setUIAttribute("item-active", "true");
  }
  reset() {
    this.active.value = !1, this.removeUIAttribute("item-active");
  }
}
class oo extends se {
  constructor(o) {
    super(o);
    T(this, "_isOpen", !1);
    T(this, "_items", []);
    T(this, "selectedIndex", N(0));
    this.close(), this.init();
  }
  open() {
    this.element.removeAttribute("style"), this.element.removeAttribute("tabindex"), this._isOpen = !0;
  }
  close() {
    this.element.style.display = "none", this.element.setAttribute("tabindex", "-1"), this._isOpen = !1;
  }
  toogle() {
    this._isOpen ? this.close() : this.open();
  }
  setActiveItemId(o) {
    this.element.setAttribute("aria-activedescendant", String(o));
  }
  init() {
    var o;
    this._items = Array.from(this.element.querySelectorAll("[role=menuitem]")).map(
      (t, r) => new to(t, String(r))
    ), (o = this.element.parentElement) == null || o.addEventListener("keydown", this.onKeydown.bind(this)), this._items.forEach((t, r) => {
      t.onClick(() => {
        this.setSelectedItem(r), this.close();
      });
    });
  }
  setSelectedItem(o) {
    this.setActiveItemId(o);
    for (var t = 0; t < this._items.length; t += 1) {
      const r = this._items[t];
      o === t ? (this.selectedIndex.value = o, r.select()) : r.reset();
    }
  }
  setSelectedToPreviousTab() {
    this.selectedIndex.value === 0 ? this.selectedIndex.value = this._items.length - 1 : this.selectedIndex.value--, this.setSelectedItem(this.selectedIndex.value);
  }
  setSelectedToNextTab() {
    this.selectedIndex.value === this._items.length - 1 ? this.selectedIndex.value = 0 : this.selectedIndex.value++, this.setSelectedItem(this.selectedIndex.value);
  }
  /* EVENT HANDLERS */
  onKeydown(o) {
    let t = !1;
    switch (o.key) {
      case "ArrowUp":
        this.setSelectedToPreviousTab(), t = !0;
        break;
      case "ArrowDown":
        this.setSelectedToNextTab(), t = !0;
        break;
      case "Home":
        this.setSelectedItem(0), t = !0;
        break;
      case "End":
        this.setSelectedItem(this._items.length - 1), t = !0;
        break;
      case "Enter":
        this.close(), t = !0;
        break;
      case "Esc":
        this.close(), t = !0;
        break;
    }
    t && (o.stopPropagation(), o.preventDefault());
  }
}
class so extends se {
  constructor(o) {
    super(o);
    T(this, "_button", null);
    T(this, "_menuItems", null);
    this.init();
  }
  init() {
    const o = this.element.querySelector("[role=menu]");
    if (!o) return console.warn("There's no items");
    this._menuItems = new oo(o);
    const t = this.element.querySelector("[data-coreui-button]");
    if (!t) return console.warn("There's no button");
    this._button = new eo(t), this._button.element.addEventListener("click", () => {
      this._menuItems.toogle();
    }), addEventListener("click", ({ target: r }) => {
      var a, n, u;
      !((a = this._menuItems) != null && a.element.contains(r)) && !((n = this._button) != null && n.element.contains(r)) && ((u = this._menuItems) == null || u.close());
    });
  }
}
const ro = /* @__PURE__ */ $({
  __name: "Menu",
  props: {
    as: { type: [Object, Function, String], default: "div" }
  },
  setup(e) {
    const s = N(null);
    function o(t) {
      new so(t);
    }
    return he(() => {
      s.value && o(s.value);
    }), (t, r) => (b(), j(Me(t.as), {
      ref_key: "menu_container",
      ref: s
    }, {
      default: A(() => [
        x(t.$slots, "default")
      ]),
      _: 3
    }, 512));
  }
}), no = /* @__PURE__ */ $({
  __name: "MenuButton",
  props: {
    as: { type: [Object, Function, String], default: "button" }
  },
  setup(e) {
    return (s, o) => (b(), j(Me(s.as), {
      "data-coreui-button": "",
      "aria-haspopup": "true"
    }, {
      default: A(() => [
        x(s.$slots, "default")
      ]),
      _: 3
    }));
  }
}), ao = /* @__PURE__ */ $({
  __name: "MenuItem",
  props: {
    as: { type: [Object, Function, String], default: "div" }
  },
  setup(e) {
    const s = N(!1);
    return (o, t) => (b(), j(Me(o.as), {
      active: s.value,
      role: "menuitem"
    }, {
      default: A(() => [
        x(o.$slots, "default")
      ]),
      _: 3
    }, 8, ["active"]));
  }
}), lo = {}, io = {
  role: "menu",
  tabindex: "-1",
  style: { display: "none" }
};
function co(e, s) {
  return b(), v("div", io, [
    x(e.$slots, "default")
  ]);
}
const uo = /* @__PURE__ */ oe(lo, [["render", co]]), mo = { key: 0 }, po = { key: 1 }, fo = ["onClick"], Do = /* @__PURE__ */ $({
  __name: "Dropdown",
  props: /* @__PURE__ */ ie({
    label: {},
    type: { default: "default" },
    size: { default: "small" },
    options: {}
  }, {
    modelValue: {},
    modelModifiers: {},
    option: {},
    optionModifiers: {}
  }),
  emits: ["update:modelValue", "update:option"],
  setup(e) {
    const s = e, o = Z(e, "modelValue"), t = Z(e, "option"), r = S(() => {
      const a = {
        small: "text-xs dropdown-small",
        regular: "text-base dropdown-regular",
        default: "border border-gray-300 bg-gray-50 dropdown-default",
        floating: "dropdown-floating"
      };
      return `${a[s.size]} ${a[s.type]}`;
    });
    return he(() => {
      t.value = s.options.find((a) => a.value === o.value);
    }), (a, n) => (b(), j(le(ro), { class: "relative" }, {
      default: A(() => [
        ye(le(no), {
          class: "flex flex-col gap-2 cursor-pointer",
          as: "div"
        }, {
          default: A(() => [
            h("span", null, P(a.label), 1),
            h("div", {
              class: R(["py-3 px-4 flex text-gray-700 justify-between items-center min-w-72 rounded-lg w-full", r.value])
            }, [
              t.value ? (b(), v("span", mo, P(t.value.label), 1)) : (b(), v("span", po, "Cliquer pour sélectionner")),
              x(a.$slots, "icon", {}, () => [
                n[0] || (n[0] = h("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 20 20",
                  fill: "currentColor",
                  class: "w-5 h-5"
                }, [
                  h("path", {
                    "fill-rule": "evenodd",
                    d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
                    "clip-rule": "evenodd"
                  })
                ], -1))
              ])
            ], 2)
          ]),
          _: 3
        }),
        ye(le(uo), { class: "absolute right-0 left-0 mt-1 origin-top-right rounded-lg bg-white focus:outline-none p-2 gap-1 z-50 shadow-lg dropdown-items" }, {
          default: A(() => [
            (b(!0), v(X, null, Q(a.options, (u) => (b(), v("div", {
              onClick: () => {
                o.value = u.value, t.value = u;
              }
            }, [
              x(a.$slots, "option", {
                role: "menuitem",
                option: u
              }, () => [
                ye(le(ao), { class: "text-normal cursor-pointer p-2 flex justify-between items-center" }, {
                  default: A(() => [
                    He(P(u.label), 1)
                  ]),
                  _: 2
                }, 1024)
              ])
            ], 8, fo))), 256))
          ]),
          _: 3
        })
      ]),
      _: 3
    }));
  }
}), bo = ["disabled"], go = {
  key: 0,
  class: "loader h-5 w-5"
}, ho = /* @__PURE__ */ $({
  __name: "Button",
  props: {
    color: { default: "primary" },
    size: { default: "medium" },
    loading: { type: Boolean, default: !1 }
  },
  setup(e) {
    const s = e, o = S(() => {
      const t = {
        small: "button-small px-3 py-1.5 text-xs",
        medium: "button-medium px-4 py-2",
        large: "button-large px-5 py-3",
        primary: "button-primary",
        secondary: "button-secondary",
        outlined: "button-outlined bg-transparent border-gray-300 active:border-gray-400 focus:border-black disabled:border-gray-200 disabled:text-gray-400"
      };
      return `${t[s.size]} ${t[s.color]}`;
    });
    return (t, r) => (b(), v("button", {
      class: R([[o.value], "flex justify-center items-center rounded-lg border gap-4"]),
      disabled: t.loading
    }, [
      t.loading ? (b(), v("div", go)) : Y("", !0),
      x(t.$slots, "prefix", {}, void 0, !0),
      x(t.$slots, "default", {}, void 0, !0),
      x(t.$slots, "suffix", {}, void 0, !0)
    ], 10, bo));
  }
}), Uo = /* @__PURE__ */ oe(ho, [["__scopeId", "data-v-17b2ccb1"]]), vo = {}, wo = { scope: "col" };
function xo(e, s) {
  return b(), v("th", wo, [
    x(e.$slots, "default")
  ]);
}
const yo = /* @__PURE__ */ oe(vo, [["render", xo]]), ko = {}, _o = { class: "row border-b-0.5 border-b-gray-300 last:border-b-transparent" };
function Io(e, s) {
  return b(), v("tr", _o, [
    x(e.$slots, "default")
  ]);
}
const zo = /* @__PURE__ */ oe(ko, [["render", Io]]), Co = {}, So = { class: "px-2.5 py-5 data" };
function Mo(e, s) {
  return b(), v("td", So, [
    x(e.$slots, "default")
  ]);
}
const $o = /* @__PURE__ */ oe(Co, [["render", Mo]]), Ao = { class: "bg-white overflow-hidden table-container" }, To = { class: "w-full" }, Po = { key: 1 }, Eo = ["colspan"], Fo = /* @__PURE__ */ $({
  __name: "Table",
  props: {
    headers: {},
    data: {},
    loading: { type: Boolean }
  },
  emits: ["rowHovered", "rowDblClick"],
  setup(e, { emit: s }) {
    const o = e, t = s, { isOnMobileDevice: r } = dt(), a = S(() => !r.value || o.headers.every((c) => !c.mobile) ? o.headers : o.headers.filter((c) => c.mobile)), n = S(() => o.headers.length);
    function u(c, g) {
      let f = c[String(g.field)];
      return f || (f = "-"), typeof g.formatter == "function" && (f = g.formatter(c)), f;
    }
    return (c, g) => (b(), v("div", Ao, [
      h("table", To, [
        h("thead", null, [
          (b(!0), v(X, null, Q(a.value, (f) => (b(), j(yo, {
            key: `${f.field}_header`,
            class: R(f.thClass)
          }, {
            default: A(() => [
              He(P(f.label), 1)
            ]),
            _: 2
          }, 1032, ["class"]))), 128))
        ]),
        h("tbody", null, [
          c.loading ? (b(!0), v(X, { key: 0 }, Q(a.value, (f, k) => (b(), v("tr", {
            class: "",
            key: k
          }, [
            (b(!0), v(X, null, Q(a.value, (w) => (b(), v("td", {
              class: "p-4",
              key: `cell_${w.field}_item${f.field}`
            }, g[1] || (g[1] = [
              h("div", { class: "h-4 mx-auto animate-pulse bg-gray-200 rounded-full" }, null, -1)
            ])))), 128))
          ]))), 128)) : c.data.length ? (b(!0), v(X, { key: 2 }, Q(c.data, (f, k) => (b(), j(zo, {
            onMouseover: (w) => t("rowHovered", { idx: k, item: f }),
            onMouseleave: g[0] || (g[0] = (w) => t("rowHovered", null)),
            onDblclick: (w) => t("rowDblClick", { idx: k, item: f }),
            key: k
          }, {
            default: A(() => [
              (b(!0), v(X, null, Q(a.value, (w) => (b(), j($o, {
                class: R(w.tdClass)
              }, {
                default: A(() => [
                  x(c.$slots, `${w.field}`, {
                    item: f,
                    value: u(f, w),
                    idx: k
                  }, () => [
                    h("span", null, P(u(f, w)), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["class"]))), 256))
            ]),
            _: 2
          }, 1032, ["onMouseover", "onDblclick"]))), 128)) : (b(), v("tr", Po, [
            h("td", { colspan: n.value }, [
              x(c.$slots, "empty", {}, () => [
                g[2] || (g[2] = h("div", { class: "w-full py-16 text-center" }, " Aucune donnée disponible ", -1))
              ])
            ], 8, Eo)
          ]))
        ])
      ])
    ]));
  }
}), Vo = { class: "flex items-center text-true-gray-600" }, Bo = { class: "ml-2" }, Lo = ["disabled"], Ro = ["disabled"], Wo = /* @__PURE__ */ $({
  __name: "TablePagination",
  props: /* @__PURE__ */ ie({
    total: {},
    pageSize: { default: 0 },
    modelValue: { default: 1 }
  }, {
    modelValue: { required: !0 },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const s = e, o = Z(e, "modelValue"), t = ut({
      totalItems: S(() => s.total),
      pageSize: N(s.pageSize),
      currentPage: o
    }), r = Fe({
      startIndex: 1,
      endIndex: 1,
      totalItems: 0,
      isNextEnabled: !1,
      isPreviousEnabled: !1,
      onNextClick: () => {
      },
      onPreviousClick: () => {
      }
    });
    return ct(() => {
      r.startIndex = t.startIndex.value, r.endIndex = t.endIndex.value, r.totalItems = t.totalItems.value, r.isNextEnabled = t.isNextEnabled.value, r.isPreviousEnabled = t.isPreviousEnabled.value, r.onNextClick = t.nextPage, r.onPreviousClick = t.previousPage, o.value = t.currentPage.value;
    }), (a, n) => (b(), v("div", Vo, [
      h("span", null, P(r.startIndex + 1) + " - " + P(r.endIndex + 1), 1),
      n[4] || (n[4] = h("span", { class: "ml-2" }, "sur", -1)),
      h("span", Bo, P(r.totalItems), 1),
      h("button", {
        disabled: !r.isPreviousEnabled,
        class: R(["ml-4 flex w-8 h-8 rounded-full items-center justify-center cursor-pointer hover:bg-gray-100 active:bg-gray-200 focus:outline-none", {
          "pointer-events-none text-gray-400": !r.isPreviousEnabled
        }]),
        onClick: n[0] || (n[0] = //@ts-ignore
        (...u) => r.onPreviousClick && r.onPreviousClick(...u))
      }, n[2] || (n[2] = [
        h("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor",
          class: "w-5 h-5"
        }, [
          h("path", {
            "fill-rule": "evenodd",
            d: "M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z",
            "clip-rule": "evenodd"
          })
        ], -1)
      ]), 10, Lo),
      h("button", {
        disabled: !r.isNextEnabled,
        class: R(["flex w-8 h-8 rounded-full items-center justify-center cursor-pointer hover:bg-gray-100 active:bg-gray-200 focus:outline-none", {
          "pointer-events-none text-gray-400": !r.isNextEnabled
        }]),
        onClick: n[1] || (n[1] = //@ts-ignore
        (...u) => r.onNextClick && r.onNextClick(...u))
      }, n[3] || (n[3] = [
        h("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor",
          class: "w-5 h-5 -rotate-180"
        }, [
          h("path", {
            "fill-rule": "evenodd",
            d: "M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z",
            "clip-rule": "evenodd"
          })
        ], -1)
      ]), 10, Ro)
    ]));
  }
}), Ho = /* @__PURE__ */ $({
  __name: "DataTable",
  setup(e) {
    return (s, o) => (b(), v("div", null, "DataTable component"));
  }
}), qo = /* @__PURE__ */ $({
  __name: "SearchInput",
  props: /* @__PURE__ */ ie({
    size: { default: "small" }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const s = Z(e, "modelValue");
    return (o, t) => (b(), j(le(Qt), {
      size: o.size,
      name: "search",
      modelValue: s.value,
      "onUpdate:modelValue": t[0] || (t[0] = (r) => s.value = r),
      type: "search"
    }, {
      prefix: A(() => t[1] || (t[1] = [
        h("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor",
          class: "w-4 h-4"
        }, [
          h("path", {
            "fill-rule": "evenodd",
            d: "M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z",
            "clip-rule": "evenodd"
          })
        ], -1)
      ])),
      _: 1
    }, 8, ["size", "modelValue"]));
  }
});
export {
  jo as Alert,
  Uo as Button,
  Ho as DataTable,
  Do as Dropdown,
  Qt as Input,
  ro as Menu,
  no as MenuButton,
  ao as MenuItem,
  uo as MenuItems,
  qo as SearchInput,
  Fo as Table,
  $o as TableData,
  Wo as TablePagination,
  zo as TableRow,
  yo as TableTh,
  Oo as Tabs,
  ut as usePagination,
  dt as useWindowSize
};
