var f=Object.defineProperty;var l=(n,r)=>f(n,"name",{value:r,configurable:!0});import{t as g}from"./jsx-runtime-Br4tQxt1.js";import{n as o,r as b,t as k}from"./hooks-CZqRd1yP.js";import{t as d}from"./src-DOZlIpA1.js";import"./button-CfcM87f0.js";var e=g(),y=l(({actionTitle:n,content:r,title:i,subTitle:c,hasHeaderBorder:u,hasFooterBorder:m,hasFooterBackgroundColor:p,isLoading:s})=>{const{isModalOpen:h,toggleModal:a}=k();return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("button",{onClick:a,type:"button",children:"Click me"}),(0,e.jsx)(b,{isOpen:h,children:(0,e.jsxs)(o,{onClickOutside:a,children:[(0,e.jsx)(o.Header,{hasBorder:u,onClose:a,subTitle:c,title:i}),r?(0,e.jsx)(o.Content,{isLoading:s,children:(0,e.jsx)("p",{children:r})}):null,(0,e.jsxs)(o.Footer,{hasBackgroundColor:p,hasBorder:m,children:[(0,e.jsx)(d,{color:"secondary",dataTestId:"cancel",onClick:a,variant:"outlined",children:"Cancel"}),(0,e.jsx)(d,{dataTestId:"action",isDisabled:s,onClick:l(()=>null,"onClick"),children:n})]})]})})]})},"Template"),F={title:"Data Display/Modal",component:o,render:y,argTypes:{hasHeaderBorder:{control:{type:"boolean"},defaultValue:{summary:!1},description:"Add bottom border to Header"},hasHeaderBackgroundColor:{control:{type:"boolean"},defaultValue:{summary:!1},description:"Add background color to Header"},hasFooterBorder:{control:{type:"boolean"},defaultValue:{summary:!1},description:"Add top border to footer"},hasFooterBackgroundColor:{control:{type:"boolean"},defaultValue:{summary:!1},description:"Add background color to Footer"},onClickOutside:{description:"Enables click outside to trigger close an action"},isLoading:{control:{type:"boolean"},defaultValue:{summary:!1},description:"Adds loading spinner and overlay"}}},t={args:{actionTitle:"Action",content:"Some content here",title:"Title",subTitle:"Some random Subtitle here",hasHeaderBorder:!1,hasHeaderBackgroundColor:!1,hasFooterBorder:!1,hasFooterBackgroundColor:!1,isLoading:!1}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    actionTitle: 'Action',
    content: 'Some content here',
    title: 'Title',
    subTitle: 'Some random Subtitle here',
    hasHeaderBorder: false,
    hasHeaderBackgroundColor: false,
    hasFooterBorder: false,
    hasFooterBackgroundColor: false,
    isLoading: false
  }
}`,...t.parameters?.docs?.source}}};var H=["Default"];export{t as Default,H as __namedExportsOrder,F as default};
