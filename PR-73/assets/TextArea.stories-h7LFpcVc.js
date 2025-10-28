import{j as e}from"./jsx-runtime-CB_V9I5Y.js";import{I as Y}from"./Icon-DG6KDu5A.js";import{T as F}from"./Tooltip-C-yzLzHu.js";import{B as v}from"./index-CWvrgZ1b.js";import{L as Z}from"./LabelField-RcFWrG3B.js";import{T as L}from"./Typography-DHEP7O00.js";import{r as n}from"./index-CTjT7uj6.js";import{T as ee}from"./TextArea.styled-BsVBYT5E.js";import{d as te}from"./emotion-styled.browser.esm-DBghOYGd.js";import"./index-D9dZuxfj.js";import"./index-BF45nGO3.js";import"./emotion-react.browser.esm-Bwsi5GpN.js";import"./index-BAMY2Nnw.js";import"./iframe-CktrVyfk.js";import"./Portal-DUP4U3GD.js";import"./index-XjDa9cP3.js";import"./z-index-CLLOsryR.js";const R=({label:s,labelIcon:u,dataTestId:p,name:q,value:r,style:_,onChange:y,maxLength:f,variant:k="outlined",backgroundFill:H="contrast",enableResize:M=!1,disabled:m=!1,required:x=!1,hasError:W=!1,hasLabel:T=!0,message:$="",labelVariant:G="default",placeholder:J,readOnly:K,...a})=>{const[A,I]=n.useState(0),[C,j]=n.useState(!1),[N,g]=n.useState(""),[P,h]=n.useState(!1),E=te();n.useEffect(()=>{r?(g(r),I(r.length),h(!1)):g("")},[r]);const Q=t=>{g(t.target.value),h(!1),I(t.target.value.length),y&&y(t)},U=t=>{j(!0),a.onFocus&&a.onFocus(t)},X=t=>{j(!1),t.currentTarget.value.trim().length===0&&x&&h(!0),a.onBlur&&a.onBlur(t)},l=p??`${s.replaceAll(" ","-").toLocaleLowerCase()}-textarea`,S=m?"content.light":"content.medium",o=W||P,b=$,i=G==="floating";return e.jsxs(v,{style:{position:"relative",alignItems:"flex-start"},children:[T?e.jsx(Z,{hasError:o,htmlFor:l,icon:u,isActive:!!C,isDisabled:m,isFloating:i,isInputFilled:!!A,isRequired:x,style:{zIndex:1},children:s}):null,e.jsx(ee,{backgroundFill:H,"data-error":o,"data-testid":l,disabled:m,enableResize:M,hasError:o,hasLabel:T,id:l,isFloatingLabel:i,maxLength:f,name:q,readOnly:K,style:_,value:N,variant:k,...a,onBlur:X,onChange:Q,onFocus:U,...(!i||i&&C)&&{placeholder:J}}),e.jsxs(v,{style:{flexDirection:"row",justifyContent:"space-between",width:"100%",paddingInline:E.spacing.spacing_40,gap:E.spacing.spacing_30,marginTop:4},children:[b?e.jsx(L,{color:o?"error.default":S,element:"span",fontStyles:"bodySmRegular",children:b}):null,f?e.jsxs(L,{color:o?"error.default":S,dataTestId:"char-counter",element:"span",fontStyles:"bodySmRegular",id:l,...!b&&{style:{marginLeft:"auto"}},children:[A," / ",f]}):null]})]})},Te={title:"Data Display/TextArea",component:R,argTypes:{onChange:{options:[!0,void 0],control:{type:"radio",labels:{true:"Has onChange",undefined:"Does not have onChange"}}},maxLength:{control:{type:"number",min:1}},variant:{options:["outlined","bottomLine"],control:{type:"select"}},backgroundFill:{options:["default","contrast","light"],control:{type:"select"}},labelVariant:{options:["default","floating"],control:{type:"select"}}},render:({onChange:s,...u})=>e.jsx(R,{...u,...s&&{onChange:p=>console.log("data changed: ",p)}})},c={args:{label:"Awesome TextArea",value:"",variant:"outlined",backgroundFill:"default",required:!1,message:"Additional info",onChange:void 0,enableResize:!0,hasError:!1,disabled:!1,placeholder:"this is a placeholder",hasLabel:!0,labelVariant:"default",readOnly:!1}},d={args:{label:"My label",labelIcon:e.jsxs(F,{children:[e.jsx(Y,{code:"info",size:"s"}),e.jsx(F.Content,{children:"Additional info about the field"})]})}};var w,D,O;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(O=(D=c.parameters)==null?void 0:D.docs)==null?void 0:O.source}}};var z,B,V;d.parameters={...d.parameters,docs:{...(z=d.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    label: 'My label',
    labelIcon: <Tooltip>
        <Icon code='info' size='s' />
        <Tooltip.Content>Additional info about the field</Tooltip.Content>
      </Tooltip>
  }
}`,...(V=(B=d.parameters)==null?void 0:B.docs)==null?void 0:V.source}}};const Ae=["Default","TestAreaWithLabelIcon"];export{c as Default,d as TestAreaWithLabelIcon,Ae as __namedExportsOrder,Te as default};
