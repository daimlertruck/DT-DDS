var V=Object.defineProperty;var c=(e,t)=>V(e,"name",{value:t,configurable:!0});import{j as w}from"./jsx-runtime-Cgz2XvFB.js";import{B as G}from"./index-DTgA8jos.js";import{I as F}from"./Icon-9dVURh2l.js";import{T as J}from"./Typography-Dk4smw7A.js";import{k as X}from"./emotion-react.browser.esm-BzOLYAw5.js";import{f as S,d as ee}from"./emotion-styled.browser.esm-CIRWz9XU.js";import{r as d}from"./index-CwbBKW39.js";var te=(e=>(e.TopLeft="top-left",e.TopCenter="top-center",e.TopRight="top-right",e.BottomLeft="bottom-left",e.BottomCenter="bottom-center",e.BottomRight="bottom-right",e))(te||{}),E=(e=>(e.Success="success",e.Error="error",e.Info="informative",e.Warning="warning",e))(E||{});const ae=X`
  from { opacity: 0; }
  to   { opacity: 1; }
`,re=S.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  animation: ${ae} 0.75s ease-in;
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
`,oe=S.div`
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
`,se=S.button`
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
`,ie=S.div`
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
`,ne={[E.Success]:"check_circle",[E.Error]:"error",[E.Info]:"info",[E.Warning]:"warning"},rt=c(({id:e,dataTestId:t,title:a,message:s,onClose:i,type:o,isVisible:r=!0,dismissible:n=!0,children:l})=>{const u=t??`toast-${e}`,p=ee();return w.jsxs(re,{"data-testid":u,isVisible:r,type:o,children:[w.jsxs(G,{style:{alignSelf:"start",flexDirection:"row",width:"100%",gap:p.spacing.spacing_30},children:[w.jsx(F,{code:ne[o],color:p.palette[o].dark}),w.jsx(J,{color:`${o}.dark`,element:"span",fontStyles:"bodyLgBold",children:a}),n?w.jsx(se,{"data-testId":"close-button",onClick:i,toastType:o,children:w.jsx(F,{code:"close",color:p.palette[o].dark})}):null]}),w.jsx(oe,{type:o,children:s}),l?w.jsx(ie,{type:o,children:l}):null]},e)},"Toast");let le={data:""},ce=c(e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||le,"t"),de=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,pe=/\/\*[^]*?\*\/|  +/g,H=/\n+/g,$=c((e,t)=>{let a="",s="",i="";for(let o in e){let r=e[o];o[0]=="@"?o[1]=="i"?a=o+" "+r+";":s+=o[1]=="f"?$(r,o):o+"{"+$(r,o[1]=="k"?"":t)+"}":typeof r=="object"?s+=$(r,t?t.replace(/([^,])+/g,n=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,n):n?n+" "+l:l)):o):r!=null&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=$.p?$.p(o,r):o+":"+r+";")}return a+(t&&i?t+"{"+i+"}":i)+s},"o"),v={},P=c(e=>{if(typeof e=="object"){let t="";for(let a in e)t+=a+P(e[a]);return t}return e},"s"),ue=c((e,t,a,s,i)=>{let o=P(e),r=v[o]||(v[o]=(l=>{let u=0,p=11;for(;u<l.length;)p=101*p+l.charCodeAt(u++)>>>0;return"go"+p})(o));if(!v[r]){let l=o!==e?e:(u=>{let p,f,m=[{}];for(;p=de.exec(u.replace(pe,""));)p[4]?m.shift():p[3]?(f=p[3].replace(H," ").trim(),m.unshift(m[0][f]=m[0][f]||{})):m[0][p[1]]=p[2].replace(H," ").trim();return m[0]})(e);v[r]=$(i?{["@keyframes "+r]:l}:l,a?"":"."+r)}let n=a&&v.g?v.g:null;return a&&(v.g=v[r]),((l,u,p,f)=>{f?u.data=u.data.replace(f,l):u.data.indexOf(l)===-1&&(u.data=p?l+u.data:u.data+l)})(v[r],t,s,n),r},"i"),fe=c((e,t,a)=>e.reduce((s,i,o)=>{let r=t[o];if(r&&r.call){let n=r(a),l=n&&n.props&&n.props.className||/^go/.test(n)&&n;r=l?"."+l:n&&typeof n=="object"?n.props?"":$(n,""):n===!1?"":n}return s+i+(r??"")},""),"p");function A(e){let t=this||{},a=e.call?e(t.p):e;return ue(a.unshift?a.raw?fe(a,[].slice.call(arguments,1),t.p):a.reduce((s,i)=>Object.assign(s,i&&i.call?i(t.p):i),{}):a,ce(t.target),t.g,t.o,t.k)}c(A,"u");let W,T,B;A.bind({g:1});let x=A.bind({k:1});function me(e,t,a,s){$.p=t,W=e,T=a,B=s}c(me,"m");function k(e,t){let a=this||{};return function(){let s=arguments;function i(o,r){let n=Object.assign({},o),l=n.className||i.className;a.p=Object.assign({theme:T&&T()},n),a.o=/ *go\d+/.test(l),n.className=A.apply(a,s)+(l?" "+l:"");let u=e;return e[0]&&(u=n.as||e,delete n.as),B&&u[0]&&B(n),W(u,n)}return c(i,"a"),t?t(i):i}}c(k,"j$1");var ge=c(e=>typeof e=="function","Z"),O=c((e,t)=>ge(e)?e(t):e,"h"),be=(()=>{let e=0;return()=>(++e).toString()})(),U=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),ye=20,L="default",Y=c((e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(r=>r.id===t.toast.id?{...r,...t.toast}:r)};case 2:let{toast:s}=t;return Y(e,{type:e.toasts.find(r=>r.id===s.id)?1:0,toast:s});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(r=>r.id===i||i===void 0?{...r,dismissed:!0,visible:!1}:r)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(r=>r.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(r=>({...r,pauseDuration:r.pauseDuration+o}))}}},"H"),D=[],Z={toasts:[],pausedAt:void 0,settings:{toastLimit:ye}},h={},q=c((e,t=L)=>{h[t]=Y(h[t]||Z,e),D.forEach(([a,s])=>{a===t&&s(h[t])})},"Y"),K=c(e=>Object.keys(h).forEach(t=>q(e,t)),"_"),he=c(e=>Object.keys(h).find(t=>h[t].toasts.some(a=>a.id===e)),"Q"),_=c((e=L)=>t=>{q(t,e)},"S"),ve={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},xe=c((e={},t=L)=>{let[a,s]=d.useState(h[t]||Z),i=d.useRef(h[t]);d.useEffect(()=>(i.current!==h[t]&&s(h[t]),D.push([t,s]),()=>{let r=D.findIndex(([n])=>n===t);r>-1&&D.splice(r,1)}),[t]);let o=a.toasts.map(r=>{var n,l,u;return{...e,...e[r.type],...r,removeDelay:r.removeDelay||((n=e[r.type])==null?void 0:n.removeDelay)||(e==null?void 0:e.removeDelay),duration:r.duration||((l=e[r.type])==null?void 0:l.duration)||(e==null?void 0:e.duration)||ve[r.type],style:{...e.style,...(u=e[r.type])==null?void 0:u.style,...r.style}}});return{...a,toasts:o}},"V"),we=c((e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(a==null?void 0:a.id)||be()}),"ie"),j=c(e=>(t,a)=>{let s=we(t,e,a);return _(s.toasterId||he(s.id))({type:2,toast:s}),s.id},"P"),g=c((e,t)=>j("blank")(e,t),"n");g.error=j("error");g.success=j("success");g.loading=j("loading");g.custom=j("custom");g.dismiss=(e,t)=>{let a={type:3,toastId:e};t?_(t)(a):K(a)};g.dismissAll=e=>g.dismiss(void 0,e);g.remove=(e,t)=>{let a={type:4,toastId:e};t?_(t)(a):K(a)};g.removeAll=e=>g.remove(void 0,e);g.promise=(e,t,a)=>{let s=g.loading(t.loading,{...a,...a==null?void 0:a.loading});return typeof e=="function"&&(e=e()),e.then(i=>{let o=t.success?O(t.success,i):void 0;return o?g.success(o,{id:s,...a,...a==null?void 0:a.success}):g.dismiss(s),i}).catch(i=>{let o=t.error?O(t.error,i):void 0;o?g.error(o,{id:s,...a,...a==null?void 0:a.error}):g.dismiss(s)}),e};var $e=1e3,ke=c((e,t="default")=>{let{toasts:a,pausedAt:s}=xe(e,t),i=d.useRef(new Map).current,o=d.useCallback((f,m=$e)=>{if(i.has(f))return;let b=setTimeout(()=>{i.delete(f),r({type:4,toastId:f})},m);i.set(f,b)},[]);d.useEffect(()=>{if(s)return;let f=Date.now(),m=a.map(b=>{if(b.duration===1/0)return;let C=(b.duration||0)+b.pauseDuration-(f-b.createdAt);if(C<0){b.visible&&g.dismiss(b.id);return}return setTimeout(()=>g.dismiss(b.id,t),C)});return()=>{m.forEach(b=>b&&clearTimeout(b))}},[a,s,t]);let r=d.useCallback(_(t),[t]),n=d.useCallback(()=>{r({type:5,time:Date.now()})},[r]),l=d.useCallback((f,m)=>{r({type:1,toast:{id:f,height:m}})},[r]),u=d.useCallback(()=>{s&&r({type:6,time:Date.now()})},[s,r]),p=d.useCallback((f,m)=>{let{reverseOrder:b=!1,gutter:C=8,defaultPosition:R}=m||{},z=a.filter(y=>(y.position||R)===(f.position||R)&&y.height),Q=z.findIndex(y=>y.id===f.id),M=z.filter((y,N)=>N<Q&&y.visible).length;return z.filter(y=>y.visible).slice(...b?[M+1]:[0,M]).reduce((y,N)=>y+(N.height||0)+C,0)},[a]);return d.useEffect(()=>{a.forEach(f=>{if(f.dismissed)o(f.id,f.removeDelay);else{let m=i.get(f.id);m&&(clearTimeout(m),i.delete(f.id))}})},[a,o]),{toasts:a,handlers:{updateHeight:l,startPause:n,endPause:u,calculateOffset:p}}},"w"),Ee=x`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,je=x`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ce=x`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Ie=k("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Ee} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${je} 0.15s ease-out forwards;
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
    animation: ${Ce} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,De=x`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Oe=k("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${De} 1s linear infinite;
`,Se=x`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Ae=x`
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
}`,_e=k("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Se} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Ae} 0.2s ease-out forwards;
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
`,ze=k("div")`
  position: absolute;
`,Ne=k("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Te=x`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Be=k("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Te} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Le=c(({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return t!==void 0?typeof t=="string"?d.createElement(Be,null,t):t:a==="blank"?null:d.createElement(Ne,null,d.createElement(Oe,{...s}),a!=="loading"&&d.createElement(ze,null,a==="error"?d.createElement(Ie,{...s}):d.createElement(_e,{...s})))},"$"),Re=c(e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,"Re"),Me=c(e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,"Ee"),Fe="0%{opacity:0;} 100%{opacity:1;}",He="0%{opacity:1;} 100%{opacity:0;}",Pe=k("div")`
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
`,We=k("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Ue=c((e,t)=>{let a=e.includes("top")?1:-1,[s,i]=U()?[Fe,He]:[Re(a),Me(a)];return{animation:t?`${x(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${x(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},"ke"),Ye=d.memo(({toast:e,position:t,style:a,children:s})=>{let i=e.height?Ue(e.position||t||"top-center",e.visible):{opacity:0},o=d.createElement(Le,{toast:e}),r=d.createElement(We,{...e.ariaProps},O(e.message,e));return d.createElement(Pe,{className:e.className,style:{...i,...a,...e.style}},typeof s=="function"?s({icon:o,message:r}):d.createElement(d.Fragment,null,o,r))});me(d.createElement);var Ze=c(({id:e,className:t,style:a,onHeightUpdate:s,children:i})=>{let o=d.useCallback(r=>{if(r){let n=c(()=>{let l=r.getBoundingClientRect().height;s(e,l)},"l");n(),new MutationObserver(n).observe(r,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return d.createElement("div",{ref:o,className:t,style:a},i)},"we"),qe=c((e,t)=>{let a=e.includes("top"),s=a?{top:0}:{bottom:0},i=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:U()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...s,...i}},"Me"),Ke=A`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,I=16,ot=c(({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:i,toasterId:o,containerStyle:r,containerClassName:n})=>{let{toasts:l,handlers:u}=ke(a,o);return d.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:I,left:I,right:I,bottom:I,pointerEvents:"none",...r},className:n,onMouseEnter:u.startPause,onMouseLeave:u.endPause},l.map(p=>{let f=p.position||t,m=u.calculateOffset(p,{reverseOrder:e,gutter:s,defaultPosition:t}),b=qe(f,m);return d.createElement(Ze,{id:p.id,key:p.id,onHeightUpdate:u.updateHeight,className:p.visible?Ke:"",style:b},p.type==="custom"?O(p.message,p):i?i(p):d.createElement(Ye,{toast:p,position:f}))}))},"Fe");export{ot as F,E as T,rt as a,te as b,g as n};
