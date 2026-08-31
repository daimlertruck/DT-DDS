var I=Object.defineProperty;var a=(e,P)=>I(e,"name",{value:P,configurable:!0});import{o as p}from"./rolldown-runtime-CzYk_CEw.js";import{t as d}from"./react-HNhQAnN4.js";import{t as f}from"./jsx-runtime-Br4tQxt1.js";import{t as c}from"./Pagination-U-_9wb5V.js";var g=p(d()),r=f(),m=a(e=>{const[P,i]=(0,g.useState)(e.currentPage||1),[l,u]=(0,g.useState)(e.itemsPerPage);return(0,g.useEffect)(()=>{u(e.itemsPerPage)},[e.itemsPerPage]),(0,r.jsx)("div",{style:{padding:"40px",width:"100%"},children:(0,r.jsx)(c,{...e,currentPage:P,itemsPerPage:l,onItemsPerPageChange:a(t=>{u(t),i(1),e.onItemsPerPageChange?.(t)},"onItemsPerPageChange"),onPageChange:a(t=>{i(t),e.onPageChange?.(t)},"onPageChange")})})},"PaginationWrapper"),S={title:"Data Display/Pagination",component:c,parameters:{docs:{source:{code:`
          const [currentPage, setCurrentPage] = useState(1);
          const [itemsPerPage, setItemsPerPage] = useState(10);

          return (
            <Pagination
              totalPages={10}
              totalItems={100}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={(page) => setCurrentPage(page)}
              onItemsPerPageChange={(items) => {
                setItemsPerPage(items);
                setCurrentPage(1);
              }}
            />
          );`,language:"tsx"}}},argTypes:{totalPages:{control:{type:"number",min:1,max:100}},totalItems:{control:{type:"number",min:0,max:1e3}},itemsPerPage:{control:{type:"number",min:1,max:100}},showItemsPerPage:{control:"boolean"},showItemsInfo:{control:"boolean"}}},s={render:a(e=>(0,r.jsx)(m,{...e}),"render"),args:{totalPages:10,totalItems:98,itemsPerPage:10,showItemsPerPage:!1,showItemsInfo:!1}},n={render:a(e=>(0,r.jsx)(m,{...e}),"render"),args:{totalPages:10,totalItems:200,itemsPerPage:20,showItemsPerPage:!0,showItemsInfo:!0,itemsPerPageOptions:[10,20,50,100]}},o={render:a(e=>(0,r.jsx)(m,{...e}),"render"),args:{totalPages:5,totalItems:50,itemsPerPage:10,showItemsPerPage:!1,showItemsInfo:!1}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 10,
    totalItems: 98,
    itemsPerPage: 10,
    showItemsPerPage: false,
    showItemsInfo: false
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 10,
    totalItems: 200,
    itemsPerPage: 20,
    showItemsPerPage: true,
    showItemsInfo: true,
    itemsPerPageOptions: [10, 20, 50, 100]
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 5,
    totalItems: 50,
    itemsPerPage: 10,
    showItemsPerPage: false,
    showItemsInfo: false
  }
}`,...o.parameters?.docs?.source}}};var j=["Default","WithItemsPerPage","FewPages"];export{s as Default,o as FewPages,n as WithItemsPerPage,j as __namedExportsOrder,S as default};
