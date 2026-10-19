var v=Object.defineProperty;var l=(a,t)=>v(a,"name",{value:t,configurable:!0});import{n as g}from"./rolldown-runtime-CzYk_CEw.js";import{t as _}from"./react-HNhQAnN4.js";import{t as D}from"./jsx-runtime-Br4tQxt1.js";import{n as r,t as x}from"./src-nSsleX8-.js";var b,s,m,d,M,i,f,n,y;function h(){return(h=g((()=>{b=_(),x(),s=D(),{useArgs:m}=__STORYBOOK_MODULE_PREVIEW_API__,d=[{value:"opt1",label:"Option 1",isDisabled:!1},{value:"opt2",label:"Option 2",isDisabled:!1},{value:"opt3",label:"A text message to see how big labels will be handled",isDisabled:!1},{value:"opt4",label:"Option 3",isDisabled:!0},{value:"opt5",label:"Option 4",isDisabled:!1}],M={title:"Data Display/Select",component:r,argTypes:{helperText:{control:"text"},variant:{options:["outlined","bottom-line"],control:{type:"select"}},fill:{options:["default","contrast","light"],control:{type:"select"}},scale:{options:["standard","compact"],control:{type:"select"}}},render:l(({options:a,...t})=>{const[{value:u},p]=m(),c=l(e=>p({value:e}),"handleChange");return(0,s.jsx)(r,{...t,isMulti:!1,onChange:c,value:u,children:a.map((e,o)=>(0,s.jsxs)(r.Option,{index:o,isDisabled:e.isDisabled,value:e.value,valueLabel:e.label,children:[e.label," ",o===0?"- This is the first option!":""]},e.value))})},"render")},i={args:{options:d,label:"My label",helperText:"",isRequired:!1,hasError:!1,isDisabled:!1,value:"",isFloatingLabel:!0,scale:"standard",placeholder:"Insert an option"}},f=l(({options:a,value:t,...u})=>{const[p,c]=(0,b.useState)(t||[]);return(0,s.jsx)(r,{...u,isMulti:!0,onChange:c,value:p,children:a.map((e,o)=>(0,s.jsx)(r.Option,{index:o,isDisabled:e.isDisabled,value:e.value,children:e.label},e.value))})},"MultiSelectDemo"),n={args:{options:d,label:"My multi label",helperText:"Here to help you",isRequired:!1,hasError:!1,isDisabled:!1,isFloatingLabel:!1,variant:"bottom-line",fill:"contrast",scale:"compact",value:[]},render:l(a=>(0,s.jsx)(f,{...a}),"render")},y=["Default","Multi"],i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}},n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}}})))()}l(h,"init_Select_stories");h();export{i as Default,n as Multi,y as __namedExportsOrder,M as default};
