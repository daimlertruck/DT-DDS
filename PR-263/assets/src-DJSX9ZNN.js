var Tt=Object.defineProperty;var l=(e,t)=>Tt(e,"name",{value:t,configurable:!0});import{n as w,o as M}from"./rolldown-runtime-CzYk_CEw.js";import{t as E}from"./react-HNhQAnN4.js";import{c as de,f as ot,l as Dt,n as A,t as ht}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{n as ge}from"./src-C-D5h35d.js";import{t as it}from"./jsx-runtime-Br4tQxt1.js";import{t as kt}from"./icon-Cq91_35a.js";import{t as _t}from"./Typography-IsrlSr7J.js";import{l as bt,t as xt}from"./core-BfEa33pH.js";import{t as St}from"./src-DqTreagS.js";import{t as vt}from"./box-Bi4-Swpw.js";import{t as Nt}from"./typography-X0Nz-_pO.js";import{n as wt}from"./src-DiI3RFDu.js";import{t as $t}from"./button-CNM8H9d4.js";var ne,P;function pe(){return(pe=w((()=>{ne=(function(e){return e.TopLeft="top-left",e.TopCenter="top-center",e.TopRight="top-right",e.BottomLeft="bottom-left",e.BottomCenter="bottom-center",e.BottomRight="bottom-right",e})({}),P=(function(e){return e.Success="success",e.Error="error",e.Info="informative",e.Warning="warning",e})({})})))()}l(pe,"init_enums");var ye,R,z,F,H;function nt(){return(nt=w((()=>{de(),ht(),ye=Dt`
  from { opacity: 0; }
  to   { opacity: 1; }
`,R=A.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  animation: ${ye} 0.75s ease-in;
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
`,z=A.div`
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
`,F=A.button`
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
`,H=A.div`
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
`;try{R.displayName="ToastStyled",R.__docgenInfo={description:"",displayName:"ToastStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/toast/src/Toast.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}},isVisible:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.styled.ts",name:"ToastStyledProps"}],description:"",name:"isVisible",parent:{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.styled.ts",name:"ToastStyledProps"},required:!0,tags:{},type:{name:"boolean"}},type:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.styled.ts",name:"ToastProps"}],description:"",name:"type",parent:{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.styled.ts",name:"ToastProps"},required:!0,tags:{},type:{name:"ToastType"}}},tags:{}}}catch{}try{z.displayName="ToastMessageStyled",z.__docgenInfo={description:"",displayName:"ToastMessageStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/toast/src/Toast.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}},type:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.styled.ts",name:"ToastProps"}],description:"",name:"type",parent:{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.styled.ts",name:"ToastProps"},required:!0,tags:{},type:{name:"ToastType"}}},tags:{}}}catch{}try{F.displayName="ToastButtonCloseStyled",F.__docgenInfo={description:"",displayName:"ToastButtonCloseStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/toast/src/Toast.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}},toastType:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.styled.ts",name:"ToastButtonCloseStyledProps"}],description:"",name:"toastType",parent:{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.styled.ts",name:"ToastButtonCloseStyledProps"},required:!0,tags:{},type:{name:"ToastType"}}},tags:{}}}catch{}try{H.displayName="ActionsContainer",H.__docgenInfo={description:"",displayName:"ActionsContainer",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/toast/src/Toast.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}},type:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.styled.ts",name:"ToastProps"}],description:"",name:"type",parent:{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.styled.ts",name:"ToastProps"},required:!0,tags:{},type:{name:"ToastType"}}},tags:{}}}catch{}})))()}l(nt,"init_Toast_styled");var _,Te,U;function me(){return(me=w((()=>{de(),vt(),kt(),Nt(),pe(),nt(),_=it(),Te={[P.Success]:"check_circle",[P.Error]:"error",[P.Info]:"info",[P.Warning]:"warning"},U=l(({id:e,dataTestId:t,title:a,message:o,onClose:i,type:r,isVisible:s=!0,dismissible:n=!0,children:c})=>{const p=t??`toast-${e}`,d=ot();return(0,_.jsxs)(R,{"data-testid":p,isVisible:s,type:r,children:[(0,_.jsxs)(St,{style:{alignSelf:"start",flexDirection:"row",width:"100%",gap:d.spacing.spacing_30},children:[(0,_.jsx)(ge,{code:Te[r],color:d.palette[r].dark}),(0,_.jsx)(_t,{color:`${r}.dark`,element:"span",fontStyles:"bodyLgBold",children:a}),n?(0,_.jsx)(F,{"data-testId":"close-button",onClick:i,toastType:r,children:(0,_.jsx)(ge,{code:"close",color:d.palette[r].dark})}):null]}),(0,_.jsx)(z,{type:r,children:o}),c?(0,_.jsx)(H,{type:r,children:c}):null]},e)},"Toast");try{U.displayName="Toast",U.__docgenInfo={description:"",displayName:"Toast",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/toast/src/Toast.tsx",methods:[],props:{id:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.tsx",name:"ToastProps"}],description:"",name:"id",parent:{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.tsx",name:"ToastProps"},required:!0,tags:{},type:{name:"string"}},type:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.tsx",name:"ToastProps"}],description:"",name:"type",parent:{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.tsx",name:"ToastProps"},required:!0,tags:{},type:{name:"ToastType"}},title:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.tsx",name:"ToastProps"}],description:"",name:"title",parent:{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.tsx",name:"ToastProps"},required:!0,tags:{},type:{name:"string"}},message:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.tsx",name:"ToastProps"}],description:"",name:"message",parent:{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.tsx",name:"ToastProps"},required:!0,tags:{},type:{name:"string"}},onClose:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.tsx",name:"ToastProps"}],description:"",name:"onClose",parent:{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.tsx",name:"ToastProps"},required:!0,tags:{},type:{name:"() => void"}},isVisible:{defaultValue:{value:"true"},declarations:[{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.tsx",name:"ToastProps"}],description:"",name:"isVisible",parent:{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.tsx",name:"ToastProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},dismissible:{defaultValue:{value:"true"},declarations:[{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.tsx",name:"ToastProps"}],description:"",name:"dismissible",parent:{fileName:"DT-DDS/packages/react-packages/toast/src/Toast.tsx",name:"ToastProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}}},tags:{}}}catch{}})))()}l(me,"init_Toast");function W(e){let t=this||{},a=e.call?e(t.p):e;return ct(a.unshift?a.raw?dt(a,[].slice.call(arguments,1),t.p):a.reduce((o,i)=>Object.assign(o,i&&i.call?i(t.p):i),{}):a,lt(t.target),t.g,t.o,t.k)}l(W,"u");function Et(e,t,a,o){b.p=t,pt=e,le=a,ce=o}l(Et,"m");function x(e,t){let a=this||{};return function(){let o=arguments;function i(r,s){let n=Object.assign({},r),c=n.className||i.className;a.p=Object.assign({theme:le&&le()},n),a.o=/ *go\d+/.test(c),n.className=W.apply(a,o)+(c?" "+c:""),t&&(n.ref=s);let p=e;return e[0]&&(p=n.as||e,delete n.as),ce&&p[0]&&ce(n),pt(p,n)}return l(i,"a"),t?t(i):i}}l(x,"j$1");var De,lt,he,ke,K,b,D,Q,ct,dt,pt,le,ce,Pt,k;function mt(){return(mt=w((()=>{De={data:""},lt=l(e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||De,"t"),he=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,ke=/\/\*[^]*?\*\/|  +/g,K=/\n+/g,b=l((e,t)=>{let a="",o="",i="";for(let r in e){let s=e[r];r[0]=="@"?r[1]=="i"?a=r+" "+s+";":o+=r[1]=="f"?b(s,r):r+"{"+b(s,r[1]=="k"?"":t)+"}":typeof s=="object"?o+=b(s,t?t.replace(/([^,])+/g,n=>r.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,c=>/&/.test(c)?c.replace(/&/g,n):n?n+" "+c:c)):r):s!=null&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=b.p?b.p(r,s):r+":"+s+";")}return a+(t&&i?t+"{"+i+"}":i)+o},"o"),D={},Q=l(e=>{if(typeof e=="object"){let t="";for(let a in e)t+=a+Q(e[a]);return t}return e},"s"),ct=l((e,t,a,o,i)=>{let r=Q(e),s=D[r]||(D[r]=(c=>{let p=0,d=11;for(;p<c.length;)d=101*d+c.charCodeAt(p++)>>>0;return"go"+d})(r));if(!D[s]){let c=r!==e?e:(p=>{let d,m,f=[{}];for(;d=he.exec(p.replace(ke,""));)d[4]?f.shift():d[3]?(m=d[3].replace(K," ").trim(),f.unshift(f[0][m]=f[0][m]||{})):f[0][d[1]]=d[2].replace(K," ").trim();return f[0]})(e);D[s]=b(i?{["@keyframes "+s]:c}:c,a?"":"."+s)}let n=a&&D.g?D.g:null;return a&&(D.g=D[s]),((c,p,d,m)=>{m?p.data=p.data.replace(m,c):p.data.indexOf(c)===-1&&(p.data=d?c+p.data:p.data+c)})(D[s],t,o,n),s},"i"),dt=l((e,t,a)=>e.reduce((o,i,r)=>{let s=t[r];if(s&&s.call){let n=s(a),c=n&&n.props&&n.props.className||/^go/.test(n)&&n;s=c?"."+c:n&&typeof n=="object"?n.props?"":b(n,""):n===!1?"":n}return o+i+(s??"")},""),"p"),Pt=W.bind({g:1}),k=W.bind({k:1})})))()}l(mt,"init_goober_modern");var B,h,S,v,N,_e,I,be,G,xe,L,J,C,X,y,ee,te,Se,V,ve,Ne,we,$,u,$e,Ee,Pe,Ie,Ce,Ve,je,qe,Oe,Ae,Be,Le,Me,Re,ze,Fe,He,Ue,We,Ye,Ze,Ke,Qe,Ge,Je,Xe,et,j,ut;function ft(){return(ft=w((()=>{B=E(),h=E(),S=M(E(),1),mt(),v=M(E(),1),N=M(E(),1),_e=l(e=>typeof e=="function","Z"),I=l((e,t)=>_e(e)?e(t):e,"h"),be=(()=>{let e=0;return()=>(++e).toString()})(),G=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),xe=20,L="default",J=l((e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(s=>s.id===t.toast.id?{...s,...t.toast}:s)};case 2:let{toast:o}=t;return J(e,{type:e.toasts.find(s=>s.id===o.id)?1:0,toast:o});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(s=>s.id===i||i===void 0?{...s,dismissed:!0,visible:!1}:s)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(s=>s.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let r=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(s=>({...s,pauseDuration:s.pauseDuration+r}))}}},"H"),C=[],X={toasts:[],pausedAt:void 0,settings:{toastLimit:xe}},y={},ee=l((e,t=L)=>{y[t]=J(y[t]||X,e),C.forEach(([a,o])=>{a===t&&o(y[t])})},"Y"),te=l(e=>Object.keys(y).forEach(t=>ee(e,t)),"_"),Se=l(e=>Object.keys(y).find(t=>y[t].toasts.some(a=>a.id===e)),"Q"),V=l((e=L)=>t=>{ee(t,e)},"S"),ve={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},Ne=l((e={},t=L)=>{let[a,o]=(0,B.useState)(y[t]||X),i=(0,B.useRef)(y[t]);(0,B.useEffect)(()=>(i.current!==y[t]&&o(y[t]),C.push([t,o]),()=>{let s=C.findIndex(([n])=>n===t);s>-1&&C.splice(s,1)}),[t]);let r=a.toasts.map(s=>{var n,c,p;return{...e,...e[s.type],...s,removeDelay:s.removeDelay||((n=e[s.type])==null?void 0:n.removeDelay)||e?.removeDelay,duration:s.duration||((c=e[s.type])==null?void 0:c.duration)||e?.duration||ve[s.type],style:{...e.style,...(p=e[s.type])==null?void 0:p.style,...s.style}}});return{...a,toasts:r}},"V"),we=l((e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:a?.id||be()}),"ie"),$=l(e=>(t,a)=>{let o=we(t,e,a);return V(o.toasterId||Se(o.id))({type:2,toast:o}),o.id},"P"),u=l((e,t)=>$("blank")(e,t),"n"),u.error=$("error"),u.success=$("success"),u.loading=$("loading"),u.custom=$("custom"),u.dismiss=(e,t)=>{let a={type:3,toastId:e};t?V(t)(a):te(a)},u.dismissAll=e=>u.dismiss(void 0,e),u.remove=(e,t)=>{let a={type:4,toastId:e};t?V(t)(a):te(a)},u.removeAll=e=>u.remove(void 0,e),u.promise=(e,t,a)=>{let o=u.loading(t.loading,{...a,...a?.loading});return typeof e=="function"&&(e=e()),e.then(i=>{let r=t.success?I(t.success,i):void 0;return r?u.success(r,{id:o,...a,...a?.success}):u.dismiss(o),i}).catch(i=>{let r=t.error?I(t.error,i):void 0;r?u.error(r,{id:o,...a,...a?.error}):u.dismiss(o)}),e},$e=1e3,Ee=l((e,t="default")=>{let{toasts:a,pausedAt:o}=Ne(e,t),i=(0,h.useRef)(new Map).current,r=(0,h.useCallback)((m,f=$e)=>{if(i.has(m))return;let g=setTimeout(()=>{i.delete(m),s({type:4,toastId:m})},f);i.set(m,g)},[]);(0,h.useEffect)(()=>{if(o)return;let m=Date.now(),f=a.map(g=>{if(g.duration===1/0)return;let O=(g.duration||0)+g.pauseDuration-(m-g.createdAt);if(O<0){g.visible&&u.dismiss(g.id);return}return setTimeout(()=>u.dismiss(g.id,t),O)});return()=>{f.forEach(g=>g&&clearTimeout(g))}},[a,o,t]);let s=(0,h.useCallback)(V(t),[t]),n=(0,h.useCallback)(()=>{s({type:5,time:Date.now()})},[s]),c=(0,h.useCallback)((m,f)=>{s({type:1,toast:{id:m,height:f}})},[s]),p=(0,h.useCallback)(()=>{o&&s({type:6,time:Date.now()})},[o,s]),d=(0,h.useCallback)((m,f)=>{let{reverseOrder:g=!1,gutter:O=8,defaultPosition:ue}=f||{},Y=a.filter(T=>(T.position||ue)===(m.position||ue)&&T.height),yt=Y.findIndex(T=>T.id===m.id),fe=Y.filter((T,Z)=>Z<yt&&T.visible).length;return Y.filter(T=>T.visible).slice(...g?[fe+1]:[0,fe]).reduce((T,Z)=>T+(Z.height||0)+O,0)},[a]);return(0,h.useEffect)(()=>{a.forEach(m=>{if(m.dismissed)r(m.id,m.removeDelay);else{let f=i.get(m.id);f&&(clearTimeout(f),i.delete(m.id))}})},[a,r]),{toasts:a,handlers:{updateHeight:c,startPause:n,endPause:p,calculateOffset:d}}},"w"),Pe=k`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Ie=k`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ce=k`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Ve=x("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Pe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Ie} 0.15s ease-out forwards;
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
`,je=k`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,qe=x("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${je} 1s linear infinite;
`,Oe=k`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Ae=k`
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
}`,Be=x("div")`
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
`,Le=x("div")`
  position: absolute;
`,Me=x("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Re=k`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ze=x("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Re} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Fe=l(({toast:e})=>{let{icon:t,type:a,iconTheme:o}=e;return t!==void 0?typeof t=="string"?v.createElement(ze,null,t):t:a==="blank"?null:v.createElement(Me,null,v.createElement(qe,{...o}),a!=="loading"&&v.createElement(Le,null,a==="error"?v.createElement(Ve,{...o}):v.createElement(Be,{...o})))},"$"),He=l(e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,"Re"),Ue=l(e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,"Ee"),We="0%{opacity:0;} 100%{opacity:1;}",Ye="0%{opacity:1;} 100%{opacity:0;}",Ze=x("div")`
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
`,Ke=x("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Qe=l((e,t)=>{let a=e.includes("top")?1:-1,[o,i]=G()?[We,Ye]:[He(a),Ue(a)];return{animation:t?`${k(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${k(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},"ke"),Ge=S.memo(({toast:e,position:t,style:a,children:o})=>{let i=e.height?Qe(e.position||t||"top-center",e.visible):{opacity:0},r=S.createElement(Fe,{toast:e}),s=S.createElement(Ke,{...e.ariaProps},I(e.message,e));return S.createElement(Ze,{className:e.className,style:{...i,...a,...e.style}},typeof o=="function"?o({icon:r,message:s}):S.createElement(S.Fragment,null,r,s))}),Et(N.createElement),Je=l(({id:e,className:t,style:a,onHeightUpdate:o,children:i})=>{let r=N.useCallback(s=>{if(s){let n=l(()=>{let c=s.getBoundingClientRect().height;o(e,c)},"l");n(),new MutationObserver(n).observe(s,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return N.createElement("div",{ref:r,className:t,style:a},i)},"we"),Xe=l((e,t)=>{let a=e.includes("top"),o=a?{top:0}:{bottom:0},i=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:G()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...o,...i}},"Me"),et=W`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,j=16,ut=l(({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:o,children:i,toasterId:r,containerStyle:s,containerClassName:n})=>{let{toasts:c,handlers:p}=Ee(a,r);return N.createElement("div",{"data-rht-toaster":r||"",style:{position:"fixed",zIndex:9999,top:j,left:j,right:j,bottom:j,pointerEvents:"none",...s},className:n,onMouseEnter:p.startPause,onMouseLeave:p.endPause},c.map(d=>{let m=d.position||t,f=Xe(m,p.calculateOffset(d,{reverseOrder:e,gutter:o,defaultPosition:t}));return N.createElement(Je,{id:d.id,key:d.id,onHeightUpdate:p.updateHeight,className:d.visible?et:"",style:f},d.type==="custom"?I(d.message,d):i?i(d):N.createElement(Ge,{toast:d,position:m}))}))},"Fe")})))()}l(ft,"init_dist");var q,ae,tt,at,st,rt,se,re,oe,ie;function gt(){return(gt=w((()=>{q=M(E()),ft(),de(),$t(),xt(),pe(),me(),ae=it(),tt=4e3,at=1/0,st=ne.BottomCenter,rt=ne.BottomRight,se=l(e=>{u.dismiss(e)},"dismissToast"),re=l(e=>q.Children.map(e,t=>q.isValidElement(t)?t.type===wt?q.cloneElement(t,{...t.props,size:"small",variant:"text"}):t.props.children?q.cloneElement(t,{...t.props},re(t.props.children)):t:t),"processChildren"),oe=l(({type:e,title:t,message:a,children:o,dismissible:i,...r})=>{const s=e===P.Error?at:tt;u.custom(n=>(0,ae.jsx)(U,{dismissible:i,id:n.id,isVisible:n.visible,message:a,onClose:l(()=>u.dismiss(n.id),"onClose"),title:t,type:e,children:re(o)}),{duration:s,...r})},"emitToast"),ie=l(({gutter:e=8,...t})=>{const a=ot(),o=bt(`(max-width: ${a.breakpoints.mq2}px)`),i=o?st:rt,r=o?8:16;return(0,ae.jsx)(ut,{gutter:e,position:i,...t,containerStyle:{bottom:16,right:r,top:r,left:r,...t.containerStyle,zIndex:12}})},"Toaster");try{se.displayName="dismissToast",se.__docgenInfo={description:"",displayName:"dismissToast",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/toast/src/Toaster.tsx",methods:[],props:{},tags:{}}}catch{}try{oe.displayName="emitToast",oe.__docgenInfo={description:"",displayName:"emitToast",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/toast/src/Toaster.tsx",methods:[],props:{type:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toast/src/Toaster.tsx",name:"EmitToastProps"}],description:"",name:"type",parent:{fileName:"DT-DDS/packages/react-packages/toast/src/Toaster.tsx",name:"EmitToastProps"},required:!0,tags:{},type:{name:"ToastType"}},title:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toast/src/Toaster.tsx",name:"EmitToastProps"}],description:"",name:"title",parent:{fileName:"DT-DDS/packages/react-packages/toast/src/Toaster.tsx",name:"EmitToastProps"},required:!0,tags:{},type:{name:"string"}},message:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toast/src/Toaster.tsx",name:"EmitToastProps"}],description:"",name:"message",parent:{fileName:"DT-DDS/packages/react-packages/toast/src/Toaster.tsx",name:"EmitToastProps"},required:!0,tags:{},type:{name:"string"}},dismissible:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toast/src/Toaster.tsx",name:"EmitToastProps"}],description:"",name:"dismissible",parent:{fileName:"DT-DDS/packages/react-packages/toast/src/Toaster.tsx",name:"EmitToastProps"},required:!1,tags:{},type:{name:"boolean | undefined"}}},tags:{}}}catch{}try{ie.displayName="Toaster",ie.__docgenInfo={description:"",displayName:"Toaster",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/toast/src/Toaster.tsx",methods:[],props:{},tags:{}}}catch{}})))()}l(gt,"init_Toaster");function It(){return(It=w((()=>{me(),gt()})))()}l(It,"init_src");export{U as a,pe as c,gt as i,ie as n,me as o,oe as r,P as s,It as t};
