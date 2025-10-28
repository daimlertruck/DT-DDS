import{j as n}from"./jsx-runtime-CB_V9I5Y.js";import{I as o}from"./Icon-DG6KDu5A.js";import{T as c}from"./Tooltip-fp-R2RX5.js";import{T as d}from"./TextField-BhtE27TS.js";import"./index-CTjT7uj6.js";import"./emotion-styled.browser.esm-DBghOYGd.js";import"./index-D9dZuxfj.js";import"./index-DykUrzBO.js";import"./emotion-react.browser.esm-Bwsi5GpN.js";import"./index-BAMY2Nnw.js";import"./iframe-DR_4D0QD.js";import"./Portal-DUP4U3GD.js";import"./index-XjDa9cP3.js";import"./z-index-CLLOsryR.js";import"./IconButton-C_mszqXk.js";import"./LabelField-RcFWrG3B.js";import"./Typography-DHEP7O00.js";import"./TextField.styled-C4hZ2kmn.js";const t={Text:"text",Date:"date",DatetimeLocal:"datetime-local",Email:"email",Month:"month",Number:"number",Password:"password",Search:"search",Tel:"tel",Time:"time",Url:"url",Week:"week"},p={component:n.jsx(o,{code:"home_work",size:"l"})},m={component:n.jsx(o,{code:"home_work",size:"l"})},U={component:d,title:"Data Display/TextField",argTypes:{onChange:{options:[!0,void 0],control:{type:"radio",labels:{true:"Has onChange",undefined:"Does not have onChange"}}},maxLength:{control:{type:"number",min:1}},extras:{options:["suffix","prefix","both","none"],control:{type:"select"}},type:{options:t,control:{type:"select"}},variant:{options:{outlined:"outlined",bottomLine:"bottomLine"},control:{type:"select"}},backgroundFill:{options:{default:"default",contrast:"contrast",light:"light"},control:{type:"select"}}},render:({onChange:e,extras:s,...I})=>n.jsx(d,{...I,...e&&{onChange:v=>console.log("data changed: ",v)},...s==="prefix"&&{extraPrefix:p},...s==="suffix"&&{extraSuffix:m},...s==="both"&&{extraSuffix:m,extraPrefix:p}})},a={args:{type:t.Text,name:"field-name",label:"My label",id:"",message:"Additional info",initialValue:"",maxLength:void 0,required:!0,requiredMessage:"",onChange:void 0,hasError:!1,disabled:!1,isFloatingLabel:!0,readOnly:!1,placeholder:"My field placeholder",variant:"outlined",backgroundFill:"default",extras:"none"}},l={args:{type:t.Search,isFloatingLabel:!1,name:"search",label:"Search",extraSuffix:{onClick:e=>console.log("search",e),component:n.jsx(o,{code:"search"})},onResetInput:()=>console.log("reset")}},r={args:{type:t.Text,isFloatingLabel:!1,name:"chat-box",label:"Write your sentence",extraSuffix:{onClick:e=>console.log("chat",e),component:n.jsx(o,{code:"send"})},onKeyDown:e=>{e.code==="Enter"&&console.log("ev",e)}}},i={args:{type:t.Text,isFloatingLabel:!1,name:"field-name",label:"My label",labelIcon:n.jsxs(c,{children:[n.jsx(o,{code:"info",size:"s"}),n.jsx(c.Content,{children:"Additional info about the field"})]}),message:"Additional info"}};var u,f,g;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    type: TextFieldTypeOptions.Text,
    name: 'field-name',
    label: 'My label',
    id: '',
    message: 'Additional info',
    initialValue: '',
    maxLength: undefined,
    required: true,
    requiredMessage: '',
    onChange: undefined,
    hasError: false,
    disabled: false,
    isFloatingLabel: true,
    readOnly: false,
    placeholder: 'My field placeholder',
    variant: 'outlined',
    backgroundFill: 'default',
    extras: 'none'
  }
}`,...(g=(f=a.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var x,h,b;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    type: TextFieldTypeOptions.Search,
    isFloatingLabel: false,
    name: 'search',
    label: 'Search',
    extraSuffix: {
      onClick: (text: string) => console.log('search', text),
      component: <Icon code='search' />
    },
    onResetInput: () => console.log('reset')
  }
}`,...(b=(h=l.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};var y,T,F;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    type: TextFieldTypeOptions.Text,
    isFloatingLabel: false,
    name: 'chat-box',
    label: 'Write your sentence',
    extraSuffix: {
      onClick: (text: string) => console.log('chat', text),
      component: <Icon code='send' />
    },
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.code === 'Enter') {
        console.log('ev', event);
      }
    }
  }
}`,...(F=(T=r.parameters)==null?void 0:T.docs)==null?void 0:F.source}}};var L,S,C;i.parameters={...i.parameters,docs:{...(L=i.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    type: TextFieldTypeOptions.Text,
    isFloatingLabel: false,
    name: 'field-name',
    label: 'My label',
    labelIcon: <Tooltip>
        <Icon code='info' size='s' />
        <Tooltip.Content>Additional info about the field</Tooltip.Content>
      </Tooltip>,
    message: 'Additional info'
  }
}`,...(C=(S=i.parameters)==null?void 0:S.docs)==null?void 0:C.source}}};const B=["Default","SearchField","ChatInputField","WithLabelIcon"];export{r as ChatInputField,a as Default,l as SearchField,i as WithLabelIcon,B as __namedExportsOrder,U as default};
