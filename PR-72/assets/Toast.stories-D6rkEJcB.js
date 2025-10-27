import{j as o}from"./jsx-runtime-CB_V9I5Y.js";import{B as x}from"./Button-CcKZkJgX.js";import"./Button.styled-BhGEnxfn.js";import"./index-D9dZuxfj.js";import"./index-BUIOwkTi.js";import{P as j}from"./Portal-DUP4U3GD.js";import{R as c}from"./index-CTjT7uj6.js";import{T as a,n as u,a as C,F as A,b as k}from"./index-YjzhnqnF.js";import"./index-XjDa9cP3.js";import{T as O}from"./z-index-CLLOsryR.js";import{u as R}from"./useMedia-bxl5YFrZ.js";import{d as S}from"./emotion-styled.browser.esm-DBghOYGd.js";import"./Spinner-CJLgD7D_.js";import"./index-CWvrgZ1b.js";import"./Typography-DHEP7O00.js";import"./emotion-react.browser.esm-Bwsi5GpN.js";import"./index-BAMY2Nnw.js";import"./iframe-DRQO4tJt.js";import"./Icon-DG6KDu5A.js";const D=4e3,_=1/0,B=k.BottomCenter,w=k.BottomRight,E=s=>c.Children.map(s,e=>c.isValidElement(e)?e.type===x?c.cloneElement(e,{...e.props,size:"small",variant:"text"}):e.props.children?c.cloneElement(e,{...e.props},E(e.props.children)):e:e),I=({type:s,title:e,message:n,children:r,dismissible:i,...t})=>{const b=s===a.Error?_:D;u.custom(p=>o.jsx(C,{dismissible:i,id:p.id,isVisible:p.visible,message:n,onClose:()=>u.dismiss(p.id),title:e,type:s,children:E(r)}),{duration:b,...t})},P=({gutter:s=8,...e})=>{const n=S(),r=R(`(max-width: ${n.breakpoints.mq2}px)`),i=r?B:w,t=r?8:16;return o.jsx(A,{gutter:s,position:i,...e,containerStyle:{bottom:16,right:t,top:t,left:t,...e.containerStyle,zIndex:O}})},ee={title:"Data Display/Toast",component:C,argTypes:{type:{mapping:a,options:Object.values(a).filter(s=>typeof s=="string"),control:{type:"inline-radio"}}},render:({children:s,type:e,title:n,message:r,dismissible:i,...t})=>o.jsxs(o.Fragment,{children:[o.jsx("button",{onClick:()=>I({type:e,title:n,message:r,dismissible:i,children:s}),type:"button",children:"Click me"}),o.jsx(j,{isOpen:!0,children:o.jsx(P,{...t})})]})},m={args:{type:a.Success,title:"success",dismissible:!0,message:"This is a success message showed in the Toast.",onClose:()=>console.log("clicked")}},l={args:{type:a.Error,title:"error",message:"This is an error message showed in the Toast.",onClose:()=>console.log("clicked"),children:o.jsx(x,{onClick:()=>console.log("clicked"),children:"Action 2"})}};var d,T,g;m.parameters={...m.parameters,docs:{...(d=m.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    type: ToastType.Success,
    title: 'success',
    dismissible: true,
    message: 'This is a success message showed in the Toast.',
    onClose: () => console.log('clicked')
  }
}`,...(g=(T=m.parameters)==null?void 0:T.docs)==null?void 0:g.source}}};var h,f,y;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    type: ToastType.Error,
    title: 'error',
    message: 'This is an error message showed in the Toast.',
    onClose: () => console.log('clicked'),
    children: <Button onClick={() => console.log('clicked')}>Action 2</Button>
  }
}`,...(y=(f=l.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};const se=["Default","WithActions"];export{m as Default,l as WithActions,se as __namedExportsOrder,ee as default};
