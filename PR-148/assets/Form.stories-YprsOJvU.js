var F=Object.defineProperty;var i=(s,a)=>F(s,"name",{value:a,configurable:!0});import{j as r}from"./jsx-runtime-Cgz2XvFB.js";import{T as l}from"./TextField-D3V1CvzW.js";import{F as t}from"./Form-Cesabfi-.js";import"./index-CwbBKW39.js";import"./Icon-BWIy_dZb.js";import"./emotion-styled.browser.esm-CIRWz9XU.js";import"./IconButton-DqfnmDe3.js";import"./LabelField-nCy-PARe.js";import"./Typography-Dk4smw7A.js";import"./typography-B3nKKPHm.js";import"./index-Xf3VWcnb.js";import"./Tooltip-D6-gevev.js";import"./index-xpc1lUwr.js";import"./emotion-react.browser.esm-BzOLYAw5.js";import"./index-6Tx4pmSd.js";import"./iframe-Bo1sY_t-.js";import"./z-index-C44GOntP.js";import"./index-DV-VXEUn.js";const C={title:"Data Display/Form",component:t},x=i(()=>r.jsx(t,{children:r.jsx(l,{label:"label 1"})}),"Template"),o=x.bind({});o.args={};const j=i(({isDisabled:s,title:a,tooltip:u})=>r.jsxs(t,{children:[r.jsx(t.Group,{title:a,tooltip:u,children:r.jsx(l,{label:"label 1"})}),r.jsxs(t.Group,{isDisabled:s,children:[r.jsx(l,{label:"label 2"}),r.jsx(l,{label:"label 3"})]})]}),"TemplateFormGroup"),e=j.bind({});e.args={title:"",tooltip:"",isDisabled:!1};var m,p,n;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`() => {
  return <Form>
      <TextField label='label 1' />
    </Form>;
}`,...(n=(p=o.parameters)==null?void 0:p.docs)==null?void 0:n.source}}};var d,c,b;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`({
  isDisabled,
  title,
  tooltip
}) => <Form>
    <Form.Group title={title} tooltip={tooltip}>
      <TextField label='label 1' />
    </Form.Group>
    <Form.Group isDisabled={isDisabled}>
      <TextField label='label 2' />
      <TextField label='label 3' />
    </Form.Group>
  </Form>`,...(b=(c=e.parameters)==null?void 0:c.docs)==null?void 0:b.source}}};const H=["Default","FormGroup"];export{o as Default,e as FormGroup,H as __namedExportsOrder,C as default};
