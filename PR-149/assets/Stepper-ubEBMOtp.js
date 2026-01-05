var w=Object.defineProperty;var d=(t,e)=>w(t,"name",{value:e,configurable:!0});import{j as a}from"./jsx-runtime-Cgz2XvFB.js";import{r as f}from"./index-CwbBKW39.js";import{f as u,d as E}from"./emotion-styled.browser.esm-CIRWz9XU.js";import{T}from"./Tooltip-DcNZzL-g.js";import{I as R}from"./Icon-BWIy_dZb.js";const A=24,C=80,L=120,j=112,N=24,v=56,m=20,H=32,k=12,O=u.div`
  display: flex;
  position: relative;
  overflow: visible;
  gap: 8px;

  ${({orientation:t,isLast:e,isDisabled:r})=>t==="horizontal"?`
        flex-direction: column;
        align-items: center;
        flex: 1 1 0;
        min-width: ${L}px;
      `:`
      flex-direction: row;
      padding-bottom: ${e?"0":"8px"};
      cursor: ${r?"not-allowed":"auto"};
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
  ${({theme:t,state:e,isActive:r})=>{const o=d(()=>e==="disabled"?t.palette.content.light:e==="error"?t.palette.error.default:t.palette.content.dark,"getColor");return`
      ${r?t.fontStyles.bodyMdBold:t.fontStyles.bodyMdRegular}
      color: ${o()};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}}
`,F=u.span`
  ${({theme:t,state:e})=>{const r=d(()=>e==="disabled"?t.palette.content.light:e==="error"?t.palette.error.default:e==="warning"?t.palette.content.default:t.palette.primary.medium,"getColor");return`
      ${t.fontStyles.bodySmRegular}
      color: ${r()};
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    `}}
`,W=d(({title:t,description:e,state:r,isActive:o,orientation:l})=>{const i=f.useRef(null),s=f.useRef(null),[n,c]=f.useState(!1),[x,I]=f.useState(!1);if(f.useEffect(()=>{if(i.current&&t){const p=i.current;c(p.scrollWidth>p.clientWidth)}if(s.current&&e){const p=s.current;I(p.scrollHeight>p.clientHeight)}},[t,e,l]),!t&&!e)return null;const g=d((p,S,y,h,_)=>{if(!p)return null;const b=a.jsx(h,{..._,ref:S,children:p});return y?a.jsxs(T,{children:[b,a.jsx(T.Content,{direction:"right",children:p})]}):b},"renderContent");return a.jsxs(D,{orientation:l,children:[g(t,i,n,z,{state:r,isActive:o}),g(e,s,x,F,{state:r})]})},"StepContent"),P=u.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: transform 0.2s ease;

  ${({theme:t,state:e,isActive:r,variant:o})=>{const l=r?t.palette.primary.light:t.palette.content.contrast,i={completed:{bg:t.palette.primary.default,border:t.palette.primary.default},warning:{bg:t.palette.warning.default,border:"transparent"},error:{bg:t.palette.error.default,border:"transparent"},disabled:{bg:t.palette.content.contrast,border:t.palette.border.medium,text:t.palette.content.light},incomplete:{bg:l,border:t.palette.primary.default,text:t.palette.primary.default}},s=i[e]||i.incomplete,n=e==="disabled"?t.palette.border.medium:t.palette.primary.default;return o==="bullet"&&(e==="incomplete"||e==="disabled")?`
        background-color: ${l};
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
      background-color: ${s.bg};
      border: 1px solid ${s.border};
      color: ${s.text};
      ${t.fontStyles.bodySmBold}
    `}}
`,V=d(({index:t,state:e,variant:r,isActive:o,icon:l})=>{const i=E(),s=d(()=>{const n={completed:"check",warning:"warning",error:"error"};return n[e]?a.jsx(R,{code:n[e],color:i.palette.content.contrast,size:"small"}):r==="bullet"?null:r==="icon"&&l?l:t+1},"getIndicatorContent");return a.jsx(P,{"data-testid":"step-indicator",isActive:o,state:e,variant:r,children:s()})},"StepIndicator"),B=u.span`
  position: absolute;
  transition: background-color 0.3s ease;

  ${({state:t,orientation:e,theme:r})=>{const o=t==="completed"?`${r.palette.primary.default}`:`${r.palette.primary.light}`;return e==="horizontal"?`
        top: 50%;
        transform: translateY(-50%);
        left: calc(50% + ${m}px);
        right: calc(-50% + ${m}px);
        min-width: ${C}px;
        height: ${t==="completed"?"2px":"1px"};
        background-color: ${o};
      `:`
      top: ${H}px;
      left: ${k}px;
      width: ${t==="completed"?"2px":"1px"};
      min-height: ${A}px;
      background-color: ${o};
    `}}
`,G=d(({state:t,orientation:e})=>a.jsx(B,{"data-testid":"trail-line",orientation:e,state:t}),"TrailLine"),$=d(({index:t=0,title:e,description:r,state:o="incomplete",isActive:l=!1,variant:i="number",icon:s,isLast:n=!1,orientation:c,dataTestId:x})=>a.jsxs(O,{isDisabled:o==="disabled",isLast:n,orientation:c,children:[a.jsxs(M,{"data-testid":x??`step-${t}`,isLast:n,orientation:c,children:[a.jsx(V,{icon:s,index:t,isActive:l,state:o,variant:i}),!n&&a.jsx(G,{orientation:c,state:o})]}),a.jsx(W,{description:r,isActive:l,orientation:c,state:o,title:e})]}),"Step"),Z=u.div`
  display: flex;

  ${({orientation:t="vertical"})=>`
    flex-direction: ${t==="horizontal"?"row":"column"};
    width: ${t==="horizontal"?"100%":"fit-content"};
    align-items: stretch;
  `}
`,X=d(({children:t,orientation:e="vertical",variant:r="number",activeStep:o,dataTestId:l})=>{const i=f.Children.toArray(t),s=i.map((n,c)=>n.type!==$?n:f.cloneElement(n,{...n.props,index:c,variant:r,orientation:e,isLast:c===i.length-1,isActive:n.props.isActive??o===c}));return a.jsx(Z,{"data-testid":l??"stepper",orientation:e,children:s})},"Stepper");X.Step=$;export{X as S};
