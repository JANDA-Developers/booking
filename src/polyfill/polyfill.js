!window.addEventListener &&
  (function(e, t, n, r, i, s, o) {
    (e[r] = t[r] = n[r] = function(e, t) {
      var n = this;
      o.unshift([
        n,
        e,
        t,
        function(e) {
          (e.currentTarget = n),
            (e.preventDefault = function() {
              e.returnValue = !1;
            }),
            (e.stopPropagation = function() {
              e.cancelBubble = !0;
            }),
            (e.target = e.srcElement || n),
            t.call(n, e);
        }
      ]),
        this.attachEvent("on" + e, o[0][3]);
    }),
      (e[i] = t[i] = n[i] = function(e, t) {
        for (var n = 0, r; (r = o[n]); ++n)
          if (r[0] == this && r[1] == e && r[2] == t)
            return this.detachEvent("on" + e, o.splice(n, 1)[0][3]);
      }),
      (e[s] = t[s] = n[s] = function(e) {
        return this.fireEvent("on" + e.type, e);
      });
  })(
    Window.prototype,
    HTMLDocument.prototype,
    Element.prototype,
    "addEventListener",
    "removeEventListener",
    "dispatchEvent",
    []
  );
