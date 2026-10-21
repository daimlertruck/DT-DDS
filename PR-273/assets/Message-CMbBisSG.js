var j=Object.defineProperty;var o=(e,s)=>j(e,"name",{value:s,configurable:!0});import{n as g}from"./rolldown-runtime-CzYk_CEw.js";import{t as C}from"./react-HNhQAnN4.js";import{c as V,f as A,n as _,t as E}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{n as P}from"./src-Dy65K5lf.js";import{t as z}from"./jsx-runtime-Br4tQxt1.js";import{t as L}from"./icon-DzgDoBJz.js";import{t as T}from"./Typography-6OXNaZjx.js";import{l as O,t as G}from"./core-FFEhescA.js";import{t as S}from"./src-CYYpCRzL.js";import{t as H}from"./box-Dhy-LEcB.js";import{t as R}from"./typography-DYFUH5Hl.js";var n;function m(){return(m=g((()=>{n={Default:"default",Error:"error",Info:"informative",Success:"success",Warning:"warning"}})))()}o(m,"init_types");var b;function M(){return(M=g((()=>{m(),b={[n.Error]:"error",[n.Info]:"info",[n.Success]:"check_circle",[n.Warning]:"warning"}})))()}o(M,"init_constants");var h,N,$;function v(){return(v=g((()=>{E(),m(),h=_.div`
  display: grid;
  width: 100%;
  padding: ${({theme:e})=>`${e.spacing.spacing_40} ${e.spacing.spacing_50}`};
  border-radius: ${({theme:e})=>e.shape.message};

  ${({theme:e,messageType:s,orientation:r})=>{const a=s===n.Default,l=a?e.palette.surface.light:e.palette[s].light,u=a?e.palette.border.medium:e.palette[s].default,p=`
      grid-template-columns: ${a?"1fr fit-content(100%)":"fit-content(100%) 1fr fit-content(100%)"};
      background-color: ${l};
      border: 1px solid ${u};
      gap: ${e.spacing.spacing_50}
    `;return r==="vertical"?`
        ${p};
        grid-template-columns: 1fr fit-content(100%);
        gap: ${e.spacing.spacing_30};

        & > :nth-child(1) {
          grid-column: 1;
          grid-row: 1;
        }

        ${a?`
                & > :nth-child(2) {
                  grid-column: 2;
                  grid-row: 1;
                }
              `:`
                & > :nth-child(2) {
                  grid-column: 1;
                  grid-row: 2;
                }
                & > :nth-child(3) {
                  grid-column: 2;
                  grid-row: 1;
                }
              `}
      `:p}}
`,N=_.div`
  display: flex;
  flex-direction: row;
  gap: ${({theme:e})=>e.spacing.spacing_20};

  button {
    ${({theme:e,messageType:s})=>{const r=s==="default",a=r?e.palette.content.default:e.palette[s].dark;return`
        color: ${a};

        &:hover {
          background-color: ${r?e.palette.surface.medium:e.palette[s].medium};
          color: ${a};
        }
      `}}
  }
`,$=_.button`
  ${({theme:e,messageType:s,orientation:r})=>`
    border: 0;
    cursor: pointer;
    background: transparent;
    display: flex;
    height: fit-content;

    ${r==="horizontal"&&"align-self: center"};
  
    &:focus-visible {
      outline: 2px solid ${e.palette.primary.default};
      outline-offset: 1px;
    }

    &:hover {
      background-color: ${s===n.Default?e.palette.surface.medium:e.palette[s].medium};
    }
  `}
`})))()}o(v,"init_Message_styled");var d,t,c;function W(){return(W=g((()=>{d=C(),V(),H(),G(),L(),R(),M(),v(),m(),t=z(),c=o(({children:e,dataTestId:s,style:r,type:a=n.Default,onClose:l,description:u,title:p,orientation:w="horizontal"})=>{const i=A(),f=a===n.Default,D=O(`(max-width: ${i.breakpoints.mq2}px)`)?"vertical":w||"horizontal",y=D==="horizontal",B=!!l,x=f?"content.default":`${a}.dark`,I=f?i.palette.content.default:i.palette[a].dark,q=(0,d.useMemo)(()=>d.Children.map(e,k=>k&&(0,d.cloneElement)(k,{...k.props,type:a})),[e,a]);return(0,t.jsxs)(h,{"data-testid":s??"message",messageType:a,orientation:D,style:r,children:[!f&&(0,t.jsx)(S,{style:{justifyContent:"center",alignItems:"flex-start"},children:(0,t.jsx)(P,{code:b[a],color:i.palette[a].dark,"data-testid":"message-icon",dataTestId:"message-icon"})}),(0,t.jsxs)(S,{dataTestId:"message-content",style:{flexDirection:y?"row":"column",justifyContent:"space-between",gap:y?i.spacing.spacing_30:i.spacing.spacing_50,alignItems:y?"center":"start"},children:[(0,t.jsxs)(S,{style:{alignItems:"flex-start",gap:i.spacing.spacing_10},children:[p?(0,t.jsx)(T,{color:x,fontStyles:"bodyLgBold",children:p}):null,(0,t.jsx)(T,{color:x,fontStyles:"bodyLgRegular",children:u})]}),q]}),B?(0,t.jsx)($,{"aria-label":"Close message",messageType:a,onClick:l,orientation:D,children:(0,t.jsx)(P,{code:"close",color:I})}):null]})},"Message"),c.Actions=({children:e,dataTestId:s,type:r})=>(0,t.jsx)(N,{"data-testid":s??"message-actions",messageType:r,children:e});try{c.displayName="Message",c.__docgenInfo={description:"",displayName:"Message",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/message/src/Message.tsx",methods:[],props:{type:{defaultValue:{value:"default"},declarations:[{fileName:"DT-DDS/packages/react-packages/message/src/types/index.ts",name:"MessageProps"}],description:"",name:"type",parent:{fileName:"DT-DDS/packages/react-packages/message/src/types/index.ts",name:"MessageProps"},required:!1,tags:{},type:{name:"MessageType"}},onClose:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/message/src/types/index.ts",name:"MessageProps"}],description:"",name:"onClose",parent:{fileName:"DT-DDS/packages/react-packages/message/src/types/index.ts",name:"MessageProps"},required:!1,tags:{},type:{name:"((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined"}},title:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/message/src/types/index.ts",name:"MessageProps"}],description:"",name:"title",parent:{fileName:"DT-DDS/packages/react-packages/message/src/types/index.ts",name:"MessageProps"},required:!1,tags:{},type:{name:"string | undefined"}},description:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/message/src/types/index.ts",name:"MessageProps"}],description:"",name:"description",parent:{fileName:"DT-DDS/packages/react-packages/message/src/types/index.ts",name:"MessageProps"},required:!0,tags:{},type:{name:"ReactNode"}},orientation:{defaultValue:{value:"horizontal"},declarations:[{fileName:"DT-DDS/packages/react-packages/message/src/types/index.ts",name:"MessageProps"}],description:"",name:"orientation",parent:{fileName:"DT-DDS/packages/react-packages/message/src/types/index.ts",name:"MessageProps"},required:!1,tags:{},type:{name:"Orientation | undefined"}},id:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"id",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},style:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"style",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"CSSProperties | undefined"}}},tags:{}}}catch{}try{c.Actions.displayName="Message.Actions",c.Actions.__docgenInfo={description:"",displayName:"Message.Actions",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/message/src/Message.tsx",methods:[],props:{type:{defaultValue:{value:"default"},declarations:[{fileName:"DT-DDS/packages/react-packages/message/src/types/index.ts",name:"ActionsProps"}],description:"",name:"type",parent:{fileName:"DT-DDS/packages/react-packages/message/src/types/index.ts",name:"ActionsProps"},required:!1,tags:{},type:{name:"MessageType | undefined"}},id:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"id",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},style:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"style",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"CSSProperties | undefined"}}},tags:{}}}catch{}})))()}o(W,"init_Message");export{m as i,W as n,n as r,c as t};
