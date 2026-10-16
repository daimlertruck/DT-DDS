var B=Object.defineProperty;var o=(e,s)=>B(e,"name",{value:s,configurable:!0});import{n as f}from"./rolldown-runtime-CzYk_CEw.js";import{t as C}from"./react-HNhQAnN4.js";import{c as j,f as E,n as M,t as A}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{n as h}from"./src-C-D5h35d.js";import{t as L}from"./jsx-runtime-Br4tQxt1.js";import{t as z}from"./icon-Cq91_35a.js";import{t as x}from"./Typography-IsrlSr7J.js";import{l as O,t as G}from"./core-BfEa33pH.js";import{t as P}from"./src-DqTreagS.js";import{t as H}from"./box-Bi4-Swpw.js";import{t as R}from"./typography-X0Nz-_pO.js";var n;function D(){return(D=f((()=>{n={Default:"default",Error:"error",Info:"informative",Success:"success",Warning:"warning"}})))()}o(D,"init_types");var b;function q(){return(q=f((()=>{D(),b={[n.Error]:"error",[n.Info]:"info",[n.Success]:"check_circle",[n.Warning]:"warning"}})))()}o(q,"init_constants");var g,m,u;function V(){return(V=f((()=>{A(),D(),g=M.div`
  display: grid;
  width: 100%;
  padding: ${({theme:e})=>`${e.spacing.spacing_40} ${e.spacing.spacing_50}`};
  border-radius: ${({theme:e})=>e.shape.message};

  ${({theme:e,messageType:s,orientation:r})=>{const a=s===n.Default,d=a?e.palette.surface.light:e.palette[s].light,y=a?e.palette.border.medium:e.palette[s].default,l=`
      grid-template-columns: ${a?"1fr fit-content(100%)":"fit-content(100%) 1fr fit-content(100%)"};
      background-color: ${d};
      border: 1px solid ${y};
      gap: ${e.spacing.spacing_50}
    `;return r==="vertical"?`
        ${l};
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
      `:l}}
`,m=M.div`
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
`,u=M.button`
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
`;try{g.displayName="MessageStyled",g.__docgenInfo={description:"",displayName:"MessageStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/message/src/Message.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}},messageType:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/message/src/Message.styled.ts",name:"MessageStyledProps"}],description:"",name:"messageType",parent:{fileName:"DT-DDS/packages/react-packages/message/src/Message.styled.ts",name:"MessageStyledProps"},required:!0,tags:{},type:{name:"MessageType"}},orientation:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/message/src/Message.styled.ts",name:"MessageStyledProps"}],description:"",name:"orientation",parent:{fileName:"DT-DDS/packages/react-packages/message/src/Message.styled.ts",name:"MessageStyledProps"},required:!1,tags:{},type:{name:"Orientation | undefined"}}},tags:{}}}catch{}try{m.displayName="MessageActionsStyled",m.__docgenInfo={description:"",displayName:"MessageActionsStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/message/src/Message.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}},messageType:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/message/src/Message.styled.ts",name:"MessageStyledProps"}],description:"",name:"messageType",parent:{fileName:"DT-DDS/packages/react-packages/message/src/Message.styled.ts",name:"MessageStyledProps"},required:!0,tags:{},type:{name:"MessageType"}},orientation:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/message/src/Message.styled.ts",name:"MessageStyledProps"}],description:"",name:"orientation",parent:{fileName:"DT-DDS/packages/react-packages/message/src/Message.styled.ts",name:"MessageStyledProps"},required:!1,tags:{},type:{name:"Orientation | undefined"}}},tags:{}}}catch{}try{u.displayName="MessageButtonCloseStyled",u.__docgenInfo={description:"",displayName:"MessageButtonCloseStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/message/src/Message.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}},messageType:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/message/src/Message.styled.ts",name:"MessageStyledProps"}],description:"",name:"messageType",parent:{fileName:"DT-DDS/packages/react-packages/message/src/Message.styled.ts",name:"MessageStyledProps"},required:!0,tags:{},type:{name:"MessageType"}},orientation:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/message/src/Message.styled.ts",name:"MessageStyledProps"}],description:"",name:"orientation",parent:{fileName:"DT-DDS/packages/react-packages/message/src/Message.styled.ts",name:"MessageStyledProps"},required:!1,tags:{},type:{name:"Orientation | undefined"}}},tags:{}}}catch{}})))()}o(V,"init_Message_styled");var p,t,c;function W(){return(W=f((()=>{p=C(),j(),H(),G(),z(),R(),q(),V(),D(),t=L(),c=o(({children:e,dataTestId:s,style:r,type:a=n.Default,onClose:d,description:y,title:l,orientation:$="horizontal"})=>{const i=E(),k=a===n.Default,_=O(`(max-width: ${i.breakpoints.mq2}px)`)?"vertical":$||"horizontal",S=_==="horizontal",I=!!d,N=k?"content.default":`${a}.dark`,v=k?i.palette.content.default:i.palette[a].dark,w=(0,p.useMemo)(()=>p.Children.map(e,T=>T&&(0,p.cloneElement)(T,{...T.props,type:a})),[e,a]);return(0,t.jsxs)(g,{"data-testid":s??"message",messageType:a,orientation:_,style:r,children:[!k&&(0,t.jsx)(P,{style:{justifyContent:"center",alignItems:"flex-start"},children:(0,t.jsx)(h,{code:b[a],color:i.palette[a].dark,"data-testid":"message-icon",dataTestId:"message-icon"})}),(0,t.jsxs)(P,{dataTestId:"message-content",style:{flexDirection:S?"row":"column",justifyContent:"space-between",gap:S?i.spacing.spacing_30:i.spacing.spacing_50,alignItems:S?"center":"start"},children:[(0,t.jsxs)(P,{style:{alignItems:"flex-start",gap:i.spacing.spacing_10},children:[l?(0,t.jsx)(x,{color:N,fontStyles:"bodyLgBold",children:l}):null,(0,t.jsx)(x,{color:N,fontStyles:"bodyLgRegular",children:y})]}),w]}),I?(0,t.jsx)(u,{"aria-label":"Close message",messageType:a,onClick:d,orientation:_,children:(0,t.jsx)(h,{code:"close",color:v})}):null]})},"Message"),c.Actions=({children:e,dataTestId:s,type:r})=>(0,t.jsx)(m,{"data-testid":s??"message-actions",messageType:r,children:e});try{c.displayName="Message",c.__docgenInfo={description:"",displayName:"Message",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/message/src/Message.tsx",methods:[],props:{type:{defaultValue:{value:"default"},declarations:[{fileName:"DT-DDS/packages/react-packages/message/src/types/index.ts",name:"MessageProps"}],description:"",name:"type",parent:{fileName:"DT-DDS/packages/react-packages/message/src/types/index.ts",name:"MessageProps"},required:!1,tags:{},type:{name:"MessageType"}},onClose:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/message/src/types/index.ts",name:"MessageProps"}],description:"",name:"onClose",parent:{fileName:"DT-DDS/packages/react-packages/message/src/types/index.ts",name:"MessageProps"},required:!1,tags:{},type:{name:"((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined"}},title:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/message/src/types/index.ts",name:"MessageProps"}],description:"",name:"title",parent:{fileName:"DT-DDS/packages/react-packages/message/src/types/index.ts",name:"MessageProps"},required:!1,tags:{},type:{name:"string | undefined"}},description:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/message/src/types/index.ts",name:"MessageProps"}],description:"",name:"description",parent:{fileName:"DT-DDS/packages/react-packages/message/src/types/index.ts",name:"MessageProps"},required:!0,tags:{},type:{name:"ReactNode"}},orientation:{defaultValue:{value:"horizontal"},declarations:[{fileName:"DT-DDS/packages/react-packages/message/src/types/index.ts",name:"MessageProps"}],description:"",name:"orientation",parent:{fileName:"DT-DDS/packages/react-packages/message/src/types/index.ts",name:"MessageProps"},required:!1,tags:{},type:{name:"Orientation | undefined"}},id:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"id",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},style:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"style",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"CSSProperties | undefined"}}},tags:{}}}catch{}try{c.Actions.displayName="Message.Actions",c.Actions.__docgenInfo={description:"",displayName:"Message.Actions",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/message/src/Message.tsx",methods:[],props:{type:{defaultValue:{value:"default"},declarations:[{fileName:"DT-DDS/packages/react-packages/message/src/types/index.ts",name:"ActionsProps"}],description:"",name:"type",parent:{fileName:"DT-DDS/packages/react-packages/message/src/types/index.ts",name:"ActionsProps"},required:!1,tags:{},type:{name:"MessageType | undefined"}},id:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"id",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},style:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"style",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"CSSProperties | undefined"}}},tags:{}}}catch{}})))()}o(W,"init_Message");export{D as i,W as n,n as r,c as t};
