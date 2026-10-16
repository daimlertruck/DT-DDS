var oe=Object.defineProperty;var r=(e,t)=>oe(e,"name",{value:t,configurable:!0});import{n as i}from"./rolldown-runtime-CzYk_CEw.js";import{t as $}from"./react-HNhQAnN4.js";import{c as le,f as de,n as f,t as P}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{n as me}from"./src-DQMELJtN.js";import{t as _}from"./jsx-runtime-Br4tQxt1.js";import{t as ue}from"./icon-O_kaPnXc.js";import{t as q}from"./Tooltip-Z67Qh4Hj.js";import{t as fe}from"./tooltip-Djm682oV.js";var j,A;function R(){return(R=i((()=>{P(),j=f.div`
  display: flex;
  position: relative;
  overflow: visible;
  gap: 8px;

  ${({orientation:e,isLast:t,isDisabled:a})=>e==="horizontal"?`
        flex-direction: column;
        align-items: center;
        flex: 1 1 0;
        min-width: 120px;
      `:`
      flex-direction: row;
      padding-bottom: ${t?"0":"8px"};
      cursor: ${a?"not-allowed":"auto"};
    `}
`,A=f.div`
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
`})))()}r(R,"init_Step_styled");var z,M,O;function W(){return(W=i((()=>{P(),z=f.div`
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
`,M=f.span`
  ${({theme:e,state:t,isActive:a})=>{const s=r(()=>t==="disabled"?e.palette.content.light:t==="error"?e.palette.error.default:e.palette.content.dark,"getColor");return`
      ${a?e.fontStyles.bodyMdBold:e.fontStyles.bodyMdRegular}
      color: ${s()};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}}
`,O=f.span`
  ${({theme:e,state:t})=>{const a=r(()=>t==="disabled"?e.palette.content.light:t==="error"?e.palette.error.default:t==="warning"?e.palette.content.default:e.palette.primary.medium,"getColor");return`
      ${e.fontStyles.bodySmRegular}
      color: ${a()};
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    `}}
`})))()}r(W,"init_StepContent_styled");var S,x,b;function E(){return(E=i((()=>{S=$(),fe(),W(),x=_(),b=r(({title:e,description:t,state:a,isActive:s,orientation:p})=>{const c=(0,S.useRef)(null),o=(0,S.useRef)(null),[n,m]=(0,S.useState)(!1),[g,y]=(0,S.useState)(!1);if((0,S.useEffect)(()=>{if(c.current&&e){const d=c.current;m(d.scrollWidth>d.clientWidth)}if(o.current&&t){const d=o.current;y(d.scrollHeight>d.clientHeight)}},[e,t,p]),!e&&!t)return null;const l=r((d,N,pe,ie,ce)=>{if(!d)return null;const V=(0,x.jsx)(ie,{...ce,ref:N,children:d});return pe?(0,x.jsxs)(q,{children:[V,(0,x.jsx)(q.Content,{direction:"right",children:d})]}):V},"renderContent");return(0,x.jsxs)(z,{orientation:p,children:[l(e,c,n,M,{state:a,isActive:s}),l(t,o,g,O,{state:a})]})},"StepContent");try{b.displayName="StepContent",b.__docgenInfo={description:"",displayName:"StepContent",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/stepper/src/components/StepContent/StepContent.tsx",methods:[],props:{title:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/components/StepContent/StepContent.tsx",name:"StepContentProps"}],description:"",name:"title",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/components/StepContent/StepContent.tsx",name:"StepContentProps"},required:!1,tags:{},type:{name:"string | undefined"}},description:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/components/StepContent/StepContent.tsx",name:"StepContentProps"}],description:"",name:"description",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/components/StepContent/StepContent.tsx",name:"StepContentProps"},required:!1,tags:{},type:{name:"string | undefined"}},state:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/components/StepContent/StepContent.tsx",name:"StepContentProps"}],description:"",name:"state",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/components/StepContent/StepContent.tsx",name:"StepContentProps"},required:!0,tags:{},type:{name:"StepState"}},isActive:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/components/StepContent/StepContent.tsx",name:"StepContentProps"}],description:"",name:"isActive",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/components/StepContent/StepContent.tsx",name:"StepContentProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},orientation:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/components/StepContent/StepContent.tsx",name:"StepContentProps"}],description:"",name:"orientation",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/components/StepContent/StepContent.tsx",name:"StepContentProps"},required:!1,tags:{},type:{name:"Orientation | undefined"}}},tags:{}}}catch{}})))()}r(E,"init_StepContent");function G(){return(G=i((()=>{E()})))()}r(G,"init_StepContent$1");var H;function F(){return(F=i((()=>{P(),H=f.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: transform 0.2s ease;

  ${({theme:e,state:t,isActive:a,variant:s})=>{const p=a?e.palette.primary.light:e.palette.content.contrast,c={completed:{bg:e.palette.primary.default,border:e.palette.primary.default},warning:{bg:e.palette.warning.default,border:"transparent"},error:{bg:e.palette.error.default,border:"transparent"},disabled:{bg:e.palette.content.contrast,border:e.palette.border.medium,text:e.palette.content.light},incomplete:{bg:p,border:e.palette.primary.default,text:e.palette.primary.default}},o=c[t]||c.incomplete,n=t==="disabled"?e.palette.border.medium:e.palette.primary.default;return s==="bullet"&&(t==="incomplete"||t==="disabled")?`
        background-color: ${p};
        border: 1px solid ${n};
        
        &::after {
          content: '';
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: ${t==="disabled"?e.palette.content.light:e.palette.primary.default};
        }
      `:s==="icon"&&t==="disabled"?`
        border: 1px solid ${n};
        
        > i {
          color: ${e.palette.content.light};
        }
      `:`
      background-color: ${o.bg};
      border: 1px solid ${o.border};
      color: ${o.text};
      ${e.fontStyles.bodySmBold}
    `}}
`})))()}r(F,"init_StepIndicator_styled");var v,h;function Y(){return(Y=i((()=>{le(),ue(),F(),v=_(),h=r(({index:e,state:t,variant:a,isActive:s,icon:p})=>{const c=de(),o=r(()=>{const n={completed:"check",warning:"warning",error:"error"};return n[t]?(0,v.jsx)(me,{code:n[t],color:c.palette.content.contrast,size:"small"}):a==="bullet"?null:a==="icon"&&p?p:e+1},"getIndicatorContent");return(0,v.jsx)(H,{"data-testid":"step-indicator",isActive:s,state:t,variant:a,children:o()})},"StepIndicator");try{h.displayName="StepIndicator",h.__docgenInfo={description:"",displayName:"StepIndicator",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/stepper/src/components/StepIndicator/StepIndicator.tsx",methods:[],props:{index:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/components/StepIndicator/StepIndicator.tsx",name:"StepIndicatorProps"}],description:"",name:"index",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/components/StepIndicator/StepIndicator.tsx",name:"StepIndicatorProps"},required:!0,tags:{},type:{name:"number"}},state:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/components/StepIndicator/StepIndicator.tsx",name:"StepIndicatorProps"}],description:"",name:"state",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/components/StepIndicator/StepIndicator.tsx",name:"StepIndicatorProps"},required:!0,tags:{},type:{name:"StepState"}},variant:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/components/StepIndicator/StepIndicator.tsx",name:"StepIndicatorProps"}],description:"",name:"variant",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/components/StepIndicator/StepIndicator.tsx",name:"StepIndicatorProps"},required:!0,tags:{},type:{name:"StepVariant"}},isActive:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/components/StepIndicator/StepIndicator.tsx",name:"StepIndicatorProps"}],description:"",name:"isActive",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/components/StepIndicator/StepIndicator.tsx",name:"StepIndicatorProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},icon:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/components/StepIndicator/StepIndicator.tsx",name:"StepIndicatorProps"}],description:"",name:"icon",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/components/StepIndicator/StepIndicator.tsx",name:"StepIndicatorProps"},required:!1,tags:{},type:{name:"ReactNode"}}},tags:{}}}catch{}})))()}r(Y,"init_StepIndicator");function J(){return(J=i((()=>{Y()})))()}r(J,"init_StepIndicator$1");var K;function Q(){return(Q=i((()=>{P(),K=f.span`
  position: absolute;
  transition: background-color 0.3s ease;

  ${({state:e,orientation:t,theme:a})=>{const s=e==="completed"?`${a.palette.primary.default}`:`${a.palette.primary.light}`;return t==="horizontal"?`
        top: 50%;
        transform: translateY(-50%);
        left: calc(50% + 20px);
        right: calc(-50% + 20px);
        min-width: 80px;
        height: ${e==="completed"?"2px":"1px"};
        background-color: ${s};
      `:`
      top: 32px;
      left: 12px;
      width: ${e==="completed"?"2px":"1px"};
      min-height: 24px;
      background-color: ${s};
    `}}
`})))()}r(Q,"init_TrailLine_styled");var L,C;function U(){return(U=i((()=>{Q(),L=_(),C=r(({state:e,orientation:t})=>(0,L.jsx)(K,{"data-testid":"trail-line",orientation:t,state:e}),"TrailLine");try{C.displayName="TrailLine",C.__docgenInfo={description:"",displayName:"TrailLine",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/stepper/src/components/TrailLine/TrailLine.tsx",methods:[],props:{state:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/components/TrailLine/TrailLine.tsx",name:"TrailLineProps"}],description:"",name:"state",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/components/TrailLine/TrailLine.tsx",name:"TrailLineProps"},required:!0,tags:{},type:{name:"StepState"}},orientation:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/components/TrailLine/TrailLine.tsx",name:"TrailLineProps"}],description:"",name:"orientation",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/components/TrailLine/TrailLine.tsx",name:"TrailLineProps"},required:!1,tags:{},type:{name:"Orientation | undefined"}}},tags:{}}}catch{}})))()}r(U,"init_TrailLine");function X(){return(X=i((()=>{U()})))()}r(X,"init_TrailLine$1");var D,T;function Z(){return(Z=i((()=>{R(),G(),J(),X(),D=_(),T=r(({index:e=0,title:t,description:a,state:s="incomplete",isActive:p=!1,variant:c="number",icon:o,isLast:n=!1,orientation:m,dataTestId:g})=>(0,D.jsxs)(j,{isDisabled:s==="disabled",isLast:n,orientation:m,children:[(0,D.jsxs)(A,{"data-testid":g??`step-${e}`,isLast:n,orientation:m,children:[(0,D.jsx)(h,{icon:o,index:e,isActive:p,state:s,variant:c}),!n&&(0,D.jsx)(C,{orientation:m,state:s})]}),(0,D.jsx)(b,{description:a,isActive:p,orientation:m,state:s,title:t})]}),"Step");try{T.displayName="Step",T.__docgenInfo={description:"",displayName:"Step",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/stepper/src/components/Step/Step.tsx",methods:[],props:{index:{defaultValue:{value:"0"},declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"}],description:"",name:"index",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"},required:!1,tags:{},type:{name:"number | undefined"}},title:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"}],description:"",name:"title",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"},required:!1,tags:{},type:{name:"string | undefined"}},description:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"}],description:"",name:"description",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"},required:!1,tags:{},type:{name:"string | undefined"}},state:{defaultValue:{value:"incomplete"},declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"}],description:"",name:"state",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"},required:!1,tags:{},type:{name:"StepState | undefined"}},isActive:{defaultValue:{value:"false"},declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"}],description:"",name:"isActive",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},variant:{defaultValue:{value:"number"},declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"}],description:"",name:"variant",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"},required:!1,tags:{},type:{name:"StepVariant | undefined"}},icon:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"}],description:"",name:"icon",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"},required:!1,tags:{},type:{name:"ReactNode"}},isLast:{defaultValue:{value:"false"},declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"}],description:"",name:"isLast",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},orientation:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"}],description:"",name:"orientation",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"},required:!1,tags:{},type:{name:"Orientation | undefined"}},id:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"id",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},style:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"style",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"CSSProperties | undefined"}}},tags:{}}}catch{}})))()}r(Z,"init_Step");function ee(){return(ee=i((()=>{Z()})))()}r(ee,"init_Step$1");function w(){return(w=i((()=>{ee()})))()}r(w,"init_components");var te;function ae(){return(ae=i((()=>{P(),te=f.div`
  display: flex;

  ${({orientation:e="vertical"})=>`
    flex-direction: ${e==="horizontal"?"row":"column"};
    width: ${e==="horizontal"?"100%":"fit-content"};
    align-items: stretch;
  `}
`})))()}r(ae,"init_Stepper_styled");var I,B,k;function re(){return(re=i((()=>{I=$(),w(),ae(),B=_(),k=r(({children:e,orientation:t="vertical",variant:a="number",activeStep:s,dataTestId:p})=>{const c=I.Children.toArray(e),o=c.map((n,m)=>n.type!==T?n:(0,I.cloneElement)(n,{...n.props,index:m,variant:a,orientation:t,isLast:m===c.length-1,isActive:n.props.isActive??s===m}));return(0,B.jsx)(te,{"data-testid":p??"stepper",orientation:t,children:o})},"Stepper"),k.Step=T;try{k.displayName="Stepper",k.__docgenInfo={description:"",displayName:"Stepper",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/stepper/src/Stepper.tsx",methods:[],props:{orientation:{defaultValue:{value:"vertical"},declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepperProps"}],description:"",name:"orientation",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepperProps"},required:!1,tags:{},type:{name:"Orientation | undefined"}},variant:{defaultValue:{value:"number"},declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepperProps"}],description:"",name:"variant",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepperProps"},required:!1,tags:{},type:{name:"StepVariant | undefined"}},activeStep:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepperProps"}],description:"",name:"activeStep",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepperProps"},required:!1,tags:{},type:{name:"number | undefined"}},id:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"id",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},style:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"style",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"CSSProperties | undefined"}}},tags:{}}}catch{}try{k.Step.displayName="Stepper.Step",k.Step.__docgenInfo={description:"",displayName:"Stepper.Step",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/stepper/src/Stepper.tsx",methods:[],props:{index:{defaultValue:{value:"0"},declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"}],description:"",name:"index",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"},required:!1,tags:{},type:{name:"number | undefined"}},title:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"}],description:"",name:"title",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"},required:!1,tags:{},type:{name:"string | undefined"}},description:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"}],description:"",name:"description",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"},required:!1,tags:{},type:{name:"string | undefined"}},state:{defaultValue:{value:"incomplete"},declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"}],description:"",name:"state",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"},required:!1,tags:{},type:{name:"StepState | undefined"}},isActive:{defaultValue:{value:"false"},declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"}],description:"",name:"isActive",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},variant:{defaultValue:{value:"number"},declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"}],description:"",name:"variant",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"},required:!1,tags:{},type:{name:"StepVariant | undefined"}},icon:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"}],description:"",name:"icon",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"},required:!1,tags:{},type:{name:"ReactNode"}},isLast:{defaultValue:{value:"false"},declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"}],description:"",name:"isLast",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},orientation:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"}],description:"",name:"orientation",parent:{fileName:"DT-DDS/packages/react-packages/stepper/src/types/index.ts",name:"StepProps"},required:!1,tags:{},type:{name:"Orientation | undefined"}},id:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"id",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},style:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"style",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"CSSProperties | undefined"}}},tags:{}}}catch{}})))()}r(re,"init_Stepper");var u,ge;function se(){return(se=i((()=>{u=$(),ge=r(e=>{const{initialStep:t=0,totalSteps:a}=e||{},[s,p]=(0,u.useState)(t),[c,o]=(0,u.useState)(new Set),n=s===0,m=a!==void 0?s===a-1:!1,g=a!==void 0?s<a-1:!0,y=s>0;return{activeStep:s,isFirstStep:n,isLastStep:m,canGoNext:g,canGoBack:y,completedSteps:c,handleNext:(0,u.useCallback)(()=>{g&&p(l=>l+1)},[g]),handleBack:(0,u.useCallback)(()=>{y&&p(l=>l-1)},[y]),handleChangeStep:(0,u.useCallback)(l=>{l>=0&&(a===void 0||l<a)&&p(l)},[a]),handleReset:(0,u.useCallback)(()=>{p(t),o(new Set)},[t]),markStepComplete:(0,u.useCallback)(l=>{o(d=>new Set(d).add(l))},[]),markStepIncomplete:(0,u.useCallback)(l=>{o(d=>{const N=new Set(d);return N.delete(l),N})},[]),isStepComplete:(0,u.useCallback)(l=>c.has(l),[c])}},"useStepper")})))()}r(se,"init_useStepper");function ne(){return(ne=i((()=>{se()})))()}r(ne,"init_hooks");function Se(){return(Se=i((()=>{re(),w(),ne()})))()}r(Se,"init_src");export{k as a,ge as i,ne as n,re as o,se as r,Se as t};
