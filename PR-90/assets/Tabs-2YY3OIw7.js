var I=Object.defineProperty;var s=(t,e)=>I(t,"name",{value:e,configurable:!0});import{j as f}from"./jsx-runtime-Cgz2XvFB.js";import{B as R}from"./index-juXVSS06.js";import"./typography-B3nKKPHm.js";import"./index-B2NK8Htn.js";import"./index-DV-VXEUn.js";import{r as c}from"./index-CwbBKW39.js";import{u as C}from"./useDebounceResize-Cgf-_qkd.js";import{I as $}from"./Icon-BrO18bYS.js";import{I as w}from"./IconButton-ycqAlT29.js";import{f as S,d as L}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";const O=S.button`
  border: none;
  display: flex;
  align-items: center;

  ${({theme:t,active:e,disabled:n,variant:l})=>`
    ${e?t.fontStyles.bodyMdBold:t.fontStyles.bodyMdRegular}
    ${l==="default"?`
          background-color: transparent;
          ${e?`border-bottom: 2px solid ${t.palette.accent.default};`:""}
          `:`
          background-color: ${e?t.palette.surface.contrast:"transparent"};`}
    
    color: ${n?t.palette.content.light:t.palette.accent.default};
    padding: ${t.spacing.spacing_40} ${t.spacing.s};
    cursor: ${e?"default":n?"not-allowed":"pointer"};
    white-space: nowrap;
    gap: ${t.spacing.spacing_30};
    
    ${!e&&!n&&`
        &:hover {
          background-color: ${t.palette.accent.light};
        }        
      `}
  `}
`,j=s(({activeTab:t,dataTestId:e,isDisabled:n,index:l,variant:d,label:m,icon:r,handleChange:g})=>{const o=c.useRef(null),b=s(()=>{if(!o||!o.current||!o.current.parentElement)return;const u=o.current.getBoundingClientRect(),p=o.current.parentElement.getBoundingClientRect();u.left<p.left&&o.current.parentElement.scroll({left:o.current.parentElement.scrollLeft-(p.left-u.left),behavior:"smooth"}),p.right<u.right&&o.current.parentElement.scroll({left:o.current.parentElement.scrollLeft+(u.right-p.right),behavior:"smooth"}),g(l)},"handleOnClick");return f.jsxs(O,{active:t===l,"data-testid":e||`tab-item-${l}`,disabled:n,onClick:b,ref:o,role:"tab",tabIndex:t===l?0:-1,variant:d,children:[r,m]})},"TabItem"),k=S.div`
  ${({variant:t})=>`
    display: flex;
    flex-direction: row;
    overflow: hidden;
    width: 100%;
    ${t==="default"&&"margin-bottom: -1px;"}
  `};
`,y=120,_=.5,B=s(({children:t,style:e,activeTab:n,dataTestId:l="tabs",variant:d="default",handleChange:m})=>{const r=c.useRef(null),[g,o]=c.useState(!1),[b,u]=c.useState(!1),p=L(),E=c.useMemo(()=>c.Children.map(t,(a,i)=>a&&c.cloneElement(a,{...a.props,activeTab:n,variant:d,index:i,handleChange:m})),[t,n,d,m]),x=s(a=>{if(!r||!r.current)return;const i=r.current.scrollLeft+a;r.current.scroll({left:i,behavior:"smooth"}),h(i)},"handleScroll"),h=s(a=>{if(!r||!r.current)return;const i=a??r.current.scrollLeft;o(i>0),u(r.current.clientWidth+i+_<r.current.scrollWidth)},"calculateIfIsOverflowing");return c.useEffect(()=>h(),[]),C(()=>h()),f.jsxs(R,{style:{flexDirection:"row",...d==="default"&&{borderBottom:`1px solid ${p.palette.border.default}`}},children:[f.jsx(w,{onClick:s(()=>x(-y),"onClick"),children:f.jsx($,{code:"keyboard_arrow_left",dataTestId:"left-arrow",style:{...!g&&{display:"none"}}})}),f.jsx(k,{"data-testid":l,ref:r,role:"tablist",style:e,variant:d,children:E}),f.jsx(w,{onClick:s(()=>x(y),"onClick"),children:f.jsx($,{code:"keyboard_arrow_right",dataTestId:"right-arrow",style:{...!b&&{display:"none"}}})})]})},"Tabs");B.Item=j;export{B as T};
