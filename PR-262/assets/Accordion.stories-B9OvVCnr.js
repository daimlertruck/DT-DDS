var l=Object.defineProperty;var r=(a,e)=>l(a,"name",{value:e,configurable:!0});import{l as d}from"./preload-helper-DhB_op97.js";import{t as i}from"./react-Cv64OdzP.js";import{t as s}from"./src-QXsAq41S.js";import{t as p}from"./jsx-runtime-CPdzY0Ku.js";import{t as m}from"./src-D8J0l-L9.js";import"./box-urSjHwr1.js";import{t as u}from"./src-nouKxEiA.js";import"./button-BXRX0Bcp.js";var f=d(i()),n=p(),O={component:s,title:"Data Display/Accordion",argTypes:{background:{options:["transparent","light","contrast"],control:{type:"select"}}}},o={args:{defaultIsOpen:!1,background:"transparent",hasBorderBottom:!1,isDisabled:!1,headerContent:"Header content here.",children:"Body content"}},g=r(()=>{const[a,e]=(0,f.useState)(!1);return(0,n.jsxs)(m,{style:{gap:"1rem",alignItems:"flex-start"},children:[(0,n.jsx)(u,{type:"button",onClick:r(()=>e(c=>!c),"onClick"),children:"Toggle accordion externally"}),(0,n.jsx)(s,{isOpen:a,onToggle:e,headerContent:"Controlled accordion",children:"Body content"})]})},"ControlledAccordion"),t={render:r(()=>(0,n.jsx)(g,{}),"render")};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
