var m=Object.defineProperty;var s=(l,a)=>m(l,"name",{value:a,configurable:!0});import{j as o}from"./jsx-runtime-Cgz2XvFB.js";import{T as x}from"./Typography-C1WZriYP.js";import{t as S}from"./index-Xf3VWcnb.js";import{f as $}from"./emotion-styled.browser.esm-CIRWz9XU.js";const j=s(({isDisabled:l,hasError:a,isFloating:e,isActive:n,theme:t})=>l?t.palette.content.light:a?t.palette.error.default:n&&!e?t.palette.informative.default:e?t.palette.content.medium:t.palette.content.default,"labelColorState"),L=s((l,a,e,n,t)=>{const r=n==="compact"?t.spacing.spacing_30:t.spacing.spacing_40;return`
    ${l||a?t.fontStyles.bodySmRegular:t.fontStyles.bodyMdRegular}

  left: 12px;
  position: absolute;
  top: ${!l&&e?"50%":r};
  transform: ${!l&&e?"translateY(-50%)":"translateY(0)"};
  transition: all 150ms ease-out;
  `},"floatingLabel"),R=$.label`
  ${({theme:l,isActive:a,isFloating:e,disabled:n,hasError:t,isInputFilled:r,isCentered:d=!1,scale:i="standard"})=>`
   ${l.fontStyles.bodyMdBold};

    color: ${j({isDisabled:n,hasError:t,isFloating:e,isActive:a,theme:l})};
    cursor: inherit;

    ${e&&L(a,r,d,i,l)}
  `};
`,C=s(({children:l,isDisabled:a=!1,isActive:e=!1,dataTestId:n,isRequired:t,hasError:r=!1,isFloating:d=!0,isInputFilled:i=!1,htmlFor:p,isCentered:c=!1,scale:u="standard",icon:f,...y})=>{const b=n??"label-field",g=o.jsxs(o.Fragment,{children:[l,t&&!a?o.jsx(x,{color:"error.default",element:"span",fontStyles:"bodySmRegular",children:"*"}):null,f?o.jsx("span",{style:{marginLeft:S.spacing.spacing_20,display:"inline-flex",verticalAlign:"middle"},children:f}):null]});return o.jsx(R,{"data-testid":b,disabled:a,hasError:r,htmlFor:p,isActive:e,isCentered:c,isFloating:d,isInputFilled:i,scale:u,...y,children:g})},"LabelField");export{C as L};
