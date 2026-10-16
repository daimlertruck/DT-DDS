var b=Object.defineProperty;var t=(e,a)=>b(e,"name",{value:a,configurable:!0});import{n as d}from"./rolldown-runtime-CzYk_CEw.js";import{n as o,t as _}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{t as S}from"./jsx-runtime-Br4tQxt1.js";var n,g,u,f,m;function D(){return(D=d((()=>{_(),n=48,g=20,u=o.div`
  ${({theme:e,hasLabel:a})=>`
    display: flex;
    gap: ${a?e.spacing.spacing_30:e.spacing.spacing_0};
    border-radius: ${g}px;
    align-items: center;
    width: fit-content;
  `};
`,f=o.label`
  ${({theme:e})=>`
    position: relative;
    width: ${n}px;
    height: 24px;
    border-radius: ${g}px;
    transition: background 0.3s ease;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: ${e.palette.content.contrast};
      transition: transform 0.3s ease;
      margin: 2px;
    }
  `};
`,m=o.input`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;

  ${({theme:e,disabled:a})=>`
    & + label {
      background: ${a?e.palette.surface.default:e.palette.surface.medium};
      cursor: ${a?"not-allowed":"pointer"};
    }


    &:focus-visible + label {
      outline: 2px solid ${e.palette.primary.default};
      outline-offset: 1px;
    }

    &:checked + label {
      background: ${a?e.palette.accent.light:e.palette.accent.default};
    }

    &:checked + label::after {
      transform: translateX(${n/2}px);
    }

    & ~ span {
      ${e.fontStyles.bodyMdRegular};
      cursor: ${a?"not-allowed":"pointer"};
      color: ${a?e.palette.content.light:e.palette.content.default};
      user-select: none;
    }
  `}
`})))()}t(D,"init_Toggle_styled");var r,c;function h(){return(h=d((()=>{D(),r=S(),c=t(({dataTestId:e,label:a,isDisabled:l=!1,isChecked:T=!1,onClick:i})=>{const p=e??"toggle",k=`${p}-checkbox-id`,x=t(s=>{l||i(s)},"handleClick"),y=t(s=>{l||s.key==="Enter"&&(s.preventDefault(),i(s))},"handleEnterClick");return(0,r.jsxs)(u,{"data-testid":p,hasLabel:!!a,onClick:x,onKeyDown:y,children:[(0,r.jsx)(m,{checked:T,disabled:l,id:k,type:"checkbox"}),(0,r.jsx)(f,{}),(0,r.jsx)("span",{children:a})]})},"Toggle");try{c.displayName="Toggle",c.__docgenInfo={description:"",displayName:"Toggle",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/toggle/src/Toggle.tsx",methods:[],props:{dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toggle/src/Toggle.tsx",name:"ToggleProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/toggle/src/Toggle.tsx",name:"ToggleProps"},required:!1,tags:{},type:{name:"string | undefined"}},isDisabled:{defaultValue:{value:"false"},declarations:[{fileName:"DT-DDS/packages/react-packages/toggle/src/Toggle.tsx",name:"ToggleProps"}],description:"",name:"isDisabled",parent:{fileName:"DT-DDS/packages/react-packages/toggle/src/Toggle.tsx",name:"ToggleProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},isChecked:{defaultValue:{value:"false"},declarations:[{fileName:"DT-DDS/packages/react-packages/toggle/src/Toggle.tsx",name:"ToggleProps"}],description:"",name:"isChecked",parent:{fileName:"DT-DDS/packages/react-packages/toggle/src/Toggle.tsx",name:"ToggleProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},label:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toggle/src/Toggle.tsx",name:"ToggleProps"}],description:"",name:"label",parent:{fileName:"DT-DDS/packages/react-packages/toggle/src/Toggle.tsx",name:"ToggleProps"},required:!1,tags:{},type:{name:"string | undefined"}},onClick:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toggle/src/Toggle.tsx",name:"ToggleProps"}],description:"",name:"onClick",parent:{fileName:"DT-DDS/packages/react-packages/toggle/src/Toggle.tsx",name:"ToggleProps"},required:!0,tags:{},type:{name:"(evt: KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLDivElement, MouseEvent>) => void"}},id:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"id",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},style:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"style",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"CSSProperties | undefined"}}},tags:{}}}catch{}})))()}t(h,"init_Toggle");export{h as n,c as t};
