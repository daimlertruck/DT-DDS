var d=Object.defineProperty;var i=(s,o)=>d(s,"name",{value:o,configurable:!0});import{o as u}from"./rolldown-runtime-CzYk_CEw.js";import{t as h}from"./react-HNhQAnN4.js";import{t as D}from"./jsx-runtime-Br4tQxt1.js";import{a as b}from"./core-DtZ76Qs_.js";import{n as f,t as r}from"./src-CViAu0Af.js";import{t as j}from"./codes-CRg7uRnw.js";var x=u(h()),e=D(),w=i(({body:s,title:o,icon:l,...c})=>{const[a,n]=(0,x.useState)(!1),p=i(()=>{n(m=>!m)},"toggleDrawer");return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("button",{onClick:p,type:"button",children:"Open Drawer"}),(0,e.jsx)(b,{isOpen:a,children:(0,e.jsxs)(r,{...c,isVisible:a,setIsVisible:n,children:[(0,e.jsx)(r.Header,{children:(0,e.jsx)(r.Title,{icon:l,title:o})}),(0,e.jsx)(r.Body,{children:(0,e.jsx)("div",{children:s})})]})})]})},"Template"),t={args:{body:"This is the body of the drawer.",title:"Drawer title",icon:null,position:"right"}},S={title:"Data Display/Drawer",component:r,argTypes:{icon:{options:Object.keys(j),control:{type:"select"}},position:{options:Object.values(f),control:{type:"select"}}},render:w};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    body: 'This is the body of the drawer.',
    title: 'Drawer title',
    icon: null,
    position: 'right'
  }
}`,...t.parameters?.docs?.source}}};var k=["Default"];export{t as Default,k as __namedExportsOrder,S as default};
