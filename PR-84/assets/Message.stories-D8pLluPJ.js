import{j as e}from"./jsx-runtime-CB_V9I5Y.js";import{B as u}from"./Button-CqVJX5N1.js";import"./Button.styled-BhGEnxfn.js";import{M as t,O as s}from"./Message-BHWaVzlm.js";import"./index-CTjT7uj6.js";import"./Spinner-DrP4IJY-.js";import"./index-CWvrgZ1b.js";import"./emotion-styled.browser.esm-DBghOYGd.js";import"./Typography-ByfpGKzH.js";import"./index-D9dZuxfj.js";import"./emotion-react.browser.esm-Bwsi5GpN.js";import"./Icon-DG6KDu5A.js";const z={title:"Data Display/Message",component:t,argTypes:{type:{options:Object.values(s),control:{type:"inline-radio"}},onClose:{options:[!0,void 0],control:{type:"radio",labels:{true:"Has onClose",undefined:"Does not have onClose"}}},orientation:{options:["horizontal","vertical"],control:{type:"inline-radio"}}},render:({hasActions:a,onClose:l,title:p,description:m,type:c,orientation:d})=>e.jsx(t,{...l&&{onClose:()=>console.log("closed")},description:m,orientation:d,title:p,type:c,children:a?e.jsx(t.Actions,{children:e.jsx(u,{size:"small",variant:"text",children:"Action"})}):null})},o={args:{type:s.Error,hasActions:!0,title:"This is a title",description:"Some important information will appear here.",onClose:!0,orientation:"horizontal"}};var r,n,i;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    type: OMessageType.Error,
    hasActions: true,
    title: 'This is a title',
    description: 'Some important information will appear here.',
    onClose: true as unknown as MessageStory['onClose'],
    orientation: 'horizontal'
  }
}`,...(i=(n=o.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};const A=["Default"];export{o as Default,A as __namedExportsOrder,z as default};
