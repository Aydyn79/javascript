(function(e){function t(t){for(var r,u,a=t[0],i=t[1],s=t[2],p=0,l=[];p<a.length;p++)u=a[p],Object.prototype.hasOwnProperty.call(o,u)&&o[u]&&l.push(o[u][0]),o[u]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);f&&f(t);while(l.length)l.shift()();return c.push.apply(c,s||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,a=1;a<n.length;a++){var i=n[a];0!==o[i]&&(r=!1)}r&&(c.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},o={app:0},c=[];function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],i=a.push.bind(a);a.push=t,a=a.slice();for(var s=0;s<a.length;s++)t(a[s]);var f=i;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23"),o={id:"nav"};function c(e,t,n,c,u,a){var i=Object(r["r"])("router-view");return Object(r["n"])(),Object(r["c"])("div",o,[Object(r["e"])(i),Object(r["d"])(" "+Object(r["t"])(u.showcase),1)])}n("d3b7");var u={data:function(){return{showcase:null}},mounted:function(){var e=this;fetch("/api/v1/showcase").then((function(e){return e.json()})).then((function(t){e.showcase=t}))}},a=n("6b0d"),i=n.n(a);const s=i()(u,[["render",c]]);var f=s,p=n("6c02"),l={class:"home"};function b(e,t,n,o,c,u){return Object(r["n"])(),Object(r["c"])("div",l)}var d={name:"Home"};const v=i()(d,[["render",b]]);var h=v,O=[{path:"/",name:"Home",component:h}],j=Object(p["a"])({history:Object(p["b"])("/"),routes:O}),y=j,m=n("5502"),w=Object(m["a"])({state:{},mutations:{},actions:{},modules:{}});Object(r["b"])(f).use(w).use(y).mount("#app")}});
//# sourceMappingURL=app.e7508907.js.map