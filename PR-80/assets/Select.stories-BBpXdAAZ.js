import{j as r}from"./jsx-runtime-CB_V9I5Y.js";import{r as g}from"./index-CTjT7uj6.js";import{S as l}from"./Select-C0x2gDiM.js";import"./index-CWvrgZ1b.js";import"./emotion-styled.browser.esm-DBghOYGd.js";import"./Dropdown-pRQ7K__8.js";import"./index-D9dZuxfj.js";import"./index-BPv-v61o.js";import"./emotion-react.browser.esm-Bwsi5GpN.js";import"./index-BAMY2Nnw.js";import"./iframe-D5uF8O2_.js";import"./z-index-DWgeqfVW.js";import"./index-XjDa9cP3.js";import"./useClickOutside-CA5UtDJB.js";import"./Icon-w916x_k_.js";import"./IconButton-C_mszqXk.js";import"./LabelField-mvyT1FXM.js";import"./Typography-Bb7lZ69m.js";import"./Tooltip-DqqyNy6u.js";import"./Checkbox-BEHZeUTl.js";const{useArgs:x}=__STORYBOOK_MODULE_PREVIEW_API__,v=[{value:"opt1",label:"Option 1",disabled:!1},{value:"opt2",label:"Option 2",disabled:!1},{value:"opt3",label:"A text message to see how big labels will be handled",disabled:!1},{value:"opt4",label:"Option 3",disabled:!0},{value:"opt5",label:"Option 4",disabled:!1}],k={title:"Data Display/Select",component:l,argTypes:{helperText:{control:"text"},variant:{options:["outlined","bottom-line"],control:{type:"select"}},fill:{options:["default","contrast","light"],control:{type:"select"}},scale:{options:["standard","compact"],control:{type:"select"}}},render:({options:n,...t})=>{const[{value:i},p]=x(),a=e=>p({value:e});return r.jsx(l,{...t,isMulti:!1,onChange:a,value:i,children:n.map((e,h)=>r.jsx(l.Option,{index:h,isDisabled:e.disabled,value:e.value,children:e.label},e.value))})}},s={args:{options:v,label:"My label",helperText:"",isRequired:!1,hasError:!1,isDisabled:!1,value:"",isFloatingLabel:!0,scale:"standard"}},o={args:{options:v,label:"My multi label",helperText:"Here to help you",isRequired:!1,hasError:!1,isDisabled:!1,isFloatingLabel:!1,variant:"bottom-line",fill:"contrast",scale:"compact",value:[]},render:({options:n,...t})=>{const[i,p]=g.useState(t.value);return r.jsx(l,{...t,isMulti:!0,onChange:p,value:i,children:n.map((a,e)=>r.jsx(l.Option,{index:e,isDisabled:a.disabled,value:a.value,children:a.label},a.value))})}};var u,d,c;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    options: options,
    label: 'My label',
    helperText: '',
    isRequired: false,
    hasError: false,
    isDisabled: false,
    value: '',
    isFloatingLabel: true,
    scale: 'standard'
  }
}`,...(c=(d=s.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var m,b,f;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
  render: ({
    options,
    ...props
  }: CustomSelectProps) => {
    const [value, setValue] = useState<string[]>(props.value as string[]);
    return <Select {...props} isMulti onChange={setValue} value={value}>
        {options.map((opt, index) => <Select.Option index={index} isDisabled={opt.disabled} key={opt.value} value={opt.value}>
            {opt.label}
          </Select.Option>)}
      </Select>;
  }
}`,...(f=(b=o.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};const B=["Default","Multi"];export{s as Default,o as Multi,B as __namedExportsOrder,k as default};
