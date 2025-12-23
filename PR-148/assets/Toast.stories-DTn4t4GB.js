var A=Object.defineProperty;var o=(s,e)=>A(s,"name",{value:e,configurable:!0});import{j as t}from"./jsx-runtime-Cgz2XvFB.js";import{B as C}from"./Button-Bx6FT1ZV.js";import"./Button.styled-CSiC2f7q.js";import"./typography-B3nKKPHm.js";import"./index-Bfgvl4vq.js";import{T as O,P as R}from"./z-index-C44GOntP.js";import{R as m}from"./index-CwbBKW39.js";import{T as c,n as d,a as k,F as S,b as E}from"./index-t9IE9_zF.js";import"./index-DV-VXEUn.js";import{u as D}from"./useMedia-CRgJMRRc.js";import{d as _}from"./emotion-styled.browser.esm-CIRWz9XU.js";import"./Spinner-sAug7C4e.js";import"./index-DTgA8jos.js";import"./Typography-Dk4smw7A.js";import"./emotion-react.browser.esm-BzOLYAw5.js";import"./index-6Tx4pmSd.js";import"./iframe-B1fQfNLW.js";import"./Icon-BWIy_dZb.js";const B=4e3,w=1/0,I=E.BottomCenter,P=E.BottomRight,b=o(s=>m.Children.map(s,e=>m.isValidElement(e)?e.type===C?m.cloneElement(e,{...e.props,size:"small",variant:"text"}):e.props.children?m.cloneElement(e,{...e.props},b(e.props.children)):e:e),"processChildren"),F=o(({type:s,title:e,message:i,children:n,dismissible:a,...r})=>{const j=s===c.Error?w:B;d.custom(u=>t.jsx(k,{dismissible:a,id:u.id,isVisible:u.visible,message:i,onClose:o(()=>d.dismiss(u.id),"onClose"),title:e,type:s,children:b(n)}),{duration:j,...r})},"emitToast"),v=o(({gutter:s=8,...e})=>{const i=_(),n=D(`(max-width: ${i.breakpoints.mq2}px)`),a=n?I:P,r=n?8:16;return t.jsx(S,{gutter:s,position:a,...e,containerStyle:{bottom:16,right:r,top:r,left:r,...e.containerStyle,zIndex:O}})},"Toaster"),oe={title:"Data Display/Toast",component:k,argTypes:{type:{mapping:c,options:Object.values(c).filter(s=>typeof s=="string"),control:{type:"inline-radio"}}},render:o(({children:s,type:e,title:i,message:n,dismissible:a,...r})=>t.jsxs(t.Fragment,{children:[t.jsx("button",{onClick:o(()=>F({type:e,title:i,message:n,dismissible:a,children:s}),"onClick"),type:"button",children:"Click me"}),t.jsx(R,{isOpen:!0,children:t.jsx(v,{...r})})]}),"render")},l={args:{type:c.Success,title:"success",dismissible:!0,message:"This is a success message showed in the Toast.",onClose:o(()=>console.log("clicked"),"onClose")}},p={args:{type:c.Error,title:"error",message:"This is an error message showed in the Toast.",onClose:o(()=>console.log("clicked"),"onClose"),children:t.jsx(C,{onClick:o(()=>console.log("clicked"),"onClick"),children:"Action 2"})}};var T,g,h;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    type: ToastType.Success,
    title: 'success',
    dismissible: true,
    message: 'This is a success message showed in the Toast.',
    onClose: () => console.log('clicked')
  }
}`,...(h=(g=l.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var f,y,x;p.parameters={...p.parameters,docs:{...(f=p.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    type: ToastType.Error,
    title: 'error',
    message: 'This is an error message showed in the Toast.',
    onClose: () => console.log('clicked'),
    children: <Button onClick={() => console.log('clicked')}>Action 2</Button>
  }
}`,...(x=(y=p.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};const te=["Default","WithActions"];export{l as Default,p as WithActions,te as __namedExportsOrder,oe as default};
