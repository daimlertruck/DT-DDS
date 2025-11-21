var F=Object.defineProperty;var i=(s,a)=>F(s,"name",{value:a,configurable:!0});import{j as r}from"./jsx-runtime-Cgz2XvFB.js";import{T as l}from"./TextField-BiFCOraC.js";import{F as t}from"./Form-CHNB8X6g.js";import"./index-CwbBKW39.js";import"./Icon-BrO18bYS.js";import"./emotion-styled.browser.esm-Cgg3GKEJ.js";import"./IconButton-BsV1J9zH.js";import"./LabelField-C0PWGpoP.js";import"./Typography-CEwLj33J.js";import"./typography-B3nKKPHm.js";import"./Tooltip-HxZaMl02.js";import"./index-DjbAOVKa.js";import"./emotion-react.browser.esm-DSneuyqi.js";import"./index-6Tx4pmSd.js";import"./iframe-BFdBwjWm.js";import"./z-index-BB_IPOEl.js";import"./index-DV-VXEUn.js";const B={title:"Data Display/Form",component:t},x=i(()=>r.jsx(t,{children:r.jsx(l,{label:"label 1"})}),"Template"),e=x.bind({});e.args={};const j=i(({isDisabled:s,title:a,tooltip:u})=>r.jsxs(t,{children:[r.jsx(t.Group,{title:a,tooltip:u,children:r.jsx(l,{label:"label 1"})}),r.jsxs(t.Group,{isDisabled:s,children:[r.jsx(l,{label:"label 2"}),r.jsx(l,{label:"label 3"})]})]}),"TemplateFormGroup"),o=j.bind({});o.args={title:"",tooltip:"",isDisabled:!1};var m,p,n;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`() => {
  return <Form>
      <TextField label='label 1' />
    </Form>;
}`,...(n=(p=e.parameters)==null?void 0:p.docs)==null?void 0:n.source}}};var d,c,b;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`({
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
  </Form>`,...(b=(c=o.parameters)==null?void 0:c.docs)==null?void 0:b.source}}};const C=["Default","FormGroup"];export{e as Default,o as FormGroup,C as __namedExportsOrder,B as default};
