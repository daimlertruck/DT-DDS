var x=Object.defineProperty;var o=(t,a)=>x(t,"name",{value:a,configurable:!0});import{j as i}from"./jsx-runtime-Cgz2XvFB.js";import{r as O}from"./index-CwbBKW39.js";import{S as s}from"./Select-Cpcr5IGz.js";import"./index-juXVSS06.js";import"./emotion-styled.browser.esm-Cgg3GKEJ.js";import"./Dropdown-i165KRy3.js";import"./typography-B3nKKPHm.js";import"./index-CEgSdhBP.js";import"./emotion-react.browser.esm-DSneuyqi.js";import"./index-6Tx4pmSd.js";import"./iframe-JPCrv_Wd.js";import"./z-index-BB_IPOEl.js";import"./index-DV-VXEUn.js";import"./useClickOutside-Cp2kQToC.js";import"./Icon-BrO18bYS.js";import"./IconButton-BxQ2uS0G.js";import"./LabelField-Drl51Bjy.js";import"./Typography-CEwLj33J.js";import"./index-Dw_1laFD.js";import"./Tooltip-DAf5EIiz.js";import"./Checkbox-siqGYWeX.js";const{useArgs:S}=__STORYBOOK_MODULE_PREVIEW_API__,h=[{value:"opt1",label:"Option 1",disabled:!1},{value:"opt2",label:"Option 2",disabled:!1},{value:"opt3",label:"A text message to see how big labels will be handled",disabled:!1},{value:"opt4",label:"Option 3",disabled:!0},{value:"opt5",label:"Option 4",disabled:!1}],W={title:"Data Display/Select",component:s,argTypes:{helperText:{control:"text"},variant:{options:["outlined","bottom-line"],control:{type:"select"}},fill:{options:["default","contrast","light"],control:{type:"select"}},scale:{options:["standard","compact"],control:{type:"select"}}},render:o(({options:t,...a})=>{const[{value:p},u]=S(),l=o(e=>u({value:e}),"handleChange");return i.jsx(s,{...a,isMulti:!1,onChange:l,value:p,children:t.map((e,g)=>i.jsx(s.Option,{index:g,isDisabled:e.disabled,value:e.value,children:e.label},e.value))})},"render")},r={args:{options:h,label:"My label",helperText:"",isRequired:!1,hasError:!1,isDisabled:!1,value:"",isFloatingLabel:!0,scale:"standard"}},n={args:{options:h,label:"My multi label",helperText:"Here to help you",isRequired:!1,hasError:!1,isDisabled:!1,isFloatingLabel:!1,variant:"bottom-line",fill:"contrast",scale:"compact",value:[]},render:o(({options:t,...a})=>{const[p,u]=O.useState(a.value);return i.jsx(s,{...a,isMulti:!0,onChange:u,value:p,children:t.map((l,e)=>i.jsx(s.Option,{index:e,isDisabled:l.disabled,value:l.value,children:l.label},l.value))})},"render")};var d,c,m;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(m=(c=r.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var b,f,v;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(v=(f=n.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};const Y=["Default","Multi"];export{r as Default,n as Multi,Y as __namedExportsOrder,W as default};
