var c=Object.defineProperty;var n=(r,t)=>c(r,"name",{value:t,configurable:!0});import{o as l}from"./rolldown-runtime-CzYk_CEw.js";import{t as d}from"./react-HNhQAnN4.js";import{t as m}from"./jsx-runtime-Br4tQxt1.js";import{a as u}from"./core-DtZ76Qs_.js";import{n as o,t as i}from"./Backdrop-CD1ayY10.js";var f=l(d()),e=m(),k=n(({...r})=>{const[t,p]=(0,f.useState)(!1),s=n(()=>p(!t),"toggleBackdrop");return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("button",{onClick:s,type:"button",children:"Open Backdrop"}),(0,e.jsx)(u,{isOpen:t,children:(0,e.jsxs)(i,{...r,isOpen:t,children:[(0,e.jsx)(e.Fragment,{children:r.children}),(0,e.jsx)("button",{onClick:s,type:"button",children:"Close Backdrop"})]})})]})},"Template"),a={args:{isOpen:!1,type:o.Dark,children:(0,e.jsx)("div",{children:"Example content."})}},O={title:"Data Display/Backdrop",component:i,render:k,argTypes:{type:{mapping:o,options:Object.values(o).filter(r=>typeof r=="string"),control:{type:"inline-radio"}},children:{table:{disable:!0}},isOpen:{table:{disable:!0}}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: false,
    type: BackdropType.Dark,
    children: <div>Example content.</div>
  }
}`,...a.parameters?.docs?.source}}};var _=["Default"];export{a as Default,_ as __namedExportsOrder,O as default};
