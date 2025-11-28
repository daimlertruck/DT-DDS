var h=Object.defineProperty;var r=(t,e)=>h(t,"name",{value:e,configurable:!0});import{j as i}from"./jsx-runtime-Cgz2XvFB.js";import{B as y}from"./Button-C0TnN-BM.js";import"./Button.styled-CUkFiMoH.js";import{M as n,O as l}from"./Message-Bn4svwdA.js";import"./index-CwbBKW39.js";import"./Spinner-rC9YGm5v.js";import"./index-juXVSS06.js";import"./emotion-styled.browser.esm-Cgg3GKEJ.js";import"./Typography-BDc1BtFV.js";import"./typography-B3nKKPHm.js";import"./emotion-react.browser.esm-DSneuyqi.js";import"./index-Dk4wIVQH.js";import"./index-6Tx4pmSd.js";import"./iframe-BIbwQhCI.js";import"./index-DV-VXEUn.js";import"./useMedia-CRgJMRRc.js";import"./Icon-BrO18bYS.js";const k={title:"Data Display/Message",component:n,argTypes:{type:{options:Object.values(l),control:{type:"inline-radio"}},onClose:{options:[!0,void 0],control:{type:"radio",labels:{true:"Has onClose",undefined:"Does not have onClose"}}},orientation:{options:["horizontal","vertical"],control:{type:"inline-radio"}}},render:r(({hasActions:t,onClose:e,title:m,description:c,type:d,orientation:u})=>i.jsx(n,{...e&&{onClose:r(()=>console.log("closed"),"onClose")},description:c,orientation:u,title:m,type:d,children:t?i.jsx(n.Actions,{children:i.jsx(y,{size:"small",variant:"text",children:"Action"})}):null}),"render")},o={args:{type:l.Error,hasActions:!0,title:"This is a title",description:"Some important information will appear here.",onClose:!0,orientation:"horizontal"}};var s,a,p;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    type: OMessageType.Error,
    hasActions: true,
    title: 'This is a title',
    description: 'Some important information will appear here.',
    onClose: true as unknown as MessageStory['onClose'],
    orientation: 'horizontal'
  }
}`,...(p=(a=o.parameters)==null?void 0:a.docs)==null?void 0:p.source}}};const H=["Default"];export{o as Default,H as __namedExportsOrder,k as default};
