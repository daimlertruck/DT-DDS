var S=Object.defineProperty;var d=(e,t)=>S(e,"name",{value:t,configurable:!0});import{j as o}from"./jsx-runtime-Cgz2XvFB.js";import{r as u}from"./index-CwbBKW39.js";import{f as p,d as w}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";import{T as x}from"./Tooltip-BEOAsAaZ.js";import{I as b}from"./Icon-BrO18bYS.js";const T=24,I=80,j=120,_=112,C=24,E=56,R=p.div`
  display: flex;
  position: relative;
  overflow: visible;
  gap: 8px;

  ${({orientation:e,isLast:t,isDisabled:r})=>e==="horizontal"?`
        flex-direction: column;
        align-items: center;
        flex: 1 1 0;
        min-width: ${j}px;
      `:`
      flex-direction: row;
      padding-bottom: ${t?"0":"8px"};
      cursor: ${r?"not-allowed":"pointer"};
    `}
`,v=p.div`
  display: flex;
  position: relative;

  ${({orientation:e,isLast:t})=>e==="horizontal"?`
        width: 100%;
        flex-direction: row;
        justify-content: center;
      `:`
      flex-direction: column;
      align-self: flex-start;
      min-height: ${t?`${C}px`:`${E}px`};
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

  ${({orientation:e})=>e==="horizontal"?`
        align-items: center;
        text-align: center;
      `:`
        align-items: flex-start;
        text-align: left;
        padding-top: 4px;
      `}
`,m=p.span`
  ${({theme:e,state:t,isActive:r})=>{const n=d(()=>t==="disabled"?e.palette.content.light:t==="error"?e.palette.error.default:e.palette.content.dark,"getColor");return`
      ${r?e.fontStyles.bodyMdBold:e.fontStyles.bodyMdRegular}
      color: ${n()};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}}
`,h=p.span`
  ${({theme:e,state:t})=>{const r=d(()=>t==="disabled"?e.palette.content.light:t==="error"?e.palette.error.default:t==="warning"?e.palette.content.default:e.palette.primary.medium,"getColor");return`
      ${e.fontStyles.bodySmRegular}
      color: ${r()};
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    `}}
`,A=d(({title:e,description:t,state:r,isActive:n,orientation:c})=>{const l=u.useRef(null),i=u.useRef(null),[s,a]=u.useState(!1),[g,y]=u.useState(!1);return u.useEffect(()=>{if(l.current&&e){const f=l.current;a(f.scrollWidth>f.clientWidth)}if(i.current&&t){const f=i.current;y(f.scrollHeight>f.clientHeight)}},[e,t,c]),!e&&!t?null:o.jsxs(k,{orientation:c,children:[e?s?o.jsxs(x,{children:[o.jsx(m,{isActive:n,ref:l,state:r,children:e}),o.jsx(x.Content,{direction:"right",children:e})]}):o.jsx(m,{isActive:n,ref:l,state:r,children:e}):null,t?g?o.jsxs(x,{children:[o.jsx(h,{ref:i,state:r,children:t}),o.jsx(x.Content,{direction:"right",children:t})]}):o.jsx(h,{ref:i,state:r,children:t}):null]})},"StepContent"),H=p.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: transform 0.2s ease;

  ${({theme:e,state:t,isActive:r,variant:n})=>{const c=r?e.palette.primary.light:e.palette.content.contrast,l={completed:{bg:e.palette.primary.default,border:e.palette.primary.default},warning:{bg:e.palette.warning.default,border:"transparent"},error:{bg:e.palette.error.default,border:"transparent"},disabled:{bg:e.palette.content.contrast,border:e.palette.border.medium,text:e.palette.content.light},incomplete:{bg:c,border:e.palette.primary.default,text:e.palette.primary.default}},i=l[t]||l.incomplete,s=t==="disabled"?e.palette.border.medium:e.palette.primary.default;return n==="bullet"&&(t==="incomplete"||t==="disabled")?`
        background-color: ${c};
        border: 1px solid ${s};
        
        &::after {
          content: '';
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: ${t==="disabled"?e.palette.content.light:e.palette.primary.default};
        }
      `:n==="icon"&&t==="disabled"?`
        border: 1px solid ${s};
        
        > i {
          color: ${e.palette.content.light};
        }
      `:`
      background-color: ${i.bg};
      border: 1px solid ${i.border};
      color: ${i.text};
      ${e.fontStyles.bodySmBold}
    `}}
`,N=d(({index:e,state:t,variant:r,isActive:n,icon:c})=>{const l=w(),i=d(()=>t==="completed"?o.jsx(b,{code:"check",color:l.palette.surface.contrast,size:"small"}):t==="warning"?o.jsx(b,{code:"warning",color:l.palette.content.contrast,size:"small"}):t==="error"?o.jsx(b,{code:"error",color:l.palette.content.contrast,size:"small"}):r==="bullet"?null:r==="icon"&&c?c:e+1,"getIndicatorContent");return o.jsx(H,{"data-testid":"step-indicator",isActive:n,state:t,variant:r,children:i()})},"StepIndicator"),L=p.span`
  position: absolute;
  transition: background-color 0.3s ease;

  ${({state:e,orientation:t,theme:r})=>{const n=e==="completed"?`${r.palette.primary.default}`:`${r.palette.primary.light}`;return t==="horizontal"?`
        top: 50%;
        transform: translateY(-50%);
        left: calc(50% + 20px);
        right: calc(-50% + 20px);
        min-width: ${I}px;
        height: ${e==="completed"?"2px":"1px"};
        background-color: ${n};
      `:`
      top: 32px;
      left: 12px;
      width: ${e==="completed"?"2px":"1px"};
      min-height: ${T}px;
      background-color: ${n};
    `}}
`,D=d(({state:e,orientation:t})=>o.jsx(L,{"data-testid":"trail-line",orientation:t,state:e}),"TrailLine"),$=d(({index:e=0,title:t,description:r,state:n="incomplete",isActive:c=!1,variant:l="number",icon:i,isLast:s=!1,orientation:a,dataTestId:g})=>o.jsxs(R,{isDisabled:n==="disabled",isLast:s,orientation:a,children:[o.jsxs(v,{"data-testid":g??`step-${e}`,isLast:s,orientation:a,children:[o.jsx(N,{icon:i,index:e,isActive:c,state:n,variant:l}),!s&&o.jsx(D,{orientation:a,state:n})]}),o.jsx(A,{description:r,isActive:c,orientation:a,state:n,title:t})]}),"Step"),M=p.div`
  display: flex;
  width: 100%;

  ${({orientation:e="vertical"})=>`
    flex-direction: ${e==="horizontal"?"row":"column"};
    align-items: stretch;
  `}
`,z=d(({children:e,orientation:t="vertical",variant:r="number",activeStep:n,dataTestId:c})=>{const l=u.Children.toArray(e),i=l.map((s,a)=>s.type!==$?s:u.cloneElement(s,{...s.props,index:a,variant:r,orientation:t,isLast:a===l.length-1,isActive:s.props.isActive??n===a}));return o.jsx(M,{"data-testid":c??"stepper",orientation:t,children:i})},"Stepper");z.Step=$;export{z as S};
