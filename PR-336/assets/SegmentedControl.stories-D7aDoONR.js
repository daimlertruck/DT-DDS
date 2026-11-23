var r=Object.defineProperty;var a=(n,t)=>r(n,"name",{value:t,configurable:!0});import{n as i}from"./rolldown-runtime-CzYk_CEw.js";import{t as m}from"./jsx-runtime-Br4tQxt1.js";import{B as u,z as e}from"./iframe-CwLCmWb4.js";var o,c,l,d;function s(){return(s=i((()=>{u(),o=m(),c={title:"Data Display/SegmentedControl",component:e,argTypes:{},render:a(n=>(0,o.jsxs)(e,{...n,children:[(0,o.jsx)(e.Option,{iconCode:"list",label:"List",value:"list"}),(0,o.jsx)(e.Option,{iconCode:"grid_view",label:"Gallery",value:"gallery"}),(0,o.jsx)(e.Option,{iconCode:"view_column",label:"Columns",value:"columns"}),(0,o.jsx)(e.Option,{disabled:!0,iconCode:"table_rows",label:"Rows",value:"rows"}),(0,o.jsx)(e.Option,{label:"Diagram",value:"diagram"})]}),"render")},l={argTypes:{selectedValue:{options:["none","list","gallery","columns","rows","diagram"],control:{type:"select"}}},args:{showLabel:!1,selectedValue:"none",onChangeControl:a(n=>console.log("value changed to",n),"onChangeControl")}},d=["Default"],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  argTypes: {
    selectedValue: {
      options: ['none', 'list', 'gallery', 'columns', 'rows', 'diagram'],
      control: {
        type: 'select'
      }
    }
  },
  args: {
    showLabel: false,
    selectedValue: 'none',
    onChangeControl: (value: string) => console.log('value changed to', value)
  }
}`,...l.parameters?.docs?.source}}}})))()}a(s,"init_SegmentedControl_stories");s();export{l as Default,d as __namedExportsOrder,c as default};
