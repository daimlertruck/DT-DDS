var m=Object.defineProperty;var n=(l,i)=>m(l,"name",{value:i,configurable:!0});import{j as o}from"./jsx-runtime-Cgz2XvFB.js";import{S as e}from"./SegmentedControl-CrfQqAt9.js";import"./index-CwbBKW39.js";import"./Icon-BWIy_dZb.js";import"./emotion-styled.browser.esm-CIRWz9XU.js";import"./Tooltip-C1rV8yVn.js";import"./typography-B3nKKPHm.js";import"./index-DJD6yi0I.js";import"./emotion-react.browser.esm-BzOLYAw5.js";import"./index-6Tx4pmSd.js";import"./iframe--pX2zBjY.js";import"./z-index-C44GOntP.js";import"./index-DV-VXEUn.js";const O={title:"Data Display/SegmentedControl",component:e,argTypes:{},render:n(l=>o.jsxs(e,{...l,children:[o.jsx(e.Option,{iconCode:"list",label:"List",value:"list"}),o.jsx(e.Option,{iconCode:"grid_view",label:"Gallery",value:"gallery"}),o.jsx(e.Option,{iconCode:"view_column",label:"Columns",value:"columns"}),o.jsx(e.Option,{disabled:!0,iconCode:"table_rows",label:"Rows",value:"rows"}),o.jsx(e.Option,{label:"Diagram",value:"diagram"})]}),"render")},a={argTypes:{selectedValue:{options:["none","list","gallery","columns","rows","diagram"],control:{type:"select"}}},args:{showLabel:!1,selectedValue:"none",onChangeControl:n(l=>console.log("value changed to",l),"onChangeControl")}};var t,r,s;a.parameters={...a.parameters,docs:{...(t=a.parameters)==null?void 0:t.docs,source:{originalSource:`{
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
}`,...(s=(r=a.parameters)==null?void 0:r.docs)==null?void 0:s.source}}};const D=["Default"];export{a as Default,D as __namedExportsOrder,O as default};
