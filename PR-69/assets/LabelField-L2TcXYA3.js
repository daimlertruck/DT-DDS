import{j as n}from"./jsx-runtime-CB_V9I5Y.js";import{T as m}from"./Typography-DOQ44quZ.js";import{d as y}from"./index-BV8q0bTk.js";import{f as b}from"./emotion-styled.browser.esm-DBghOYGd.js";const x=({isDisabled:e,hasError:l,isFloating:t,isActive:r,theme:a})=>e?a.palette.content.light:l?a.palette.error.default:r&&!t?a.palette.informative.default:t?a.palette.content.medium:a.palette.content.default,g=(e,l,t)=>{const r=e||l;return`
  ${r?t.fontStyles.bodySmRegular:t.fontStyles.bodyMdRegular}

  left: 12px;
  top: ${r?"14px":"12px"};
  position: absolute;

  transform: ${r?"translateY(-45%)":"translateY(0)"};
  transition: all 150ms ease-out;
  `},S=b.label`
  ${({theme:e,isActive:l,isFloating:t,disabled:r,hasError:a,isInputFilled:o})=>`
   ${e.fontStyles.bodyMdBold};

    color: ${x({isDisabled:r,hasError:a,isFloating:t,isActive:l,theme:e})};
    cursor: inherit;

    ${t&&g(l,o,e)}
  `};
`,_=({children:e,isDisabled:l=!1,isActive:t=!1,dataTestId:r,isRequired:a,hasError:o=!1,isFloating:i=!0,isInputFilled:d=!1,htmlFor:f,icon:s,...p})=>{const u=r??"label-field",c=n.jsxs(n.Fragment,{children:[e,a&&!l?n.jsx(m,{color:"error.default",element:"span",fontStyles:"bodySmRegular",children:"*"}):null,s?n.jsx("span",{style:{marginLeft:y.spacing.spacing_20,display:"inline-flex",verticalAlign:"middle"},children:s}):null]});return n.jsx(S,{"data-testid":u,disabled:l,hasError:o,htmlFor:f,isActive:t,isFloating:i,isInputFilled:d,...p,children:c})};export{_ as L};
