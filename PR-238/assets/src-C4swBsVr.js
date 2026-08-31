var ee=Object.defineProperty;var l=(e,t)=>ee(e,"name",{value:t,configurable:!0});import{o as te}from"./rolldown-runtime-CzYk_CEw.js";import{t as re}from"./react-HNhQAnN4.js";import{o as B,s as ae,t as D,u as U}from"./emotion-styled.browser.esm-BD_8_ENF.js";import{t as P}from"./src-Cgsrikn0.js";import{t as oe}from"./jsx-runtime-Br4tQxt1.js";import"./icon-BVKwuEsa.js";import{t as ie}from"./Typography-BVFm109i.js";import{i as se}from"./core-DtZ76Qs_.js";import{t as ne}from"./src-1jRqCCWR.js";import"./box-DLdZVqFP.js";import"./typography-D38L8NZ6.js";import{t as le}from"./src-DOZlIpA1.js";import"./button-CfcM87f0.js";var q=(function(e){return e.TopLeft="top-left",e.TopCenter="top-center",e.TopRight="top-right",e.BottomLeft="bottom-left",e.BottomCenter="bottom-center",e.BottomRight="bottom-right",e})({}),E=(function(e){return e.Success="success",e.Error="error",e.Info="informative",e.Warning="warning",e})({}),c=te(re(),1);B();var de=ae`
  from { opacity: 0; }
  to   { opacity: 1; }
`,ce=D.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  animation: ${de} 0.75s ease-in;
  transition: all 0.75s ease-in-out;
  overflow: hidden;
  ${({theme:e,isVisible:t,type:r})=>`
    border: 1px solid ${e.palette[r].default};
    border-left: 6px solid ${e.palette[r].default};
    background-color: ${e.palette[r].light};
    opacity: ${t?1:0};
    border-radius: ${e.shape.toast};
    padding: ${e.spacing.spacing_50} ${e.spacing.spacing_50} ${e.spacing.spacing_50} ${e.spacing.spacing_30};
  `}
