var M=Object.defineProperty;var i=(e,s)=>M(e,"name",{value:s,configurable:!0});import{j as a}from"./jsx-runtime-Cgz2XvFB.js";import{r as g}from"./index-CwbBKW39.js";import{S as w}from"./Select-Dwynw1B7.js";import{P as H,I as U,a as Y,b as q,c as z,N as J,d as P,F as d,T as K,e as Q}from"./PaginationNavButton-b8A6p8JC.js";import"./emotion-styled.browser.esm-CIRWz9XU.js";import"./index-DTgA8jos.js";import"./Icon-BWIy_dZb.js";import"./IconButton-DqfnmDe3.js";import"./LabelField-nCy-PARe.js";import"./Typography-Dk4smw7A.js";import"./typography-B3nKKPHm.js";import"./index-Xf3VWcnb.js";import"./Tooltip-Dk46u24W.js";import"./index-BHjxGwFK.js";import"./emotion-react.browser.esm-BzOLYAw5.js";import"./index-6Tx4pmSd.js";import"./iframe-DIkK8Q3-.js";import"./z-index-C44GOntP.js";import"./index-DV-VXEUn.js";import"./Dropdown-Cw5UahBF.js";import"./useClickOutside-Cp2kQToC.js";import"./Checkbox-B_1hryc3.js";const V=5,X=3,Z=2,C=1,ee=i((e,s)=>{if(s<=V)return Array.from({length:s},(m,r)=>r+1);const n=e>X,o=e<s-Z;return!n&&o?[1,2,3,"ellipsis",s]:n&&!o?[1,"ellipsis",s-2,s-1,s]:[1,"ellipsis",e-C,e,e+C,"ellipsis",s]},"getPageNumbers"),G=i(({currentPage:e,totalPages:s,totalItems:n,itemsPerPage:o=10,onPageChange:m,onItemsPerPageChange:r,showItemsPerPage:l=!1,showItemsInfo:x=!0,itemsPerPageOptions:F=q,dataTestId:W})=>{const A=g.useMemo(()=>ee(e,s),[e,s]),b=e===d,S=e===s,R=(e-d)*o,k=Math.max(0,(n??0)-R),$=Math.min(o,k),j=l===x,c=g.useCallback(t=>{t!==e&&t>=d&&t<=s&&m(t)},[e,s,m]),B=g.useCallback(t=>{r==null||r(Number(t))},[r]);return a.jsxs(H,{$shouldCenterItems:j,"data-testid":W??"pagination",children:[a.jsxs(U,{$shouldCenterItems:j,children:[l?a.jsx(Y,{children:a.jsx(w,{dataTestId:"pagination-items-per-page",fill:"contrast",isFloatingLabel:!1,label:"",onChange:B,placeholder:"Items per page",scale:"compact",value:o.toString(),children:F.map((t,p)=>a.jsxs(w.Option,{index:p,value:t.toString(),children:[t," per page"]},t))})}):null,x&&n!==void 0?a.jsxs(z,{"data-testid":"pagination-items-info",children:["Showing ",a.jsx("strong",{children:$})," of"," ",a.jsx("strong",{children:n})," entries"]}):null]}),a.jsxs(J,{children:[a.jsx(P,{ariaLabel:"Go to first page",icon:"first_page",isDisabled:b,onClick:c,targetPage:d,testId:"pagination-first-page",tooltipLabel:"First page"}),a.jsx(P,{ariaLabel:"Go to previous page",icon:"chevron_left",isDisabled:b,onClick:c,targetPage:e-1,testId:"pagination-previous-page",tooltipLabel:"Previous page"}),A.map((t,p)=>t==="ellipsis"?a.jsx(K,{"data-testid":"pagination-ellipsis",children:"..."},`ellipsis-${p}`):a.jsx(Q,{$isActive:t===e,"aria-current":t===e?"page":void 0,"aria-label":`Go to page ${t}`,"data-testid":`pagination-page-${t}`,onClick:i(()=>c(t),"onClick"),title:`Go to page ${t}`,children:t},t)),a.jsx(P,{ariaLabel:"Go to next page",icon:"chevron_right",isDisabled:S,onClick:c,targetPage:e+1,testId:"pagination-next-page",tooltipLabel:"Next page"}),a.jsx(P,{ariaLabel:"Go to last page",icon:"last_page",isDisabled:S,onClick:c,targetPage:s,testId:"pagination-last-page",tooltipLabel:"Last page"})]})]})},"Pagination"),f=i(e=>{const[s,n]=g.useState(e.currentPage||1),[o,m]=g.useState(e.itemsPerPage);return g.useEffect(()=>{m(e.itemsPerPage)},[e.itemsPerPage]),a.jsx("div",{style:{padding:"40px",width:"100%"},children:a.jsx(G,{...e,currentPage:s,itemsPerPage:o,onItemsPerPageChange:i(r=>{var l;m(r),n(1),(l=e.onItemsPerPageChange)==null||l.call(e,r)},"onItemsPerPageChange"),onPageChange:i(r=>{var l;n(r),(l=e.onPageChange)==null||l.call(e,r)},"onPageChange")})})},"PaginationWrapper"),Ce={title:"Data Display/Pagination",component:G,parameters:{docs:{source:{code:`
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
          );`,language:"tsx"}}},argTypes:{totalPages:{control:{type:"number",min:1,max:100}},totalItems:{control:{type:"number",min:0,max:1e3}},itemsPerPage:{control:{type:"number",min:1,max:100}},showItemsPerPage:{control:"boolean"},showItemsInfo:{control:"boolean"}}},u={render:i(e=>a.jsx(f,{...e}),"render"),args:{totalPages:10,totalItems:98,itemsPerPage:10,showItemsPerPage:!1,showItemsInfo:!1}},I={render:i(e=>a.jsx(f,{...e}),"render"),args:{totalPages:10,totalItems:200,itemsPerPage:20,showItemsPerPage:!0,showItemsInfo:!0,itemsPerPageOptions:[10,20,50,100]}},h={render:i(e=>a.jsx(f,{...e}),"render"),args:{totalPages:5,totalItems:50,itemsPerPage:10,showItemsPerPage:!1,showItemsInfo:!1}};var T,N,_;u.parameters={...u.parameters,docs:{...(T=u.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 10,
    totalItems: 98,
    itemsPerPage: 10,
    showItemsPerPage: false,
    showItemsInfo: false
  }
}`,...(_=(N=u.parameters)==null?void 0:N.docs)==null?void 0:_.source}}};var y,E,v;I.parameters={...I.parameters,docs:{...(y=I.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 10,
    totalItems: 200,
    itemsPerPage: 20,
    showItemsPerPage: true,
    showItemsInfo: true,
    itemsPerPageOptions: [10, 20, 50, 100]
  }
}`,...(v=(E=I.parameters)==null?void 0:E.docs)==null?void 0:v.source}}};var L,O,D;h.parameters={...h.parameters,docs:{...(L=h.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 5,
    totalItems: 50,
    itemsPerPage: 10,
    showItemsPerPage: false,
    showItemsInfo: false
  }
}`,...(D=(O=h.parameters)==null?void 0:O.docs)==null?void 0:D.source}}};const Te=["Default","WithItemsPerPage","FewPages"];export{u as Default,h as FewPages,I as WithItemsPerPage,Te as __namedExportsOrder,Ce as default};
