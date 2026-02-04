var M=Object.defineProperty;var n=(e,s)=>M(e,"name",{value:s,configurable:!0});import{j as a}from"./jsx-runtime-Cgz2XvFB.js";import{r as g}from"./index-CwbBKW39.js";import{S as j}from"./Select-BxrlMbfq.js";import{P as H,I as U,a as Y,b as q,c as z,N as J,d as p,F as P,T as K,e as Q}from"./PaginationNavButton-DvS3g32I.js";import"./emotion-styled.browser.esm-CIRWz9XU.js";import"./index-DTgA8jos.js";import"./Icon-9dVURh2l.js";import"./IconButton-a7wLVv3Y.js";import"./LabelField-BrIM5Qam.js";import"./Typography-Dk4smw7A.js";import"./typography-B3nKKPHm.js";import"./index-Cf7F2iyz.js";import"./Tooltip-BAyLv02p.js";import"./index-BvbYvY7A.js";import"./emotion-react.browser.esm-BzOLYAw5.js";import"./index-6Tx4pmSd.js";import"./iframe-CSdn3PpY.js";import"./z-index-C44GOntP.js";import"./index-DV-VXEUn.js";import"./Dropdown-Bf15JoXl.js";import"./useClickOutside-Cp2kQToC.js";import"./Checkbox-1WqW39vQ.js";const V=5,X=3,Z=2,w=1,ee=n((e,s)=>{if(s<=V)return Array.from({length:s},(m,i)=>i+1);const r=e>X,o=e<s-Z;return!r&&o?[1,2,3,"ellipsis",s]:r&&!o?[1,"ellipsis",s-2,s-1,s]:[1,"ellipsis",e-w,e,e+w,"ellipsis",s]},"getPageNumbers"),D=n(({currentPage:e,totalPages:s,totalItems:r,itemsPerPage:o=10,onPageChange:m,onItemsPerPageChange:i,showItemsPerPage:l=!1,showItemsInfo:f=!0,itemsPerPageOptions:G=q,dataTestId:F})=>{const W=g.useMemo(()=>ee(e,s),[e,s]),x=e===P,b=e===s,A=(e-P)*o,R=Math.max(0,(r??0)-A),k=Math.min(o,R),B=l||f&&r!==void 0,c=g.useCallback(t=>{t!==e&&t>=P&&t<=s&&m(t)},[e,s,m]),$=g.useCallback(t=>{i==null||i(Number(t))},[i]);return a.jsxs(H,{"data-testid":F??"pagination",children:[B?a.jsxs(U,{children:[l?a.jsx(Y,{children:a.jsx(j,{dataTestId:"pagination-items-per-page",fill:"contrast",isFloatingLabel:!1,label:"",onChange:$,placeholder:"Items per page",scale:"compact",value:o.toString(),children:G.map((t,S)=>a.jsxs(j.Option,{index:S,value:t.toString(),children:[t," per page"]},t))})}):null,f&&r!==void 0?a.jsxs(z,{"data-testid":"pagination-items-info",children:["Showing ",a.jsx("strong",{children:k})," of"," ",a.jsx("strong",{children:r})," entries"]}):null]}):null,a.jsxs(J,{children:[a.jsx(p,{ariaLabel:"Go to first page",icon:"first_page",isDisabled:x,onClick:c,targetPage:P,testId:"pagination-first-page",tooltipLabel:"First page"}),a.jsx(p,{ariaLabel:"Go to previous page",icon:"chevron_left",isDisabled:x,onClick:c,targetPage:e-1,testId:"pagination-previous-page",tooltipLabel:"Previous page"}),W.map(t=>t==="ellipsis"?a.jsx(K,{"data-testid":"pagination-ellipsis",children:"..."},`ellipsis-${t}`):a.jsx(Q,{$isActive:t===e,"aria-current":t===e?"page":void 0,"aria-label":`Go to page ${t}`,"data-testid":t===e?"pagination-current-page":`pagination-page-${t}`,onClick:n(()=>c(t),"onClick"),title:`Go to page ${t}`,children:t},t)),a.jsx(p,{ariaLabel:"Go to next page",icon:"chevron_right",isDisabled:b,onClick:c,targetPage:e+1,testId:"pagination-next-page",tooltipLabel:"Next page"}),a.jsx(p,{ariaLabel:"Go to last page",icon:"last_page",isDisabled:b,onClick:c,targetPage:s,testId:"pagination-last-page",tooltipLabel:"Last page"})]})]})},"Pagination"),h=n(e=>{const[s,r]=g.useState(e.currentPage||1),[o,m]=g.useState(e.itemsPerPage);return g.useEffect(()=>{m(e.itemsPerPage)},[e.itemsPerPage]),a.jsx("div",{style:{padding:"40px",width:"100%"},children:a.jsx(D,{...e,currentPage:s,itemsPerPage:o,onItemsPerPageChange:n(i=>{var l;m(i),r(1),(l=e.onItemsPerPageChange)==null||l.call(e,i)},"onItemsPerPageChange"),onPageChange:n(i=>{var l;r(i),(l=e.onPageChange)==null||l.call(e,i)},"onPageChange")})})},"PaginationWrapper"),Te={title:"Data Display/Pagination",component:D,parameters:{docs:{source:{code:`
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
          );`,language:"tsx"}}},argTypes:{totalPages:{control:{type:"number",min:1,max:100}},totalItems:{control:{type:"number",min:0,max:1e3}},itemsPerPage:{control:{type:"number",min:1,max:100}},showItemsPerPage:{control:"boolean"},showItemsInfo:{control:"boolean"}}},d={render:n(e=>a.jsx(h,{...e}),"render"),args:{totalPages:10,totalItems:98,itemsPerPage:10,showItemsPerPage:!1,showItemsInfo:!1}},u={render:n(e=>a.jsx(h,{...e}),"render"),args:{totalPages:10,totalItems:200,itemsPerPage:20,showItemsPerPage:!0,showItemsInfo:!0,itemsPerPageOptions:[10,20,50,100]}},I={render:n(e=>a.jsx(h,{...e}),"render"),args:{totalPages:5,totalItems:50,itemsPerPage:10,showItemsPerPage:!1,showItemsInfo:!1}};var T,C,N;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 10,
    totalItems: 98,
    itemsPerPage: 10,
    showItemsPerPage: false,
    showItemsInfo: false
  }
}`,...(N=(C=d.parameters)==null?void 0:C.docs)==null?void 0:N.source}}};var _,v,y;u.parameters={...u.parameters,docs:{...(_=u.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 10,
    totalItems: 200,
    itemsPerPage: 20,
    showItemsPerPage: true,
    showItemsInfo: true,
    itemsPerPageOptions: [10, 20, 50, 100]
  }
}`,...(y=(v=u.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var E,L,O;I.parameters={...I.parameters,docs:{...(E=I.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 5,
    totalItems: 50,
    itemsPerPage: 10,
    showItemsPerPage: false,
    showItemsInfo: false
  }
}`,...(O=(L=I.parameters)==null?void 0:L.docs)==null?void 0:O.source}}};const Ce=["Default","WithItemsPerPage","FewPages"];export{d as Default,I as FewPages,u as WithItemsPerPage,Ce as __namedExportsOrder,Te as default};
