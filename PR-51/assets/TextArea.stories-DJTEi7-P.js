import{j as t}from"./jsx-runtime-CB_V9I5Y.js";import{B as j}from"./index-CWvrgZ1b.js";import{L as N}from"./LabelField-C7lK2vT2.js";import{T as v}from"./Typography-DuyBDrqy.js";import{r as o}from"./index-CTjT7uj6.js";import{T as P}from"./TextArea.styled-BB-m-9NJ.js";import{d as Q}from"./emotion-styled.browser.esm-DBghOYGd.js";import"./index-DjiMWOYD.js";const I=({label:n,dataTestId:d,name:f,value:r,style:L,onChange:b,maxLength:p,variant:B="outlined",backgroundFill:V="default",enableResize:q=!1,disabled:m=!1,required:A=!1,hasError:O=!1,hasLabel:g=!0,message:_="",labelVariant:k="default",placeholder:z,readOnly:l,...a})=>{const[E,T]=o.useState(0),[H,S]=o.useState(!1),[$,h]=o.useState(""),[G,y]=o.useState(!1),C=Q();o.useEffect(()=>{r?(h(r),T(r.length),y(!1)):h("")},[r]);const J=e=>{h(e.target.value),y(!1),T(e.target.value.length),b&&b(e)},K=e=>{S(!0),a.onFocus&&a.onFocus(e)},M=e=>{S(!1),e.currentTarget.value.trim().length===0&&A&&y(!0),a.onBlur&&a.onBlur(e)},i=d??`${n.replaceAll(" ","-").toLocaleLowerCase()}-textarea`,F=m||l?"content.light":"content.medium",s=O||G,x=_,c=k==="floating";return t.jsxs(j,{style:{position:"relative",alignItems:"flex-start"},children:[g?t.jsx(N,{hasError:s,htmlFor:i,isActive:!!(H&&!l),isDisabled:m||l,isFloating:c,isInputFilled:!!E,isRequired:A,style:{zIndex:1},children:n}):null,t.jsx(P,{backgroundFill:V,"data-error":s,"data-testid":i,disabled:m,enableResize:q,hasError:s,hasLabel:g,id:i,isFloatingLabel:c,maxLength:p,name:f,readOnly:l,style:L,value:$,variant:B,...a,onBlur:M,onChange:J,onFocus:K,...(!c||c&&!g)&&{placeholder:z}}),t.jsxs(j,{style:{flexDirection:"row",justifyContent:"space-between",width:"100%",paddingInline:C.spacing.spacing_40,gap:C.spacing.spacing_30,marginTop:4},children:[x?t.jsx(v,{color:s?"error.default":F,element:"span",fontStyles:"bodySmRegular",children:x}):null,p?t.jsxs(v,{color:s?"error.default":F,dataTestId:"char-counter",element:"span",fontStyles:"bodySmRegular",id:i,...!x&&{style:{marginLeft:"auto"}},children:[E," / ",p]}):null]})]})},oe={title:"Data Display/TextArea",component:I,argTypes:{onChange:{options:[!0,void 0],control:{type:"radio",labels:{true:"Has onChange",undefined:"Does not have onChange"}}},maxLength:{control:{type:"number",min:1}},variant:{options:["outlined","bottomLine"],control:{type:"select"}},backgroundFill:{options:["default","contrast","light"],control:{type:"select"}},labelVariant:{options:["default","floating"],control:{type:"select"}}},render:({onChange:n,...d})=>t.jsx(I,{...d,...n&&{onChange:f=>console.log("data changed: ",f)}})},u={args:{label:"Awesome TextArea",value:"",variant:"outlined",backgroundFill:"default",required:!1,message:"Additional info",onChange:void 0,enableResize:!0,hasError:!1,disabled:!1,placeholder:"this is a placeholder",hasLabel:!0,labelVariant:"default",readOnly:!1}};var R,w,D;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(D=(w=u.parameters)==null?void 0:w.docs)==null?void 0:D.source}}};const ne=["Default"];export{u as Default,ne as __namedExportsOrder,oe as default};
