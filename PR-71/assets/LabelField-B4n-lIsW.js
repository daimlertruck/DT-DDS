import{j as n}from"./jsx-runtime-CB_V9I5Y.js";import{T as m}from"./Typography-DDcIJD0Q.js";import{d as b}from"./index-B6tfhuuo.js";import{f as y}from"./emotion-styled.browser.esm-DBghOYGd.js";const x=({isDisabled:t,hasError:e,isFloating:l,isActive:a,theme:r})=>t?r.palette.content.light:e?r.palette.error.default:a&&!l?r.palette.informative.default:l?r.palette.content.medium:r.palette.content.default,g=(t,e,l)=>`
  
  ${l.fontStyles.bodySmRegular}

  left: 12px;
  top: 16px;
  position: absolute;

  transform: ${t||e?"translateY(-45%)":"translateY(0)"};
  transition: transform 150ms ease-out, font-size 150ms ease-out;
  `,S=y.label`
  ${({theme:t,isActive:e,isFloating:l,disabled:a,hasError:r,isInputFilled:o})=>`
   ${t.fontStyles.bodyMdBold};

    color: ${x({isDisabled:a,hasError:r,isFloating:l,isActive:e,theme:t})};
    cursor: inherit;

    ${l&&g(e,o,t)}
  `};
`,_=({children:t,isDisabled:e=!1,isActive:l=!1,dataTestId:a,isRequired:r,hasError:o=!1,isFloating:i=!0,isInputFilled:d=!1,htmlFor:f,icon:s,...u})=>{const p=a??"label-field",c=n.jsxs(n.Fragment,{children:[t,r&&!e?n.jsx(m,{color:"error.default",element:"span",fontStyles:"bodySmRegular",children:"*"}):null,s?n.jsx("span",{style:{marginLeft:b.spacing.spacing_20,display:"inline-flex",verticalAlign:"middle"},children:s}):null]});return n.jsx(S,{"data-testid":p,disabled:e,hasError:o,htmlFor:f,isActive:l,isFloating:i,isInputFilled:d,...u,children:c})};export{_ as L};
