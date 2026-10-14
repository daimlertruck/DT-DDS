var h=Object.defineProperty;var t=(e,a)=>h(e,"name",{value:a,configurable:!0});import{n as f}from"./rolldown-runtime-CzYk_CEw.js";import{n as c,t as S}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{t as x}from"./jsx-runtime-Br4tQxt1.js";var d,g,r,n,o;function D(){return(D=f((()=>{S(),d=48,g=20,r=c.div`
  ${({theme:e,hasLabel:a})=>`
    display: flex;
    gap: ${a?e.spacing.spacing_30:e.spacing.spacing_0};
    border-radius: ${g}px;
    align-items: center;
    width: fit-content;
  `};
`,n=c.label`
  ${({theme:e})=>`
    position: relative;
    width: ${d}px;
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
`,o=c.input`
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
      transform: translateX(${d/2}px);
    }

    & ~ span {
      ${e.fontStyles.bodyMdRegular};
      cursor: ${a?"not-allowed":"pointer"};
      color: ${a?e.palette.content.light:e.palette.content.default};
      user-select: none;
    }
  `}
`;try{r.displayName="ToggleWrapperStyled",r.__docgenInfo={description:"",displayName:"ToggleWrapperStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/toggle/src/Toggle.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}},hasLabel:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toggle/src/Toggle.styled.ts",name:"ToggleWrapperStyledProps"}],description:"",name:"hasLabel",parent:{fileName:"DT-DDS/packages/react-packages/toggle/src/Toggle.styled.ts",name:"ToggleWrapperStyledProps"},required:!0,tags:{},type:{name:"boolean"}}},tags:{}}}catch{}try{n.displayName="ToggleSwitchStyled",n.__docgenInfo={description:"",displayName:"ToggleSwitchStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/toggle/src/Toggle.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}}},tags:{}}}catch{}try{o.displayName="ToggleCheckBoxStyled",o.__docgenInfo={description:"",displayName:"ToggleCheckBoxStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/toggle/src/Toggle.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}}},tags:{}}}catch{}})))()}t(D,"init_Toggle_styled");var l,p;function N(){return(N=f((()=>{D(),l=x(),p=t(({dataTestId:e,label:a,isDisabled:i=!1,isChecked:T=!1,onClick:m})=>{const u=e??"toggle",y=`${u}-checkbox-id`,k=t(s=>{i||m(s)},"handleClick"),_=t(s=>{i||s.key==="Enter"&&(s.preventDefault(),m(s))},"handleEnterClick");return(0,l.jsxs)(r,{"data-testid":u,hasLabel:!!a,onClick:k,onKeyDown:_,children:[(0,l.jsx)(o,{checked:T,disabled:i,id:y,type:"checkbox"}),(0,l.jsx)(n,{}),(0,l.jsx)("span",{children:a})]})},"Toggle");try{p.displayName="Toggle",p.__docgenInfo={description:"",displayName:"Toggle",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/toggle/src/Toggle.tsx",methods:[],props:{dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toggle/src/Toggle.tsx",name:"ToggleProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/toggle/src/Toggle.tsx",name:"ToggleProps"},required:!1,tags:{},type:{name:"string | undefined"}},isDisabled:{defaultValue:{value:"false"},declarations:[{fileName:"DT-DDS/packages/react-packages/toggle/src/Toggle.tsx",name:"ToggleProps"}],description:"",name:"isDisabled",parent:{fileName:"DT-DDS/packages/react-packages/toggle/src/Toggle.tsx",name:"ToggleProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},isChecked:{defaultValue:{value:"false"},declarations:[{fileName:"DT-DDS/packages/react-packages/toggle/src/Toggle.tsx",name:"ToggleProps"}],description:"",name:"isChecked",parent:{fileName:"DT-DDS/packages/react-packages/toggle/src/Toggle.tsx",name:"ToggleProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},label:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toggle/src/Toggle.tsx",name:"ToggleProps"}],description:"",name:"label",parent:{fileName:"DT-DDS/packages/react-packages/toggle/src/Toggle.tsx",name:"ToggleProps"},required:!1,tags:{},type:{name:"string | undefined"}},onClick:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/toggle/src/Toggle.tsx",name:"ToggleProps"}],description:"",name:"onClick",parent:{fileName:"DT-DDS/packages/react-packages/toggle/src/Toggle.tsx",name:"ToggleProps"},required:!0,tags:{},type:{name:"(evt: KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLDivElement, MouseEvent>) => void"}},id:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"id",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},style:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"style",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"CSSProperties | undefined"}}},tags:{}}}catch{}})))()}t(N,"init_Toggle");export{N as n,p as t};
