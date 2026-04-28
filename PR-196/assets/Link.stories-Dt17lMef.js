var u=Object.defineProperty;var n=(o,f)=>u(o,"name",{value:f,configurable:!0});import{j as w}from"./jsx-runtime-Cgz2XvFB.js";import{c as b}from"./codes-CmbLmPPF.js";import{L as a}from"./Link-ncsFt12q.js";import"./index-CwbBKW39.js";import"./Icon-9dVURh2l.js";import"./emotion-styled.browser.esm-CIRWz9XU.js";const k=["small","medium","large"],L={component:a,title:"Data Display/Link",argTypes:{children:{control:"text"},target:{control:"text"},href:{control:"text"},size:{options:k,control:{type:"select"},description:"Sets the size of text"},isDisabled:{control:{type:"boolean"},defaultValue:{summary:!1},description:"Sets the link disabled"},color:{options:["primary","secondary"],control:{type:"select"},description:"Sets the link color"},fontWeight:{options:["regular","bold"],control:{type:"select"},description:"Sets the font weight"},variant:{options:["standalone","inline"],control:{type:"select"},description:"Sets the link variant"},icon:{options:Object.keys(b),control:{type:"select"},description:"Adds an Icon to the link"}},render:n(({...o})=>w.jsx(a,{...o}),"render")},e={args:{children:"Redirect to",href:"https://www.google.com/",target:"_blank",size:"medium",isDisabled:!1,color:"primary",variant:"standalone"}},t={args:{children:"link example",href:"https://www.google.com/",target:"_blank",size:"medium",isDisabled:!1,fontWeight:"regular",variant:"inline"}},r={args:{children:"Link",href:"https://www.google.com/",target:"_blank",size:"medium",isDisabled:!1,color:"primary",fontWeight:"bold",variant:"standalone",icon:"arrow_forward"}};var s,i,l;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    children: 'Redirect to',
    href: 'https://www.google.com/',
    target: '_blank',
    size: 'medium',
    isDisabled: false,
    color: 'primary',
    variant: 'standalone'
  }
}`,...(l=(i=e.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var c,d,m;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    children: 'link example',
    href: 'https://www.google.com/',
    target: '_blank',
    size: 'medium',
    isDisabled: false,
    fontWeight: 'regular',
    variant: 'inline'
  }
}`,...(m=(d=t.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var p,g,h;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    children: 'Link',
    href: 'https://www.google.com/',
    target: '_blank',
    size: 'medium',
    isDisabled: false,
    color: 'primary',
    fontWeight: 'bold',
    variant: 'standalone',
    icon: 'arrow_forward'
  }
}`,...(h=(g=r.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};const W=["Default","Inline","Standalone"];export{e as Default,t as Inline,r as Standalone,W as __namedExportsOrder,L as default};
