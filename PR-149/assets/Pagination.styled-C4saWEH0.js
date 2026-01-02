var i=Object.defineProperty;var a=(t,o)=>i(t,"name",{value:o,configurable:!0});import{f as e,j as r}from"./emotion-styled.browser.esm-CIRWz9XU.js";const d=[10,20,50,100],u=1,n=24,s=141,l=200,f=e.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 12px;
  flex-direction: column-reverse;
  justify-content: center;

  @media screen and (min-width: ${({theme:t})=>t.breakpoints.mq3}px) {
    flex-direction: row;
    justify-content: space-between;
  }
`,x=e.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
  gap: 12px;

  @media screen and (min-width: ${({theme:t})=>t.breakpoints.mq3}px) {
    width: auto;
    justify-content: center;
    flex-shrink: 0;
  }
`,$=e.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 0;
  flex-shrink: 0;
  flex-wrap: nowrap;
`,g=e.button`
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
      outline-offset: 2px;
    }
  `}
`,y=e("button",{shouldForwardProp:a(t=>r(t)&&!t.startsWith("$"),"shouldForwardProp")})`
  ${({theme:t,$isActive:o})=>`
    ${t.fontStyles.bodyXsBold};
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${n}px;
    height: ${n}px;
    border: none;
    transition: all 0.2s ease-in-out;
    background-color: transparent; 
    color: ${t.palette.content.default};
    cursor: pointer;

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

    &:focus-visible {
      outline: 2px solid ${t.palette.primary.default};
      outline-offset: 2px;
    }
  `}
`,P=e.span`
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
`,b=e.div`
  ${({theme:t})=>`
    width: ${s}px;

    label:empty {
      display: none;
    }

    @media screen and (min-width: ${t.breakpoints.mq3}px) {
      width: ${l}px;
    }
  `}
`,w=e.span`
  ${({theme:t})=>`
    ${t.fontStyles.bodySmRegular};
    white-space: nowrap;
  `}
`;export{u as F,x as I,$ as N,f as P,P as T,b as a,d as b,w as c,y as d,g as e};
