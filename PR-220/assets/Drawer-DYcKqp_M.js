var y=Object.defineProperty;var a=(e,t)=>y(e,"name",{value:t,configurable:!0});import{j as n}from"./jsx-runtime-Cgz2XvFB.js";import{r as o}from"./index-CwbBKW39.js";import{c as b,G as h}from"./emotion-react.browser.esm-BHtS0gci.js";import{B as D}from"./index-DjK96f-n.js";import{I as f}from"./Icon-Cizr_oyr.js";import{T as k}from"./Typography-DXnuNw4S.js";import{d as j,f as s}from"./emotion-styled.browser.esm-DNXn-wKZ.js";import{I as v}from"./IconButton-DzFaQPvx.js";import"./typography-B3nKKPHm.js";import"./index-BGcd8FRG.js";import"./index-DLLwJ4dj.js";import{D as C}from"./z-index-BPuITISp.js";const E=a(({title:e,icon:t})=>{const r=j();return n.jsxs(D,{style:{flexDirection:"row",gap:r.spacing.spacing_20},children:[t&&n.jsx(f,{code:t}),n.jsx(k,{color:"content.dark",element:"h4",fontStyles:"h4Bold",children:e})]})},"DrawerTitle"),_=s.header`
  ${({theme:e})=>`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 ${e.spacing.spacing_60} ${e.spacing.spacing_50};

    @media only screen and (min-width: ${e.breakpoints.mq3}px) {
      padding: 0 ${e.spacing.spacing_70} ${e.spacing.spacing_50};
    }
  `}
`,T={handleClose:a(()=>null,"handleClose")},m=o.createContext(T),S=a(({handleClose:e,children:t})=>n.jsx(m.Provider,{value:{handleClose:e},children:t}),"DrawerContextProvider"),z=a(()=>{const e=o.useContext(m);if(!e)throw new Error("Drawer compound components cannot be rendered outside the Drawer component");return e},"useDrawerContext"),R=a(({children:e})=>{const{handleClose:t}=z();return n.jsxs(_,{"data-testid":"drawer-header",children:[e,n.jsx(v,{color:"default",dataTestId:"drawer-close-button",onClick:t,children:n.jsx(f,{code:"close",size:"large"})})]})},"DrawerHeader"),B=s.section`
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
`,I=a(({children:e,style:t,dataTestId:r})=>n.jsx(B,{"data-testid":r??"drawer-body",style:t,children:e}),"DrawerBody"),x={Left:"left",Right:"right"},L=b`
  body {
    overflow: hidden;
  }
`,P=s.div`
  position: fixed;
  inset: 0;
  z-index: ${C};
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

  ${({theme:e,$isVisible:t,$position:r})=>{const i=r===x.Right,l=i?"100%":"-100%";return`
      ${i?"right: 0;":"left: 0;"}
      padding: ${e.spacing.spacing_70} 0;
      background-color: ${e.palette.surface.contrast};
      transform: translateX(${t?"0":l});
      transition: transform ${e.animations.emphasizedDecelerate.duration}
        ${e.animations.emphasizedDecelerate.timingFunction};

      @media only screen and (min-width: ${e.breakpoints.mq3}px) {
        width: 500px;
        ${i?"border-left":"border-right"}: 1px solid ${e.palette.border.default};
      }
    `}}
`,p=a(({isVisible:e,setIsVisible:t,position:r=x.Right,children:i,dataTestId:l})=>{const[d,g]=o.useState(!1),c=o.useCallback(()=>{g(!1)},[]),w=o.useCallback(()=>{d||t(!1)},[d,t]);return o.useEffect(()=>{const u=a($=>{$.key==="Escape"&&c()},"handleKeyDown");return g(e),document.addEventListener("keydown",u),()=>{document.removeEventListener("keydown",u)}},[c,e]),n.jsx(S,{handleClose:c,children:n.jsxs(P,{children:[e?n.jsx(h,{styles:L}):null,n.jsx(q,{"data-testid":"drawer-overlay",$isVisible:d,onClick:c}),n.jsx(A,{"data-testid":l??"drawer-content-container",$isVisible:d,$position:r,onTransitionEnd:w,children:i})]})})},"Drawer");p.Title=E;p.Header=R;p.Body=I;export{p as D,x as a};
