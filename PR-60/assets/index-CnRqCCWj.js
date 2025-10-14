import{j as h}from"./jsx-runtime-CB_V9I5Y.js";import{B as M}from"./index-CWvrgZ1b.js";import{I as F}from"./Icon-DG6KDu5A.js";import{T as V}from"./Typography-DOQ44quZ.js";import{B as G}from"./Button-DSrMKdf0.js";import{k as J}from"./emotion-react.browser.esm-Bwsi5GpN.js";import{f as O,d as X}from"./emotion-styled.browser.esm-DBghOYGd.js";import{r as p}from"./index-CTjT7uj6.js";var ee=(e=>(e.TopLeft="top-left",e.TopCenter="top-center",e.TopRight="top-right",e.BottomLeft="bottom-left",e.BottomCenter="bottom-center",e.BottomRight="bottom-right",e))(ee||{}),E=(e=>(e.Success="success",e.Error="error",e.Info="informative",e.Warning="warning",e))(E||{});const te=J`
  from { opacity: 0; }
  to   { opacity: 1; }
`,ae=O.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  animation: ${te} 0.75s ease-in;
  transition: all 0.75s ease-in-out;
  overflow: hidden;
  ${({theme:e,isVisible:t,toastType:a})=>`
    border: 1px solid ${e.palette[a].default};
    border-left: 6px solid ${e.palette[a].default};
    background-color: ${e.palette[a].light};
    opacity: ${t?1:0};
    border-radius: ${e.shape.toast};
    padding: ${e.spacing.spacing_50} ${e.spacing.spacing_50} ${e.spacing.spacing_50} ${e.spacing.spacing_30};
  `}
`,re=O.div`
  ${({theme:e,toastType:t})=>`
    ${e.fontStyles.bodyMdRegular};
    color: ${e.palette[t].dark};
    overflow: hidden;
    word-break: break-word;
    hyphens: auto;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    margin-inline: calc(24px + ${e.spacing.spacing_30})
  `}
`,oe=O.button`
  ${({theme:e,toastType:t})=>`
    color: ${e.palette[t].dark};
    border: 0;
    cursor: pointer;
    background: transparent;
    align-self: flex-start;
    margin-left: auto;
    font-size: 0;
    line-height: 0;

    &:focus-visible {
      outline: 2px solid ${e.palette.primary.default};
      outline-offset: 1px;
    }
    
  `}
