var d=Object.defineProperty;var l=(n,t)=>d(n,"name",{value:t,configurable:!0});import{t as c}from"./src-Cgsrikn0.js";import{t as u}from"./jsx-runtime-Br4tQxt1.js";import"./icon-BVKwuEsa.js";import{t as r}from"./Tooltip-CV1x-ycZ.js";import"./tooltip-B7p4pHEA.js";import{t as s}from"./TextArea-Kl-DJnzM.js";var o=u(),x={title:"Data Display/TextArea",component:s,argTypes:{onChange:{options:[!0,void 0],control:{type:"radio",labels:{true:"Has onChange",undefined:"Does not have onChange"}}},maxLength:{control:{type:"number",min:1}},variant:{options:["outlined","bottomLine"],control:{type:"select"}},backgroundFill:{options:["default","contrast","light"],control:{type:"select"}},labelVariant:{options:["default","floating"],control:{type:"select"}}},render:l(({onChange:n,...t})=>(0,o.jsx)(s,{...t,...n&&{onChange:l(i=>console.log("data changed: ",i),"onChange")}}),"render")},e={args:{label:"Awesome TextArea",value:"",variant:"outlined",backgroundFill:"default",required:!1,message:"Additional info",onChange:void 0,enableResize:!0,hasError:!1,disabled:!1,placeholder:"this is a placeholder",hasLabel:!0,labelVariant:"default",readOnly:!1}},a={args:{label:"My label",labelIcon:(0,o.jsxs)(r,{children:[(0,o.jsx)(c,{code:"info",size:"small"}),(0,o.jsx)(r.Content,{children:"Additional info about the field"})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'My label',
    labelIcon: <Tooltip>
        <Icon code='info' size='small' />
        <Tooltip.Content>Additional info about the field</Tooltip.Content>
      </Tooltip>
  }
}`,...a.parameters?.docs?.source}}};var A=["Default","TestAreaWithLabelIcon"];export{e as Default,a as TestAreaWithLabelIcon,A as __namedExportsOrder,x as default};
