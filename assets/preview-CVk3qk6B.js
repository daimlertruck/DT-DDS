var Y=Object.defineProperty;var l=(a,e)=>Y(a,"name",{value:e,configurable:!0});import{t as H}from"./esm-T7l6LXGN.js";var{useEffect:h,useMemo:E}=__STORYBOOK_MODULE_PREVIEW_API__,{global:K}=__STORYBOOK_MODULE_GLOBAL__,{logger:P}=__STORYBOOK_MODULE_CLIENT_LOGGER__,p="backgrounds",C={light:{name:"light",value:"#F8F8F8"},dark:{name:"dark",value:"#333"}},{document:$,window:j}=K,I=l(()=>!!j?.matchMedia("(prefers-reduced-motion: reduce)")?.matches,"isReduceMotionEnabled"),_=l(a=>{(Array.isArray(a)?a:[a]).forEach(X)},"clearStyles"),X=l(a=>{let e=$.getElementById(a);e&&e.parentElement?.removeChild(e)},"clearStyle"),U=l((a,e)=>{let t=$.getElementById(a);if(t)t.innerHTML!==e&&(t.innerHTML=e);else{let d=$.createElement("style");d.setAttribute("id",a),d.innerHTML=e,$.head.appendChild(d)}},"addGridStyle"),z=l((a,e,t)=>{let d=$.getElementById(a);if(d)d.innerHTML!==e&&(d.innerHTML=e);else{let r=$.createElement("style");r.setAttribute("id",a),r.innerHTML=e;let o=`addon-backgrounds-grid${t?`-docs-${t}`:""}`,n=$.getElementById(o);n?n.parentElement?.insertBefore(r,n):$.head.appendChild(r)}},"addBackgroundStyle"),N={cellSize:100,cellAmount:10,opacity:.8},G="addon-backgrounds",R="addon-backgrounds-grid",W=I()?"":"transition: background-color 0.3s;",q=l((a,e)=>{let{globals:t,parameters:d,viewMode:r,id:o}=e,{options:n=C,disable:i,grid:s=N}=d[p]||{},c=t[p]||{},u=c.value,b=u?n[u]:void 0,m=b?.value||"transparent",f=c.grid||!1,v=!!b&&!i,M=r==="docs"?`#anchor--${o} .docs-story`:".sb-show-main",O=r==="docs"?`#anchor--${o} .docs-story`:".sb-show-main",D=d.layout===void 0||d.layout==="padded",w=r==="docs"?20:D?16:0,{cellAmount:y,cellSize:g,opacity:k,offsetX:x=w,offsetY:S=w}=s,A=r==="docs"?`${G}-docs-${o}`:`${G}-color`,L=r==="docs"?o:null;h(()=>{let T=`
    ${M} {
      background: ${m} !important;
      ${W}
      }`;if(!v){_(A);return}z(A,T,L)},[M,A,L,v,m]);let B=r==="docs"?`${R}-docs-${o}`:`${R}`;return h(()=>{if(!f){_(B);return}let T=[`${g*y}px ${g*y}px`,`${g*y}px ${g*y}px`,`${g}px ${g}px`,`${g}px ${g}px`].join(", "),F=`
        ${O} {
          background-size: ${T} !important;
          background-position: ${x}px ${S}px, ${x}px ${S}px, ${x}px ${S}px, ${x}px ${S}px !important;
          background-blend-mode: difference !important;
          background-image: linear-gradient(rgba(130, 130, 130, ${k}) 1px, transparent 1px),
           linear-gradient(90deg, rgba(130, 130, 130, ${k}) 1px, transparent 1px),
           linear-gradient(rgba(130, 130, 130, ${k/2}) 1px, transparent 1px),
           linear-gradient(90deg, rgba(130, 130, 130, ${k/2}) 1px, transparent 1px) !important;
        }
      `;U(B,F)},[y,g,O,B,f,x,S,k]),a()},"withBackgroundAndGrid"),J=l((a,e=[],t)=>{if(a==="transparent")return"transparent";if(e.find(r=>r.value===a)||a)return a;let d=e.find(r=>r.name===t);if(d)return d.value;if(t){let r=e.map(o=>o.name).join(", ");P.warn(H`
        Backgrounds Addon: could not find the default color "${t}".
        These are the available colors for your story based on your configuration:
        ${r}.
      `)}return"transparent"},"getBackgroundColorByName"),Q=l((a,e)=>{let{globals:t,parameters:d}=e,r=t[p]?.value,o=d[p],n=E(()=>o.disable?"transparent":J(r,o.values,o.default),[o,r]),i=E(()=>n&&n!=="transparent",[n]),s=e.viewMode==="docs"?`#anchor--${e.id} .docs-story`:".sb-show-main",c=E(()=>`
      ${s} {
        background: ${n} !important;
        ${I()?"":"transition: background-color 0.3s;"}
      }
    `,[n,s]);return h(()=>{let u=e.viewMode==="docs"?`addon-backgrounds-docs-${e.id}`:"addon-backgrounds-color";if(!i){_(u);return}z(u,c,e.viewMode==="docs"?e.id:null)},[i,c,e]),a()},"withBackground"),Z=l((a,e)=>{let{globals:t,parameters:d}=e,r=d[p].grid,o=t[p]?.grid===!0&&r.disable!==!0,{cellAmount:n,cellSize:i,opacity:s}=r,c=e.viewMode==="docs",u=d.layout===void 0||d.layout==="padded"?16:0,b=r.offsetX??(c?20:u),m=r.offsetY??(c?20:u),f=E(()=>`
      ${e.viewMode==="docs"?`#anchor--${e.id} .docs-story`:".sb-show-main"} {
        background-size: ${[`${i*n}px ${i*n}px`,`${i*n}px ${i*n}px`,`${i}px ${i}px`,`${i}px ${i}px`].join(", ")} !important;
        background-position: ${b}px ${m}px, ${b}px ${m}px, ${b}px ${m}px, ${b}px ${m}px !important;
        background-blend-mode: difference !important;
        background-image: linear-gradient(rgba(130, 130, 130, ${s}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${s}) 1px, transparent 1px),
         linear-gradient(rgba(130, 130, 130, ${s/2}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${s/2}) 1px, transparent 1px) !important;
      }
    `,[i]);return h(()=>{let v=e.viewMode==="docs"?`addon-backgrounds-grid-docs-${e.id}`:"addon-backgrounds-grid";if(!o){_(v);return}U(v,f)},[o,f,e]),a()},"withGrid"),ae=globalThis.FEATURES?.backgroundsStoryGlobals?[q]:[Z,Q],de={[p]:{grid:{cellSize:20,opacity:.5,cellAmount:5},disable:!1,...!globalThis.FEATURES?.backgroundsStoryGlobals&&{values:Object.values(C)}}},V={[p]:{value:void 0,grid:!1}},oe=globalThis.FEATURES?.backgroundsStoryGlobals?V:{[p]:null};export{ae as decorators,oe as initialGlobals,de as parameters};
