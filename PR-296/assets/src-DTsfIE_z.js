var y=Object.defineProperty;var s=(e,r)=>y(e,"name",{value:r,configurable:!0});import{n as p}from"./rolldown-runtime-CzYk_CEw.js";import{n as i,t as k}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{n as _}from"./src-BeXhsZIY.js";import{t as T}from"./jsx-runtime-Br4tQxt1.js";import{t as P}from"./icon-DutGOQyb.js";import{a as S,t as c}from"./Tooltip-BiU__WjC.js";import{t as x}from"./Typography-BRo7aZh3.js";import{t as N}from"./tooltip-DcDgDBG5.js";import{t as F}from"./typography-DVeSjity.js";var m,d,f,u;function g(){return(g=p((()=>{k(),m=i.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: ${({theme:e})=>e.spacing.spacing_60};
`,d=i.div`
  ${({theme:e})=>`
    row-gap: ${e.spacing.spacing_50};
    display: flex;
    flex-direction: column;
    width: 100%;
    color: ${e.palette.content.default};
  `}
`,f=i.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  align-items: center;
`,u=i.div`
  ${({theme:e,disabled:r})=>`
    display: flex;
    gap: ${e.spacing.spacing_50};
    justify-content: stretch;
    align-items: start;
    flex-direction: column;

    @media only screen and (min-width: ${e.breakpoints.mq3}px) {
      flex-direction: row;
    }

    ${r&&`
        opacity: 0.5;
        pointer-events: none;
      `}
  `}
`})))()}s(g,"init_Form_styled");var a,l,t;function D(){return(D=p((()=>{P(),N(),F(),g(),a=T(),l=s(e=>e.preventDefault(),"DEFAULT_ON_SUBMIT"),t=s(({children:e,dataTestId:r,style:o,onSubmit:n=l})=>(0,a.jsx)(m,{"data-testid":r??"test-form",onSubmit:n,style:o,children:e}),"Form"),t.Group=({children:e,isDisabled:r,title:o,tooltip:n})=>(0,a.jsxs)(d,{children:[o?(0,a.jsxs)(f,{children:[(0,a.jsx)(x,{color:"primary.default",fontStyles:"h6",style:{textTransform:"uppercase"},children:o}),n?(0,a.jsxs)(c,{children:[(0,a.jsx)(_,{code:"info",size:"small"}),(0,a.jsx)(c.Content,{direction:S.Right,style:{maxWidth:250},children:n})]}):null]}):null,(0,a.jsx)(u,{disabled:r,children:e})]});try{t.displayName="Form",t.__docgenInfo={description:"",displayName:"Form",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/form/src/Form.tsx",methods:[],props:{onSubmit:{defaultValue:{value:`(event: FormEvent<HTMLFormElement>) =>
  event.preventDefault()`},declarations:[{fileName:"DT-DDS/packages/react-packages/form/src/Form.tsx",name:"FormProps"}],description:"",name:"onSubmit",parent:{fileName:"DT-DDS/packages/react-packages/form/src/Form.tsx",name:"FormProps"},required:!1,tags:{},type:{name:"((event: FormEvent<HTMLFormElement>) => void) | undefined"}},id:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"id",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},style:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"style",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"CSSProperties | undefined"}}},tags:{}}}catch{}try{t.Group.displayName="Form.Group",t.Group.__docgenInfo={description:"",displayName:"Form.Group",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/form/src/Form.tsx",methods:[],props:{isDisabled:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/form/src/Form.tsx",name:"GroupProps"}],description:"",name:"isDisabled",parent:{fileName:"DT-DDS/packages/react-packages/form/src/Form.tsx",name:"GroupProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},title:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/form/src/Form.tsx",name:"GroupProps"}],description:"",name:"title",parent:{fileName:"DT-DDS/packages/react-packages/form/src/Form.tsx",name:"GroupProps"},required:!1,tags:{},type:{name:"string | undefined"}},tooltip:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/form/src/Form.tsx",name:"GroupProps"}],description:"",name:"tooltip",parent:{fileName:"DT-DDS/packages/react-packages/form/src/Form.tsx",name:"GroupProps"},required:!1,tags:{},type:{name:"ReactNode"}},id:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"id",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},style:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"style",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"CSSProperties | undefined"}}},tags:{}}}catch{}})))()}s(D,"init_Form");function b(){return(b=p((()=>{D()})))()}s(b,"init_src");export{t as n,D as r,b as t};
