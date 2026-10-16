var T=Object.defineProperty;var t=(r,a)=>T(r,"name",{value:a,configurable:!0});import{n as x}from"./rolldown-runtime-CzYk_CEw.js";import{c as v,f as j,n as s,t as N}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{n as f}from"./src-CxSihfGl.js";import{t as w}from"./jsx-runtime-Br4tQxt1.js";import{t as q}from"./icon-DNJaxs4J.js";import{t as I}from"./Typography-nGlOdhX5.js";import{t as V}from"./typography-Dq-PyVOH.js";var P,l,B,D,_,k,y,b,d;function h(){return(h=x((()=>{N(),P={small:"4px",large:"8px"},l=t(r=>({active:{background:r.palette.informative.default,helper:r.palette.content.medium,percentage:r.palette.content.default},success:{background:r.palette.success.default,helper:r.palette.content.medium,percentage:r.palette.content.default},error:{background:r.palette.error.default,helper:r.palette.error.default,percentage:r.palette.error.default}}),"progressBarColors"),B=s.div`
  ${({theme:r})=>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${r.spacing.spacing_20};
    min-width: 48px;
  `}
`,D=s.div`
  ${({theme:r})=>`
    display: grid;
    grid-template-columns: minmax(48px, 1fr) 28px 16px;
    align-items: center;
    gap: ${r.spacing.spacing_20};
    width: 100%;
    height: 16px;
  `}
`,_=s.div`
  ${({theme:r,size:a,state:o,progress:n})=>`
    width: ${n}%;
    height: ${P[a]};
    background-color: ${l(r)[o].background};
    transition: width 0.2s ease-in-out;
    border-radius: ${r.radius.radius_0} ${r.shape.progressbar} ${r.shape.progressbar} ${r.radius.radius_0}; 
  `};
`,k=s.div`
  ${({theme:r})=>`
    width: 100%;
    background-color: ${r.palette.secondary.medium};
    border-radius: ${r.shape.progressbar};
    overflow: hidden;
  `};
`,y=s.p`
  ${({theme:r,state:a})=>`
    ${r.fontStyles.bodySmRegular}
    color: ${l(r)[a].helper};
  `};
`,b=s.div`
  ${({theme:r,state:a})=>`
    ${r.fontStyles.bodySmRegular}
    text-align: center;
    color: ${l(r)[a].percentage};
  `};
`,d=s.div`
  height: 16px;
  line-height: 16px;
`})))()}t(h,"init_ProgressBar_styled");var e,g;function z(){return(z=x((()=>{v(),q(),V(),h(),e=w(),g=t(({state:r,value:a,label:o,helperText:n,size:S="small",info:c="none"})=>{const p=Math.min(Math.max(a,0),100),u=j();return(0,e.jsxs)(B,{children:[o?(0,e.jsx)(I,{color:"content.default",fontStyles:"bodyMdBold",children:o}):null,(0,e.jsxs)(D,{children:[(0,e.jsx)(k,{"aria-label":o,"aria-valuemax":100,"aria-valuemin":0,"aria-valuenow":p,role:"progressbar",children:(0,e.jsx)(_,{progress:p,size:S,state:r})}),$()]}),n?(0,e.jsx)(y,{state:r,children:n}):null]});function $(){if(c==="none")return;const m={success:(0,e.jsx)(f,{code:"check_circle",color:u.palette.success.default,size:"small"}),error:(0,e.jsx)(f,{code:"error",color:u.palette.error.default,size:"small"})};let i=(0,e.jsx)(b,{state:r,children:`${p}%`});return r!=="active"&&(c==="icon"&&(i=(0,e.jsx)(d,{children:m[r]})),c==="both"&&(i=(0,e.jsxs)(e.Fragment,{children:[i,(0,e.jsx)(d,{children:m[r]})]}))),i}},"ProgressBar");try{g.displayName="ProgressBar",g.__docgenInfo={description:"",displayName:"ProgressBar",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/progress-bar/src/ProgressBar.tsx",methods:[],props:{state:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/progress-bar/src/ProgressBar.tsx",name:"ProgressBarProps"}],description:"",name:"state",parent:{fileName:"DT-DDS/packages/react-packages/progress-bar/src/ProgressBar.tsx",name:"ProgressBarProps"},required:!0,tags:{},type:{name:"ProgressBarState"}},value:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/progress-bar/src/ProgressBar.tsx",name:"ProgressBarProps"}],description:"",name:"value",parent:{fileName:"DT-DDS/packages/react-packages/progress-bar/src/ProgressBar.tsx",name:"ProgressBarProps"},required:!0,tags:{},type:{name:"number"}},label:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/progress-bar/src/ProgressBar.tsx",name:"ProgressBarProps"}],description:"",name:"label",parent:{fileName:"DT-DDS/packages/react-packages/progress-bar/src/ProgressBar.tsx",name:"ProgressBarProps"},required:!1,tags:{},type:{name:"string | undefined"}},helperText:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/progress-bar/src/ProgressBar.tsx",name:"ProgressBarProps"}],description:"",name:"helperText",parent:{fileName:"DT-DDS/packages/react-packages/progress-bar/src/ProgressBar.tsx",name:"ProgressBarProps"},required:!1,tags:{},type:{name:"string | undefined"}},info:{defaultValue:{value:"none"},declarations:[{fileName:"DT-DDS/packages/react-packages/progress-bar/src/ProgressBar.tsx",name:"ProgressBarProps"}],description:"",name:"info",parent:{fileName:"DT-DDS/packages/react-packages/progress-bar/src/ProgressBar.tsx",name:"ProgressBarProps"},required:!1,tags:{},type:{name:"ProgressBarInfo | undefined"}},size:{defaultValue:{value:"small"},declarations:[{fileName:"DT-DDS/packages/react-packages/progress-bar/src/ProgressBar.tsx",name:"ProgressBarProps"}],description:"",name:"size",parent:{fileName:"DT-DDS/packages/react-packages/progress-bar/src/ProgressBar.tsx",name:"ProgressBarProps"},required:!1,tags:{},type:{name:"ProgressBarSize | undefined"}}},tags:{}}}catch{}})))()}t(z,"init_ProgressBar");export{z as n,g as t};
