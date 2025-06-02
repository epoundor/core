var st = Object.defineProperty;
var nt = (e, r, o) => r in e ? st(e, r, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[r] = o;
var E = (e, r, o) => nt(e, typeof r != "symbol" ? r + "" : r, o);
import { reactive as Ue, ref as P, watch as ze, onMounted as ie, onBeforeUnmount as We, computed as C, defineComponent as S, useAttrs as at, createElementBlock as v, createCommentVNode as Y, openBlock as f, mergeProps as He, createElementVNode as h, renderSlot as w, normalizeClass as V, mergeModels as de, useModel as Z, toDisplayString as T, withDirectives as lt, vModelDynamic as it, createBlock as G, resolveDynamicComponent as ve, withCtx as A, unref as le, createVNode as ke, Fragment as X, renderList as Q, createTextVNode as qe, watchEffect as dt } from "vue";
const Re = 1024, ct = () => {
  const e = Ue({
    width: window.innerWidth,
    height: window.innerHeight
  }), r = P(!1), o = () => {
    e.width = window.innerWidth, e.height = window.innerHeight;
  };
  ze(
    () => e.width,
    () => e.width <= Re - 1 ? (r.value = !0, null) : (r.value = !1, null)
  );
  function t() {
    e.width <= Re - 1 ? r.value = !0 : r.value = !1;
  }
  return ie(() => {
    t(), window.addEventListener("resize", o);
  }), We(() => {
    window.removeEventListener("resize", o);
  }), { windowSize: e, isOnMobileDevice: r };
}, ut = (e) => {
  const r = C(() => e.totalItems.value), o = e.currentPage, t = e.pageSize, s = C(
    () => Math.ceil(r.value / t.value)
  ), a = C(() => (o.value - 1) * t.value), n = C(
    () => Math.min(o.value * t.value, r.value) - 1
  ), c = C(() => o.value < s.value), d = C(() => o.value > 1);
  function g(y) {
    y < 1 || y > s.value || (o.value = y);
  }
  function b() {
    g(o.value + 1), console.log("nextPage", o.value);
  }
  function k() {
    g(o.value - 1);
  }
  return {
    totalItems: r,
    currentPage: o,
    pageSize: t,
    totalPages: s,
    startIndex: a,
    endIndex: n,
    isNextEnabled: c,
    isPreviousEnabled: d,
    setPage: g,
    nextPage: b,
    previousPage: k
  };
}, Se = "-", mt = (e) => {
  const r = bt(e), {
    conflictingClassGroups: o,
    conflictingClassGroupModifiers: t
  } = e;
  return {
    getClassGroupId: (n) => {
      const c = n.split(Se);
      return c[0] === "" && c.length !== 1 && c.shift(), Ke(c, r) || pt(n);
    },
    getConflictingClassGroupIds: (n, c) => {
      const d = o[n] || [];
      return c && t[n] ? [...d, ...t[n]] : d;
    }
  };
}, Ke = (e, r) => {
  var n;
  if (e.length === 0)
    return r.classGroupId;
  const o = e[0], t = r.nextPart.get(o), s = t ? Ke(e.slice(1), t) : void 0;
  if (s)
    return s;
  if (r.validators.length === 0)
    return;
  const a = e.join(Se);
  return (n = r.validators.find(({
    validator: c
  }) => c(a))) == null ? void 0 : n.classGroupId;
}, Ge = /^\[(.+)\]$/, pt = (e) => {
  if (Ge.test(e)) {
    const r = Ge.exec(e)[1], o = r == null ? void 0 : r.substring(0, r.indexOf(":"));
    if (o)
      return "arbitrary.." + o;
  }
}, bt = (e) => {
  const {
    theme: r,
    classGroups: o
  } = e, t = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const s in o)
    $e(o[s], t, s, r);
  return t;
}, $e = (e, r, o, t) => {
  e.forEach((s) => {
    if (typeof s == "string") {
      const a = s === "" ? r : je(r, s);
      a.classGroupId = o;
      return;
    }
    if (typeof s == "function") {
      if (ft(s)) {
        $e(s(t), r, o, t);
        return;
      }
      r.validators.push({
        validator: s,
        classGroupId: o
      });
      return;
    }
    Object.entries(s).forEach(([a, n]) => {
      $e(n, je(r, a), o, t);
    });
  });
}, je = (e, r) => {
  let o = e;
  return r.split(Se).forEach((t) => {
    o.nextPart.has(t) || o.nextPart.set(t, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), o = o.nextPart.get(t);
  }), o;
}, ft = (e) => e.isThemeGetter, gt = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let r = 0, o = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  const s = (a, n) => {
    o.set(a, n), r++, r > e && (r = 0, t = o, o = /* @__PURE__ */ new Map());
  };
  return {
    get(a) {
      let n = o.get(a);
      if (n !== void 0)
        return n;
      if ((n = t.get(a)) !== void 0)
        return s(a, n), n;
    },
    set(a, n) {
      o.has(a) ? o.set(a, n) : s(a, n);
    }
  };
}, Ce = "!", Me = ":", ht = Me.length, vt = (e) => {
  const {
    prefix: r,
    experimentalParseClassName: o
  } = e;
  let t = (s) => {
    const a = [];
    let n = 0, c = 0, d = 0, g;
    for (let x = 0; x < s.length; x++) {
      let z = s[x];
      if (n === 0 && c === 0) {
        if (z === Me) {
          a.push(s.slice(d, x)), d = x + ht;
          continue;
        }
        if (z === "/") {
          g = x;
          continue;
        }
      }
      z === "[" ? n++ : z === "]" ? n-- : z === "(" ? c++ : z === ")" && c--;
    }
    const b = a.length === 0 ? s : s.substring(d), k = wt(b), y = k !== b, B = g && g > d ? g - d : void 0;
    return {
      modifiers: a,
      hasImportantModifier: y,
      baseClassName: k,
      maybePostfixModifierPosition: B
    };
  };
  if (r) {
    const s = r + Me, a = t;
    t = (n) => n.startsWith(s) ? a(n.substring(s.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: n,
      maybePostfixModifierPosition: void 0
    };
  }
  if (o) {
    const s = t;
    t = (a) => o({
      className: a,
      parseClassName: s
    });
  }
  return t;
}, wt = (e) => e.endsWith(Ce) ? e.substring(0, e.length - 1) : e.startsWith(Ce) ? e.substring(1) : e, yt = (e) => {
  const r = Object.fromEntries(e.orderSensitiveModifiers.map((t) => [t, !0]));
  return (t) => {
    if (t.length <= 1)
      return t;
    const s = [];
    let a = [];
    return t.forEach((n) => {
      n[0] === "[" || r[n] ? (s.push(...a.sort(), n), a = []) : a.push(n);
    }), s.push(...a.sort()), s;
  };
}, xt = (e) => ({
  cache: gt(e.cacheSize),
  parseClassName: vt(e),
  sortModifiers: yt(e),
  ...mt(e)
}), kt = /\s+/, _t = (e, r) => {
  const {
    parseClassName: o,
    getClassGroupId: t,
    getConflictingClassGroupIds: s,
    sortModifiers: a
  } = r, n = [], c = e.trim().split(kt);
  let d = "";
  for (let g = c.length - 1; g >= 0; g -= 1) {
    const b = c[g], {
      isExternal: k,
      modifiers: y,
      hasImportantModifier: B,
      baseClassName: x,
      maybePostfixModifierPosition: z
    } = o(b);
    if (k) {
      d = b + (d.length > 0 ? " " + d : d);
      continue;
    }
    let W = !!z, O = t(W ? x.substring(0, z) : x);
    if (!O) {
      if (!W) {
        d = b + (d.length > 0 ? " " + d : d);
        continue;
      }
      if (O = t(x), !O) {
        d = b + (d.length > 0 ? " " + d : d);
        continue;
      }
      W = !1;
    }
    const ce = a(y).join(":"), se = B ? ce + Ce : ce, H = se + O;
    if (n.includes(H))
      continue;
    n.push(H);
    const q = s(O, W);
    for (let D = 0; D < q.length; ++D) {
      const ne = q[D];
      n.push(se + ne);
    }
    d = b + (d.length > 0 ? " " + d : d);
  }
  return d;
};
function It() {
  let e = 0, r, o, t = "";
  for (; e < arguments.length; )
    (r = arguments[e++]) && (o = Je(r)) && (t && (t += " "), t += o);
  return t;
}
const Je = (e) => {
  if (typeof e == "string")
    return e;
  let r, o = "";
  for (let t = 0; t < e.length; t++)
    e[t] && (r = Je(e[t])) && (o && (o += " "), o += r);
  return o;
};
function zt(e, ...r) {
  let o, t, s, a = n;
  function n(d) {
    const g = r.reduce((b, k) => k(b), e());
    return o = xt(g), t = o.cache.get, s = o.cache.set, a = c, c(d);
  }
  function c(d) {
    const g = t(d);
    if (g)
      return g;
    const b = _t(d, o);
    return s(d, b), b;
  }
  return function() {
    return a(It.apply(null, arguments));
  };
}
const _ = (e) => {
  const r = (o) => o[e] || [];
  return r.isThemeGetter = !0, r;
}, Xe = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Qe = /^\((?:(\w[\w-]*):)?(.+)\)$/i, $t = /^\d+\/\d+$/, Ct = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Mt = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, St = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, At = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Tt = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, J = (e) => $t.test(e), p = (e) => !!e && !Number.isNaN(Number(e)), j = (e) => !!e && Number.isInteger(Number(e)), _e = (e) => e.endsWith("%") && p(e.slice(0, -1)), R = (e) => Ct.test(e), Pt = () => !0, Et = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Mt.test(e) && !St.test(e)
), Ye = () => !1, Vt = (e) => At.test(e), Bt = (e) => Tt.test(e), Nt = (e) => !l(e) && !i(e), Lt = (e) => ee(e, tt, Ye), l = (e) => Xe.test(e), U = (e) => ee(e, ot, Et), Ie = (e) => ee(e, Dt, p), Oe = (e) => ee(e, Ze, Ye), Rt = (e) => ee(e, et, Bt), ge = (e) => ee(e, rt, Vt), i = (e) => Qe.test(e), ae = (e) => te(e, ot), Gt = (e) => te(e, Ft), De = (e) => te(e, Ze), jt = (e) => te(e, tt), Ot = (e) => te(e, et), he = (e) => te(e, rt, !0), ee = (e, r, o) => {
  const t = Xe.exec(e);
  return t ? t[1] ? r(t[1]) : o(t[2]) : !1;
}, te = (e, r, o = !1) => {
  const t = Qe.exec(e);
  return t ? t[1] ? r(t[1]) : o : !1;
}, Ze = (e) => e === "position" || e === "percentage", et = (e) => e === "image" || e === "url", tt = (e) => e === "length" || e === "size" || e === "bg-size", ot = (e) => e === "length", Dt = (e) => e === "number", Ft = (e) => e === "family-name", rt = (e) => e === "shadow", Ut = () => {
  const e = _("color"), r = _("font"), o = _("text"), t = _("font-weight"), s = _("tracking"), a = _("leading"), n = _("breakpoint"), c = _("container"), d = _("spacing"), g = _("radius"), b = _("shadow"), k = _("inset-shadow"), y = _("text-shadow"), B = _("drop-shadow"), x = _("blur"), z = _("perspective"), W = _("aspect"), O = _("ease"), ce = _("animate"), se = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], H = () => [
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
  ], q = () => [...H(), i, l], D = () => ["auto", "hidden", "clip", "visible", "scroll"], ne = () => ["auto", "contain", "none"], m = () => [i, l, d], N = () => [J, "full", "auto", ...m()], Ae = () => [j, "none", "subgrid", i, l], Te = () => ["auto", {
    span: ["full", j, i, l]
  }, j, i, l], ue = () => [j, "auto", i, l], Pe = () => ["auto", "min", "max", "fr", i, l], we = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], K = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], L = () => ["auto", ...m()], F = () => [J, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...m()], u = () => [e, i, l], Ee = () => [...H(), De, Oe, {
    position: [i, l]
  }], Ve = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], Be = () => ["auto", "cover", "contain", jt, Lt, {
    size: [i, l]
  }], ye = () => [_e, ae, U], $ = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    g,
    i,
    l
  ], M = () => ["", p, ae, U], me = () => ["solid", "dashed", "dotted", "double"], Ne = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], I = () => [p, _e, De, Oe], Le = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    x,
    i,
    l
  ], pe = () => ["none", p, i, l], be = () => ["none", p, i, l], xe = () => [p, i, l], fe = () => [J, "full", ...m()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [R],
      breakpoint: [R],
      color: [Pt],
      container: [R],
      "drop-shadow": [R],
      ease: ["in", "out", "in-out"],
      font: [Nt],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [R],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [R],
      shadow: [R],
      spacing: ["px", p],
      text: [R],
      "text-shadow": [R],
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
        columns: [p, l, i, c]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": se()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": se()
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
        inset: N()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": N()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": N()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: N()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: N()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: N()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: N()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: N()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: N()
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
        z: [j, "auto", i, l]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [J, "full", "auto", c, ...m()]
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
        order: [j, "first", "last", "none", i, l]
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
        "col-start": ue()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": ue()
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
        "row-start": ue()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": ue()
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
        justify: [...we(), "normal"]
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
        content: ["normal", ...we()]
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
        "place-content": we()
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
        m: L()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: L()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: L()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: L()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: L()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: L()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: L()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: L()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: L()
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
        size: F()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [c, "screen", ...F()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          c,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...F()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          c,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [n]
          },
          ...F()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...F()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...F()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...F()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", o, ae, U]
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
        font: [t, i, Ie]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", _e, l]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Gt, l, r]
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
        tracking: [s, i, l]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [p, "none", i, Ie]
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
        placeholder: u()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: u()
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
        decoration: [...me(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [p, "from-font", "auto", i, U]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: u()
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
          }, j, i, l],
          radial: ["", i, l],
          conic: [j, i, l]
        }, Ot, Rt]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: u()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: ye()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: ye()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: ye()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: u()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: u()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: u()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: $()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": $()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": $()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": $()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": $()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": $()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": $()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": $()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": $()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": $()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": $()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": $()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": $()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": $()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": $()
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
        border: [...me(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...me(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: u()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": u()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": u()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": u()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": u()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": u()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": u()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": u()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": u()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: u()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...me(), "none", "hidden"]
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
        outline: ["", p, ae, U]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: u()
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
          b,
          he,
          ge
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: u()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", k, he, ge]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": u()
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
        ring: u()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [p, U]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": u()
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
        "inset-ring": u()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", y, he, ge]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": u()
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
        "mix-blend": [...Ne(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Ne()
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
        "mask-linear-from": u()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": u()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": I()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": I()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": u()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": u()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": I()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": I()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": u()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": u()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": I()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": I()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": u()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": u()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": I()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": I()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": u()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": u()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": I()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": I()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": u()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": u()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": I()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": I()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": u()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": u()
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
        "mask-radial-from": u()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": u()
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
        "mask-conic-from": u()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": u()
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
        blur: Le()
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
          B,
          he,
          ge
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": u()
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
        "backdrop-blur": Le()
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
        rotate: pe()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": pe()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": pe()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": pe()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: be()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": be()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": be()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": be()
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
        accent: u()
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
        caret: u()
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
        fill: ["none", ...u()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [p, ae, U, Ie]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...u()]
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
}, Fe = /* @__PURE__ */ zt(Ut), Wt = { class: "flex items-center" }, Ht = "ml-auto -mr-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex h-8 w-8 dark:bg-gray-800 dark:hover:bg-gray-700", jo = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "Alert",
  props: {
    type: { default: "info" },
    closable: { type: Boolean, default: !1 },
    icon: { type: Boolean, default: !1 },
    border: { type: Boolean, default: !1 }
  },
  emits: ["close"],
  setup(e, { emit: r }) {
    const o = e, t = r, s = at(), a = {
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
    }, c = {
      danger: "text-red-500 dark:text-red-400 bg-red-50 hover:bg-red-200 focus:ring-red-400",
      dark: "text-gray-500 dark:text-gray-300 bg-gray-50 hover:bg-gray-200 focus:ring-gray-400 dark:hover:text-white",
      info: "text-blue-500 dark:text-blue-400 bg-blue-50 hover:bg-blue-200 focus:ring-blue-400",
      success: "text-green-500 dark:text-green-400 bg-green-50 hover:bg-green-200 focus:ring-green-400",
      warning: "text-yellow-500 dark:text-yellow-300 bg-yellow-50 hover:bg-yellow-200 focus:ring-yellow-400"
    }, d = C(
      () => Fe(Ht, c[o.type])
    ), g = {
      danger: "border-red-500 dark:text-red-400",
      dark: "border-gray-500 dark:text-gray-400",
      info: "border-blue-500 dark:text-blue-400",
      success: "border-green-500 dark:text-green-400",
      warning: "border-yellow-500 dark:text-yellow-400"
    }, b = {
      danger: [a.danger, n.danger].join(" "),
      dark: [a.dark, n.dark].join(" "),
      info: [a.info, n.info].join(" "),
      success: [a.success, n.success].join(" "),
      warning: [a.warning, n.warning].join(" ")
    }, k = C(
      () => Fe(
        "p-4 gap-3 text-sm dark:bg-gray-800 rounded-lg",
        b[o.type],
        (o.icon || o.closable) && "flex items-center",
        g[o.type],
        o.border && "border",
        s.class
      )
    ), y = P(!0);
    function B() {
      t("close"), y.value = !1;
    }
    return (x, z) => y.value ? (f(), v("div", He({ key: 0 }, x.$attrs, {
      class: k.value,
      role: "alert"
    }), [
      h("div", Wt, [
        x.icon || x.$slots.icon ? w(x.$slots, "icon", { key: 0 }, () => [
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
        w(x.$slots, "title")
      ]),
      w(x.$slots, "default", { onCloseClick: B }),
      w(x.$slots, "close-icon", { onCloseClick: B }, () => [
        x.closable ? (f(), v("button", {
          key: 0,
          type: "button",
          class: V(d.value),
          "aria-label": "Close",
          onClick: B
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
}, Kt = ["name", "type", "disabled"], Jt = { key: 1 }, Xt = /* @__PURE__ */ S({
  __name: "Input",
  props: /* @__PURE__ */ de({
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
    const r = e, o = C(() => `${{
      small: "p-2 rounded",
      medium: "p-2.5 rounded-md",
      large: "p-4 rounded-lg"
    }[r.size]} ${r.isValid ? "valid" : ""} ${r.isError ? "error" : ""}`), t = Z(e, "modelValue");
    return (s, a) => (f(), v("label", {
      class: V(["flex flex-col gap-2 has-[:disabled]:opacity-40", {
        "text-captation": s.size === "small",
        "text-normal": s.size === "medium",
        "text-body": s.size === "large",
        "text-green-600": s.isValid,
        "text-red-600": s.isError
      }])
    }, [
      s.label ? (f(), v("span", qt, T(s.label), 1)) : Y("", !0),
      h("div", {
        class: V([[o.value], "flex border-gray-300 bg-gray-50 border items-center input-container"])
      }, [
        w(s.$slots, "prefix", {}, void 0, !0),
        lt(h("input", He(s.$attrs, {
          name: s.name,
          "onUpdate:modelValue": a[0] || (a[0] = (n) => t.value = n),
          type: s.type,
          disabled: s.disabled,
          class: "flex-1 bg-transparent focus-visible:border-none focus-visible:outline-none focus:outline-none focus:shadow-none focus:ring-0 border-0 w-full"
        }), null, 16, Kt), [
          [it, t.value]
        ]),
        w(s.$slots, "suffix", {}, void 0, !0)
      ], 2),
      s.message ? (f(), v("span", Jt, T(s.message), 1)) : Y("", !0),
      w(s.$slots, "helper", {}, void 0, !0)
    ], 2));
  }
}), oe = (e, r) => {
  const o = e.__vccOpts || e;
  for (const [t, s] of r)
    o[t] = s;
  return o;
}, Qt = /* @__PURE__ */ oe(Xt, [["__scopeId", "data-v-1507d908"]]);
class re {
  constructor(r) {
    this.element = r;
  }
  setUIAttribute(r, o) {
    this.element.setAttribute(`data-coreui-${r}`, o);
  }
  removeUIAttribute(r) {
    this.element.removeAttribute(`data-coreui-${r}`);
  }
  onClick(r) {
    this.element.addEventListener("click", r);
  }
}
class Yt extends re {
  constructor(r) {
    super(r), this.init();
  }
  select() {
    this.setUIAttribute("tab-selected", "true"), this.element.setAttribute("aria-selected", "true"), this.element.removeAttribute("tabindex"), this.element.focus();
  }
  reset() {
    this.removeUIAttribute("tab-selected"), this.element.setAttribute("aria-selected", "false"), this.element.tabIndex = -1;
  }
  init() {
  }
  setAriaControls(r) {
    this.element.setAttribute("aria-controls", `coreui-tab-${r}`);
  }
}
class Zt extends re {
  constructor(o, t, s) {
    super(o);
    E(this, "_tabs", []);
    E(this, "selectedIndex", P(0));
    E(this, "defaultIndex");
    this.defaultIndex = t, this.selectedIndex.value = s ?? 0, this.init();
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
      const s = this.tabs[t];
      o === t ? (this.selectedIndex.value = o, s.select()) : s.reset();
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
const Oo = /* @__PURE__ */ S({
  __name: "Tabs",
  props: /* @__PURE__ */ de({
    defaultIndex: { default: 0 }
  }, {
    selectedIndex: { default: 0 },
    selectedIndexModifiers: {}
  }),
  emits: ["update:selectedIndex"],
  setup(e) {
    const r = e, o = Z(e, "selectedIndex"), t = P(null);
    function s(a) {
      const { selectedIndex: n } = new Zt(
        a,
        r.defaultIndex,
        o.value
      );
      ze(n, () => {
        o.value = n.value;
      });
    }
    return ze(o, () => {
      t.value && s(t.value);
    }), ie(() => {
      t.value && s(t.value);
    }), (a, n) => (f(), v("div", {
      ref_key: "tab_container",
      ref: t,
      role: "tablist"
    }, [
      w(a.$slots, "default")
    ], 512));
  }
}), Do = /* @__PURE__ */ S({
  __name: "Tab",
  props: {
    as: { type: [Object, Function, String], default: "button" },
    id: {},
    label: {},
    disabled: { type: Boolean },
    type: { default: "outlined" }
  },
  setup(e) {
    const r = e, o = P(null);
    let t = null;
    const s = P(!1), a = (c) => {
      for (const d of c)
        if (d.type === "attributes" && d.attributeName.startsWith("data-")) {
          const g = d.attributeName, b = d.target.getAttribute(g);
          s.value = !!b;
        }
    }, n = C(() => `${{
      outlined: `border-b-gray-300 border-b-2 group-active:border-gray-800 ${s.value ? "text-primary !border-b-primary hover:text-red-700 group-active:border-red-800 group-active:text-red-800" : ""}`,
      filled: `border-transparent border-b-2 border-x border-t hover:bg-red-50 group-active:bg-red-50  group-active:border-t group-active:border-x group-active:border-gray-800 ${s.value ? "bg-red-50 text-primary !border-b-primary hover:text-red-700 group-active:border-red-800 group-active:text-red-800" : ""}`
    }[r.type]}`);
    return ie(() => {
      o.value && (t = new MutationObserver(a), t.observe(o.value, {
        attributes: !0,
        // Watch attribute changes
        attributeFilter: ["data-coreui-tab-selected"],
        // Empty means all attributes
        subtree: !1
      }));
    }), We(() => {
      t && t.disconnect();
    }), (c, d) => (f(), G(ve(c.as), {
      ref_key: "tab",
      ref: o,
      disabled: c.disabled,
      "aria-disabled": c.disabled,
      class: "group focus:outline-none disabled:opacity-40 tab_button",
      "data-coreui-tab": `coreui-tab-${c.id}`,
      role: "tab"
    }, {
      default: A(() => [
        w(c.$slots, "default", { selected: s.value }, () => [
          h("div", {
            class: V([[n.value], "flex py-2 px-4 gap-2 text-body border-transparent group-focus:outline-none"])
          }, [
            w(c.$slots, "icon"),
            h("span", null, T(c.label), 1)
          ], 2)
        ])
      ]),
      _: 3
    }, 8, ["disabled", "aria-disabled", "data-coreui-tab"]));
  }
});
class eo extends re {
  constructor(r) {
    super(r), this.element.addEventListener("click", () => this.element.toggleAttribute("aria-expanded"));
  }
}
class to extends re {
  constructor(o, t) {
    super(o);
    E(this, "active", P(!1));
    this.element.id = t;
  }
  select() {
    this.active.value = !0, this.setUIAttribute("item-active", "true");
  }
  reset() {
    this.active.value = !1, this.removeUIAttribute("item-active");
  }
}
class oo extends re {
  constructor(o) {
    super(o);
    E(this, "_isOpen", !1);
    E(this, "_items", []);
    E(this, "selectedIndex", P(0));
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
      (t, s) => new to(t, String(s))
    ), (o = this.element.parentElement) == null || o.addEventListener("keydown", this.onKeydown.bind(this)), this._items.forEach((t, s) => {
      t.onClick(() => {
        this.setSelectedItem(s), this.close();
      });
    });
  }
  setSelectedItem(o) {
    this.setActiveItemId(o);
    for (var t = 0; t < this._items.length; t += 1) {
      const s = this._items[t];
      o === t ? (this.selectedIndex.value = o, s.select()) : s.reset();
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
class ro extends re {
  constructor(o) {
    super(o);
    E(this, "_button", null);
    E(this, "_menuItems", null);
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
    }), addEventListener("click", ({ target: s }) => {
      var a, n, c;
      !((a = this._menuItems) != null && a.element.contains(s)) && !((n = this._button) != null && n.element.contains(s)) && ((c = this._menuItems) == null || c.close());
    });
  }
}
const so = /* @__PURE__ */ S({
  __name: "Menu",
  props: {
    as: { type: [Object, Function, String], default: "div" }
  },
  setup(e) {
    const r = P(null);
    function o(t) {
      new ro(t);
    }
    return ie(() => {
      r.value && o(r.value);
    }), (t, s) => (f(), G(ve(t.as), {
      ref_key: "menu_container",
      ref: r
    }, {
      default: A(() => [
        w(t.$slots, "default")
      ]),
      _: 3
    }, 512));
  }
}), no = /* @__PURE__ */ S({
  __name: "MenuButton",
  props: {
    as: { type: [Object, Function, String], default: "button" }
  },
  setup(e) {
    return (r, o) => (f(), G(ve(r.as), {
      "data-coreui-button": "",
      "aria-haspopup": "true"
    }, {
      default: A(() => [
        w(r.$slots, "default")
      ]),
      _: 3
    }));
  }
}), ao = /* @__PURE__ */ S({
  __name: "MenuItem",
  props: {
    as: { type: [Object, Function, String], default: "div" }
  },
  setup(e) {
    const r = P(!1);
    return (o, t) => (f(), G(ve(o.as), {
      active: r.value,
      role: "menuitem"
    }, {
      default: A(() => [
        w(o.$slots, "default")
      ]),
      _: 3
    }, 8, ["active"]));
  }
}), lo = {}, io = {
  role: "menu",
  tabindex: "-1",
  style: { display: "none" }
};
function co(e, r) {
  return f(), v("div", io, [
    w(e.$slots, "default")
  ]);
}
const uo = /* @__PURE__ */ oe(lo, [["render", co]]), mo = { key: 0 }, po = { key: 1 }, bo = ["onClick"], Fo = /* @__PURE__ */ S({
  __name: "Dropdown",
  props: /* @__PURE__ */ de({
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
    const r = e, o = Z(e, "modelValue"), t = Z(e, "option"), s = C(() => {
      const a = {
        small: "text-xs dropdown-small",
        regular: "text-base dropdown-regular",
        default: "border border-gray-300 bg-gray-50 dropdown-default",
        floating: "dropdown-floating"
      };
      return `${a[r.size]} ${a[r.type]}`;
    });
    return ie(() => {
      t.value = r.options.find((a) => a.value === o.value);
    }), (a, n) => (f(), G(le(so), { class: "relative" }, {
      default: A(() => [
        ke(le(no), {
          class: "flex flex-col gap-2 cursor-pointer",
          as: "div"
        }, {
          default: A(() => [
            h("span", null, T(a.label), 1),
            h("div", {
              class: V(["py-3 px-4 flex text-gray-700 justify-between items-center min-w-72 rounded-lg w-full", s.value])
            }, [
              t.value ? (f(), v("span", mo, T(t.value.label), 1)) : (f(), v("span", po, "Cliquer pour sélectionner")),
              w(a.$slots, "icon", {}, () => [
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
        ke(le(uo), { class: "absolute right-0 left-0 mt-1 origin-top-right rounded-lg bg-white focus:outline-none p-2 gap-1 z-50 shadow-lg dropdown-items" }, {
          default: A(() => [
            (f(!0), v(X, null, Q(a.options, (c) => (f(), v("div", {
              onClick: () => {
                o.value = c.value, t.value = c;
              }
            }, [
              w(a.$slots, "option", {
                role: "menuitem",
                option: c
              }, () => [
                ke(le(ao), { class: "text-normal cursor-pointer p-2 flex justify-between items-center" }, {
                  default: A(() => [
                    qe(T(c.label), 1)
                  ]),
                  _: 2
                }, 1024)
              ])
            ], 8, bo))), 256))
          ]),
          _: 3
        })
      ]),
      _: 3
    }));
  }
}), fo = ["disabled"], go = {
  key: 0,
  class: "loader h-5 w-5"
}, ho = /* @__PURE__ */ S({
  __name: "Button",
  props: {
    color: { default: "primary" },
    size: { default: "medium" },
    loading: { type: Boolean, default: !1 }
  },
  setup(e) {
    const r = e, o = C(() => {
      const t = {
        small: "button-small px-3 py-1.5 text-xs",
        medium: "button-medium px-4 py-2",
        large: "button-large px-5 py-3",
        primary: "button-primary",
        secondary: "button-secondary",
        outlined: "button-outlined bg-transparent border-gray-300 active:border-gray-400 focus:border-black disabled:border-gray-200 disabled:text-gray-400"
      };
      return `${t[r.size]} ${t[r.color]}`;
    });
    return (t, s) => (f(), v("button", {
      class: V([[o.value], "flex justify-center items-center rounded-lg border gap-4"]),
      disabled: t.loading
    }, [
      t.loading ? (f(), v("div", go)) : Y("", !0),
      w(t.$slots, "prefix", {}, void 0, !0),
      w(t.$slots, "default", {}, void 0, !0),
      w(t.$slots, "suffix", {}, void 0, !0)
    ], 10, fo));
  }
}), Uo = /* @__PURE__ */ oe(ho, [["__scopeId", "data-v-17b2ccb1"]]), vo = {}, wo = { scope: "col" };
function yo(e, r) {
  return f(), v("th", wo, [
    w(e.$slots, "default")
  ]);
}
const xo = /* @__PURE__ */ oe(vo, [["render", yo]]), ko = {}, _o = { class: "row border-b-0.5 border-b-gray-300 last:border-b-transparent" };
function Io(e, r) {
  return f(), v("tr", _o, [
    w(e.$slots, "default")
  ]);
}
const zo = /* @__PURE__ */ oe(ko, [["render", Io]]), $o = {}, Co = { class: "px-2.5 py-5 data" };
function Mo(e, r) {
  return f(), v("td", Co, [
    w(e.$slots, "default")
  ]);
}
const So = /* @__PURE__ */ oe($o, [["render", Mo]]), Ao = { class: "bg-white overflow-hidden table-container" }, To = { class: "w-full" }, Po = { key: 1 }, Eo = ["colspan"], Wo = /* @__PURE__ */ S({
  __name: "Table",
  props: {
    headers: {},
    data: {},
    loading: { type: Boolean }
  },
  emits: ["rowHovered", "rowDblClick"],
  setup(e, { emit: r }) {
    const o = e, t = r, { isOnMobileDevice: s } = ct(), a = C(() => !s.value || o.headers.every((d) => !d.mobile) ? o.headers : o.headers.filter((d) => d.mobile)), n = C(() => o.headers.length);
    function c(d, g) {
      let b = d[String(g.field)];
      return b || (b = "-"), typeof g.formatter == "function" && (b = g.formatter(d)), b;
    }
    return (d, g) => (f(), v("div", Ao, [
      h("table", To, [
        h("thead", null, [
          (f(!0), v(X, null, Q(a.value, (b) => (f(), G(xo, {
            key: `${b.field}_header`,
            class: V(b.thClass)
          }, {
            default: A(() => [
              qe(T(b.label), 1)
            ]),
            _: 2
          }, 1032, ["class"]))), 128))
        ]),
        h("tbody", null, [
          d.loading ? (f(!0), v(X, { key: 0 }, Q(a.value, (b, k) => (f(), v("tr", {
            class: "",
            key: k
          }, [
            (f(!0), v(X, null, Q(a.value, (y) => (f(), v("td", {
              class: "p-4",
              key: `cell_${y.field}_item${b.field}`
            }, g[1] || (g[1] = [
              h("div", { class: "h-4 mx-auto animate-pulse bg-gray-200 rounded-full" }, null, -1)
            ])))), 128))
          ]))), 128)) : d.data.length ? (f(!0), v(X, { key: 2 }, Q(d.data, (b, k) => (f(), G(zo, {
            onMouseover: (y) => t("rowHovered", { idx: k, item: b }),
            onMouseleave: g[0] || (g[0] = (y) => t("rowHovered", null)),
            onDblclick: (y) => t("rowDblClick", { idx: k, item: b }),
            key: k
          }, {
            default: A(() => [
              (f(!0), v(X, null, Q(a.value, (y) => (f(), G(So, {
                class: V(y.tdClass)
              }, {
                default: A(() => [
                  w(d.$slots, `${y.field}`, {
                    item: b,
                    value: c(b, y),
                    idx: k
                  }, () => [
                    h("span", null, T(c(b, y)), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["class"]))), 256))
            ]),
            _: 2
          }, 1032, ["onMouseover", "onDblclick"]))), 128)) : (f(), v("tr", Po, [
            h("td", { colspan: n.value }, [
              w(d.$slots, "empty", {}, () => [
                g[2] || (g[2] = h("div", { class: "w-full py-16 text-center" }, " Aucune donnée disponible ", -1))
              ])
            ], 8, Eo)
          ]))
        ])
      ])
    ]));
  }
}), Vo = { class: "flex items-center text-true-gray-600" }, Bo = { class: "ml-2" }, No = ["disabled"], Lo = ["disabled"], Ho = /* @__PURE__ */ S({
  __name: "TablePagination",
  props: /* @__PURE__ */ de({
    total: {},
    pageSize: { default: 0 },
    modelValue: { default: 1 }
  }, {
    modelValue: { required: !0 },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const r = e, o = Z(e, "modelValue"), t = ut({
      totalItems: C(() => r.total),
      pageSize: P(r.pageSize),
      currentPage: o
    }), s = Ue({
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
    return dt(() => {
      s.startIndex = t.startIndex.value, s.endIndex = t.endIndex.value, s.totalItems = t.totalItems.value, s.isNextEnabled = t.isNextEnabled.value, s.isPreviousEnabled = t.isPreviousEnabled.value, s.onNextClick = t.nextPage, s.onPreviousClick = t.previousPage, o.value = t.currentPage.value;
    }), (a, n) => (f(), v("div", Vo, [
      h("span", null, T(s.startIndex + 1) + " - " + T(s.endIndex + 1), 1),
      n[4] || (n[4] = h("span", { class: "ml-2" }, "sur", -1)),
      h("span", Bo, T(s.totalItems), 1),
      h("button", {
        disabled: !s.isPreviousEnabled,
        class: V(["ml-4 flex w-8 h-8 rounded-full items-center justify-center cursor-pointer hover:bg-gray-100 active:bg-gray-200 focus:outline-none", {
          "pointer-events-none text-gray-400": !s.isPreviousEnabled
        }]),
        onClick: n[0] || (n[0] = //@ts-ignore
        (...c) => s.onPreviousClick && s.onPreviousClick(...c))
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
      ]), 10, No),
      h("button", {
        disabled: !s.isNextEnabled,
        class: V(["flex w-8 h-8 rounded-full items-center justify-center cursor-pointer hover:bg-gray-100 active:bg-gray-200 focus:outline-none", {
          "pointer-events-none text-gray-400": !s.isNextEnabled
        }]),
        onClick: n[1] || (n[1] = //@ts-ignore
        (...c) => s.onNextClick && s.onNextClick(...c))
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
      ]), 10, Lo)
    ]));
  }
}), qo = /* @__PURE__ */ S({
  __name: "DataTable",
  setup(e) {
    return (r, o) => (f(), v("div", null, "DataTable component"));
  }
}), Ko = /* @__PURE__ */ S({
  __name: "SearchInput",
  props: /* @__PURE__ */ de({
    size: { default: "small" }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const r = Z(e, "modelValue");
    return (o, t) => (f(), G(le(Qt), {
      size: o.size,
      name: "search",
      modelValue: r.value,
      "onUpdate:modelValue": t[0] || (t[0] = (s) => r.value = s),
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
  qo as DataTable,
  Fo as Dropdown,
  Qt as Input,
  so as Menu,
  no as MenuButton,
  ao as MenuItem,
  uo as MenuItems,
  Ko as SearchInput,
  Do as Tab,
  Wo as Table,
  So as TableData,
  Ho as TablePagination,
  zo as TableRow,
  xo as TableTh,
  Oo as Tabs,
  ut as usePagination,
  ct as useWindowSize
};
