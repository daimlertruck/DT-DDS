var x=Object.defineProperty;var a=(t,n)=>x(t,"name",{value:n,configurable:!0});import{j as i}from"./jsx-runtime-Cgz2XvFB.js";import{r as g}from"./index-CwbBKW39.js";import{I as $}from"./Icon-BWIy_dZb.js";import{T as d}from"./Tooltip-C6F7eDGK.js";import{f as e,j as r}from"./emotion-styled.browser.esm-CIRWz9XU.js";const v=[10,20,50,100],_=1,o=24,y=141,m=200,k=e("div",{shouldForwardProp:a(t=>r(t)&&!t.startsWith("$"),"shouldForwardProp")})`
  display: flex;
  flex-direction: column-reverse;
  align-items: ${({$isItemsAlignToRight:t})=>t?"flex-end":"flex-start"};
  width: 100%;
  gap: 12px;

  @media screen and (min-width: ${({theme:t})=>t.breakpoints.mq3}px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`,j=e("div",{shouldForwardProp:a(t=>r(t)&&!t.startsWith("$"),"shouldForwardProp")})`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: ${({$isItemsAlignToRight:t})=>t?"flex-end":"flex-start"};
  gap: 12px;

  @media screen and (min-width: ${({theme:t})=>t.breakpoints.mq3}px) {
    width: auto;
    justify-content: center;
    flex-shrink: 0;
  }
`,R=e.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 0;
  flex-shrink: 0;
  flex-wrap: nowrap;
`,b=e.button`
  ${({theme:t})=>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${o}px;
    height: ${o}px;
    padding: 0;
    border: none;
    position: relative;
    background-color: transparent; 
    color: ${t.palette.content.default};
    cursor: pointer;

    &:disabled {
      i {
        color: ${t.palette.content.light};
      }
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background-color: ${t.palette.informative.light};
    }

    &:focus-visible {
      outline: 2px solid ${t.palette.primary.default};
      outline-offset: 1px;
    }
  `}
`,W=e("button",{shouldForwardProp:a(t=>r(t)&&!t.startsWith("$"),"shouldForwardProp")})`
  ${({theme:t,$isActive:n})=>`
    ${t.fontStyles.bodyXsBold};
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${o}px;
    height: ${o}px;
    border: none;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    background-color: transparent; 
    color: ${t.palette.content.default};
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid ${t.palette.primary.default};
      outline-offset: 1px;
      transition: none;
    }

    &:hover {
      background-color: ${t.palette.informative.light};
    }

    ${n&&`
        background-color: ${t.palette.primary.default};
        color: ${t.palette.content.contrast};
        cursor: default;

        &:hover {
          background-color: ${t.palette.primary.default};
        }
      `}
  `}
`,N=e.span`
  ${({theme:t})=>`
    ${t.fontStyles.bodyMdRegular};
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${o}px;
    height: ${o}px;
    color: ${t.palette.content.default};
    user-select: none;
  `}
`,A=e.div`
  ${({theme:t})=>`
    width: ${y}px;

    label:empty {
      display: none;
    }

    @media screen and (min-width: ${t.breakpoints.mq3}px) {
      width: ${m}px;
    }
  `}
`,B=e.span`
  ${({theme:t})=>`
    ${t.fontStyles.bodySmRegular};
    white-space: nowrap;
  `}
`,P=g.memo(({ariaLabel:t,tooltipLabel:n,icon:c,targetPage:p,isDisabled:s,testId:u,onClick:f})=>{const l=i.jsx(b,{"aria-label":t,"data-testid":u,disabled:s,onClick:a(()=>f(p),"onClick"),children:i.jsx($,{code:c,size:"small"})});return s?l:i.jsxs(d,{children:[l,i.jsx(d.Content,{background:"full",direction:"top",children:n})]})});P.displayName="PaginationNavButton";export{_ as F,j as I,R as N,k as P,N as T,A as a,v as b,B as c,P as d,W as e};
