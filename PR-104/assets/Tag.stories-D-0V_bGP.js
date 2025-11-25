var c=Object.defineProperty;var o=(r,i)=>c(r,"name",{value:i,configurable:!0});import{j as d}from"./jsx-runtime-Cgz2XvFB.js";import{T as a}from"./Tag-Cw46IOYu.js";import"./index-CwbBKW39.js";import"./Tooltip-a9TNkS7d.js";import"./emotion-styled.browser.esm-Cgg3GKEJ.js";import"./typography-B3nKKPHm.js";import"./index-BEXvjAow.js";import"./emotion-react.browser.esm-DSneuyqi.js";import"./index-6Tx4pmSd.js";import"./iframe-z363bPWB.js";import"./z-index-KGn0H6PT.js";import"./index-DV-VXEUn.js";import"./Close-BB6prpXj.js";const p={Solid:"solid",Outlined:"outlined"},m={Rounded:"rounded",Squared:"squared"},u={Small:"small",Medium:"medium"},y={Opacity:"opacity",Full:"full"},g={Primary:"primary",Secondary:"secondary",Informative:"informative",Warning:"warning",Success:"success",Error:"error"},V={component:a,title:"Data Display/Tag",argTypes:{onClick:{options:[!0,void 0],control:{type:"radio",labels:{true:"Has onClick",undefined:"Does not have onClick"}}},onClose:{options:[!0,void 0],control:{type:"radio",labels:{true:"Has onClose",undefined:"Does not have onClose"}}},variant:{options:Object.values(p),control:{type:"radio"}},border:{options:Object.values(m),control:{type:"radio"}},size:{options:Object.values(u),control:{type:"radio"}},color:{options:Object.values(g),control:{type:"select"}},tooltipVariant:{options:Object.values(y),control:{type:"radio"}}},render:o(({onClick:r,onClose:i,...t})=>d.jsx(a,{...t,...r&&{onClick:o(()=>console.log("clicked"),"onClick")},...i&&{onClose:o(()=>console.log("closed"),"onClose")},children:t.children}),"render")},e={args:{children:"tag label",variant:"solid",size:"small",color:"primary",border:"squared",tooltipVariant:"opacity",isClickable:!1,isDisabled:!1,onClick:void 0,onClose:void 0}};var n,s,l;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    children: 'tag label',
    variant: 'solid',
    size: 'small',
    color: 'primary',
    border: 'squared',
    tooltipVariant: 'opacity',
    isClickable: false,
    isDisabled: false,
    onClick: undefined,
    onClose: undefined
  }
}`,...(l=(s=e.parameters)==null?void 0:s.docs)==null?void 0:l.source}}};const E=["Default"];export{e as Default,E as __namedExportsOrder,V as default};
