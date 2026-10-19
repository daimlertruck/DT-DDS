var u=Object.defineProperty;var l=(s,i)=>u(s,"name",{value:i,configurable:!0});import{n as b}from"./rolldown-runtime-CzYk_CEw.js";import{t as F}from"./jsx-runtime-Br4tQxt1.js";import{t as a}from"./TextField-xDY_3Bks.js";import{t as c}from"./text-field-CY7f07ib.js";import{n as t,t as x}from"./src-yzHorObP.js";var e,_,n,r,m,o,f;function p(){return(p=b((()=>{c(),x(),e=F(),_={title:"Data Display/Form",component:t},n=l(()=>(0,e.jsx)(t,{children:(0,e.jsx)(a,{label:"label 1"})}),"Template"),r=n.bind({}),r.args={},m=l(({isDisabled:s,title:i,tooltip:d})=>(0,e.jsxs)(t,{children:[(0,e.jsx)(t.Group,{title:i,tooltip:d,children:(0,e.jsx)(a,{label:"label 1"})}),(0,e.jsxs)(t.Group,{isDisabled:s,children:[(0,e.jsx)(a,{label:"label 2"}),(0,e.jsx)(a,{label:"label 3"})]})]}),"TemplateFormGroup"),o=m.bind({}),o.args={title:"",tooltip:"",isDisabled:!1},f=["Default","FormGroup"],r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => {
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
  </Form>`,...o.parameters?.docs?.source}}}})))()}l(p,"init_Form_stories");p();export{r as Default,o as FormGroup,f as __namedExportsOrder,_ as default};
