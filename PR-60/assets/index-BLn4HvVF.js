import{j as y}from"./jsx-runtime-CB_V9I5Y.js";import{B as F}from"./index-CWvrgZ1b.js";import{I as M}from"./Icon-DG6KDu5A.js";import{T as H}from"./Tooltip-DmTxkRv1.js";import{T as G}from"./Typography-DOQ44quZ.js";import{R as J,r as u}from"./index-CTjT7uj6.js";import{B as X}from"./Button-DSrMKdf0.js";import{k as ee}from"./emotion-react.browser.esm-Bwsi5GpN.js";import{f as S,d as te}from"./emotion-styled.browser.esm-DBghOYGd.js";var ae=(e=>(e.TopLeft="top-left",e.TopCenter="top-center",e.TopRight="top-right",e.BottomLeft="bottom-left",e.BottomCenter="bottom-center",e.BottomRight="bottom-right",e))(ae||{}),j=(e=>(e.Success="success",e.Error="error",e.Info="informative",e.Warning="warning",e))(j||{});const re=ee`
  from { opacity: 0; }
  to   { opacity: 1; }
`,se=S.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  animation: ${re} 0.75s ease-in;
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
`,oe=S.div`
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
`,ie=S.button`
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
`,ne=S(X)`
  ${({theme:e,toastType:t})=>`
    color: ${e.palette[t].dark};

    &:hover {
      background-color: ${e.palette[t].medium};
      color: ${e.palette[t].dark};
    }
`}
`,le={[j.Success]:"check_circle",[j.Error]:"error",[j.Info]:"info",[j.Warning]:"warning"},ot=({id:e,dataTestId:t,title:a,message:o,onClose:i,type:s,isVisible:r=!0,dismissible:n=!0,actions:l})=>{const p=t??`toast-${e}`,d=te();return y.jsxs(se,{"data-testid":p,isVisible:r,toastType:s,children:[y.jsxs(F,{style:{alignSelf:"start",flexDirection:"row",width:"100%",gap:d.spacing.spacing_30},children:[y.jsx(M,{code:le[s],color:d.palette[s].dark}),y.jsx(G,{color:`${s}.dark`,element:"span",fontStyles:"bodyLgBold",style:{textTransform:"capitalize"},children:a}),n?y.jsx(ie,{"data-testId":"close-button",onClick:i,toastType:s,children:y.jsx(M,{code:"close",color:d.palette[s].dark})}):null]}),y.jsx(oe,{toastType:s,children:o}),l&&(l==null?void 0:l.length)>0?y.jsx(F,{style:{flexDirection:"row",justifyContent:"flex-end",gap:d.spacing.spacing_20,marginTop:d.spacing.spacing_30},children:l.map(({label:c,onClick:f,dataTestId:m,tooltip:b},I)=>{if(I>1)return null;const E=y.jsx(ne,{"data-testid":m,onClick:f,size:"small",toastType:s,variant:"text",children:c});return b!=null&&b.message?y.jsxs(H,{children:[E,y.jsx(H.Content,{background:(b==null?void 0:b.background)??"full",children:b==null?void 0:b.message})]},c):y.jsx(J.Fragment,{children:E},c)})}):null]},e)};let de={data:""},ce=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||de,ue=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,pe=/\/\*[^]*?\*\/|  +/g,P=/\n+/g,$=(e,t)=>{let a="",o="",i="";for(let s in e){let r=e[s];s[0]=="@"?s[1]=="i"?a=s+" "+r+";":o+=s[1]=="f"?$(r,s):s+"{"+$(r,s[1]=="k"?"":t)+"}":typeof r=="object"?o+=$(r,t?t.replace(/([^,])+/g,n=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,n):n?n+" "+l:l)):s):r!=null&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=$.p?$.p(s,r):s+":"+r+";")}return a+(t&&i?t+"{"+i+"}":i)+o},v={},W=e=>{if(typeof e=="object"){let t="";for(let a in e)t+=a+W(e[a]);return t}return e},fe=(e,t,a,o,i)=>{let s=W(e),r=v[s]||(v[s]=(l=>{let p=0,d=11;for(;p<l.length;)d=101*d+l.charCodeAt(p++)>>>0;return"go"+d})(s));if(!v[r]){let l=s!==e?e:(p=>{let d,c,f=[{}];for(;d=ue.exec(p.replace(pe,""));)d[4]?f.shift():d[3]?(c=d[3].replace(P," ").trim(),f.unshift(f[0][c]=f[0][c]||{})):f[0][d[1]]=d[2].replace(P," ").trim();return f[0]})(e);v[r]=$(i?{["@keyframes "+r]:l}:l,a?"":"."+r)}let n=a&&v.g?v.g:null;return a&&(v.g=v[r]),((l,p,d,c)=>{c?p.data=p.data.replace(c,l):p.data.indexOf(l)===-1&&(p.data=d?l+p.data:p.data+l)})(v[r],t,o,n),r},me=(e,t,a)=>e.reduce((o,i,s)=>{let r=t[s];if(r&&r.call){let n=r(a),l=n&&n.props&&n.props.className||/^go/.test(n)&&n;r=l?"."+l:n&&typeof n=="object"?n.props?"":$(n,""):n===!1?"":n}return o+i+(r??"")},"");function z(e){let t=this||{},a=e.call?e(t.p):e;return fe(a.unshift?a.raw?me(a,[].slice.call(arguments,1),t.p):a.reduce((o,i)=>Object.assign(o,i&&i.call?i(t.p):i),{}):a,ce(t.target),t.g,t.o,t.k)}let U,_,N;z.bind({g:1});let w=z.bind({k:1});function ge(e,t,a,o){$.p=t,U=e,_=a,N=o}function k(e,t){let a=this||{};return function(){let o=arguments;function i(s,r){let n=Object.assign({},s),l=n.className||i.className;a.p=Object.assign({theme:_&&_()},n),a.o=/ *go\d+/.test(l),n.className=z.apply(a,o)+(l?" "+l:"");let p=e;return e[0]&&(p=n.as||e,delete n.as),N&&p[0]&&N(n),U(p,n)}return t?t(i):i}}var be=e=>typeof e=="function",O=(e,t)=>be(e)?e(t):e,ye=(()=>{let e=0;return()=>(++e).toString()})(),Y=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),he=20,R="default",Z=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(r=>r.id===t.toast.id?{...r,...t.toast}:r)};case 2:let{toast:o}=t;return Z(e,{type:e.toasts.find(r=>r.id===o.id)?1:0,toast:o});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(r=>r.id===i||i===void 0?{...r,dismissed:!0,visible:!1}:r)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(r=>r.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(r=>({...r,pauseDuration:r.pauseDuration+s}))}}},T=[],q={toasts:[],pausedAt:void 0,settings:{toastLimit:he}},x={},K=(e,t=R)=>{x[t]=Z(x[t]||q,e),T.forEach(([a,o])=>{a===t&&o(x[t])})},Q=e=>Object.keys(x).forEach(t=>K(e,t)),xe=e=>Object.keys(x).find(t=>x[t].toasts.some(a=>a.id===e)),A=(e=R)=>t=>{K(t,e)},ve={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},we=(e={},t=R)=>{let[a,o]=u.useState(x[t]||q),i=u.useRef(x[t]);u.useEffect(()=>(i.current!==x[t]&&o(x[t]),T.push([t,o]),()=>{let r=T.findIndex(([n])=>n===t);r>-1&&T.splice(r,1)}),[t]);let s=a.toasts.map(r=>{var n,l,p;return{...e,...e[r.type],...r,removeDelay:r.removeDelay||((n=e[r.type])==null?void 0:n.removeDelay)||(e==null?void 0:e.removeDelay),duration:r.duration||((l=e[r.type])==null?void 0:l.duration)||(e==null?void 0:e.duration)||ve[r.type],style:{...e.style,...(p=e[r.type])==null?void 0:p.style,...r.style}}});return{...a,toasts:s}},$e=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(a==null?void 0:a.id)||ye()}),C=e=>(t,a)=>{let o=$e(t,e,a);return A(o.toasterId||xe(o.id))({type:2,toast:o}),o.id},g=(e,t)=>C("blank")(e,t);g.error=C("error");g.success=C("success");g.loading=C("loading");g.custom=C("custom");g.dismiss=(e,t)=>{let a={type:3,toastId:e};t?A(t)(a):Q(a)};g.dismissAll=e=>g.dismiss(void 0,e);g.remove=(e,t)=>{let a={type:4,toastId:e};t?A(t)(a):Q(a)};g.removeAll=e=>g.remove(void 0,e);g.promise=(e,t,a)=>{let o=g.loading(t.loading,{...a,...a==null?void 0:a.loading});return typeof e=="function"&&(e=e()),e.then(i=>{let s=t.success?O(t.success,i):void 0;return s?g.success(s,{id:o,...a,...a==null?void 0:a.success}):g.dismiss(o),i}).catch(i=>{let s=t.error?O(t.error,i):void 0;s?g.error(s,{id:o,...a,...a==null?void 0:a.error}):g.dismiss(o)}),e};var ke=1e3,Ee=(e,t="default")=>{let{toasts:a,pausedAt:o}=we(e,t),i=u.useRef(new Map).current,s=u.useCallback((c,f=ke)=>{if(i.has(c))return;let m=setTimeout(()=>{i.delete(c),r({type:4,toastId:c})},f);i.set(c,m)},[]);u.useEffect(()=>{if(o)return;let c=Date.now(),f=a.map(m=>{if(m.duration===1/0)return;let b=(m.duration||0)+m.pauseDuration-(c-m.createdAt);if(b<0){m.visible&&g.dismiss(m.id);return}return setTimeout(()=>g.dismiss(m.id,t),b)});return()=>{f.forEach(m=>m&&clearTimeout(m))}},[a,o,t]);let r=u.useCallback(A(t),[t]),n=u.useCallback(()=>{r({type:5,time:Date.now()})},[r]),l=u.useCallback((c,f)=>{r({type:1,toast:{id:c,height:f}})},[r]),p=u.useCallback(()=>{o&&r({type:6,time:Date.now()})},[o,r]),d=u.useCallback((c,f)=>{let{reverseOrder:m=!1,gutter:b=8,defaultPosition:I}=f||{},E=a.filter(h=>(h.position||I)===(c.position||I)&&h.height),V=E.findIndex(h=>h.id===c.id),L=E.filter((h,B)=>B<V&&h.visible).length;return E.filter(h=>h.visible).slice(...m?[L+1]:[0,L]).reduce((h,B)=>h+(B.height||0)+b,0)},[a]);return u.useEffect(()=>{a.forEach(c=>{if(c.dismissed)s(c.id,c.removeDelay);else{let f=i.get(c.id);f&&(clearTimeout(f),i.delete(c.id))}})},[a,s]),{toasts:a,handlers:{updateHeight:l,startPause:n,endPause:p,calculateOffset:d}}},je=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Ce=w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ie=w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,De=k("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${je} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Ce} 0.15s ease-out forwards;
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
    animation: ${Ie} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Te=w`
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
  animation: ${Te} 1s linear infinite;
