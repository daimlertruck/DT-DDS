var w=Object.defineProperty;var a=(e,n)=>w(e,"name",{value:n,configurable:!0});import{j as t}from"./jsx-runtime-Cgz2XvFB.js";import{r}from"./index-CwbBKW39.js";import{c as $,G as y}from"./emotion-react.browser.esm-BzOLYAw5.js";import{I as g}from"./Icon-9dVURh2l.js";import{T as b}from"./Typography-Dk4smw7A.js";import{d as D,f as s}from"./emotion-styled.browser.esm-CIRWz9XU.js";import{I as k}from"./IconButton-D1lKSM55.js";import"./typography-B3nKKPHm.js";import"./index-CkQdkxr_.js";import"./index-DV-VXEUn.js";import{D as h}from"./z-index-C44GOntP.js";const j=a(({title:e,icon:n})=>{const o=D();return t.jsxs(b,{color:"content.dark",element:"h4",fontStyles:"h4Bold",style:{display:"flex",alignItems:"center",gap:o.spacing.spacing_20},children:[n&&t.jsx(g,{code:n}),e]})},"DrawerTitle"),_=s.header`
  ${({theme:e})=>`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 ${e.spacing.spacing_60} ${e.spacing.spacing_50};

    @media only screen and (min-width: ${e.breakpoints.mq3}px) {
      padding: 0 ${e.spacing.spacing_70} ${e.spacing.spacing_50};
    }
  `}
`,v={handleClose:a(()=>null,"handleClose")},u=r.createContext(v),C=a(({handleClose:e,children:n})=>t.jsx(u.Provider,{value:{handleClose:e},children:n}),"DrawerContextProvider"),E=a(()=>{const e=r.useContext(u);if(!e)throw new Error("Drawer compound components cannot be rendered outside the Drawer component");return e},"useDrawerContext"),T=a(({children:e})=>{const{handleClose:n}=E();return t.jsxs(_,{"data-testid":"drawer-header",children:[e,t.jsx(k,{color:"default",dataTestId:"drawer-close-button",onClick:n,children:t.jsx(g,{code:"close",size:"large"})})]})},"DrawerHeader"),S=s.section`
  ${({theme:e})=>`
    position: relative;
    overflow: auto;
    padding: ${e.spacing.spacing_50} ${e.spacing.spacing_60} ${e.spacing.spacing_60};
    background:
      linear-gradient(white 30%, rgba(255, 255, 255, 0)) center top,
      linear-gradient(rgba(255, 255, 255, 0), white 70%) center bottom,
      linear-gradient(${e.palette.border.default}, ${e.palette.border.default}) center top;
    background-size:
      100% 40px,
      100% 40px,
      100% 1px;
    background-repeat: no-repeat;
    background-attachment: local, local, scroll;

    @media only screen and (min-width: ${e.breakpoints.mq3}px) {
      padding: ${e.spacing.spacing_50} ${e.spacing.spacing_70} ${e.spacing.spacing_70};
    }
  `}
`,z=a(({children:e,style:n,dataTestId:o})=>t.jsx(S,{"data-testid":o??"drawer-body",style:n,children:e}),"DrawerBody"),I=$`
  body {
    overflow: hidden;
  }
`,B=s.div`
  position: fixed;
  inset: 0;
  z-index: ${h};
`,L=s.div`
  position: absolute;
  inset: 0;

  ${({theme:e,$isVisible:n})=>`
    background-color: ${e.palette.surface.dark};
    opacity: ${n?.2:0};
    transition: opacity ${e.animations.emphasizedDecelerate.duration}
      ${e.animations.emphasizedDecelerate.timingFunction};
  `}
`,q=s.div`
  display: grid;
  grid-template-rows: auto 1fr;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;

  ${({theme:e,$isVisible:n})=>`
    padding: ${e.spacing.spacing_70} 0;
    background-color: ${e.palette.surface.contrast};
    transform: ${n?"translateX(0)":"translateX(100%)"};
    transition: transform ${e.animations.emphasizedDecelerate.duration}
      ${e.animations.emphasizedDecelerate.timingFunction};

    @media only screen and (min-width: ${e.breakpoints.mq3}px) {
      width: 500px;
      border-left: 1px solid ${e.palette.border.default};
    }
  `}
`,c=a(({isVisible:e,setIsVisible:n,children:o,dataTestId:m})=>{const[i,l]=r.useState(!1),d=r.useCallback(()=>{l(!1)},[]),f=r.useCallback(()=>{i||n(!1)},[i,n]);return r.useEffect(()=>{const p=a(x=>{x.key==="Escape"&&d()},"handleKeyDown");return l(e),document.addEventListener("keydown",p),()=>{document.removeEventListener("keydown",p)}},[d,e]),t.jsx(C,{handleClose:d,children:t.jsxs(B,{children:[e?t.jsx(y,{styles:I}):null,t.jsx(L,{"data-testid":"drawer-overlay",$isVisible:i,onClick:d}),t.jsx(q,{"data-testid":m??"drawer-content-container",$isVisible:i,onTransitionEnd:f,children:o})]})})},"Drawer");c.Title=j;c.Header=T;c.Body=z;export{c as D};
