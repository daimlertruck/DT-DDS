var w=Object.defineProperty;var a=(e,t)=>w(e,"name",{value:t,configurable:!0});import{j as n}from"./jsx-runtime-Cgz2XvFB.js";import{r}from"./index-CwbBKW39.js";import{c as y,G as $}from"./emotion-react.browser.esm-BzOLYAw5.js";import{B as b}from"./index-DTgA8jos.js";import{I as g}from"./Icon-9dVURh2l.js";import{T as D}from"./Typography-Dk4smw7A.js";import{d as h,f as s}from"./emotion-styled.browser.esm-CIRWz9XU.js";import{I as k}from"./IconButton-D1lKSM55.js";import"./typography-B3nKKPHm.js";import"./index-BlXzoLf5.js";import"./index-DV-VXEUn.js";import{D as j}from"./z-index-C44GOntP.js";const v=a(({title:e,icon:t})=>{const o=h();return n.jsxs(b,{style:{flexDirection:"row",gap:o.spacing.spacing_20},children:[t&&n.jsx(g,{code:t}),n.jsx(D,{color:"content.dark",element:"h4",fontStyles:"h4Bold",children:e})]})},"DrawerTitle"),C=s.header`
  ${({theme:e})=>`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 ${e.spacing.spacing_60} ${e.spacing.spacing_50};

    @media only screen and (min-width: ${e.breakpoints.mq3}px) {
      padding: 0 ${e.spacing.spacing_70} ${e.spacing.spacing_50};
    }
  `}
`,E={handleClose:a(()=>null,"handleClose")},u=r.createContext(E),_=a(({handleClose:e,children:t})=>n.jsx(u.Provider,{value:{handleClose:e},children:t}),"DrawerContextProvider"),T=a(()=>{const e=r.useContext(u);if(!e)throw new Error("Drawer compound components cannot be rendered outside the Drawer component");return e},"useDrawerContext"),S=a(({children:e})=>{const{handleClose:t}=T();return n.jsxs(C,{"data-testid":"drawer-header",children:[e,n.jsx(k,{color:"default",dataTestId:"drawer-close-button",onClick:t,children:n.jsx(g,{code:"close",size:"large"})})]})},"DrawerHeader"),z=s.section`
  ${({theme:e})=>`
    position: relative;
    overflow: auto;
    padding: ${e.spacing.spacing_50} ${e.spacing.spacing_60} 0;
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
      padding: ${e.spacing.spacing_50} ${e.spacing.spacing_70} 0;
    }
  `}
`,B=a(({children:e,style:t,dataTestId:o})=>n.jsx(z,{"data-testid":o??"drawer-body",style:t,children:e}),"DrawerBody"),I=y`
  body {
    overflow: hidden;
  }
`,L=s.div`
  position: fixed;
  inset: 0;
  z-index: ${j};
`,q=s.div`
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
`,c=a(({isVisible:e,setIsVisible:t,children:o,dataTestId:m})=>{const[i,l]=r.useState(!1),d=r.useCallback(()=>{l(!1)},[]),f=r.useCallback(()=>{i||t(!1)},[i,t]);return r.useEffect(()=>{const p=a(x=>{x.key==="Escape"&&d()},"handleKeyDown");return l(e),document.addEventListener("keydown",p),()=>{document.removeEventListener("keydown",p)}},[d,e]),n.jsx(_,{handleClose:d,children:n.jsxs(L,{children:[e?n.jsx($,{styles:I}):null,n.jsx(q,{"data-testid":"drawer-overlay",$isVisible:i,onClick:d}),n.jsx(A,{"data-testid":m??"drawer-content-container",$isVisible:i,onTransitionEnd:f,children:o})]})})},"Drawer");c.Title=v;c.Header=S;c.Body=B;export{c as D};
