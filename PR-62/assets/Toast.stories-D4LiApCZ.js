import{j as s}from"./jsx-runtime-CB_V9I5Y.js";import{B as p}from"./Button-C9Lv0zc7.js";import"./Button.styled-BhGEnxfn.js";import"./index-BV8q0bTk.js";import"./index-D22tpZZN.js";import{P as k}from"./Portal-DUP4U3GD.js";import"./index-CTjT7uj6.js";import{T as a,n as d,a as y,F as b,b as j}from"./index-D-8MRoYS.js";import"./index-XjDa9cP3.js";import{T as C}from"./z-index-CLLOsryR.js";import{u as O}from"./useMedia-bxl5YFrZ.js";import{d as S}from"./emotion-styled.browser.esm-DBghOYGd.js";import"./Spinner-lYAnAnA5.js";import"./index-CWvrgZ1b.js";import"./Typography-DOQ44quZ.js";import"./emotion-react.browser.esm-Bwsi5GpN.js";import"./index-BAMY2Nnw.js";import"./iframe-DkXc2j9k.js";import"./Icon-DG6KDu5A.js";const B=4e3,D=1/0,E=j.BottomCenter,_=j.BottomRight,R=({type:o,title:t,message:r,children:i,dismissible:n,...e})=>{const A=o===a.Error?D:B;d.custom(l=>s.jsx(y,{dismissible:n,id:l.id,isVisible:l.visible,message:r,onClose:()=>d.dismiss(l.id),title:t,type:o,children:i}),{duration:A,...e})},w=({gutter:o=8,...t})=>{const r=S(),i=O(`(max-width: ${r.breakpoints.mq2}px)`),n=i?E:_,e=i?8:16;return s.jsx(b,{gutter:o,position:n,...t,containerStyle:{bottom:16,right:e,top:e,left:e,...t.containerStyle,zIndex:C}})},Q={title:"Data Display/Toast",component:y,argTypes:{type:{mapping:a,options:Object.values(a).filter(o=>typeof o=="string"),control:{type:"inline-radio"}}},render:({children:o,type:t,title:r,message:i,dismissible:n,...e})=>s.jsxs(s.Fragment,{children:[s.jsx("button",{onClick:()=>R({type:t,title:r,message:i,dismissible:n,children:o}),type:"button",children:"Click me"}),s.jsx(k,{isOpen:!0,children:s.jsx(w,{...e})})]})},c={args:{type:a.Success,title:"success",dismissible:!0,message:"This is a success message showed in the Toast.",onClose:()=>console.log("clicked")}},m={args:{type:a.Error,title:"error",message:"This is an error message showed in the Toast.",onClose:()=>console.log("clicked"),children:s.jsxs(s.Fragment,{children:[s.jsx(p,{children:"Action 1"}),s.jsx(p,{onClick:()=>console.log("clicked"),children:"Action 2"})]})}};var u,T,g;c.parameters={...c.parameters,docs:{...(u=c.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    type: ToastType.Success,
    title: 'success',
    dismissible: true,
    message: 'This is a success message showed in the Toast.',
    onClose: () => console.log('clicked')
  }
}`,...(g=(T=c.parameters)==null?void 0:T.docs)==null?void 0:g.source}}};var h,x,f;m.parameters={...m.parameters,docs:{...(h=m.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    type: ToastType.Error,
    title: 'error',
    message: 'This is an error message showed in the Toast.',
    onClose: () => console.log('clicked'),
    children: <>
        <Button>Action 1</Button>
        <Button onClick={() => console.log('clicked')}>Action 2</Button>
      </>
  }
}`,...(f=(x=m.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};const Y=["Default","WithActions"];export{c as Default,m as WithActions,Y as __namedExportsOrder,Q as default};
