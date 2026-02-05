var Q=Object.defineProperty;var o=(e,t)=>Q(e,"name",{value:t,configurable:!0});import{j as a}from"./jsx-runtime-Cgz2XvFB.js";import{r as p}from"./index-CwbBKW39.js";import{S as C}from"./Select-Dz5m8w-J.js";import{F as P,P as U,I as V,a as X,b as Y,c as Z,N as ee,d as u,T as v,e as te}from"./PaginationNavButton-cQoRMkV-.js";import"./emotion-styled.browser.esm-CIRWz9XU.js";import"./index-DTgA8jos.js";import"./Icon-9dVURh2l.js";import"./IconButton-a7wLVv3Y.js";import"./LabelField-BrIM5Qam.js";import"./Typography-Dk4smw7A.js";import"./typography-B3nKKPHm.js";import"./index-Cf7F2iyz.js";import"./Tooltip-FihdcOy-.js";import"./index-CMWlP-ed.js";import"./emotion-react.browser.esm-BzOLYAw5.js";import"./index-6Tx4pmSd.js";import"./iframe-BXQXpyEP.js";import"./z-index-C44GOntP.js";import"./index-DV-VXEUn.js";import"./Dropdown-C_QenBS2.js";import"./useClickOutside-Cp2kQToC.js";import"./Checkbox-1WqW39vQ.js";const ae=o((e,t)=>{const r=P;let l,g,s,n;const d=Math.min(e,t);let m=[d-1,d,d+1];return m.includes(r)?(m=[r,r+1,r+2],l=!1,g=!0,s=!1,n=t>4):m.includes(t-1)?(m=[t-2,t-1,t],l=!0,g=!1,s=!0,n=!1):(l=!1,g=!0,s=!1,n=t-m[2]>1),{pages:m,shouldRenderFirstPage:l,shouldRenderLastPage:g,shouldRenderLeftEllipsis:s,shouldRenderRightEllipsis:n}},"getPageNumbers"),S=o((e,t,r)=>a.jsx(te,{$isActive:t,"aria-current":t?"page":!1,"aria-label":`Go to page ${e}`,"data-testid":t?"pagination-current-page":`pagination-page-${e}`,onClick:o(()=>r(e),"onClick"),title:`Go to page ${e}`,children:e},e),"renderPage"),D=o(({currentPage:e,totalPages:t,totalItems:r,itemsPerPage:l=10,onPageChange:g,onItemsPerPageChange:s,showItemsPerPage:n=!1,showItemsInfo:d=!0,itemsPerPageOptions:m=Y,dataTestId:k})=>{const w=t,x=e===w,b=e===P,{pages:O,shouldRenderFirstPage:A,shouldRenderLastPage:M,shouldRenderLeftEllipsis:$,shouldRenderRightEllipsis:B}=ae(e,t),q=(e-P)*l,z=Math.max(0,(r??0)-q),H=Math.min(l,z),J=n||d&&r!==void 0,c=p.useCallback(i=>{i!==e&&i>=P&&i<=t&&g(i)},[e,t,g]),K=p.useCallback(i=>{s==null||s(Number(i))},[s]);return a.jsxs(U,{"data-testid":k??"pagination",children:[J?a.jsxs(V,{children:[n?a.jsx(X,{children:a.jsx(C,{dataTestId:"pagination-items-per-page",fill:"contrast",isFloatingLabel:!1,label:"",onChange:K,placeholder:"Items per page",scale:"compact",value:l.toString(),children:m.map((i,L)=>a.jsxs(C.Option,{index:L,value:i.toString(),children:[i," per page"]},i))})}):null,d&&r!==void 0?a.jsxs(Z,{"data-testid":"pagination-items-info",children:["Showing ",a.jsx("strong",{children:H})," of"," ",a.jsx("strong",{children:r})," entries"]}):null]}):null,a.jsxs(ee,{children:[a.jsx(u,{ariaLabel:"Go to first page",icon:"first_page",isDisabled:b,onClick:c,targetPage:P,testId:"pagination-first-page",tooltipLabel:"First page"}),a.jsx(u,{ariaLabel:"Go to previous page",icon:"chevron_left",isDisabled:b,onClick:c,targetPage:e-1,testId:"pagination-previous-page",tooltipLabel:"Previous page"}),A?S(P,b,c):null,$?a.jsx(v,{"data-testid":"pagination-ellipsis",children:"..."},"ellipsis-left"):null,O.map(i=>S(i,i===e,c)),B?a.jsx(v,{"data-testid":"pagination-ellipsis",children:"..."},"ellipsis-right"):null,M?S(w,x,c):null,a.jsx(u,{ariaLabel:"Go to next page",icon:"chevron_right",isDisabled:x,onClick:c,targetPage:e+1,testId:"pagination-next-page",tooltipLabel:"Next page"}),a.jsx(u,{ariaLabel:"Go to last page",icon:"last_page",isDisabled:x,onClick:c,targetPage:t,testId:"pagination-last-page",tooltipLabel:"Last page"})]})]})},"Pagination"),j=o(e=>{const[t,r]=p.useState(e.currentPage||1),[l,g]=p.useState(e.itemsPerPage);return p.useEffect(()=>{g(e.itemsPerPage)},[e.itemsPerPage]),a.jsx("div",{style:{padding:"40px",width:"100%"},children:a.jsx(D,{...e,currentPage:t,itemsPerPage:l,onItemsPerPageChange:o(s=>{var n;g(s),r(1),(n=e.onItemsPerPageChange)==null||n.call(e,s)},"onItemsPerPageChange"),onPageChange:o(s=>{var n;r(s),(n=e.onPageChange)==null||n.call(e,s)},"onPageChange")})})},"PaginationWrapper"),ve={title:"Data Display/Pagination",component:D,parameters:{docs:{source:{code:`
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
          );`,language:"tsx"}}},argTypes:{totalPages:{control:{type:"number",min:1,max:100}},totalItems:{control:{type:"number",min:0,max:1e3}},itemsPerPage:{control:{type:"number",min:1,max:100}},showItemsPerPage:{control:"boolean"},showItemsInfo:{control:"boolean"}}},h={render:o(e=>a.jsx(j,{...e}),"render"),args:{totalPages:10,totalItems:98,itemsPerPage:10,showItemsPerPage:!1,showItemsInfo:!1}},f={render:o(e=>a.jsx(j,{...e}),"render"),args:{totalPages:10,totalItems:200,itemsPerPage:20,showItemsPerPage:!0,showItemsInfo:!0,itemsPerPageOptions:[10,20,50,100]}},I={render:o(e=>a.jsx(j,{...e}),"render"),args:{totalPages:5,totalItems:50,itemsPerPage:10,showItemsPerPage:!1,showItemsInfo:!1}};var y,E,R;h.parameters={...h.parameters,docs:{...(y=h.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 10,
    totalItems: 98,
    itemsPerPage: 10,
    showItemsPerPage: false,
    showItemsInfo: false
  }
}`,...(R=(E=h.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};var _,T,F;f.parameters={...f.parameters,docs:{...(_=f.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 10,
    totalItems: 200,
    itemsPerPage: 20,
    showItemsPerPage: true,
    showItemsInfo: true,
    itemsPerPageOptions: [10, 20, 50, 100]
  }
}`,...(F=(T=f.parameters)==null?void 0:T.docs)==null?void 0:F.source}}};var G,N,W;I.parameters={...I.parameters,docs:{...(G=I.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 5,
    totalItems: 50,
    itemsPerPage: 10,
    showItemsPerPage: false,
    showItemsInfo: false
  }
}`,...(W=(N=I.parameters)==null?void 0:N.docs)==null?void 0:W.source}}};const ye=["Default","WithItemsPerPage","FewPages"];export{h as Default,I as FewPages,f as WithItemsPerPage,ye as __namedExportsOrder,ve as default};
