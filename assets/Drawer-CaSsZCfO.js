import{j as n}from"./jsx-runtime-DMAvRu52.js";import{c as f,G as w}from"./emotion-react.browser.esm-DLeKyOu_.js";import{r as i}from"./index-Dl6G-zuu.js";import{T as g}from"./Typography-DII2gFDQ.js";import{I as $}from"./IconButton-8pEMAeo8.js";import{C as y}from"./Close-mVzWqPf0.js";import{n as d,d as h}from"./emotion-styled.browser.esm-Dv69Fly8.js";import"./index-CL4Xg4Pf.js";import"./index-BSh7GFw5.js";import"./index-DCrStp1_.js";import{D as b}from"./z-index-Ds5QkyqS.js";const v=({title:e})=>n.jsx(g,{color:"content.dark",element:"h4",fontStyles:"h4",children:e}),D={handleClose:()=>null},x=i.createContext(D),S=({handleClose:e,children:s})=>n.jsx(x.Provider,{value:{handleClose:e},children:s}),j=()=>{const e=i.useContext(x);if(!e)throw new Error("Drawer compound components cannot be rendered outside the Drawer component");return e},C=d.header`
  ${({theme:e})=>`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 ${e.spacing.xs} ${e.spacing["2xs"]};

    &:has(+.hasScroll) {
      box-shadow: ${e.shadows.xs};
    }

    @media only screen and (min-width: ${e.breakpoints.s}px) {
      padding: 0 ${e.spacing.s} ${e.spacing["2xs"]};
    }
  `}
`,E=({children:e})=>{const{handleClose:s}=j();return n.jsxs(C,{"data-testid":"drawer-header",children:[n.jsx("div",{children:e}),n.jsx($,{color:"default",dataTestId:"drawer-close-button",onClick:s,children:n.jsx(y,{})})]})},k=d.section`
  ${({theme:e})=>`
    position: relative;
    overflow: auto;
    padding:  ${e.spacing["2xs"]} ${e.spacing.xs} 0;
    
    @media only screen and (min-width: ${e.breakpoints.s}px) {
      padding:  ${e.spacing["2xs"]} ${e.spacing.s} 0;
    }
  `}
`,T=d.div`
  position: absolute;
  margin-top: ${({theme:e})=>e.spacing["4xs"]};
`,z=({children:e,style:s,dataTestId:l})=>{const o=i.useRef(null),c=r=>{var a;const t=(a=o.current)==null?void 0:a.parentElement;t&&(r?t.classList.add("hasScroll"):t.classList.remove("hasScroll"))};return i.useEffect(()=>{if(o.current){const r=new IntersectionObserver(([{isIntersecting:t}])=>c(!t));return r.observe(o.current),()=>r.disconnect()}},[o]),n.jsxs(k,{"data-testid":l??"drawer-body",style:s,children:[e,n.jsx(T,{ref:o})]})},I=f`
  body {
    overflow: hidden;
  }
`,F=d.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${b};
`,L=d.div`
  ${({theme:e,isVisible:s})=>`
    width: 100%;
    height: 100vh;
    position: absolute;
    background-color: ${e.palette.surface.dark};
    opacity: ${s?.2:0};
    transition: opacity ${e.animations.emphasizedDecelerate.duration}
      ${e.animations.emphasizedDecelerate.timingFunction};
  `}
`,R=d.div`
  ${({theme:e,isVisible:s})=>`
    display: grid;
    grid-template-rows: auto 1fr;
    padding: ${e.spacing.xs} 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background-color: ${e.palette.surface.contrast};
    transform: ${s?"translateX(0)":"translateX(100%)"};
    transition: transform ${e.animations.emphasizedDecelerate.duration}
      ${e.animations.emphasizedDecelerate.timingFunction};

    @media only screen and (min-width: ${e.breakpoints.s}px) {
      width: 500px;
      border-radius: ${e.radius["3xs"]} ${e.radius.none}
        ${e.radius.none} ${e.radius["3xs"]};
      box-shadow: ${e.shadows.s};
      padding: ${e.spacing.s} 0;
    }
  `}
`,O=e=>parseFloat(e.replace(/[^\d.]/g,""))*1e3,p=({isVisible:e,setIsVisible:s,children:l,dataTestId:o})=>{const[c,r]=i.useState(!1),t=h(),a=i.useCallback(()=>{r(!1),setTimeout(()=>{s(!1)},O(t.animations.emphasizedDecelerate.timingFunction))},[s,t.animations.emphasizedDecelerate.timingFunction]);return i.useEffect(()=>{const u=m=>{m.key==="Escape"&&a()};return r(e),document.addEventListener("keydown",u),()=>{document.removeEventListener("keydown",u)}},[a,e]),n.jsx(S,{handleClose:a,children:n.jsxs(F,{children:[e?n.jsx(w,{styles:I}):null,n.jsx(L,{"data-testid":"drawer-overlay",isVisible:c,onClick:a}),n.jsx(R,{"data-testid":o??"drawer-content-container",isVisible:c,children:l})]})})};p.Title=v;p.Header=E;p.Body=z;export{p as D};
