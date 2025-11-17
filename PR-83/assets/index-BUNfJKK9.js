import{j as x}from"./jsx-runtime-CB_V9I5Y.js";import{B as Q}from"./index-BIDlDHJ_.js";import{I as M}from"./Icon-BebqvW7_.js";import{T as V}from"./Typography-CxOo5OZe.js";import{k as G}from"./emotion-react.browser.esm-_Yfkwta6.js";import{s as O,e as J}from"./emotion-styled.browser.esm-BMKZqQy6.js";import{r as c}from"./index-CTjT7uj6.js";var X=(e=>(e.TopLeft="top-left",e.TopCenter="top-center",e.TopRight="top-right",e.BottomLeft="bottom-left",e.BottomCenter="bottom-center",e.BottomRight="bottom-right",e))(X||{}),k=(e=>(e.Success="success",e.Error="error",e.Info="informative",e.Warning="warning",e))(k||{});const ee=G`
  from { opacity: 0; }
  to   { opacity: 1; }
`,te=O.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  animation: ${ee} 0.75s ease-in;
  transition: all 0.75s ease-in-out;
  overflow: hidden;
  ${({theme:e,isVisible:t,type:a})=>`
    border: 1px solid ${e.palette[a].default};
    border-left: 6px solid ${e.palette[a].default};
    background-color: ${e.palette[a].light};
    opacity: ${t?1:0};
    border-radius: ${e.shape.toast};
    padding: ${e.spacing.spacing_50} ${e.spacing.spacing_50} ${e.spacing.spacing_50} ${e.spacing.spacing_30};
  `}
`,ae=O.div`
  ${({theme:e,type:t})=>`
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
`,re=O.button`
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

    &:hover {
      background-color: ${e.palette[t].medium};
    }
    
  `}
