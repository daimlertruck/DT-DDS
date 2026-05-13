var y=Object.defineProperty;var c=(r,o)=>y(r,"name",{value:o,configurable:!0});import{j as d}from"./jsx-runtime-Cgz2XvFB.js";import{r as b}from"./index-CwbBKW39.js";import{I as $}from"./Icon-9dVURh2l.js";import{f as h,j as k}from"./emotion-styled.browser.esm-CIRWz9XU.js";const v={inline:{large:{regular:"linkLgRegular",bold:"linkLgBold"},medium:{regular:"linkMdRegular",bold:"linkMdBold"},small:{regular:"linkSmRegular",bold:"linkSmBold"}},standalone:{large:{regular:"bodyLgRegular",bold:"bodyLgBold"},medium:{regular:"bodyMdRegular",bold:"bodyMdBold"},small:{regular:"bodySmRegular",bold:"bodySmBold"}}},x=c(r=>({inline:{primary:{default:r.accent.default,hover:r.accent.dark,active:r.accent.medium,disabled:r.content.light},secondary:{default:r.accent.default,hover:r.accent.dark,active:r.accent.medium,disabled:r.content.light}},standalone:{primary:{default:r.primary.default,hover:r.accent.default,active:r.accent.default,disabled:r.primary.light},secondary:{default:r.secondary.default,hover:r.secondary.dark,active:r.secondary.medium,disabled:r.secondary.light}}}),"colorMap"),p=h("a",{shouldForwardProp:c(r=>k(r)&&!r.startsWith("$"),"shouldForwardProp")})`
  ${({theme:r,$disabled:o,$size:l="medium",$variant:e="standalone",$color:n="primary",$fontWeight:i="regular"})=>{const a=x(r.palette)[e][n];return`
      color: ${a.default};
      display: inline-flex;
      align-items: center;
      gap: ${r.spacing.spacing_10};

      ${r.fontStyles[v[e][l][i]]};

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
`,M=b.forwardRef(({isDisabled:r,children:o,size:l="medium",dataTestId:e,onClick:n,variant:i,fontWeight:a="regular",href:t,style:u,icon:s,color:m,...g},f)=>d.jsx(p,{$color:m,"data-testid":e??"link",$disabled:r,$fontWeight:a,ref:f,$size:l,style:u,$variant:i,...!r&&{href:t,onClick:n},...g,children:i==="inline"||!s?o:d.jsxs(d.Fragment,{children:[d.jsx("span",{children:o}),d.jsx($,{code:s,color:"inherit",size:l})]})}));export{M as L};
