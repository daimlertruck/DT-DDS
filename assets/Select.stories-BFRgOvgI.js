var x=Object.defineProperty;var s=(a,l)=>x(a,"name",{value:l,configurable:!0});import{n as y}from"./rolldown-runtime-CzYk_CEw.js";import{t as O}from"./react-HNhQAnN4.js";import{t as E}from"./jsx-runtime-Br4tQxt1.js";import{n as o,t as w}from"./src-DY0LTEA0.js";var f,t,v,h,g,b,m,M,n,i,_,c,S;function D(){return(D=y((()=>{f=O(),w(),t=E(),{useArgs:v}=__STORYBOOK_MODULE_PREVIEW_API__,{expect:h,userEvent:g,within:b}=__STORYBOOK_MODULE_TEST__,m=[{value:"opt1",label:"Option 1",isDisabled:!1},{value:"opt2",label:"Option 2",isDisabled:!1},{value:"opt3",label:"A text message to see how big labels will be handled",isDisabled:!1},{value:"opt4",label:"Option 3",isDisabled:!0},{value:"opt5",label:"Option 4",isDisabled:!1}],M={title:"Data Display/Select",component:o,argTypes:{helperText:{control:"text"},variant:{options:["outlined","bottom-line"],control:{type:"select"}},fill:{options:["default","contrast","light"],control:{type:"select"}},scale:{options:["standard","compact"],control:{type:"select"}}},render:s(({options:a,...l})=>{const[{value:r},p]=v(),d=s(e=>p({value:e}),"handleChange");return(0,t.jsx)(o,{...l,isMulti:!1,onChange:d,value:r,children:a.map((e,u)=>(0,t.jsxs)(o.Option,{index:u,isDisabled:e.isDisabled,value:e.value,valueLabel:e.label,children:[e.label," ",u===0?"- This is the first option!":""]},e.value))})},"render")},n={args:{options:m,label:"My label",helperText:"",isRequired:!1,hasError:!1,isDisabled:!1,value:"",isFloatingLabel:!0,scale:"standard",placeholder:"Insert an option"}},i={...n,play:s(async({canvasElement:a})=>{const l=b(a),r=b(a.ownerDocument.body);await g.click(l.getByRole("combobox")),await h(await r.findByRole("listbox")).toBeVisible()},"play")},_=s(({options:a,value:l,...r})=>{const[p,d]=(0,f.useState)(l||[]);return(0,t.jsx)(o,{...r,isMulti:!0,onChange:d,value:p,children:a.map((e,u)=>(0,t.jsx)(o.Option,{index:u,isDisabled:e.isDisabled,value:e.value,children:e.label},e.value))})},"MultiSelectDemo"),c={args:{options:m,label:"My multi label",helperText:"Here to help you",isRequired:!1,hasError:!1,isDisabled:!1,isFloatingLabel:!1,variant:"bottom-line",fill:"contrast",scale:"compact",value:[]},render:s(a=>(0,t.jsx)(_,{...a}),"render")},S=["Default","Open","Multi"],n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    options: options,
    label: 'My label',
    helperText: '',
    isRequired: false,
    hasError: false,
    isDisabled: false,
    value: '',
    isFloatingLabel: true,
    scale: 'standard',
    placeholder: 'Insert an option'
  }
}`,...n.parameters?.docs?.source}}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  ...Default,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('combobox'));
    await expect(await page.findByRole('listbox')).toBeVisible();
  }
}`,...i.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    options,
    label: 'My multi label',
    helperText: 'Here to help you',
    isRequired: false,
    hasError: false,
    isDisabled: false,
    isFloatingLabel: false,
    variant: 'bottom-line',
    fill: 'contrast',
    scale: 'compact',
    value: []
  },
  render: args => <MultiSelectDemo {...args} />
}`,...c.parameters?.docs?.source}}}})))()}s(D,"init_Select_stories");D();export{n as Default,c as Multi,i as Open,S as __namedExportsOrder,M as default};
