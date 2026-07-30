var i=Object.defineProperty;var l=(t,o)=>i(t,"name",{value:o,configurable:!0});import{j as u}from"./jsx-runtime-Cgz2XvFB.js";import{r as y}from"./index-CwbBKW39.js";import{f as d,d as g}from"./emotion-styled.browser.esm-CIRWz9XU.js";import"./typography-B3nKKPHm.js";const m=l((t,o)=>{if(!t)return;const r=t.split(".");if(r.length!==2)return;const[n,a]=r,e=o.palette[n];if(!e)return;const s=e[a];if(typeof s=="string")return s},"getContextualColor"),x=d.p`
  ${({theme:t,fontStyles:o,color:r})=>{var s;const n=(s=t.colors)==null?void 0:s[r],a=m(r,t),e=n||a||r;return`
      ${t.fontStyles[o]};
      color: ${e};
      ${t.responsiveFontStyles[o]};
    `}}
`,j=y.forwardRef(({children:t,element:o,fontStyles:r,color:n="content.default",dataTestId:a,...e},s)=>{const f=g(),p=o,c=r??(f.fontStyles[p]?p:"bodyLgRegular");return u.jsx(x,{as:o,color:n,"data-testid":a??"typography",fontStyles:c,ref:s,...e,children:t})});export{j as T};
