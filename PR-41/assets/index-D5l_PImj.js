import{j as u}from"./jsx-runtime-DMAvRu52.js";import{C as D}from"./Close-mVzWqPf0.js";import{k as F}from"./emotion-react.browser.esm-DLeKyOu_.js";import{n as v}from"./emotion-styled.browser.esm-Dv69Fly8.js";import{r as d}from"./index-Dl6G-zuu.js";const R=t=>u.jsx("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...t,children:u.jsx("path",{d:"M12 0C5.376 0 0 5.376 0 12C0 18.624 5.376 24 12 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 12 0ZM12 21.6C6.708 21.6 2.4 17.292 2.4 12C2.4 6.708 6.708 2.4 12 2.4C17.292 2.4 21.6 6.708 21.6 12C21.6 17.292 17.292 21.6 12 21.6ZM17.508 6.696L9.6 14.604L6.492 11.508L4.8 13.2L9.6 18L19.2 8.4L17.508 6.696Z",fill:"currentColor"})}),P=t=>u.jsx("svg",{fill:"none",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...t,children:u.jsx("path",{d:"M11.988 0C5.364 0 0 5.376 0 12C0 18.624 5.364 24 11.988 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 11.988 0ZM12 21.6C6.696 21.6 2.4 17.304 2.4 12C2.4 6.696 6.696 2.4 12 2.4C17.304 2.4 21.6 6.696 21.6 12C21.6 17.304 17.304 21.6 12 21.6ZM10.8 15.6H13.2V18H10.8V15.6ZM10.8 6H13.2V13.2H10.8V6Z",fill:"currentColor"})}),W=t=>u.jsx("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...t,children:u.jsx("path",{d:"M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"})}),_=t=>u.jsx("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...t,children:u.jsx("path",{d:"M12 6.49L19.53 19.5H4.47L12 6.49ZM12 2.5L1 21.5H23L12 2.5ZM13 16.5H11V18.5H13V16.5ZM13 10.5H11V14.5H13V10.5Z"})});var U=(t=>(t.TopLeft="top-left",t.TopCenter="top-center",t.TopRight="top-right",t.BottomLeft="bottom-left",t.BottomCenter="bottom-center",t.BottomRight="bottom-right",t))(U||{}),$=(t=>(t.Success="success",t.Error="error",t.Info="informative",t.Warning="warning",t))($||{});const Y=v.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
  ${({theme:t,type:e})=>`
    background-color: ${t.palette[e].default};  
    color: ${t.palette.content.contrast}
`}
`,q=F`
  from { opacity: 0; }
  to   { opacity: 1; }
`,G=v.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 360px;
  animation: ${q} 0.75s ease-in;
  transition: all 0.75s ease-in-out;
  overflow: hidden;
  ${({theme:t,isVisible:e})=>`
    background-color: ${t.palette.surface.contrast};  
    opacity: ${e?1:0};
    color: ${t.palette.content.default};
    border-radius: ${t.shape.toast};
    box-shadow: ${t.shadows.s};
  `}
`,J=v.div`
  ${({theme:t})=>`
    height: 100%;
    flex-grow: 1;
    padding: ${t.spacing["2xs"]} ${t.spacing["2xs"]};
  `}
`,Q=v.div`
  ${({theme:t})=>`
      ${t.fontStyles.h6};
      color: ${t.palette.content.dark};
      margin-bottom: ${t.spacing["5xs"]};
      text-transform: capitalize;
  `}
`,X=v.div`
  ${({theme:t})=>`
    ${t.fontStyles.body2};
    color: ${t.palette.content.default};
    overflow: hidden;
    word-break: break-word;
    hyphens: auto;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
  `}
`,K=v.button`
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
`,tt=v.div`
  ${({theme:t,hasCloseButton:e})=>`
    display: grid;
    ${e?"grid-template-columns: auto 24px;":"grid-template-rows: auto auto;"}
    column-gap: ${t.spacing["2xs"]};
  `}
`,et=v.div`
  ${({theme:t,hasChildren:e})=>`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-top: ${e?t.spacing["5xs"]:0};
  `}
`,rt={[$.Success]:R,[$.Error]:P,[$.Info]:W,[$.Warning]:_},Qt=({children:t,id:e,dataTestId:r,title:s,message:a,onClose:o,type:n,isVisible:i=!0,dismissible:l=!0})=>{const c=rt[n],p=r??`toast-${e}`;return u.jsxs(G,{"data-testid":p,isVisible:i,type:n,children:[u.jsx(Y,{type:n,children:u.jsx(c,{height:20,width:20})}),u.jsxs(J,{children:[u.jsxs(tt,{hasCloseButton:l,children:[u.jsx(Q,{children:s}),l?u.jsx(K,{onClick:o,children:u.jsx(D,{})}):null,u.jsx(X,{children:a})]}),u.jsx(et,{hasChildren:!!t,children:t})]})]},e)};let ot={data:""},at=t=>typeof window=="object"?((t?t.querySelector("#_goober"):window._goober)||Object.assign((t||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:t||ot,st=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,it=/\/\*[^]*?\*\/|  +/g,V=/\n+/g,b=(t,e)=>{let r="",s="",a="";for(let o in t){let n=t[o];o[0]=="@"?o[1]=="i"?r=o+" "+n+";":s+=o[1]=="f"?b(n,o):o+"{"+b(n,o[1]=="k"?"":e)+"}":typeof n=="object"?s+=b(n,e?e.replace(/([^,])+/g,i=>o.replace(/(^:.*)|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,i):i?i+" "+l:l)):o):n!=null&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=b.p?b.p(o,n):o+":"+n+";")}return r+(e&&a?e+"{"+a+"}":a)+s},x={},A=t=>{if(typeof t=="object"){let e="";for(let r in t)e+=r+A(t[r]);return e}return t},nt=(t,e,r,s,a)=>{let o=A(t),n=x[o]||(x[o]=(l=>{let c=0,p=11;for(;c<l.length;)p=101*p+l.charCodeAt(c++)>>>0;return"go"+p})(o));if(!x[n]){let l=o!==t?t:(c=>{let p,g,m=[{}];for(;p=st.exec(c.replace(it,""));)p[4]?m.shift():p[3]?(g=p[3].replace(V," ").trim(),m.unshift(m[0][g]=m[0][g]||{})):m[0][p[1]]=p[2].replace(V," ").trim();return m[0]})(t);x[n]=b(a?{["@keyframes "+n]:l}:l,r?"":"."+n)}let i=r&&x.g?x.g:null;return r&&(x.g=x[n]),((l,c,p,g)=>{g?c.data=c.data.replace(g,l):c.data.indexOf(l)===-1&&(c.data=p?l+c.data:c.data+l)})(x[n],e,s,i),n},lt=(t,e,r)=>t.reduce((s,a,o)=>{let n=e[o];if(n&&n.call){let i=n(r),l=i&&i.props&&i.props.className||/^go/.test(i)&&i;n=l?"."+l:i&&typeof i=="object"?i.props?"":b(i,""):i===!1?"":i}return s+a+(n??"")},"");function O(t){let e=this||{},r=t.call?t(e.p):t;return nt(r.unshift?r.raw?lt(r,[].slice.call(arguments,1),e.p):r.reduce((s,a)=>Object.assign(s,a&&a.call?a(e.p):a),{}):r,at(e.target),e.g,e.o,e.k)}let B,Z,L;O.bind({g:1});let y=O.bind({k:1});function ct(t,e,r,s){b.p=e,B=t,Z=r,L=s}function w(t,e){let r=this||{};return function(){let s=arguments;function a(o,n){let i=Object.assign({},o),l=i.className||a.className;r.p=Object.assign({theme:Z&&Z()},i),r.o=/ *go\d+/.test(l),i.className=O.apply(r,s)+(l?" "+l:"");let c=t;return t[0]&&(c=i.as||t,delete i.as),L&&c[0]&&L(i),B(c,i)}return e?e(a):a}}var dt=t=>typeof t=="function",H=(t,e)=>dt(t)?t(e):t,pt=(()=>{let t=0;return()=>(++t).toString()})(),N=(()=>{let t;return()=>{if(t===void 0&&typeof window<"u"){let e=matchMedia("(prefers-reduced-motion: reduce)");t=!e||e.matches}return t}})(),ut=20,k=new Map,ft=1e3,z=t=>{if(k.has(t))return;let e=setTimeout(()=>{k.delete(t),C({type:4,toastId:t})},ft);k.set(t,e)},mt=t=>{let e=k.get(t);e&&clearTimeout(e)},T=(t,e)=>{switch(e.type){case 0:return{...t,toasts:[e.toast,...t.toasts].slice(0,ut)};case 1:return e.toast.id&&mt(e.toast.id),{...t,toasts:t.toasts.map(o=>o.id===e.toast.id?{...o,...e.toast}:o)};case 2:let{toast:r}=e;return t.toasts.find(o=>o.id===r.id)?T(t,{type:1,toast:r}):T(t,{type:0,toast:r});case 3:let{toastId:s}=e;return s?z(s):t.toasts.forEach(o=>{z(o.id)}),{...t,toasts:t.toasts.map(o=>o.id===s||s===void 0?{...o,visible:!1}:o)};case 4:return e.toastId===void 0?{...t,toasts:[]}:{...t,toasts:t.toasts.filter(o=>o.id!==e.toastId)};case 5:return{...t,pausedAt:e.time};case 6:let a=e.time-(t.pausedAt||0);return{...t,pausedAt:void 0,toasts:t.toasts.map(o=>({...o,pauseDuration:o.pauseDuration+a}))}}},M=[],I={toasts:[],pausedAt:void 0},C=t=>{I=T(I,t),M.forEach(e=>{e(I)})},gt={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},ht=(t={})=>{let[e,r]=d.useState(I);d.useEffect(()=>(M.push(r),()=>{let a=M.indexOf(r);a>-1&&M.splice(a,1)}),[e]);let s=e.toasts.map(a=>{var o,n;return{...t,...t[a.type],...a,duration:a.duration||((o=t[a.type])==null?void 0:o.duration)||(t==null?void 0:t.duration)||gt[a.type],style:{...t.style,...(n=t[a.type])==null?void 0:n.style,...a.style}}});return{...e,toasts:s}},xt=(t,e="blank",r)=>({createdAt:Date.now(),visible:!0,type:e,ariaProps:{role:"status","aria-live":"polite"},message:t,pauseDuration:0,...r,id:(r==null?void 0:r.id)||pt()}),j=t=>(e,r)=>{let s=xt(e,t,r);return C({type:2,toast:s}),s.id},f=(t,e)=>j("blank")(t,e);f.error=j("error");f.success=j("success");f.loading=j("loading");f.custom=j("custom");f.dismiss=t=>{C({type:3,toastId:t})};f.remove=t=>C({type:4,toastId:t});f.promise=(t,e,r)=>{let s=f.loading(e.loading,{...r,...r==null?void 0:r.loading});return t.then(a=>(f.success(H(e.success,a),{id:s,...r,...r==null?void 0:r.success}),a)).catch(a=>{f.error(H(e.error,a),{id:s,...r,...r==null?void 0:r.error})}),t};var yt=(t,e)=>{C({type:1,toast:{id:t,height:e}})},bt=()=>{C({type:5,time:Date.now()})},vt=t=>{let{toasts:e,pausedAt:r}=ht(t);d.useEffect(()=>{if(r)return;let o=Date.now(),n=e.map(i=>{if(i.duration===1/0)return;let l=(i.duration||0)+i.pauseDuration-(o-i.createdAt);if(l<0){i.visible&&f.dismiss(i.id);return}return setTimeout(()=>f.dismiss(i.id),l)});return()=>{n.forEach(i=>i&&clearTimeout(i))}},[e,r]);let s=d.useCallback(()=>{r&&C({type:6,time:Date.now()})},[r]),a=d.useCallback((o,n)=>{let{reverseOrder:i=!1,gutter:l=8,defaultPosition:c}=n||{},p=e.filter(h=>(h.position||c)===(o.position||c)&&h.height),g=p.findIndex(h=>h.id===o.id),m=p.filter((h,S)=>S<g&&h.visible).length;return p.filter(h=>h.visible).slice(...i?[m+1]:[0,m]).reduce((h,S)=>h+(S.height||0)+l,0)},[e]);return{toasts:e,handlers:{updateHeight:yt,startPause:bt,endPause:s,calculateOffset:a}}},wt=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Ct=y`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,$t=y`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,jt=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${wt} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Ct} 0.15s ease-out forwards;
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
    animation: ${$t} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Et=y`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,kt=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${t=>t.secondary||"#e0e0e0"};
  border-right-color: ${t=>t.primary||"#616161"};
  animation: ${Et} 1s linear infinite;
`,Mt=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,It=y`
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
}`,Ht=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Mt} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${It} 0.2s ease-out forwards;
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
`,Ot=w("div")`
  position: absolute;
