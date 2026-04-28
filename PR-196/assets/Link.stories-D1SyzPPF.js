var u=Object.defineProperty;var n=(r,f)=>u(r,"name",{value:f,configurable:!0});import{j as w}from"./jsx-runtime-Cgz2XvFB.js";import{c as y}from"./codes-CmbLmPPF.js";import{L as s}from"./Link-ncsFt12q.js";import"./index-CwbBKW39.js";import"./Icon-9dVURh2l.js";import"./emotion-styled.browser.esm-CIRWz9XU.js";const b=["small","medium","large"],W={component:s,title:"Data Display/Link",argTypes:{children:{control:"text"},target:{control:"text"},href:{control:"text"},size:{options:b,control:{type:"select"},description:"Sets the size of text"},isDisabled:{control:{type:"boolean"},defaultValue:{summary:!1},description:"Sets the link disabled"},color:{options:["primary","secondary"],control:{type:"select"},description:"Sets the link color"},fontWeight:{options:["regular","bold"],control:{type:"select"},description:"Sets the font weight"},variant:{options:["standalone","inline"],control:{type:"select"},description:"Sets the link variant"},icon:{options:Object.keys(y),control:{type:"select"},description:"Adds an Icon to the link"}},render:n(({...r})=>w.jsx(s,{...r}),"render")},e={args:{children:"Redirect to",href:"https://www.google.com/",size:"medium",isDisabled:!1,color:"primary",variant:"standalone"}},o={args:{children:"link example",href:"https://www.google.com/",size:"medium",isDisabled:!1,fontWeight:"regular",variant:"inline"}},t={args:{children:"Link",href:"https://www.google.com/",size:"medium",isDisabled:!1,color:"primary",fontWeight:"bold",variant:"standalone",icon:"arrow_forward"}};var a,i,l;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    children: 'Redirect to',
    href: 'https://www.google.com/',
    size: 'medium',
    isDisabled: false,
    color: 'primary',
    variant: 'standalone'
  }
}`,...(l=(i=e.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var c,d,m;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    children: 'link example',
    href: 'https://www.google.com/',
    size: 'medium',
    isDisabled: false,
    fontWeight: 'regular',
    variant: 'inline'
  }
}`,...(m=(d=o.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var p,g,h;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    children: 'Link',
    href: 'https://www.google.com/',
    size: 'medium',
    isDisabled: false,
    color: 'primary',
    fontWeight: 'bold',
    variant: 'standalone',
    icon: 'arrow_forward'
  }
}`,...(h=(g=t.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};const _=["Default","Inline","Standalone"];export{e as Default,o as Inline,t as Standalone,_ as __namedExportsOrder,W as default};
