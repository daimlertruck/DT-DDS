import{j as m}from"./jsx-runtime-CB_V9I5Y.js";import{B as I}from"./index-CWvrgZ1b.js";import{T as K}from"./Typography-DOQ44quZ.js";import{C as Q}from"./Close-BgpoXZkN.js";import{B as G}from"./Button-DSrMKdf0.js";import{k as J}from"./emotion-react.browser.esm-Bwsi5GpN.js";import{f as O,d as X}from"./emotion-styled.browser.esm-DBghOYGd.js";import{r as c}from"./index-CTjT7uj6.js";const ee=e=>m.jsx("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...e,children:m.jsx("path",{d:"M12 0C5.376 0 0 5.376 0 12C0 18.624 5.376 24 12 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 12 0ZM12 21.6C6.708 21.6 2.4 17.292 2.4 12C2.4 6.708 6.708 2.4 12 2.4C17.292 2.4 21.6 6.708 21.6 12C21.6 17.292 17.292 21.6 12 21.6ZM17.508 6.696L9.6 14.604L6.492 11.508L4.8 13.2L9.6 18L19.2 8.4L17.508 6.696Z",fill:"currentColor"})}),te=e=>m.jsx("svg",{fill:"none",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...e,children:m.jsx("path",{d:"M11.988 0C5.364 0 0 5.376 0 12C0 18.624 5.364 24 11.988 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 11.988 0ZM12 21.6C6.696 21.6 2.4 17.304 2.4 12C2.4 6.696 6.696 2.4 12 2.4C17.304 2.4 21.6 6.696 21.6 12C21.6 17.304 17.304 21.6 12 21.6ZM10.8 15.6H13.2V18H10.8V15.6ZM10.8 6H13.2V13.2H10.8V6Z",fill:"currentColor"})}),re=e=>m.jsx("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...e,children:m.jsx("path",{d:"M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"})}),ae=e=>m.jsx("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...e,children:m.jsx("path",{d:"M12 6.49L19.53 19.5H4.47L12 6.49ZM12 2.5L1 21.5H23L12 2.5ZM13 16.5H11V18.5H13V16.5ZM13 10.5H11V14.5H13V10.5Z"})});var oe=(e=>(e.TopLeft="top-left",e.TopCenter="top-center",e.TopRight="top-right",e.BottomLeft="bottom-left",e.BottomCenter="bottom-center",e.BottomRight="bottom-right",e))(oe||{}),k=(e=>(e.Success="success",e.Error="error",e.Info="informative",e.Warning="warning",e))(k||{});const se=J`
  from { opacity: 0; }
  to   { opacity: 1; }
`,ie=O.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  animation: ${se} 0.75s ease-in;
  transition: all 0.75s ease-in-out;
  overflow: hidden;
  ${({theme:e,isVisible:t,toastType:r})=>`
    border: 1px solid ${e.palette[r].default};
    border-left: 6px solid ${e.palette[r].default};
    background-color: ${e.palette[r].light};
    opacity: ${t?1:0};
    border-radius: ${e.shape.toast};
    padding: ${e.spacing.spacing_50} ${e.spacing.spacing_50} ${e.spacing.spacing_50} ${e.spacing.spacing_30};
    gap: ${e.spacing.spacing_30};
  `}
`,ne=O.div`
  ${({theme:e,toastType:t})=>`
    ${e.fontStyles.bodyMdRegular};
    color: ${e.palette[t].dark};
    overflow: hidden;
    word-break: break-word;
    hyphens: auto;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
  `}
`,le=O.button`
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
`,de=O(G)`
  ${({theme:e,toastType:t})=>`
    color: ${e.palette[t].dark};

    &:hover {
      background-color: ${e.palette[t].medium};
      color: ${e.palette[t].dark};
    }
`}
`,ce={[k.Success]:ee,[k.Error]:te,[k.Info]:re,[k.Warning]:ae},it=({id:e,dataTestId:t,title:r,message:o,onClose:i,type:s,isVisible:a=!0,dismissible:n=!0,actions:l})=>{const p=ce[s],u=t??`toast-${e}`,d=X();return m.jsxs(ie,{"data-testid":u,isVisible:a,toastType:s,children:[m.jsxs(I,{style:{flexDirection:"row",gap:d.spacing.spacing_30},children:[m.jsx(I,{style:{alignSelf:"start"},children:m.jsx(p,{color:d.palette[s].dark,height:20,width:20})}),m.jsxs(I,{style:{alignItems:"start"},children:[m.jsx(K,{color:`${s}.dark`,element:"span",fontStyles:"bodyLgBold",style:{textTransform:"capitalize"},children:r}),m.jsx(ne,{toastType:s,children:o})]}),n?m.jsx(le,{"data-testId":"close-button",onClick:i,toastType:s,children:m.jsx(Q,{})}):null]}),l&&(l==null?void 0:l.length)>0?m.jsx(I,{style:{flexDirection:"row",justifyContent:"flex-end",gap:d.spacing.spacing_20},children:l.map(({label:f,onClick:g,dataTestId:$},E)=>E<=1?m.jsx(de,{dataTestId:$,onClick:g,size:"small",toastType:s,variant:"text",children:f},f):null)}):null]},e)};let pe={data:""},ue=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||pe,fe=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,me=/\/\*[^]*?\*\/|  +/g,N=/\n+/g,w=(e,t)=>{let r="",o="",i="";for(let s in e){let a=e[s];s[0]=="@"?s[1]=="i"?r=s+" "+a+";":o+=s[1]=="f"?w(a,s):s+"{"+w(a,s[1]=="k"?"":t)+"}":typeof a=="object"?o+=w(a,t?t.replace(/([^,])+/g,n=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,n):n?n+" "+l:l)):s):a!=null&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=w.p?w.p(s,a):s+":"+a+";")}return r+(t&&i?t+"{"+i+"}":i)+o},x={},_=e=>{if(typeof e=="object"){let t="";for(let r in e)t+=r+_(e[r]);return t}return e},ge=(e,t,r,o,i)=>{let s=_(e),a=x[s]||(x[s]=(l=>{let p=0,u=11;for(;p<l.length;)u=101*u+l.charCodeAt(p++)>>>0;return"go"+u})(s));if(!x[a]){let l=s!==e?e:(p=>{let u,d,f=[{}];for(;u=fe.exec(p.replace(me,""));)u[4]?f.shift():u[3]?(d=u[3].replace(N," ").trim(),f.unshift(f[0][d]=f[0][d]||{})):f[0][u[1]]=u[2].replace(N," ").trim();return f[0]})(e);x[a]=w(i?{["@keyframes "+a]:l}:l,r?"":"."+a)}let n=r&&x.g?x.g:null;return r&&(x.g=x[a]),((l,p,u,d)=>{d?p.data=p.data.replace(d,l):p.data.indexOf(l)===-1&&(p.data=u?l+p.data:p.data+l)})(x[a],t,o,n),a},he=(e,t,r)=>e.reduce((o,i,s)=>{let a=t[s];if(a&&a.call){let n=a(r),l=n&&n.props&&n.props.className||/^go/.test(n)&&n;a=l?"."+l:n&&typeof n=="object"?n.props?"":w(n,""):n===!1?"":n}return o+i+(a??"")},"");function D(e){let t=this||{},r=e.call?e(t.p):e;return ge(r.unshift?r.raw?he(r,[].slice.call(arguments,1),t.p):r.reduce((o,i)=>Object.assign(o,i&&i.call?i(t.p):i),{}):r,ue(t.target),t.g,t.o,t.k)}let R,T,z;D.bind({g:1});let v=D.bind({k:1});function ye(e,t,r,o){w.p=t,R=e,T=r,z=o}function C(e,t){let r=this||{};return function(){let o=arguments;function i(s,a){let n=Object.assign({},s),l=n.className||i.className;r.p=Object.assign({theme:T&&T()},n),r.o=/ *go\d+/.test(l),n.className=D.apply(r,o)+(l?" "+l:"");let p=e;return e[0]&&(p=n.as||e,delete n.as),z&&p[0]&&z(n),R(p,n)}return t?t(i):i}}var be=e=>typeof e=="function",L=(e,t)=>be(e)?e(t):e,xe=(()=>{let e=0;return()=>(++e).toString()})(),F=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),ve=20,A="default",P=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(a=>a.id===t.toast.id?{...a,...t.toast}:a)};case 2:let{toast:o}=t;return P(e,{type:e.toasts.find(a=>a.id===o.id)?1:0,toast:o});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(a=>a.id===i||i===void 0?{...a,dismissed:!0,visible:!1}:a)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(a=>a.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+s}))}}},H=[],W={toasts:[],pausedAt:void 0,settings:{toastLimit:ve}},b={},U=(e,t=A)=>{b[t]=P(b[t]||W,e),H.forEach(([r,o])=>{r===t&&o(b[t])})},Y=e=>Object.keys(b).forEach(t=>U(e,t)),we=e=>Object.keys(b).find(t=>b[t].toasts.some(r=>r.id===e)),Z=(e=A)=>t=>{U(t,e)},Ce={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},$e=(e={},t=A)=>{let[r,o]=c.useState(b[t]||W),i=c.useRef(b[t]);c.useEffect(()=>(i.current!==b[t]&&o(b[t]),H.push([t,o]),()=>{let a=H.findIndex(([n])=>n===t);a>-1&&H.splice(a,1)}),[t]);let s=r.toasts.map(a=>{var n,l,p;return{...e,...e[a.type],...a,removeDelay:a.removeDelay||((n=e[a.type])==null?void 0:n.removeDelay)||(e==null?void 0:e.removeDelay),duration:a.duration||((l=e[a.type])==null?void 0:l.duration)||(e==null?void 0:e.duration)||Ce[a.type],style:{...e.style,...(p=e[a.type])==null?void 0:p.style,...a.style}}});return{...r,toasts:s}},ke=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(r==null?void 0:r.id)||xe()}),j=e=>(t,r)=>{let o=ke(t,e,r);return Z(o.toasterId||we(o.id))({type:2,toast:o}),o.id},h=(e,t)=>j("blank")(e,t);h.error=j("error");h.success=j("success");h.loading=j("loading");h.custom=j("custom");h.dismiss=(e,t)=>{let r={type:3,toastId:e};t?Z(t)(r):Y(r)};h.dismissAll=e=>h.dismiss(void 0,e);h.remove=(e,t)=>{let r={type:4,toastId:e};t?Z(t)(r):Y(r)};h.removeAll=e=>h.remove(void 0,e);h.promise=(e,t,r)=>{let o=h.loading(t.loading,{...r,...r==null?void 0:r.loading});return typeof e=="function"&&(e=e()),e.then(i=>{let s=t.success?L(t.success,i):void 0;return s?h.success(s,{id:o,...r,...r==null?void 0:r.success}):h.dismiss(o),i}).catch(i=>{let s=t.error?L(t.error,i):void 0;s?h.error(s,{id:o,...r,...r==null?void 0:r.error}):h.dismiss(o)}),e};var je=1e3,Ee=(e,t="default")=>{let{toasts:r,pausedAt:o}=$e(e,t),i=c.useRef(new Map).current,s=c.useCallback((d,f=je)=>{if(i.has(d))return;let g=setTimeout(()=>{i.delete(d),a({type:4,toastId:d})},f);i.set(d,g)},[]);c.useEffect(()=>{if(o)return;let d=Date.now(),f=r.map(g=>{if(g.duration===1/0)return;let $=(g.duration||0)+g.pauseDuration-(d-g.createdAt);if($<0){g.visible&&h.dismiss(g.id);return}return setTimeout(()=>h.dismiss(g.id,t),$)});return()=>{f.forEach(g=>g&&clearTimeout(g))}},[r,o,t]);let a=c.useCallback(Z(t),[t]),n=c.useCallback(()=>{a({type:5,time:Date.now()})},[a]),l=c.useCallback((d,f)=>{a({type:1,toast:{id:d,height:f}})},[a]),p=c.useCallback(()=>{o&&a({type:6,time:Date.now()})},[o,a]),u=c.useCallback((d,f)=>{let{reverseOrder:g=!1,gutter:$=8,defaultPosition:E}=f||{},B=r.filter(y=>(y.position||E)===(d.position||E)&&y.height),q=B.findIndex(y=>y.id===d.id),V=B.filter((y,S)=>S<q&&y.visible).length;return B.filter(y=>y.visible).slice(...g?[V+1]:[0,V]).reduce((y,S)=>y+(S.height||0)+$,0)},[r]);return c.useEffect(()=>{r.forEach(d=>{if(d.dismissed)s(d.id,d.removeDelay);else{let f=i.get(d.id);f&&(clearTimeout(f),i.delete(d.id))}})},[r,s]),{toasts:r,handlers:{updateHeight:l,startPause:n,endPause:p,calculateOffset:u}}},Ie=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Me=v`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,He=v`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Le=C("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Ie} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Me} 0.15s ease-out forwards;
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
    animation: ${He} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Oe=v`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,De=C("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Oe} 1s linear infinite;
`,Ze=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Be=v`
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
}`,Se=C("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Ze} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Be} 0.2s ease-out forwards;
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
`,Te=C("div")`
  position: absolute;
`,ze=C("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Ae=v`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ve=C("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Ae} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Ne=({toast:e})=>{let{icon:t,type:r,iconTheme:o}=e;return t!==void 0?typeof t=="string"?c.createElement(Ve,null,t):t:r==="blank"?null:c.createElement(ze,null,c.createElement(De,{...o}),r!=="loading"&&c.createElement(Te,null,r==="error"?c.createElement(Le,{...o}):c.createElement(Se,{...o})))},_e=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Re=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Fe="0%{opacity:0;} 100%{opacity:1;}",Pe="0%{opacity:1;} 100%{opacity:0;}",We=C("div")`
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
`,Ue=C("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Ye=(e,t)=>{let r=e.includes("top")?1:-1,[o,i]=F()?[Fe,Pe]:[_e(r),Re(r)];return{animation:t?`${v(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${v(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},qe=c.memo(({toast:e,position:t,style:r,children:o})=>{let i=e.height?Ye(e.position||t||"top-center",e.visible):{opacity:0},s=c.createElement(Ne,{toast:e}),a=c.createElement(Ue,{...e.ariaProps},L(e.message,e));return c.createElement(We,{className:e.className,style:{...i,...r,...e.style}},typeof o=="function"?o({icon:s,message:a}):c.createElement(c.Fragment,null,s,a))});ye(c.createElement);var Ke=({id:e,className:t,style:r,onHeightUpdate:o,children:i})=>{let s=c.useCallback(a=>{if(a){let n=()=>{let l=a.getBoundingClientRect().height;o(e,l)};n(),new MutationObserver(n).observe(a,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return c.createElement("div",{ref:s,className:t,style:r},i)},Qe=(e,t)=>{let r=e.includes("top"),o=r?{top:0}:{bottom:0},i=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:F()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...o,...i}},Ge=D`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,M=16,nt=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:o,children:i,toasterId:s,containerStyle:a,containerClassName:n})=>{let{toasts:l,handlers:p}=Ee(r,s);return c.createElement("div",{"data-rht-toaster":s||"",style:{position:"fixed",zIndex:9999,top:M,left:M,right:M,bottom:M,pointerEvents:"none",...a},className:n,onMouseEnter:p.startPause,onMouseLeave:p.endPause},l.map(u=>{let d=u.position||t,f=p.calculateOffset(u,{reverseOrder:e,gutter:o,defaultPosition:t}),g=Qe(d,f);return c.createElement(Ke,{id:u.id,key:u.id,onHeightUpdate:p.updateHeight,className:u.visible?Ge:"",style:g},u.type==="custom"?L(u.message,u):i?i(u):c.createElement(qe,{toast:u,position:d}))}))};export{nt as F,re as I,k as T,it as a,oe as b,h as n};
