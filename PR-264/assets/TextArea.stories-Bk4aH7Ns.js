var c=Object.defineProperty;var n=(t,r)=>c(t,"name",{value:r,configurable:!0});import{n as p}from"./rolldown-runtime-CzYk_CEw.js";import{n as u}from"./src-CQysuBx9.js";import{t as m}from"./jsx-runtime-Br4tQxt1.js";import{t as f}from"./icon-DzQ0uhXD.js";import{t as l}from"./Tooltip-BHH6gQjB.js";import{t as b}from"./tooltip-CvrcS29q.js";import{n as h,t as i}from"./TextArea-Chj6kM_1.js";var e,g,a,o,x;function s(){return(s=p((()=>{f(),b(),h(),e=m(),g={title:"Data Display/TextArea",component:i,argTypes:{onChange:{options:[!0,void 0],control:{type:"radio",labels:{true:"Has onChange",undefined:"Does not have onChange"}}},maxLength:{control:{type:"number",min:1}},variant:{options:["outlined","bottomLine"],control:{type:"select"}},backgroundFill:{options:["default","contrast","light"],control:{type:"select"}},labelVariant:{options:["default","floating"],control:{type:"select"}}},render:n(({onChange:t,...r})=>(0,e.jsx)(i,{...r,...t&&{onChange:n(d=>console.log("data changed: ",d),"onChange")}}),"render")},a={args:{label:"Awesome TextArea",value:"",variant:"outlined",backgroundFill:"default",required:!1,message:"Additional info",onChange:void 0,enableResize:!0,hasError:!1,disabled:!1,placeholder:"this is a placeholder",hasLabel:!0,labelVariant:"default",readOnly:!1}},o={args:{label:"My label",labelIcon:(0,e.jsxs)(l,{children:[(0,e.jsx)(u,{code:"info",size:"small"}),(0,e.jsx)(l.Content,{children:"Additional info about the field"})]})}},x=["Default","TestAreaWithLabelIcon"],a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'My label',
    labelIcon: <Tooltip>
        <Icon code='info' size='small' />
        <Tooltip.Content>Additional info about the field</Tooltip.Content>
      </Tooltip>
  }
}`,...o.parameters?.docs?.source}}}})))()}n(s,"init_TextArea_stories");s();export{a as Default,o as TestAreaWithLabelIcon,x as __namedExportsOrder,g as default};
