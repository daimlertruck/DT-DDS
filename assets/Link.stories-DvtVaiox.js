var s=Object.defineProperty;var n=(o,i)=>s(o,"name",{value:i,configurable:!0});import{t as l}from"./jsx-runtime-Br4tQxt1.js";import{t as a}from"./src-CxEIoE7R.js";import{t as c}from"./codes-CRg7uRnw.js";var d=l(),f={component:a,title:"Data Display/Link",argTypes:{children:{control:"text"},target:{control:"text"},href:{control:"text"},size:{options:["small","medium","large"],control:{type:"select"},description:"Sets the size of text"},isDisabled:{control:{type:"boolean"},defaultValue:{summary:!1},description:"Sets the link disabled"},color:{options:["primary","secondary"],control:{type:"select"},description:"Sets the link color"},fontWeight:{options:["regular","bold"],control:{type:"select"},description:"Sets the font weight"},variant:{options:["standalone","inline"],control:{type:"select"},description:"Sets the link variant"},icon:{options:Object.keys(c),control:{type:"select"},description:"Adds an Icon to the link"}},render:n(({...o})=>(0,d.jsx)(a,{...o}),"render")},e={args:{children:"Redirect to",href:"https://www.google.com/",size:"medium",isDisabled:!1,color:"primary",variant:"standalone"}},r={args:{children:"link example",href:"https://www.google.com/",size:"medium",isDisabled:!1,fontWeight:"regular",variant:"inline"}},t={args:{children:"Link",href:"https://www.google.com/",size:"medium",isDisabled:!1,color:"primary",fontWeight:"bold",variant:"standalone",icon:"arrow_forward"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Redirect to',
    href: 'https://www.google.com/',
    size: 'medium',
    isDisabled: false,
    color: 'primary',
    variant: 'standalone'
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'link example',
    href: 'https://www.google.com/',
    size: 'medium',
    isDisabled: false,
    fontWeight: 'regular',
    variant: 'inline'
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Link',
    href: 'https://www.google.com/',
    size: 'medium',
    isDisabled: false,
    color: 'primary',
    fontWeight: 'bold',
    variant: 'standalone',
    icon: 'arrow_forward'
  }
}`,...t.parameters?.docs?.source}}};var u=["Default","Inline","Standalone"];export{e as Default,r as Inline,t as Standalone,u as __namedExportsOrder,f as default};
