import{j as o}from"./jsx-runtime-CB_V9I5Y.js";import{T as g}from"./Typography-DHEP7O00.js";import{d as m}from"./index-D9dZuxfj.js";import{f as x}from"./emotion-styled.browser.esm-DBghOYGd.js";const S=({isDisabled:a,hasError:e,isFloating:l,isActive:n,theme:t})=>a?t.palette.content.light:e?t.palette.error.default:n&&!l?t.palette.informative.default:l?t.palette.content.medium:t.palette.content.default,$=(a,e,l,n,t)=>{const r=a||e,s=n==="compact"?t.spacing.spacing_30:t.spacing.spacing_40;return`
    ${r?t.fontStyles.bodySmRegular:t.fontStyles.bodyMdRegular}

  left: 12px;
  position: absolute;
  top: ${!r&&l?"50%":s};
  transform: ${!r&&l?"translateY(-50%)":"translateY(0)"};
  transition: all 150ms ease-out;
  `},j=x.label`
  ${({theme:a,isActive:e,isFloating:l,disabled:n,hasError:t,isInputFilled:r,isCentered:s=!1,scale:i="standard"})=>`
   ${a.fontStyles.bodyMdBold};

    color: ${S({isDisabled:n,hasError:t,isFloating:l,isActive:e,theme:a})};
    cursor: inherit;

    ${l&&$(e,r,s,i,a)}
  `};
`,T=({children:a,isDisabled:e=!1,isActive:l=!1,dataTestId:n,isRequired:t,hasError:r=!1,isFloating:s=!0,isInputFilled:i=!1,htmlFor:f,isCentered:c=!1,scale:p="standard",icon:d,...u})=>{const y=n??"label-field",b=o.jsxs(o.Fragment,{children:[a,t&&!e?o.jsx(g,{color:"error.default",element:"span",fontStyles:"bodySmRegular",children:"*"}):null,d?o.jsx("span",{style:{marginLeft:m.spacing.spacing_20,display:"inline-flex",verticalAlign:"middle"},children:d}):null]});return o.jsx(j,{"data-testid":y,disabled:e,hasError:r,htmlFor:f,isActive:l,isCentered:c,isFloating:s,isInputFilled:i,scale:p,...u,children:b})};export{T as L};
