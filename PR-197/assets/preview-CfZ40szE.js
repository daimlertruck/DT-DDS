var j=Object.defineProperty;var s=(r,e)=>j(r,"name",{value:e,configurable:!0});import{d as X}from"./index-B7qynYb3.js";const{useEffect:A,useMemo:_}=__STORYBOOK_MODULE_PREVIEW_API__,{global:N}=__STORYBOOK_MODULE_GLOBAL__,{logger:W}=__STORYBOOK_MODULE_CLIENT_LOGGER__;var c="backgrounds",D={light:{name:"light",value:"#F8F8F8"},dark:{name:"dark",value:"#333"}},{document:$,window:L}=N,F=s(()=>{var r;return!!((r=L==null?void 0:L.matchMedia("(prefers-reduced-motion: reduce)"))!=null&&r.matches)},"isReduceMotionEnabled"),B=s(r=>{(Array.isArray(r)?r:[r]).forEach(q)},"clearStyles"),q=s(r=>{var t;let e=$.getElementById(r);e&&((t=e.parentElement)==null||t.removeChild(e))},"clearStyle"),Y=s((r,e)=>{let t=$.getElementById(r);if(t)t.innerHTML!==e&&(t.innerHTML=e);else{let o=$.createElement("style");o.setAttribute("id",r),o.innerHTML=e,$.head.appendChild(o)}},"addGridStyle"),H=s((r,e,t)=>{var a;let o=$.getElementById(r);if(o)o.innerHTML!==e&&(o.innerHTML=e);else{let d=$.createElement("style");d.setAttribute("id",r),d.innerHTML=e;let i=`addon-backgrounds-grid${t?`-docs-${t}`:""}`,n=$.getElementById(i);n?(a=n.parentElement)==null||a.insertBefore(d,n):$.head.appendChild(d)}},"addBackgroundStyle"),J={cellSize:100,cellAmount:10,opacity:.8},R="addon-backgrounds",C="addon-backgrounds-grid",Q=F()?"":"transition: background-color 0.3s;",Z=s((r,e)=>{let{globals:t,parameters:o,viewMode:a,id:d}=e,{options:i=D,disable:n,grid:g=J}=o[c]||{},u=t[c]||{},b=u.value,l=b?i[b]:void 0,m=(l==null?void 0:l.value)||"transparent",y=u.grid||!1,k=!!l&&!n,f=a==="docs"?`#anchor--${d} .docs-story`:".sb-show-main",h=a==="docs"?`#anchor--${d} .docs-story`:".sb-show-main",K=o.layout===void 0||o.layout==="padded",G=a==="docs"?20:K?16:0,{cellAmount:x,cellSize:p,opacity:v,offsetX:S=G,offsetY:E=G}=g,T=a==="docs"?`${R}-docs-${d}`:`${R}-color`,w=a==="docs"?d:null;A(()=>{let O=`
    ${f} {
      background: ${m} !important;
      ${Q}
      }`;if(!k){B(T);return}H(T,O,w)},[f,T,w,k,m]);let M=a==="docs"?`${C}-docs-${d}`:`${C}`;return A(()=>{if(!y){B(M);return}let O=[`${p*x}px ${p*x}px`,`${p*x}px ${p*x}px`,`${p}px ${p}px`,`${p}px ${p}px`].join(", "),P=`
        ${h} {
          background-size: ${O} !important;
          background-position: ${S}px ${E}px, ${S}px ${E}px, ${S}px ${E}px, ${S}px ${E}px !important;
          background-blend-mode: difference !important;
          background-image: linear-gradient(rgba(130, 130, 130, ${v}) 1px, transparent 1px),
           linear-gradient(90deg, rgba(130, 130, 130, ${v}) 1px, transparent 1px),
           linear-gradient(rgba(130, 130, 130, ${v/2}) 1px, transparent 1px),
           linear-gradient(90deg, rgba(130, 130, 130, ${v/2}) 1px, transparent 1px) !important;
        }
      `;Y(M,P)},[x,p,h,M,y,S,E,v]),r()},"withBackgroundAndGrid"),V=s((r,e=[],t)=>{if(r==="transparent")return"transparent";if(e.find(a=>a.value===r)||r)return r;let o=e.find(a=>a.name===t);if(o)return o.value;if(t){let a=e.map(d=>d.name).join(", ");W.warn(X`
        Backgrounds Addon: could not find the default color "${t}".
        These are the available colors for your story based on your configuration:
        ${a}.
      `)}return"transparent"},"getBackgroundColorByName"),ee=s((r,e)=>{var b;let{globals:t,parameters:o}=e,a=(b=t[c])==null?void 0:b.value,d=o[c],i=_(()=>d.disable?"transparent":V(a,d.values,d.default),[d,a]),n=_(()=>i&&i!=="transparent",[i]),g=e.viewMode==="docs"?`#anchor--${e.id} .docs-story`:".sb-show-main",u=_(()=>`
      ${g} {
        background: ${i} !important;
        ${F()?"":"transition: background-color 0.3s;"}
      }
    `,[i,g]);return A(()=>{let l=e.viewMode==="docs"?`addon-backgrounds-docs-${e.id}`:"addon-backgrounds-color";if(!n){B(l);return}H(l,u,e.viewMode==="docs"?e.id:null)},[n,u,e]),r()},"withBackground"),re=s((r,e)=>{var k;let{globals:t,parameters:o}=e,a=o[c].grid,d=((k=t[c])==null?void 0:k.grid)===!0&&a.disable!==!0,{cellAmount:i,cellSize:n,opacity:g}=a,u=e.viewMode==="docs",b=o.layout===void 0||o.layout==="padded"?16:0,l=a.offsetX??(u?20:b),m=a.offsetY??(u?20:b),y=_(()=>{let f=e.viewMode==="docs"?`#anchor--${e.id} .docs-story`:".sb-show-main",h=[`${n*i}px ${n*i}px`,`${n*i}px ${n*i}px`,`${n}px ${n}px`,`${n}px ${n}px`].join(", ");return`
      ${f} {
        background-size: ${h} !important;
        background-position: ${l}px ${m}px, ${l}px ${m}px, ${l}px ${m}px, ${l}px ${m}px !important;
        background-blend-mode: difference !important;
        background-image: linear-gradient(rgba(130, 130, 130, ${g}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${g}) 1px, transparent 1px),
         linear-gradient(rgba(130, 130, 130, ${g/2}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${g/2}) 1px, transparent 1px) !important;
      }
    `},[n]);return A(()=>{let f=e.viewMode==="docs"?`addon-backgrounds-grid-docs-${e.id}`:"addon-backgrounds-grid";if(!d){B(f);return}Y(f,y)},[d,y,e]),r()},"withGrid"),I,te=(I=globalThis.FEATURES)!=null&&I.backgroundsStoryGlobals?[Z]:[re,ee],z,ne={[c]:{grid:{cellSize:20,opacity:.5,cellAmount:5},disable:!1,...!((z=globalThis.FEATURES)!=null&&z.backgroundsStoryGlobals)&&{values:Object.values(D)}}},ae={[c]:{value:void 0,grid:!1}},U,ie=(U=globalThis.FEATURES)!=null&&U.backgroundsStoryGlobals?ae:{[c]:null};export{te as decorators,ie as initialGlobals,ne as parameters};
