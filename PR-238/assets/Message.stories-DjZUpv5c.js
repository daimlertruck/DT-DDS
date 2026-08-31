var c=Object.defineProperty;var r=(o,t)=>c(o,"name",{value:t,configurable:!0});import{t as u}from"./jsx-runtime-Br4tQxt1.js";import{n as s,t as n}from"./Message-DWGZuRPk.js";import{t as d}from"./src-DOZlIpA1.js";import"./button-CfcM87f0.js";var a=u(),x={title:"Data Display/Message",component:n,argTypes:{type:{options:Object.values(s),control:{type:"inline-radio"}},onClose:{options:[!0,void 0],control:{type:"radio",labels:{true:"Has onClose",undefined:"Does not have onClose"}}},orientation:{options:["horizontal","vertical"],control:{type:"inline-radio"}}},render:r(({hasActions:o,onClose:t,title:i,description:l,type:p,orientation:m})=>(0,a.jsx)(n,{...t&&{onClose:r(()=>console.log("closed"),"onClose")},description:l,orientation:m,title:i,type:p,children:o?(0,a.jsx)(n.Actions,{children:(0,a.jsx)(d,{size:"small",variant:"text",children:"Action"})}):null}),"render")},e={args:{type:s.Error,hasActions:!0,title:"This is a title",description:"Some important information will appear here.",onClose:!0,orientation:"horizontal"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    type: OMessageType.Error,
    hasActions: true,
    title: 'This is a title',
    description: 'Some important information will appear here.',
    onClose: true as unknown as MessageStory['onClose'],
    orientation: 'horizontal'
  }
}`,...e.parameters?.docs?.source}}};var C=["Default"];export{e as Default,C as __namedExportsOrder,x as default};
