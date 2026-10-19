var u=Object.defineProperty;var t=(r,n)=>u(r,"name",{value:n,configurable:!0});import{n as d}from"./rolldown-runtime-CzYk_CEw.js";import{t as _}from"./jsx-runtime-Br4tQxt1.js";import{i as h,n as f,r as s,t as i}from"./Message-xla3Pksc.js";import{n as g}from"./src-D5bqUDDt.js";import{t as y}from"./button-OUpd9qif.js";var o,x,e,M;function a(){return(a=d((()=>{y(),f(),h(),o=_(),x={title:"Data Display/Message",component:i,argTypes:{type:{options:Object.values(s),control:{type:"inline-radio"}},onClose:{options:[!0,void 0],control:{type:"radio",labels:{true:"Has onClose",undefined:"Does not have onClose"}}},orientation:{options:["horizontal","vertical"],control:{type:"inline-radio"}}},render:t(({hasActions:r,onClose:n,title:l,description:p,type:m,orientation:c})=>(0,o.jsx)(i,{...n&&{onClose:t(()=>console.log("closed"),"onClose")},description:p,orientation:c,title:l,type:m,children:r?(0,o.jsx)(i.Actions,{children:(0,o.jsx)(g,{size:"small",variant:"text",children:"Action"})}):null}),"render")},e={args:{type:s.Error,hasActions:!0,title:"This is a title",description:"Some important information will appear here.",onClose:!0,orientation:"horizontal"}},M=["Default"],e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    type: OMessageType.Error,
    hasActions: true,
    title: 'This is a title',
    description: 'Some important information will appear here.',
    onClose: true as unknown as MessageStory['onClose'],
    orientation: 'horizontal'
  }
}`,...e.parameters?.docs?.source}}}})))()}t(a,"init_Message_stories");a();export{e as Default,M as __namedExportsOrder,x as default};
