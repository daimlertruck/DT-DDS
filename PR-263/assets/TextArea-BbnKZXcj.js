var U=Object.defineProperty;var t=(e,a)=>U(e,"name",{value:a,configurable:!0});import{n as b}from"./rolldown-runtime-CzYk_CEw.js";import{t as W}from"./react-HNhQAnN4.js";import{c as X,f as Y,n as Z,t as ee}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{t as ae}from"./jsx-runtime-Br4tQxt1.js";import{t as V}from"./Typography-BX122yoq.js";import{t as q}from"./src-CYYpCRzL.js";import{t as te}from"./box-Dhy-LEcB.js";import{t as re}from"./typography-jbitAozZ.js";import{t as se}from"./LabelField-BcZUxglk.js";import{t as ne}from"./label-field-BMuFlAKM.js";var F;function w(){return(w=b((()=>{F=t((e,a)=>({default:a.palette.surface.default,contrast:a.palette.surface.contrast,light:a.palette.surface.light})[e]||a.palette.surface.default,"getThemedBackgroundFill")})))()}t(w,"init_helpers");var I;function j(){return(j=b((()=>{ee(),w(),I=Z.textarea`
  ${({theme:e,enableResize:a,backgroundFill:m,variant:d,hasError:r,isFloatingLabel:u,hasLabel:i})=>{const s=r?e.palette.error.default:e.palette.informative.default;return`
    ${e.fontStyles.bodyMdRegular}

    background-color: ${F(m,e)};
    min-height: 100px;
    width: 100%;
    outline: none;
    color: ${e.palette.content.default};
    resize: ${a?"vertical":"none"};
    padding: ${u&&i?"30px 12px 12px 12px":"12px"};
    border: 0;

    ${!u&&i&&"margin-top: 8px"};

    ::placeholder {
      color: ${e.palette.content.medium};
    }

    ${d==="outlined"?`border-radius: ${e.shape.formField};
            border: 1px solid ${r?e.palette.error.default:e.palette.border.medium};

            &:focus-within,
            &:hover:not([disabled]) { 
              border: 1px solid ${s};
            }
          `:`border-radius: ${e.shape.formField} ${e.shape.formField} 0 0;
            border-bottom: 1px solid ${r?e.palette.error.default:e.palette.border.medium};
           
            &:focus-within,
            &:hover:not([disabled]) { 
              border-bottom: 1px solid  ${s};
            }
          `};

    &:read-only:not(:disabled) {
      border-color: ${e.palette.border.default};
      color: ${e.palette.content.medium};
      background-color: ${e.palette.surface.light};

      &:focus-within,
      &:hover { 
       ${d==="outlined"?`border: 1px solid ${s};`:`border-bottom: 1px solid ${s}`}
      }
    }

    &:disabled {
      cursor: not-allowed;
      color: ${e.palette.content.light};
    } 
  `}}
`})))()}t(j,"init_TextArea_styled");var o,l,A;function le(){return(le=b((()=>{o=W(),X(),te(),ne(),re(),j(),l=ae(),A=t(({label:e,labelIcon:a,dataTestId:m,name:d,value:r,style:u,onChange:i,maxLength:s,variant:R="outlined",backgroundFill:B="contrast",enableResize:C=!1,disabled:f=!1,required:_=!1,hasError:E=!1,hasLabel:y=!0,message:L="",labelVariant:z="default",placeholder:M,readOnly:H,...c})=>{const[S,h]=(0,o.useState)(0),[N,P]=(0,o.useState)(!1),[G,g]=(0,o.useState)(""),[J,T]=(0,o.useState)(!1),$=Y();(0,o.useEffect)(()=>{r?(g(r),h(r.length),T(!1)):g("")},[r]);const K=t(n=>{g(n.target.value),T(!1),h(n.target.value.length),i&&i(n)},"handleChange"),O=t(n=>{P(!0),c.onFocus&&c.onFocus(n)},"onFocus"),Q=t(n=>{P(!1),n.currentTarget.value.trim().length===0&&_&&T(!0),c.onBlur&&c.onBlur(n)},"onBlur"),x=m??`${e.replaceAll(" ","-").toLocaleLowerCase()}-textarea`,v=f?"content.light":"content.medium",p=E||J,D=L,k=z==="floating";return(0,l.jsxs)(q,{style:{position:"relative",alignItems:"flex-start"},children:[y?(0,l.jsx)(se,{hasError:p,htmlFor:x,icon:a,isActive:N,isDisabled:f,isFloating:k,isInputFilled:!!S,isRequired:_,style:{zIndex:1},children:e}):null,(0,l.jsx)(I,{backgroundFill:B,"data-error":p,"data-testid":x,disabled:f,enableResize:C,hasError:p,hasLabel:y,id:x,isFloatingLabel:k,maxLength:s,name:d,readOnly:H,style:u,value:G,variant:R,...c,onBlur:Q,onChange:K,onFocus:O,...(!k||N)&&{placeholder:M}}),(0,l.jsxs)(q,{style:{flexDirection:"row",justifyContent:"space-between",width:"100%",paddingInline:$.spacing.spacing_40,gap:$.spacing.spacing_30,marginTop:4},children:[D?(0,l.jsx)(V,{color:p?"error.default":v,element:"span",fontStyles:"bodySmRegular",children:D}):null,s?(0,l.jsxs)(V,{color:p?"error.default":v,dataTestId:"char-counter",element:"span",fontStyles:"bodySmRegular",id:x,...!D&&{style:{marginLeft:"auto"}},children:[S," / ",s]}):null]})]})},"TextArea");try{A.displayName="TextArea",A.__docgenInfo={description:"",displayName:"TextArea",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/text-area/src/TextArea.tsx",methods:[],props:{label:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-area/src/TextArea.tsx",name:"TextAreaProps"}],description:"",name:"label",parent:{fileName:"DT-DDS/packages/react-packages/text-area/src/TextArea.tsx",name:"TextAreaProps"},required:!0,tags:{},type:{name:"string"}},name:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-area/src/TextArea.tsx",name:"TextAreaProps"}],description:"",name:"name",parent:{fileName:"DT-DDS/packages/react-packages/text-area/src/TextArea.tsx",name:"TextAreaProps"},required:!1,tags:{},type:{name:"string | undefined"}},maxLength:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-area/src/TextArea.tsx",name:"TextAreaProps"}],description:"",name:"maxLength",parent:{fileName:"DT-DDS/packages/react-packages/text-area/src/TextArea.tsx",name:"TextAreaProps"},required:!1,tags:{},type:{name:"number | undefined"}},enableResize:{defaultValue:{value:"false"},declarations:[{fileName:"DT-DDS/packages/react-packages/text-area/src/TextArea.tsx",name:"TextAreaProps"}],description:"",name:"enableResize",parent:{fileName:"DT-DDS/packages/react-packages/text-area/src/TextArea.tsx",name:"TextAreaProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},value:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-area/src/TextArea.tsx",name:"TextAreaProps"}],description:"",name:"value",parent:{fileName:"DT-DDS/packages/react-packages/text-area/src/TextArea.tsx",name:"TextAreaProps"},required:!1,tags:{},type:{name:"string | undefined"}},variant:{defaultValue:{value:"outlined"},declarations:[{fileName:"DT-DDS/packages/react-packages/text-area/src/TextArea.tsx",name:"TextAreaProps"}],description:"",name:"variant",parent:{fileName:"DT-DDS/packages/react-packages/text-area/src/TextArea.tsx",name:"TextAreaProps"},required:!1,tags:{},type:{name:"TextAreaVariant | undefined"}},backgroundFill:{defaultValue:{value:"contrast"},declarations:[{fileName:"DT-DDS/packages/react-packages/text-area/src/TextArea.tsx",name:"TextAreaProps"}],description:"",name:"backgroundFill",parent:{fileName:"DT-DDS/packages/react-packages/text-area/src/TextArea.tsx",name:"TextAreaProps"},required:!1,tags:{},type:{name:"TextAreaBackgroundFill | undefined"}},hasError:{defaultValue:{value:"false"},declarations:[{fileName:"DT-DDS/packages/react-packages/text-area/src/TextArea.tsx",name:"TextAreaProps"}],description:"",name:"hasError",parent:{fileName:"DT-DDS/packages/react-packages/text-area/src/TextArea.tsx",name:"TextAreaProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},message:{defaultValue:{value:""},declarations:[{fileName:"DT-DDS/packages/react-packages/text-area/src/TextArea.tsx",name:"TextAreaProps"}],description:"",name:"message",parent:{fileName:"DT-DDS/packages/react-packages/text-area/src/TextArea.tsx",name:"TextAreaProps"},required:!1,tags:{},type:{name:"string | undefined"}},labelVariant:{defaultValue:{value:"default"},declarations:[{fileName:"DT-DDS/packages/react-packages/text-area/src/TextArea.tsx",name:"TextAreaProps"}],description:"",name:"labelVariant",parent:{fileName:"DT-DDS/packages/react-packages/text-area/src/TextArea.tsx",name:"TextAreaProps"},required:!1,tags:{},type:{name:"TextAreaLabelVariant | undefined"}},hasLabel:{defaultValue:{value:"true"},declarations:[{fileName:"DT-DDS/packages/react-packages/text-area/src/TextArea.tsx",name:"TextAreaProps"}],description:"",name:"hasLabel",parent:{fileName:"DT-DDS/packages/react-packages/text-area/src/TextArea.tsx",name:"TextAreaProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},labelIcon:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/text-area/src/TextArea.tsx",name:"TextAreaProps"}],description:"",name:"labelIcon",parent:{fileName:"DT-DDS/packages/react-packages/text-area/src/TextArea.tsx",name:"TextAreaProps"},required:!1,tags:{},type:{name:"ReactNode"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}}},tags:{}}}catch{}})))()}t(le,"init_TextArea");export{le as n,A as t};
