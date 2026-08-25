var h=Object.defineProperty;var r=(t,e)=>h(t,"name",{value:e,configurable:!0});import{j as i}from"./jsx-runtime-Cgz2XvFB.js";import{B as y}from"./Button-DyNk4Wav.js";import"./Button.styled-CRw3qLAu.js";import{O as l,M as n}from"./Message-COyUDkt8.js";import"./index-CwbBKW39.js";import"./Spinner-C6HrIguK.js";import"./index-DjK96f-n.js";import"./emotion-styled.browser.esm-DNXn-wKZ.js";import"./Typography-DXnuNw4S.js";import"./typography-B3nKKPHm.js";import"./emotion-react.browser.esm-BHtS0gci.js";import"./index-BRdX3iqP.js";import"./index-6Tx4pmSd.js";import"./iframe-D40-73gS.js";import"./index-DLLwJ4dj.js";import"./useMedia-CRgJMRRc.js";import"./Icon-Cizr_oyr.js";const k={title:"Data Display/Message",component:n,argTypes:{type:{options:Object.values(l),control:{type:"inline-radio"}},onClose:{options:[!0,void 0],control:{type:"radio",labels:{true:"Has onClose",undefined:"Does not have onClose"}}},orientation:{options:["horizontal","vertical"],control:{type:"inline-radio"}}},render:r(({hasActions:t,onClose:e,title:m,description:c,type:d,orientation:u})=>i.jsx(n,{...e&&{onClose:r(()=>console.log("closed"),"onClose")},description:c,orientation:u,title:m,type:d,children:t?i.jsx(n.Actions,{children:i.jsx(y,{size:"small",variant:"text",children:"Action"})}):null}),"render")},o={args:{type:l.Error,hasActions:!0,title:"This is a title",description:"Some important information will appear here.",onClose:!0,orientation:"horizontal"}};var s,a,p;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    type: OMessageType.Error,
    hasActions: true,
    title: 'This is a title',
    description: 'Some important information will appear here.',
    onClose: true as unknown as MessageStory['onClose'],
    orientation: 'horizontal'
  }
}`,...(p=(a=o.parameters)==null?void 0:a.docs)==null?void 0:p.source}}};const H=["Default"];export{o as Default,H as __namedExportsOrder,k as default};
