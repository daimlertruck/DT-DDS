import{j as e}from"./jsx-runtime-CB_V9I5Y.js";import{D as t}from"./Dropdown-BNGf0CXn.js";import"./Typography-ByfpGKzH.js";import"./index-CTjT7uj6.js";import"./index-CWvrgZ1b.js";import"./Icon-DG6KDu5A.js";import"./IconButton-C_mszqXk.js";import"./index-D9dZuxfj.js";import"./index-CFoRRGMF.js";import"./index-XjDa9cP3.js";import"./emotion-styled.browser.esm-DBghOYGd.js";import"./z-index-CLLOsryR.js";import"./useClickOutside-CvVYzr-_.js";import"./emotion-react.browser.esm-Bwsi5GpN.js";import"./index-BAMY2Nnw.js";import"./iframe-B0_0eXRM.js";const d=[{text:"Option 1",value:"1"},{text:"Option 2",value:"2"},{text:"Option 3 with a large text message label",value:"3"},{text:"Option 4",value:"4"}],T={title:"Data Display/Dropdown",component:t,argTypes:{variant:{options:{outlined:"outlined","bottom-line":"bottom-line"},control:{type:"select"}},fill:{options:{default:"default",contrast:"contrast",light:"light"},control:{type:"select"}}},render:({options:p,defaultValue:m,message:s,...l})=>e.jsx("div",{style:{height:"300px"},children:e.jsx(t,{defaultValue:m,children:e.jsxs(t.Container,{children:[e.jsx(t.Select,{label:"Label",...l,children:p.map(r=>e.jsx(t.Option,{option:r,children:r.text??r.value},r.value))}),s?e.jsx(t.Detail,{...l,children:s}):null]})})})},a={args:{options:d,isDisabled:!1,hasBorder:!0,hasError:!1,isRequired:!1,hasDeselect:!1,message:"",variant:"outlined",fill:"default"}};var o,i,n;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    options: OPTIONS,
    isDisabled: false,
    hasBorder: true,
    hasError: false,
    isRequired: false,
    hasDeselect: false,
    message: '',
    variant: 'outlined',
    fill: 'default'
  }
}`,...(n=(i=a.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const q=["Default"];export{a as Default,q as __namedExportsOrder,T as default};
