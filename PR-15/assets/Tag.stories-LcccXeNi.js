import{j as l}from"./jsx-runtime-DMAvRu52.js";import{T as r}from"./Tag-p01FBDoN.js";import"./index-Dl6G-zuu.js";import"./Tooltip-C-nq4h13.js";import"./emotion-styled.browser.esm-DpDeK1WQ.js";import"./index-9H7ywJDo.js";import"./index-DCrStp1_.js";import"./index-BAMY2Nnw.js";import"./iframe-D6m5c5dR.js";import"./Portal-DcNaNmD6.js";import"./z-index-Ds5QkyqS.js";import"./Close-mVzWqPf0.js";const c={Solid:"solid",Outlined:"outlined"},d={Rounded:"rounded",Squared:"squared"},p={Small:"small",Medium:"medium"},m={Opacity:"opacity",Full:"full"},u={Primary:"primary",Secondary:"secondary",Informative:"informative",Warning:"warning",Success:"success",Error:"error"},h={component:r,title:"Data Display/Tag",argTypes:{onClick:{options:[!0,void 0],control:{type:"radio",labels:{true:"Has onClick",undefined:"Does not have onClick"}}},onClose:{options:[!0,void 0],control:{type:"radio",labels:{true:"Has onClose",undefined:"Does not have onClose"}}},variant:{options:Object.values(c),control:{type:"radio"}},border:{options:Object.values(d),control:{type:"radio"}},size:{options:Object.values(p),control:{type:"radio"}},color:{options:Object.values(u),control:{type:"select"}},tooltipVariant:{options:Object.values(m),control:{type:"radio"}}},render:({onClick:n,onClose:s,...e})=>l.jsx(r,{...e,...n&&{onClick:()=>console.log("clicked")},...s&&{onClose:()=>console.log("closed")},children:e.children})},o={args:{children:"tag label",variant:"solid",size:"small",color:"primary",border:"squared",tooltipVariant:"opacity",isClickable:!1,isDisabled:!1,onClick:void 0,onClose:void 0}};var i,t,a;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(a=(t=o.parameters)==null?void 0:t.docs)==null?void 0:a.source}}};const x=["Default"];export{o as Default,x as __namedExportsOrder,h as default};
