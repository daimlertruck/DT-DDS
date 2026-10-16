var x=Object.defineProperty;var t=(r,a)=>x(r,"name",{value:a,configurable:!0});import{n as _}from"./rolldown-runtime-CzYk_CEw.js";import{t as b}from"./react-HNhQAnN4.js";import{c as g,f as y}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{n as O}from"./src-DlI0_4X4.js";import{t as w}from"./jsx-runtime-Br4tQxt1.js";import{t as R}from"./icon-CD7uY2zo.js";import{t as j}from"./Typography-bj4ocMnz.js";import{t as v}from"./typography-BAvLtcMC.js";import{n as c,t as I}from"./src-BZS8Ak-i.js";var n,e,m,D,p,f,u,d,C;function h(){return(h=_((()=>{n=b(),g(),R(),v(),I(),e=w(),m=[{text:"Option 1",value:"1"},{text:"Option 2",value:"2"},{text:"Option 3 with a large text message label",value:"3"},{text:"Option 4",value:"4",disabled:!0}],D={title:"Data Display/Dropdown",component:c,argTypes:{placement:{options:["bottom","top","right","left"],control:{type:"select"}},matchWidth:{control:{type:"boolean"}},offsetX:{control:{type:"number"}},offsetY:{control:{type:"number"}},isFocusable:{control:{type:"boolean"}}},render:t(function(a){const[o,i]=(0,n.useState)(!1),l=(0,n.useRef)(null);return(0,e.jsxs)("div",{style:{height:200,padding:16},children:[(0,e.jsxs)("button",{onClick:t(()=>i(!o),"onClick"),ref:l,style:{marginBottom:12},type:"button",children:[o?"Close":"Open"," dropdown"]}),(0,e.jsx)(c,{...a,anchorRef:l,isOpen:o,onClose:t(()=>i(!1),"onClose"),children:m.map(s=>(0,e.jsx)(c.Option,{isDisabled:s.disabled,onClick:t(()=>console.log(`${s.text} clicked`),"onClick"),children:s.text},s.value))})]})},"Render")},p={args:{anchorRef:(0,n.createRef)(),as:"ul",matchWidth:!1,offsetX:0,offsetY:4,placement:"bottom",isFocusable:!1}},f=[{text:"Very long text that should be truncated with ellipsis but extends beyond the intended width",value:"1"},{text:"My profile",value:"2"}],u=t(r=>{const a=y(),[o,i]=(0,n.useState)(!1),l=(0,n.useRef)(null);return(0,e.jsxs)("div",{style:{display:"flex",height:200,padding:16},children:[(0,e.jsxs)("button",{onClick:t(()=>i(!o),"onClick"),ref:l,style:{width:160},type:"button",children:[o?"Close":"Open"," dropdown"]}),(0,e.jsx)(c,{...r,anchorRef:l,isOpen:o,onClose:t(()=>i(!1),"onClose"),children:f.map(s=>(0,e.jsxs)(c.Option,{onClick:t(()=>console.log(`${s.text} clicked`),"onClick"),style:{display:"flex",alignItems:"center",gap:a.spacing.spacing_30},children:[(0,e.jsx)(O,{code:"user_attributes",size:"medium"}),(0,e.jsx)(j,{fontStyles:"bodyMdRegular",style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:s.text})]},s.value))})]})},"WithIconAndEllipsisDemo"),d={args:{anchorRef:(0,n.createRef)(),as:"ul",matchWidth:!1,offsetY:4,placement:"bottom",isFocusable:!1},render:t(r=>(0,e.jsx)(u,{...r}),"render")},C=["Default","WithIconAndEllipsis"],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    anchorRef: createRef<HTMLButtonElement>(),
    as: 'ul',
    matchWidth: false,
    offsetX: 0,
    offsetY: 4,
    placement: 'bottom',
    isFocusable: false
  }
}`,...p.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    anchorRef: createRef<HTMLButtonElement>(),
    as: 'ul',
    matchWidth: false,
    offsetY: 4,
    placement: 'bottom',
    isFocusable: false
  },
  render: args => <WithIconAndEllipsisDemo {...args} />
}`,...d.parameters?.docs?.source}}}})))()}t(h,"init_Dropdown_stories");h();export{p as Default,d as WithIconAndEllipsis,C as __namedExportsOrder,D as default};
