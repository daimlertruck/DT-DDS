var u=Object.defineProperty;var t=(n,r)=>u(n,"name",{value:r,configurable:!0});import{n as d}from"./rolldown-runtime-CzYk_CEw.js";import{t as h}from"./jsx-runtime-Br4tQxt1.js";import{n as _}from"./src-vLorkEft.js";import{At as i,Ot as s,ht as g,jt as y,kt as f}from"./iframe-CLuZkPNB.js";var o,x,e,M;function a(){return(a=d((()=>{g(),f(),y(),o=h(),x={title:"Data Display/Message",component:s,argTypes:{type:{options:Object.values(i),control:{type:"inline-radio"}},onClose:{options:[!0,void 0],control:{type:"radio",labels:{true:"Has onClose",undefined:"Does not have onClose"}}},orientation:{options:["horizontal","vertical"],control:{type:"inline-radio"}}},render:t(({hasActions:n,onClose:r,title:l,description:p,type:m,orientation:c})=>(0,o.jsx)(s,{...r&&{onClose:t(()=>console.log("closed"),"onClose")},description:p,orientation:c,title:l,type:m,children:n?(0,o.jsx)(s.Actions,{children:(0,o.jsx)(_,{size:"small",variant:"text",children:"Action"})}):null}),"render")},e={args:{type:i.Error,hasActions:!0,title:"This is a title",description:"Some important information will appear here.",onClose:!0,orientation:"horizontal"}},M=["Default"],e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    type: OMessageType.Error,
    hasActions: true,
    title: 'This is a title',
    description: 'Some important information will appear here.',
    onClose: true as unknown as MessageStory['onClose'],
    orientation: 'horizontal'
  }
}`,...e.parameters?.docs?.source}}}})))()}t(a,"init_Message_stories");a();export{e as Default,M as __namedExportsOrder,x as default};
