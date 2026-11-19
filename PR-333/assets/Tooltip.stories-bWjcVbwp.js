var y=Object.defineProperty;var r=(t,o)=>y(t,"name",{value:o,configurable:!0});import{n as h}from"./rolldown-runtime-CzYk_CEw.js";import{n as v,t as f}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{t as x}from"./jsx-runtime-Br4tQxt1.js";import{a as d,i as D,n as w,o as B,r as m,t as l}from"./Tooltip-CIePXSwO.js";import{n as b}from"./src-vLorkEft.js";import{ht as O}from"./iframe-Ds57Ga3H.js";var n,c,u,p,_,j,e,i,E;function g(){return(g=h((()=>{f(),O(),D(),B(),w(),n=x(),{expect:c,userEvent:u,within:p}=__STORYBOOK_MODULE_TEST__,_=v.div`
  text-align: center;
  margin-top: 100px;
`,j={component:l,title:"Data Display/Tooltip",argTypes:{background:{options:Object.values(m),control:{type:"radio"}},direction:{options:Object.values(d),control:{type:"select"}},children:{table:{disable:!0}}},render:r(({children:t,hideDelay:o,background:s,direction:a,message:T})=>(0,n.jsx)(_,{children:(0,n.jsxs)(l,{hideDelay:o,children:[t,(0,n.jsx)(l.Content,{background:s,direction:a,children:T})]})}),"render")},e={args:{hideDelay:0,children:(0,n.jsx)(b,{children:"Hover or focus me"}),direction:d.Top,background:m.Full,message:"This is a tooltip message."}},i={...e,play:r(async({canvasElement:t})=>{const o=p(t),s=p(t.ownerDocument.body);await u.hover(o.getByTestId("tooltip-container"));const a=await s.findByRole("tooltip");await c(a).toBeVisible(),await c(a).toHaveTextContent("Delete")},"play")},E=["Default","Open"],e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    hideDelay: 0,
    children: <Button>Hover or focus me</Button>,
    direction: OTooltipDirection.Top,
    background: OTooltipBackground.Full,
    message: 'This is a tooltip message.'
  }
}`,...e.parameters?.docs?.source}}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  ...Default,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.hover(canvas.getByTestId('tooltip-container'));
    const tooltip = await page.findByRole('tooltip');
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveTextContent('Delete');
  }
}`,...i.parameters?.docs?.source}}}})))()}r(g,"init_Tooltip_stories");g();export{e as Default,i as Open,E as __namedExportsOrder,j as default};
