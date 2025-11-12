import{j as g}from"./jsx-runtime-CB_V9I5Y.js";import{r as d}from"./index-CTjT7uj6.js";import{f as m,d as l}from"./emotion-styled.browser.esm-DBghOYGd.js";import{g as u}from"./index-D9dZuxfj.js";const x=m.p`
  ${({theme:s,fontStyles:o,color:t})=>`
    ${s.fontStyles[o]};
    color: ${t==="unset"||t==="inherit"?t:s.colors[t]||u(t,s)};
   ${s.responsiveFontStyles[o]}
  `};
`,h=d.forwardRef(({children:s,element:o,fontStyles:t,color:a="grey_90",dataTestId:e,style:p,id:n},y)=>{const f=l(),r=o,i=t??(f.fontStyles[r]?r:"bodyLgRegular");return g.jsx(x,{as:o,color:a,"data-testid":e??"typography",fontStyles:i,id:n,ref:y,style:p,children:s})});export{h as T};
