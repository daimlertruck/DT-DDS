var x=Object.defineProperty;var a=(e,o)=>x(e,"name",{value:o,configurable:!0});import{t}from"./src-Cgsrikn0.js";import{t as h}from"./jsx-runtime-Br4tQxt1.js";import"./icon-BVKwuEsa.js";import{t as d}from"./Tooltip-CV1x-ycZ.js";import"./tooltip-B7p4pHEA.js";import{t as p}from"./TextField-CCGb3PFn.js";var n=h(),l={Text:"text",Date:"date",DatetimeLocal:"datetime-local",Email:"email",Month:"month",Number:"number",Password:"password",Search:"search",Tel:"tel",Time:"time",Url:"url",Week:"week"},m={component:(0,n.jsx)(t,{code:"home_work",size:"large"})},u={component:(0,n.jsx)(t,{code:"home_work",size:"large"})},C={component:p,title:"Data Display/TextField",argTypes:{onChange:{options:[!0,void 0],control:{type:"radio",labels:{true:"Has onChange",undefined:"Does not have onChange"}}},maxLength:{control:{type:"number",min:1}},extras:{options:["suffix","prefix","both","none"],control:{type:"select"}},type:{options:l,control:{type:"select"}},variant:{options:{outlined:"outlined",bottomLine:"bottomLine"},control:{type:"select"}},scale:{options:{compact:"compact",standard:"standard"},control:{type:"select"}},backgroundFill:{options:{default:"default",contrast:"contrast",light:"light"},control:{type:"select"}}},render:a(({onChange:e,extras:o,...f})=>(0,n.jsx)(p,{...f,...e&&{onChange:a(g=>console.log("data changed: ",g),"onChange")},...o==="prefix"&&{extraPrefix:m},...o==="suffix"&&{extraSuffix:u},...o==="both"&&{extraSuffix:u,extraPrefix:m}}),"render")},r={args:{type:l.Text,name:"field-name",label:"My label",id:"",message:"Additional info",initialValue:"Initial value",maxLength:void 0,required:!1,requiredMessage:"",onChange:void 0,hasError:!1,disabled:!1,isFloatingLabel:!0,readOnly:!1,placeholder:"My field placeholder",variant:"outlined",scale:"standard",backgroundFill:"default",extras:"none"}},s={args:{type:l.Search,isFloatingLabel:!1,name:"search",label:"Search",extraSuffix:{onClick:a(e=>console.log("search",e),"onClick"),component:(0,n.jsx)(t,{code:"search"})},onResetInput:a(()=>console.log("reset"),"onResetInput")}},i={args:{type:l.Text,isFloatingLabel:!1,name:"chat-box",label:"Write your sentence",extraSuffix:{onClick:a(e=>console.log("chat",e),"onClick"),component:(0,n.jsx)(t,{code:"send"})},onKeyDown:a(e=>{e.code==="Enter"&&console.log("ev",e)},"onKeyDown")}},c={args:{type:l.Text,isFloatingLabel:!1,name:"field-name",label:"My label",labelIcon:(0,n.jsxs)(d,{children:[(0,n.jsx)(t,{code:"info",size:"small"}),(0,n.jsx)(d.Content,{children:"Additional info about the field"})]}),message:"Additional info"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}};var I=["Default","SearchField","ChatInputField","WithLabelIcon"];export{i as ChatInputField,r as Default,s as SearchField,c as WithLabelIcon,I as __namedExportsOrder,C as default};
