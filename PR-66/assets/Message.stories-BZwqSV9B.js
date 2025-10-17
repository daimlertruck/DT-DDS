import{j as e}from"./jsx-runtime-CB_V9I5Y.js";import{L as y}from"./constants-BUjojGf9.js";import{M as s,O as r}from"./Message-C_kcKPmK.js";import"./index-CTjT7uj6.js";import"./Icon-DG6KDu5A.js";import"./emotion-styled.browser.esm-DBghOYGd.js";import"./Typography-DOQ44quZ.js";import"./index-BV8q0bTk.js";import"./Close-BgpoXZkN.js";import"./Info-CbG8KzIT.js";const w={title:"Data Display/Message",component:s,argTypes:{type:{options:Object.values(r),control:{type:"inline-radio"}},onClose:{options:[!0,void 0],control:{type:"radio",labels:{true:"Has onClose",undefined:"Does not have onClose"}}}},render:({hasActions:n,onClose:h,title:a,description:i,type:g})=>e.jsxs(s,{...h&&{onClose:()=>console.log("closed")},type:g,children:[a?e.jsx(s.Title,{children:a}):null,i?e.jsx(s.Description,{children:i}):null,n?e.jsx(s.Action,{children:e.jsx(y,{href:"#",textSize:"small",children:"View action"})}):null]})},t={args:{type:r.Error,hasActions:!0,title:"This is a title",description:"Some important information will appear here.",onClose:!0}},o={args:{type:r.Info},render:({type:n})=>e.jsx(s,{style:{alignItems:"center"},type:n,children:e.jsx("p",{children:"This is a custom and non-dismissable content"})})};var l,p,c;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    type: OMessageType.Error,
    hasActions: true,
    title: 'This is a title',
    description: 'Some important information will appear here.',
    onClose: true as unknown as MessageStory['onClose']
  }
}`,...(c=(p=t.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var m,d,u;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    type: OMessageType.Info
  },
  render: ({
    type
  }) => <Message style={{
    alignItems: 'center'
  }} type={type}>
      <p>This is a custom and non-dismissable content</p>
    </Message>
}`,...(u=(d=o.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};const E=["Default","WithCustomContent"];export{t as Default,o as WithCustomContent,E as __namedExportsOrder,w as default};
