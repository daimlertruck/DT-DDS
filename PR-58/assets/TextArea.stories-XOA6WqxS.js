import{j as t}from"./jsx-runtime-CB_V9I5Y.js";import{B as j}from"./index-CWvrgZ1b.js";import{L as N}from"./LabelField-tOX1zNx_.js";import{T as v}from"./Typography-DOQ44quZ.js";import{r as o}from"./index-CTjT7uj6.js";import{T as P}from"./TextArea.styled-BB-m-9NJ.js";import{d as Q}from"./emotion-styled.browser.esm-DBghOYGd.js";import"./index-BV8q0bTk.js";const I=({label:n,dataTestId:u,name:d,value:r,style:L,onChange:b,maxLength:f,variant:B="outlined",backgroundFill:V="contrast",enableResize:q=!1,disabled:p=!1,required:A=!1,hasError:O=!1,hasLabel:m=!0,message:_="",labelVariant:k="default",placeholder:z,readOnly:l,...a})=>{const[E,T]=o.useState(0),[H,S]=o.useState(!1),[$,g]=o.useState(""),[G,h]=o.useState(!1),C=Q();o.useEffect(()=>{r?(g(r),T(r.length),h(!1)):g("")},[r]);const J=e=>{g(e.target.value),h(!1),T(e.target.value.length),b&&b(e)},K=e=>{S(!0),a.onFocus&&a.onFocus(e)},M=e=>{S(!1),e.currentTarget.value.trim().length===0&&A&&h(!0),a.onBlur&&a.onBlur(e)},i=u??`${n.replaceAll(" ","-").toLocaleLowerCase()}-textarea`,F=p||l?"content.light":"content.medium",s=O||G,y=_,x=k==="floating";return t.jsxs(j,{style:{position:"relative",alignItems:"flex-start"},children:[m?t.jsx(N,{hasError:s,htmlFor:i,isActive:!!(H&&!l),isDisabled:p||l,isFloating:x,isInputFilled:!!E,isRequired:A,style:{zIndex:1},children:n}):null,t.jsx(P,{backgroundFill:V,"data-error":s,"data-testid":i,disabled:p,enableResize:q,hasError:s,hasLabel:m,id:i,isFloatingLabel:x,maxLength:f,name:d,readOnly:l,style:L,value:$,variant:B,...a,onBlur:M,onChange:J,onFocus:K,...(!x||!m)&&{placeholder:z}}),t.jsxs(j,{style:{flexDirection:"row",justifyContent:"space-between",width:"100%",paddingInline:C.spacing.spacing_40,gap:C.spacing.spacing_30,marginTop:4},children:[y?t.jsx(v,{color:s?"error.default":F,element:"span",fontStyles:"bodySmRegular",children:y}):null,f?t.jsxs(v,{color:s?"error.default":F,dataTestId:"char-counter",element:"span",fontStyles:"bodySmRegular",id:i,...!y&&{style:{marginLeft:"auto"}},children:[E," / ",f]}):null]})]})},oe={title:"Data Display/TextArea",component:I,argTypes:{onChange:{options:[!0,void 0],control:{type:"radio",labels:{true:"Has onChange",undefined:"Does not have onChange"}}},maxLength:{control:{type:"number",min:1}},variant:{options:["outlined","bottomLine"],control:{type:"select"}},backgroundFill:{options:["default","contrast","light"],control:{type:"select"}},labelVariant:{options:["default","floating"],control:{type:"select"}}},render:({onChange:n,...u})=>t.jsx(I,{...u,...n&&{onChange:d=>console.log("data changed: ",d)}})},c={args:{label:"Awesome TextArea",value:"",variant:"outlined",backgroundFill:"default",required:!1,message:"Additional info",onChange:void 0,enableResize:!0,hasError:!1,disabled:!1,placeholder:"this is a placeholder",hasLabel:!0,labelVariant:"default",readOnly:!1}};var R,w,D;c.parameters={...c.parameters,docs:{...(R=c.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(D=(w=c.parameters)==null?void 0:w.docs)==null?void 0:D.source}}};const ne=["Default"];export{c as Default,ne as __namedExportsOrder,oe as default};
