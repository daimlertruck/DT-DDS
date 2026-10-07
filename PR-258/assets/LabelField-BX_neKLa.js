var g=Object.defineProperty;var s=(a,l)=>g(a,"name",{value:l,configurable:!0});import{t as x}from"./emotion-styled.browser.esm-BD_8_ENF.js";import{t as S}from"./jsx-runtime-Br4tQxt1.js";import{t as _}from"./src-CIbK0PmT.js";import{t as $}from"./Typography-BVFm109i.js";import"./typography-D38L8NZ6.js";var j=s(({isDisabled:a,hasError:l,isFloating:e,isActive:r,theme:t})=>a?t.palette.content.light:l?t.palette.error.default:r&&!e?t.palette.informative.default:e?t.palette.content.medium:t.palette.content.default,"labelColorState"),v=s((a,l,e,r,t)=>{const n=r==="compact"?t.spacing.spacing_30:t.spacing.spacing_40;return`
    ${a||l?t.fontStyles.bodySmRegular:t.fontStyles.bodyMdRegular}

  left: 12px;
  position: absolute;
  top: ${!a&&e?"50%":n};
  transform: ${!a&&e?"translateY(-50%)":"translateY(0)"};
  transition: all 150ms ease-out;
  `},"floatingLabel"),L=x.label`
  ${({theme:a,isActive:l,isFloating:e,disabled:r,hasError:t,isInputFilled:n,isCentered:i=!1,scale:d="standard"})=>`
   ${a.fontStyles.bodyMdBold};

    color: ${j({isDisabled:r,hasError:t,isFloating:e,isActive:l,theme:a})};
    cursor: inherit;

    ${e&&v(l,n,i,d,a)}
  `};
`,o=S(),C=s(({children:a,isDisabled:l=!1,isActive:e=!1,dataTestId:r,isRequired:t,hasError:n=!1,isFloating:i=!0,isInputFilled:d=!1,htmlFor:p,isCentered:u=!1,scale:c="standard",icon:f,...m})=>{const y=r??"label-field",b=(0,o.jsxs)(o.Fragment,{children:[a,t&&!l?(0,o.jsx)($,{color:"error.default",element:"span",fontStyles:"bodySmRegular",children:"*"}):null,f?(0,o.jsx)("span",{style:{marginLeft:_.spacing.spacing_20,display:"inline-flex",verticalAlign:"middle"},children:f}):null]});return(0,o.jsx)(L,{"data-testid":y,disabled:l,hasError:n,htmlFor:p,isActive:e,isCentered:u,isFloating:i,isInputFilled:d,scale:c,...m,children:b})},"LabelField");export{C as t};
