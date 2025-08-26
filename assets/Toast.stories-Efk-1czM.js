import{j as o}from"./jsx-runtime-DMAvRu52.js";import{B as d}from"./Button-Cp6Upf1J.js";import"./Button.styled-DP-uCT9c.js";import"./index-CL4Xg4Pf.js";import"./index-BSh7GFw5.js";import{P as E}from"./Portal-DcNaNmD6.js";import{r as u}from"./index-Dl6G-zuu.js";import{T as a,n as g,a as k,b as B,c as j}from"./index-D5l_PImj.js";import"./index-DCrStp1_.js";import{u as O}from"./useMedia-D3XZz7EL.js";import{d as S}from"./emotion-styled.browser.esm-Dv69Fly8.js";import"./Spinner-C0sPkTaW.js";import"./index-DSuwS0lG.js";import"./Typography-DII2gFDQ.js";import"./emotion-react.browser.esm-DLeKyOu_.js";import"./index-BAMY2Nnw.js";import"./iframe-DMbQnZwK.js";import"./Close-mVzWqPf0.js";const D=4e3,R=1/0,v=j.BottomCenter,_=j.BottomRight,w=({type:e,title:t,message:r,children:n,dismissible:i,...s})=>{const b=e===a.Error?R:D;g.custom(c=>{const A=u.Children.map(n,p=>p&&u.cloneElement(p,{toastId:c.id,...p.props}));return o.jsx(k,{dismissible:i,id:c.id,isVisible:c.visible,message:r,onClose:()=>g.dismiss(c.id),title:t,type:e,children:A})},{duration:b,...s})},I=({gutter:e=8,...t})=>{const r=S(),n=O(`(max-width: ${r.breakpoints.s}px)`),i=n?v:_,s=n?8:16;return o.jsx(B,{gutter:e,position:i,...t,containerStyle:{bottom:16,right:s,top:s,left:s,...t.containerStyle}})},Z={title:"Data Display/Toast",component:k,argTypes:{type:{mapping:a,options:Object.values(a).filter(e=>typeof e=="string"),control:{type:"inline-radio"}}},render:({children:e,type:t,title:r,message:n,dismissible:i,...s})=>o.jsxs(o.Fragment,{children:[o.jsx("button",{onClick:()=>w({type:t,title:r,message:n,dismissible:i,children:e}),type:"button",children:"Click me"}),o.jsx(E,{isOpen:!0,children:o.jsx(I,{...s})})]})},l={args:{type:a.Success,title:"success",dismissible:!0,message:"This is a success message showed in the Toast.",onClose:()=>console.log("clicked")}},m={args:{type:a.Error,title:"error",message:"This is an error message showed in the Toast.",onClose:()=>console.log("clicked"),children:o.jsxs(o.Fragment,{children:[o.jsx(d,{color:"secondary",onClick:()=>console.log("clicked"),style:{padding:"8px 12px"},variant:"text",children:"Action 1"}),o.jsx(d,{color:"secondary",onClick:()=>console.log("clicked"),style:{padding:"8px 12px"},variant:"text",children:"Action 2"})]})}};var h,T,x;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    type: ToastType.Success,
    title: 'success',
    dismissible: true,
    message: 'This is a success message showed in the Toast.',
    onClose: () => console.log('clicked')
  }
}`,...(x=(T=l.parameters)==null?void 0:T.docs)==null?void 0:x.source}}};var y,C,f;m.parameters={...m.parameters,docs:{...(y=m.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    type: ToastType.Error,
    title: 'error',
    message: 'This is an error message showed in the Toast.',
    onClose: () => console.log('clicked'),
    children: <>
        <Button color='secondary' onClick={() => console.log('clicked')} style={{
        padding: '8px 12px'
      }} variant='text'>
          Action 1
        </Button>
        <Button color='secondary' onClick={() => console.log('clicked')} style={{
        padding: '8px 12px'
      }} variant='text'>
          Action 2
        </Button>
      </>
  }
}`,...(f=(C=m.parameters)==null?void 0:C.docs)==null?void 0:f.source}}};const oo=["Default","WithChildren"];export{l as Default,m as WithChildren,oo as __namedExportsOrder,Z as default};