`,Se=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,ze=w`
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
}`,Ae=k("div")`
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
    animation: ${ze} 0.2s ease-out forwards;
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
`,Be=k("div")`
  position: absolute;
`,_e=k("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Ne=w`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Re=k("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Ne} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Le=({toast:e})=>{let{icon:t,type:a,iconTheme:o}=e;return t!==void 0?typeof t=="string"?u.createElement(Re,null,t):t:a==="blank"?null:u.createElement(_e,null,u.createElement(Oe,{...o}),a!=="loading"&&u.createElement(Be,null,a==="error"?u.createElement(De,{...o}):u.createElement(Ae,{...o})))},Fe=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Me=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,He="0%{opacity:0;} 100%{opacity:1;}",Pe="0%{opacity:1;} 100%{opacity:0;}",We=k("div")`
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
`,Ue=k("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Ye=(e,t)=>{let a=e.includes("top")?1:-1,[o,i]=Y()?[He,Pe]:[Fe(a),Me(a)];return{animation:t?`${w(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Ze=u.memo(({toast:e,position:t,style:a,children:o})=>{let i=e.height?Ye(e.position||t||"top-center",e.visible):{opacity:0},s=u.createElement(Le,{toast:e}),r=u.createElement(Ue,{...e.ariaProps},O(e.message,e));return u.createElement(We,{className:e.className,style:{...i,...a,...e.style}},typeof o=="function"?o({icon:s,message:r}):u.createElement(u.Fragment,null,s,r))});ge(u.createElement);var qe=({id:e,className:t,style:a,onHeightUpdate:o,children:i})=>{let s=u.useCallback(r=>{if(r){let n=()=>{let l=r.getBoundingClientRect().height;o(e,l)};n(),new MutationObserver(n).observe(r,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return u.createElement("div",{ref:s,className:t,style:a},i)},Ke=(e,t)=>{let a=e.includes("top"),o=a?{top:0}:{bottom:0},i=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:Y()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...o,...i}},Qe=z`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,D=16,it=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:o,children:i,toasterId:s,containerStyle:r,containerClassName:n})=>{let{toasts:l,handlers:p}=Ee(a,s);return u.createElement("div",{"data-rht-toaster":s||"",style:{position:"fixed",zIndex:9999,top:D,left:D,right:D,bottom:D,pointerEvents:"none",...r},className:n,onMouseEnter:p.startPause,onMouseLeave:p.endPause},l.map(d=>{let c=d.position||t,f=p.calculateOffset(d,{reverseOrder:e,gutter:o,defaultPosition:t}),m=Ke(c,f);return u.createElement(qe,{id:d.id,key:d.id,onHeightUpdate:p.updateHeight,className:d.visible?Qe:"",style:m},d.type==="custom"?O(d.message,d):i?i(d):u.createElement(Ze,{toast:d,position:c}))}))};export{it as F,j as T,ot as a,ae as b,g as n};
