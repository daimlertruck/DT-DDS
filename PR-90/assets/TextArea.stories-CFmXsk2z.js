import{j as e}from"./jsx-runtime-CB_V9I5Y.js";import{I as Y}from"./Icon-w916x_k_.js";import{T as F}from"./Tooltip-D8tdQe7l.js";import{B as v}from"./index-CWvrgZ1b.js";import{L as Z}from"./LabelField-mvyT1FXM.js";import{T as L}from"./Typography-Bb7lZ69m.js";import{r as n}from"./index-CTjT7uj6.js";import{T as ee}from"./TextArea.styled-DaEzWfco.js";import{d as te}from"./emotion-styled.browser.esm-DBghOYGd.js";import"./index-D9dZuxfj.js";import"./index-CwFlNckG.js";import"./emotion-react.browser.esm-Bwsi5GpN.js";import"./index-BAMY2Nnw.js";import"./iframe-CIs6ZILW.js";import"./z-index-DWgeqfVW.js";import"./index-XjDa9cP3.js";const R=({label:s,labelIcon:d,dataTestId:u,name:q,value:r,style:_,onChange:y,maxLength:p,variant:k="outlined",backgroundFill:H="contrast",enableResize:M=!1,disabled:f=!1,required:x=!1,hasError:W=!1,hasLabel:T=!0,message:$="",labelVariant:G="default",placeholder:J,readOnly:K,...a})=>{const[A,I]=n.useState(0),[C,j]=n.useState(!1),[N,m]=n.useState(""),[P,g]=n.useState(!1),E=te();n.useEffect(()=>{r?(m(r),I(r.length),g(!1)):m("")},[r]);const Q=t=>{m(t.target.value),g(!1),I(t.target.value.length),y&&y(t)},U=t=>{j(!0),a.onFocus&&a.onFocus(t)},X=t=>{j(!1),t.currentTarget.value.trim().length===0&&x&&g(!0),a.onBlur&&a.onBlur(t)},l=u??`${s.replaceAll(" ","-").toLocaleLowerCase()}-textarea`,S=f?"content.light":"content.medium",o=W||P,h=$,b=G==="floating";return e.jsxs(v,{style:{position:"relative",alignItems:"flex-start"},children:[T?e.jsx(Z,{hasError:o,htmlFor:l,icon:d,isActive:C,isDisabled:f,isFloating:b,isInputFilled:!!A,isRequired:x,style:{zIndex:1},children:s}):null,e.jsx(ee,{backgroundFill:H,"data-error":o,"data-testid":l,disabled:f,enableResize:M,hasError:o,hasLabel:T,id:l,isFloatingLabel:b,maxLength:p,name:q,readOnly:K,style:_,value:N,variant:k,...a,onBlur:X,onChange:Q,onFocus:U,...(!b||C)&&{placeholder:J}}),e.jsxs(v,{style:{flexDirection:"row",justifyContent:"space-between",width:"100%",paddingInline:E.spacing.spacing_40,gap:E.spacing.spacing_30,marginTop:4},children:[h?e.jsx(L,{color:o?"error.default":S,element:"span",fontStyles:"bodySmRegular",children:h}):null,p?e.jsxs(L,{color:o?"error.default":S,dataTestId:"char-counter",element:"span",fontStyles:"bodySmRegular",id:l,...!h&&{style:{marginLeft:"auto"}},children:[A," / ",p]}):null]})]})},xe={title:"Data Display/TextArea",component:R,argTypes:{onChange:{options:[!0,void 0],control:{type:"radio",labels:{true:"Has onChange",undefined:"Does not have onChange"}}},maxLength:{control:{type:"number",min:1}},variant:{options:["outlined","bottomLine"],control:{type:"select"}},backgroundFill:{options:["default","contrast","light"],control:{type:"select"}},labelVariant:{options:["default","floating"],control:{type:"select"}}},render:({onChange:s,...d})=>e.jsx(R,{...d,...s&&{onChange:u=>console.log("data changed: ",u)}})},i={args:{label:"Awesome TextArea",value:"",variant:"outlined",backgroundFill:"default",required:!1,message:"Additional info",onChange:void 0,enableResize:!0,hasError:!1,disabled:!1,placeholder:"this is a placeholder",hasLabel:!0,labelVariant:"default",readOnly:!1}},c={args:{label:"My label",labelIcon:e.jsxs(F,{children:[e.jsx(Y,{code:"info",size:"small"}),e.jsx(F.Content,{children:"Additional info about the field"})]})}};var w,D,O;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(O=(D=i.parameters)==null?void 0:D.docs)==null?void 0:O.source}}};var z,B,V;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    label: 'My label',
    labelIcon: <Tooltip>
        <Icon code='info' size='small' />
        <Tooltip.Content>Additional info about the field</Tooltip.Content>
      </Tooltip>
  }
}`,...(V=(B=c.parameters)==null?void 0:B.docs)==null?void 0:V.source}}};const Te=["Default","TestAreaWithLabelIcon"];export{i as Default,c as TestAreaWithLabelIcon,Te as __namedExportsOrder,xe as default};
