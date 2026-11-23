var h=Object.defineProperty;var r=(t,e)=>h(t,"name",{value:e,configurable:!0});import{n as y}from"./rolldown-runtime-CzYk_CEw.js";import{n as v,t as f}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{t as x}from"./jsx-runtime-Br4tQxt1.js";import{a as m,i as w,n as B,o as b,r as d,t as l}from"./Tooltip-CIePXSwO.js";import{n as D}from"./src-vLorkEft.js";import{ht as O}from"./iframe-kf-OxorD.js";var i,c,u,p,_,j,o,n,E;function g(){return(g=y((()=>{f(),O(),w(),b(),B(),i=x(),{expect:c,userEvent:u,within:p}=__STORYBOOK_MODULE_TEST__,_=v.div`
  text-align: center;
  margin-top: 100px;
`,j={component:l,title:"Data Display/Tooltip",argTypes:{background:{options:Object.values(d),control:{type:"radio"}},direction:{options:Object.values(m),control:{type:"select"}},children:{table:{disable:!0}}},render:r(({children:t,hideDelay:e,background:s,direction:a,message:T})=>(0,i.jsx)(_,{children:(0,i.jsxs)(l,{hideDelay:e,children:[t,(0,i.jsx)(l.Content,{background:s,direction:a,children:T})]})}),"render")},o={args:{hideDelay:0,children:(0,i.jsx)(D,{children:"Hover or focus me"}),direction:m.Top,background:d.Full,message:"This is a tooltip message."}},n={...o,play:r(async({canvasElement:t})=>{const e=p(t),s=p(t.ownerDocument.body);await u.hover(e.getByTestId("tooltip-container"));const a=await s.findByRole("tooltip");await c(a).toBeVisible(),await c(a).toHaveTextContent("This is a tooltip message.")},"play")},E=["Default","Open"],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    hideDelay: 0,
    children: <Button>Hover or focus me</Button>,
    direction: OTooltipDirection.Top,
    background: OTooltipBackground.Full,
    message: 'This is a tooltip message.'
  }
}`,...o.parameters?.docs?.source}}},n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...Default,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.hover(canvas.getByTestId('tooltip-container'));
    const tooltip = await page.findByRole('tooltip');
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveTextContent('This is a tooltip message.');
  }
}`,...n.parameters?.docs?.source}}}})))()}r(g,"init_Tooltip_stories");g();export{o as Default,n as Open,E as __namedExportsOrder,j as default};
