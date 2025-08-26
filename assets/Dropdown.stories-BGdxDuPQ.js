import{j as e}from"./jsx-runtime-DMAvRu52.js";import{D as t}from"./Dropdown-yArkUJXp.js";import"./Typography-DII2gFDQ.js";import"./index-DSuwS0lG.js";import"./Icon-87Ryblgq.js";import"./IconButton-8pEMAeo8.js";import"./index-Dl6G-zuu.js";import"./index-CL4Xg4Pf.js";import"./index-BSh7GFw5.js";import"./index-DCrStp1_.js";import"./emotion-styled.browser.esm-Dv69Fly8.js";import"./z-index-Ds5QkyqS.js";import"./useClickOutside-CBJSS0tk.js";import"./emotion-react.browser.esm-DLeKyOu_.js";import"./index-BAMY2Nnw.js";import"./iframe-DMbQnZwK.js";const d=[{text:"Option 1",value:"1"},{text:"Option 2",value:"2"},{text:"Option 3 with a large text message label",value:"3"},{text:"Option 4",value:"4"}],T={title:"Data Display/Dropdown",component:t,argTypes:{variant:{options:{outlined:"outlined","bottom-line":"bottom-line"},control:{type:"select"}},fill:{options:{default:"default",contrast:"contrast",light:"light"},control:{type:"select"}}},render:({options:p,defaultValue:m,message:s,...l})=>e.jsx("div",{style:{height:"300px"},children:e.jsx(t,{defaultValue:m,children:e.jsxs(t.Container,{children:[e.jsx(t.Select,{label:"Label",...l,children:p.map(r=>e.jsx(t.Option,{option:r,children:r.text??r.value},r.value))}),s?e.jsx(t.Detail,{...l,children:s}):null]})})})},a={args:{options:d,isDisabled:!1,hasBorder:!0,hasError:!1,isRequired:!1,hasDeselect:!1,message:"",variant:"outlined",fill:"default"}};var o,i,n;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
