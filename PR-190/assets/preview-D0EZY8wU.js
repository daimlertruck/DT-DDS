var s=Object.defineProperty;var _=(e,t)=>s(e,"name",{value:t,configurable:!0});const{STORY_CHANGED:O}=__STORYBOOK_MODULE_CORE_EVENTS__,{addons:g}=__STORYBOOK_MODULE_PREVIEW_API__,{global:E}=__STORYBOOK_MODULE_GLOBAL__;var i="storybook/highlight",a="storybookHighlight",H=`${i}/add`,T=`${i}/reset`,{document:h}=E,I=_((e="#FF4785",t="dashed")=>`
  outline: 2px ${t} ${e};
  outline-offset: 2px;
  box-shadow: 0 0 0 6px rgba(255,255,255,0.6);
`,"highlightStyle"),n=g.getChannel(),L=_(e=>{let t=a;d();let o=Array.from(new Set(e.elements)),l=h.createElement("style");l.setAttribute("id",t),l.innerHTML=o.map(r=>`${r}{
          ${I(e.color,e.style)}
         }`).join(" "),h.head.appendChild(l)},"highlight"),d=_(()=>{var o;let e=a,t=h.getElementById(e);t&&((o=t.parentNode)==null||o.removeChild(t))},"resetHighlight");n.on(O,d);n.on(T,d);n.on(H,L);
