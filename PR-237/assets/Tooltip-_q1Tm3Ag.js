var C=Object.defineProperty;var p=(t,o)=>C(t,"name",{value:o,configurable:!0});import{j as f}from"./jsx-runtime-Cgz2XvFB.js";import{f as g}from"./emotion-styled.browser.esm-DNXn-wKZ.js";import{r as h}from"./index-CwbBKW39.js";import"./typography-B3nKKPHm.js";import"./index-CNS4vkO1.js";import{a as P,P as L}from"./z-index-BPuITISp.js";import"./index-DLLwJ4dj.js";const v=g.div`
  position: relative;
  display: inline-flex;
  width: fit-content;
`,m={containerRectProperties:{top:-1,left:-1,height:-1,width:-1},isVisible:!1,setContainerRectProperties:p(()=>null,"setContainerRectProperties"),setIsVisible:p(()=>null,"setIsVisible")},T=h.createContext(m),R=p(({children:t})=>{const[o,i]=h.useState(m.containerRectProperties),[r,s]=h.useState(m.isVisible);return f.jsx(T.Provider,{value:{containerRectProperties:o,setContainerRectProperties:i,isVisible:r,setIsVisible:s},children:t})},"TooltipContextProvider"),w=p(()=>{const t=h.useContext(T);if(!t)throw new Error("Tooltip compound components cannot be rendered outside the Tooltip component");return t},"useTooltipContext"),S=p(({children:t,style:o,dataTestId:i,hideDelay:r=0})=>{const{setIsVisible:s,setContainerRectProperties:d}=w();let e;const n=window.matchMedia("(hover: hover) and (pointer: fine)").matches,u=p(l=>{if(!n)return;clearTimeout(e);const{top:y,left:$,height:M,width:O}=l.currentTarget.getBoundingClientRect();d({top:y,left:$,height:M,width:O}),s(!0)},"showTooltip"),a=p(()=>{n&&(e=setTimeout(()=>{s(!1)},r))},"hideTooltip");return f.jsx(v,{"data-testid":i??"tooltip-container",onMouseEnter:u,onMouseLeave:a,style:o,children:t})},"TooltipContainer"),c={Top:"top",Bottom:"bottom",Right:"right",Left:"left"},b={Full:"full",Opacity:"opacity"},E=g.div`
  ${({theme:t,direction:o,top:i,left:r,background:s})=>`
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
    z-index: ${P}; 
    top: ${i}px;
    left: ${r}px;
    
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
`,D=4,j=8,x=D+j,k={top:-1,left:-1},F=p((t,o)=>{const{containerRectProperties:{top:i,left:r,height:s,width:d}}=w();if(typeof window>"u")return k;const e=window.scrollX,n=window.scrollY;return{[c.Top]:(()=>{const a=i-x+n,l=r+d/2+e;return{top:Math.max(a,n+o.height),left:Math.min(e+window.innerWidth-o.width/2,Math.max(e+o.width/2,l))}})(),[c.Bottom]:(()=>{const a=i+s+x+n,l=r+d/2+e;return{top:Math.min(a,n+window.innerHeight-o.height),left:Math.min(e+window.innerWidth-o.width/2,Math.max(e+o.width/2,l))}})(),[c.Left]:(()=>{const a=i+s/2+n,l=r-x+e;return{top:Math.min(n+window.innerHeight-o.height/2,Math.max(n+o.height/2,a)),left:Math.max(l,e+o.width)}})(),[c.Right]:(()=>{const a=i+s/2+n,l=r+d+x+e;return{top:Math.min(n+window.innerHeight-o.height/2,Math.max(n+o.height/2,a)),left:Math.min(l,e+window.innerWidth-o.width)}})()}[t]},"useTooltipPosition"),I=p(()=>typeof DOMRect<"u"?new DOMRect(0,0,0,0):{x:0,y:0,width:0,height:0,top:0,left:0,right:0,bottom:0,toJSON(){return{x:0,y:0,width:0,height:0,top:0,left:0,right:0,bottom:0}}},"createSafeDOMRect"),V=p(({children:t,direction:o=c.Top,background:i=b.Full,style:r,dataTestId:s})=>{const{isVisible:d}=w(),e=h.useRef(null),[n,u]=h.useState(I());h.useLayoutEffect(()=>{e.current&&u(e.current.getBoundingClientRect())},[d,t]);const a=F(o,n);return t?f.jsx(L,{isOpen:d,children:f.jsx(E,{background:i,"data-testid":s??"tooltip-content",direction:o,left:a.left,ref:e,role:"tooltip",style:r,top:a.top,children:t})}):null},"TooltipContent"),_=p(({children:t,style:o,dataTestId:i,hideDelay:r})=>f.jsx(R,{children:f.jsx(S,{dataTestId:i,hideDelay:r,style:o,children:t})}),"Tooltip");_.Content=V;export{b as O,_ as T,c as a};
