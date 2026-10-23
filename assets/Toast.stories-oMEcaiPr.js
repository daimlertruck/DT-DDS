var u=Object.defineProperty;var s=(t,n)=>u(t,"name",{value:n,configurable:!0});import{n as d}from"./rolldown-runtime-CzYk_CEw.js";import{t as g}from"./jsx-runtime-Br4tQxt1.js";import{t as T,u as h}from"./core-zRuydxh_.js";import{n as _}from"./src-C9wOZ6an.js";import{a as y,c as f,n as k,o as x,r as j,s as i,t as C}from"./src-BgnoLtey.js";import{t as b}from"./button-CNZbGDTr.js";var e,w,o,r,A;function a(){return(a=d((()=>{b(),T(),f(),x(),C(),e=g(),w={title:"Data Display/Toast",component:y,argTypes:{type:{mapping:i,options:Object.values(i).filter(t=>typeof t=="string"),control:{type:"inline-radio"}}},render:s(({children:t,type:n,title:c,message:l,dismissible:m,...p})=>(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("button",{onClick:s(()=>j({type:n,title:c,message:l,dismissible:m,children:t}),"onClick"),type:"button",children:"Click me"}),(0,e.jsx)(h,{isOpen:!0,children:(0,e.jsx)(k,{...p})})]}),"render")},o={args:{type:i.Success,title:"success",dismissible:!0,message:"This is a success message showed in the Toast.",onClose:s(()=>console.log("clicked"),"onClose")}},r={args:{type:i.Error,title:"error",message:"This is an error message showed in the Toast.",onClose:s(()=>console.log("clicked"),"onClose"),children:(0,e.jsx)(_,{onClick:s(()=>console.log("clicked"),"onClick"),children:"Action 2"})}},A=["Default","WithActions"],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    type: ToastType.Success,
    title: 'success',
    dismissible: true,
    message: 'This is a success message showed in the Toast.',
    onClose: () => console.log('clicked')
  }
}`,...o.parameters?.docs?.source}}},r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    type: ToastType.Error,
    title: 'error',
    message: 'This is an error message showed in the Toast.',
    onClose: () => console.log('clicked'),
    children: <Button onClick={() => console.log('clicked')}>Action 2</Button>
  }
}`,...r.parameters?.docs?.source}}}})))()}s(a,"init_Toast_stories");a();export{o as Default,r as WithActions,A as __namedExportsOrder,w as default};
