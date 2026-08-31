var S=Object.defineProperty;var l=(e,t)=>S(e,"name",{value:t,configurable:!0});import{o as v}from"./rolldown-runtime-CzYk_CEw.js";import{t as C}from"./react-HNhQAnN4.js";import{o as E,t as x,u as R}from"./emotion-styled.browser.esm-BD_8_ENF.js";import{t as w}from"./src-Cgsrikn0.js";import{t as I}from"./jsx-runtime-Br4tQxt1.js";import"./icon-BVKwuEsa.js";import{t as L}from"./core-DtZ76Qs_.js";import{t as O}from"./src-1jRqCCWR.js";import"./box-DLdZVqFP.js";import{t as $}from"./IconButton-DPHwvLfO.js";import"./icon-button-DUNOTLRV.js";var s=v(C());E();var j=x.button`
  border: none;
  display: flex;
  align-items: center;

  ${({theme:e,active:t,disabled:n,variant:a})=>`
    ${t?e.fontStyles.bodyMdBold:e.fontStyles.bodyMdRegular}
    ${a==="default"?`
          background-color: transparent;
          ${t?`border-bottom: 2px solid ${e.palette.accent.default};`:""}
          `:`
          background-color: ${t?e.palette.surface.contrast:"transparent"};`}
    
    color: ${n?e.palette.content.light:e.palette.accent.default};
    padding: ${e.spacing.spacing_40} ${e.spacing.s};
    cursor: ${t?"default":n?"not-allowed":"pointer"};
    white-space: nowrap;
    gap: ${e.spacing.spacing_30};
    
    ${!t&&!n&&`
        &:hover {
          background-color: ${e.palette.accent.light};
        }        
      `}
  `}
`,d=I(),k=l(({activeTab:e,dataTestId:t,isDisabled:n,index:a,variant:c,label:m,icon:r,handleChange:g})=>{const o=(0,s.useRef)(null),b=l(()=>{if(!o||!o.current||!o.current.parentElement)return;const u=o.current.getBoundingClientRect(),p=o.current.parentElement.getBoundingClientRect();u.left<p.left&&o.current.parentElement.scroll({left:o.current.parentElement.scrollLeft-(p.left-u.left),behavior:"smooth"}),p.right<u.right&&o.current.parentElement.scroll({left:o.current.parentElement.scrollLeft+(u.right-p.right),behavior:"smooth"}),g(a)},"handleOnClick");return(0,d.jsxs)(j,{active:e===a,"data-testid":t||`tab-item-${a}`,disabled:n,onClick:b,ref:o,role:"tab",tabIndex:e===a?0:-1,variant:c,children:[r,m]})},"TabItem"),T=x.div`
  ${({variant:e})=>`
    display: flex;
    flex-direction: row;
    overflow: hidden;
    width: 100%;
    ${e==="default"&&"margin-bottom: -1px;"}
  `};
`,B=120,M=.5,q=l(({children:e,style:t,activeTab:n,dataTestId:a="tabs",variant:c="default",handleChange:m})=>{const r=(0,s.useRef)(null),[g,o]=(0,s.useState)(!1),[b,u]=(0,s.useState)(!1),p=R(),y=(0,s.useMemo)(()=>s.Children.map(e,(i,f)=>i&&(0,s.cloneElement)(i,{...i.props,activeTab:n,variant:c,index:f,handleChange:m})),[e,n,c,m]),h=l(i=>{if(!r||!r.current)return;const f=r.current.scrollLeft+i;r.current.scroll({left:f,behavior:"smooth"}),_(f)},"handleScroll"),_=l(i=>{if(!r||!r.current)return;const f=i??r.current.scrollLeft;o(f>0),u(r.current.clientWidth+f+M<r.current.scrollWidth)},"calculateIfIsOverflowing");return(0,s.useEffect)(()=>_(),[]),L(()=>_()),(0,d.jsxs)(O,{style:{flexDirection:"row",...c==="default"&&{borderBottom:`1px solid ${p.palette.border.default}`}},children:[(0,d.jsx)($,{onClick:l(()=>h(-120),"onClick"),children:(0,d.jsx)(w,{code:"keyboard_arrow_left",dataTestId:"left-arrow",style:{...!g&&{display:"none"}}})}),(0,d.jsx)(T,{"data-testid":a,ref:r,role:"tablist",style:t,variant:c,children:y}),(0,d.jsx)($,{onClick:l(()=>h(B),"onClick"),children:(0,d.jsx)(w,{code:"keyboard_arrow_right",dataTestId:"right-arrow",style:{...!b&&{display:"none"}}})})]})},"Tabs");q.Item=k;var U=l((e=0)=>{const[t,n]=(0,s.useState)(e);return(0,s.useEffect)(()=>{n(e)},[e]),{activeTab:t,handleChange:l(c=>{n(c)},"handleChange")}},"useTabs");export{q as n,U as t};
