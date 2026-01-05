var x=Object.defineProperty;var o=(t,a)=>x(t,"name",{value:a,configurable:!0});import{j as i}from"./jsx-runtime-Cgz2XvFB.js";import{I as g}from"./Icon-BWIy_dZb.js";import{T as d}from"./Tooltip-DRM3fRVr.js";import{f as e,j as r}from"./emotion-styled.browser.esm-CIRWz9XU.js";const v=[10,20,50,100],I=1,n=24,y=200,k=e("div",{shouldForwardProp:o(t=>r(t)&&!t.startsWith("$"),"shouldForwardProp")})`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  width: 100%;
  gap: 12px;

  @media screen and (min-width: ${({theme:t})=>t.breakpoints.mq3}px) {
    flex-direction: row;
    justify-content: space-between;
  }
`,T=e("div",{shouldForwardProp:o(t=>r(t)&&!t.startsWith("$"),"shouldForwardProp")})`
  display: flex;
  align-items: center;
  width: 100%;
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
`,E=e("button",{shouldForwardProp:o(t=>r(t)&&!t.startsWith("$"),"shouldForwardProp")})`
  ${({theme:t,$isActive:a})=>`
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
    width: ${n}px;
    height: ${n}px;
    color: ${t.palette.content.default};
    user-select: none;
  `}
`,_=e.div`
  ${({theme:t})=>`
    width: 100%;

    label:empty {
      display: none;
    }

    @media screen and (min-width: ${t.breakpoints.mq3}px) {
      min-width: ${y}px;
    }
  `}
`,W=e.span`
  ${({theme:t})=>`
    ${t.fontStyles.bodySmRegular};
    white-space: nowrap;
  `}
`,m=o(({ariaLabel:t,tooltipLabel:a,icon:c,targetPage:p,isDisabled:s,testId:u,onClick:f})=>{const l=i.jsx($,{"aria-label":t,"data-testid":u,disabled:s,onClick:o(()=>f(p),"onClick"),children:i.jsx(g,{code:c,size:"small"})});return s?l:i.jsxs(d,{children:[l,i.jsx(d.Content,{background:"full",direction:"top",children:a})]})},"PaginationNavButton");m.displayName="PaginationNavButton";export{I as F,T as I,j as N,k as P,N as T,_ as a,v as b,W as c,m as d,E as e};
