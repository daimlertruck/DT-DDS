var y=Object.defineProperty;var r=(n,t)=>y(n,"name",{value:t,configurable:!0});import{n as _}from"./rolldown-runtime-CzYk_CEw.js";import{t as O}from"./react-HNhQAnN4.js";import{t as b}from"./jsx-runtime-Br4tQxt1.js";import{t as f,u as g}from"./core-Bz6GRFLt.js";import{i as x,n as h,r as i,t as l}from"./Backdrop-BjFjYDgy.js";var d,e,m,u,c,B,a,o,v,w;function k(){return(k=_((()=>{d=O(),f(),h(),x(),e=b(),{expect:m,userEvent:u,within:c}=__STORYBOOK_MODULE_TEST__,B=r(({...n})=>{const[t,s]=(0,d.useState)(!1),p=r(()=>s(!t),"toggleBackdrop");return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("button",{onClick:p,type:"button",children:"Open Backdrop"}),(0,e.jsx)(g,{isOpen:t,children:(0,e.jsxs)(l,{...n,isOpen:t,children:[(0,e.jsx)(e.Fragment,{children:n.children}),(0,e.jsx)("button",{onClick:p,type:"button",children:"Close Backdrop"})]})})]})},"Template"),a={args:{isOpen:!1,type:i.Dark,children:(0,e.jsx)("div",{children:"Example content."})}},o={...a,play:r(async({canvasElement:n})=>{const t=c(n),s=c(n.ownerDocument.body);await u.click(t.getByRole("button",{name:"Open Backdrop"})),await m(await s.findByRole("button",{name:"Close Backdrop"})).toBeVisible()},"play")},v={title:"Data Display/Backdrop",component:l,render:B,argTypes:{type:{mapping:i,options:Object.values(i).filter(n=>typeof n=="string"),control:{type:"inline-radio"}},children:{table:{disable:!0}},isOpen:{table:{disable:!0}}}},w=["Default","Open"],a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: false,
    type: BackdropType.Dark,
    children: <div>Example content.</div>
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...Default,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Open Backdrop'
    }));
    await expect(await page.findByRole('button', {
      name: 'Close Backdrop'
    })).toBeVisible();
  }
}`,...o.parameters?.docs?.source}}}})))()}r(k,"init_Backdrop_stories");k();export{a as Default,o as Open,w as __namedExportsOrder,v as default};
