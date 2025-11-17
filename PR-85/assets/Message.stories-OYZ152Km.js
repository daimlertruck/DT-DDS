import{j as t}from"./jsx-runtime-CB_V9I5Y.js";import{B as u}from"./Button-DdazN-cw.js";import"./Button.styled-BhGEnxfn.js";import{M as e,O as s}from"./Message-BOBqdIoR.js";import"./index-CTjT7uj6.js";import"./Spinner-C7-RPGlb.js";import"./index-CWvrgZ1b.js";import"./emotion-styled.browser.esm-DBghOYGd.js";import"./Typography-DHEP7O00.js";import"./index-D9dZuxfj.js";import"./emotion-react.browser.esm-Bwsi5GpN.js";import"./index-BMOsMRi9.js";import"./index-BAMY2Nnw.js";import"./iframe-CXOeE5ot.js";import"./index-XjDa9cP3.js";import"./useMedia-bxl5YFrZ.js";import"./Icon-DG6KDu5A.js";const b={title:"Data Display/Message",component:e,argTypes:{type:{options:Object.values(s),control:{type:"inline-radio"}},onClose:{options:[!0,void 0],control:{type:"radio",labels:{true:"Has onClose",undefined:"Does not have onClose"}}},orientation:{options:["horizontal","vertical"],control:{type:"inline-radio"}}},render:({hasActions:a,onClose:p,title:l,description:m,type:c,orientation:d})=>t.jsx(e,{...p&&{onClose:()=>console.log("closed")},description:m,orientation:d,title:l,type:c,children:a?t.jsx(e.Actions,{children:t.jsx(u,{size:"small",variant:"text",children:"Action"})}):null})},o={args:{type:s.Error,hasActions:!0,title:"This is a title",description:"Some important information will appear here.",onClose:!0,orientation:"horizontal"}};var r,i,n;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    type: OMessageType.Error,
    hasActions: true,
    title: 'This is a title',
    description: 'Some important information will appear here.',
    onClose: true as unknown as MessageStory['onClose'],
    orientation: 'horizontal'
  }
}`,...(n=(i=o.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const B=["Default"];export{o as Default,B as __namedExportsOrder,b as default};
