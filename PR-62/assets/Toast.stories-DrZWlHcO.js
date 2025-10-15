import{j as o}from"./jsx-runtime-CB_V9I5Y.js";import{B as k}from"./Button-C9Lv0zc7.js";import"./Button.styled-BhGEnxfn.js";import"./index-BV8q0bTk.js";import"./index-51nBnJKx.js";import{P as O}from"./Portal-DUP4U3GD.js";import{R as m}from"./index-CTjT7uj6.js";import{T as c,n as T,a as E,F as R,b}from"./index-DY9X_rFD.js";import"./index-XjDa9cP3.js";import{T as S}from"./z-index-CLLOsryR.js";import{u as D}from"./useMedia-bxl5YFrZ.js";import{d as _}from"./emotion-styled.browser.esm-DBghOYGd.js";import"./Spinner-lYAnAnA5.js";import"./index-CWvrgZ1b.js";import"./Typography-DOQ44quZ.js";import"./emotion-react.browser.esm-Bwsi5GpN.js";import"./index-BAMY2Nnw.js";import"./iframe-BD0tYd6p.js";import"./Icon-DG6KDu5A.js";const B=4e3,w=1/0,I=b.BottomCenter,P=b.BottomRight,F=({type:s,title:r,message:i,children:n,dismissible:a,...t})=>{const j=s===c.Error?w:B;T.custom(u=>{const d=A=>m.Children.map(A,e=>m.isValidElement(e)?e.type===k?m.cloneElement(e,{...e.props,size:"small",variant:"text"}):e.props.children?m.cloneElement(e,{...e.props},d(e.props.children)):e:e);return o.jsx(E,{dismissible:a,id:u.id,isVisible:u.visible,message:i,onClose:()=>T.dismiss(u.id),title:r,type:s,children:d(n)})},{duration:j,...t})},v=({gutter:s=8,...r})=>{const i=_(),n=D(`(max-width: ${i.breakpoints.mq2}px)`),a=n?I:P,t=n?8:16;return o.jsx(R,{gutter:s,position:a,...r,containerStyle:{bottom:16,right:t,top:t,left:t,...r.containerStyle,zIndex:S}})},oe={title:"Data Display/Toast",component:E,argTypes:{type:{mapping:c,options:Object.values(c).filter(s=>typeof s=="string"),control:{type:"inline-radio"}}},render:({children:s,type:r,title:i,message:n,dismissible:a,...t})=>o.jsxs(o.Fragment,{children:[o.jsx("button",{onClick:()=>F({type:r,title:i,message:n,dismissible:a,children:s}),type:"button",children:"Click me"}),o.jsx(O,{isOpen:!0,children:o.jsx(v,{...t})})]})},l={args:{type:c.Success,title:"success",dismissible:!0,message:"This is a success message showed in the Toast.",onClose:()=>console.log("clicked")}},p={args:{type:c.Error,title:"error",message:"This is an error message showed in the Toast.",onClose:()=>console.log("clicked"),children:o.jsx(k,{onClick:()=>console.log("clicked"),children:"Action 2"})}};var g,h,f;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    type: ToastType.Success,
    title: 'success',
    dismissible: true,
    message: 'This is a success message showed in the Toast.',
    onClose: () => console.log('clicked')
  }
}`,...(f=(h=l.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var y,x,C;p.parameters={...p.parameters,docs:{...(y=p.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    type: ToastType.Error,
    title: 'error',
    message: 'This is an error message showed in the Toast.',
    onClose: () => console.log('clicked'),
    children: <Button onClick={() => console.log('clicked')}>Action 2</Button>
  }
}`,...(C=(x=p.parameters)==null?void 0:x.docs)==null?void 0:C.source}}};const te=["Default","WithActions"];export{l as Default,p as WithActions,te as __namedExportsOrder,oe as default};
