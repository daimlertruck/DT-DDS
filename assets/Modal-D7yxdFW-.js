var f=Object.defineProperty;var s=(t,o)=>f(t,"name",{value:o,configurable:!0});import{j as e}from"./jsx-runtime-Cgz2XvFB.js";import{r as c}from"./index-CwbBKW39.js";import{h as x,a as u}from"./Backdrop-BGEtjSsw.js";import"./typography-B3nKKPHm.js";import"./index-C1q7PNs0.js";import{M as m,P as g}from"./z-index-DkKqHUUA.js";import{u as y}from"./useClickOutside-Cp2kQToC.js";import{S as $}from"./Spinner-rC9YGm5v.js";import{f as i}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";import{B as b}from"./index-juXVSS06.js";import{I as j}from"./Icon-BrO18bYS.js";import{I as h}from"./IconButton-BxQ2uS0G.js";import{T as l}from"./Typography-BDc1BtFV.js";import"./index-DV-VXEUn.js";const v=i.div`
  ${({theme:t})=>`
      position: absolute;
      inset: 0;
      background-color: ${x(t.palette.surface.light,.8)};
      display: flex;
      align-items: center;
      justify-content: center;
  `}
`,w=s(()=>e.jsx(v,{children:e.jsx($,{size:"extra-large"})}),"ModalLoadingOverlay"),k=i.div`
  ${({theme:t})=>`
    padding: ${t.spacing.xs};
    overflow-y: auto;
    position: relative;

    @media only screen and (max-width: ${t.breakpoints.mq32}px) {
      flex: 1;
      }
    `}
`,M=s(({children:t,style:o,dataTestId:r,isLoading:n=!1})=>e.jsxs(k,{"data-testid":r,style:o,children:[n?e.jsx(w,{}):null,t]}),"ModalContent"),S=i.div`
  display: flex;
  justify-content: end;
  align-items: center;
  border-radius: inherit;

  ${({theme:t,hasBackgroundColor:o,hasBorder:r})=>`
      background-color: ${o?t.palette.surface.default:"transparent"};
      border-top: ${r?`1px solid ${t.palette.border.default}`:"none"};
      gap: ${t.spacing.spacing_40};
      padding: ${t.spacing.xs};
      @media only screen and (max-width: ${t.breakpoints.mq32}px) {
        flex-direction: column-reverse;
      }
  `}
`,C=s(({children:t,style:o,hasBackgroundColor:r=!1,hasBorder:n=!1,dataTestId:a})=>e.jsx(S,{"data-testid":a,hasBackgroundColor:r,hasBorder:n,style:o,children:t}),"ModalFooter"),I=i.div`
  display: flex;
  flex-direction: column;
  border-radius: inherit;

  ${({theme:t,hasBorder:o})=>`
    padding: ${t.spacing.xs};

    border-bottom: ${o?`1px solid ${t.palette.border.default}`:"none"};
    gap: ${t.spacing.spacing_30};

    @media only screen and (min-width: ${t.breakpoints.mq3}px) {
      padding-top: ${t.spacing.s};
    }

    button {
      color: ${t.palette.content.default};
    }

    svg {
      cursor: pointer;
    }
  `}
`,O=s(({dataTestId:t,onClose:o,hasBorder:r=!1,title:n,subTitle:a,style:p})=>e.jsxs(I,{"data-testid":t??"modal-header",hasBorder:r,style:p,children:[e.jsxs(b,{style:{justifyContent:"space-between",flexDirection:"row"},children:[e.jsx(l,{color:"content.dark",element:"h4",fontStyles:"h4",children:n}),e.jsx(h,{color:"accent",dataTestId:"close-button",onClick:o,children:e.jsx(j,{code:"close",size:"large"})})]}),a?e.jsx(l,{color:"content.default",element:"h5",fontStyles:"bodyLgRegular",children:a}):null]}),"ModalHeader"),R=i.div`
  position: fixed;
  z-index: ${m};
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  justify-content: space-between;
  display: flex;
  flex-direction: column;

  ${({theme:t})=>`
      background-color: ${t.palette.surface.contrast};
      border-radius: ${t.shape.modal};
      box-shadow: ${t.shadows.elevation_200};

      @media only screen and (min-width: ${t.breakpoints.mq3}px)  {
        width: 650px;
        height: auto;
        justify-content: normal;
      }
  `}
`,G=c.forwardRef(({children:t,dataTestId:o,isOpen:r,type:n},a)=>e.jsx(g,{isOpen:r,children:e.jsx(u,{dataTestId:o,isOpen:r,ref:a,type:n,children:t})})),d=s(({children:t,onClickOutside:o,style:r,dataTestId:n})=>{const a=c.useRef(null);return y({refs:[a],handler:o??(()=>{})}),e.jsx(R,{"data-testid":n,ref:a,style:r,children:t})},"Modal");d.Header=O;d.Content=M;d.Footer=C;export{d as M,G as O};
