var v=Object.defineProperty;var t=(e,a)=>v(e,"name",{value:a,configurable:!0});import{n as u}from"./rolldown-runtime-CzYk_CEw.js";import{t as q}from"./react-HNhQAnN4.js";import{c as _,f as S,n as C,t as I}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{t as T}from"./jsx-runtime-Br4tQxt1.js";import{t as V}from"./Typography-CpuCSOhm.js";import{t as R}from"./src-CYYpCRzL.js";import{t as b}from"./box-Dhy-LEcB.js";import{t as w}from"./typography-DTYrSqB7.js";var o,l;function P(){return(P=u((()=>{I(),o={large:{outerCircle:24,innerCircle:10},small:{outerCircle:20,innerCircle:8}},l=C.input`
  ${({theme:e,radioSize:a})=>`
    background: ${e.palette.surface.contrast};
    border: 1px solid ${e.palette.informative.default};
    border-radius: 50%;
    width: ${o[a].outerCircle}px;
    height: ${o[a].outerCircle}px;
    appearance: none;
    position: relative;
    cursor: pointer;
    flex-shrink: 0;

    &:disabled + label {
      color: ${e.palette.content.light};
    }

    &:hover {
      background: ${e.palette.informative.light};
    }

    &:checked:not(:disabled):hover {
      background: ${e.palette.informative.dark};
      border-color: ${e.palette.informative.dark};
    }

    &:checked {
      background: ${e.palette.informative.default};
    }

    &:disabled {
      pointer-events: none;
      cursor: not-allowed;
      border-color: ${e.palette.informative.light};
      background-color: ${e.palette.informative.light};
    }

    &:checked:before {
      content: "";
      width: ${o[a].innerCircle}px;
      height: ${o[a].innerCircle}px;
      background: ${e.palette.surface.contrast};
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &[data-error="true"] {
      border-color: ${e.palette.error.default};
    }

    &[data-error="true"]:hover {
      background-color: ${e.palette.error.light};
    }

    &[data-error="true"]:disabled {
      background-color: ${e.palette.error.light};
      border-color: ${e.palette.error.light};
    }

    &[data-error="true"]:checked {
      background-color: ${e.palette.error.default};
    }

    &[data-error="true"]:checked:disabled {
      background-color: ${e.palette.error.light};
      border-color: ${e.palette.error.light};
    }
    
    &[data-error="true"]:checked:not(:disabled):hover {
      background-color: ${e.palette.error.dark};
      border-color: ${e.palette.error.dark};
    }

    &:focus-visible {
      outline: 2px solid ${e.palette.primary.default};
      outline-offset: 2px;
    }
  `}
`;try{l.displayName="RadioInputStyled",l.__docgenInfo={description:"",displayName:"RadioInputStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/radio/src/Radio.styled.tsx",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}},radioSize:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/radio/src/Radio.styled.tsx",name:"RadioInputStyledProps"}],description:"",name:"radioSize",parent:{fileName:"DT-DDS/packages/react-packages/radio/src/Radio.styled.tsx",name:"RadioInputStyledProps"},required:!0,tags:{},type:{name:"RadioSize"}}},tags:{}}}catch{}})))()}t(P,"init_Radio_styled");var d,f;function h(){return(h=u((()=>{_(),b(),w(),P(),d=T(),f=t(({onChange:e,label:a,isChecked:m,isDefaultChecked:i,isDisabled:r,name:n="radio-group-name",value:p,hasError:g,size:s="large",dataTestId:x})=>{const y=`${p}-id`,$=S();return(0,d.jsxs)(R,{style:{flexDirection:"row",gap:$.spacing.spacing_30,cursor:r?"not-allowed":"pointer"},children:[(0,d.jsx)(l,{checked:m,"data-error":g,"data-testid":x,defaultChecked:i,disabled:r,id:y,name:n,onChange:e,radioSize:s,tabIndex:r?-1:0,type:"radio",value:p}),a?(0,d.jsx)(V,{element:"label",fontStyles:s==="large"?"bodyLgRegular":"bodyMdRegular",htmlFor:y,style:{cursor:r?"not-allowed":"pointer"},children:a}):null]})},"Radio");try{f.displayName="Radio",f.__docgenInfo={description:"",displayName:"Radio",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/radio/src/Radio.tsx",methods:[],props:{label:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/radio/src/types/types.ts",name:"RadioProps"}],description:"",name:"label",parent:{fileName:"DT-DDS/packages/react-packages/radio/src/types/types.ts",name:"RadioProps"},required:!1,tags:{},type:{name:"string | undefined"}},value:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/radio/src/types/types.ts",name:"RadioProps"}],description:"",name:"value",parent:{fileName:"DT-DDS/packages/react-packages/radio/src/types/types.ts",name:"RadioProps"},required:!0,tags:{},type:{name:"string"}},onChange:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/radio/src/types/types.ts",name:"RadioProps"}],description:"",name:"onChange",parent:{fileName:"DT-DDS/packages/react-packages/radio/src/types/types.ts",name:"RadioProps"},required:!1,tags:{},type:{name:"ChangeEventHandler<HTMLInputElement> | undefined"}},isChecked:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/radio/src/types/types.ts",name:"RadioProps"}],description:"",name:"isChecked",parent:{fileName:"DT-DDS/packages/react-packages/radio/src/types/types.ts",name:"RadioProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},isDisabled:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/radio/src/types/types.ts",name:"RadioProps"}],description:"",name:"isDisabled",parent:{fileName:"DT-DDS/packages/react-packages/radio/src/types/types.ts",name:"RadioProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},name:{defaultValue:{value:"radio-group-name"},declarations:[{fileName:"DT-DDS/packages/react-packages/radio/src/types/types.ts",name:"RadioProps"}],description:"",name:"name",parent:{fileName:"DT-DDS/packages/react-packages/radio/src/types/types.ts",name:"RadioProps"},required:!1,tags:{},type:{name:"string | undefined"}},hasError:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/radio/src/types/types.ts",name:"RadioProps"}],description:"",name:"hasError",parent:{fileName:"DT-DDS/packages/react-packages/radio/src/types/types.ts",name:"RadioProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},size:{defaultValue:{value:"large"},declarations:[{fileName:"DT-DDS/packages/react-packages/radio/src/types/types.ts",name:"RadioProps"}],description:"",name:"size",parent:{fileName:"DT-DDS/packages/react-packages/radio/src/types/types.ts",name:"RadioProps"},required:!1,tags:{},type:{name:"RadioSize | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/radio/src/types/types.ts",name:"RadioProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/radio/src/types/types.ts",name:"RadioProps"},required:!1,tags:{},type:{name:"string | undefined"}},isDefaultChecked:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/radio/src/types/types.ts",name:"RadioProps"}],description:"",name:"isDefaultChecked",parent:{fileName:"DT-DDS/packages/react-packages/radio/src/types/types.ts",name:"RadioProps"},required:!1,tags:{},type:{name:"boolean | undefined"}}},tags:{}}}catch{}})))()}t(h,"init_Radio");var c,k,D;function N(){return(N=u((()=>{c=q(),_(),b(),k=T(),D=t(({children:e,onChange:a,dataTestId:m,direction:i="row",size:r="large",name:n})=>{const p=S(),g=(0,c.useMemo)(()=>c.Children.map(e,s=>s&&(0,c.cloneElement)(s,{...s.props,onChange:a,name:n,size:r})),[e,a,n,r]);return(0,k.jsx)(R,{"data-testid":m??"radio-group",role:"radiogroup",style:{flexDirection:i,gap:p.spacing.spacing_40,alignItems:i==="row"?"center":"flex-start"},children:g})},"RadioGroup");try{D.displayName="RadioGroup",D.__docgenInfo={description:"",displayName:"RadioGroup",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/radio/src/RadioGroup.tsx",methods:[],props:{onChange:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/radio/src/types/types.ts",name:"RadioGroupProps"}],description:"",name:"onChange",parent:{fileName:"DT-DDS/packages/react-packages/radio/src/types/types.ts",name:"RadioGroupProps"},required:!0,tags:{},type:{name:"ChangeEventHandler<HTMLInputElement>"}},name:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/radio/src/types/types.ts",name:"RadioGroupProps"}],description:"",name:"name",parent:{fileName:"DT-DDS/packages/react-packages/radio/src/types/types.ts",name:"RadioGroupProps"},required:!0,tags:{},type:{name:"string"}},direction:{defaultValue:{value:"row"},declarations:[{fileName:"DT-DDS/packages/react-packages/radio/src/types/types.ts",name:"RadioGroupProps"}],description:"",name:"direction",parent:{fileName:"DT-DDS/packages/react-packages/radio/src/types/types.ts",name:"RadioGroupProps"},required:!1,tags:{},type:{name:"RadioDirection | undefined"}},size:{defaultValue:{value:"large"},declarations:[{fileName:"DT-DDS/packages/react-packages/radio/src/types/types.ts",name:"RadioGroupProps"}],description:"",name:"size",parent:{fileName:"DT-DDS/packages/react-packages/radio/src/types/types.ts",name:"RadioGroupProps"},required:!1,tags:{},type:{name:"RadioSize | undefined"}},id:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"id",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},style:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"style",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"CSSProperties | undefined"}}},tags:{}}}catch{}})))()}t(N,"init_RadioGroup");function G(){return(G=u((()=>{h(),N()})))()}t(G,"init_src");export{h as a,f as i,D as n,N as r,G as t};
