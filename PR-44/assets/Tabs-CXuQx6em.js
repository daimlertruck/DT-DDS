import{j as i}from"./jsx-runtime-DMAvRu52.js";import{B as S}from"./index-DSuwS0lG.js";import"./index-DjiMWOYD.js";import"./index-Bhxytf7L.js";import"./index-DCrStp1_.js";import{r as s}from"./index-Dl6G-zuu.js";import{u as E}from"./useDebounceResize-DUnZ0ZdP.js";import{I as w}from"./Icon-87Ryblgq.js";import{I as x}from"./IconButton-8pEMAeo8.js";import{n as $,d as I}from"./emotion-styled.browser.esm-Dv69Fly8.js";const R=$.button`
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
`,C=({activeTab:t,dataTestId:o,isDisabled:n,index:l,variant:d,label:p,icon:e,handleChange:m})=>{const r=s.useRef(null),g=()=>{if(!r||!r.current||!r.current.parentElement)return;const f=r.current.getBoundingClientRect(),u=r.current.parentElement.getBoundingClientRect();f.left<u.left&&r.current.parentElement.scroll({left:r.current.parentElement.scrollLeft-(u.left-f.left),behavior:"smooth"}),u.right<f.right&&r.current.parentElement.scroll({left:r.current.parentElement.scrollLeft+(f.right-u.right),behavior:"smooth"}),m(l)};return i.jsxs(R,{active:t===l,"data-testid":o||`tab-item-${l}`,disabled:n,onClick:g,ref:r,role:"tab",tabIndex:t===l?0:-1,variant:d,children:[e,p]})},L=$.div`
  ${({variant:t})=>`
    display: flex;
    flex-direction: row;
    overflow: hidden;
    width: 100%;
    ${t==="default"&&"margin-bottom: -1px;"}
  `};
`,O=120,j=.5,k=({children:t,style:o,activeTab:n,dataTestId:l="tabs",variant:d="default",handleChange:p})=>{const e=s.useRef(null),[m,r]=s.useState(!1),[g,f]=s.useState(!1),u=I(),y=s.useMemo(()=>s.Children.map(t,(c,a)=>c&&s.cloneElement(c,{...c.props,activeTab:n,variant:d,index:a,handleChange:p})),[t,n,d,p]),h=c=>{if(!e||!e.current)return;const a=e.current.scrollLeft+c;e.current.scroll({left:a,behavior:"smooth"}),b(a)},b=c=>{if(!e||!e.current)return;const a=c??e.current.scrollLeft;r(a>0),f(e.current.clientWidth+a+j<e.current.scrollWidth)};return s.useEffect(()=>b(),[]),E(()=>b()),i.jsxs(S,{style:{flexDirection:"row",...d==="default"&&{borderBottom:`1px solid ${u.palette.border.default}`}},children:[i.jsx(x,{onClick:()=>h(-120),children:i.jsx(w,{code:"keyboard_arrow_left",dataTestId:"left-arrow",style:{...!m&&{display:"none"}}})}),i.jsx(L,{"data-testid":l,ref:e,role:"tablist",style:o,variant:d,children:y}),i.jsx(x,{onClick:()=>h(O),children:i.jsx(w,{code:"keyboard_arrow_right",dataTestId:"right-arrow",style:{...!g&&{display:"none"}}})})]})};k.Item=C;export{k as T};
