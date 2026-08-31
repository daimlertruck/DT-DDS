var k=Object.defineProperty;var f=(e,t)=>k(e,"name",{value:t,configurable:!0});import{o as C}from"./rolldown-runtime-CzYk_CEw.js";import{t as j}from"./react-HNhQAnN4.js";import{o as _,t as x,u as T}from"./emotion-styled.browser.esm-BD_8_ENF.js";import{t as z}from"./src-Cgsrikn0.js";import{t as R}from"./jsx-runtime-Br4tQxt1.js";import"./icon-BVKwuEsa.js";import{t as $}from"./Tooltip-CV1x-ycZ.js";import"./tooltip-B7p4pHEA.js";var p=C(j()),B=x.div`
  display: flex;
  position: relative;
  overflow: visible;
  gap: 8px;

  ${({orientation:e,isLast:t,isDisabled:r})=>e==="horizontal"?`
        flex-direction: column;
        align-items: center;
        flex: 1 1 0;
        min-width: 120px;
      `:`
      flex-direction: row;
      padding-bottom: ${t?"0":"8px"};
      cursor: ${r?"not-allowed":"auto"};
    `}
`,I=x.div`
  display: flex;
  position: relative;

  ${({orientation:e,isLast:t})=>e==="horizontal"?`
        width: 100%;
        flex-direction: row;
        justify-content: center;
      `:`
      flex-direction: column;
      align-self: flex-start;
      min-height: ${t?"24px":"56px"};
    `}
`,M=x.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: ${112}px;

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
`,A=x.span`
  ${({theme:e,state:t,isActive:r})=>{const o=f(()=>t==="disabled"?e.palette.content.light:t==="error"?e.palette.error.default:e.palette.content.dark,"getColor");return`
      ${r?e.fontStyles.bodyMdBold:e.fontStyles.bodyMdRegular}
      color: ${o()};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}}
`,D=x.span`
  ${({theme:e,state:t})=>{const r=f(()=>t==="disabled"?e.palette.content.light:t==="error"?e.palette.error.default:t==="warning"?e.palette.content.default:e.palette.primary.medium,"getColor");return`
      ${e.fontStyles.bodySmRegular}
      color: ${r()};
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    `}}
`,c=R(),E=f(({title:e,description:t,state:r,isActive:o,orientation:n})=>{const i=(0,p.useRef)(null),a=(0,p.useRef)(null),[l,u]=(0,p.useState)(!1),[m,b]=(0,p.useState)(!1);if((0,p.useEffect)(()=>{if(i.current&&e){const d=i.current;u(d.scrollWidth>d.clientWidth)}if(a.current&&t){const d=a.current;b(d.scrollHeight>d.clientHeight)}},[e,t,n]),!e&&!t)return null;const s=f((d,g,w,v,y)=>{if(!d)return null;const S=(0,c.jsx)(v,{...y,ref:g,children:d});return w?(0,c.jsxs)($,{children:[S,(0,c.jsx)($.Content,{direction:"right",children:d})]}):S},"renderContent");return(0,c.jsxs)(M,{orientation:n,children:[s(e,i,l,A,{state:r,isActive:o}),s(t,a,m,D,{state:r})]})},"StepContent");_();var W=x.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: transform 0.2s ease;

  ${({theme:e,state:t,isActive:r,variant:o})=>{const n=r?e.palette.primary.light:e.palette.content.contrast,i={completed:{bg:e.palette.primary.default,border:e.palette.primary.default},warning:{bg:e.palette.warning.default,border:"transparent"},error:{bg:e.palette.error.default,border:"transparent"},disabled:{bg:e.palette.content.contrast,border:e.palette.border.medium,text:e.palette.content.light},incomplete:{bg:n,border:e.palette.primary.default,text:e.palette.primary.default}},a=i[t]||i.incomplete,l=t==="disabled"?e.palette.border.medium:e.palette.primary.default;return o==="bullet"&&(t==="incomplete"||t==="disabled")?`
        background-color: ${n};
        border: 1px solid ${l};
        
        &::after {
          content: '';
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: ${t==="disabled"?e.palette.content.light:e.palette.primary.default};
        }
      `:o==="icon"&&t==="disabled"?`
        border: 1px solid ${l};
        
        > i {
          color: ${e.palette.content.light};
        }
      `:`
      background-color: ${a.bg};
      border: 1px solid ${a.border};
      color: ${a.text};
      ${e.fontStyles.bodySmBold}
    `}}
`,q=f(({index:e,state:t,variant:r,isActive:o,icon:n})=>{const i=T(),a=f(()=>{const l={completed:"check",warning:"warning",error:"error"};return l[t]?(0,c.jsx)(z,{code:l[t],color:i.palette.content.contrast,size:"small"}):r==="bullet"?null:r==="icon"&&n?n:e+1},"getIndicatorContent");return(0,c.jsx)(W,{"data-testid":"step-indicator",isActive:o,state:t,variant:r,children:a()})},"StepIndicator"),G=x.span`
  position: absolute;
  transition: background-color 0.3s ease;

  ${({state:e,orientation:t,theme:r})=>{const o=e==="completed"?`${r.palette.primary.default}`:`${r.palette.primary.light}`;return t==="horizontal"?`
        top: 50%;
        transform: translateY(-50%);
        left: calc(50% + 20px);
        right: calc(-50% + 20px);
        min-width: 80px;
        height: ${e==="completed"?"2px":"1px"};
        background-color: ${o};
      `:`
      top: 32px;
      left: 12px;
      width: ${e==="completed"?"2px":"1px"};
      min-height: 24px;
      background-color: ${o};
    `}}
`,H=f(({state:e,orientation:t})=>(0,c.jsx)(G,{"data-testid":"trail-line",orientation:t,state:e}),"TrailLine"),h=f(({index:e=0,title:t,description:r,state:o="incomplete",isActive:n=!1,variant:i="number",icon:a,isLast:l=!1,orientation:u,dataTestId:m})=>(0,c.jsxs)(B,{isDisabled:o==="disabled",isLast:l,orientation:u,children:[(0,c.jsxs)(I,{"data-testid":m??`step-${e}`,isLast:l,orientation:u,children:[(0,c.jsx)(q,{icon:a,index:e,isActive:n,state:o,variant:i}),!l&&(0,c.jsx)(H,{orientation:u,state:o})]}),(0,c.jsx)(E,{description:r,isActive:n,orientation:u,state:o,title:t})]}),"Step"),L=x.div`
  display: flex;

  ${({orientation:e="vertical"})=>`
    flex-direction: ${e==="horizontal"?"row":"column"};
    width: ${e==="horizontal"?"100%":"fit-content"};
    align-items: stretch;
  `}
`,N=f(({children:e,orientation:t="vertical",variant:r="number",activeStep:o,dataTestId:n})=>{const i=p.Children.toArray(e),a=i.map((l,u)=>l.type!==h?l:(0,p.cloneElement)(l,{...l.props,index:u,variant:r,orientation:t,isLast:u===i.length-1,isActive:l.props.isActive??o===u}));return(0,c.jsx)(L,{"data-testid":n??"stepper",orientation:t,children:a})},"Stepper");N.Step=h;var Z=f(e=>{const{initialStep:t=0,totalSteps:r}=e||{},[o,n]=(0,p.useState)(t),[i,a]=(0,p.useState)(new Set),l=o===0,u=r!==void 0?o===r-1:!1,m=r!==void 0?o<r-1:!0,b=o>0;return{activeStep:o,isFirstStep:l,isLastStep:u,canGoNext:m,canGoBack:b,completedSteps:i,handleNext:(0,p.useCallback)(()=>{m&&n(s=>s+1)},[m]),handleBack:(0,p.useCallback)(()=>{b&&n(s=>s-1)},[b]),handleChangeStep:(0,p.useCallback)(s=>{s>=0&&(r===void 0||s<r)&&n(s)},[r]),handleReset:(0,p.useCallback)(()=>{n(t),a(new Set)},[t]),markStepComplete:(0,p.useCallback)(s=>{a(d=>new Set(d).add(s))},[]),markStepIncomplete:(0,p.useCallback)(s=>{a(d=>{const g=new Set(d);return g.delete(s),g})},[]),isStepComplete:(0,p.useCallback)(s=>i.has(s),[i])}},"useStepper");export{N as n,Z as t};
