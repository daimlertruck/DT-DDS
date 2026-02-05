var O=Object.defineProperty;var p=(t,o)=>O(t,"name",{value:o,configurable:!0});import{j as f}from"./jsx-runtime-Cgz2XvFB.js";import{f as g}from"./emotion-styled.browser.esm-CIRWz9XU.js";import{r as h}from"./index-CwbBKW39.js";import"./typography-B3nKKPHm.js";import"./index-CMWlP-ed.js";import{a as C,P}from"./z-index-C44GOntP.js";import"./index-DV-VXEUn.js";const L=g.div`
  position: relative;
  display: inline-flex;
  width: fit-content;
`,m={containerRectProperties:{top:-1,left:-1,height:-1,width:-1},isVisible:!1,setContainerRectProperties:p(()=>null,"setContainerRectProperties"),setIsVisible:p(()=>null,"setIsVisible")},T=h.createContext(m),R=p(({children:t})=>{const[o,n]=h.useState(m.containerRectProperties),[i,s]=h.useState(m.isVisible);return f.jsx(T.Provider,{value:{containerRectProperties:o,setContainerRectProperties:n,isVisible:i,setIsVisible:s},children:t})},"TooltipContextProvider"),w=p(()=>{const t=h.useContext(T);if(!t)throw new Error("Tooltip compound components cannot be rendered outside the Tooltip component");return t},"useTooltipContext"),S=p(({children:t,style:o,dataTestId:n,hideDelay:i=0})=>{const{setIsVisible:s,setContainerRectProperties:d}=w();let e;const r=p(a=>{clearTimeout(e);const{top:l,left:y,height:$,width:M}=a.currentTarget.getBoundingClientRect();d({top:l,left:y,height:$,width:M}),s(!0)},"showTooltip"),u=p(()=>{e=setTimeout(()=>{s(!1)},i)},"hideTooltip");return f.jsx(L,{"data-testid":n??"tooltip-container",onMouseEnter:r,onMouseLeave:u,style:o,children:t})},"TooltipContainer"),c={Top:"top",Bottom:"bottom",Right:"right",Left:"left"},b={Full:"full",Opacity:"opacity"},E=g.div`
  ${({theme:t,direction:o,top:n,left:i,background:s})=>`
    ${t.fontStyles.bodySmRegular};
    width: max-content;
    max-width: calc(200px + 2 * ${t.spacing.spacing_30});
    overflow-wrap: break-word;
    padding: ${t.spacing.spacing_30};
    background-color: ${t.palette.secondary.dark};
    box-shadow: ${t.shadows.elevation_200};
    color: ${t.palette.content.contrast};
    border-radius: ${t.shape.tooltip};
    text-align: left;
    white-space: initial;
    position: absolute;
    z-index: ${C}; 
    top: ${n}px;
    left: ${i}px;
    
    &:after {
      content: "";
      position: absolute;
      border: 0px solid transparent;
    }
    ${s===b.Opacity&&"opacity: 80%"};
    ${o===c.Bottom&&`
      transform: translateX(-50%);
        &:after {
          bottom: 100%;
          left: 50%;
          margin-left: -7px;
          border-width: 0px 7px 8px 7px;
          border-bottom-color: ${t.palette.secondary.dark};
        }
      `};
    ${o===c.Top&&`
        transform: translate(-50%, -100%);
        &:after {
          top: 100%;
          left: 50%;
          margin-left: -7px;
          border-width: 8px 7px 0px 7px;
          border-top-color: ${t.palette.secondary.dark};
        }
      `};
    ${o===c.Right&&`
        transform: translateY(-50%);
        &:after {
          top: 50%;
          right: 100%;
          margin-top: -7px;
          border-width: 7px 8px 7px 0px;
          border-right-color: ${t.palette.secondary.dark};
        }
      `};
    ${o===c.Left&&`
        transform: translate(-100%, -50%);
        
        &:after {
          top: 50%;
          left: 100%;
          margin-top: -7px;
          border-width: 7px 0px 7px 8px;
          border-left-color: ${t.palette.secondary.dark};
        }
      `}
  `}
`,v=4,D=8,x=v+D,j={top:-1,left:-1},k=p((t,o)=>{const{containerRectProperties:{top:n,left:i,height:s,width:d}}=w();if(typeof window>"u")return j;const e=window.scrollX,r=window.scrollY;return{[c.Top]:(()=>{const a=n-x+r,l=i+d/2+e;return{top:Math.max(a,r+o.height),left:Math.min(e+window.innerWidth-o.width/2,Math.max(e+o.width/2,l))}})(),[c.Bottom]:(()=>{const a=n+s+x+r,l=i+d/2+e;return{top:Math.min(a,r+window.innerHeight-o.height),left:Math.min(e+window.innerWidth-o.width/2,Math.max(e+o.width/2,l))}})(),[c.Left]:(()=>{const a=n+s/2+r,l=i-x+e;return{top:Math.min(r+window.innerHeight-o.height/2,Math.max(r+o.height/2,a)),left:Math.max(l,e+o.width)}})(),[c.Right]:(()=>{const a=n+s/2+r,l=i+d+x+e;return{top:Math.min(r+window.innerHeight-o.height/2,Math.max(r+o.height/2,a)),left:Math.min(l,e+window.innerWidth-o.width)}})()}[t]},"useTooltipPosition"),F=p(()=>typeof DOMRect<"u"?new DOMRect(0,0,0,0):{x:0,y:0,width:0,height:0,top:0,left:0,right:0,bottom:0,toJSON(){return{x:0,y:0,width:0,height:0,top:0,left:0,right:0,bottom:0}}},"createSafeDOMRect"),I=p(({children:t,direction:o=c.Top,background:n=b.Full,style:i,dataTestId:s})=>{const{isVisible:d}=w(),e=h.useRef(null),[r,u]=h.useState(F());h.useLayoutEffect(()=>{e.current&&u(e.current.getBoundingClientRect())},[d,t]);const a=k(o,r);return t?f.jsx(P,{isOpen:d,children:f.jsx(E,{background:n,"data-testid":s??"tooltip-content",direction:o,left:a.left,ref:e,role:"tooltip",style:i,top:a.top,children:t})}):null},"TooltipContent"),V=p(({children:t,style:o,dataTestId:n,hideDelay:i})=>f.jsx(R,{children:f.jsx(S,{dataTestId:n,hideDelay:i,style:o,children:t})}),"Tooltip");V.Content=I;export{c as O,V as T,b as a};
