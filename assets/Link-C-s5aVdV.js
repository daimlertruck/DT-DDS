var y=Object.defineProperty;var s=(r,o)=>y(r,"name",{value:o,configurable:!0});import{j as l}from"./jsx-runtime-Cgz2XvFB.js";import{r as b}from"./index-CwbBKW39.js";import{I as $}from"./Icon-9dVURh2l.js";import{f as k}from"./emotion-styled.browser.esm-CIRWz9XU.js";const v={inline:{large:{regular:"linkLgRegular",bold:"linkLgBold"},medium:{regular:"linkMdRegular",bold:"linkMdBold"},small:{regular:"linkSmRegular",bold:"linkSmBold"}},standalone:{large:{regular:"bodyLgRegular",bold:"bodyLgBold"},medium:{regular:"bodyMdRegular",bold:"bodyMdBold"},small:{regular:"bodySmRegular",bold:"bodySmBold"}}},h=s(r=>({inline:{primary:{default:r.accent.default,hover:r.accent.dark,active:r.accent.medium,disabled:r.content.light},secondary:{default:r.accent.default,hover:r.accent.dark,active:r.accent.medium,disabled:r.content.light}},standalone:{primary:{default:r.primary.default,hover:r.accent.default,active:r.accent.default,disabled:r.primary.light},secondary:{default:r.secondary.default,hover:r.secondary.dark,active:r.secondary.medium,disabled:r.secondary.light}}}),"colorMap"),x=k.a`
  ${({theme:r,$disabled:o,$size:d="medium",$variant:e="standalone",$color:n="primary",$fontWeight:i="regular"})=>{const a=h(r.palette)[e][n];return`
      color: ${a.default};
      display: inline-flex;
      align-items: center;
      gap: ${r.spacing.spacing_10};

      ${r.fontStyles[v[e][d][i]]};

      ${o?`
            color: ${a.disabled};
            cursor: not-allowed;
          `:`
            &:hover {
              color: ${a.hover};
            }

            &:active {
              color: ${a.active};
            }
          `};

      &:focus-visible {
        outline: 2px solid ${r.palette.primary.default};
      }
    `}}
`,B=b.forwardRef(({isDisabled:r,children:o,size:d="medium",dataTestId:e,onClick:n,variant:i,fontWeight:a="regular",href:t,style:u,icon:c,color:m,...g},f)=>l.jsx(x,{$color:m,"data-testid":e??"link",$disabled:r,$fontWeight:a,ref:f,$size:d,style:u,$variant:i,...!r&&{href:t,onClick:n},...g,children:i==="inline"||!c?o:l.jsxs(l.Fragment,{children:[l.jsx("span",{children:o}),l.jsx($,{code:c,color:"inherit",size:d})]})}));export{B as L};
