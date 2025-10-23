import{j as n}from"./jsx-runtime-CB_V9I5Y.js";import{c as f,G as w}from"./emotion-react.browser.esm-Bwsi5GpN.js";import{r as i}from"./index-CTjT7uj6.js";import{T as x}from"./Typography-DHEP7O00.js";import{I as $}from"./IconButton-C_mszqXk.js";import{C as y}from"./Close-BgpoXZkN.js";import{f as d,d as h}from"./emotion-styled.browser.esm-DBghOYGd.js";import"./index-D9dZuxfj.js";import"./index-sOM_UCrV.js";import"./index-XjDa9cP3.js";import{D as b}from"./z-index-CLLOsryR.js";const v=({title:e})=>n.jsx(x,{color:"content.dark",element:"h4",fontStyles:"h4",children:e}),D={handleClose:()=>null},m=i.createContext(D),j=({handleClose:e,children:t})=>n.jsx(m.Provider,{value:{handleClose:e},children:t}),C=()=>{const e=i.useContext(m);if(!e)throw new Error("Drawer compound components cannot be rendered outside the Drawer component");return e},S=d.header`
  ${({theme:e})=>`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 ${e.spacing.spacing_60} ${e.spacing.spacing_50};

    &:has(+.hasScroll) {
      box-shadow: ${e.shadows.elevation_100};
    }

    @media only screen and (min-width: ${e.breakpoints.mq2}px) {
      padding: 0 ${e.spacing.spacing_80} ${e.spacing.spacing_50};
    }
  `}
`,_=({children:e})=>{const{handleClose:t}=C();return n.jsxs(S,{"data-testid":"drawer-header",children:[n.jsx("div",{children:e}),n.jsx($,{color:"default",dataTestId:"drawer-close-button",onClick:t,children:n.jsx(y,{})})]})},E=d.section`
  ${({theme:e})=>`
    position: relative;
    overflow: auto;
    padding:  ${e.spacing.spacing_50} ${e.spacing.xs} 0;
    
    @media only screen and (min-width: ${e.breakpoints.mq32}px) {
      padding:  ${e.spacing.spacing_50} ${e.spacing.s} 0;
    }
  `}
`,k=d.div`
  position: absolute;
  margin-top: ${({theme:e})=>e.spacing.spacing_30};
`,T=({children:e,style:t,dataTestId:l})=>{const a=i.useRef(null),c=o=>{var r;const s=(r=a.current)==null?void 0:r.parentElement;s&&(o?s.classList.add("hasScroll"):s.classList.remove("hasScroll"))};return i.useEffect(()=>{if(a.current){const o=new IntersectionObserver(([{isIntersecting:s}])=>c(!s));return o.observe(a.current),()=>o.disconnect()}},[a]),n.jsxs(E,{"data-testid":l??"drawer-body",style:t,children:[e,n.jsx(k,{ref:a})]})},z=f`
  body {
    overflow: hidden;
  }
`,I=d.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${b};
`,F=d.div`
  ${({theme:e,isVisible:t})=>`
    width: 100%;
    height: 100vh;
    position: absolute;
    background-color: ${e.palette.surface.dark};
    opacity: ${t?.2:0};
    transition: opacity ${e.animations.emphasizedDecelerate.duration}
      ${e.animations.emphasizedDecelerate.timingFunction};
  `}
`,L=d.div`
  ${({theme:e,isVisible:t})=>`
    display: grid;
    grid-template-rows: auto 1fr;
    padding: ${e.spacing.xs} 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background-color: ${e.palette.surface.contrast};
    transform: ${t?"translateX(0)":"translateX(100%)"};
    transition: transform ${e.animations.emphasizedDecelerate.duration}
      ${e.animations.emphasizedDecelerate.timingFunction};

    @media only screen and (min-width: ${e.breakpoints.mq2}px) {
      width: 500px;
      border-radius: ${e.radius.radius_40} ${e.radius.radius_0}
        ${e.radius.radius_0} ${e.radius.radius_40};
      box-shadow: ${e.shadows.elevation_200};
      padding: ${e.spacing.s} 0;
    }
  `}
`,R=e=>parseFloat(e.replace(/[^\d.]/g,""))*1e3,p=({isVisible:e,setIsVisible:t,children:l,dataTestId:a})=>{const[c,o]=i.useState(!1),s=h(),r=i.useCallback(()=>{o(!1),setTimeout(()=>{t(!1)},R(s.animations.emphasizedDecelerate.timingFunction))},[t,s.animations.emphasizedDecelerate.timingFunction]);return i.useEffect(()=>{const u=g=>{g.key==="Escape"&&r()};return o(e),document.addEventListener("keydown",u),()=>{document.removeEventListener("keydown",u)}},[r,e]),n.jsx(j,{handleClose:r,children:n.jsxs(I,{children:[e?n.jsx(w,{styles:z}):null,n.jsx(F,{"data-testid":"drawer-overlay",isVisible:c,onClick:r}),n.jsx(L,{"data-testid":a??"drawer-content-container",isVisible:c,children:l})]})})};p.Title=v;p.Header=_;p.Body=T;export{p as D};
