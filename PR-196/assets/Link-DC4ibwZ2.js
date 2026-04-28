var y=Object.defineProperty;var s=(r,o)=>y(r,"name",{value:o,configurable:!0});import{j as l}from"./jsx-runtime-Cgz2XvFB.js";import{r as b}from"./index-CwbBKW39.js";import{I as k}from"./Icon-9dVURh2l.js";import{f as v}from"./emotion-styled.browser.esm-CIRWz9XU.js";const h={inline:{large:{regular:"linkLgRegular",bold:"linkLgBold"},medium:{regular:"linkMdRegular",bold:"linkMdBold"},small:{regular:"linkSmRegular",bold:"linkSmBold"}},standalone:{large:{regular:"bodyLgRegular",bold:"bodyLgBold"},medium:{regular:"bodyMdRegular",bold:"bodyMdBold"},small:{regular:"bodySmRegular",bold:"bodySmBold"}}},x=s(r=>({inline:{primary:{default:r.accent.default,hover:r.accent.dark,active:r.accent.medium,disabled:r.content.light},secondary:{default:r.accent.default,hover:r.accent.dark,active:r.accent.medium,disabled:r.content.light}},standalone:{primary:{default:r.primary.default,hover:r.accent.default,active:r.accent.default,disabled:r.primary.light},secondary:{default:r.secondary.default,hover:r.secondary.dark,active:r.secondary.medium,disabled:r.secondary.light}}}),"colorMap"),$=v.a`
  ${({theme:r,disabled:o,size:a="medium",variant:e="standalone",color:i="primary",$fontWeight:n="regular"})=>{const d=x(r.palette)[e][i];return`
      color: ${d.default};
      display: inline-flex;
      align-items: center;
      gap: ${r.spacing.spacing_10};

      ${r.fontStyles[h[e][a][n]]};

      ${o?`
            color: ${d.disabled};
            cursor: not-allowed;
          `:`
            &:hover {
              color: ${d.hover};
            }

            &:active {
              color: ${d.active};
            }
          `};

      &:focus-visible {
        outline: 2px solid ${r.palette.primary.default};
      }
    `}}
`,B=b.forwardRef(({isDisabled:r,children:o,size:a="medium",dataTestId:e,onClick:i,variant:n,fontWeight:d="regular",href:t,style:u,icon:c,color:m,...g},f)=>l.jsx($,{color:m,"data-testid":e??"link",disabled:r,$fontWeight:d,ref:f,size:a,style:u,variant:n,...!r&&{href:t,onClick:i},...g,children:n==="inline"||!c?o:l.jsxs(l.Fragment,{children:[l.jsx("span",{children:o}),l.jsx(k,{code:c,color:"inherit",size:a})]})}));export{B as L};
