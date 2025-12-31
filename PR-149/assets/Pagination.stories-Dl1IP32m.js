var q=Object.defineProperty;var r=(e,s)=>q(e,"name",{value:s,configurable:!0});import{j as a}from"./jsx-runtime-Cgz2XvFB.js";import{r as h}from"./index-CwbBKW39.js";import{I as H}from"./Icon-BWIy_dZb.js";import{S}from"./Select-D62uEqYx.js";import{T as C}from"./Tooltip-DfXYNQrq.js";import{P as J,I as K,a as Q,b as U,c as V,N as X,T as Y,d as Z,F as p,e as ee}from"./Pagination.styled-C3NCKHC3.js";import"./emotion-styled.browser.esm-CIRWz9XU.js";import"./index-DTgA8jos.js";import"./IconButton-DqfnmDe3.js";import"./LabelField-nCy-PARe.js";import"./Typography-Dk4smw7A.js";import"./typography-B3nKKPHm.js";import"./index-Xf3VWcnb.js";import"./Dropdown-DTQEusS9.js";import"./index-BURRiCv_.js";import"./emotion-react.browser.esm-BzOLYAw5.js";import"./index-6Tx4pmSd.js";import"./iframe-Dm1odT7V.js";import"./z-index-C44GOntP.js";import"./index-DV-VXEUn.js";import"./useClickOutside-Cp2kQToC.js";import"./Checkbox-B_1hryc3.js";const te=r((e,s)=>{if(s<=5)return Array.from({length:s},(m,i)=>i+1);const n=e>3,o=e<s-2;return!n&&o?[1,2,3,"ellipsis",s]:n&&!o?[1,"ellipsis",s-2,s-1,s]:[1,"ellipsis",e-1,e,e+1,"ellipsis",s]},"getPageNumbers"),D=r(({currentPage:e,totalPages:s,totalItems:n,itemsPerPage:o=10,onPageChange:m,onItemsPerPageChange:i,showItemsPerPage:l=!1,showItemsInfo:F=!0,itemsPerPageOptions:O=U,dataTestId:$})=>{const A=h.useMemo(()=>te(e,s),[e,s]),f=e===p,x=e===s,b=r(t=>{t!==e&&t>=p&&t<=s&&m(t)},"handlePageChange"),M=r(t=>{i==null||i(Number(t))},"handleItemsPerPageChange"),R=n?Math.min(o,Math.max(0,n-(e-p)*o)):0,c=r(({ariaLabel:t,tooltipLabel:g,icon:k,targetPage:B,isDisabled:j,testId:z})=>{const w=a.jsx(ee,{"aria-label":t,"data-testid":z,disabled:j,onClick:r(()=>b(B),"onClick"),children:a.jsx(H,{code:k,size:"small"})});return j?w:a.jsxs(C,{children:[w,a.jsx(C.Content,{background:"full",direction:"top",children:g})]})},"renderNavButton");return a.jsxs(J,{"data-testid":$??"pagination",children:[a.jsxs(K,{children:[l?a.jsx(Q,{children:a.jsx(S,{dataTestId:"pagination-items-per-page",fill:"contrast",isFloatingLabel:!1,label:"",onChange:M,placeholder:"Items per page",scale:"compact",value:o.toString(),children:O.map((t,g)=>a.jsxs(S.Option,{index:g,value:t.toString(),children:[t," per page"]},t))})}):null,F&&n!==void 0?a.jsxs(V,{"data-testid":"pagination-items-info",children:["Showing ",a.jsx("strong",{children:R})," of"," ",a.jsx("strong",{children:n})," entries"]}):null]}),a.jsxs(X,{children:[c({ariaLabel:"Go to first page",tooltipLabel:"First page",icon:"first_page",targetPage:p,isDisabled:f,testId:"pagination-first-page"}),c({ariaLabel:"Go to previous page",tooltipLabel:"Previous page",icon:"chevron_left",targetPage:e-1,isDisabled:f,testId:"pagination-previous-page"}),A.map((t,g)=>t==="ellipsis"?a.jsx(Y,{"data-testid":"pagination-ellipsis",children:"..."},`ellipsis-${g}`):a.jsx(Z,{$isActive:t===e,"aria-current":t===e?"page":void 0,"aria-label":`Go to page ${t}`,"data-testid":`pagination-page-${t}`,onClick:r(()=>b(t),"onClick"),title:`Go to page ${t}`,children:t},t)),c({ariaLabel:"Go to next page",tooltipLabel:"Next page",icon:"chevron_right",targetPage:e+1,isDisabled:x,testId:"pagination-next-page"}),c({ariaLabel:"Go to last page",tooltipLabel:"Last page",icon:"last_page",targetPage:s,isDisabled:x,testId:"pagination-last-page"})]})]})},"Pagination"),I=r(e=>{const[s,n]=h.useState(e.currentPage||1),[o,m]=h.useState(e.itemsPerPage);return h.useEffect(()=>{m(e.itemsPerPage)},[e.itemsPerPage]),a.jsx("div",{style:{padding:"40px",width:"100%"},children:a.jsx(D,{...e,currentPage:s,itemsPerPage:o,onItemsPerPageChange:r(i=>{var l;m(i),n(1),(l=e.onItemsPerPageChange)==null||l.call(e,i)},"onItemsPerPageChange"),onPageChange:r(i=>{var l;n(i),(l=e.onPageChange)==null||l.call(e,i)},"onPageChange")})})},"PaginationWrapper"),Le={title:"Data Display/Pagination",component:D,parameters:{docs:{source:{code:`
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
          );`,language:"tsx"}}},argTypes:{totalPages:{control:{type:"number",min:1,max:100}},totalItems:{control:{type:"number",min:0,max:1e3}},itemsPerPage:{control:{type:"number",min:1,max:100}},showItemsPerPage:{control:"boolean"},showItemsInfo:{control:"boolean"}}},P={render:r(e=>a.jsx(I,{...e}),"render"),args:{totalPages:10,totalItems:98,itemsPerPage:10,showItemsPerPage:!1,showItemsInfo:!1}},d={render:r(e=>a.jsx(I,{...e}),"render"),args:{totalPages:10,totalItems:200,itemsPerPage:20,showItemsPerPage:!0,showItemsInfo:!0,itemsPerPageOptions:[10,20,50,100]}},u={render:r(e=>a.jsx(I,{...e}),"render"),args:{totalPages:5,totalItems:50,itemsPerPage:10,showItemsPerPage:!1,showItemsInfo:!1}};var L,v,T;P.parameters={...P.parameters,docs:{...(L=P.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 10,
    totalItems: 98,
    itemsPerPage: 10,
    showItemsPerPage: false,
    showItemsInfo: false
  }
}`,...(T=(v=P.parameters)==null?void 0:v.docs)==null?void 0:T.source}}};var _,E,W;d.parameters={...d.parameters,docs:{...(_=d.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 10,
    totalItems: 200,
    itemsPerPage: 20,
    showItemsPerPage: true,
    showItemsInfo: true,
    itemsPerPageOptions: [10, 20, 50, 100]
  }
}`,...(W=(E=d.parameters)==null?void 0:E.docs)==null?void 0:W.source}}};var y,G,N;u.parameters={...u.parameters,docs:{...(y=u.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 5,
    totalItems: 50,
    itemsPerPage: 10,
    showItemsPerPage: false,
    showItemsInfo: false
  }
}`,...(N=(G=u.parameters)==null?void 0:G.docs)==null?void 0:N.source}}};const ve=["Default","WithItemsPerPage","FewPages"];export{P as Default,u as FewPages,d as WithItemsPerPage,ve as __namedExportsOrder,Le as default};
