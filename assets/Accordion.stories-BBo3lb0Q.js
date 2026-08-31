var d=Object.defineProperty;var r=(a,e)=>d(a,"name",{value:e,configurable:!0});import{o as l}from"./rolldown-runtime-CzYk_CEw.js";import{t as i}from"./react-HNhQAnN4.js";import{t as s}from"./src-D--srvRj.js";import{t as p}from"./jsx-runtime-Br4tQxt1.js";import{t as m}from"./src-1jRqCCWR.js";import"./box-DLdZVqFP.js";import{t as u}from"./src-DOZlIpA1.js";import"./button-CfcM87f0.js";var f=l(i()),n=p(),O={component:s,title:"Data Display/Accordion",argTypes:{background:{options:["transparent","light","contrast"],control:{type:"select"}}}},o={args:{defaultIsOpen:!1,background:"transparent",hasBorderBottom:!1,isDisabled:!1,headerContent:"Header content here.",children:"Body content"}},g=r(()=>{const[a,e]=(0,f.useState)(!1);return(0,n.jsxs)(m,{style:{gap:"1rem",alignItems:"flex-start"},children:[(0,n.jsx)(u,{type:"button",onClick:r(()=>e(c=>!c),"onClick"),children:"Toggle accordion externally"}),(0,n.jsx)(s,{isOpen:a,onToggle:e,headerContent:"Controlled accordion",children:"Body content"})]})},"ControlledAccordion"),t={render:r(()=>(0,n.jsx)(g,{}),"render")};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    defaultIsOpen: false,
    background: 'transparent',
    hasBorderBottom: false,
    isDisabled: false,
    headerContent: 'Header content here.',
    children: 'Body content'
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <ControlledAccordion />
}`,...t.parameters?.docs?.source}}};var k=["Uncontrolled","Controlled"];export{t as Controlled,o as Uncontrolled,k as __namedExportsOrder,O as default};
