import{j as h}from"./jsx-runtime-DMAvRu52.js";import{r as d}from"./index-Dl6G-zuu.js";import{n as w}from"./emotion-styled.browser.esm-Dv69Fly8.js";import"./index-CL4Xg4Pf.js";import"./index-BSh7GFw5.js";import{P as M}from"./Portal-DcNaNmD6.js";import"./index-DCrStp1_.js";import{T as O}from"./z-index-Ds5QkyqS.js";const x={containerRectProperties:{top:-1,left:-1,height:-1,width:-1},isVisible:!1,setContainerRectProperties:()=>null,setIsVisible:()=>null},T=d.createContext(x),C=({children:t})=>{const[o,n]=d.useState(x.containerRectProperties),[i,s]=d.useState(x.isVisible);return h.jsx(T.Provider,{value:{containerRectProperties:o,setContainerRectProperties:n,isVisible:i,setIsVisible:s},children:t})},m=()=>{const t=d.useContext(T);if(!t)throw new Error("Tooltip compound components cannot be rendered outside the Tooltip component");return t},P=w.div`
  position: relative;
  display: inline-flex;
  width: fit-content;
`,L=({children:t,style:o,dataTestId:n,hideDelay:i=0})=>{const{setIsVisible:s,setContainerRectProperties:c}=m();let e;const r=a=>{clearTimeout(e);const{top:p,left:b,height:y,width:$}=a.currentTarget.getBoundingClientRect();c({top:p,left:b,height:y,width:$}),s(!0)},f=()=>{e=setTimeout(()=>{s(!1)},i)};return h.jsx(P,{"data-testid":n??"tooltip-container",onMouseEnter:r,onMouseLeave:f,style:o,children:t})},l={Top:"top",Bottom:"bottom",Right:"right",Left:"left"},g={Full:"full",Opacity:"opacity"},S=4,E=8,u=S+E,R={top:-1,left:-1},D=(t,o)=>{const{containerRectProperties:{top:n,left:i,height:s,width:c}}=m();if(typeof window>"u")return R;const e=window.scrollX,r=window.scrollY;return{[l.Top]:(()=>{const a=n-u+r,p=i+c/2+e;return{top:Math.max(a,r+o.height),left:Math.min(e+window.innerWidth-o.width/2,Math.max(e+o.width/2,p))}})(),[l.Bottom]:(()=>{const a=n+s+u+r,p=i+c/2+e;return{top:Math.min(a,r+window.innerHeight-o.height),left:Math.min(e+window.innerWidth-o.width/2,Math.max(e+o.width/2,p))}})(),[l.Left]:(()=>{const a=n+s/2+r,p=i-u+e;return{top:Math.min(r+window.innerHeight-o.height/2,Math.max(r+o.height/2,a)),left:Math.max(p,e+o.width)}})(),[l.Right]:(()=>{const a=n+s/2+r,p=i+c+u+e;return{top:Math.min(r+window.innerHeight-o.height/2,Math.max(r+o.height/2,a)),left:Math.min(p,e+window.innerWidth-o.width)}})()}[t]},j=w.div`
  ${({theme:t,direction:o,top:n,left:i,background:s})=>`
    ${t.fontStyles.body3};
    width: max-content;
    max-width: calc(200px + 2 * ${t.spacing["4xs"]});
    overflow-wrap: break-word;
    padding: ${t.spacing["4xs"]};
    background-color: ${t.palette.secondary.dark};
    box-shadow: ${t.shadows.s};
    color: ${t.palette.content.contrast};
    border-radius: ${t.shape.tooltip};
    text-align: left;
    white-space: initial;
    position: absolute;
    z-index: ${O}; 
    top: ${n}px;
    left: ${i}px;
    
    &:after {
      content: "";
      position: absolute;
      border: 0px solid transparent;
    }
    ${s===g.Opacity&&"opacity: 80%"};
    ${o===l.Bottom&&`
      transform: translateX(-50%);
        &:after {
          bottom: 100%;
          left: 50%;
          margin-left: -7px;
          border-width: 0px 7px 8px 7px;
          border-bottom-color: ${t.palette.secondary.dark};
        }
      `};
    ${o===l.Top&&`
        transform: translate(-50%, -100%);
        &:after {
          top: 100%;
          left: 50%;
          margin-left: -7px;
          border-width: 8px 7px 0px 7px;
          border-top-color: ${t.palette.secondary.dark};
        }
      `};
    ${o===l.Right&&`
        transform: translateY(-50%);
        &:after {
          top: 50%;
          right: 100%;
          margin-top: -7px;
          border-width: 7px 8px 7px 0px;
          border-right-color: ${t.palette.secondary.dark};
        }
      `};
    ${o===l.Left&&`
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
`,k=()=>typeof DOMRect<"u"?new DOMRect(0,0,0,0):{x:0,y:0,width:0,height:0,top:0,left:0,right:0,bottom:0,toJSON(){return{x:0,y:0,width:0,height:0,top:0,left:0,right:0,bottom:0}}},v=({children:t,direction:o=l.Top,background:n=g.Full,style:i,dataTestId:s})=>{const{isVisible:c}=m(),e=d.useRef(null),[r,f]=d.useState(k());d.useLayoutEffect(()=>{e.current&&f(e.current.getBoundingClientRect())},[c,t]);const a=D(o,r);return t?h.jsx(M,{isOpen:c,children:h.jsx(j,{background:n,"data-testid":s??"tooltip-content",direction:o,left:a.left,ref:e,role:"tooltip",style:i,top:a.top,children:t})}):null},F=({children:t,style:o,dataTestId:n,hideDelay:i})=>h.jsx(C,{children:h.jsx(L,{dataTestId:n,hideDelay:i,style:o,children:t})});F.Content=v;export{l as O,F as T,g as a};
