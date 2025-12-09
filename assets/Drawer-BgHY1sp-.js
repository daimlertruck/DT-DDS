var w=Object.defineProperty;var s=(e,n)=>w(e,"name",{value:n,configurable:!0});import{j as t}from"./jsx-runtime-Cgz2XvFB.js";import{r as d}from"./index-CwbBKW39.js";import{c as x,G as $}from"./emotion-react.browser.esm-DSneuyqi.js";import{T as y}from"./Typography-BDc1BtFV.js";import{I as h}from"./IconButton-BxQ2uS0G.js";import{f as c,d as b}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";import{C as v}from"./Close-BB6prpXj.js";import"./typography-B3nKKPHm.js";import"./index-C9s2RhT-.js";import"./index-DV-VXEUn.js";import{D}from"./z-index-DkKqHUUA.js";const j=s(({title:e})=>t.jsx(y,{color:"content.dark",element:"h4",fontStyles:"h4",children:e}),"DrawerTitle"),C=c.header`
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
`,S={handleClose:s(()=>null,"handleClose")},g=d.createContext(S),_=s(({handleClose:e,children:n})=>t.jsx(g.Provider,{value:{handleClose:e},children:n}),"DrawerContextProvider"),E=s(()=>{const e=d.useContext(g);if(!e)throw new Error("Drawer compound components cannot be rendered outside the Drawer component");return e},"useDrawerContext"),k=s(({children:e})=>{const{handleClose:n}=E();return t.jsxs(C,{"data-testid":"drawer-header",children:[t.jsx("div",{children:e}),t.jsx(h,{color:"default",dataTestId:"drawer-close-button",onClick:n,children:t.jsx(v,{})})]})},"DrawerHeader"),T=c.section`
  ${({theme:e})=>`
    position: relative;
    overflow: auto;
    padding:  ${e.spacing.spacing_50} ${e.spacing.xs} 0;
    
    @media only screen and (min-width: ${e.breakpoints.mq32}px) {
      padding:  ${e.spacing.spacing_50} ${e.spacing.s} 0;
    }
  `}
`,z=c.div`
  position: absolute;
  margin-top: ${({theme:e})=>e.spacing.spacing_30};
`,I=s(({children:e,style:n,dataTestId:p})=>{const o=d.useRef(null),l=s(r=>{var i;const a=(i=o.current)==null?void 0:i.parentElement;a&&(r?a.classList.add("hasScroll"):a.classList.remove("hasScroll"))},"handleScrollClass");return d.useEffect(()=>{if(o.current){const r=new IntersectionObserver(([{isIntersecting:a}])=>l(!a));return r.observe(o.current),()=>r.disconnect()}},[o]),t.jsxs(T,{"data-testid":p??"drawer-body",style:n,children:[e,t.jsx(z,{ref:o})]})},"DrawerBody"),F=x`
  body {
    overflow: hidden;
  }
`,L=c.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${D};
`,R=c.div`
  ${({theme:e,isVisible:n})=>`
    width: 100%;
    height: 100vh;
    position: absolute;
    background-color: ${e.palette.surface.dark};
    opacity: ${n?.2:0};
    transition: opacity ${e.animations.emphasizedDecelerate.duration}
      ${e.animations.emphasizedDecelerate.timingFunction};
  `}
`,O=c.div`
  ${({theme:e,isVisible:n})=>`
    display: grid;
    grid-template-rows: auto 1fr;
    padding: ${e.spacing.xs} 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background-color: ${e.palette.surface.contrast};
    transform: ${n?"translateX(0)":"translateX(100%)"};
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
`,q=s(e=>parseFloat(e.replace(/[^\d.]/g,""))*1e3,"animationToMiliseconds"),u=s(({isVisible:e,setIsVisible:n,children:p,dataTestId:o})=>{const[l,r]=d.useState(!1),a=b(),i=d.useCallback(()=>{r(!1),setTimeout(()=>{n(!1)},q(a.animations.emphasizedDecelerate.timingFunction))},[n,a.animations.emphasizedDecelerate.timingFunction]);return d.useEffect(()=>{const m=s(f=>{f.key==="Escape"&&i()},"handleKeyDown");return r(e),document.addEventListener("keydown",m),()=>{document.removeEventListener("keydown",m)}},[i,e]),t.jsx(_,{handleClose:i,children:t.jsxs(L,{children:[e?t.jsx($,{styles:F}):null,t.jsx(R,{"data-testid":"drawer-overlay",isVisible:l,onClick:i}),t.jsx(O,{"data-testid":o??"drawer-content-container",isVisible:l,children:p})]})})},"Drawer");u.Title=j;u.Header=k;u.Body=I;export{u as D};
