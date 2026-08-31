var O=Object.defineProperty;var _=(e,t)=>O(e,"name",{value:t,configurable:!0});var{STORY_CHANGED:g}=__STORYBOOK_MODULE_CORE_EVENTS__,{addons:E}=__STORYBOOK_MODULE_PREVIEW_API__,{global:s}=__STORYBOOK_MODULE_GLOBAL__,r="storybook/highlight",n="storybookHighlight",H=`${r}/add`,T=`${r}/reset`,{document:o}=s,I=_((e="#FF4785",t="dashed")=>`
  outline: 2px ${t} ${e};
  outline-offset: 2px;
  box-shadow: 0 0 0 6px rgba(255,255,255,0.6);
`,"highlightStyle"),a=E.getChannel(),v=_(e=>{let t=n;h();let d=Array.from(new Set(e.elements)),l=o.createElement("style");l.setAttribute("id",t),l.innerHTML=d.map(i=>`${i}{
          ${I(e.color,e.style)}
         }`).join(" "),o.head.appendChild(l)},"highlight"),h=_(()=>{let e=n,t=o.getElementById(e);t&&t.parentNode?.removeChild(t)},"resetHighlight");a.on(g,h);a.on(T,h);a.on(H,v);
