import{f as d,d as f}from"./emotion-styled.browser.esm-DBghOYGd.js";import{j as s}from"./jsx-runtime-CB_V9I5Y.js";import{I as u}from"./Icon-w916x_k_.js";import{T as y}from"./Typography-Bb7lZ69m.js";import{r as i}from"./index-CTjT7uj6.js";const I=d.ul`
  display: flex;
  flex-direction: column;
  gap: 32px;
  list-style: none;

  ${({theme:e,orientation:t="vertical"})=>`
    @media only screen and (min-width: ${e.breakpoints.mq3d}px) {
      flex-direction: ${t==="horizontal"?"row":"column"}
    }
  `}
`,x=d.span`
  ${({theme:e,color:t,outlined:l,isLarge:a})=>`
    ${e.fontStyles.bodySmRegular}
    color: ${e.palette.content.contrast};
    border: ${e.spacing.spacing_0};
    align-items: center;
    justify-content: center;
    display: flex;
    width: ${a?"24px":"16px"};
    height: ${a?"24px":"16px"};
    border-radius: 50%;
    background-color: ${t==="disabled"?e.palette.content.default:e.palette[t].default};

    ${l&&`
        border: 2px solid ${t==="disabled"?e.palette.content.light:e.palette[t].default};
        color: ${t==="disabled"?e.palette.content.light:e.palette[t].default};
        background-color: ${e.palette.surface.contrast}
      `};
  `}
`,g=({children:e,color:t="informative",dataTestId:l,style:a,outlined:r=!1,isLarge:n=!1})=>s.jsx(x,{color:t,"data-testid":l??"counter",isLarge:n,outlined:r,style:a,children:e}),b=d.li`
  display: flex;
  gap: 12px;
  align-items: center;
`,m=d.span`
  ${({theme:e,color:t})=>`
    ${e.fontStyles.bodyMdRegularSmall};
    color: ${t==="disabled"?e.palette.content.light:e.palette[t].default};
  `}
`,p=({children:e,isActive:t=!1,isCompleted:l=!1,isDisabled:a=!1,isError:r=!1})=>{const n=i.useMemo(()=>i.Children.map(e,o=>o&&i.cloneElement(o,{isActive:t,isCompleted:l,isDisabled:a,isError:r,...o.props})),[e,t,l,a,r]);return s.jsx(b,{children:n})},$=({children:e,isActive:t=!1,isCompleted:l=!1,isDisabled:a=!1,isError:r=!1})=>{const n=f(),o=r?"error":a?"disabled":"primary",c=r?n.palette.error.light:n.palette.primary.light;return s.jsx(g,{color:o,isLarge:!0,outlined:!l,style:{borderWidth:1,...t&&{backgroundColor:c}},children:l?s.jsx(u,{code:"check",color:n.palette.surface.light,size:"small"}):s.jsx(y,{color:o==="disabled"?"content.light":`${o}.default`,element:"span",fontStyles:"bodyXsBold",style:{width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center"},children:e})})};p.Counter=$;const S=({isActive:e,isError:t,isDisabled:l,isCompleted:a})=>t?"error":e||a?"primary":l?"disabled":"secondary";p.Label=({children:e,isActive:t=!1,isCompleted:l=!1,isDisabled:a=!1,isError:r=!1})=>{const n=S({isActive:t,isError:r,isDisabled:a,isCompleted:l});return s.jsx(m,{color:n,children:e})};export{I as S,p as a};
