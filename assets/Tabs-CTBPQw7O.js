import{j as i}from"./jsx-runtime-DMAvRu52.js";import{B as S}from"./index-DSuwS0lG.js";import"./index-CL4Xg4Pf.js";import"./index-BSh7GFw5.js";import"./index-DCrStp1_.js";import{r as s}from"./index-Dl6G-zuu.js";import{u as E}from"./useDebounceResize-Dz-u_MwM.js";import{I as x}from"./Icon-87Ryblgq.js";import{I as w}from"./IconButton-8pEMAeo8.js";import{n as $,d as I}from"./emotion-styled.browser.esm-Dv69Fly8.js";const R=$.button`
  border: none;
  display: flex;
  align-items: center;

  ${({theme:t,active:o,disabled:n,variant:l})=>`
    ${o?t.fontStyles.body2Bold:t.fontStyles.body2}
    ${l==="default"?`
          background-color: transparent;
          ${o?`border-bottom: 2px solid ${t.palette.accent.default};`:""}
          `:`
          background-color: ${o?t.palette.surface.contrast:"transparent"};`}
    
    color: ${n?t.palette.content.light:t.palette.accent.default};
    padding: ${t.spacing["3xs"]} ${t.spacing.s};
    cursor: ${o?"default":n?"not-allowed":"pointer"};
    white-space: nowrap;
    gap: ${t.spacing["4xs"]};
    
    ${!o&&!n&&`
        &:hover {
          background-color: ${t.palette.accent.light};
        }        
      `}
  `}
`,C=({activeTab:t,dataTestId:o,isDisabled:n,index:l,variant:f,label:p,icon:e,handleChange:m})=>{const r=s.useRef(null),g=()=>{if(!r||!r.current||!r.current.parentElement)return;const d=r.current.getBoundingClientRect(),u=r.current.parentElement.getBoundingClientRect();d.left<u.left&&r.current.parentElement.scroll({left:r.current.parentElement.scrollLeft-(u.left-d.left),behavior:"smooth"}),u.right<d.right&&r.current.parentElement.scroll({left:r.current.parentElement.scrollLeft+(d.right-u.right),behavior:"smooth"}),m(l)};return i.jsxs(R,{active:t===l,"data-testid":o||`tab-item-${l}`,disabled:n,onClick:g,ref:r,role:"tab",tabIndex:t===l?0:-1,variant:f,children:[e,p]})},L=$.div`
  ${({variant:t})=>`
    display: flex;
    flex-direction: row;
    overflow: hidden;
    width: 100%;
    ${t==="default"&&"margin-bottom: -1px;"}
  `};
`,O=120,j=.5,k=({children:t,style:o,activeTab:n,dataTestId:l="tabs",variant:f="default",handleChange:p})=>{const e=s.useRef(null),[m,r]=s.useState(!1),[g,d]=s.useState(!1),u=I(),y=s.useMemo(()=>s.Children.map(t,(c,a)=>c&&s.cloneElement(c,{...c.props,activeTab:n,variant:f,index:a,handleChange:p})),[t,n,f,p]),h=c=>{if(!e||!e.current)return;const a=e.current.scrollLeft+c;e.current.scroll({left:a,behavior:"smooth"}),b(a)},b=c=>{if(!e||!e.current)return;const a=c??e.current.scrollLeft;r(a>0),d(e.current.clientWidth+a+j<e.current.scrollWidth)};return s.useEffect(()=>b(),[]),E(()=>b()),i.jsxs(S,{style:{flexDirection:"row",...f==="default"&&{borderBottom:`1px solid ${u.palette.border.default}`}},children:[i.jsx(w,{onClick:()=>h(-120),children:i.jsx(x,{code:"keyboard_arrow_left",dataTestId:"left-arrow",style:{...!m&&{display:"none"}}})}),i.jsx(L,{"data-testid":l,ref:e,role:"tablist",style:o,variant:f,children:y}),i.jsx(w,{onClick:()=>h(O),children:i.jsx(x,{code:"keyboard_arrow_right",dataTestId:"right-arrow",style:{...!g&&{display:"none"}}})})]})};k.Item=C;export{k as T};
