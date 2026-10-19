var p=Object.defineProperty;var t=(e,m)=>p(e,"name",{value:m,configurable:!0});import{n as d}from"./rolldown-runtime-CzYk_CEw.js";import{t as f}from"./react-HNhQAnN4.js";import{t as h}from"./jsx-runtime-Br4tQxt1.js";import{n as w,t as c}from"./Pagination-D0GGnEaD.js";var P,a,g,x,s,n,o,_;function l(){return(l=d((()=>{P=f(),w(),a=h(),g=t(e=>{const[m,i]=(0,P.useState)(e.currentPage||1),[I,u]=(0,P.useState)(e.itemsPerPage);return(0,P.useEffect)(()=>{u(e.itemsPerPage)},[e.itemsPerPage]),(0,a.jsx)("div",{style:{padding:"40px",width:"100%"},children:(0,a.jsx)(c,{...e,currentPage:m,itemsPerPage:I,onItemsPerPageChange:t(r=>{u(r),i(1),e.onItemsPerPageChange?.(r)},"onItemsPerPageChange"),onPageChange:t(r=>{i(r),e.onPageChange?.(r)},"onPageChange")})})},"PaginationWrapper"),x={title:"Data Display/Pagination",component:c,parameters:{docs:{source:{code:`
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
          );`,language:"tsx"}}},argTypes:{totalPages:{control:{type:"number",min:1,max:100}},totalItems:{control:{type:"number",min:0,max:1e3}},itemsPerPage:{control:{type:"number",min:1,max:100}},showItemsPerPage:{control:"boolean"},showItemsInfo:{control:"boolean"}}},s={render:t(e=>(0,a.jsx)(g,{...e}),"render"),args:{totalPages:10,totalItems:98,itemsPerPage:10,showItemsPerPage:!1,showItemsInfo:!1}},n={render:t(e=>(0,a.jsx)(g,{...e}),"render"),args:{totalPages:10,totalItems:200,itemsPerPage:20,showItemsPerPage:!0,showItemsInfo:!0,itemsPerPageOptions:[10,20,50,100]}},o={render:t(e=>(0,a.jsx)(g,{...e}),"render"),args:{totalPages:5,totalItems:50,itemsPerPage:10,showItemsPerPage:!1,showItemsInfo:!1}},_=["Default","WithItemsPerPage","FewPages"],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 10,
    totalItems: 98,
    itemsPerPage: 10,
    showItemsPerPage: false,
    showItemsInfo: false
  }
}`,...s.parameters?.docs?.source}}},n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 10,
    totalItems: 200,
    itemsPerPage: 20,
    showItemsPerPage: true,
    showItemsInfo: true,
    itemsPerPageOptions: [10, 20, 50, 100]
  }
}`,...n.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 5,
    totalItems: 50,
    itemsPerPage: 10,
    showItemsPerPage: false,
    showItemsInfo: false
  }
}`,...o.parameters?.docs?.source}}}})))()}t(l,"init_Pagination_stories");l();export{s as Default,o as FewPages,n as WithItemsPerPage,_ as __namedExportsOrder,x as default};
