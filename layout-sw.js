var e = function(e, n) {
  if (!(e instanceof n))
    throw new TypeError("Cannot call a class as a function");
};
function n(e, n) {
  for (var t = 0; t < n.length; t++) {
    var r = n[t];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, r.key, r);
  }
}
var t = function(e, t, r) {
  return t && n(e.prototype, t), r && n(e, r), e;
};
(function() {
  function n() {
    e(this, n);
  }
  return (
    t(n, null, [
      {
        key: "run",
        value: function() {
          addEventListener("install", n.onInstalled),
            addEventListener("fetch", n.onFetched),
            addEventListener("register", n.onRegister);
        }
      },
      { key: "onInstalled", value: function(e) {} },
      { key: "onRegister", value: function(e) {} },
      {
        key: "onFetched",
        value: function(e) {
          e.respondWith(
            caches.match(e.request).then(function(n) {
              return (
                n ||
                fetch(e.request).then(function(n) {
                  return caches.open("v0.1").then(function(t) {
                    return t.put(e.request, n.clone()), n;
                  });
                })
              );
            })
          );
        }
      }
    ]),
    n
  );
})().run();
