import{j as e}from"./jsx-runtime-CB_V9I5Y.js";import{B as u}from"./Button-DdazN-cw.js";import"./Button.styled-BhGEnxfn.js";import{M as t,O as i}from"./Message-CrzH5wiW.js";import"./index-CTjT7uj6.js";import"./Spinner-C7-RPGlb.js";import"./index-CWvrgZ1b.js";import"./emotion-styled.browser.esm-DBghOYGd.js";import"./Typography-DHEP7O00.js";import"./index-D9dZuxfj.js";import"./emotion-react.browser.esm-Bwsi5GpN.js";import"./Icon-DG6KDu5A.js";const z={title:"Data Display/Message",component:t,argTypes:{type:{options:Object.values(i),control:{type:"inline-radio"}},onClose:{options:[!0,void 0],control:{type:"radio",labels:{true:"Has onClose",undefined:"Does not have onClose"}}},variant:{options:["horizontal","vertical"],control:{type:"inline-radio"}}},render:({hasActions:a,onClose:l,title:p,description:m,type:c,variant:d})=>e.jsx(t,{...l&&{onClose:()=>console.log("closed")},description:m,title:p,type:c,variant:d,children:a?e.jsx(t.Actions,{children:e.jsx(u,{size:"small",variant:"text",children:"Action"})}):null})},o={args:{type:i.Error,hasActions:!0,title:"This is a title",description:"Some important information will appear here.",onClose:!0,variant:"horizontal"}};var r,s,n;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    type: OMessageType.Error,
    hasActions: true,
    title: 'This is a title',
    description: 'Some important information will appear here.',
    onClose: true as unknown as MessageStory['onClose'],
    variant: 'horizontal'
  }
}`,...(n=(s=o.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const A=["Default"];export{o as Default,A as __namedExportsOrder,z as default};
