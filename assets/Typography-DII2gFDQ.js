import{j as d}from"./jsx-runtime-DMAvRu52.js";import{r as m}from"./index-Dl6G-zuu.js";import{g}from"./index-CL4Xg4Pf.js";import{n as x,d as l}from"./emotion-styled.browser.esm-Dv69Fly8.js";const u=x.p`
  ${({theme:s,fontStyles:o,color:t})=>`
    ${s.fontStyles[o]};
    color: ${t==="unset"||t==="inherit"?t:s.colors[t]||g(t,s)};
   ${s.responsiveFontStyles[o]}
  `};
`,h=m.forwardRef(({children:s,element:o,fontStyles:t,color:e="grey_90",dataTestId:n,style:a,id:p},y)=>{const f=l(),r=o,i=t??(f.fontStyles[r]?r:"body1");return d.jsx(u,{as:o,color:e,"data-testid":n??"typography",fontStyles:i,id:p,ref:y,style:a,children:s})});export{h as T};
