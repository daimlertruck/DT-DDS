import{j as i}from"./jsx-runtime-CB_V9I5Y.js";import{B as E}from"./index-CWvrgZ1b.js";import"./index-BV8q0bTk.js";import"./index-Chw7jkxo.js";import"./index-XjDa9cP3.js";import{r as s}from"./index-CTjT7uj6.js";import{u as I}from"./useDebounceResize-HZgoYJGE.js";import{I as x}from"./Icon-DG6KDu5A.js";import{I as $}from"./IconButton-C_mszqXk.js";import{f as y,d as R}from"./emotion-styled.browser.esm-DBghOYGd.js";const C=y.button`
  border: none;
  display: flex;
  align-items: center;

  ${({theme:t,active:o,disabled:n,variant:l})=>`
    ${o?t.fontStyles.bodyMdBold:t.fontStyles.bodyMdRegular}
    ${l==="default"?`
          background-color: transparent;
          ${o?`border-bottom: 2px solid ${t.palette.accent.default};`:""}
          `:`
          background-color: ${o?t.palette.surface.contrast:"transparent"};`}
    
    color: ${n?t.palette.content.light:t.palette.accent.default};
    padding: ${t.spacing.spacing_40} ${t.spacing.s};
    cursor: ${o?"default":n?"not-allowed":"pointer"};
    white-space: nowrap;
    gap: ${t.spacing.spacing_30};
    
    ${!o&&!n&&`
        &:hover {
          background-color: ${t.palette.accent.light};
        }        
      `}
  `}
`,L=({activeTab:t,dataTestId:o,isDisabled:n,index:l,variant:f,label:p,icon:e,handleChange:m})=>{const r=s.useRef(null),g=()=>{if(!r||!r.current||!r.current.parentElement)return;const d=r.current.getBoundingClientRect(),u=r.current.parentElement.getBoundingClientRect();d.left<u.left&&r.current.parentElement.scroll({left:r.current.parentElement.scrollLeft-(u.left-d.left),behavior:"smooth"}),u.right<d.right&&r.current.parentElement.scroll({left:r.current.parentElement.scrollLeft+(d.right-u.right),behavior:"smooth"}),m(l)};return i.jsxs(C,{active:t===l,"data-testid":o||`tab-item-${l}`,disabled:n,onClick:g,ref:r,role:"tab",tabIndex:t===l?0:-1,variant:f,children:[e,p]})},O=y.div`
  ${({variant:t})=>`
    display: flex;
    flex-direction: row;
    overflow: hidden;
    width: 100%;
    ${t==="default"&&"margin-bottom: -1px;"}
  `};
`,w=120,j=.5,k=({children:t,style:o,activeTab:n,dataTestId:l="tabs",variant:f="default",handleChange:p})=>{const e=s.useRef(null),[m,r]=s.useState(!1),[g,d]=s.useState(!1),u=R(),S=s.useMemo(()=>s.Children.map(t,(c,a)=>c&&s.cloneElement(c,{...c.props,activeTab:n,variant:f,index:a,handleChange:p})),[t,n,f,p]),h=c=>{if(!e||!e.current)return;const a=e.current.scrollLeft+c;e.current.scroll({left:a,behavior:"smooth"}),b(a)},b=c=>{if(!e||!e.current)return;const a=c??e.current.scrollLeft;r(a>0),d(e.current.clientWidth+a+j<e.current.scrollWidth)};return s.useEffect(()=>b(),[]),I(()=>b()),i.jsxs(E,{style:{flexDirection:"row",...f==="default"&&{borderBottom:`1px solid ${u.palette.border.default}`}},children:[i.jsx($,{onClick:()=>h(-w),children:i.jsx(x,{code:"keyboard_arrow_left",dataTestId:"left-arrow",style:{...!m&&{display:"none"}}})}),i.jsx(O,{"data-testid":l,ref:e,role:"tablist",style:o,variant:f,children:S}),i.jsx($,{onClick:()=>h(w),children:i.jsx(x,{code:"keyboard_arrow_right",dataTestId:"right-arrow",style:{...!g&&{display:"none"}}})})]})};k.Item=L;export{k as T};
