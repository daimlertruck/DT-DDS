import{j as n}from"./jsx-runtime-CB_V9I5Y.js";import{T as i}from"./Typography-DuyBDrqy.js";import{f as p}from"./emotion-styled.browser.esm-DBghOYGd.js";const c=(t,e,l,o,r)=>t?r.palette.content.light:e?r.palette.error.default:o&&!l?r.palette.informative.default:l?r.palette.content.medium:r.palette.content.default,m=(t,e,l)=>`
  
  ${l.fontStyles.bodySmRegular}

  left: 12px;
  top: 16px;
  position: absolute;

  transform: ${t||e?"translateY(-45%)":"translateY(0)"};
  transition: transform 150ms ease-out, font-size 150ms ease-out;
  `,b=p.label`
  ${({theme:t,isActive:e,isFloating:l,disabled:o,hasError:r,isInputFilled:a=!1})=>`
   ${t.fontStyles.bodyMdBold};

    color: ${c(o,r,l,e,t)};
    cursor: inherit;

    ${l&&m(e,a,t)}
  `};
`,$=({children:t,isDisabled:e=!1,isActive:l=!1,dataTestId:o,isRequired:r,hasError:a=!1,isFloating:s=!0,isInputFilled:f=!1,...d})=>{const u=o??"label-field";return n.jsxs(b,{"data-testid":u,disabled:e,hasError:a,isActive:l,isFloating:s,isInputFilled:f,...d,children:[t,r&&!e?n.jsx(i,{color:"error.default",element:"span",fontStyles:"bodySmRegular",children:"*"}):null]})};export{$ as L};
