var w=Object.defineProperty;var p=(t,e)=>w(t,"name",{value:e,configurable:!0});import{j as l}from"./jsx-runtime-Cgz2XvFB.js";import{r as f}from"./index-CwbBKW39.js";import{f as u,d as E}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";import{T as m}from"./Tooltip-De69eRNo.js";import{I as R}from"./Icon-BrO18bYS.js";const A=24,L=80,C=120,j=112,N=24,v=56,I=20,H=32,k=12,O=u.div`
  display: flex;
  position: relative;
  overflow: visible;
  gap: 8px;

  ${({orientation:t,isLast:e,isDisabled:r})=>t==="horizontal"?`
        flex-direction: column;
        align-items: center;
        flex: 1 1 0;
        min-width: ${C}px;
      `:`
      flex-direction: row;
      padding-bottom: ${e?"0":"8px"};
      cursor: ${r?"not-allowed":"pointer"};
    `}
`,M=u.div`
  display: flex;
  position: relative;

  ${({orientation:t,isLast:e})=>t==="horizontal"?`
        width: 100%;
        flex-direction: row;
        justify-content: center;
      `:`
      flex-direction: column;
      align-self: flex-start;
      min-height: ${e?`${N}px`:`${v}px`};
    `}
`,D=u.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: ${j}px;

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
`,z=u.span`
  ${({theme:t,state:e,isActive:r})=>{const o=p(()=>e==="disabled"?t.palette.content.light:e==="error"?t.palette.error.default:t.palette.content.dark,"getColor");return`
      ${r?t.fontStyles.bodyMdBold:t.fontStyles.bodyMdRegular}
      color: ${o()};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}}
`,F=u.span`
  ${({theme:t,state:e})=>{const r=p(()=>e==="disabled"?t.palette.content.light:e==="error"?t.palette.error.default:e==="warning"?t.palette.content.default:t.palette.primary.medium,"getColor");return`
      ${t.fontStyles.bodySmRegular}
      color: ${r()};
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    `}}
`,W=p(({title:t,description:e,state:r,isActive:o,orientation:i})=>{const s=f.useRef(null),a=f.useRef(null),[n,c]=f.useState(!1),[x,h]=f.useState(!1);if(f.useEffect(()=>{if(s.current&&t){const d=s.current;c(d.scrollWidth>d.clientWidth)}if(a.current&&e){const d=a.current;h(d.scrollHeight>d.clientHeight)}},[t,e,i]),!t&&!e)return null;const g=p((d,b,y,T,$)=>{if(!d)return null;const _=l.jsx(T,{...$,ref:b,children:d});return y?l.jsxs(m,{children:[l.jsx(T,{...$,ref:b,children:d}),l.jsx(m.Content,{direction:"right",children:d})]}):_},"renderContent");return l.jsxs(D,{orientation:i,children:[g(t,s,n,z,{state:r,isActive:o}),g(e,a,x,F,{state:r})]})},"StepContent"),V=u.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: transform 0.2s ease;

  ${({theme:t,state:e,isActive:r,variant:o})=>{const i=r?t.palette.primary.light:t.palette.content.contrast,s={completed:{bg:t.palette.primary.default,border:t.palette.primary.default},warning:{bg:t.palette.warning.default,border:"transparent"},error:{bg:t.palette.error.default,border:"transparent"},disabled:{bg:t.palette.content.contrast,border:t.palette.border.medium,text:t.palette.content.light},incomplete:{bg:i,border:t.palette.primary.default,text:t.palette.primary.default}},a=s[e]||s.incomplete,n=e==="disabled"?t.palette.border.medium:t.palette.primary.default;return o==="bullet"&&(e==="incomplete"||e==="disabled")?`
        background-color: ${i};
        border: 1px solid ${n};
        
        &::after {
          content: '';
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: ${e==="disabled"?t.palette.content.light:t.palette.primary.default};
        }
      `:o==="icon"&&e==="disabled"?`
        border: 1px solid ${n};
        
        > i {
          color: ${t.palette.content.light};
        }
      `:`
      background-color: ${a.bg};
      border: 1px solid ${a.border};
      color: ${a.text};
      ${t.fontStyles.bodySmBold}
    `}}
`,B=p(({index:t,state:e,variant:r,isActive:o,icon:i})=>{const s=E(),a=p(()=>{const n={completed:"check",warning:"warning",error:"error"};return n[e]?l.jsx(R,{code:n[e],color:s.palette.content.contrast,size:"small"}):r==="bullet"?null:r==="icon"&&i?i:t+1},"getIndicatorContent");return l.jsx(V,{"data-testid":"step-indicator",isActive:o,state:e,variant:r,children:a()})},"StepIndicator"),P=u.span`
  position: absolute;
  transition: background-color 0.3s ease;

  ${({state:t,orientation:e,theme:r})=>{const o=t==="completed"?`${r.palette.primary.default}`:`${r.palette.primary.light}`;return e==="horizontal"?`
        top: 50%;
        transform: translateY(-50%);
        left: calc(50% + ${I}px);
        right: calc(-50% + ${I}px);
        min-width: ${L}px;
        height: ${t==="completed"?"2px":"1px"};
        background-color: ${o};
      `:`
      top: ${H}px;
      left: ${k}px;
      width: ${t==="completed"?"2px":"1px"};
      min-height: ${A}px;
      background-color: ${o};
    `}}
`,G=p(({state:t,orientation:e})=>l.jsx(P,{"data-testid":"trail-line",orientation:e,state:t}),"TrailLine"),S=p(({index:t=0,title:e,description:r,state:o="incomplete",isActive:i=!1,variant:s="number",icon:a,isLast:n=!1,orientation:c,dataTestId:x})=>l.jsxs(O,{isDisabled:o==="disabled",isLast:n,orientation:c,children:[l.jsxs(M,{"data-testid":x??`step-${t}`,isLast:n,orientation:c,children:[l.jsx(B,{icon:a,index:t,isActive:i,state:o,variant:s}),!n&&l.jsx(G,{orientation:c,state:o})]}),l.jsx(W,{description:r,isActive:i,orientation:c,state:o,title:e})]}),"Step"),Z=u.div`
  display: flex;

  ${({orientation:t="vertical"})=>`
    flex-direction: ${t==="horizontal"?"row":"column"};
    width: ${t==="horizontal"?"100%":"fit-content"};
    align-items: stretch;
  `}
`,X=p(({children:t,orientation:e="vertical",variant:r="number",activeStep:o,dataTestId:i})=>{const s=f.Children.toArray(t),a=s.map((n,c)=>n.type!==S?n:f.cloneElement(n,{...n.props,index:c,variant:r,orientation:e,isLast:c===s.length-1,isActive:n.props.isActive??o===c}));return l.jsx(Z,{"data-testid":i??"stepper",orientation:e,children:a})},"Stepper");X.Step=S;export{X as S};
