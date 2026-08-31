var M=Object.defineProperty;var p=(t,o)=>M(t,"name",{value:o,configurable:!0});import{o as C}from"./rolldown-runtime-CzYk_CEw.js";import{t as _}from"./react-HNhQAnN4.js";import{t as w}from"./emotion-styled.browser.esm-BD_8_ENF.js";import{t as L}from"./jsx-runtime-Br4tQxt1.js";import{a as O}from"./core-DtZ76Qs_.js";var P=w.div`
  position: relative;
  display: inline-flex;
  width: fit-content;
`,h=C(_()),f=L(),x={containerRectProperties:{top:-1,left:-1,height:-1,width:-1},isVisible:!1,setContainerRectProperties:p(()=>null,"setContainerRectProperties"),setIsVisible:p(()=>null,"setIsVisible")},g=(0,h.createContext)(x),S=p(({children:t})=>{const[o,r]=(0,h.useState)(x.containerRectProperties),[i,a]=(0,h.useState)(x.isVisible);return(0,f.jsx)(g.Provider,{value:{containerRectProperties:o,setContainerRectProperties:r,isVisible:i,setIsVisible:a},children:t})},"TooltipContextProvider"),m=p(()=>{const t=(0,h.useContext)(g);if(!t)throw new Error("Tooltip compound components cannot be rendered outside the Tooltip component");return t},"useTooltipContext"),R=p(({children:t,style:o,dataTestId:r,hideDelay:i=0})=>{const{setIsVisible:a,setContainerRectProperties:c}=m();let e;const n=p(s=>{clearTimeout(e);const{top:b,left:v,height:y,width:$}=s.currentTarget.getBoundingClientRect();c({top:b,left:v,height:y,width:$}),a(!0)},"showTooltip"),l=p(()=>{e=setTimeout(()=>{a(!1)},i)},"hideTooltip");return(0,f.jsx)(P,{"data-testid":r??"tooltip-container",onMouseEnter:n,onMouseLeave:l,style:o,children:t})},"TooltipContainer"),d={Top:"top",Bottom:"bottom",Right:"right",Left:"left"},T={Full:"full",Opacity:"opacity"},j=w.div`
  ${({theme:t,direction:o,top:r,left:i,background:a})=>`
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
    z-index: 13; 
    top: ${r}px;
    left: ${i}px;
    
    &:after {
      content: "";
      position: absolute;
      border: 0px solid transparent;
    }
    ${a===T.Opacity&&"opacity: 80%"};
    ${o===d.Bottom&&`
      transform: translateX(-50%);
        &:after {
          bottom: 100%;
          left: 50%;
          margin-left: -7px;
          border-width: 0px 7px 8px 7px;
          border-bottom-color: ${t.palette.secondary.dark};
        }
      `};
    ${o===d.Top&&`
        transform: translate(-50%, -100%);
        &:after {
          top: 100%;
          left: 50%;
          margin-left: -7px;
          border-width: 8px 7px 0px 7px;
          border-top-color: ${t.palette.secondary.dark};
        }
      `};
    ${o===d.Right&&`
        transform: translateY(-50%);
        &:after {
          top: 50%;
          right: 100%;
          margin-top: -7px;
          border-width: 7px 8px 7px 0px;
          border-right-color: ${t.palette.secondary.dark};
        }
      `};
    ${o===d.Left&&`
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
`,u=12,k={top:-1,left:-1},E=p((t,o)=>{const{containerRectProperties:{top:r,left:i,height:a,width:c}}=m();if(typeof window>"u")return k;const e=window.scrollX,n=window.scrollY;return{[d.Top]:(()=>{const l=r-u+n,s=i+c/2+e;return{top:Math.max(l,n+o.height),left:Math.min(e+window.innerWidth-o.width/2,Math.max(e+o.width/2,s))}})(),[d.Bottom]:(()=>{const l=r+a+u+n,s=i+c/2+e;return{top:Math.min(l,n+window.innerHeight-o.height),left:Math.min(e+window.innerWidth-o.width/2,Math.max(e+o.width/2,s))}})(),[d.Left]:(()=>{const l=r+a/2+n,s=i-u+e;return{top:Math.min(n+window.innerHeight-o.height/2,Math.max(n+o.height/2,l)),left:Math.max(s,e+o.width)}})(),[d.Right]:(()=>{const l=r+a/2+n,s=i+c+u+e;return{top:Math.min(n+window.innerHeight-o.height/2,Math.max(n+o.height/2,l)),left:Math.min(s,e+window.innerWidth-o.width)}})()}[t]},"useTooltipPosition"),V=p(()=>typeof DOMRect<"u"?new DOMRect(0,0,0,0):{x:0,y:0,width:0,height:0,top:0,left:0,right:0,bottom:0,toJSON(){return{x:0,y:0,width:0,height:0,top:0,left:0,right:0,bottom:0}}},"createSafeDOMRect"),B=p(({children:t,direction:o=d.Top,background:r=T.Full,style:i,dataTestId:a})=>{const{isVisible:c}=m(),e=(0,h.useRef)(null),[n,l]=(0,h.useState)(V());(0,h.useLayoutEffect)(()=>{e.current&&l(e.current.getBoundingClientRect())},[c,t]);const s=E(o,n);return t?(0,f.jsx)(O,{isOpen:c,children:(0,f.jsx)(j,{background:r,"data-testid":a??"tooltip-content",direction:o,left:s.left,ref:e,role:"tooltip",style:i,top:s.top,children:t})}):null},"TooltipContent"),D=p(({children:t,style:o,dataTestId:r,hideDelay:i})=>(0,f.jsx)(S,{children:(0,f.jsx)(R,{dataTestId:r,hideDelay:i,style:o,children:t})}),"Tooltip");D.Content=B;export{T as n,d as r,D as t};
