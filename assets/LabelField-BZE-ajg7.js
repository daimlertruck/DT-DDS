import{j as n}from"./jsx-runtime-DMAvRu52.js";import{T as i}from"./Typography-DII2gFDQ.js";import{n as p}from"./emotion-styled.browser.esm-Dv69Fly8.js";const u=(t,e,l,o)=>t?o.palette.content.light:e?o.palette.error.default:l?o.palette.content.medium:o.palette.content.default,b=(t,e)=>`${t?e.fontStyles.body3:e.fontStyles.body2}

  left: 12px;
  top: 16px;
  position: absolute;

  transform: ${t?"translateY(-45%)":"translateY(0)"};
  transition: transform 150ms ease-out, font-size 150ms ease-out;
  `,c=p.label`
  ${({theme:t,isActive:e,isFloating:l,disabled:o,hasError:r})=>`
   ${t.fontStyles.body2Bold};

    color: ${u(o,r,l,t)};
    cursor: inherit;

    ${l&&b(e,t)}
  `};
`,S=({children:t,isDisabled:e=!1,isActive:l=!1,dataTestId:o,isRequired:r,hasError:a=!1,isFloating:s=!0,...d})=>{const f=o??"label-field";return n.jsxs(c,{"data-testid":f,disabled:e,hasError:a,isActive:l,isFloating:s,...d,children:[t,r?n.jsx(i,{color:"error.default",element:"span",fontStyles:"body3",children:"*"}):null]})};export{S as L};
