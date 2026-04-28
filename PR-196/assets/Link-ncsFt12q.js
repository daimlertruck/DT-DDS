var y=Object.defineProperty;var s=(r,o)=>y(r,"name",{value:o,configurable:!0});import{j as a}from"./jsx-runtime-Cgz2XvFB.js";import{r as b}from"./index-CwbBKW39.js";import{I as k}from"./Icon-9dVURh2l.js";import{f as v}from"./emotion-styled.browser.esm-CIRWz9XU.js";const $={inline:{large:{regular:"linkLgRegular",bold:"linkLgBold"},medium:{regular:"linkMdRegular",bold:"linkMdBold"},small:{regular:"linkSmRegular",bold:"linkSmBold"}},standalone:{large:{regular:"bodyLgRegular",bold:"bodyLgBold"},medium:{regular:"bodyMdRegular",bold:"bodyMdBold"},small:{regular:"bodySmRegular",bold:"bodySmBold"}}},h=s(r=>({inline:{primary:{default:r.accent.default,hover:r.accent.dark,active:r.accent.medium,disabled:r.content.light},secondary:{default:r.accent.default,hover:r.accent.dark,active:r.accent.medium,disabled:r.content.light}},standalone:{primary:{default:r.primary.default,hover:r.accent.default,active:r.accent.default,disabled:r.primary.light},secondary:{default:r.secondary.default,hover:r.secondary.dark,active:r.secondary.medium,disabled:r.secondary.light}}}),"colorMap"),x=v.a`
  ${({theme:r,disabled:o,size:d="medium",variant:e="standalone",color:i="primary",$fontWeight:n="regular"})=>{const l=h(r.palette)[e][i];return`
      color: ${l.default};
      display: inline-flex;
      align-items: center;
      gap: ${r.spacing.spacing_10};

      ${r.fontStyles[$[e][d][n]]};

      ${o&&`
          color: ${l.disabled};
          cursor: not-allowed;
        `};

      ${!o&&`
          &:hover {
            color: ${l.hover};
          }

          &:active {
            color: ${l.active};
          }
        `};

      &:focus-visible {
        outline: 2px solid ${r.palette.primary.default};
      }
    `}}
`,B=b.forwardRef(({isDisabled:r,children:o,size:d="medium",dataTestId:e,onClick:i,variant:n,fontWeight:l="regular",href:t,style:u,icon:c,color:m,...g},f)=>a.jsx(x,{color:m,"data-testid":e??"link",disabled:r,$fontWeight:l,ref:f,size:d,style:u,variant:n,...!r&&{href:t,onClick:i},...g,children:n==="inline"||!c?o:a.jsxs(a.Fragment,{children:[a.jsx("span",{children:o}),a.jsx(k,{code:c,color:"inherit",size:d})]})}));export{B as L};
