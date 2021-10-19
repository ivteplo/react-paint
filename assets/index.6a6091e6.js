var j=Object.defineProperty,M=Object.defineProperties;var z=Object.getOwnPropertyDescriptors;var f=Object.getOwnPropertySymbols;var S=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable;var T=(t,e,n)=>e in t?j(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,h=(t,e)=>{for(var n in e||(e={}))S.call(e,n)&&T(t,n,e[n]);if(f)for(var n of f(e))B.call(e,n)&&T(t,n,e[n]);return t},g=(t,e)=>M(t,z(e));var p=(t,e)=>{var n={};for(var i in t)S.call(t,i)&&e.indexOf(i)<0&&(n[i]=t[i]);if(t!=null&&f)for(var i of f(t))e.indexOf(i)<0&&B.call(t,i)&&(n[i]=t[i]);return n};import{j as k,r as d,R as D,a as O}from"./vendor.dae3a640.js";const A=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}};A();const u=k.exports.jsx,m=k.exports.jsxs,y={"Ultra Small":2,Small:4,Medium:6,Large:8,"Extra Large":10};function W(t){return y[t]}function U(i){var r=i,{brushSize:t,className:e}=r,n=p(r,["brushSize","className"]);return u("button",g(h({type:"button",title:t,className:"BrushSizeButton "+(e!=null?e:"")},n),{children:u("span",{style:{width:W(t)+"px"}})}))}const x={Red:"#dd2a2a",Orange:"#ffa501",Yellow:"#ffd400",Green:"#129d12","Light blue":"#80d8f5",Blue:"#2875d5",Purple:"#801ddb",Black:"#000","Dark gray":"#333",Gray:"#777","Light gray":"#ccc",White:"#fff"};function F(t){return x[t]}function G(i){var r=i,{brushColor:t,className:e}=r,n=p(r,["brushColor","className"]);return u("button",g(h({type:"button",title:t,className:"BrushColorButton "+(e!=null?e:"")},n),{children:u("span",{style:{backgroundColor:F(t)}})}))}const L=({clientX:t,clientY:e})=>[t,e],R=t=>{const{left:e,top:n}=t.currentTarget.getBoundingClientRect();let i;return t.type.startsWith("mouse")?(t=t,i=L(t)):(t=t,i=L(t.touches[0])),[i[0]-e,i[1]-n]};function C(i){var r=i,{title:t,children:e}=r,n=p(r,["title","children"]);return m("section",g(h({className:"ToolbarSection column fill"},n),{children:[u("h2",{children:t}),u("div",{className:"row buttonWrapper",children:e})]}))}function I(t,e){const n=document.createElement("a");n.download=e,n.href=t,n.click()}function N(){const t=d.exports.useRef(null);let[e,n]=d.exports.useState(y["Extra Large"]),[i,r]=d.exports.useState(x.Blue),s=!1;const l=o=>{s=!0;const c=o.currentTarget.getContext("2d"),a=R(o);c.beginPath(),c.moveTo(...a),c.strokeStyle=i,c.lineWidth=e},v=o=>{if(o.type==="mousemove"&&!s)return;const c=o.currentTarget.getContext("2d"),a=R(o);c.lineTo(...a),c.stroke(),c.closePath(),c.beginPath(),c.moveTo(...a)},w=o=>{s=!1,o.currentTarget.getContext("2d").closePath()},P=()=>{if(!t.current)return;const o=t.current.getContext("2d");o.clearRect(0,0,o.canvas.width,o.canvas.height)},E=()=>{if(!t.current)return;const o=t.current.toDataURL("image/png");I(o,"painting.png")},b=()=>{if(!t.current)return;const o=t.current;o.removeAttribute("width"),o.removeAttribute("height"),o.width=o.offsetWidth,o.height=o.offsetHeight;const c=o.getContext("2d");c.lineJoin="round",c.lineCap="round";const a=getComputedStyle(document.body).getPropertyValue("--canvas-background");c.fillStyle=a,c.fillRect(0,0,o.width,o.height),c.fillStyle="transparent"};return d.exports.useEffect(()=>b(),[t]),d.exports.useEffect(()=>(window.addEventListener("resize",b),()=>{window.removeEventListener("resize",b)}),[]),m("div",{className:"App column fill",children:[m("div",{className:"Toolbar row",children:[m(C,{title:"Painting",children:[u("button",{type:"button",onClick:E,children:"Save"}),u("button",{type:"button",onClick:P,children:"Clear"})]}),u(C,{title:"Brush size",children:Object.entries(y).map(([o,c])=>u(U,{onClick:()=>n(c),className:c===e?"active":"",brushSize:o},o))}),u(C,{title:"Brush color",children:Object.entries(x).map(([o,c])=>u(G,{onClick:()=>r(c),className:c===i?"active":"",brushColor:o},o))})]}),u("canvas",{ref:t,onMouseDown:l,onTouchStart:l,onMouseMove:v,onTouchMove:v,onMouseUp:w,onTouchEnd:w,className:"fill"})]})}D.render(u(O.StrictMode,{children:u(N,{})}),document.getElementById("root"));
