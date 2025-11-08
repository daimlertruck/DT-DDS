import{j as d}from"./jsx-runtime-CB_V9I5Y.js";import{r as m}from"./index-CTjT7uj6.js";import{g as l}from"./index-D9dZuxfj.js";import{f as u,d as x}from"./emotion-styled.browser.esm-DBghOYGd.js";const c=u.p`
  ${({theme:s,fontStyles:o,color:t})=>`
    ${s.fontStyles[o]};
    color: ${t==="unset"||t==="inherit"?t:s.colors[t]||l(t,s)};
   ${s.responsiveFontStyles[o]}
  `};
`,j=m.forwardRef(({children:s,element:o,fontStyles:t,color:a="grey_90",dataTestId:e,style:p,id:n,className:y},f)=>{const i=x(),r=o,g=t??(i.fontStyles[r]?r:"bodyLgRegular");return d.jsx(c,{as:o,className:y,color:a,"data-testid":e??"typography",fontStyles:g,id:n,ref:f,style:p,children:s})});export{j as T};
