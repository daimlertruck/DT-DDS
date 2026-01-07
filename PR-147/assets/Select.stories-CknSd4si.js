var D=Object.defineProperty;var s=(a,l)=>D(a,"name",{value:l,configurable:!0});import{j as o}from"./jsx-runtime-Cgz2XvFB.js";import{r as x}from"./index-CwbBKW39.js";import{S as t}from"./Select-D8W52Iv_.js";import"./emotion-styled.browser.esm-CIRWz9XU.js";import"./index-DTgA8jos.js";import"./Icon-BWIy_dZb.js";import"./IconButton-DqfnmDe3.js";import"./LabelField-nCy-PARe.js";import"./Typography-Dk4smw7A.js";import"./typography-B3nKKPHm.js";import"./index-Xf3VWcnb.js";import"./Tooltip-CZhszMJk.js";import"./index-RDUg2fsu.js";import"./emotion-react.browser.esm-BzOLYAw5.js";import"./index-6Tx4pmSd.js";import"./iframe-Brb_Y-7C.js";import"./z-index-C44GOntP.js";import"./index-DV-VXEUn.js";import"./Dropdown-BivKLxwF.js";import"./useClickOutside-Cp2kQToC.js";import"./Checkbox-AntSCaL3.js";const{useArgs:y}=__STORYBOOK_MODULE_PREVIEW_API__,g=[{value:"opt1",label:"Option 1",isDisabled:!1},{value:"opt2",label:"Option 2",isDisabled:!1},{value:"opt3",label:"A text message to see how big labels will be handled",isDisabled:!1},{value:"opt4",label:"Option 3",isDisabled:!0},{value:"opt5",label:"Option 4",isDisabled:!1}],k={title:"Data Display/Select",component:t,argTypes:{helperText:{control:"text"},variant:{options:["outlined","bottom-line"],control:{type:"select"}},fill:{options:["default","contrast","light"],control:{type:"select"}},scale:{options:["standard","compact"],control:{type:"select"}}},render:s(({options:a,...l})=>{const[{value:p},u]=y(),c=s(e=>u({value:e}),"handleChange");return o.jsx(t,{...l,isMulti:!1,onChange:c,value:p,children:a.map((e,r)=>o.jsxs(t.Option,{index:r,isDisabled:e.isDisabled,value:e.value,valueLabel:e.label,children:[e.label," ",r===0?"- This is the first option!":""]},e.value))})},"render")},i={args:{options:g,label:"My label",helperText:"",isRequired:!1,hasError:!1,isDisabled:!1,value:"",isFloatingLabel:!0,scale:"standard",placeholder:"Insert an option"}},M=s(({options:a,value:l,...p})=>{const[u,c]=x.useState(l||[]);return o.jsx(t,{...p,isMulti:!0,onChange:c,value:u,children:a.map((e,r)=>o.jsx(t.Option,{index:r,isDisabled:e.isDisabled,value:e.value,children:e.label},e.value))})},"MultiSelectDemo"),n={args:{options:g,label:"My multi label",helperText:"Here to help you",isRequired:!1,hasError:!1,isDisabled:!1,isFloatingLabel:!1,variant:"bottom-line",fill:"contrast",scale:"compact",value:[]},render:s(a=>o.jsx(M,{...a}),"render")};var d,m,b;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    options: options,
    label: 'My label',
    helperText: '',
    isRequired: false,
    hasError: false,
    isDisabled: false,
    value: '',
    isFloatingLabel: true,
    scale: 'standard',
    placeholder: 'Insert an option'
  }
}`,...(b=(m=i.parameters)==null?void 0:m.docs)==null?void 0:b.source}}};var f,h,v;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    options,
    label: 'My multi label',
    helperText: 'Here to help you',
    isRequired: false,
    hasError: false,
    isDisabled: false,
    isFloatingLabel: false,
    variant: 'bottom-line',
    fill: 'contrast',
    scale: 'compact',
    value: []
  },
  render: args => <MultiSelectDemo {...args} />
}`,...(v=(h=n.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};const z=["Default","Multi"];export{i as Default,n as Multi,z as __namedExportsOrder,k as default};
