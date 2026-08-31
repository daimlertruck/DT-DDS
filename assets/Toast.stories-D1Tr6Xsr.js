var p=Object.defineProperty;var e=(o,i)=>p(o,"name",{value:i,configurable:!0});import{t as d}from"./jsx-runtime-Br4tQxt1.js";import{a as u}from"./core-DtZ76Qs_.js";import{t as g}from"./src-DOZlIpA1.js";import{i as a,n as h,r as T,t as y}from"./src-C4swBsVr.js";import"./button-CfcM87f0.js";var s=d(),_={title:"Data Display/Toast",component:T,argTypes:{type:{mapping:a,options:Object.values(a).filter(o=>typeof o=="string"),control:{type:"inline-radio"}}},render:e(({children:o,type:i,title:n,message:c,dismissible:l,...m})=>(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("button",{onClick:e(()=>h({type:i,title:n,message:c,dismissible:l,children:o}),"onClick"),type:"button",children:"Click me"}),(0,s.jsx)(u,{isOpen:!0,children:(0,s.jsx)(y,{...m})})]}),"render")},r={args:{type:a.Success,title:"success",dismissible:!0,message:"This is a success message showed in the Toast.",onClose:e(()=>console.log("clicked"),"onClose")}},t={args:{type:a.Error,title:"error",message:"This is an error message showed in the Toast.",onClose:e(()=>console.log("clicked"),"onClose"),children:(0,s.jsx)(g,{onClick:e(()=>console.log("clicked"),"onClick"),children:"Action 2"})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    type: ToastType.Success,
    title: 'success',
    dismissible: true,
    message: 'This is a success message showed in the Toast.',
    onClose: () => console.log('clicked')
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    type: ToastType.Error,
    title: 'error',
    message: 'This is an error message showed in the Toast.',
    onClose: () => console.log('clicked'),
    children: <Button onClick={() => console.log('clicked')}>Action 2</Button>
  }
}`,...t.parameters?.docs?.source}}};var b=["Default","WithActions"];export{r as Default,t as WithActions,b as __namedExportsOrder,_ as default};