`,St=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Zt=y`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Lt=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Zt} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Tt=({toast:t})=>{let{icon:e,type:r,iconTheme:s}=t;return e!==void 0?typeof e=="string"?d.createElement(Lt,null,e):e:r==="blank"?null:d.createElement(St,null,d.createElement(kt,{...s}),r!=="loading"&&d.createElement(Ot,null,r==="error"?d.createElement(jt,{...s}):d.createElement(Ht,{...s})))},Vt=t=>`
0% {transform: translate3d(0,${t*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,zt=t=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${t*-150}%,-1px) scale(.6); opacity:0;}
`,At="0%{opacity:0;} 100%{opacity:1;}",Bt="0%{opacity:1;} 100%{opacity:0;}",Nt=w("div")`
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
`,Dt=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Ft=(t,e)=>{let r=t.includes("top")?1:-1,[s,a]=N()?[At,Bt]:[Vt(r),zt(r)];return{animation:e?`${y(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${y(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Rt=d.memo(({toast:t,position:e,style:r,children:s})=>{let a=t.height?Ft(t.position||e||"top-center",t.visible):{opacity:0},o=d.createElement(Tt,{toast:t}),n=d.createElement(Dt,{...t.ariaProps},H(t.message,t));return d.createElement(Nt,{className:t.className,style:{...a,...r,...t.style}},typeof s=="function"?s({icon:o,message:n}):d.createElement(d.Fragment,null,o,n))});ct(d.createElement);var Pt=({id:t,className:e,style:r,onHeightUpdate:s,children:a})=>{let o=d.useCallback(n=>{if(n){let i=()=>{let l=n.getBoundingClientRect().height;s(t,l)};i(),new MutationObserver(i).observe(n,{subtree:!0,childList:!0,characterData:!0})}},[t,s]);return d.createElement("div",{ref:o,className:e,style:r},a)},Wt=(t,e)=>{let r=t.includes("top"),s=r?{top:0}:{bottom:0},a=t.includes("center")?{justifyContent:"center"}:t.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:N()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${e*(r?1:-1)}px)`,...s,...a}},_t=O`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,E=16,Xt=({reverseOrder:t,position:e="top-center",toastOptions:r,gutter:s,children:a,containerStyle:o,containerClassName:n})=>{let{toasts:i,handlers:l}=vt(r);return d.createElement("div",{style:{position:"fixed",zIndex:9999,top:E,left:E,right:E,bottom:E,pointerEvents:"none",...o},className:n,onMouseEnter:l.startPause,onMouseLeave:l.endPause},i.map(c=>{let p=c.position||e,g=l.calculateOffset(c,{reverseOrder:t,gutter:s,defaultPosition:e}),m=Wt(p,g);return d.createElement(Pt,{id:c.id,key:c.id,onHeightUpdate:l.updateHeight,className:c.visible?_t:"",style:m},c.type==="custom"?H(c.message,c):a?a(c):d.createElement(Rt,{toast:c,position:p}))}))};export{W as I,$ as T,Qt as a,Xt as b,U as c,f as n};
