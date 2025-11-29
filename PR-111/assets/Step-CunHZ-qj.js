var u=Object.defineProperty;var d=(e,t)=>u(e,"name",{value:t,configurable:!0});import{f as i,d as y}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";import{j as s}from"./jsx-runtime-Cgz2XvFB.js";import{r as p}from"./index-CwbBKW39.js";import{I as x}from"./Icon-BrO18bYS.js";import{T as g}from"./Typography-BDc1BtFV.js";const z=i.ul`
  display: flex;
  flex-direction: column;
  gap: 32px;
  list-style: none;

  ${({theme:e,orientation:t="vertical"})=>`
    @media only screen and (min-width: ${e.breakpoints.mq3d}px) {
      flex-direction: ${t==="horizontal"?"row":"column"}
    }
  `}
`,b=i.span`
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
`,m=d(({children:e,color:t="informative",dataTestId:l,style:a,outlined:r=!1,isLarge:n=!1})=>s.jsx(b,{color:t,"data-testid":l??"counter",isLarge:n,outlined:r,style:a,children:e}),"Counter"),$=i.li`
  display: flex;
  gap: 12px;
  align-items: center;
`,S=i.span`
  ${({theme:e,color:t})=>`
    ${e.fontStyles.bodyMdRegularSmall};
    color: ${t==="disabled"?e.palette.content.light:e.palette[t].default};
  `}
`,c=d(({children:e,isActive:t=!1,isCompleted:l=!1,isDisabled:a=!1,isError:r=!1})=>{const n=p.useMemo(()=>p.Children.map(e,o=>o&&p.cloneElement(o,{isActive:t,isCompleted:l,isDisabled:a,isError:r,...o.props})),[e,t,l,a,r]);return s.jsx($,{children:n})},"Step"),h=d(({children:e,isActive:t=!1,isCompleted:l=!1,isDisabled:a=!1,isError:r=!1})=>{const n=y(),o=r?"error":a?"disabled":"primary",f=r?n.palette.error.light:n.palette.primary.light;return s.jsx(m,{color:o,isLarge:!0,outlined:!l,style:{borderWidth:1,...t&&{backgroundColor:f}},children:l?s.jsx(x,{code:"check",color:n.palette.surface.light,size:"small"}):s.jsx(g,{color:o==="disabled"?"content.light":`${o}.default`,element:"span",fontStyles:"bodyXsBold",style:{width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center"},children:e})})},"StepCounter");c.Counter=h;const j=d(({isActive:e,isError:t,isDisabled:l,isCompleted:a})=>t?"error":e||a?"primary":l?"disabled":"secondary","labelColor");c.Label=({children:e,isActive:t=!1,isCompleted:l=!1,isDisabled:a=!1,isError:r=!1})=>{const n=j({isActive:t,isError:r,isDisabled:a,isCompleted:l});return s.jsx(S,{color:n,children:e})};export{z as S,c as a};
