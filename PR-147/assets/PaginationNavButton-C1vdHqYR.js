var f=Object.defineProperty;var a=(t,o)=>f(t,"name",{value:o,configurable:!0});import{j as i}from"./jsx-runtime-Cgz2XvFB.js";import{I as x}from"./Icon-BWIy_dZb.js";import{T as l}from"./Tooltip-CZhszMJk.js";import{f as e,j as g}from"./emotion-styled.browser.esm-CIRWz9XU.js";const v=[10,20,50,100],I=1,n=24,y=200,k=e.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  width: 100%;
  gap: 12px;

  @media screen and (min-width: ${({theme:t})=>t.breakpoints.mq3}px) {
    flex-direction: row;
    justify-content: center;

    &:has(> *:nth-of-type(2)) {
      justify-content: space-between;
    }
  }
`,T=e.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  @media screen and (min-width: ${({theme:t})=>t.breakpoints.mq3}px) {
    width: auto;
    flex-shrink: 0;
  }
`,j=e.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 0;
  flex-shrink: 0;
  flex-wrap: nowrap;
`,$=e.button`
  ${({theme:t})=>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${n}px;
    height: ${n}px;
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
`,E=e("button",{shouldForwardProp:a(t=>g(t)&&!t.startsWith("$"),"shouldForwardProp")})`
  ${({theme:t,$isActive:o})=>`
    ${t.fontStyles.bodyXsBold};
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${n}px;
    height: ${n}px;
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

    ${o&&`
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
    width: ${n}px;
    height: ${n}px;
    color: ${t.palette.content.default};
    user-select: none;
  `}
`,_=e.div`
  ${({theme:t})=>`
    label:empty {
      display: none;
    }

    @media screen and (min-width: ${t.breakpoints.mq3}px) {
      min-width: ${y}px;
    }
  `}
`,B=e.span`
  ${({theme:t})=>`
    ${t.fontStyles.bodySmRegular};
    white-space: nowrap;
  `}
`,m=a(({ariaLabel:t,tooltipLabel:o,icon:d,targetPage:c,isDisabled:r,testId:p,onClick:u})=>{const s=i.jsx($,{"aria-label":t,"data-testid":p,disabled:r,onClick:a(()=>u(c),"onClick"),children:i.jsx(x,{code:d,size:"small"})});return r?s:i.jsxs(l,{children:[s,i.jsx(l.Content,{background:"full",direction:"top",children:o})]})},"PaginationNavButton");m.displayName="PaginationNavButton";export{I as F,T as I,j as N,k as P,N as T,_ as a,v as b,B as c,m as d,E as e};
