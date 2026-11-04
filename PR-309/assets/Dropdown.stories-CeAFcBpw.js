var v=Object.defineProperty;var t=(n,a)=>v(n,"name",{value:a,configurable:!0});import{n as I}from"./rolldown-runtime-CzYk_CEw.js";import{t as C}from"./react-HNhQAnN4.js";import{c as D,f as g}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{n as S}from"./src-Dy65K5lf.js";import{t as j}from"./jsx-runtime-Br4tQxt1.js";import{t as T}from"./icon-DzgDoBJz.js";import{t as E}from"./Typography-Bf8CMw9e.js";import{t as k}from"./typography-BUpnTNP7.js";import{n as c,t as B}from"./src-Cm3MhSca.js";var r,e,y,b,f,h,W,p,d,x,w,O,m,_,u,M;function R(){return(R=I((()=>{r=C(),D(),T(),k(),B(),e=j(),{expect:y,userEvent:b,within:f}=__STORYBOOK_MODULE_TEST__,h=[{text:"Option 1",value:"1"},{text:"Option 2",value:"2"},{text:"Option 3 with a large text message label",value:"3"},{text:"Option 4",value:"4",disabled:!0}],W={title:"Data Display/Dropdown",component:c,argTypes:{placement:{options:["bottom","top","right","left"],control:{type:"select"}},matchWidth:{control:{type:"boolean"}},offsetX:{control:{type:"number"}},offsetY:{control:{type:"number"}},isFocusable:{control:{type:"boolean"}}},render:t(function(a){const[s,l]=(0,r.useState)(!1),i=(0,r.useRef)(null);return(0,e.jsxs)("div",{style:{height:200,padding:16},children:[(0,e.jsxs)("button",{onClick:t(()=>l(!s),"onClick"),ref:i,style:{marginBottom:12},type:"button",children:[s?"Close":"Open"," dropdown"]}),(0,e.jsx)(c,{...a,anchorRef:i,isOpen:s,onClose:t(()=>l(!1),"onClose"),children:h.map(o=>(0,e.jsx)(c.Option,{isDisabled:o.disabled,onClick:t(()=>console.log(`${o.text} clicked`),"onClick"),children:o.text},o.value))})]})},"Render")},p={args:{anchorRef:(0,r.createRef)(),as:"ul",matchWidth:!1,offsetX:0,offsetY:4,placement:"bottom",isFocusable:!1}},d={...p,play:t(async({canvasElement:n})=>{const a=f(n),s=f(n.ownerDocument.body);await b.click(a.getByRole("button",{name:"Open dropdown"})),await y(await s.findByRole("menu")).toBeVisible()},"play")},x=[{text:"Very long text that should be truncated with ellipsis but extends beyond the intended width",value:"1"},{text:"My profile",value:"2"}],w=t(n=>{const a=g(),[s,l]=(0,r.useState)(!1),i=(0,r.useRef)(null);return(0,e.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",height:200,padding:a.spacing.spacing_30},children:[(0,e.jsxs)("button",{onClick:t(()=>l(!s),"onClick"),ref:i,style:{width:160},type:"button",children:[s?"Close":"Open"," dropdown"]}),s&&(0,e.jsx)(c,{...n,anchorRef:i,isOpen:!0,onClose:t(()=>l(!1),"onClose"),children:x.map(o=>(0,e.jsxs)(c.Option,{onClick:t(()=>console.log(`${o.text} clicked`),"onClick"),style:{display:"flex",alignItems:"center",gap:a.spacing.spacing_30},children:[(0,e.jsx)(S,{code:"user_attributes",size:"medium"}),(0,e.jsx)(E,{fontStyles:"bodyMdRegular",style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:o.text})]},o.value))})]})},"WithIconAndEllipsisDemo"),O=`
import { useRef, useState } from 'react';

import { useTheme } from '@emotion/react';

import { Dropdown } from '@dt-dds/react-dropdown';
import { Icon } from '@dt-dds/react-icon';
import { Typography } from '@dt-dds/react-typography';

const App = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} ref={ref} type='button'>
        {isOpen ? 'Close' : 'Open'} dropdown
      </button>
      {isOpen && (
        <Dropdown
          anchorRef={ref}
          as='ul'
          isFocusable={false}
          isOpen
          matchWidth={false}
          onClose={() => setIsOpen(false)}
        >
          <Dropdown.Option
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.spacing_30,
            }}
          >
            <Icon code='user_attributes' size='medium' />
            <Typography
              fontStyles='bodyMdRegular'
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              Very long text that should be truncated with ellipsis
            </Typography>
          </Dropdown.Option>
        </Dropdown>
      )}
    </>
  );
};
`,m={args:{anchorRef:(0,r.createRef)(),as:"ul",matchWidth:!1,offsetY:4,placement:"bottom",isFocusable:!1},parameters:{docs:{source:{code:O,language:"tsx"}}},render:t(n=>(0,e.jsx)(w,{...n}),"render")},_=t(n=>{const a=g(),[s,l]=(0,r.useState)(!1),i=(0,r.useRef)(null);return(0,e.jsxs)("div",{style:{height:200,overflow:"auto",background:a.palette.surface.light},children:[(0,e.jsx)("div",{style:{paddingBlock:a.spacing.spacing_500},children:(0,e.jsxs)("button",{onClick:t(()=>l(!s),"onClick"),ref:i,type:"button",children:[s?"Close":"Open"," dropdown"]})}),(0,e.jsx)(c,{...n,anchorRef:i,isOpen:s,onClose:t(()=>l(!1),"onClose"),children:h.map(o=>(0,e.jsx)(c.Option,{isDisabled:o.disabled,onClick:t(()=>console.log(`${o.text} clicked`),"onClick"),children:o.text},o.value))})]})},"InScrollableContainerDemo"),u={args:{anchorRef:(0,r.createRef)(),as:"ul",matchWidth:!1,offsetX:0,offsetY:4,placement:"bottom",isFocusable:!1},render:t(n=>(0,e.jsx)(_,{...n}),"render")},M=["Default","Open","WithIconAndEllipsis","InScrollableContainer"],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
  ...Default,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Open dropdown'
    }));
    await expect(await page.findByRole('menu')).toBeVisible();
  }
}`,...d.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    anchorRef: createRef<HTMLButtonElement>(),
    as: 'ul',
    matchWidth: false,
    offsetY: 4,
    placement: 'bottom',
    isFocusable: false
  },
  parameters: {
    docs: {
      source: {
        code: withIconAndEllipsisCode,
        language: 'tsx'
      }
    }
  },
  render: args => <WithIconAndEllipsisDemo {...args} />
}`,...m.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    anchorRef: createRef<HTMLButtonElement>(),
    as: 'ul',
    matchWidth: false,
    offsetX: 0,
    offsetY: 4,
    placement: 'bottom',
    isFocusable: false
  },
  render: args => <InScrollableContainerDemo {...args} />
}`,...u.parameters?.docs?.source}}}})))()}t(R,"init_Dropdown_stories");R();export{p as Default,u as InScrollableContainer,d as Open,m as WithIconAndEllipsis,M as __namedExportsOrder,W as default};
