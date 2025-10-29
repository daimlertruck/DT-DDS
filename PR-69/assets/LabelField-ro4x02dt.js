import{j as n}from"./jsx-runtime-CB_V9I5Y.js";import{T as b}from"./Typography-DHEP7O00.js";import{d as g}from"./index-D9dZuxfj.js";import{f as m}from"./emotion-styled.browser.esm-DBghOYGd.js";const x=({isDisabled:t,hasError:a,isFloating:r,isActive:e,theme:l})=>t?l.palette.content.light:a?l.palette.error.default:e&&!r?l.palette.informative.default:r?l.palette.content.medium:l.palette.content.default,S=(t,a,r,e)=>{const l=r==="compact"?e.spacing.spacing_30:e.spacing.spacing_40;return`
    ${t?e.fontStyles.bodySmRegular:e.fontStyles.bodyMdRegular}

    left: 12px;
    position: absolute;
    top: ${!t&&a?"50%":l};
    transform: ${!t&&a?"translateY(-50%)":"translateY(0)"};
    transition: all 150ms ease-out;
  `},$=m.label`
  ${({theme:t,isActive:a,isFloating:r,disabled:e,hasError:l,isCentered:o=!1,scale:s="standard"})=>`
   ${t.fontStyles.bodyMdBold};

    color: ${x({isDisabled:e,hasError:l,isFloating:r,isActive:a,theme:t})};
    cursor: inherit;

    ${r&&S(a,o,s,t)}
  `};
`,T=({children:t,isDisabled:a=!1,isActive:r=!1,dataTestId:e,isRequired:l,hasError:o=!1,isFloating:s=!0,htmlFor:i,isCentered:f=!1,scale:p="standard",icon:d,...c})=>{const u=e??"label-field",y=n.jsxs(n.Fragment,{children:[t,l&&!a?n.jsx(b,{color:"error.default",element:"span",fontStyles:"bodySmRegular",children:"*"}):null,d?n.jsx("span",{style:{marginLeft:g.spacing.spacing_20,display:"inline-flex",verticalAlign:"middle"},children:d}):null]});return n.jsx($,{"data-testid":u,disabled:a,hasError:o,htmlFor:i,isActive:r,isCentered:f,isFloating:s,scale:p,...c,children:y})};export{T as L};
