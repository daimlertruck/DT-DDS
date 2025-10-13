import{j as e}from"./jsx-runtime-CB_V9I5Y.js";import"./index-BV8q0bTk.js";import"./index-BWbFm2yW.js";import{P as f}from"./Portal-DUP4U3GD.js";import"./index-CTjT7uj6.js";import{T as c,n as p,a as y,F as x,b as A}from"./index-D40cKggj.js";import"./index-XjDa9cP3.js";import{u as C}from"./useMedia-bxl5YFrZ.js";import{d as j}from"./emotion-styled.browser.esm-DBghOYGd.js";import"./emotion-react.browser.esm-Bwsi5GpN.js";import"./index-BAMY2Nnw.js";import"./iframe-BkdVWp6D.js";import"./index-CWvrgZ1b.js";import"./Typography-DOQ44quZ.js";import"./Close-BgpoXZkN.js";import"./Button-DSrMKdf0.js";import"./Spinner-lYAnAnA5.js";const O=14e7,S=1/0,D=A.BottomCenter,E=A.BottomRight,R=({type:o,title:t,message:n,actions:i,dismissible:r,...s})=>{const b=o===c.Error?S:O;p.custom(m=>e.jsx(y,{actions:i,dismissible:r,id:m.id,isVisible:m.visible,message:n,onClose:()=>p.dismiss(m.id),title:t,type:o}),{duration:b,...s})},_=({gutter:o=8,...t})=>{const n=j(),i=C(`(max-width: ${n.breakpoints.mq2}px)`),r=i?D:E,s=i?8:16;return e.jsx(x,{gutter:o,position:r,...t,containerStyle:{bottom:16,right:s,top:s,left:s,...t.containerStyle}})},J={title:"Data Display/Toast",component:y,argTypes:{type:{mapping:c,options:Object.values(c).filter(o=>typeof o=="string"),control:{type:"inline-radio"}}},render:({actions:o,type:t,title:n,message:i,dismissible:r,...s})=>e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:()=>R({type:t,title:n,message:i,dismissible:r,actions:o}),type:"button",children:"Click me"}),e.jsx(f,{isOpen:!0,children:e.jsx(_,{...s})})]})},a={args:{type:c.Success,title:"success",dismissible:!0,message:"This is a success message showed in the Toast.",onClose:()=>console.log("clicked")}},l={args:{type:c.Error,title:"error",message:"This is an error message showed in the Toast.",onClose:()=>console.log("clicked"),actions:[{onClick:()=>console.log("Action 1 clicked"),label:"Action 1"},{onClick:()=>console.log("Action 2 clicked"),label:"Action 2"}]}};var d,u,g;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    type: ToastType.Success,
    title: 'success',
    dismissible: true,
    message: 'This is a success message showed in the Toast.',
    onClose: () => console.log('clicked')
  }
}`,...(g=(u=a.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var T,h,k;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    type: ToastType.Error,
    title: 'error',
    message: 'This is an error message showed in the Toast.',
    onClose: () => console.log('clicked'),
    actions: [{
      onClick: () => console.log('Action 1 clicked'),
      label: 'Action 1'
    }, {
      onClick: () => console.log('Action 2 clicked'),
      label: 'Action 2'
    }]
  }
}`,...(k=(h=l.parameters)==null?void 0:h.docs)==null?void 0:k.source}}};const K=["Default","WithActions"];export{a as Default,l as WithActions,K as __namedExportsOrder,J as default};
