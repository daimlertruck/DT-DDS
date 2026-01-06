var $=Object.defineProperty;var i=(e,s)=>$(e,"name",{value:s,configurable:!0});import{j as a}from"./jsx-runtime-Cgz2XvFB.js";import{r as g}from"./index-CwbBKW39.js";import{S}from"./Select-SeJwTWlc.js";import{P as M,I as H,a as U,b as Y,c as q,N as z,d as p,F as P,T as J,e as K}from"./PaginationNavButton-Brvy8A_j.js";import"./emotion-styled.browser.esm-CIRWz9XU.js";import"./index-DTgA8jos.js";import"./Icon-BWIy_dZb.js";import"./IconButton-DqfnmDe3.js";import"./LabelField-nCy-PARe.js";import"./Typography-Dk4smw7A.js";import"./typography-B3nKKPHm.js";import"./index-Xf3VWcnb.js";import"./Tooltip-C1rV8yVn.js";import"./index-DJD6yi0I.js";import"./emotion-react.browser.esm-BzOLYAw5.js";import"./index-6Tx4pmSd.js";import"./iframe--pX2zBjY.js";import"./z-index-C44GOntP.js";import"./index-DV-VXEUn.js";import"./Dropdown-Gn2FPKol.js";import"./useClickOutside-Cp2kQToC.js";import"./Checkbox-B_1hryc3.js";const Q=5,V=3,X=2,j=1,Z=i((e,s)=>{if(s<=Q)return Array.from({length:s},(m,r)=>r+1);const n=e>V,o=e<s-X;return!n&&o?[1,2,3,"ellipsis",s]:n&&!o?[1,"ellipsis",s-2,s-1,s]:[1,"ellipsis",e-j,e,e+j,"ellipsis",s]},"getPageNumbers"),O=i(({currentPage:e,totalPages:s,totalItems:n,itemsPerPage:o=10,onPageChange:m,onItemsPerPageChange:r,showItemsPerPage:l=!1,showItemsInfo:D=!0,itemsPerPageOptions:G=Y,dataTestId:F})=>{const W=g.useMemo(()=>Z(e,s),[e,s]),f=e===P,x=e===s,A=(e-P)*o,R=Math.max(0,(n??0)-A),k=Math.min(o,R),c=g.useCallback(t=>{t!==e&&t>=P&&t<=s&&m(t)},[e,s,m]),B=g.useCallback(t=>{r==null||r(Number(t))},[r]);return a.jsxs(M,{"data-testid":F??"pagination",children:[a.jsxs(H,{children:[l?a.jsx(U,{children:a.jsx(S,{dataTestId:"pagination-items-per-page",fill:"contrast",isFloatingLabel:!1,label:"",onChange:B,placeholder:"Items per page",scale:"compact",value:o.toString(),children:G.map((t,b)=>a.jsxs(S.Option,{index:b,value:t.toString(),children:[t," per page"]},t))})}):null,D&&n!==void 0?a.jsxs(q,{"data-testid":"pagination-items-info",children:["Showing ",a.jsx("strong",{children:k})," of"," ",a.jsx("strong",{children:n})," entries"]}):null]}),a.jsxs(z,{children:[a.jsx(p,{ariaLabel:"Go to first page",icon:"first_page",isDisabled:f,onClick:c,targetPage:P,testId:"pagination-first-page",tooltipLabel:"First page"}),a.jsx(p,{ariaLabel:"Go to previous page",icon:"chevron_left",isDisabled:f,onClick:c,targetPage:e-1,testId:"pagination-previous-page",tooltipLabel:"Previous page"}),W.map(t=>t==="ellipsis"?a.jsx(J,{"data-testid":"pagination-ellipsis",children:"..."},`ellipsis-${t}`):a.jsx(K,{$isActive:t===e,"aria-current":t===e?"page":void 0,"aria-label":`Go to page ${t}`,"data-testid":`pagination-page-${t}`,onClick:i(()=>c(t),"onClick"),title:`Go to page ${t}`,children:t},t)),a.jsx(p,{ariaLabel:"Go to next page",icon:"chevron_right",isDisabled:x,onClick:c,targetPage:e+1,testId:"pagination-next-page",tooltipLabel:"Next page"}),a.jsx(p,{ariaLabel:"Go to last page",icon:"last_page",isDisabled:x,onClick:c,targetPage:s,testId:"pagination-last-page",tooltipLabel:"Last page"})]})]})},"Pagination"),h=i(e=>{const[s,n]=g.useState(e.currentPage||1),[o,m]=g.useState(e.itemsPerPage);return g.useEffect(()=>{m(e.itemsPerPage)},[e.itemsPerPage]),a.jsx("div",{style:{padding:"40px",width:"100%"},children:a.jsx(O,{...e,currentPage:s,itemsPerPage:o,onItemsPerPageChange:i(r=>{var l;m(r),n(1),(l=e.onItemsPerPageChange)==null||l.call(e,r)},"onItemsPerPageChange"),onPageChange:i(r=>{var l;n(r),(l=e.onPageChange)==null||l.call(e,r)},"onPageChange")})})},"PaginationWrapper"),we={title:"Data Display/Pagination",component:O,parameters:{docs:{source:{code:`
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
          );`,language:"tsx"}}},argTypes:{totalPages:{control:{type:"number",min:1,max:100}},totalItems:{control:{type:"number",min:0,max:1e3}},itemsPerPage:{control:{type:"number",min:1,max:100}},showItemsPerPage:{control:"boolean"},showItemsInfo:{control:"boolean"}}},d={render:i(e=>a.jsx(h,{...e}),"render"),args:{totalPages:10,totalItems:98,itemsPerPage:10,showItemsPerPage:!1,showItemsInfo:!1}},u={render:i(e=>a.jsx(h,{...e}),"render"),args:{totalPages:10,totalItems:200,itemsPerPage:20,showItemsPerPage:!0,showItemsInfo:!0,itemsPerPageOptions:[10,20,50,100]}},I={render:i(e=>a.jsx(h,{...e}),"render"),args:{totalPages:5,totalItems:50,itemsPerPage:10,showItemsPerPage:!1,showItemsInfo:!1}};var w,T,C;d.parameters={...d.parameters,docs:{...(w=d.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 10,
    totalItems: 98,
    itemsPerPage: 10,
    showItemsPerPage: false,
    showItemsInfo: false
  }
}`,...(C=(T=d.parameters)==null?void 0:T.docs)==null?void 0:C.source}}};var N,_,y;u.parameters={...u.parameters,docs:{...(N=u.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 10,
    totalItems: 200,
    itemsPerPage: 20,
    showItemsPerPage: true,
    showItemsInfo: true,
    itemsPerPageOptions: [10, 20, 50, 100]
  }
}`,...(y=(_=u.parameters)==null?void 0:_.docs)==null?void 0:y.source}}};var E,v,L;I.parameters={...I.parameters,docs:{...(E=I.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 5,
    totalItems: 50,
    itemsPerPage: 10,
    showItemsPerPage: false,
    showItemsInfo: false
  }
}`,...(L=(v=I.parameters)==null?void 0:v.docs)==null?void 0:L.source}}};const Te=["Default","WithItemsPerPage","FewPages"];export{d as Default,I as FewPages,u as WithItemsPerPage,Te as __namedExportsOrder,we as default};
