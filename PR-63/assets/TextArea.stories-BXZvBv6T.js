import{j as e}from"./jsx-runtime-CB_V9I5Y.js";import{I as Y}from"./Icon-DG6KDu5A.js";import{T as F}from"./Tooltip-_Y7uRMQk.js";import{B as v}from"./index-CWvrgZ1b.js";import{L as Z,i as ee}from"./LabelField-BX4w1v4m.js";import{T as L}from"./Typography-DOQ44quZ.js";import{r as s}from"./index-CTjT7uj6.js";import{T as te}from"./TextArea.styled-BB-m-9NJ.js";import{d as oe}from"./emotion-styled.browser.esm-DBghOYGd.js";import"./index-BV8q0bTk.js";import"./index-DZ51WQyF.js";import"./emotion-react.browser.esm-Bwsi5GpN.js";import"./index-BAMY2Nnw.js";import"./iframe-CbNwYUkv.js";import"./Portal-DUP4U3GD.js";import"./index-XjDa9cP3.js";import"./z-index-CLLOsryR.js";const R=({label:n,labelIcon:r,dataTestId:p,name:O,value:l,style:_,onChange:T,maxLength:f,variant:k="outlined",backgroundFill:H="contrast",enableResize:M=!1,disabled:m=!1,required:A=!1,hasError:W=!1,hasLabel:g=!0,message:$="",labelVariant:G="default",placeholder:J,readOnly:i,...o})=>{const[I,C]=s.useState(0),[K,E]=s.useState(!1),[N,h]=s.useState(""),[P,b]=s.useState(!1),j=oe();s.useEffect(()=>{l?(h(l),C(l.length),b(!1)):h("")},[l]);const Q=t=>{h(t.target.value),b(!1),C(t.target.value.length),T&&T(t)},U=t=>{E(!0),o.onFocus&&o.onFocus(t)},X=t=>{E(!1),t.currentTarget.value.trim().length===0&&A&&b(!0),o.onBlur&&o.onBlur(t)},c=p??`${n.replaceAll(" ","-").toLocaleLowerCase()}-textarea`,S=m||i?"content.light":"content.medium",a=W||P,x=$,y=G==="floating";return e.jsxs(v,{style:{position:"relative",alignItems:"flex-start"},children:[g?e.jsx(Z,{hasError:a,htmlFor:c,...ee(r)&&{icon:r},isActive:!!(K&&!i),isDisabled:m||i,isFloating:y,isInputFilled:!!I,isRequired:A,style:{zIndex:1},children:n}):null,e.jsx(te,{backgroundFill:H,"data-error":a,"data-testid":c,disabled:m,enableResize:M,hasError:a,hasLabel:g,id:c,isFloatingLabel:y,maxLength:f,name:O,readOnly:i,style:_,value:N,variant:k,...o,onBlur:X,onChange:Q,onFocus:U,...(!y||!g)&&{placeholder:J}}),e.jsxs(v,{style:{flexDirection:"row",justifyContent:"space-between",width:"100%",paddingInline:j.spacing.spacing_40,gap:j.spacing.spacing_30,marginTop:4},children:[x?e.jsx(L,{color:a?"error.default":S,element:"span",fontStyles:"bodySmRegular",children:x}):null,f?e.jsxs(L,{color:a?"error.default":S,dataTestId:"char-counter",element:"span",fontStyles:"bodySmRegular",id:c,...!x&&{style:{marginLeft:"auto"}},children:[I," / ",f]}):null]})]})},Ae={title:"Data Display/TextArea",component:R,argTypes:{onChange:{options:[!0,void 0],control:{type:"radio",labels:{true:"Has onChange",undefined:"Does not have onChange"}}},maxLength:{control:{type:"number",min:1}},variant:{options:["outlined","bottomLine"],control:{type:"select"}},backgroundFill:{options:["default","contrast","light"],control:{type:"select"}},labelVariant:{options:["default","floating"],control:{type:"select"}}},render:({onChange:n,...r})=>e.jsx(R,{...r,...n&&{onChange:p=>console.log("data changed: ",p)}})},d={args:{label:"Awesome TextArea",value:"",variant:"outlined",backgroundFill:"default",required:!1,message:"Additional info",onChange:void 0,enableResize:!0,hasError:!1,disabled:!1,placeholder:"this is a placeholder",hasLabel:!0,labelVariant:"default",readOnly:!1}},u={args:{label:"My label",labelIcon:e.jsxs(F,{children:[e.jsx(Y,{code:"info",size:"s"}),e.jsx(F.Content,{children:"Additional info about the field"})]})}};var w,D,z;d.parameters={...d.parameters,docs:{...(w=d.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    label: 'Awesome TextArea',
    value: '',
    variant: 'outlined',
    backgroundFill: 'default',
    required: false,
    message: 'Additional info',
    onChange: undefined,
    enableResize: true,
    hasError: false,
    disabled: false,
    placeholder: 'this is a placeholder',
    hasLabel: true,
    labelVariant: 'default',
    readOnly: false
  }
}`,...(z=(D=d.parameters)==null?void 0:D.docs)==null?void 0:z.source}}};var B,V,q;u.parameters={...u.parameters,docs:{...(B=u.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    label: 'My label',
    labelIcon: <Tooltip>
        <Icon code='info' size='s' />
        <Tooltip.Content>Additional info about the field</Tooltip.Content>
      </Tooltip>
  }
}`,...(q=(V=u.parameters)==null?void 0:V.docs)==null?void 0:q.source}}};const Ie=["Default","TestAreaWithLabelIcon"];export{d as Default,u as TestAreaWithLabelIcon,Ie as __namedExportsOrder,Ae as default};
