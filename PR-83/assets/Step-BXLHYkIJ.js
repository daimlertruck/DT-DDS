import{s as d,e as f}from"./emotion-styled.browser.esm-BMKZqQy6.js";import{j as s}from"./jsx-runtime-CB_V9I5Y.js";import{I as u}from"./Icon-BebqvW7_.js";import{T as y}from"./Typography-CxOo5OZe.js";import{r as i}from"./index-CTjT7uj6.js";const I=d.ul`
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
  ${({theme:e,color:t,outlined:l,isLarge:r})=>`
    ${e.fontStyles.bodySmRegular}
    color: ${e.palette.content.contrast};
    border: ${e.spacing.spacing_0};
    align-items: center;
    justify-content: center;
    display: flex;
    width: ${r?"24px":"16px"};
    height: ${r?"24px":"16px"};
    border-radius: 50%;
    background-color: ${t==="disabled"?e.palette.content.default:e.palette[t].default};

    ${l&&`
        border: 2px solid ${t==="disabled"?e.palette.content.light:e.palette[t].default};
        color: ${t==="disabled"?e.palette.content.light:e.palette[t].default};
        background-color: ${e.palette.surface.contrast}
      `};
  `}
`,g=({children:e,color:t="informative",dataTestId:l,style:r,outlined:a=!1,isLarge:n=!1})=>s.jsx(x,{color:t,"data-testid":l??"counter",isLarge:n,outlined:a,style:r,children:e}),b=d.li`
  display: flex;
  gap: 12px;
  align-items: center;
`,m=d.span`
  ${({theme:e,color:t})=>`
    ${e.fontStyles.bodyMdRegularSmall};
    color: ${t==="disabled"?e.palette.content.light:e.palette[t].default};
  `}
`,p=({children:e,isActive:t=!1,isCompleted:l=!1,isDisabled:r=!1,isError:a=!1})=>{const n=i.useMemo(()=>i.Children.map(e,o=>o&&i.cloneElement(o,{isActive:t,isCompleted:l,isDisabled:r,isError:a,...o.props})),[e,t,l,r,a]);return s.jsx(b,{children:n})},$=({children:e,isActive:t=!1,isCompleted:l=!1,isDisabled:r=!1,isError:a=!1})=>{const n=f(),o=a?"error":r?"disabled":"primary",c=a?n.palette.error.light:n.palette.primary.light;return s.jsx(g,{color:o,isLarge:!0,outlined:!l,style:{borderWidth:1,...t&&{backgroundColor:c}},children:l?s.jsx(u,{code:"check",color:n.palette.surface.light,size:"s"}):s.jsx(y,{color:o==="disabled"?"content.light":`${o}.default`,element:"span",fontStyles:"bodyXsBold",style:{width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center"},children:e})})};p.Counter=$;const S=({isActive:e,isError:t,isDisabled:l,isCompleted:r})=>t?"error":e||r?"primary":l?"disabled":"secondary";p.Label=({children:e,isActive:t=!1,isCompleted:l=!1,isDisabled:r=!1,isError:a=!1})=>{const n=S({isActive:t,isError:a,isDisabled:r,isCompleted:l});return s.jsx(m,{color:n,children:e})};export{I as S,p as a};
