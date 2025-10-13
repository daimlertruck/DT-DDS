import{j as m}from"./jsx-runtime-CB_V9I5Y.js";import{C as q}from"./Close-BgpoXZkN.js";import{k as K}from"./emotion-react.browser.esm-Bwsi5GpN.js";import{f as C}from"./emotion-styled.browser.esm-DBghOYGd.js";import{r as c}from"./index-CTjT7uj6.js";const Q=t=>m.jsx("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...t,children:m.jsx("path",{d:"M12 0C5.376 0 0 5.376 0 12C0 18.624 5.376 24 12 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 12 0ZM12 21.6C6.708 21.6 2.4 17.292 2.4 12C2.4 6.708 6.708 2.4 12 2.4C17.292 2.4 21.6 6.708 21.6 12C21.6 17.292 17.292 21.6 12 21.6ZM17.508 6.696L9.6 14.604L6.492 11.508L4.8 13.2L9.6 18L19.2 8.4L17.508 6.696Z",fill:"currentColor"})}),G=t=>m.jsx("svg",{fill:"none",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...t,children:m.jsx("path",{d:"M11.988 0C5.364 0 0 5.376 0 12C0 18.624 5.364 24 11.988 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 11.988 0ZM12 21.6C6.696 21.6 2.4 17.304 2.4 12C2.4 6.696 6.696 2.4 12 2.4C17.304 2.4 21.6 6.696 21.6 12C21.6 17.304 17.304 21.6 12 21.6ZM10.8 15.6H13.2V18H10.8V15.6ZM10.8 6H13.2V13.2H10.8V6Z",fill:"currentColor"})}),J=t=>m.jsx("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...t,children:m.jsx("path",{d:"M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"})}),X=t=>m.jsx("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...t,children:m.jsx("path",{d:"M12 6.49L19.53 19.5H4.47L12 6.49ZM12 2.5L1 21.5H23L12 2.5ZM13 16.5H11V18.5H13V16.5ZM13 10.5H11V14.5H13V10.5Z"})});var tt=(t=>(t.TopLeft="top-left",t.TopCenter="top-center",t.TopRight="top-right",t.BottomLeft="bottom-left",t.BottomCenter="bottom-center",t.BottomRight="bottom-right",t))(tt||{}),k=(t=>(t.Success="success",t.Error="error",t.Info="informative",t.Warning="warning",t))(k||{});const et=C.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
  ${({theme:t,type:e})=>`
    background-color: ${t.palette[e].default};  
    color: ${t.palette.content.contrast}
`}
`,rt=K`
  from { opacity: 0; }
  to   { opacity: 1; }
`,at=C.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 360px;
  animation: ${rt} 0.75s ease-in;
  transition: all 0.75s ease-in-out;
  overflow: hidden;
  ${({theme:t,isVisible:e})=>`
    background-color: ${t.palette.surface.contrast};  
    opacity: ${e?1:0};
    color: ${t.palette.content.default};
    border-radius: ${t.shape.toast};
    box-shadow: ${t.shadows.elevation_200};
  `}
`,ot=C.div`
  ${({theme:t})=>`
    height: 100%;
    flex-grow: 1;
    padding: ${t.spacing.spacing_50} ${t.spacing.spacing_50};
  `}
`,st=C.div`
  ${({theme:t})=>`
      ${t.fontStyles.h6};
      color: ${t.palette.content.dark};
      margin-bottom: ${t.spacing.spacing_20};
      text-transform: capitalize;
  `}
`,it=C.div`
  ${({theme:t})=>`
    ${t.fontStyles.bodyMdRegular};
    color: ${t.palette.content.default};
    overflow: hidden;
    word-break: break-word;
    hyphens: auto;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
  `}
`,nt=C.button`
  ${({theme:t})=>`
    color: ${t.palette.content.default};
    border: 0;
    cursor: pointer;
    background: transparent;
    align-self: flex-start;
    font-size: 0;
    line-height: 0;
  
    &:hover {
      background-color: ${t.palette.surface.contrast};
    }
  `}
`,lt=C.div`
  ${({theme:t,hasCloseButton:e})=>`
    display: grid;
    ${e?"grid-template-columns: auto 24px;":"grid-template-rows: auto auto;"}
    column-gap: ${t.spacing.spacing_50};
  `}
`,ct=C.div`
  ${({theme:t,hasChildren:e})=>`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-top: ${e?t.spacing.spacing_20:0};
  `}
`,dt={[k.Success]:Q,[k.Error]:G,[k.Info]:J,[k.Warning]:X},ae=({children:t,id:e,dataTestId:r,title:o,message:i,onClose:s,type:a,isVisible:n=!0,dismissible:l=!0})=>{const d=dt[a],u=r??`toast-${e}`;return m.jsxs(at,{"data-testid":u,isVisible:n,type:a,children:[m.jsx(et,{type:a,children:m.jsx(d,{height:20,width:20})}),m.jsxs(ot,{children:[m.jsxs(lt,{hasCloseButton:l,children:[m.jsx(st,{children:o}),l?m.jsx(nt,{onClick:s,children:m.jsx(q,{})}):null,m.jsx(it,{children:i})]}),m.jsx(ct,{hasChildren:!!t,children:t})]})]},e)};let ut={data:""},pt=t=>typeof window=="object"?((t?t.querySelector("#_goober"):window._goober)||Object.assign((t||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:t||ut,ft=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,mt=/\/\*[^]*?\*\/|  +/g,B=/\n+/g,w=(t,e)=>{let r="",o="",i="";for(let s in t){let a=t[s];s[0]=="@"?s[1]=="i"?r=s+" "+a+";":o+=s[1]=="f"?w(a,s):s+"{"+w(a,s[1]=="k"?"":e)+"}":typeof a=="object"?o+=w(a,e?e.replace(/([^,])+/g,n=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,n):n?n+" "+l:l)):s):a!=null&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=w.p?w.p(s,a):s+":"+a+";")}return r+(e&&i?e+"{"+i+"}":i)+o},x={},N=t=>{if(typeof t=="object"){let e="";for(let r in t)e+=r+N(t[r]);return e}return t},gt=(t,e,r,o,i)=>{let s=N(t),a=x[s]||(x[s]=(l=>{let d=0,u=11;for(;d<l.length;)u=101*u+l.charCodeAt(d++)>>>0;return"go"+u})(s));if(!x[a]){let l=s!==t?t:(d=>{let u,p,f=[{}];for(;u=ft.exec(d.replace(mt,""));)u[4]?f.shift():u[3]?(p=u[3].replace(B," ").trim(),f.unshift(f[0][p]=f[0][p]||{})):f[0][u[1]]=u[2].replace(B," ").trim();return f[0]})(t);x[a]=w(i?{["@keyframes "+a]:l}:l,r?"":"."+a)}let n=r&&x.g?x.g:null;return r&&(x.g=x[a]),((l,d,u,p)=>{p?d.data=d.data.replace(p,l):d.data.indexOf(l)===-1&&(d.data=u?l+d.data:d.data+l)})(x[a],e,o,n),a},ht=(t,e,r)=>t.reduce((o,i,s)=>{let a=e[s];if(a&&a.call){let n=a(r),l=n&&n.props&&n.props.className||/^go/.test(n)&&n;a=l?"."+l:n&&typeof n=="object"?n.props?"":w(n,""):n===!1?"":n}return o+i+(a??"")},"");function O(t){let e=this||{},r=t.call?t(e.p):t;return gt(r.unshift?r.raw?ht(r,[].slice.call(arguments,1),e.p):r.reduce((o,i)=>Object.assign(o,i&&i.call?i(e.p):i),{}):r,pt(e.target),e.g,e.o,e.k)}let R,D,T;O.bind({g:1});let v=O.bind({k:1});function yt(t,e,r,o){w.p=e,R=t,D=r,T=o}function $(t,e){let r=this||{};return function(){let o=arguments;function i(s,a){let n=Object.assign({},s),l=n.className||i.className;r.p=Object.assign({theme:D&&D()},n),r.o=/ *go\d+/.test(l),n.className=O.apply(r,o)+(l?" "+l:"");let d=t;return t[0]&&(d=n.as||t,delete n.as),T&&d[0]&&T(n),R(d,n)}return e?e(i):i}}var bt=t=>typeof t=="function",H=(t,e)=>bt(t)?t(e):t,xt=(()=>{let t=0;return()=>(++t).toString()})(),_=(()=>{let t;return()=>{if(t===void 0&&typeof window<"u"){let e=matchMedia("(prefers-reduced-motion: reduce)");t=!e||e.matches}return t}})(),vt=20,z="default",F=(t,e)=>{let{toastLimit:r}=t.settings;switch(e.type){case 0:return{...t,toasts:[e.toast,...t.toasts].slice(0,r)};case 1:return{...t,toasts:t.toasts.map(a=>a.id===e.toast.id?{...a,...e.toast}:a)};case 2:let{toast:o}=e;return F(t,{type:t.toasts.find(a=>a.id===o.id)?1:0,toast:o});case 3:let{toastId:i}=e;return{...t,toasts:t.toasts.map(a=>a.id===i||i===void 0?{...a,dismissed:!0,visible:!1}:a)};case 4:return e.toastId===void 0?{...t,toasts:[]}:{...t,toasts:t.toasts.filter(a=>a.id!==e.toastId)};case 5:return{...t,pausedAt:e.time};case 6:let s=e.time-(t.pausedAt||0);return{...t,pausedAt:void 0,toasts:t.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+s}))}}},I=[],P={toasts:[],pausedAt:void 0,settings:{toastLimit:vt}},b={},W=(t,e=z)=>{b[e]=F(b[e]||P,t),I.forEach(([r,o])=>{r===e&&o(b[e])})},U=t=>Object.keys(b).forEach(e=>W(t,e)),wt=t=>Object.keys(b).find(e=>b[e].toasts.some(r=>r.id===t)),L=(t=z)=>e=>{W(e,t)},Ct={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},$t=(t={},e=z)=>{let[r,o]=c.useState(b[e]||P),i=c.useRef(b[e]);c.useEffect(()=>(i.current!==b[e]&&o(b[e]),I.push([e,o]),()=>{let a=I.findIndex(([n])=>n===e);a>-1&&I.splice(a,1)}),[e]);let s=r.toasts.map(a=>{var n,l,d;return{...t,...t[a.type],...a,removeDelay:a.removeDelay||((n=t[a.type])==null?void 0:n.removeDelay)||(t==null?void 0:t.removeDelay),duration:a.duration||((l=t[a.type])==null?void 0:l.duration)||(t==null?void 0:t.duration)||Ct[a.type],style:{...t.style,...(d=t[a.type])==null?void 0:d.style,...a.style}}});return{...r,toasts:s}},kt=(t,e="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:e,ariaProps:{role:"status","aria-live":"polite"},message:t,pauseDuration:0,...r,id:(r==null?void 0:r.id)||xt()}),j=t=>(e,r)=>{let o=kt(e,t,r);return L(o.toasterId||wt(o.id))({type:2,toast:o}),o.id},g=(t,e)=>j("blank")(t,e);g.error=j("error");g.success=j("success");g.loading=j("loading");g.custom=j("custom");g.dismiss=(t,e)=>{let r={type:3,toastId:t};e?L(e)(r):U(r)};g.dismissAll=t=>g.dismiss(void 0,t);g.remove=(t,e)=>{let r={type:4,toastId:t};e?L(e)(r):U(r)};g.removeAll=t=>g.remove(void 0,t);g.promise=(t,e,r)=>{let o=g.loading(e.loading,{...r,...r==null?void 0:r.loading});return typeof t=="function"&&(t=t()),t.then(i=>{let s=e.success?H(e.success,i):void 0;return s?g.success(s,{id:o,...r,...r==null?void 0:r.success}):g.dismiss(o),i}).catch(i=>{let s=e.error?H(e.error,i):void 0;s?g.error(s,{id:o,...r,...r==null?void 0:r.error}):g.dismiss(o)}),t};var jt=1e3,Et=(t,e="default")=>{let{toasts:r,pausedAt:o}=$t(t,e),i=c.useRef(new Map).current,s=c.useCallback((p,f=jt)=>{if(i.has(p))return;let h=setTimeout(()=>{i.delete(p),a({type:4,toastId:p})},f);i.set(p,h)},[]);c.useEffect(()=>{if(o)return;let p=Date.now(),f=r.map(h=>{if(h.duration===1/0)return;let E=(h.duration||0)+h.pauseDuration-(p-h.createdAt);if(E<0){h.visible&&g.dismiss(h.id);return}return setTimeout(()=>g.dismiss(h.id,e),E)});return()=>{f.forEach(h=>h&&clearTimeout(h))}},[r,o,e]);let a=c.useCallback(L(e),[e]),n=c.useCallback(()=>{a({type:5,time:Date.now()})},[a]),l=c.useCallback((p,f)=>{a({type:1,toast:{id:p,height:f}})},[a]),d=c.useCallback(()=>{o&&a({type:6,time:Date.now()})},[o,a]),u=c.useCallback((p,f)=>{let{reverseOrder:h=!1,gutter:E=8,defaultPosition:A}=f||{},S=r.filter(y=>(y.position||A)===(p.position||A)&&y.height),Y=S.findIndex(y=>y.id===p.id),V=S.filter((y,Z)=>Z<Y&&y.visible).length;return S.filter(y=>y.visible).slice(...h?[V+1]:[0,V]).reduce((y,Z)=>y+(Z.height||0)+E,0)},[r]);return c.useEffect(()=>{r.forEach(p=>{if(p.dismissed)s(p.id,p.removeDelay);else{let f=i.get(p.id);f&&(clearTimeout(f),i.delete(p.id))}})},[r,s]),{toasts:r,handlers:{updateHeight:l,startPause:n,endPause:d,calculateOffset:u}}},Mt=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,It=v`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ht=v`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Ot=$("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Mt} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${It} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${t=>t.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${Ht} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Lt=v`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,St=$("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${t=>t.secondary||"#e0e0e0"};
  border-right-color: ${t=>t.primary||"#616161"};
  animation: ${Lt} 1s linear infinite;
`,Zt=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Dt=v`
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
}`,Tt=$("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Zt} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Dt} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${t=>t.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,zt=$("div")`
  position: absolute;
`,At=$("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Vt=v`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Bt=$("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Vt} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Nt=({toast:t})=>{let{icon:e,type:r,iconTheme:o}=t;return e!==void 0?typeof e=="string"?c.createElement(Bt,null,e):e:r==="blank"?null:c.createElement(At,null,c.createElement(St,{...o}),r!=="loading"&&c.createElement(zt,null,r==="error"?c.createElement(Ot,{...o}):c.createElement(Tt,{...o})))},Rt=t=>`
0% {transform: translate3d(0,${t*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,_t=t=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${t*-150}%,-1px) scale(.6); opacity:0;}
`,Ft="0%{opacity:0;} 100%{opacity:1;}",Pt="0%{opacity:1;} 100%{opacity:0;}",Wt=$("div")`
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
`,Ut=$("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Yt=(t,e)=>{let r=t.includes("top")?1:-1,[o,i]=_()?[Ft,Pt]:[Rt(r),_t(r)];return{animation:e?`${v(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${v(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},qt=c.memo(({toast:t,position:e,style:r,children:o})=>{let i=t.height?Yt(t.position||e||"top-center",t.visible):{opacity:0},s=c.createElement(Nt,{toast:t}),a=c.createElement(Ut,{...t.ariaProps},H(t.message,t));return c.createElement(Wt,{className:t.className,style:{...i,...r,...t.style}},typeof o=="function"?o({icon:s,message:a}):c.createElement(c.Fragment,null,s,a))});yt(c.createElement);var Kt=({id:t,className:e,style:r,onHeightUpdate:o,children:i})=>{let s=c.useCallback(a=>{if(a){let n=()=>{let l=a.getBoundingClientRect().height;o(t,l)};n(),new MutationObserver(n).observe(a,{subtree:!0,childList:!0,characterData:!0})}},[t,o]);return c.createElement("div",{ref:s,className:e,style:r},i)},Qt=(t,e)=>{let r=t.includes("top"),o=r?{top:0}:{bottom:0},i=t.includes("center")?{justifyContent:"center"}:t.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:_()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${e*(r?1:-1)}px)`,...o,...i}},Gt=O`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,M=16,oe=({reverseOrder:t,position:e="top-center",toastOptions:r,gutter:o,children:i,toasterId:s,containerStyle:a,containerClassName:n})=>{let{toasts:l,handlers:d}=Et(r,s);return c.createElement("div",{"data-rht-toaster":s||"",style:{position:"fixed",zIndex:9999,top:M,left:M,right:M,bottom:M,pointerEvents:"none",...a},className:n,onMouseEnter:d.startPause,onMouseLeave:d.endPause},l.map(u=>{let p=u.position||e,f=d.calculateOffset(u,{reverseOrder:t,gutter:o,defaultPosition:e}),h=Qt(p,f);return c.createElement(Kt,{id:u.id,key:u.id,onHeightUpdate:d.updateHeight,className:u.visible?Gt:"",style:h},u.type==="custom"?H(u.message,u):i?i(u):c.createElement(qt,{toast:u,position:p}))}))};export{oe as F,J as I,k as T,ae as a,tt as b,g as n};
