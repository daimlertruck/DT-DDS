var S=Object.defineProperty;var d=(t,e)=>S(t,"name",{value:e,configurable:!0});import{j as o}from"./jsx-runtime-Cgz2XvFB.js";import{r as u}from"./index-CwbBKW39.js";import{f as p,d as T}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";import{T as x}from"./Tooltip-CDeFGqHf.js";import{I as b}from"./Icon-BrO18bYS.js";const w=24,I=80,j=120,_=112,C=24,E=56,R=p.div`
  display: flex;
  position: relative;
  overflow: visible;
  gap: 8px;

  ${({orientation:t,isLast:e})=>t==="horizontal"?`
        flex-direction: column;
        align-items: center;
        flex: ${e?"0 0 auto":"1 1 0"};
        min-width: ${e?"auto":`${j}px`};
      `:`
      flex-direction: row;
      padding-bottom: ${e?"0":"8px"};
    `}
`,v=p.div`
  display: flex;
  position: relative;

  ${({orientation:t,isLast:e})=>t==="horizontal"?`
        width: 100%;
        flex-direction: row;
        justify-content: center;
      `:`
      flex-direction: column;
      align-self: flex-start;
      min-height: ${e?`${C}px`:`${E}px`};
    `}
`,k=p.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: ${_}px;

  & > * {
    min-width: 0;
    max-width: 100%;
  }

  ${({orientation:t})=>t==="horizontal"?`
        align-items: center;
        text-align: center;
      `:`
        align-items: flex-start;
        text-align: left;
        padding-top: 4px;
      `}
`,m=p.span`
  ${({theme:t,state:e,isActive:r})=>{const n=d(()=>e==="disabled"?t.palette.content.light:e==="error"?t.palette.error.default:t.palette.content.dark,"getColor");return`
      ${r?t.fontStyles.bodyMdBold:t.fontStyles.bodyMdRegular}
      color: ${n()};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}}
`,h=p.span`
  ${({theme:t,state:e})=>{const r=d(()=>e==="disabled"?t.palette.content.light:e==="error"?t.palette.error.default:e==="warning"?t.palette.content.default:t.palette.primary.medium,"getColor");return`
      ${t.fontStyles.bodySmRegular}
      color: ${r()};
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    `}}
`,A=d(({title:t,description:e,state:r,isActive:n,orientation:c})=>{const l=u.useRef(null),i=u.useRef(null),[a,s]=u.useState(!1),[g,y]=u.useState(!1);return u.useEffect(()=>{if(l.current&&t){const f=l.current;s(f.scrollWidth>f.clientWidth)}if(i.current&&e){const f=i.current;y(f.scrollHeight>f.clientHeight)}},[t,e,c]),!t&&!e?null:o.jsxs(k,{orientation:c,children:[t?a?o.jsxs(x,{children:[o.jsx(m,{isActive:n,ref:l,state:r,children:t}),o.jsx(x.Content,{direction:"right",children:t})]}):o.jsx(m,{isActive:n,ref:l,state:r,children:t}):null,e?g?o.jsxs(x,{children:[o.jsx(h,{ref:i,state:r,children:e}),o.jsx(x.Content,{direction:"right",children:e})]}):o.jsx(h,{ref:i,state:r,children:e}):null]})},"StepContent"),H=p.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: transform 0.2s ease;

  ${({theme:t,state:e,isActive:r,variant:n})=>{const c=r?t.palette.primary.light:t.palette.content.contrast,l={completed:{bg:t.palette.primary.default,border:t.palette.primary.default},warning:{bg:t.palette.warning.default,border:"transparent"},error:{bg:t.palette.error.default,border:"transparent"},disabled:{bg:t.palette.content.contrast,border:t.palette.border.medium,text:t.palette.content.light},incomplete:{bg:c,border:t.palette.primary.default,text:t.palette.primary.default}},i=l[e]||l.incomplete,a=e==="disabled"?t.palette.border.medium:t.palette.primary.default;return n==="bullet"&&(e==="incomplete"||e==="disabled")?`
        background-color: ${c};
        border: 1px solid ${a};
        
        &::after {
          content: '';
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: ${e==="disabled"?t.palette.content.light:t.palette.primary.default};
        }
      `:n==="icon"&&e==="disabled"?`
        border: 1px solid ${a};
        
        > i {
          color: ${t.palette.content.light};
        }
      `:`
      background-color: ${i.bg};
      border: 1px solid ${i.border};
      color: ${i.text};
      ${t.fontStyles.bodySmBold}
    `}}
`,N=d(({index:t,state:e,variant:r,isActive:n,icon:c})=>{const l=T(),i=d(()=>e==="completed"?o.jsx(b,{code:"check",color:l.palette.surface.contrast,size:"small"}):e==="warning"?o.jsx(b,{code:"warning",color:l.palette.content.contrast,size:"small"}):e==="error"?o.jsx(b,{code:"error",color:l.palette.content.contrast,size:"small"}):r==="bullet"?null:r==="icon"&&c?c:t+1,"getIndicatorContent");return o.jsx(H,{"data-testid":"step-indicator",isActive:n,state:e,variant:r,children:i()})},"StepIndicator"),L=p.span`
  position: absolute;
  transition: background-color 0.3s ease;

  ${({state:t,orientation:e,theme:r})=>{const n=t==="completed"?`${r.palette.primary.default}`:`${r.palette.primary.light}`;return e==="horizontal"?`
        top: 50%;
        transform: translateY(-50%);
        left: calc(50% + 20px);
        right: calc(-50% + 20px);
        min-width: ${I}px;
        height: ${t==="completed"?"2px":"1px"};
        background-color: ${n};
      `:`
      top: 32px;
      left: 12px;
      width: ${t==="completed"?"2px":"1px"};
      min-height: ${w}px;
      background-color: ${n};
    `}}
`,M=d(({state:t,orientation:e})=>o.jsx(L,{"data-testid":"trail-line",orientation:e,state:t}),"TrailLine"),$=d(({index:t=0,title:e,description:r,state:n="incomplete",isActive:c=!1,variant:l="number",icon:i,isLast:a=!1,orientation:s,dataTestId:g})=>o.jsxs(R,{orientation:s,children:[o.jsxs(v,{"data-testid":g??`step-${t}`,isLast:a,orientation:s,children:[o.jsx(N,{icon:i,index:t,isActive:c,state:n,variant:l}),!a&&o.jsx(M,{orientation:s,state:n})]}),o.jsx(A,{description:r,isActive:c,orientation:s,state:n,title:e})]}),"Step"),z=p.div`
  display: flex;
  width: 100%;

  ${({orientation:t="vertical"})=>`
    flex-direction: ${t==="horizontal"?"row":"column"};
    align-items: stretch;
  `}
`,D=d(({children:t,orientation:e="vertical",variant:r="number",activeStep:n,dataTestId:c})=>{const l=u.Children.toArray(t),i=l.map((a,s)=>a.type!==$?a:u.cloneElement(a,{...a.props,index:s,variant:r,orientation:e,isLast:s===l.length-1,isActive:a.props.isActive??n===s}));return o.jsx(z,{"data-testid":c??"stepper",orientation:e,children:i})},"Stepper");D.Step=$;export{D as S};
