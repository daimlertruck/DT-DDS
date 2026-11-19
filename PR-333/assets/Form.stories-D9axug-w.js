var u=Object.defineProperty;var t=(s,i)=>u(s,"name",{value:i,configurable:!0});import{n as b}from"./rolldown-runtime-CzYk_CEw.js";import{t as F}from"./jsx-runtime-Br4tQxt1.js";import{t as a}from"./TextField-6atW7ANJ.js";import{t as c}from"./text-field-7V3gbHP1.js";import{_ as l,g as x}from"./iframe-Ds57Ga3H.js";var e,_,m,r,n,o,f;function p(){return(p=b((()=>{c(),x(),e=F(),_={title:"Data Display/Form",component:l},m=t(()=>(0,e.jsx)(l,{children:(0,e.jsx)(a,{label:"label 1"})}),"Template"),r=m.bind({}),r.args={},n=t(({isDisabled:s,title:i,tooltip:d})=>(0,e.jsxs)(l,{children:[(0,e.jsx)(l.Group,{title:i,tooltip:d,children:(0,e.jsx)(a,{label:"label 1"})}),(0,e.jsxs)(l.Group,{isDisabled:s,children:[(0,e.jsx)(a,{label:"label 2"}),(0,e.jsx)(a,{label:"label 3"})]})]}),"TemplateFormGroup"),o=n.bind({}),o.args={title:"",tooltip:"",isDisabled:!1},f=["Default","FormGroup"],r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => {
  return <Form>
      <TextField label='label 1' />
    </Form>;
}`,...r.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`({
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
  </Form>`,...o.parameters?.docs?.source}}}})))()}t(p,"init_Form_stories");p();export{r as Default,o as FormGroup,f as __namedExportsOrder,_ as default};
