import{j as t}from"./jsx-runtime-CB_V9I5Y.js";import{a as p}from"./Backdrop-DYTfV_MW.js";import{h as f}from"./index-D9dZuxfj.js";import"./index-Dtj30Pq4.js";import{P as x}from"./Portal-DUP4U3GD.js";import{r as l}from"./index-CTjT7uj6.js";import{u}from"./useClickOutside-CvVYzr-_.js";import{S as m}from"./Spinner-C9-unYM1.js";import{f as s}from"./emotion-styled.browser.esm-DBghOYGd.js";import{B as g}from"./index-CWvrgZ1b.js";import{I as y}from"./Icon-DG6KDu5A.js";import{I as $}from"./IconButton-C_mszqXk.js";import{T as d}from"./Typography-DHEP7O00.js";import"./index-XjDa9cP3.js";import{M as b}from"./z-index-CLLOsryR.js";const j=s.div`
  ${({theme:o})=>`
      position: absolute;
      inset: 0;
      background-color: ${f(o.palette.surface.light,.8)};
      display: flex;
      align-items: center;
      justify-content: center;
  `}
`,h=()=>t.jsx(j,{children:t.jsx(m,{size:"extra-large"})}),v=s.div`
  ${({theme:o})=>`
    padding: ${o.spacing.xs};
    overflow-y: auto;
    position: relative;

    @media only screen and (max-width: ${o.breakpoints.mq32}px) {
      flex: 1;
      }
    `}
`,w=({children:o,style:e,dataTestId:r,isLoading:n=!1})=>t.jsxs(v,{"data-testid":r,style:e,children:[n?t.jsx(h,{}):null,o]}),k=s.div`
  display: flex;
  justify-content: end;
  align-items: center;
  border-radius: inherit;

  ${({theme:o,hasBackgroundColor:e,hasBorder:r})=>`
      background-color: ${e?o.palette.surface.default:"transparent"};
      border-top: ${r?`1px solid ${o.palette.border.default}`:"none"};
      gap: ${o.spacing.spacing_40};
      padding: ${o.spacing.xs};
      @media only screen and (max-width: ${o.breakpoints.mq32}px) {
        flex-direction: column-reverse;
      }
  `}
`,M=({children:o,style:e,hasBackgroundColor:r=!1,hasBorder:n=!1,dataTestId:a})=>t.jsx(k,{"data-testid":a,hasBackgroundColor:r,hasBorder:n,style:e,children:o}),S=s.div`
  display: flex;
  flex-direction: column;
  border-radius: inherit;

  ${({theme:o,hasBorder:e})=>`
    padding: ${o.spacing.xs};

    border-bottom: ${e?`1px solid ${o.palette.border.default}`:"none"};
    gap: ${o.spacing.spacing_30};

    @media only screen and (min-width: ${o.breakpoints.mq32}px) {
      padding-top: ${o.spacing.s};
    }

    button {
      color: ${o.palette.content.default};
    }

    svg {
      cursor: pointer;
    }
  `}
`,C=({dataTestId:o,onClose:e,hasBorder:r=!1,title:n,subTitle:a,style:c})=>t.jsxs(S,{"data-testid":o??"modal-header",hasBorder:r,style:c,children:[t.jsxs(g,{style:{justifyContent:"space-between",flexDirection:"row"},children:[t.jsx(d,{color:"content.dark",element:"h4",fontStyles:"h4",children:n}),t.jsx($,{color:"accent",dataTestId:"close-button",onClick:e,children:t.jsx(y,{code:"close",size:"l"})})]}),a?t.jsx(d,{color:"content.default",element:"h5",fontStyles:"bodyLgRegular",children:a}):null]}),I=s.div`
  position: fixed;
  z-index: ${b};
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
`,X=l.forwardRef(({children:o,dataTestId:e,isOpen:r,type:n},a)=>t.jsx(x,{isOpen:r,children:t.jsx(p,{dataTestId:e,isOpen:r,ref:a,type:n,children:o})})),i=({children:o,onClickOutside:e,style:r,dataTestId:n})=>{const a=l.useRef(null);return u({ref:a,handler:e??(()=>{})}),t.jsx(I,{"data-testid":n,ref:a,style:r,children:o})};i.Header=C;i.Content=w;i.Footer=M;export{i as M,X as O};
