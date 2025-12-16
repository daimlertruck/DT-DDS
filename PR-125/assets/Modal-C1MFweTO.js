var f=Object.defineProperty;var s=(o,t)=>f(o,"name",{value:t,configurable:!0});import{j as e}from"./jsx-runtime-Cgz2XvFB.js";import{r as c}from"./index-CwbBKW39.js";import{a as x}from"./Backdrop-CFvoxos1.js";import"./typography-B3nKKPHm.js";import"./index-S3lRpLPR.js";import{M as u,P as m}from"./z-index-C44GOntP.js";import{u as g}from"./useClickOutside-Cp2kQToC.js";import{S as y}from"./Spinner-rC9YGm5v.js";import{f as i}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";import{h as $}from"./hexToRgba-CWpEuk8w.js";import{B as b}from"./index-juXVSS06.js";import{I as j}from"./Icon-BrO18bYS.js";import{I as h}from"./IconButton-BxQ2uS0G.js";import{T as l}from"./Typography-BDc1BtFV.js";import"./index-DV-VXEUn.js";const v=i.div`
  ${({theme:o})=>`
      position: absolute;
      inset: 0;
      background-color: ${$(o.palette.surface.light,.8)};
      display: flex;
      align-items: center;
      justify-content: center;
  `}
`,w=s(()=>e.jsx(v,{children:e.jsx(y,{size:"extra-large"})}),"ModalLoadingOverlay"),k=i.div`
  ${({theme:o})=>`
    padding: ${o.spacing.xs};
    overflow-y: auto;
    position: relative;

    @media only screen and (max-width: ${o.breakpoints.mq32}px) {
      flex: 1;
      }
    `}
`,M=s(({children:o,style:t,dataTestId:r,isLoading:n=!1})=>e.jsxs(k,{"data-testid":r,style:t,children:[n?e.jsx(w,{}):null,o]}),"ModalContent"),S=i.div`
  display: flex;
  justify-content: end;
  align-items: center;
  border-radius: inherit;

  ${({theme:o,hasBackgroundColor:t,hasBorder:r})=>`
      background-color: ${t?o.palette.surface.default:"transparent"};
      border-top: ${r?`1px solid ${o.palette.border.default}`:"none"};
      gap: ${o.spacing.spacing_40};
      padding: ${o.spacing.xs};
      @media only screen and (max-width: ${o.breakpoints.mq32}px) {
        flex-direction: column-reverse;
      }
  `}
`,C=s(({children:o,style:t,hasBackgroundColor:r=!1,hasBorder:n=!1,dataTestId:a})=>e.jsx(S,{"data-testid":a,hasBackgroundColor:r,hasBorder:n,style:t,children:o}),"ModalFooter"),I=i.div`
  display: flex;
  flex-direction: column;
  border-radius: inherit;

  ${({theme:o,hasBorder:t})=>`
    padding: ${o.spacing.xs};

    border-bottom: ${t?`1px solid ${o.palette.border.default}`:"none"};
    gap: ${o.spacing.spacing_30};

    @media only screen and (min-width: ${o.breakpoints.mq3}px) {
      padding-top: ${o.spacing.s};
    }

    button {
      color: ${o.palette.content.default};
    }

    svg {
      cursor: pointer;
    }
  `}
`,O=s(({dataTestId:o,onClose:t,hasBorder:r=!1,title:n,subTitle:a,style:p})=>e.jsxs(I,{"data-testid":o??"modal-header",hasBorder:r,style:p,children:[e.jsxs(b,{style:{justifyContent:"space-between",flexDirection:"row"},children:[e.jsx(l,{color:"content.dark",element:"h4",fontStyles:"h4",children:n}),e.jsx(h,{color:"accent",dataTestId:"close-button",onClick:t,children:e.jsx(j,{code:"close",size:"large"})})]}),a?e.jsx(l,{color:"content.default",element:"h5",fontStyles:"bodyLgRegular",children:a}):null]}),"ModalHeader"),R=i.div`
  position: fixed;
  z-index: ${u};
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  justify-content: space-between;
  display: flex;
  flex-direction: column;

  ${({theme:o})=>`
      background-color: ${o.palette.surface.contrast};
      border-radius: ${o.shape.modal};
      box-shadow: ${o.shadows.elevation_200};

      @media only screen and (min-width: ${o.breakpoints.mq3}px)  {
        width: 650px;
        height: auto;
        justify-content: normal;
      }
  `}
`,J=c.forwardRef(({children:o,dataTestId:t,isOpen:r,type:n},a)=>e.jsx(m,{isOpen:r,children:e.jsx(x,{dataTestId:t,isOpen:r,ref:a,type:n,children:o})})),d=s(({children:o,onClickOutside:t,style:r,dataTestId:n})=>{const a=c.useRef(null);return g({refs:[a],handler:t??(()=>{})}),e.jsx(R,{"data-testid":n,ref:a,style:r,children:o})},"Modal");d.Header=O;d.Content=M;d.Footer=C;export{d as M,J as O};
