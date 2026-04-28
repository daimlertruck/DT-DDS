var w=Object.defineProperty;var o=(e,t)=>w(e,"name",{value:t,configurable:!0});import{j as n}from"./jsx-runtime-Cgz2XvFB.js";import{c as g,G as h}from"./emotion-react.browser.esm-BzOLYAw5.js";import{r}from"./index-CwbBKW39.js";import{I as m}from"./Icon-9dVURh2l.js";import{T as D}from"./Typography-Dk4smw7A.js";import{d as $,f as s}from"./emotion-styled.browser.esm-CIRWz9XU.js";import{I as b}from"./IconButton-D1lKSM55.js";import"./typography-B3nKKPHm.js";import"./index-BFEOtGlm.js";import"./index-DV-VXEUn.js";import{D as j}from"./z-index-C44GOntP.js";const v=o(({title:e,icon:t})=>{const a=$();return n.jsxs(D,{color:"content.dark",element:"h4",fontStyles:"h4Bold",style:{display:"flex",alignItems:"center",gap:a.spacing.spacing_10},children:[t&&n.jsx(m,{code:t}),e]})},"DrawerTitle"),C=s.header`
  ${({theme:e})=>`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-inline: ${e.spacing.spacing_70};
  `}
`,E={handleClose:o(()=>null,"handleClose")},u=r.createContext(E),k=o(({handleClose:e,children:t})=>n.jsx(u.Provider,{value:{handleClose:e},children:t}),"DrawerContextProvider"),T=o(()=>{const e=r.useContext(u);if(!e)throw new Error("Drawer compound components cannot be rendered outside the Drawer component");return e},"useDrawerContext"),S=o(({children:e})=>{const{handleClose:t}=T();return n.jsxs(C,{"data-testid":"drawer-header",children:[e,n.jsx(b,{color:"default",dataTestId:"drawer-close-button",onClick:t,children:n.jsx(m,{code:"close",size:"large"})})]})},"DrawerHeader"),I=s.section`
  ${({theme:e})=>`
    position: relative;
    overflow: auto;
    padding: ${e.spacing.spacing_70};
  `}
`,_=o(({children:e,style:t,dataTestId:a})=>n.jsx(I,{"data-testid":a??"drawer-body",style:t,children:e}),"DrawerBody"),z=g`
  body {
    overflow: hidden;
  }
`,B=s.div`
  position: fixed;
  inset: 0;
  z-index: ${j};
`,L=s.div`
  position: absolute;
  inset: 0;

  ${({theme:e,$isVisible:t})=>`
    background-color: ${e.palette.surface.dark};
    opacity: ${t?.2:0};
    transition: opacity ${e.animations.emphasizedDecelerate.duration}
      ${e.animations.emphasizedDecelerate.timingFunction};
  `}
`,A=s.div`
  display: grid;
  grid-template-rows: auto 1fr;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;

  ${({theme:e,$isVisible:t})=>`
    padding: ${e.spacing.spacing_70} 0;
    background-color: ${e.palette.surface.contrast};
    transform: ${t?"translateX(0)":"translateX(100%)"};
    transition: transform ${e.animations.emphasizedDecelerate.duration}
      ${e.animations.emphasizedDecelerate.timingFunction};

    @media only screen and (min-width: ${e.breakpoints.mq3}px) {
      width: 500px;
      border-left: 1px solid ${e.palette.border.default};
    }
  `}
`,l=o(({isVisible:e,setIsVisible:t,children:a,dataTestId:f})=>{const[i,c]=r.useState(!1),d=r.useCallback(()=>{c(!1)},[]),x=r.useCallback(()=>{i||t(!1)},[i,t]);return r.useEffect(()=>{const p=o(y=>{y.key==="Escape"&&d()},"handleKeyDown");return c(e),document.addEventListener("keydown",p),()=>{document.removeEventListener("keydown",p)}},[d,e]),n.jsx(k,{handleClose:d,children:n.jsxs(B,{children:[e?n.jsx(h,{styles:z}):null,n.jsx(L,{"data-testid":"drawer-overlay",$isVisible:i,onClick:d}),n.jsx(A,{"data-testid":f??"drawer-content-container",$isVisible:i,onTransitionEnd:x,children:a})]})})},"Drawer");l.Title=v;l.Header=S;l.Body=_;export{l as D};
