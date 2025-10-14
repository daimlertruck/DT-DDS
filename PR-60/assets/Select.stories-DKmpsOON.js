import{j as t}from"./jsx-runtime-CB_V9I5Y.js";import{S as a}from"./Select-D0of-lee.js";import"./index-CTjT7uj6.js";import"./index-BV8q0bTk.js";import"./index-BfEmHYhS.js";import"./emotion-react.browser.esm-Bwsi5GpN.js";import"./emotion-styled.browser.esm-DBghOYGd.js";import"./index-BAMY2Nnw.js";import"./iframe-DThy6Z2M.js";import"./index-XjDa9cP3.js";import"./useClickOutside-CvVYzr-_.js";import"./Icon-DG6KDu5A.js";import"./IconButton-C_mszqXk.js";import"./LabelField-tOX1zNx_.js";import"./Typography-DOQ44quZ.js";import"./Tooltip-Bcq5kC8O.js";import"./Portal-DUP4U3GD.js";import"./z-index-Ds5QkyqS.js";import"./Checkbox-DtiS2S4C.js";const d=[{value:"opt1",label:"Option 1",disabled:!1},{value:"opt2",label:"Option 2",disabled:!1},{value:"opt3",label:"A text message to see how big labels will be handled",disabled:!1},{value:"opt4",label:"Option 3",disabled:!0},{value:"opt5",label:"Option 4",disabled:!1}],w={title:"Data Display/Select",component:a,argTypes:{helperText:{control:"text"},variant:{options:["outlined","bottom-line"],control:{type:"select"}},fill:{options:["default","contrast","light"],control:{type:"select"}}},render:({options:r,...p})=>t.jsx("div",{style:{height:"500px",padding:"10px"},children:t.jsx(a,{...p,children:r.map((e,n)=>t.jsx(a.Option,{disabled:e.disabled,index:n,label:e.label,value:e.value},e.value))})})},l={args:{options:d,label:"My label",helperText:"",errorMessage:"",isMulti:!1,isRequired:!1,hasError:!1,isDisabled:!1,initialValue:""}};var o,s,i;l.parameters={...l.parameters,docs:{...(o=l.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    options: options,
    label: 'My label',
    helperText: '',
    errorMessage: '',
    isMulti: false,
    isRequired: false,
    hasError: false,
    isDisabled: false,
    initialValue: ''
  }
}`,...(i=(s=l.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};const V=["Default"];export{l as Default,V as __namedExportsOrder,w as default};
