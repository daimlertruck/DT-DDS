var d=Object.defineProperty;var o=(s,i)=>d(s,"name",{value:i,configurable:!0});import{l as u}from"./preload-helper-DhB_op97.js";import{t as h}from"./react-Cv64OdzP.js";import{t as D}from"./jsx-runtime-CPdzY0Ku.js";import{a as b}from"./core-DRZ7abR7.js";import{n as f,t as r}from"./src-B9Om6pUv.js";import{t as j}from"./codes-CRg7uRnw.js";var x=u(h()),e=D(),w=o(({body:s,title:i,icon:l,...c})=>{const[a,n]=(0,x.useState)(!1),p=o(()=>{n(m=>!m)},"toggleDrawer");return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("button",{onClick:p,type:"button",children:"Open Drawer"}),(0,e.jsx)(b,{isOpen:a,children:(0,e.jsxs)(r,{...c,isVisible:a,setIsVisible:n,children:[(0,e.jsx)(r.Header,{children:(0,e.jsx)(r.Title,{icon:l,title:i})}),(0,e.jsx)(r.Body,{children:(0,e.jsx)("div",{children:s})})]})})]})},"Template"),t={args:{body:"This is the body of the drawer.",title:"Drawer title",icon:null,position:"right"}},S={title:"Data Display/Drawer",component:r,argTypes:{icon:{options:Object.keys(j),control:{type:"select"}},position:{options:Object.values(f),control:{type:"select"}}},render:w};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    body: 'This is the body of the drawer.',
    title: 'Drawer title',
    icon: null,
    position: 'right'
  }
}`,...t.parameters?.docs?.source}}};var k=["Default"];export{t as Default,k as __namedExportsOrder,S as default};
