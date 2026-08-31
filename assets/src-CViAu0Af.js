var y=Object.defineProperty;var a=(e,r)=>y(e,"name",{value:r,configurable:!0});import{o as b}from"./rolldown-runtime-CzYk_CEw.js";import{t as _}from"./react-HNhQAnN4.js";import{i as h,o as p,r as D,t as s,u as k}from"./emotion-styled.browser.esm-BD_8_ENF.js";import{t as f}from"./src-Cgsrikn0.js";import{t as j}from"./jsx-runtime-Br4tQxt1.js";import"./icon-BVKwuEsa.js";import{t as C}from"./Typography-BVFm109i.js";import"./core-DtZ76Qs_.js";import{t as T}from"./src-1jRqCCWR.js";import"./box-DLdZVqFP.js";import"./typography-D38L8NZ6.js";import{t as E}from"./IconButton-DPHwvLfO.js";import"./icon-button-DUNOTLRV.js";var o=b(_());p();var t=j(),S=a(({title:e,icon:r})=>{const n=k();return(0,t.jsxs)(T,{style:{flexDirection:"row",gap:n.spacing.spacing_20},children:[r&&(0,t.jsx)(f,{code:r}),(0,t.jsx)(C,{color:"content.dark",element:"h4",fontStyles:"h4Bold",children:e})]})},"DrawerTitle"),z=s.header`
  ${({theme:e})=>`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 ${e.spacing.spacing_60} ${e.spacing.spacing_50};

    @media only screen and (min-width: ${e.breakpoints.mq3}px) {
      padding: 0 ${e.spacing.spacing_70} ${e.spacing.spacing_50};
    }
  `}
`,q={handleClose:a(()=>null,"handleClose")},w=(0,o.createContext)(q),B=a(({handleClose:e,children:r})=>(0,t.jsx)(w.Provider,{value:{handleClose:e},children:r}),"DrawerContextProvider"),L=a(()=>{const e=(0,o.useContext)(w);if(!e)throw new Error("Drawer compound components cannot be rendered outside the Drawer component");return e},"useDrawerContext"),P=a(({children:e})=>{const{handleClose:r}=L();return(0,t.jsxs)(z,{"data-testid":"drawer-header",children:[e,(0,t.jsx)(E,{color:"default",dataTestId:"drawer-close-button",onClick:r,children:(0,t.jsx)(f,{code:"close",size:"large"})})]})},"DrawerHeader"),R=s.section`
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
`,F=a(({children:e,style:r,dataTestId:n})=>(0,t.jsx)(R,{"data-testid":n??"drawer-body",style:r,children:e}),"DrawerBody"),x={Left:"left",Right:"right"};p();var H=h`
  body {
    overflow: hidden;
  }
`,I=s.div`
  position: fixed;
  inset: 0;
  z-index: ${9};
`,A=s.div`
  position: absolute;
  inset: 0;

  ${({theme:e,$isVisible:r})=>`
    background-color: ${e.palette.surface.dark};
    opacity: ${r?.2:0};
    transition: opacity ${e.animations.emphasizedDecelerate.duration}
      ${e.animations.emphasizedDecelerate.timingFunction};
  `}
`,G=s.div`
  display: grid;
  grid-template-rows: auto 1fr;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;

  ${({theme:e,$isVisible:r,$position:n})=>{const i=n===x.Right,c=i?"100%":"-100%";return`
      ${i?"right: 0;":"left: 0;"}
      padding: ${e.spacing.spacing_70} 0;
      background-color: ${e.palette.surface.contrast};
      transform: translateX(${r?"0":c});
      transition: transform ${e.animations.emphasizedDecelerate.duration}
        ${e.animations.emphasizedDecelerate.timingFunction};

      @media only screen and (min-width: ${e.breakpoints.mq3}px) {
        width: 500px;
        ${i?"border-left":"border-right"}: 1px solid ${e.palette.border.default};
      }
    `}}
`;p();var g=a(({isVisible:e,setIsVisible:r,position:n=x.Right,children:i,dataTestId:c})=>{const[d,u]=(0,o.useState)(!1),l=(0,o.useCallback)(()=>{u(!1)},[]),$=(0,o.useCallback)(()=>{d||r(!1)},[d,r]);return(0,o.useEffect)(()=>{const m=a(v=>{v.key==="Escape"&&l()},"handleKeyDown");return u(e),document.addEventListener("keydown",m),()=>{document.removeEventListener("keydown",m)}},[l,e]),(0,t.jsx)(B,{handleClose:l,children:(0,t.jsxs)(I,{children:[e?(0,t.jsx)(D,{styles:H}):null,(0,t.jsx)(A,{"data-testid":"drawer-overlay",$isVisible:d,onClick:l}),(0,t.jsx)(G,{"data-testid":c??"drawer-content-container",$isVisible:d,$position:n,onTransitionEnd:$,children:i})]})})},"Drawer");g.Title=S;g.Header=P;g.Body=F;export{x as n,g as t};
