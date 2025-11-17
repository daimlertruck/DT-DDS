import{j as s}from"./jsx-runtime-CB_V9I5Y.js";import{T as g}from"./Typography-CxOo5OZe.js";import{d as m}from"./index-D9dZuxfj.js";import{s as x}from"./emotion-styled.browser.esm-BMKZqQy6.js";const S=({isDisabled:l,hasError:e,isFloating:a,isActive:r,theme:t})=>l?t.palette.content.light:e?t.palette.error.default:r&&!a?t.palette.informative.default:a?t.palette.content.medium:t.palette.content.default,$=(l,e,a,r,t)=>{const n=r==="compact"?t.spacing.spacing_30:t.spacing.spacing_40;return`
    ${l||e?t.fontStyles.bodySmRegular:t.fontStyles.bodyMdRegular}

  left: 12px;
  position: absolute;
  top: ${!l&&a?"50%":n};
  transform: ${!l&&a?"translateY(-50%)":"translateY(0)"};
  transition: all 150ms ease-out;
  `},j=x.label`
  ${({theme:l,isActive:e,isFloating:a,disabled:r,hasError:t,isInputFilled:n,isCentered:o=!1,scale:d="standard"})=>`
   ${l.fontStyles.bodyMdBold};

    color: ${S({isDisabled:r,hasError:t,isFloating:a,isActive:e,theme:l})};
    cursor: inherit;

    ${a&&$(e,n,o,d,l)}
  `};
`,M=({children:l,isDisabled:e=!1,isActive:a=!1,dataTestId:r,isRequired:t,hasError:n=!1,isFloating:o=!0,isInputFilled:d=!1,htmlFor:f,isCentered:p=!1,scale:c="standard",icon:i,...u})=>{const y=r??"label-field",b=s.jsxs(s.Fragment,{children:[l,t&&!e?s.jsx(g,{color:"error.default",element:"span",fontStyles:"bodySmRegular",children:"*"}):null,i?s.jsx("span",{style:{marginLeft:m.spacing.spacing_20,display:"inline-flex",verticalAlign:"middle"},children:i}):null]});return s.jsx(j,{"data-testid":y,disabled:e,hasError:n,htmlFor:f,isActive:a,isCentered:p,isFloating:o,isInputFilled:d,scale:c,...u,children:b})};export{M as L};