`,se=O(G)`
  ${({theme:e,toastType:t})=>`
    color: ${e.palette[t].dark};

    &:hover {
      background-color: ${e.palette[t].medium};
      color: ${e.palette[t].dark};
    }
`}
`,ie={[E.Success]:"check_circle",[E.Error]:"error",[E.Info]:"info",[E.Warning]:"warning"},at=({id:e,dataTestId:t,title:a,message:s,onClose:i,type:o,isVisible:r=!0,dismissible:n=!0,actions:l})=>{const u=t??`toast-${e}`,d=X();return h.jsxs(ae,{"data-testid":u,isVisible:r,toastType:o,children:[h.jsxs(M,{style:{alignSelf:"start",flexDirection:"row",width:"100%",gap:d.spacing.spacing_30},children:[h.jsx(F,{code:ie[o],color:d.palette[o].dark}),h.jsx(V,{color:`${o}.dark`,element:"span",fontStyles:"bodyLgBold",style:{textTransform:"capitalize"},children:a}),n?h.jsx(oe,{"data-testId":"close-button",onClick:i,toastType:o,children:h.jsx(F,{code:"close",color:d.palette[o].dark})}):null]}),h.jsx(re,{toastType:o,children:s}),l&&(l==null?void 0:l.length)>0?h.jsx(M,{style:{flexDirection:"row",justifyContent:"flex-end",gap:d.spacing.spacing_20,marginTop:d.spacing.spacing_30},children:l.map(({label:c,onClick:f,dataTestId:m},k)=>k<=1?h.jsx(se,{dataTestId:m,onClick:f,size:"small",toastType:o,variant:"text",children:c},c):null)}):null]},e)};let ne={data:""},le=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||ne,de=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,ce=/\/\*[^]*?\*\/|  +/g,H=/\n+/g,w=(e,t)=>{let a="",s="",i="";for(let o in e){let r=e[o];o[0]=="@"?o[1]=="i"?a=o+" "+r+";":s+=o[1]=="f"?w(r,o):o+"{"+w(r,o[1]=="k"?"":t)+"}":typeof r=="object"?s+=w(r,t?t.replace(/([^,])+/g,n=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,n):n?n+" "+l:l)):o):r!=null&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=w.p?w.p(o,r):o+":"+r+";")}return a+(t&&i?t+"{"+i+"}":i)+s},x={},P=e=>{if(typeof e=="object"){let t="";for(let a in e)t+=a+P(e[a]);return t}return e},pe=(e,t,a,s,i)=>{let o=P(e),r=x[o]||(x[o]=(l=>{let u=0,d=11;for(;u<l.length;)d=101*d+l.charCodeAt(u++)>>>0;return"go"+d})(o));if(!x[r]){let l=o!==e?e:(u=>{let d,c,f=[{}];for(;d=de.exec(u.replace(ce,""));)d[4]?f.shift():d[3]?(c=d[3].replace(H," ").trim(),f.unshift(f[0][c]=f[0][c]||{})):f[0][d[1]]=d[2].replace(H," ").trim();return f[0]})(e);x[r]=w(i?{["@keyframes "+r]:l}:l,a?"":"."+r)}let n=a&&x.g?x.g:null;return a&&(x.g=x[r]),((l,u,d,c)=>{c?u.data=u.data.replace(c,l):u.data.indexOf(l)===-1&&(u.data=d?l+u.data:u.data+l)})(x[r],t,s,n),r},ue=(e,t,a)=>e.reduce((s,i,o)=>{let r=t[o];if(r&&r.call){let n=r(a),l=n&&n.props&&n.props.className||/^go/.test(n)&&n;r=l?"."+l:n&&typeof n=="object"?n.props?"":w(n,""):n===!1?"":n}return s+i+(r??"")},"");function S(e){let t=this||{},a=e.call?e(t.p):e;return pe(a.unshift?a.raw?ue(a,[].slice.call(arguments,1),t.p):a.reduce((s,i)=>Object.assign(s,i&&i.call?i(t.p):i),{}):a,le(t.target),t.g,t.o,t.k)}let W,_,B;S.bind({g:1});let v=S.bind({k:1});function fe(e,t,a,s){w.p=t,W=e,_=a,B=s}function $(e,t){let a=this||{};return function(){let s=arguments;function i(o,r){let n=Object.assign({},o),l=n.className||i.className;a.p=Object.assign({theme:_&&_()},n),a.o=/ *go\d+/.test(l),n.className=S.apply(a,s)+(l?" "+l:"");let u=e;return e[0]&&(u=n.as||e,delete n.as),B&&u[0]&&B(n),W(u,n)}return t?t(i):i}}var me=e=>typeof e=="function",D=(e,t)=>me(e)?e(t):e,ge=(()=>{let e=0;return()=>(++e).toString()})(),U=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),ye=20,N="default",Y=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(r=>r.id===t.toast.id?{...r,...t.toast}:r)};case 2:let{toast:s}=t;return Y(e,{type:e.toasts.find(r=>r.id===s.id)?1:0,toast:s});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(r=>r.id===i||i===void 0?{...r,dismissed:!0,visible:!1}:r)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(r=>r.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(r=>({...r,pauseDuration:r.pauseDuration+o}))}}},I=[],Z={toasts:[],pausedAt:void 0,settings:{toastLimit:ye}},b={},q=(e,t=N)=>{b[t]=Y(b[t]||Z,e),I.forEach(([a,s])=>{a===t&&s(b[t])})},K=e=>Object.keys(b).forEach(t=>q(e,t)),be=e=>Object.keys(b).find(t=>b[t].toasts.some(a=>a.id===e)),T=(e=N)=>t=>{q(t,e)},he={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},xe=(e={},t=N)=>{let[a,s]=p.useState(b[t]||Z),i=p.useRef(b[t]);p.useEffect(()=>(i.current!==b[t]&&s(b[t]),I.push([t,s]),()=>{let r=I.findIndex(([n])=>n===t);r>-1&&I.splice(r,1)}),[t]);let o=a.toasts.map(r=>{var n,l,u;return{...e,...e[r.type],...r,removeDelay:r.removeDelay||((n=e[r.type])==null?void 0:n.removeDelay)||(e==null?void 0:e.removeDelay),duration:r.duration||((l=e[r.type])==null?void 0:l.duration)||(e==null?void 0:e.duration)||he[r.type],style:{...e.style,...(u=e[r.type])==null?void 0:u.style,...r.style}}});return{...a,toasts:o}},ve=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(a==null?void 0:a.id)||ge()}),j=e=>(t,a)=>{let s=ve(t,e,a);return T(s.toasterId||be(s.id))({type:2,toast:s}),s.id},g=(e,t)=>j("blank")(e,t);g.error=j("error");g.success=j("success");g.loading=j("loading");g.custom=j("custom");g.dismiss=(e,t)=>{let a={type:3,toastId:e};t?T(t)(a):K(a)};g.dismissAll=e=>g.dismiss(void 0,e);g.remove=(e,t)=>{let a={type:4,toastId:e};t?T(t)(a):K(a)};g.removeAll=e=>g.remove(void 0,e);g.promise=(e,t,a)=>{let s=g.loading(t.loading,{...a,...a==null?void 0:a.loading});return typeof e=="function"&&(e=e()),e.then(i=>{let o=t.success?D(t.success,i):void 0;return o?g.success(o,{id:s,...a,...a==null?void 0:a.success}):g.dismiss(s),i}).catch(i=>{let o=t.error?D(t.error,i):void 0;o?g.error(o,{id:s,...a,...a==null?void 0:a.error}):g.dismiss(s)}),e};var we=1e3,$e=(e,t="default")=>{let{toasts:a,pausedAt:s}=xe(e,t),i=p.useRef(new Map).current,o=p.useCallback((c,f=we)=>{if(i.has(c))return;let m=setTimeout(()=>{i.delete(c),r({type:4,toastId:c})},f);i.set(c,m)},[]);p.useEffect(()=>{if(s)return;let c=Date.now(),f=a.map(m=>{if(m.duration===1/0)return;let k=(m.duration||0)+m.pauseDuration-(c-m.createdAt);if(k<0){m.visible&&g.dismiss(m.id);return}return setTimeout(()=>g.dismiss(m.id,t),k)});return()=>{f.forEach(m=>m&&clearTimeout(m))}},[a,s,t]);let r=p.useCallback(T(t),[t]),n=p.useCallback(()=>{r({type:5,time:Date.now()})},[r]),l=p.useCallback((c,f)=>{r({type:1,toast:{id:c,height:f}})},[r]),u=p.useCallback(()=>{s&&r({type:6,time:Date.now()})},[s,r]),d=p.useCallback((c,f)=>{let{reverseOrder:m=!1,gutter:k=8,defaultPosition:L}=f||{},z=a.filter(y=>(y.position||L)===(c.position||L)&&y.height),Q=z.findIndex(y=>y.id===c.id),R=z.filter((y,A)=>A<Q&&y.visible).length;return z.filter(y=>y.visible).slice(...m?[R+1]:[0,R]).reduce((y,A)=>y+(A.height||0)+k,0)},[a]);return p.useEffect(()=>{a.forEach(c=>{if(c.dismissed)o(c.id,c.removeDelay);else{let f=i.get(c.id);f&&(clearTimeout(f),i.delete(c.id))}})},[a,o]),{toasts:a,handlers:{updateHeight:l,startPause:n,endPause:u,calculateOffset:d}}},ke=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Ee=v`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,je=v`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Ce=$("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ke} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Ee} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${je} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Ie=v`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,De=$("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Ie} 1s linear infinite;
`,Oe=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Se=v`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,Te=$("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Oe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Se} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,ze=$("div")`
  position: absolute;
`,Ae=$("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,_e=v`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Be=$("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${_e} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Ne=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return t!==void 0?typeof t=="string"?p.createElement(Be,null,t):t:a==="blank"?null:p.createElement(Ae,null,p.createElement(De,{...s}),a!=="loading"&&p.createElement(ze,null,a==="error"?p.createElement(Ce,{...s}):p.createElement(Te,{...s})))},Le=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Re=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Me="0%{opacity:0;} 100%{opacity:1;}",Fe="0%{opacity:1;} 100%{opacity:0;}",He=$("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Pe=$("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,We=(e,t)=>{let a=e.includes("top")?1:-1,[s,i]=U()?[Me,Fe]:[Le(a),Re(a)];return{animation:t?`${v(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${v(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Ue=p.memo(({toast:e,position:t,style:a,children:s})=>{let i=e.height?We(e.position||t||"top-center",e.visible):{opacity:0},o=p.createElement(Ne,{toast:e}),r=p.createElement(Pe,{...e.ariaProps},D(e.message,e));return p.createElement(He,{className:e.className,style:{...i,...a,...e.style}},typeof s=="function"?s({icon:o,message:r}):p.createElement(p.Fragment,null,o,r))});fe(p.createElement);var Ye=({id:e,className:t,style:a,onHeightUpdate:s,children:i})=>{let o=p.useCallback(r=>{if(r){let n=()=>{let l=r.getBoundingClientRect().height;s(e,l)};n(),new MutationObserver(n).observe(r,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return p.createElement("div",{ref:o,className:t,style:a},i)},Ze=(e,t)=>{let a=e.includes("top"),s=a?{top:0}:{bottom:0},i=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:U()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...s,...i}},qe=S`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,C=16,rt=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:i,toasterId:o,containerStyle:r,containerClassName:n})=>{let{toasts:l,handlers:u}=$e(a,o);return p.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:C,left:C,right:C,bottom:C,pointerEvents:"none",...r},className:n,onMouseEnter:u.startPause,onMouseLeave:u.endPause},l.map(d=>{let c=d.position||t,f=u.calculateOffset(d,{reverseOrder:e,gutter:s,defaultPosition:t}),m=Ze(c,f);return p.createElement(Ye,{id:d.id,key:d.id,onHeightUpdate:u.updateHeight,className:d.visible?qe:"",style:m},d.type==="custom"?D(d.message,d):i?i(d):p.createElement(Ue,{toast:d,position:c}))}))};export{rt as F,E as T,at as a,ee as b,g as n};
