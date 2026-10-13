var f=Object.defineProperty;var s=(r,e)=>f(r,"name",{value:e,configurable:!0});import{l as u}from"./preload-helper-DhB_op97.js";import{t as m}from"./react-Cv64OdzP.js";import{t as i}from"./emotion-styled.browser.esm-YTZgSpOx.js";import{t as x}from"./src-DQoSsMZn.js";import{t as g}from"./jsx-runtime-CPdzY0Ku.js";import"./icon-DhOkWClN.js";import"./src-CIbK0PmT.js";import{t as p}from"./Typography-CS3NCxJQ.js";import{t as y}from"./hexToRgba-D41tBJLG.js";import{a as v,r as $}from"./core-DRZ7abR7.js";import{t as b}from"./Backdrop-BhdaYJhj.js";import{t as j}from"./src-D8J0l-L9.js";import"./box-urSjHwr1.js";import"./typography-D_Go94-A.js";import{t as h}from"./IconButton-BE7TQeEH.js";import"./icon-button-B_sQRfEN.js";import{t as M}from"./Spinner-DXfboVRA.js";import"./src-nouKxEiA.js";var d=u(m()),w=i.div`
  ${({theme:r})=>`
      position: absolute;
      inset: 0;
      background-color: ${y(r.palette.surface.light,.8)};
      display: flex;
      align-items: center;
      justify-content: center;
  `}
`,o=g(),k=s(()=>(0,o.jsx)(w,{children:(0,o.jsx)(M,{size:"extra-large"})}),"ModalLoadingOverlay"),_=i.div`
  ${({theme:r})=>`
    padding: ${r.spacing.xs};
    overflow-y: auto;
    position: relative;

    @media only screen and (max-width: ${r.breakpoints.mq32}px) {
      flex: 1;
      }
    `}
`,S=s(({children:r,style:e,dataTestId:t,isLoading:n=!1})=>(0,o.jsxs)(_,{"data-testid":t,style:e,children:[n?(0,o.jsx)(k,{}):null,r]}),"ModalContent"),q=i.div`
  display: flex;
  justify-content: end;
  align-items: center;
  border-radius: inherit;
  margin-top: auto;

  ${({theme:r,hasBackgroundColor:e,hasBorder:t})=>`
      background-color: ${e?r.palette.surface.default:"transparent"};
      border-top: ${t?`1px solid ${r.palette.border.default}`:"none"};
      gap: ${r.spacing.spacing_40};
      padding: ${r.spacing.xs};
      @media only screen and (max-width: ${r.breakpoints.mq32}px) {
        flex-direction: column-reverse;
      }
  `}
`,C=s(({children:r,style:e,hasBackgroundColor:t=!1,hasBorder:n=!1,dataTestId:a})=>(0,o.jsx)(q,{"data-testid":a,hasBackgroundColor:t,hasBorder:n,style:e,children:r}),"ModalFooter"),O=i.div`
  display: flex;
  flex-direction: column;
  border-radius: inherit;

  ${({theme:r,hasBorder:e})=>`
    padding: ${r.spacing.xs};

    border-bottom: ${e?`1px solid ${r.palette.border.default}`:"none"};
    gap: ${r.spacing.spacing_30};

    @media only screen and (min-width: ${r.breakpoints.mq3}px) {
      padding-top: ${r.spacing.s};
    }

    button {
      color: ${r.palette.content.default};
    }

    svg {
      cursor: pointer;
    }
  `}
`,I=s(({dataTestId:r,onClose:e,hasBorder:t=!1,title:n,subTitle:a,style:c})=>(0,o.jsxs)(O,{"data-testid":r??"modal-header",hasBorder:t,style:c,children:[(0,o.jsxs)(j,{style:{justifyContent:"space-between",flexDirection:"row"},children:[(0,o.jsx)(p,{color:"content.dark",element:"h4",fontStyles:"h4",children:n}),(0,o.jsx)(h,{color:"accent",dataTestId:"close-button",onClick:e,children:(0,o.jsx)(x,{code:"close",size:"large"})})]}),a?(0,o.jsx)(p,{color:"content.default",element:"h5",fontStyles:"bodyLgRegular",children:a}):null]}),"ModalHeader"),R=i.div`
  position: fixed;
  z-index: ${10};
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  ${({theme:r})=>`
      background-color: ${r.palette.surface.contrast};
      border-radius: ${r.shape.modal};
      box-shadow: ${r.shadows.elevation_200};

      @media only screen and (min-width: ${r.breakpoints.mq3}px)  {
        width: 650px;
        height: auto;
        justify-content: normal;
      }
  `}
`,Y=(0,d.forwardRef)(({children:r,dataTestId:e,isOpen:t,type:n},a)=>(0,o.jsx)(v,{isOpen:t,children:(0,o.jsx)(b,{dataTestId:e,isOpen:t,ref:a,type:n,children:r})})),l=s(({children:r,onClickOutside:e,style:t,dataTestId:n})=>{const a=(0,d.useRef)(null);return $({refs:[a],handler:e??(()=>{})}),(0,o.jsx)(R,{"data-testid":n,ref:a,style:t,children:r})},"Modal");l.Header=I;l.Content=S;l.Footer=C;var Z=s((r=!1)=>{const[e,t]=(0,d.useState)(!!r);return(0,d.useEffect)(()=>{t(r)},[r]),{isModalOpen:e,toggleModal:s(()=>{t(a=>!a)},"toggleModal")}},"useModal");export{l as n,Y as r,Z as t};
