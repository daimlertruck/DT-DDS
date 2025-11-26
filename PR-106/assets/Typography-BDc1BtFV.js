var d=Object.defineProperty;var a=(t,s)=>d(t,"name",{value:s,configurable:!0});import{j as l}from"./jsx-runtime-Cgz2XvFB.js";import{r as g}from"./index-CwbBKW39.js";import{f as m,d as u}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";import"./typography-B3nKKPHm.js";const c=a((t,s)=>{const[o,r]=t.split(".");return s.palette[o][r]},"getContextualColor"),x=m.p`
  ${({theme:t,fontStyles:s,color:o})=>`
    ${t.fontStyles[s]};
    color: ${o==="unset"||o==="inherit"?o:t.colors[o]||c(o,t)};
   ${t.responsiveFontStyles[s]}
  `};
`,R=g.forwardRef(({children:t,element:s,fontStyles:o,color:r="grey_90",dataTestId:n,...p},y)=>{const i=u(),e=s,f=o??(i.fontStyles[e]?e:"bodyLgRegular");return l.jsx(x,{as:s,color:r,"data-testid":n??"typography",fontStyles:f,ref:y,...p,children:t})});export{R as T};
