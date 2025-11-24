var D=Object.defineProperty;var o=(t,a)=>D(t,"name",{value:a,configurable:!0});import{j as n}from"./jsx-runtime-Cgz2XvFB.js";import{r as x}from"./index-CwbBKW39.js";import{S as s}from"./Select-DS8fzEMX.js";import"./index-juXVSS06.js";import"./emotion-styled.browser.esm-Cgg3GKEJ.js";import"./Icon-BrO18bYS.js";import"./IconButton-BxQ2uS0G.js";import"./LabelField-Drl51Bjy.js";import"./Typography-CEwLj33J.js";import"./typography-B3nKKPHm.js";import"./index-Dw_1laFD.js";import"./Tooltip-CHV8lP1O.js";import"./index-CG52JxGE.js";import"./emotion-react.browser.esm-DSneuyqi.js";import"./index-6Tx4pmSd.js";import"./iframe-DoMfGgLU.js";import"./z-index-BB_IPOEl.js";import"./index-DV-VXEUn.js";import"./Dropdown-BczA_mmA.js";import"./useClickOutside-Cp2kQToC.js";import"./Checkbox-siqGYWeX.js";const{useArgs:O}=__STORYBOOK_MODULE_PREVIEW_API__,h=[{value:"opt1",label:"Option 1",isDisabled:!1},{value:"opt2",label:"Option 2",isDisabled:!1},{value:"opt3",label:"A text message to see how big labels will be handled",isDisabled:!1},{value:"opt4",label:"Option 3",isDisabled:!0},{value:"opt5",label:"Option 4",isDisabled:!1}],W={title:"Data Display/Select",component:s,argTypes:{helperText:{control:"text"},variant:{options:["outlined","bottom-line"],control:{type:"select"}},fill:{options:["default","contrast","light"],control:{type:"select"}},scale:{options:["standard","compact"],control:{type:"select"}}},render:o(({options:t,...a})=>{const[{value:p},u]=O(),l=o(e=>u({value:e}),"handleChange");return n.jsx(s,{...a,isMulti:!1,onChange:l,value:p,children:t.map((e,g)=>n.jsx(s.Option,{index:g,isDisabled:e.isDisabled,value:e.value,children:e.label},e.value))})},"render")},r={args:{options:h,label:"My label",helperText:"",isRequired:!1,hasError:!1,isDisabled:!1,value:"",isFloatingLabel:!0,scale:"standard",placeholder:"Insert an option"}},i={args:{options:h,label:"My multi label",helperText:"Here to help you",isRequired:!1,hasError:!1,isDisabled:!1,isFloatingLabel:!1,variant:"bottom-line",fill:"contrast",scale:"compact",value:[]},render:o(({options:t,...a})=>{const[p,u]=x.useState(a.value);return n.jsx(s,{...a,isMulti:!0,onChange:u,value:p,children:t.map((l,e)=>n.jsx(s.Option,{index:e,isDisabled:l.isDisabled,value:l.value,children:l.label},l.value))})},"render")};var c,d,m;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(m=(d=r.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var b,f,v;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
        {options.map((opt, index) => <Select.Option index={index} isDisabled={opt.isDisabled} key={opt.value} value={opt.value}>
            {opt.label}
          </Select.Option>)}
      </Select>;
  }
}`,...(v=(f=i.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};const Y=["Default","Multi"];export{r as Default,i as Multi,Y as __namedExportsOrder,W as default};
