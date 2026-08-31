var s=Object.defineProperty;var n=(a,r)=>s(a,"name",{value:r,configurable:!0});import{t}from"./jsx-runtime-Br4tQxt1.js";import{t as e}from"./SegmentedControl-EEVAh9CO.js";var o=t(),d={title:"Data Display/SegmentedControl",component:e,argTypes:{},render:n(a=>(0,o.jsxs)(e,{...a,children:[(0,o.jsx)(e.Option,{iconCode:"list",label:"List",value:"list"}),(0,o.jsx)(e.Option,{iconCode:"grid_view",label:"Gallery",value:"gallery"}),(0,o.jsx)(e.Option,{iconCode:"view_column",label:"Columns",value:"columns"}),(0,o.jsx)(e.Option,{disabled:!0,iconCode:"table_rows",label:"Rows",value:"rows"}),(0,o.jsx)(e.Option,{label:"Diagram",value:"diagram"})]}),"render")},l={argTypes:{selectedValue:{options:["none","list","gallery","columns","rows","diagram"],control:{type:"select"}}},args:{showLabel:!1,selectedValue:"none",onChangeControl:n(a=>console.log("value changed to",a),"onChangeControl")}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};var m=["Default"];export{l as Default,m as __namedExportsOrder,d as default};
