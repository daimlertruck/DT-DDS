import{j as r}from"./jsx-runtime-DMAvRu52.js";import{I as $}from"./Icon-87Ryblgq.js";import{r as u}from"./index-Dl6G-zuu.js";import{n as m}from"./emotion-styled.browser.esm-Dv69Fly8.js";const f=m.a`
  ${({theme:o,disabled:t,size:n,variant:l="standalone",color:i="accent"})=>{const e=l==="inline"?"accent":i;return`
    color: ${o.palette[e].default};
    display: inline-flex;
    align-items: center;
    gap: ${o.spacing["5xs"]};


    ${n=="large"&&`
        ${o.fontStyles.body1Bold}
      `};

    ${n=="medium"&&`
        ${o.fontStyles.body2Bold}
      `};

    ${n=="small"&&`
        ${o.fontStyles.body3Bold}
      `};

    ${t&&`
        color: ${o.palette[e].light};
        cursor: not-allowed;

      ${l==="inline"&&`       
          text-decoration: underline;
        `}
      `};

    ${!t&&`
       ${l==="inline"?` 
           text-decoration: underline;
            
           &:hover {
             color: ${o.palette[e].medium};
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
          color: ${o.palette[e].dark};
          text-decoration: none;
        }`}
      `};

    &:focus-visible {
      outline: 2px solid ${o.palette.primary.default};
    }
  `}}
`,b=u.forwardRef(({isDisabled:o,children:t,size:n="medium",dataTestId:l,onClick:i,variant:e,href:s,style:d,icon:a,color:c,...p},x)=>r.jsx(f,{color:c,"data-testid":l??"link",disabled:o,ref:x,size:n,style:d,variant:e,...!o&&{href:s,onClick:i},...p,children:e==="inline"||!a?t:r.jsxs(r.Fragment,{children:[r.jsx("span",{children:t}),r.jsx($,{code:a,color:"inherit",size:y[n]})]})})),y={small:"xs",medium:"s",large:"l"};export{b as L};
