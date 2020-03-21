! function(e) { var t = {};

  function n(o) { if (t[o]) return t[o].exports; var r = t[o] = { i: o, l: !1, exports: {} }; return e[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports }
  n.m = e, n.c = t, n.d = function(e, t, o) { n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o }) }, n.r = function(e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }) }, n.t = function(e, t) { if (1 & t && (e = n(e)), 8 & t) return e; if (4 & t && "object" == typeof e && e && e.__esModule) return e; var o = Object.create(null); if (n.r(o), Object.defineProperty(o, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e)
      for (var r in e) n.d(o, r, function(t) { return e[t] }.bind(null, r)); return o }, n.n = function(e) { var t = e && e.__esModule ? function() { return e.default } : function() { return e }; return n.d(t, "a", t), t }, n.o = function(e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, n.p = "", n(n.s = 0) }([function(e, t, n) { n(1), e.exports = n(2) }, function(e, t) { let n; const o = indexedDB.open("budget", 1);

  function r() { const e = n.transaction(["pending"], "readwrite").objectStore("pending").getAll();
    e.onsuccess = function() { e.result.length > 0 && fetch("/api/transaction/bulk", { method: "POST", body: JSON.stringify(e.result), headers: { Accept: "application/json, text/plain, */*", "Content-Type": "application/json" } }).then(e => e.json()).then(() => { n.transaction(["pending"], "readwrite").objectStore("pending").clear() }) } }
  o.onupgradeneeded = function(e) { e.target.result.createObjectStore("pending", { autoIncrement: !0 }) }, o.onsuccess = function(e) { n = e.target.result, navigator.onLine && r() }, o.onerror = function(e) { console.log("Woops! " + e.target.errorCode) }, window.addEventListener("online", r) }, function(e, t) { let n, o = [];

  function r() { let e = o.reduce((e, t) => e + parseInt(t.value), 0);
    document.querySelector("#total").textContent = e }

  function a() { let e = document.querySelector("#tbody");
    e.innerHTML = "", o.forEach(t => { let n = document.createElement("tr");
      n.innerHTML = `\n      <td>${t.name}</td>\n      <td>${t.value}</td>\n    `, e.appendChild(n) }) }

  function u() { let e = o.slice().reverse(),
      t = 0,
      r = e.map(e => { let t = new Date(e.date); return `${t.getMonth()+1}/${t.getDate()}/${t.getFullYear()}` }),
      a = e.map(e => (t += parseInt(e.value), t));
    n && n.destroy(); let u = document.getElementById("myChart").getContext("2d");
    n = new Chart(u, { type: "line", data: { labels: r, datasets: [{ label: "Total Over Time", fill: !0, backgroundColor: "#6666ff", data: a }] } }) }

  function i(e) { let t = document.querySelector("#t-name"),
      n = document.querySelector("#t-amount"),
      i = document.querySelector(".form .error"); if ("" === t.value || "" === n.value) return void(i.textContent = "Missing Information");
    i.textContent = ""; let c = { name: t.value, value: n.value, date: (new Date).toISOString() };
    e || (c.value *= -1), o.unshift(c), u(), a(), r(), fetch("/api/transaction", { method: "POST", body: JSON.stringify(c), headers: { Accept: "application/json, text/plain, */*", "Content-Type": "application/json" } }).then(e => e.json()).then(e => { e.errors ? i.textContent = "Missing Information" : (t.value = "", n.value = "") }).catch(e => { saveRecord(c), t.value = "", n.value = "" }) }
  fetch("/api/transaction").then(e => e.json()).then(e => { o = e, r(), a(), u() }), document.querySelector("#add-btn").onclick = function() { i(!0) }, document.querySelector("#sub-btn").onclick = function() { i(!1) } }]);