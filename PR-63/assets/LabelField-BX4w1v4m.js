import{j as o}from"./jsx-runtime-CB_V9I5Y.js";import{I as c}from"./Icon-DG6KDu5A.js";import{T as y}from"./Typography-DOQ44quZ.js";import{d as b}from"./index-BV8q0bTk.js";import{r as x}from"./index-CTjT7uj6.js";import{f as g}from"./emotion-styled.browser.esm-DBghOYGd.js";const S=({isDisabled:t,hasError:e,isFloating:r,isActive:a,theme:l})=>t?l.palette.content.light:e?l.palette.error.default:a&&!r?l.palette.informative.default:r?l.palette.content.medium:l.palette.content.default,j=(t,e,r)=>`
  
  ${r.fontStyles.bodySmRegular}

  left: 12px;
  top: 16px;
  position: absolute;

  transform: ${t||e?"translateY(-45%)":"translateY(0)"};
  transition: transform 150ms ease-out, font-size 150ms ease-out;
  `,$=g.label`
  ${({theme:t,isActive:e,isFloating:r,disabled:a,hasError:l,isInputFilled:n})=>`
   ${t.fontStyles.bodyMdBold};

    color: ${S({isDisabled:a,hasError:l,isFloating:r,isActive:e,theme:t})};
    cursor: inherit;

    ${r&&j(e,n,t)}
  `};
`,L=t=>x.isValidElement(t)&&t.type===c,Y=({children:t,isDisabled:e=!1,isActive:r=!1,dataTestId:a,isRequired:l,hasError:n=!1,isFloating:i=!0,isInputFilled:d=!1,htmlFor:f,icon:s,...p})=>{const u=a??"label-field",m=o.jsxs(o.Fragment,{children:[t,l&&!e?o.jsx(y,{color:"error.default",element:"span",fontStyles:"bodySmRegular",children:"*"}):null,s&&L(s)?o.jsx("span",{style:{marginLeft:b.spacing.spacing_20,display:"inline-flex",verticalAlign:"middle"},children:s}):null]});return o.jsx($,{"data-testid":u,disabled:e,hasError:n,htmlFor:f,isActive:r,isFloating:i,isInputFilled:d,...p,children:m})};export{Y as L,L as i};
