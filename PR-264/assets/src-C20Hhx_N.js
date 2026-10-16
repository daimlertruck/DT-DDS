var bt=Object.defineProperty;var l=(e,t)=>bt(e,"name",{value:t,configurable:!0});import{n as S,o as z}from"./rolldown-runtime-CzYk_CEw.js";import{t as E}from"./react-HNhQAnN4.js";import{c as ie,f as tt,l as xt,n as q,t as Tt}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{n as de}from"./src-CQysuBx9.js";import{t as at}from"./jsx-runtime-Br4tQxt1.js";import{t as Dt}from"./icon-DzQ0uhXD.js";import{t as ht}from"./Typography-DFPn0Q4m.js";import{l as kt,t as _t}from"./core-xrhRXAfU.js";import{t as vt}from"./src-CYYpCRzL.js";import{t as wt}from"./box-Dhy-LEcB.js";import{t as $t}from"./typography-DiQ6mAVX.js";import{n as St}from"./src-gBi2N1bJ.js";import{t as Nt}from"./button-Dd4DW-5J.js";var se,P;function ne(){return(ne=S((()=>{se=(function(e){return e.TopLeft="top-left",e.TopCenter="top-center",e.TopRight="top-right",e.BottomLeft="bottom-left",e.BottomCenter="bottom-center",e.BottomRight="bottom-right",e})({}),P=(function(e){return e.Success="success",e.Error="error",e.Info="informative",e.Warning="warning",e})({})})))()}l(ne,"init_enums");var me,st,rt,ot,it;function nt(){return(nt=S((()=>{ie(),Tt(),me=xt`
  from { opacity: 0; }
  to   { opacity: 1; }
`,st=q.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  animation: ${me} 0.75s ease-in;
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
`,rt=q.div`
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
`,ot=q.button`
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
`,it=q.div`
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
`})))()}l(nt,"init_Toast_styled");var h,ue,M;function le(){return(le=S((()=>{ie(),wt(),Dt(),$t(),ne(),nt(),h=at(),ue={[P.Success]:"check_circle",[P.Error]:"error",[P.Info]:"info",[P.Warning]:"warning"},M=l(({id:e,dataTestId:t,title:a,message:o,onClose:i,type:r,isVisible:s=!0,dismissible:n=!0,children:c})=>{const d=t??`toast-${e}`,p=tt();return(0,h.jsxs)(st,{"data-testid":d,isVisible:s,type:r,children:[(0,h.jsxs)(vt,{style:{alignSelf:"start",flexDirection:"row",width:"100%",gap:p.spacing.spacing_30},children:[(0,h.jsx)(de,{code:ue[r],color:p.palette[r].dark}),(0,h.jsx)(ht,{color:`${r}.dark`,element:"span",fontStyles:"bodyLgBold",children:a}),n?(0,h.jsx)(ot,{"data-testId":"close-button",onClick:i,toastType:r,children:(0,h.jsx)(de,{code:"close",color:p.palette[r].dark})}):null]}),(0,h.jsx)(rt,{type:r,children:o}),c?(0,h.jsx)(it,{type:r,children:c}):null]},e)},"Toast");try{M.displayName="Toast",M.__docgenInfo={description:"",displayName:"Toast",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/toast/src/Toast.tsx",methods:[],props:{id:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.tsx",name:"ToastProps"}],description:"",name:"id",parent:{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.tsx",name:"ToastProps"},required:!0,tags:{},type:{name:"string"}},type:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.tsx",name:"ToastProps"}],description:"",name:"type",parent:{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.tsx",name:"ToastProps"},required:!0,tags:{},type:{name:"ToastType"}},title:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.tsx",name:"ToastProps"}],description:"",name:"title",parent:{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.tsx",name:"ToastProps"},required:!0,tags:{},type:{name:"string"}},message:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.tsx",name:"ToastProps"}],description:"",name:"message",parent:{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.tsx",name:"ToastProps"},required:!0,tags:{},type:{name:"string"}},onClose:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.tsx",name:"ToastProps"}],description:"",name:"onClose",parent:{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.tsx",name:"ToastProps"},required:!0,tags:{},type:{name:"() => void"}},isVisible:{defaultValue:{value:"true"},declarations:[{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.tsx",name:"ToastProps"}],description:"",name:"isVisible",parent:{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.tsx",name:"ToastProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},dismissible:{defaultValue:{value:"true"},declarations:[{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.tsx",name:"ToastProps"}],description:"",name:"dismissible",parent:{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.tsx",name:"ToastProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}}},tags:{}}}catch{}})))()}l(le,"init_Toast");function L(e){let t=this||{},a=e.call?e(t.p):e;return ct(a.unshift?a.raw?pt(a,[].slice.call(arguments,1),t.p):a.reduce((o,i)=>Object.assign(o,i&&i.call?i(t.p):i),{}):a,lt(t.target),t.g,t.o,t.k)}l(L,"u");function Et(e,t,a,o){k.p=t,dt=e,re=a,oe=o}l(Et,"m");function _(e,t){let a=this||{};return function(){let o=arguments;function i(r,s){let n=Object.assign({},r),c=n.className||i.className;a.p=Object.assign({theme:re&&re()},n),a.o=/ *go\d+/.test(c),n.className=L.apply(a,o)+(c?" "+c:""),t&&(n.ref=s);let d=e;return e[0]&&(d=n.as||e,delete n.as),oe&&d[0]&&oe(n),dt(d,n)}return l(i,"a"),t?t(i):i}}l(_,"j$1");var fe,lt,ge,ye,U,k,x,W,ct,pt,dt,re,oe,Pt,D;function mt(){return(mt=S((()=>{fe={data:""},lt=l(e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||fe,"t"),ge=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,ye=/\/\*[^]*?\*\/|  +/g,U=/\n+/g,k=l((e,t)=>{let a="",o="",i="";for(let r in e){let s=e[r];r[0]=="@"?r[1]=="i"?a=r+" "+s+";":o+=r[1]=="f"?k(s,r):r+"{"+k(s,r[1]=="k"?"":t)+"}":typeof s=="object"?o+=k(s,t?t.replace(/([^,])+/g,n=>r.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,c=>/&/.test(c)?c.replace(/&/g,n):n?n+" "+c:c)):r):s!=null&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=k.p?k.p(r,s):r+":"+s+";")}return a+(t&&i?t+"{"+i+"}":i)+o},"o"),x={},W=l(e=>{if(typeof e=="object"){let t="";for(let a in e)t+=a+W(e[a]);return t}return e},"s"),ct=l((e,t,a,o,i)=>{let r=W(e),s=x[r]||(x[r]=(c=>{let d=0,p=11;for(;d<c.length;)p=101*p+c.charCodeAt(d++)>>>0;return"go"+p})(r));if(!x[s]){let c=r!==e?e:(d=>{let p,m,f=[{}];for(;p=ge.exec(d.replace(ye,""));)p[4]?f.shift():p[3]?(m=p[3].replace(U," ").trim(),f.unshift(f[0][m]=f[0][m]||{})):f[0][p[1]]=p[2].replace(U," ").trim();return f[0]})(e);x[s]=k(i?{["@keyframes "+s]:c}:c,a?"":"."+s)}let n=a&&x.g?x.g:null;return a&&(x.g=x[s]),((c,d,p,m)=>{m?d.data=d.data.replace(m,c):d.data.indexOf(c)===-1&&(d.data=p?c+d.data:d.data+c)})(x[s],t,o,n),s},"i"),pt=l((e,t,a)=>e.reduce((o,i,r)=>{let s=t[r];if(s&&s.call){let n=s(a),c=n&&n.props&&n.props.className||/^go/.test(n)&&n;s=c?"."+c:n&&typeof n=="object"?n.props?"":k(n,""):n===!1?"":n}return o+i+(s??"")},""),"p"),Pt=L.bind({g:1}),D=L.bind({k:1})})))()}l(mt,"init_goober_modern");var B,T,v,w,$,be,j,xe,Y,Te,R,Z,I,K,y,Q,G,De,C,he,ke,_e,N,u,ve,we,$e,Se,Ne,Ee,Pe,je,Ie,Ce,Oe,Ae,Ve,qe,Be,Re,ze,Me,Le,Fe,He,Ue,We,Ye,Ze,Ke,Qe,O,ut;function ft(){return(ft=S((()=>{B=E(),T=E(),v=z(E(),1),mt(),w=z(E(),1),$=z(E(),1),be=l(e=>typeof e=="function","Z"),j=l((e,t)=>be(e)?e(t):e,"h"),xe=(()=>{let e=0;return()=>(++e).toString()})(),Y=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),Te=20,R="default",Z=l((e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(s=>s.id===t.toast.id?{...s,...t.toast}:s)};case 2:let{toast:o}=t;return Z(e,{type:e.toasts.find(s=>s.id===o.id)?1:0,toast:o});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(s=>s.id===i||i===void 0?{...s,dismissed:!0,visible:!1}:s)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(s=>s.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let r=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(s=>({...s,pauseDuration:s.pauseDuration+r}))}}},"H"),I=[],K={toasts:[],pausedAt:void 0,settings:{toastLimit:Te}},y={},Q=l((e,t=R)=>{y[t]=Z(y[t]||K,e),I.forEach(([a,o])=>{a===t&&o(y[t])})},"Y"),G=l(e=>Object.keys(y).forEach(t=>Q(e,t)),"_"),De=l(e=>Object.keys(y).find(t=>y[t].toasts.some(a=>a.id===e)),"Q"),C=l((e=R)=>t=>{Q(t,e)},"S"),he={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},ke=l((e={},t=R)=>{let[a,o]=(0,B.useState)(y[t]||K),i=(0,B.useRef)(y[t]);(0,B.useEffect)(()=>(i.current!==y[t]&&o(y[t]),I.push([t,o]),()=>{let s=I.findIndex(([n])=>n===t);s>-1&&I.splice(s,1)}),[t]);let r=a.toasts.map(s=>{var n,c,d;return{...e,...e[s.type],...s,removeDelay:s.removeDelay||((n=e[s.type])==null?void 0:n.removeDelay)||e?.removeDelay,duration:s.duration||((c=e[s.type])==null?void 0:c.duration)||e?.duration||he[s.type],style:{...e.style,...(d=e[s.type])==null?void 0:d.style,...s.style}}});return{...a,toasts:r}},"V"),_e=l((e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:a?.id||xe()}),"ie"),N=l(e=>(t,a)=>{let o=_e(t,e,a);return C(o.toasterId||De(o.id))({type:2,toast:o}),o.id},"P"),u=l((e,t)=>N("blank")(e,t),"n"),u.error=N("error"),u.success=N("success"),u.loading=N("loading"),u.custom=N("custom"),u.dismiss=(e,t)=>{let a={type:3,toastId:e};t?C(t)(a):G(a)},u.dismissAll=e=>u.dismiss(void 0,e),u.remove=(e,t)=>{let a={type:4,toastId:e};t?C(t)(a):G(a)},u.removeAll=e=>u.remove(void 0,e),u.promise=(e,t,a)=>{let o=u.loading(t.loading,{...a,...a?.loading});return typeof e=="function"&&(e=e()),e.then(i=>{let r=t.success?j(t.success,i):void 0;return r?u.success(r,{id:o,...a,...a?.success}):u.dismiss(o),i}).catch(i=>{let r=t.error?j(t.error,i):void 0;r?u.error(r,{id:o,...a,...a?.error}):u.dismiss(o)}),e},ve=1e3,we=l((e,t="default")=>{let{toasts:a,pausedAt:o}=ke(e,t),i=(0,T.useRef)(new Map).current,r=(0,T.useCallback)((m,f=ve)=>{if(i.has(m))return;let g=setTimeout(()=>{i.delete(m),s({type:4,toastId:m})},f);i.set(m,g)},[]);(0,T.useEffect)(()=>{if(o)return;let m=Date.now(),f=a.map(g=>{if(g.duration===1/0)return;let V=(g.duration||0)+g.pauseDuration-(m-g.createdAt);if(V<0){g.visible&&u.dismiss(g.id);return}return setTimeout(()=>u.dismiss(g.id,t),V)});return()=>{f.forEach(g=>g&&clearTimeout(g))}},[a,o,t]);let s=(0,T.useCallback)(C(t),[t]),n=(0,T.useCallback)(()=>{s({type:5,time:Date.now()})},[s]),c=(0,T.useCallback)((m,f)=>{s({type:1,toast:{id:m,height:f}})},[s]),d=(0,T.useCallback)(()=>{o&&s({type:6,time:Date.now()})},[o,s]),p=(0,T.useCallback)((m,f)=>{let{reverseOrder:g=!1,gutter:V=8,defaultPosition:ce}=f||{},F=a.filter(b=>(b.position||ce)===(m.position||ce)&&b.height),yt=F.findIndex(b=>b.id===m.id),pe=F.filter((b,H)=>H<yt&&b.visible).length;return F.filter(b=>b.visible).slice(...g?[pe+1]:[0,pe]).reduce((b,H)=>b+(H.height||0)+V,0)},[a]);return(0,T.useEffect)(()=>{a.forEach(m=>{if(m.dismissed)r(m.id,m.removeDelay);else{let f=i.get(m.id);f&&(clearTimeout(f),i.delete(m.id))}})},[a,r]),{toasts:a,handlers:{updateHeight:c,startPause:n,endPause:d,calculateOffset:p}}},"w"),$e=D`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Se=D`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ne=D`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Ee=_("div")`
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
    animation: ${Se} 0.15s ease-out forwards;
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
    animation: ${Ne} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Pe=D`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,je=_("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Pe} 1s linear infinite;
`,Ie=D`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Ce=D`
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
}`,Oe=_("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Ie} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Ce} 0.2s ease-out forwards;
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
`,Ae=_("div")`
  position: absolute;
`,Ve=_("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,qe=D`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Be=_("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${qe} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Re=l(({toast:e})=>{let{icon:t,type:a,iconTheme:o}=e;return t!==void 0?typeof t=="string"?w.createElement(Be,null,t):t:a==="blank"?null:w.createElement(Ve,null,w.createElement(je,{...o}),a!=="loading"&&w.createElement(Ae,null,a==="error"?w.createElement(Ee,{...o}):w.createElement(Oe,{...o})))},"$"),ze=l(e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,"Re"),Me=l(e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,"Ee"),Le="0%{opacity:0;} 100%{opacity:1;}",Fe="0%{opacity:1;} 100%{opacity:0;}",He=_("div")`
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
`,Ue=_("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,We=l((e,t)=>{let a=e.includes("top")?1:-1,[o,i]=Y()?[Le,Fe]:[ze(a),Me(a)];return{animation:t?`${D(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${D(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},"ke"),Ye=v.memo(({toast:e,position:t,style:a,children:o})=>{let i=e.height?We(e.position||t||"top-center",e.visible):{opacity:0},r=v.createElement(Re,{toast:e}),s=v.createElement(Ue,{...e.ariaProps},j(e.message,e));return v.createElement(He,{className:e.className,style:{...i,...a,...e.style}},typeof o=="function"?o({icon:r,message:s}):v.createElement(v.Fragment,null,r,s))}),Et($.createElement),Ze=l(({id:e,className:t,style:a,onHeightUpdate:o,children:i})=>{let r=$.useCallback(s=>{if(s){let n=l(()=>{let c=s.getBoundingClientRect().height;o(e,c)},"l");n(),new MutationObserver(n).observe(s,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return $.createElement("div",{ref:r,className:t,style:a},i)},"we"),Ke=l((e,t)=>{let a=e.includes("top"),o=a?{top:0}:{bottom:0},i=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:Y()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...o,...i}},"Me"),Qe=L`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,O=16,ut=l(({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:o,children:i,toasterId:r,containerStyle:s,containerClassName:n})=>{let{toasts:c,handlers:d}=we(a,r);return $.createElement("div",{"data-rht-toaster":r||"",style:{position:"fixed",zIndex:9999,top:O,left:O,right:O,bottom:O,pointerEvents:"none",...s},className:n,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(p=>{let m=p.position||t,f=Ke(m,d.calculateOffset(p,{reverseOrder:e,gutter:o,defaultPosition:t}));return $.createElement(Ze,{id:p.id,key:p.id,onHeightUpdate:d.updateHeight,className:p.visible?Qe:"",style:f},p.type==="custom"?j(p.message,p):i?i(p):$.createElement(Ye,{toast:p,position:m}))}))},"Fe")})))()}l(ft,"init_dist");var A,J,Ge,Je,Xe,et,X,ee,te,ae;function gt(){return(gt=S((()=>{A=z(E()),ft(),ie(),Nt(),_t(),ne(),le(),J=at(),Ge=4e3,Je=1/0,Xe=se.BottomCenter,et=se.BottomRight,X=l(e=>{u.dismiss(e)},"dismissToast"),ee=l(e=>A.Children.map(e,t=>A.isValidElement(t)?t.type===St?A.cloneElement(t,{...t.props,size:"small",variant:"text"}):t.props.children?A.cloneElement(t,{...t.props},ee(t.props.children)):t:t),"processChildren"),te=l(({type:e,title:t,message:a,children:o,dismissible:i,...r})=>{const s=e===P.Error?Je:Ge;u.custom(n=>(0,J.jsx)(M,{dismissible:i,id:n.id,isVisible:n.visible,message:a,onClose:l(()=>u.dismiss(n.id),"onClose"),title:t,type:e,children:ee(o)}),{duration:s,...r})},"emitToast"),ae=l(({gutter:e=8,...t})=>{const a=tt(),o=kt(`(max-width: ${a.breakpoints.mq2}px)`),i=o?Xe:et,r=o?8:16;return(0,J.jsx)(ut,{gutter:e,position:i,...t,containerStyle:{bottom:16,right:r,top:r,left:r,...t.containerStyle,zIndex:12}})},"Toaster");try{X.displayName="dismissToast",X.__docgenInfo={description:"",displayName:"dismissToast",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/toast/src/Toaster.tsx",methods:[],props:{},tags:{}}}catch{}try{te.displayName="emitToast",te.__docgenInfo={description:"",displayName:"emitToast",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/toast/src/Toaster.tsx",methods:[],props:{type:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toast/src/Toaster.tsx",name:"EmitToastProps"}],description:"",name:"type",parent:{fileName:"DT-DDS/packages/react-packages/toast/src/Toaster.tsx",name:"EmitToastProps"},required:!0,tags:{},type:{name:"ToastType"}},title:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toast/src/Toaster.tsx",name:"EmitToastProps"}],description:"",name:"title",parent:{fileName:"DT-DDS/packages/react-packages/toast/src/Toaster.tsx",name:"EmitToastProps"},required:!0,tags:{},type:{name:"string"}},message:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toast/src/Toaster.tsx",name:"EmitToastProps"}],description:"",name:"message",parent:{fileName:"DT-DDS/packages/react-packages/toast/src/Toaster.tsx",name:"EmitToastProps"},required:!0,tags:{},type:{name:"string"}},dismissible:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toast/src/Toaster.tsx",name:"EmitToastProps"}],description:"",name:"dismissible",parent:{fileName:"DT-DDS/packages/react-packages/toast/src/Toaster.tsx",name:"EmitToastProps"},required:!1,tags:{},type:{name:"boolean | undefined"}}},tags:{}}}catch{}try{ae.displayName="Toaster",ae.__docgenInfo={description:"",displayName:"Toaster",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/toast/src/Toaster.tsx",methods:[],props:{},tags:{}}}catch{}})))()}l(gt,"init_Toaster");function jt(){return(jt=S((()=>{le(),gt()})))()}l(jt,"init_src");export{M as a,ne as c,gt as i,ae as n,le as o,te as r,P as s,jt as t};
