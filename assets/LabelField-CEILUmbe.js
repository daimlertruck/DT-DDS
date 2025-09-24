import{j as s}from"./jsx-runtime-CB_V9I5Y.js";import{T as u}from"./Typography-DOQ44quZ.js";import{f as p}from"./emotion-styled.browser.esm-DBghOYGd.js";const c=({isDisabled:t,hasError:e,isFloating:l,isActive:o,theme:r})=>t?r.palette.content.light:e?r.palette.error.default:o&&!l?r.palette.informative.default:l?r.palette.content.medium:r.palette.content.default,b=(t,e,l)=>`
  
  ${l.fontStyles.bodySmRegular}

  left: 12px;
  top: 16px;
  position: absolute;

  transform: ${t||e?"translateY(-45%)":"translateY(0)"};
  transition: transform 150ms ease-out, font-size 150ms ease-out;
  `,m=p.label`
  ${({theme:t,isActive:e,isFloating:l,disabled:o,hasError:r,isInputFilled:a})=>`
   ${t.fontStyles.bodyMdBold};

    color: ${c({isDisabled:o,hasError:r,isFloating:l,isActive:e,theme:t})};
    cursor: inherit;

    ${l&&b(e,a,t)}
  `};
`,$=({children:t,isDisabled:e=!1,isActive:l=!1,dataTestId:o,isRequired:r,hasError:a=!1,isFloating:n=!0,isInputFilled:f=!1,...d})=>{const i=o??"label-field";return s.jsxs(m,{"data-testid":i,disabled:e,hasError:a,isActive:l,isFloating:n,isInputFilled:f,...d,children:[t,r&&!e?s.jsx(u,{color:"error.default",element:"span",fontStyles:"bodySmRegular",children:"*"}):null]})};export{$ as L};
