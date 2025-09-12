import{j as a}from"./jsx-runtime-DMAvRu52.js";import{T as i}from"./Typography-D4QoQXTm.js";import{n as u}from"./emotion-styled.browser.esm-Dv69Fly8.js";const p=(t,e,o,l)=>t?l.palette.content.light:e?l.palette.error.default:o?l.palette.content.medium:l.palette.content.default,b=(t,e)=>`${t?e.fontStyles.bodySmRegular:e.fontStyles.bodyMdRegular}

  left: 12px;
  top: 16px;
  position: absolute;

  transform: ${t?"translateY(-45%)":"translateY(0)"};
  transition: transform 150ms ease-out, font-size 150ms ease-out;
  `,c=u.label`
  ${({theme:t,isActive:e,isFloating:o,disabled:l,hasError:r})=>`
   ${t.fontStyles.bodyMdBold};

    color: ${p(l,r,o,t)};
    cursor: inherit;

    ${o&&b(e,t)}
  `};
`,x=({children:t,isDisabled:e=!1,isActive:o=!1,dataTestId:l,isRequired:r,hasError:n=!1,isFloating:s=!0,...d})=>{const f=l??"label-field";return a.jsxs(c,{"data-testid":f,disabled:e,hasError:n,isActive:o,isFloating:s,...d,children:[t,r?a.jsx(i,{color:"error.default",element:"span",fontStyles:"bodySmRegular",children:"*"}):null]})};export{x as L};
