var p=Object.defineProperty;var i=(t,s)=>p(t,"name",{value:s,configurable:!0});import{t as n}from"./jsx-runtime-Br4tQxt1.js";import{t as o}from"./TextField-CCGb3PFn.js";import"./text-field-BZkbmVl4.js";import{t as a}from"./src-B0-2d9BL.js";var r=n(),G={title:"Data Display/Form",component:a},d=i(()=>(0,r.jsx)(a,{children:(0,r.jsx)(o,{label:"label 1"})}),"Template"),e=d.bind({});e.args={};var u=i(({isDisabled:t,title:s,tooltip:m})=>(0,r.jsxs)(a,{children:[(0,r.jsx)(a.Group,{title:s,tooltip:m,children:(0,r.jsx)(o,{label:"label 1"})}),(0,r.jsxs)(a.Group,{isDisabled:t,children:[(0,r.jsx)(o,{label:"label 2"}),(0,r.jsx)(o,{label:"label 3"})]})]}),"TemplateFormGroup"),l=u.bind({});l.args={title:"",tooltip:"",isDisabled:!1};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`() => {
  return <Form>
      <TextField label='label 1' />
    </Form>;
}`,...e.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`({
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
  </Form>`,...l.parameters?.docs?.source}}};var f=["Default","FormGroup"];export{e as Default,l as FormGroup,f as __namedExportsOrder,G as default};
