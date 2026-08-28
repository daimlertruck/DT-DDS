var F=Object.defineProperty;var i=(s,a)=>F(s,"name",{value:a,configurable:!0});import{j as r}from"./jsx-runtime-Cgz2XvFB.js";import{T as l}from"./TextField-DJ3HRylC.js";import{F as t}from"./Form-BVxoL2D9.js";import"./index-CwbBKW39.js";import"./Icon-Cizr_oyr.js";import"./emotion-styled.browser.esm-DNXn-wKZ.js";import"./IconButton-DzFaQPvx.js";import"./LabelField-CB1xORCY.js";import"./Typography-DXnuNw4S.js";import"./typography-B3nKKPHm.js";import"./index-Cf7F2iyz.js";import"./Tooltip-_q1Tm3Ag.js";import"./index-CNS4vkO1.js";import"./emotion-react.browser.esm-BHtS0gci.js";import"./index-6Tx4pmSd.js";import"./iframe-BH8thvwP.js";import"./z-index-BPuITISp.js";import"./index-DLLwJ4dj.js";const B={title:"Data Display/Form",component:t},x=i(()=>r.jsx(t,{children:r.jsx(l,{label:"label 1"})}),"Template"),o=x.bind({});o.args={};const j=i(({isDisabled:s,title:a,tooltip:u})=>r.jsxs(t,{children:[r.jsx(t.Group,{title:a,tooltip:u,children:r.jsx(l,{label:"label 1"})}),r.jsxs(t.Group,{isDisabled:s,children:[r.jsx(l,{label:"label 2"}),r.jsx(l,{label:"label 3"})]})]}),"TemplateFormGroup"),e=j.bind({});e.args={title:"",tooltip:"",isDisabled:!1};var m,p,n;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`() => {
  return <Form>
      <TextField label='label 1' />
    </Form>;
}`,...(n=(p=o.parameters)==null?void 0:p.docs)==null?void 0:n.source}}};var d,c,b;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`({
  isDisabled,
  title,
  tooltip
}: GroupProps) => <Form>
    <Form.Group title={title} tooltip={tooltip}>
      <TextField label='label 1' />
    </Form.Group>
    <Form.Group isDisabled={isDisabled}>
      <TextField label='label 2' />
      <TextField label='label 3' />
    </Form.Group>
  </Form>`,...(b=(c=e.parameters)==null?void 0:c.docs)==null?void 0:b.source}}};const C=["Default","FormGroup"];export{o as Default,e as FormGroup,C as __namedExportsOrder,B as default};
