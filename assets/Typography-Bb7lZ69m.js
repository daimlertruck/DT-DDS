import{j as i}from"./jsx-runtime-CB_V9I5Y.js";import{r as g}from"./index-CTjT7uj6.js";import{g as d}from"./index-D9dZuxfj.js";import{f as m,d as l}from"./emotion-styled.browser.esm-DBghOYGd.js";const u=m.p`
  ${({theme:s,fontStyles:o,color:t})=>`
    ${s.fontStyles[o]};
    color: ${t==="unset"||t==="inherit"?t:s.colors[t]||d(t,s)};
   ${s.responsiveFontStyles[o]}
  `};
`,$=g.forwardRef(({children:s,element:o,fontStyles:t,color:a="grey_90",dataTestId:e,...p},n)=>{const y=l(),r=o,f=t??(y.fontStyles[r]?r:"bodyLgRegular");return i.jsx(u,{as:o,color:a,"data-testid":e??"typography",fontStyles:f,ref:n,...p,children:s})});export{$ as T};
