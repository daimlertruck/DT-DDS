import{j as g}from"./jsx-runtime-CB_V9I5Y.js";import{r as m}from"./index-CTjT7uj6.js";import{g as d}from"./index-D9dZuxfj.js";import{s as l,e as u}from"./emotion-styled.browser.esm-BMKZqQy6.js";const x=l.p`
  ${({theme:s,fontStyles:o,color:t})=>`
    ${s.fontStyles[o]};
    color: ${t==="unset"||t==="inherit"?t:s.colors[t]||d(t,s)};
   ${s.responsiveFontStyles[o]}
  `};
`,h=m.forwardRef(({children:s,element:o,fontStyles:t,color:e="grey_90",dataTestId:a,style:p,id:n},y)=>{const f=u(),r=o,i=t??(f.fontStyles[r]?r:"bodyLgRegular");return g.jsx(x,{as:o,color:e,"data-testid":a??"typography",fontStyles:i,id:n,ref:y,style:p,children:s})});export{h as T};
