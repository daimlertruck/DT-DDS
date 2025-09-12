import{j as g}from"./jsx-runtime-DMAvRu52.js";import{r as d}from"./index-Dl6G-zuu.js";import{g as m}from"./index-DjiMWOYD.js";import{n as l,d as u}from"./emotion-styled.browser.esm-Dv69Fly8.js";const x=l.p`
  ${({theme:s,fontStyles:o,color:t})=>`
    ${s.fontStyles[o]};
    color: ${t==="unset"||t==="inherit"?t:s.colors[t]||m(t,s)};
   ${s.responsiveFontStyles[o]}
  `};
`,h=d.forwardRef(({children:s,element:o,fontStyles:t,color:e="grey_90",dataTestId:a,style:n,id:p},y)=>{const f=u(),r=o,i=t??(f.fontStyles[r]?r:"bodyLgRegular");return g.jsx(x,{as:o,color:e,"data-testid":a??"typography",fontStyles:i,id:p,ref:y,style:n,children:s})});export{h as T};
