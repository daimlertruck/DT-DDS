var h=Object.defineProperty;var o=(e,a)=>h(e,"name",{value:a,configurable:!0});import{n as b}from"./rolldown-runtime-CzYk_CEw.js";import{n as l}from"./src-CdVmuwWR.js";import{t as y}from"./jsx-runtime-Br4tQxt1.js";import{t as T}from"./icon-eKXMH88R.js";import{t as m}from"./Tooltip-B5D20j7J.js";import{t as F}from"./tooltip-tlYBeAg2.js";import{n as L,t as f}from"./TextField-CdE026fh.js";var n,t,d,p,_,i,r,s,c,I;function u(){return(u=b((()=>{T(),F(),L(),n=y(),t={Text:"text",Date:"date",DatetimeLocal:"datetime-local",Email:"email",Month:"month",Number:"number",Password:"password",Search:"search",Tel:"tel",Time:"time",Url:"url",Week:"week"},d={component:(0,n.jsx)(l,{code:"home_work",size:"large"})},p={component:(0,n.jsx)(l,{code:"home_work",size:"large"})},_={component:f,title:"Data Display/TextField",argTypes:{onChange:{options:[!0,void 0],control:{type:"radio",labels:{true:"Has onChange",undefined:"Does not have onChange"}}},maxLength:{control:{type:"number",min:1}},extras:{options:["suffix","prefix","both","none"],control:{type:"select"}},type:{options:t,control:{type:"select"}},variant:{options:{outlined:"outlined",bottomLine:"bottomLine"},control:{type:"select"}},scale:{options:{compact:"compact",standard:"standard"},control:{type:"select"}},backgroundFill:{options:{default:"default",contrast:"contrast",light:"light"},control:{type:"select"}}},render:o(({onChange:e,extras:a,...g})=>(0,n.jsx)(f,{...g,...e&&{onChange:o(x=>console.log("data changed: ",x),"onChange")},...a==="prefix"&&{extraPrefix:d},...a==="suffix"&&{extraSuffix:p},...a==="both"&&{extraSuffix:p,extraPrefix:d}}),"render")},i={args:{type:t.Text,name:"field-name",label:"My label",id:"",message:"Additional info",initialValue:"Initial value",maxLength:void 0,required:!1,requiredMessage:"",onChange:void 0,hasError:!1,disabled:!1,isFloatingLabel:!0,readOnly:!1,placeholder:"My field placeholder",variant:"outlined",scale:"standard",backgroundFill:"default",extras:"none"}},r={args:{type:t.Search,isFloatingLabel:!1,name:"search",label:"Search",extraSuffix:{onClick:o(e=>console.log("search",e),"onClick"),component:(0,n.jsx)(l,{code:"search"})},onResetInput:o(()=>console.log("reset"),"onResetInput")}},s={args:{type:t.Text,isFloatingLabel:!1,name:"chat-box",label:"Write your sentence",extraSuffix:{onClick:o(e=>console.log("chat",e),"onClick"),component:(0,n.jsx)(l,{code:"send"})},onKeyDown:o(e=>{e.code==="Enter"&&console.log("ev",e)},"onKeyDown")}},c={args:{type:t.Text,isFloatingLabel:!1,name:"field-name",label:"My label",labelIcon:(0,n.jsxs)(m,{children:[(0,n.jsx)(l,{code:"info",size:"small"}),(0,n.jsx)(m.Content,{children:"Additional info about the field"})]}),message:"Additional info"}},I=["Default","SearchField","ChatInputField","WithLabelIcon"],i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    type: TextFieldTypeOptions.Text,
    name: 'field-name',
    label: 'My label',
    id: '',
    message: 'Additional info',
    initialValue: 'Initial value',
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
}`,...i.parameters?.docs?.source}}},r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}}})))()}o(u,"init_TextField_stories");u();export{s as ChatInputField,i as Default,r as SearchField,c as WithLabelIcon,I as __namedExportsOrder,_ as default};
