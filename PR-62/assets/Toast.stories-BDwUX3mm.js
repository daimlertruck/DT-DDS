import{j as e}from"./jsx-runtime-CB_V9I5Y.js";import{B as k}from"./Button-C9Lv0zc7.js";import"./Button.styled-BhGEnxfn.js";import"./index-BV8q0bTk.js";import"./index-DCFTA1-v.js";import{P as O}from"./Portal-DUP4U3GD.js";import{R as l}from"./index-CTjT7uj6.js";import{T}from"./Tooltip-C6qADDd-.js";import{T as c,n as g,a as E,F as R,b as S}from"./index-DY9X_rFD.js";import"./index-XjDa9cP3.js";import{T as D}from"./z-index-CLLOsryR.js";import{u as _}from"./useMedia-bxl5YFrZ.js";import{d as B}from"./emotion-styled.browser.esm-DBghOYGd.js";import"./Spinner-lYAnAnA5.js";import"./index-CWvrgZ1b.js";import"./Typography-DOQ44quZ.js";import"./emotion-react.browser.esm-Bwsi5GpN.js";import"./index-BAMY2Nnw.js";import"./iframe-CVevGuyu.js";import"./Icon-DG6KDu5A.js";const w=4e3,I=1/0,P=S.BottomCenter,F=S.BottomRight,v=({type:s,title:r,message:i,children:n,dismissible:a,...t})=>{const b=s===c.Error?I:w;g.custom(d=>{const u=A=>l.Children.map(A,o=>l.isValidElement(o)?o.type===k?l.cloneElement(o,{...o.props,size:"small",variant:"text"}):o.props.children?l.cloneElement(o,{...o.props},u(o.props.children)):o:o);return e.jsx(E,{dismissible:a,id:d.id,isVisible:d.visible,message:i,onClose:()=>g.dismiss(d.id),title:r,type:s,children:u(n)})},{duration:b,...t})},N=({gutter:s=8,...r})=>{const i=B(),n=_(`(max-width: ${i.breakpoints.mq2}px)`),a=n?P:F,t=n?8:16;return e.jsx(R,{gutter:s,position:a,...r,containerStyle:{bottom:16,right:t,top:t,left:t,...r.containerStyle,zIndex:D}})},ro={title:"Data Display/Toast",component:E,argTypes:{type:{mapping:c,options:Object.values(c).filter(s=>typeof s=="string"),control:{type:"inline-radio"}}},render:({children:s,type:r,title:i,message:n,dismissible:a,...t})=>e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:()=>v({type:r,title:i,message:n,dismissible:a,children:s}),type:"button",children:"Click me"}),e.jsx(O,{isOpen:!0,children:e.jsx(N,{...t})})]})},m={args:{type:c.Success,title:"success",dismissible:!0,message:"This is a success message showed in the Toast.",onClose:()=>console.log("clicked")}},p={args:{type:c.Error,title:"error",message:"This is an error message showed in the Toast.",onClose:()=>console.log("clicked"),children:e.jsxs(T,{children:[e.jsx(k,{onClick:()=>console.log("clicked"),children:"Action 2"}),e.jsx(T.Content,{children:"Some tooltip"})]})}};var h,f,x;m.parameters={...m.parameters,docs:{...(h=m.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    type: ToastType.Success,
    title: 'success',
    dismissible: true,
    message: 'This is a success message showed in the Toast.',
    onClose: () => console.log('clicked')
  }
}`,...(x=(f=m.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var y,C,j;p.parameters={...p.parameters,docs:{...(y=p.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    type: ToastType.Error,
    title: 'error',
    message: 'This is an error message showed in the Toast.',
    onClose: () => console.log('clicked'),
    children: <Tooltip>
        <Button onClick={() => console.log('clicked')}>Action 2</Button>
        <Tooltip.Content>Some tooltip</Tooltip.Content>
      </Tooltip>
  }
}`,...(j=(C=p.parameters)==null?void 0:C.docs)==null?void 0:j.source}}};const no=["Default","WithActions"];export{m as Default,p as WithActions,no as __namedExportsOrder,ro as default};
