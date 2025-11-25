var j=Object.defineProperty;var o=(e,t)=>j(e,"name",{value:t,configurable:!0});import{j as n}from"./jsx-runtime-Cgz2XvFB.js";import{I as a}from"./Icon-BrO18bYS.js";import{T as d}from"./Tooltip-DuZu3vK4.js";import{T as p}from"./TextField-BrgSHtEW.js";import"./index-CwbBKW39.js";import"./emotion-styled.browser.esm-Cgg3GKEJ.js";import"./typography-B3nKKPHm.js";import"./index-Dj-bHsar.js";import"./emotion-react.browser.esm-DSneuyqi.js";import"./index-6Tx4pmSd.js";import"./iframe-BQbHYr-z.js";import"./z-index-BB_IPOEl.js";import"./index-DV-VXEUn.js";import"./IconButton-BxQ2uS0G.js";import"./LabelField-Drl51Bjy.js";import"./Typography-CEwLj33J.js";import"./index-Dw_1laFD.js";const l={Text:"text",Date:"date",DatetimeLocal:"datetime-local",Email:"email",Month:"month",Number:"number",Password:"password",Search:"search",Tel:"tel",Time:"time",Url:"url",Week:"week"},m={component:n.jsx(a,{code:"home_work",size:"large"})},f={component:n.jsx(a,{code:"home_work",size:"large"})},G={component:p,title:"Data Display/TextField",argTypes:{onChange:{options:[!0,void 0],control:{type:"radio",labels:{true:"Has onChange",undefined:"Does not have onChange"}}},maxLength:{control:{type:"number",min:1}},extras:{options:["suffix","prefix","both","none"],control:{type:"select"}},type:{options:l,control:{type:"select"}},variant:{options:{outlined:"outlined",bottomLine:"bottomLine"},control:{type:"select"}},scale:{options:{compact:"compact",standard:"standard"},control:{type:"select"}},backgroundFill:{options:{default:"default",contrast:"contrast",light:"light"},control:{type:"select"}}},render:o(({onChange:e,extras:t,...v})=>n.jsx(p,{...v,...e&&{onChange:o(k=>console.log("data changed: ",k),"onChange")},...t==="prefix"&&{extraPrefix:m},...t==="suffix"&&{extraSuffix:f},...t==="both"&&{extraSuffix:f,extraPrefix:m}}),"render")},r={args:{type:l.Text,name:"field-name",label:"My label",id:"",message:"Additional info",initialValue:"",maxLength:void 0,required:!1,requiredMessage:"",onChange:void 0,hasError:!1,disabled:!1,isFloatingLabel:!0,readOnly:!1,placeholder:"My field placeholder",variant:"outlined",scale:"standard",backgroundFill:"default",extras:"none"}},s={args:{type:l.Search,isFloatingLabel:!1,name:"search",label:"Search",extraSuffix:{onClick:o(e=>console.log("search",e),"onClick"),component:n.jsx(a,{code:"search"})},onResetInput:o(()=>console.log("reset"),"onResetInput")}},i={args:{type:l.Text,isFloatingLabel:!1,name:"chat-box",label:"Write your sentence",extraSuffix:{onClick:o(e=>console.log("chat",e),"onClick"),component:n.jsx(a,{code:"send"})},onKeyDown:o(e=>{e.code==="Enter"&&console.log("ev",e)},"onKeyDown")}},c={args:{type:l.Text,isFloatingLabel:!1,name:"field-name",label:"My label",labelIcon:n.jsxs(d,{children:[n.jsx(a,{code:"info",size:"small"}),n.jsx(d.Content,{children:"Additional info about the field"})]}),message:"Additional info"}};var u,g,x;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    type: TextFieldTypeOptions.Text,
    name: 'field-name',
    label: 'My label',
    id: '',
    message: 'Additional info',
    initialValue: '',
    maxLength: undefined,
    required: false,
    requiredMessage: '',
    onChange: undefined,
    hasError: false,
    disabled: false,
    isFloatingLabel: true,
    readOnly: false,
    placeholder: 'My field placeholder',
    variant: 'outlined',
    scale: 'standard',
    backgroundFill: 'default',
    extras: 'none'
  }
}`,...(x=(g=r.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var h,b,y;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(y=(b=s.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var T,F,L;i.parameters={...i.parameters,docs:{...(T=i.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(L=(F=i.parameters)==null?void 0:F.docs)==null?void 0:L.source}}};var S,C,I;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    type: TextFieldTypeOptions.Text,
    isFloatingLabel: false,
    name: 'field-name',
    label: 'My label',
    labelIcon: <Tooltip>
        <Icon code='info' size='small' />
        <Tooltip.Content>Additional info about the field</Tooltip.Content>
      </Tooltip>,
    message: 'Additional info'
  }
}`,...(I=(C=c.parameters)==null?void 0:C.docs)==null?void 0:I.source}}};const J=["Default","SearchField","ChatInputField","WithLabelIcon"];export{i as ChatInputField,r as Default,s as SearchField,c as WithLabelIcon,J as __namedExportsOrder,G as default};
