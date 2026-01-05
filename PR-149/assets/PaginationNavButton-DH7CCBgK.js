var x=Object.defineProperty;var n=(t,a)=>x(t,"name",{value:a,configurable:!0});import{j as i}from"./jsx-runtime-Cgz2XvFB.js";import{I as g}from"./Icon-BWIy_dZb.js";import{T as d}from"./Tooltip-Bsu6vZBP.js";import{f as e,j as r}from"./emotion-styled.browser.esm-CIRWz9XU.js";const T=[10,20,50,100],v=1,o=24,$=141,y=200,k=e("div",{shouldForwardProp:n(t=>r(t)&&!t.startsWith("$"),"shouldForwardProp")})`
  display: flex;
  flex-direction: column-reverse;
  align-items: ${({$shouldCenterItems:t})=>t?"center":"flex-end"};
  width: 100%;
  gap: 12px;

  @media screen and (min-width: ${({theme:t})=>t.breakpoints.mq3}px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`,E=e("div",{shouldForwardProp:n(t=>r(t)&&!t.startsWith("$"),"shouldForwardProp")})`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: ${({$shouldCenterItems:t})=>t?"center":"flex-start"};
  gap: 12px;

  @media screen and (min-width: ${({theme:t})=>t.breakpoints.mq3}px) {
    width: auto;
    justify-content: center;
    flex-shrink: 0;
  }
`,_=e.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 0;
  flex-shrink: 0;
  flex-wrap: nowrap;
`,m=e.button`
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
`,j=e("button",{shouldForwardProp:n(t=>r(t)&&!t.startsWith("$"),"shouldForwardProp")})`
  ${({theme:t,$isActive:a})=>`
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

    ${a&&`
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
`,W=e.div`
  ${({theme:t})=>`
    width: ${$}px;

    label:empty {
      display: none;
    }

    @media screen and (min-width: ${t.breakpoints.mq3}px) {
      width: ${y}px;
    }
  `}
`,B=e.span`
  ${({theme:t})=>`
    ${t.fontStyles.bodySmRegular};
    white-space: nowrap;
  `}
`,b=n(({ariaLabel:t,tooltipLabel:a,icon:c,targetPage:p,isDisabled:s,testId:u,onClick:f})=>{const l=i.jsx(m,{"aria-label":t,"data-testid":u,disabled:s,onClick:n(()=>f(p),"onClick"),children:i.jsx(g,{code:c,size:"small"})});return s?l:i.jsxs(d,{children:[l,i.jsx(d.Content,{background:"full",direction:"top",children:a})]})},"PaginationNavButton");b.displayName="PaginationNavButton";export{v as F,E as I,_ as N,k as P,N as T,W as a,T as b,B as c,b as d,j as e};
