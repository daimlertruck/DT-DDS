import{j as n}from"./jsx-runtime-CB_V9I5Y.js";import{I as r}from"./Icon-XPmSDfR_.js";import{T as i}from"./TextField-y79gNTuP.js";import"./index-CTjT7uj6.js";import"./emotion-styled.browser.esm-DuL_gwYN.js";import"./IconButton-BBUlNHzM.js";import"./LabelField-Cz8KmoVn.js";import"./Typography-DqiQHYtc.js";import"./index-DH0gh8dm.js";import"./index-B_xFk7rk.js";import"./index-BAMY2Nnw.js";import"./iframe-DHyaC4sx.js";import"./TextField.styled-B7HBn3fh.js";const l={Text:"text",Date:"date",DatetimeLocal:"datetime-local",Email:"email",Month:"month",Number:"number",Password:"password",Search:"search",Tel:"tel",Time:"time",Url:"url",Week:"week"},c={component:n.jsx(r,{code:"home_work",size:"l"})},d={component:n.jsx(r,{code:"home_work",size:"l"})},R={component:i,title:"Data Display/TextField",argTypes:{onChange:{options:[!0,void 0],control:{type:"radio",labels:{true:"Has onChange",undefined:"Does not have onChange"}}},maxLength:{control:{type:"number",min:1}},extras:{options:["suffix","prefix","both","none"],control:{type:"select"}},type:{options:l,control:{type:"select"}},variant:{options:{outlined:"outlined",bottomLine:"bottomLine"},control:{type:"select"}},backgroundFill:{options:{default:"default",contrast:"contrast",light:"light"},control:{type:"select"}}},render:({onChange:e,extras:s,...T})=>n.jsx(i,{...T,...e&&{onChange:F=>console.log("data changed: ",F)},...s==="prefix"&&{extraPrefix:c},...s==="suffix"&&{extraSuffix:d},...s==="both"&&{extraSuffix:d,extraPrefix:c}})},o={args:{type:l.Text,name:"field-name",label:"My label",id:"",message:"Additional info",initialValue:"",maxLength:void 0,required:!0,requiredMessage:"",onChange:void 0,hasError:!1,disabled:!1,isFloatingLabel:!0,readOnly:!1,placeholder:"My field placeholder",variant:"outlined",backgroundFill:"default",extras:"none"}},t={args:{type:l.Search,isFloatingLabel:!1,name:"search",label:"Search",extraSuffix:{onClick:e=>console.log("search",e),component:n.jsx(r,{code:"search"})},onResetInput:()=>console.log("reset")}},a={args:{type:l.Text,isFloatingLabel:!1,name:"chat-box",label:"Write your sentence",extraSuffix:{onClick:e=>console.log("chat",e),component:n.jsx(r,{code:"send"})},onKeyDown:e=>{e.code==="Enter"&&console.log("ev",e)}}};var p,m,u;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(u=(m=o.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var f,x,g;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(g=(x=t.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var h,b,y;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(y=(b=a.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};const _=["Default","SearchField","ChatInputField"];export{a as ChatInputField,o as Default,t as SearchField,_ as __namedExportsOrder,R as default};
