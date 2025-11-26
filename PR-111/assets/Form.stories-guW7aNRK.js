var F=Object.defineProperty;var i=(s,a)=>F(s,"name",{value:a,configurable:!0});import{j as r}from"./jsx-runtime-Cgz2XvFB.js";import{T as l}from"./TextField-BrgSHtEW.js";import{F as t}from"./Form-CTXtHf7m.js";import"./index-CwbBKW39.js";import"./Icon-BrO18bYS.js";import"./emotion-styled.browser.esm-Cgg3GKEJ.js";import"./IconButton-BxQ2uS0G.js";import"./LabelField-Drl51Bjy.js";import"./Typography-CEwLj33J.js";import"./typography-B3nKKPHm.js";import"./index-Dw_1laFD.js";import"./Tooltip-BHQGFsPy.js";import"./index-BNKi5qv4.js";import"./emotion-react.browser.esm-DSneuyqi.js";import"./index-6Tx4pmSd.js";import"./iframe-BSz1VTM5.js";import"./z-index-KGn0H6PT.js";import"./index-DV-VXEUn.js";const C={title:"Data Display/Form",component:t},x=i(()=>r.jsx(t,{children:r.jsx(l,{label:"label 1"})}),"Template"),o=x.bind({});o.args={};const j=i(({isDisabled:s,title:a,tooltip:u})=>r.jsxs(t,{children:[r.jsx(t.Group,{title:a,tooltip:u,children:r.jsx(l,{label:"label 1"})}),r.jsxs(t.Group,{isDisabled:s,children:[r.jsx(l,{label:"label 2"}),r.jsx(l,{label:"label 3"})]})]}),"TemplateFormGroup"),e=j.bind({});e.args={title:"",tooltip:"",isDisabled:!1};var m,p,n;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`() => {
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
