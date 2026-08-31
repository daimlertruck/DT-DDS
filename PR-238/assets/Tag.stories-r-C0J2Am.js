var n=Object.defineProperty;var o=(r,a)=>n(r,"name",{value:a,configurable:!0});import{t}from"./jsx-runtime-Br4tQxt1.js";import{t as l}from"./Tag-BzMQZhYZ.js";var s=t(),p={component:l,title:"Data Display/Tag",argTypes:{onClick:{options:[!0,void 0],control:{type:"radio",labels:{true:"Has onClick",undefined:"Does not have onClick"}}},onClose:{options:[!0,void 0],control:{type:"radio",labels:{true:"Has onClose",undefined:"Does not have onClose"}}},variant:{options:Object.values({Solid:"solid",Outlined:"outlined"}),control:{type:"radio"}},border:{options:Object.values({Rounded:"rounded",Squared:"squared"}),control:{type:"radio"}},size:{options:Object.values({Small:"small",Medium:"medium"}),control:{type:"radio"}},color:{options:Object.values({Primary:"primary",Secondary:"secondary",Informative:"informative",Warning:"warning",Success:"success",Error:"error"}),control:{type:"select"}},tooltipVariant:{options:Object.values({Opacity:"opacity",Full:"full"}),control:{type:"radio"}}},render:o(({onClick:r,onClose:a,...i})=>(0,s.jsx)(l,{...i,...r&&{onClick:o(()=>console.log("clicked"),"onClick")},...a&&{onClose:o(()=>console.log("closed"),"onClose")},children:i.children}),"render")},e={args:{children:"tag label",variant:"solid",size:"small",color:"primary",border:"squared",tooltipVariant:"opacity",isClickable:!1,isDisabled:!1,onClick:void 0,onClose:void 0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};var m=["Default"];export{e as Default,m as __namedExportsOrder,p as default};
