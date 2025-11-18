import{j as r}from"./jsx-runtime-CB_V9I5Y.js";import{I as x}from"./Icon-w916x_k_.js";import{r as u}from"./index-CTjT7uj6.js";import{f}from"./emotion-styled.browser.esm-DBghOYGd.js";const m=f.a`
  ${({theme:o,disabled:e,size:n,variant:l="standalone",color:i="accent"})=>{const t=l==="inline"?"accent":i;return`
    color: ${o.palette[t].default};
    display: inline-flex;
    align-items: center;
    gap: ${o.spacing.spacing_20};


    ${n=="large"&&`
        ${o.fontStyles.bodyLgBold}
      `};

    ${n=="medium"&&`
        ${o.fontStyles.bodyMdBold}
      `};

    ${n=="small"&&`
        ${o.fontStyles.bodySmBold}
      `};

    ${e&&`
        color: ${o.palette[t].light};
        cursor: not-allowed;

      ${l==="inline"&&`       
          text-decoration: underline;
        `}
      `};

    ${!e&&`
       ${l==="inline"?` 
           text-decoration: underline;
            
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
  `}}
`,S=u.forwardRef(({isDisabled:o,children:e,size:n="medium",dataTestId:l,onClick:i,variant:t,href:d,style:s,icon:a,color:c,...p},$)=>r.jsx(m,{color:c,"data-testid":l??"link",disabled:o,ref:$,size:n,style:s,variant:t,...!o&&{href:d,onClick:i},...p,children:t==="inline"||!a?e:r.jsxs(r.Fragment,{children:[r.jsx("span",{children:e}),r.jsx(x,{code:a,color:"inherit",size:n})]})}));export{S as L};
