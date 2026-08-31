var b=Object.defineProperty;var s=(a,l)=>b(a,"name",{value:l,configurable:!0});import{o as m}from"./rolldown-runtime-CzYk_CEw.js";import{t as v}from"./react-HNhQAnN4.js";import{t as f}from"./jsx-runtime-Br4tQxt1.js";import{t}from"./src-C-DW4k1j.js";var h=m(v()),r=f(),{useArgs:g}=__STORYBOOK_MODULE_PREVIEW_API__,d=[{value:"opt1",label:"Option 1",isDisabled:!1},{value:"opt2",label:"Option 2",isDisabled:!1},{value:"opt3",label:"A text message to see how big labels will be handled",isDisabled:!1},{value:"opt4",label:"Option 3",isDisabled:!0},{value:"opt5",label:"Option 4",isDisabled:!1}],E={title:"Data Display/Select",component:t,argTypes:{helperText:{control:"text"},variant:{options:["outlined","bottom-line"],control:{type:"select"}},fill:{options:["default","contrast","light"],control:{type:"select"}},scale:{options:["standard","compact"],control:{type:"select"}}},render:s(({options:a,...l})=>{const[{value:u},p]=g(),c=s(e=>p({value:e}),"handleChange");return(0,r.jsx)(t,{...l,isMulti:!1,onChange:c,value:u,children:a.map((e,o)=>(0,r.jsxs)(t.Option,{index:o,isDisabled:e.isDisabled,value:e.value,valueLabel:e.label,children:[e.label," ",o===0?"- This is the first option!":""]},e.value))})},"render")},i={args:{options:d,label:"My label",helperText:"",isRequired:!1,hasError:!1,isDisabled:!1,value:"",isFloatingLabel:!0,scale:"standard",placeholder:"Insert an option"}},D=s(({options:a,value:l,...u})=>{const[p,c]=(0,h.useState)(l||[]);return(0,r.jsx)(t,{...u,isMulti:!0,onChange:c,value:p,children:a.map((e,o)=>(0,r.jsx)(t.Option,{index:o,isDisabled:e.isDisabled,value:e.value,children:e.label},e.value))})},"MultiSelectDemo"),n={args:{options:d,label:"My multi label",helperText:"Here to help you",isRequired:!1,hasError:!1,isDisabled:!1,isFloatingLabel:!1,variant:"bottom-line",fill:"contrast",scale:"compact",value:[]},render:s(a=>(0,r.jsx)(D,{...a}),"render")};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    options: options,
    label: 'My label',
    helperText: '',
    isRequired: false,
    hasError: false,
    isDisabled: false,
    value: '',
    isFloatingLabel: true,
    scale: 'standard',
    placeholder: 'Insert an option'
  }
}`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    options,
    label: 'My multi label',
    helperText: 'Here to help you',
    isRequired: false,
    hasError: false,
    isDisabled: false,
    isFloatingLabel: false,
    variant: 'bottom-line',
    fill: 'contrast',
    scale: 'compact',
    value: []
  },
  render: args => <MultiSelectDemo {...args} />
}`,...n.parameters?.docs?.source}}};var S=["Default","Multi"];export{i as Default,n as Multi,S as __namedExportsOrder,E as default};
