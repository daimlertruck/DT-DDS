var z=Object.defineProperty;var r=(e,s)=>z(e,"name",{value:s,configurable:!0});import{j as a}from"./jsx-runtime-Cgz2XvFB.js";import{r as h}from"./index-CwbBKW39.js";import{I as Y}from"./Icon-BWIy_dZb.js";import{S}from"./Select-BwPhhM8L.js";import{T}from"./Tooltip-CpYg2SlN.js";import{P as q,I as J,a as K,b as Q,c as V,N as X,T as Z,d as ee,F as p,e as te}from"./Pagination.styled-C4saWEH0.js";import"./emotion-styled.browser.esm-CIRWz9XU.js";import"./index-DTgA8jos.js";import"./IconButton-DqfnmDe3.js";import"./LabelField-nCy-PARe.js";import"./Typography-Dk4smw7A.js";import"./typography-B3nKKPHm.js";import"./index-Xf3VWcnb.js";import"./Dropdown-Dcfry-eH.js";import"./index-BRBTOvg-.js";import"./emotion-react.browser.esm-BzOLYAw5.js";import"./index-6Tx4pmSd.js";import"./iframe-DKcXGJ5A.js";import"./z-index-C44GOntP.js";import"./index-DV-VXEUn.js";import"./useClickOutside-Cp2kQToC.js";import"./Checkbox-B_1hryc3.js";const ae=5,se=3,re=2,_=1,ne=r((e,s)=>{if(s<=ae)return Array.from({length:s},(m,n)=>n+1);const i=e>se,o=e<s-re;return!i&&o?[1,2,3,"ellipsis",s]:i&&!o?[1,"ellipsis",s-2,s-1,s]:[1,"ellipsis",e-_,e,e+_,"ellipsis",s]},"getPageNumbers"),W=r(({currentPage:e,totalPages:s,totalItems:i,itemsPerPage:o=10,onPageChange:m,onItemsPerPageChange:n,showItemsPerPage:l=!1,showItemsInfo:y=!0,itemsPerPageOptions:A=Q,dataTestId:R})=>{const B=h.useMemo(()=>ne(e,s),[e,s]),f=e===p,x=e===s,b=r(t=>{t!==e&&t>=p&&t<=s&&m(t)},"handlePageChange"),$=r(t=>{n==null||n(Number(t))},"handleItemsPerPageChange"),M=i?Math.min(o,Math.max(0,i-(e-p)*o)):0,c=r(({ariaLabel:t,tooltipLabel:g,icon:k,targetPage:H,isDisabled:j,testId:U})=>{const w=a.jsx(te,{"aria-label":t,"data-testid":U,disabled:j,onClick:r(()=>b(H),"onClick"),children:a.jsx(Y,{code:k,size:"small"})});return j?w:a.jsxs(T,{children:[w,a.jsx(T.Content,{background:"full",direction:"top",children:g})]})},"renderNavButton");return a.jsxs(q,{"data-testid":R??"pagination",children:[a.jsxs(J,{children:[l?a.jsx(K,{children:a.jsx(S,{dataTestId:"pagination-items-per-page",fill:"contrast",isFloatingLabel:!1,label:"",onChange:$,placeholder:"Items per page",scale:"compact",value:o.toString(),children:A.map((t,g)=>a.jsxs(S.Option,{index:g,value:t.toString(),children:[t," per page"]},t))})}):null,y&&i!==void 0?a.jsxs(V,{"data-testid":"pagination-items-info",children:["Showing ",a.jsx("strong",{children:M})," of"," ",a.jsx("strong",{children:i})," entries"]}):null]}),a.jsxs(X,{children:[c({ariaLabel:"Go to first page",tooltipLabel:"First page",icon:"first_page",targetPage:p,isDisabled:f,testId:"pagination-first-page"}),c({ariaLabel:"Go to previous page",tooltipLabel:"Previous page",icon:"chevron_left",targetPage:e-1,isDisabled:f,testId:"pagination-previous-page"}),B.map((t,g)=>t==="ellipsis"?a.jsx(Z,{"data-testid":"pagination-ellipsis",children:"..."},`ellipsis-${g}`):a.jsx(ee,{$isActive:t===e,"aria-current":t===e?"page":void 0,"aria-label":`Go to page ${t}`,"data-testid":`pagination-page-${t}`,onClick:r(()=>b(t),"onClick"),title:`Go to page ${t}`,children:t},t)),c({ariaLabel:"Go to next page",tooltipLabel:"Next page",icon:"chevron_right",targetPage:e+1,isDisabled:x,testId:"pagination-next-page"}),c({ariaLabel:"Go to last page",tooltipLabel:"Last page",icon:"last_page",targetPage:s,isDisabled:x,testId:"pagination-last-page"})]})]})},"Pagination"),I=r(e=>{const[s,i]=h.useState(e.currentPage||1),[o,m]=h.useState(e.itemsPerPage);return h.useEffect(()=>{m(e.itemsPerPage)},[e.itemsPerPage]),a.jsx("div",{style:{padding:"40px",width:"100%"},children:a.jsx(W,{...e,currentPage:s,itemsPerPage:o,onItemsPerPageChange:r(n=>{var l;m(n),i(1),(l=e.onItemsPerPageChange)==null||l.call(e,n)},"onItemsPerPageChange"),onPageChange:r(n=>{var l;i(n),(l=e.onPageChange)==null||l.call(e,n)},"onPageChange")})})},"PaginationWrapper"),Le={title:"Data Display/Pagination",component:W,parameters:{docs:{source:{code:`
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
          );`,language:"tsx"}}},argTypes:{totalPages:{control:{type:"number",min:1,max:100}},totalItems:{control:{type:"number",min:0,max:1e3}},itemsPerPage:{control:{type:"number",min:1,max:100}},showItemsPerPage:{control:"boolean"},showItemsInfo:{control:"boolean"}}},P={render:r(e=>a.jsx(I,{...e}),"render"),args:{totalPages:10,totalItems:98,itemsPerPage:10,showItemsPerPage:!1,showItemsInfo:!1}},d={render:r(e=>a.jsx(I,{...e}),"render"),args:{totalPages:10,totalItems:200,itemsPerPage:20,showItemsPerPage:!0,showItemsInfo:!0,itemsPerPageOptions:[10,20,50,100]}},u={render:r(e=>a.jsx(I,{...e}),"render"),args:{totalPages:5,totalItems:50,itemsPerPage:10,showItemsPerPage:!1,showItemsInfo:!1}};var E,N,C;P.parameters={...P.parameters,docs:{...(E=P.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 10,
    totalItems: 98,
    itemsPerPage: 10,
    showItemsPerPage: false,
    showItemsInfo: false
  }
}`,...(C=(N=P.parameters)==null?void 0:N.docs)==null?void 0:C.source}}};var L,O,v;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 10,
    totalItems: 200,
    itemsPerPage: 20,
    showItemsPerPage: true,
    showItemsInfo: true,
    itemsPerPageOptions: [10, 20, 50, 100]
  }
}`,...(v=(O=d.parameters)==null?void 0:O.docs)==null?void 0:v.source}}};var D,G,F;u.parameters={...u.parameters,docs:{...(D=u.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: args => <PaginationWrapper {...args} />,
  args: {
    totalPages: 5,
    totalItems: 50,
    itemsPerPage: 10,
    showItemsPerPage: false,
    showItemsInfo: false
  }
}`,...(F=(G=u.parameters)==null?void 0:G.docs)==null?void 0:F.source}}};const Oe=["Default","WithItemsPerPage","FewPages"];export{P as Default,u as FewPages,d as WithItemsPerPage,Oe as __namedExportsOrder,Le as default};