`,pe=D.div`
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
`,ue=D.button`
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
`,me=D.div`
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
`;B();var y=oe(),fe={[E.Success]:"check_circle",[E.Error]:"error",[E.Info]:"info",[E.Warning]:"warning"},ve=l(({id:e,dataTestId:t,title:r,message:i,onClose:s,type:o,isVisible:a=!0,dismissible:n=!0,children:d})=>{const u=t??`toast-${e}`,p=U();return(0,y.jsxs)(ce,{"data-testid":u,isVisible:a,type:o,children:[(0,y.jsxs)(ne,{style:{alignSelf:"start",flexDirection:"row",width:"100%",gap:p.spacing.spacing_30},children:[(0,y.jsx)(P,{code:fe[o],color:p.palette[o].dark}),(0,y.jsx)(ie,{color:`${o}.dark`,element:"span",fontStyles:"bodyLgBold",children:r}),n?(0,y.jsx)(ue,{"data-testId":"close-button",onClick:s,toastType:o,children:(0,y.jsx)(P,{code:"close",color:p.palette[o].dark})}):null]}),(0,y.jsx)(pe,{type:o,children:i}),d?(0,y.jsx)(me,{type:o,children:d}):null]},e)},"Toast"),ge={data:""},be=l(e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||ge,"t"),ye=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,he=/\/\*[^]*?\*\/|  +/g,H=/\n+/g,$=l((e,t)=>{let r="",i="",s="";for(let o in e){let a=e[o];o[0]=="@"?o[1]=="i"?r=o+" "+a+";":i+=o[1]=="f"?$(a,o):o+"{"+$(a,o[1]=="k"?"":t)+"}":typeof a=="object"?i+=$(a,t?t.replace(/([^,])+/g,n=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,d=>/&/.test(d)?d.replace(/&/g,n):n?n+" "+d:d)):o):a!=null&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=$.p?$.p(o,a):o+":"+a+";")}return r+(t&&s?t+"{"+s+"}":s)+i},"o"),x={},V=l(e=>{if(typeof e=="object"){let t="";for(let r in e)t+=r+V(e[r]);return t}return e},"s"),xe=l((e,t,r,i,s)=>{let o=V(e),a=x[o]||(x[o]=(d=>{let u=0,p=11;for(;u<d.length;)p=101*p+d.charCodeAt(u++)>>>0;return"go"+p})(o));if(!x[a]){let d=o!==e?e:(u=>{let p,m,v=[{}];for(;p=ye.exec(u.replace(he,""));)p[4]?v.shift():p[3]?(m=p[3].replace(H," ").trim(),v.unshift(v[0][m]=v[0][m]||{})):v[0][p[1]]=p[2].replace(H," ").trim();return v[0]})(e);x[a]=$(s?{["@keyframes "+a]:d}:d,r?"":"."+a)}let n=r&&x.g?x.g:null;return r&&(x.g=x[a]),((d,u,p,m)=>{m?u.data=u.data.replace(m,d):u.data.indexOf(d)===-1&&(u.data=p?d+u.data:u.data+d)})(x[a],t,i,n),a},"i"),we=l((e,t,r)=>e.reduce((i,s,o)=>{let a=t[o];if(a&&a.call){let n=a(r),d=n&&n.props&&n.props.className||/^go/.test(n)&&n;a=d?"."+d:n&&typeof n=="object"?n.props?"":$(n,""):n===!1?"":n}return i+s+(a??"")},""),"p");function S(e){let t=this||{},r=e.call?e(t.p):e;return xe(r.unshift?r.raw?we(r,[].slice.call(arguments,1),t.p):r.reduce((i,s)=>Object.assign(i,s&&s.call?s(t.p):s),{}):r,be(t.target),t.g,t.o,t.k)}l(S,"u");var W,z,N,kt=S.bind({g:1}),w=S.bind({k:1});function $e(e,t,r,i){$.p=t,W=e,z=r,N=i}l($e,"m");function k(e,t){let r=this||{};return function(){let i=arguments;function s(o,a){let n=Object.assign({},o),d=n.className||s.className;r.p=Object.assign({theme:z&&z()},n),r.o=/ *go\d+/.test(d),n.className=S.apply(r,i)+(d?" "+d:""),t&&(n.ref=a);let u=e;return e[0]&&(u=n.as||e,delete n.as),N&&u[0]&&N(n),W(u,n)}return l(s,"a"),t?t(s):s}}l(k,"j$1");var ke=l(e=>typeof e=="function","Z"),O=l((e,t)=>ke(e)?e(t):e,"h"),Ee=(()=>{let e=0;return()=>(++e).toString()})(),Y=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),_e=20,L="default",Z=l((e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(a=>a.id===t.toast.id?{...a,...t.toast}:a)};case 2:let{toast:i}=t;return Z(e,{type:e.toasts.find(a=>a.id===i.id)?1:0,toast:i});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(a=>a.id===s||s===void 0?{...a,dismissed:!0,visible:!1}:a)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(a=>a.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+o}))}}},"H"),I=[],K={toasts:[],pausedAt:void 0,settings:{toastLimit:_e}},h={},Q=l((e,t=L)=>{h[t]=Z(h[t]||K,e),I.forEach(([r,i])=>{r===t&&i(h[t])})},"Y"),G=l(e=>Object.keys(h).forEach(t=>Q(e,t)),"_"),je=l(e=>Object.keys(h).find(t=>h[t].toasts.some(r=>r.id===e)),"Q"),T=l((e=L)=>t=>{Q(t,e)},"S"),Ce={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},Ie=l((e={},t=L)=>{let[r,i]=(0,c.useState)(h[t]||K),s=(0,c.useRef)(h[t]);(0,c.useEffect)(()=>(s.current!==h[t]&&i(h[t]),I.push([t,i]),()=>{let a=I.findIndex(([n])=>n===t);a>-1&&I.splice(a,1)}),[t]);let o=r.toasts.map(a=>{var n,d,u;return{...e,...e[a.type],...a,removeDelay:a.removeDelay||((n=e[a.type])==null?void 0:n.removeDelay)||e?.removeDelay,duration:a.duration||((d=e[a.type])==null?void 0:d.duration)||e?.duration||Ce[a.type],style:{...e.style,...(u=e[a.type])==null?void 0:u.style,...a.style}}});return{...r,toasts:o}},"V"),Oe=l((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:r?.id||Ee()}),"ie"),_=l(e=>(t,r)=>{let i=Oe(t,e,r);return T(i.toasterId||je(i.id))({type:2,toast:i}),i.id},"P"),f=l((e,t)=>_("blank")(e,t),"n");f.error=_("error");f.success=_("success");f.loading=_("loading");f.custom=_("custom");f.dismiss=(e,t)=>{let r={type:3,toastId:e};t?T(t)(r):G(r)};f.dismissAll=e=>f.dismiss(void 0,e);f.remove=(e,t)=>{let r={type:4,toastId:e};t?T(t)(r):G(r)};f.removeAll=e=>f.remove(void 0,e);f.promise=(e,t,r)=>{let i=f.loading(t.loading,{...r,...r?.loading});return typeof e=="function"&&(e=e()),e.then(s=>{let o=t.success?O(t.success,s):void 0;return o?f.success(o,{id:i,...r,...r?.success}):f.dismiss(i),s}).catch(s=>{let o=t.error?O(t.error,s):void 0;o?f.error(o,{id:i,...r,...r?.error}):f.dismiss(i)}),e};var De=1e3,Se=l((e,t="default")=>{let{toasts:r,pausedAt:i}=Ie(e,t),s=(0,c.useRef)(new Map).current,o=(0,c.useCallback)((m,v=De)=>{if(s.has(m))return;let g=setTimeout(()=>{s.delete(m),a({type:4,toastId:m})},v);s.set(m,g)},[]);(0,c.useEffect)(()=>{if(i)return;let m=Date.now(),v=r.map(g=>{if(g.duration===1/0)return;let j=(g.duration||0)+g.pauseDuration-(m-g.createdAt);if(j<0){g.visible&&f.dismiss(g.id);return}return setTimeout(()=>f.dismiss(g.id,t),j)});return()=>{v.forEach(g=>g&&clearTimeout(g))}},[r,i,t]);let a=(0,c.useCallback)(T(t),[t]),n=(0,c.useCallback)(()=>{a({type:5,time:Date.now()})},[a]),d=(0,c.useCallback)((m,v)=>{a({type:1,toast:{id:m,height:v}})},[a]),u=(0,c.useCallback)(()=>{i&&a({type:6,time:Date.now()})},[i,a]),p=(0,c.useCallback)((m,v)=>{let{reverseOrder:g=!1,gutter:j=8,defaultPosition:M}=v||{},A=r.filter(b=>(b.position||M)===(m.position||M)&&b.height),X=A.findIndex(b=>b.id===m.id),F=A.filter((b,R)=>R<X&&b.visible).length;return A.filter(b=>b.visible).slice(...g?[F+1]:[0,F]).reduce((b,R)=>b+(R.height||0)+j,0)},[r]);return(0,c.useEffect)(()=>{r.forEach(m=>{if(m.dismissed)o(m.id,m.removeDelay);else{let v=s.get(m.id);v&&(clearTimeout(v),s.delete(m.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:d,startPause:n,endPause:u,calculateOffset:p}}},"w"),Te=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Ae=w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Re=w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,ze=k("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Te} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Ae} 0.15s ease-out forwards;
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
    animation: ${Re} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Ne=w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Be=k("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Ne} 1s linear infinite;
`,Le=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Me=w`
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
}`,Fe=k("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Le} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Me} 0.2s ease-out forwards;
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
`,Pe=k("div")`
  position: absolute;
`,He=k("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Ue=w`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,qe=k("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Ue} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Ve=l(({toast:e})=>{let{icon:t,type:r,iconTheme:i}=e;return t!==void 0?typeof t=="string"?c.createElement(qe,null,t):t:r==="blank"?null:c.createElement(He,null,c.createElement(Be,{...i}),r!=="loading"&&c.createElement(Pe,null,r==="error"?c.createElement(ze,{...i}):c.createElement(Fe,{...i})))},"$"),We=l(e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,"Re"),Ye=l(e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,"Ee"),Ze="0%{opacity:0;} 100%{opacity:1;}",Ke="0%{opacity:1;} 100%{opacity:0;}",Qe=k("div")`
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
`,Ge=k("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Je=l((e,t)=>{let r=e.includes("top")?1:-1,[i,s]=Y()?[Ze,Ke]:[We(r),Ye(r)];return{animation:t?`${w(i)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},"ke"),Xe=c.memo(({toast:e,position:t,style:r,children:i})=>{let s=e.height?Je(e.position||t||"top-center",e.visible):{opacity:0},o=c.createElement(Ve,{toast:e}),a=c.createElement(Ge,{...e.ariaProps},O(e.message,e));return c.createElement(Qe,{className:e.className,style:{...s,...r,...e.style}},typeof i=="function"?i({icon:o,message:a}):c.createElement(c.Fragment,null,o,a))});$e(c.createElement);var et=l(({id:e,className:t,style:r,onHeightUpdate:i,children:s})=>{let o=c.useCallback(a=>{if(a){let n=l(()=>{let d=a.getBoundingClientRect().height;i(e,d)},"l");n(),new MutationObserver(n).observe(a,{subtree:!0,childList:!0,characterData:!0})}},[e,i]);return c.createElement("div",{ref:o,className:t,style:r},s)},"we"),tt=l((e,t)=>{let r=e.includes("top"),i=r?{top:0}:{bottom:0},s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:Y()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...i,...s}},"Me"),rt=S`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,C=16,at=l(({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:i,children:s,toasterId:o,containerStyle:a,containerClassName:n})=>{let{toasts:d,handlers:u}=Se(r,o);return c.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:C,left:C,right:C,bottom:C,pointerEvents:"none",...a},className:n,onMouseEnter:u.startPause,onMouseLeave:u.endPause},d.map(p=>{let m=p.position||t,v=tt(m,u.calculateOffset(p,{reverseOrder:e,gutter:i,defaultPosition:t}));return c.createElement(et,{id:p.id,key:p.id,onHeightUpdate:u.updateHeight,className:p.visible?rt:"",style:v},p.type==="custom"?O(p.message,p):s?s(p):c.createElement(Xe,{toast:p,position:m}))}))},"Fe");B();var ot=4e3,it=1/0,st=q.BottomCenter,nt=q.BottomRight,J=l(e=>c.Children.map(e,t=>c.isValidElement(t)?t.type===le?c.cloneElement(t,{...t.props,size:"small",variant:"text"}):t.props.children?c.cloneElement(t,{...t.props},J(t.props.children)):t:t),"processChildren"),Et=l(({type:e,title:t,message:r,children:i,dismissible:s,...o})=>{const a=e===E.Error?it:ot;f.custom(n=>(0,y.jsx)(ve,{dismissible:s,id:n.id,isVisible:n.visible,message:r,onClose:l(()=>f.dismiss(n.id),"onClose"),title:t,type:e,children:J(i)}),{duration:a,...o})},"emitToast"),_t=l(({gutter:e=8,...t})=>{const r=U(),i=se(`(max-width: ${r.breakpoints.mq2}px)`),s=i?st:nt,o=i?8:16;return(0,y.jsx)(at,{gutter:e,position:s,...t,containerStyle:{bottom:16,right:o,top:o,left:o,...t.containerStyle,zIndex:12}})},"Toaster");export{E as i,Et as n,ve as r,_t as t};
