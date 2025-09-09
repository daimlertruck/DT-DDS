import{j as r}from"./jsx-runtime-DMAvRu52.js";import{I as m}from"./Icon-87Ryblgq.js";import{r as u}from"./index-Dl6G-zuu.js";import{n as $}from"./emotion-styled.browser.esm-Dv69Fly8.js";const f=$.a`
  ${({theme:o,disabled:n,size:e,variant:l="standalone",color:i="accent"})=>{const t=l==="inline"?"accent":i;return`
    color: ${o.palette[t].default};
    display: inline-flex;
    align-items: center;
    gap: ${o.spacing["5xs"]};

    ${n&&`
        color: ${o.palette[t].light};
        cursor: not-allowed;

      ${l==="inline"&&`       
          text-decoration: underline !important;
        `}
      `};

    ${!n&&`
       ${l==="inline"?` 
           text-decoration: underline !important;
            
           &:hover {
             color: ${o.palette[t].medium};
           }
         `:`
        &:hover {
          text-decoration: underline;
        }
        
        &:has(span):hover {
          text-decoration: none; 
          
          span {
            text-decoration: underline;
          }
        }

        &:active {
          color: ${o.palette[t].dark};
          text-decoration: none;
        }`}
      `};

    &:focus-visible {
      outline: 2px solid ${o.palette.primary.default};
    }

    ${e=="large"&&`
        ${o.fontStyles.body1Bold}
      `};

    ${e=="medium"&&`
        ${o.fontStyles.body2Bold}
      `};

    ${e=="small"&&`
        ${o.fontStyles.body3Bold}
      `};
  `}}
`,b=u.forwardRef(({isDisabled:o,children:n,size:e="medium",dataTestId:l,onClick:i,variant:t,href:d,style:s,icon:a,color:c,...p},x)=>r.jsx(f,{color:c,"data-testid":l??"link",disabled:o,ref:x,size:e,style:s,variant:t,...!o&&{href:d,onClick:i},...p,children:t==="inline"||!a?n:r.jsxs(r.Fragment,{children:[r.jsx("span",{children:n}),r.jsx(m,{code:a,color:"inherit",size:y[e]})]})})),y={small:"xs",medium:"s",large:"l"};export{b as L};