`,oe=O.div`
  ${({theme:e,type:t})=>`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: ${e.spacing.spacing_20};
    margin-top: ${e.spacing.spacing_30};

    button {
      color: ${e.palette[t].dark};
      
      &:hover {
        background-color: ${e.palette[t].medium};
        color: ${e.palette[t].dark};
      }
    }
`}
`,se={[k.Success]:"check_circle",[k.Error]:"error",[k.Info]:"info",[k.Warning]:"warning"},et=({id:e,dataTestId:t,title:a,message:s,onClose:i,type:o,isVisible:r=!0,dismissible:n=!0,children:l})=>{const p=t??`toast-${e}`,d=J();return x.jsxs(te,{"data-testid":p,isVisible:r,type:o,children:[x.jsxs(Q,{style:{alignSelf:"start",flexDirection:"row",width:"100%",gap:d.spacing.spacing_30},children:[x.jsx(M,{code:se[o],color:d.palette[o].dark}),x.jsx(V,{color:`${o}.dark`,element:"span",fontStyles:"bodyLgBold",children:a}),n?x.jsx(re,{"data-testId":"close-button",onClick:i,toastType:o,children:x.jsx(M,{code:"close",color:d.palette[o].dark})}):null]}),x.jsx(ae,{type:o,children:s}),l?x.jsx(oe,{type:o,children:l}):null]},e)};let ie={data:""},ne=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||ie,le=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,ce=/\/\*[^]*?\*\/|  +/g,F=/\n+/g,w=(e,t)=>{let a="",s="",i="";for(let o in e){let r=e[o];o[0]=="@"?o[1]=="i"?a=o+" "+r+";":s+=o[1]=="f"?w(r,o):o+"{"+w(r,o[1]=="k"?"":t)+"}":typeof r=="object"?s+=w(r,t?t.replace(/([^,])+/g,n=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,n):n?n+" "+l:l)):o):r!=null&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=w.p?w.p(o,r):o+":"+r+";")}return a+(t&&i?t+"{"+i+"}":i)+s},h={},H=e=>{if(typeof e=="object"){let t="";for(let a in e)t+=a+H(e[a]);return t}return e},de=(e,t,a,s,i)=>{let o=H(e),r=h[o]||(h[o]=(l=>{let p=0,d=11;for(;p<l.length;)d=101*d+l.charCodeAt(p++)>>>0;return"go"+d})(o));if(!h[r]){let l=o!==e?e:(p=>{let d,u,f=[{}];for(;d=le.exec(p.replace(ce,""));)d[4]?f.shift():d[3]?(u=d[3].replace(F," ").trim(),f.unshift(f[0][u]=f[0][u]||{})):f[0][d[1]]=d[2].replace(F," ").trim();return f[0]})(e);h[r]=w(i?{["@keyframes "+r]:l}:l,a?"":"."+r)}let n=a&&h.g?h.g:null;return a&&(h.g=h[r]),((l,p,d,u)=>{u?p.data=p.data.replace(u,l):p.data.indexOf(l)===-1&&(p.data=d?l+p.data:p.data+l)})(h[r],t,s,n),r},pe=(e,t,a)=>e.reduce((s,i,o)=>{let r=t[o];if(r&&r.call){let n=r(a),l=n&&n.props&&n.props.className||/^go/.test(n)&&n;r=l?"."+l:n&&typeof n=="object"?n.props?"":w(n,""):n===!1?"":n}return s+i+(r??"")},"");function S(e){let t=this||{},a=e.call?e(t.p):e;return de(a.unshift?a.raw?pe(a,[].slice.call(arguments,1),t.p):a.reduce((s,i)=>Object.assign(s,i&&i.call?i(t.p):i),{}):a,ne(t.target),t.g,t.o,t.k)}let P,N,T;S.bind({g:1});let v=S.bind({k:1});function ue(e,t,a,s){w.p=t,P=e,N=a,T=s}function $(e,t){let a=this||{};return function(){let s=arguments;function i(o,r){let n=Object.assign({},o),l=n.className||i.className;a.p=Object.assign({theme:N&&N()},n),a.o=/ *go\d+/.test(l),n.className=S.apply(a,s)+(l?" "+l:"");let p=e;return e[0]&&(p=n.as||e,delete n.as),T&&p[0]&&T(n),P(p,n)}return t?t(i):i}}var fe=e=>typeof e=="function",D=(e,t)=>fe(e)?e(t):e,me=(()=>{let e=0;return()=>(++e).toString()})(),W=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),ge=20,B="default",U=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(r=>r.id===t.toast.id?{...r,...t.toast}:r)};case 2:let{toast:s}=t;return U(e,{type:e.toasts.find(r=>r.id===s.id)?1:0,toast:s});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(r=>r.id===i||i===void 0?{...r,dismissed:!0,visible:!1}:r)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(r=>r.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(r=>({...r,pauseDuration:r.pauseDuration+o}))}}},I=[],Y={toasts:[],pausedAt:void 0,settings:{toastLimit:ge}},y={},Z=(e,t=B)=>{y[t]=U(y[t]||Y,e),I.forEach(([a,s])=>{a===t&&s(y[t])})},q=e=>Object.keys(y).forEach(t=>Z(e,t)),be=e=>Object.keys(y).find(t=>y[t].toasts.some(a=>a.id===e)),A=(e=B)=>t=>{Z(t,e)},ye={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},he=(e={},t=B)=>{let[a,s]=c.useState(y[t]||Y),i=c.useRef(y[t]);c.useEffect(()=>(i.current!==y[t]&&s(y[t]),I.push([t,s]),()=>{let r=I.findIndex(([n])=>n===t);r>-1&&I.splice(r,1)}),[t]);let o=a.toasts.map(r=>{var n,l,p;return{...e,...e[r.type],...r,removeDelay:r.removeDelay||((n=e[r.type])==null?void 0:n.removeDelay)||(e==null?void 0:e.removeDelay),duration:r.duration||((l=e[r.type])==null?void 0:l.duration)||(e==null?void 0:e.duration)||ye[r.type],style:{...e.style,...(p=e[r.type])==null?void 0:p.style,...r.style}}});return{...a,toasts:o}},ve=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(a==null?void 0:a.id)||me()}),E=e=>(t,a)=>{let s=ve(t,e,a);return A(s.toasterId||be(s.id))({type:2,toast:s}),s.id},m=(e,t)=>E("blank")(e,t);m.error=E("error");m.success=E("success");m.loading=E("loading");m.custom=E("custom");m.dismiss=(e,t)=>{let a={type:3,toastId:e};t?A(t)(a):q(a)};m.dismissAll=e=>m.dismiss(void 0,e);m.remove=(e,t)=>{let a={type:4,toastId:e};t?A(t)(a):q(a)};m.removeAll=e=>m.remove(void 0,e);m.promise=(e,t,a)=>{let s=m.loading(t.loading,{...a,...a==null?void 0:a.loading});return typeof e=="function"&&(e=e()),e.then(i=>{let o=t.success?D(t.success,i):void 0;return o?m.success(o,{id:s,...a,...a==null?void 0:a.success}):m.dismiss(s),i}).catch(i=>{let o=t.error?D(t.error,i):void 0;o?m.error(o,{id:s,...a,...a==null?void 0:a.error}):m.dismiss(s)}),e};var xe=1e3,we=(e,t="default")=>{let{toasts:a,pausedAt:s}=he(e,t),i=c.useRef(new Map).current,o=c.useCallback((u,f=xe)=>{if(i.has(u))return;let g=setTimeout(()=>{i.delete(u),r({type:4,toastId:u})},f);i.set(u,g)},[]);c.useEffect(()=>{if(s)return;let u=Date.now(),f=a.map(g=>{if(g.duration===1/0)return;let j=(g.duration||0)+g.pauseDuration-(u-g.createdAt);if(j<0){g.visible&&m.dismiss(g.id);return}return setTimeout(()=>m.dismiss(g.id,t),j)});return()=>{f.forEach(g=>g&&clearTimeout(g))}},[a,s,t]);let r=c.useCallback(A(t),[t]),n=c.useCallback(()=>{r({type:5,time:Date.now()})},[r]),l=c.useCallback((u,f)=>{r({type:1,toast:{id:u,height:f}})},[r]),p=c.useCallback(()=>{s&&r({type:6,time:Date.now()})},[s,r]),d=c.useCallback((u,f)=>{let{reverseOrder:g=!1,gutter:j=8,defaultPosition:L}=f||{},_=a.filter(b=>(b.position||L)===(u.position||L)&&b.height),K=_.findIndex(b=>b.id===u.id),R=_.filter((b,z)=>z<K&&b.visible).length;return _.filter(b=>b.visible).slice(...g?[R+1]:[0,R]).reduce((b,z)=>b+(z.height||0)+j,0)},[a]);return c.useEffect(()=>{a.forEach(u=>{if(u.dismissed)o(u.id,u.removeDelay);else{let f=i.get(u.id);f&&(clearTimeout(f),i.delete(u.id))}})},[a,o]),{toasts:a,handlers:{updateHeight:l,startPause:n,endPause:p,calculateOffset:d}}},$e=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,ke=v`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ee=v`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,je=$("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${$e} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${ke} 0.15s ease-out forwards;
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
    animation: ${Ee} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Ce=v`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Ie=$("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Ce} 1s linear infinite;
`,De=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Oe=v`
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
}`,Se=$("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${De} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Oe} 0.2s ease-out forwards;
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
`,Ae=$("div")`
  position: absolute;
`,_e=$("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ze=v`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ne=$("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ze} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Te=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return t!==void 0?typeof t=="string"?c.createElement(Ne,null,t):t:a==="blank"?null:c.createElement(_e,null,c.createElement(Ie,{...s}),a!=="loading"&&c.createElement(Ae,null,a==="error"?c.createElement(je,{...s}):c.createElement(Se,{...s})))},Be=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Le=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Re="0%{opacity:0;} 100%{opacity:1;}",Me="0%{opacity:1;} 100%{opacity:0;}",Fe=$("div")`
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
`,He=$("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Pe=(e,t)=>{let a=e.includes("top")?1:-1,[s,i]=W()?[Re,Me]:[Be(a),Le(a)];return{animation:t?`${v(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${v(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},We=c.memo(({toast:e,position:t,style:a,children:s})=>{let i=e.height?Pe(e.position||t||"top-center",e.visible):{opacity:0},o=c.createElement(Te,{toast:e}),r=c.createElement(He,{...e.ariaProps},D(e.message,e));return c.createElement(Fe,{className:e.className,style:{...i,...a,...e.style}},typeof s=="function"?s({icon:o,message:r}):c.createElement(c.Fragment,null,o,r))});ue(c.createElement);var Ue=({id:e,className:t,style:a,onHeightUpdate:s,children:i})=>{let o=c.useCallback(r=>{if(r){let n=()=>{let l=r.getBoundingClientRect().height;s(e,l)};n(),new MutationObserver(n).observe(r,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return c.createElement("div",{ref:o,className:t,style:a},i)},Ye=(e,t)=>{let a=e.includes("top"),s=a?{top:0}:{bottom:0},i=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:W()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...s,...i}},Ze=S`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,C=16,tt=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:i,toasterId:o,containerStyle:r,containerClassName:n})=>{let{toasts:l,handlers:p}=we(a,o);return c.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:C,left:C,right:C,bottom:C,pointerEvents:"none",...r},className:n,onMouseEnter:p.startPause,onMouseLeave:p.endPause},l.map(d=>{let u=d.position||t,f=p.calculateOffset(d,{reverseOrder:e,gutter:s,defaultPosition:t}),g=Ye(u,f);return c.createElement(Ue,{id:d.id,key:d.id,onHeightUpdate:p.updateHeight,className:d.visible?Ze:"",style:g},d.type==="custom"?D(d.message,d):i?i(d):c.createElement(We,{toast:d,position:u}))}))};export{tt as F,k as T,et as a,X as b,m as n};
