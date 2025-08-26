import{j as e}from"./jsx-runtime-DMAvRu52.js";import{T as c}from"./Typography-DII2gFDQ.js";import{C as p}from"./Close-mVzWqPf0.js";import{d as u,n}from"./emotion-styled.browser.esm-Dv69Fly8.js";import{I as x}from"./Info-BRKcLzcc.js";const f=t=>e.jsx("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...t,children:e.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"})}),h=t=>{const s=u();return e.jsxs("svg",{color:s.palette.error.default,fill:"none",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...t,children:[e.jsx("path",{d:"M19.0711 19.0711C17.1957 20.9464 14.6522 22 12 22C9.34784 22 6.8043 20.9464 4.92893 19.0711C3.05357 17.1957 2 14.6522 2 12C2 9.34784 3.05357 6.8043 4.92893 4.92893C6.8043 3.05357 9.34784 2 12 2C14.6522 2 17.1957 3.05357 19.0711 4.92893C20.9464 6.8043 22 9.34784 22 12C22 14.6522 20.9464 17.1957 19.0711 19.0711Z",fill:"currentColor"}),e.jsx("path",{d:"M12.8797 13.6863L13.1157 6.48828H10.8997L11.0997 13.6863H12.8797ZM11.9907 17.5123C12.1621 17.5181 12.333 17.4894 12.4932 17.4281C12.6534 17.3667 12.7997 17.2739 12.9234 17.1551C13.0471 17.0362 13.1458 16.8938 13.2136 16.7362C13.2813 16.5786 13.3168 16.4091 13.318 16.2375C13.3191 16.066 13.2859 15.8959 13.2202 15.7375C13.1545 15.579 13.0577 15.4353 12.9356 15.3148C12.8135 15.1944 12.6684 15.0996 12.5091 15.0361C12.3497 14.9727 12.1792 14.9418 12.0077 14.9453C11.6733 14.9521 11.3547 15.0892 11.1198 15.3274C10.8849 15.5656 10.7522 15.886 10.75 16.2205C10.7478 16.555 10.8762 16.8772 11.1079 17.1184C11.3397 17.3597 11.6564 17.501 11.9907 17.5123Z",fill:"white"})]})},C=t=>e.jsx("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...t,children:e.jsx("path",{d:"M1 21.5H23L12 2.5L1 21.5ZM13 18.5H11V16.5H13V18.5ZM13 14.5H11V10.5H13V14.5Z"})}),o={Default:"default",Error:"error",Info:"informative",Success:"success",Warning:"warning"},w=n.div`
  ${({theme:t,type:s})=>`
    padding: ${t.spacing["3xs"]} ${t.spacing["2xs"]};
    background-color: ${s===o.Default?t.palette.surface.light:t.palette[s].light};
    display: flex;
    align-items: flex-start;
    justify-content: center;
    border-radius: ${t.shape.message};
    border: 1px dashed ${s===o.Default?t.palette.border.default:t.palette[s].default};
    width: 100%;
    height: 100%;
    gap: ${t.spacing["4xs"]};
  `}
`,j=n.div`
  ${({theme:t})=>`
    display: flex;
    flex-direction: column;
    flex: 1;
    text-align: start;
    gap: ${t.spacing["6xs"]};
  `}
`,M=n.div`
  ${({theme:t})=>`
    padding-top: ${t.spacing["4xs"]};
  `}
`,m=n.div`
  ${({theme:t,type:s})=>`
    height: 100%;
    display: flex;
    color: ${s==="default"?t.palette.content.default:t.palette[s].default};
  `}
`,$=n.button`
  ${({theme:t})=>`
    color: ${t.palette.content.default};
    border: 0;
    cursor: pointer;
    background: transparent;
    display: flex;
  
    &:hover {
      background-color: ${t.palette.surface.contrast};
    }
  `}
`,v={[o.Error]:h,[o.Info]:x,[o.Success]:f,[o.Warning]:C,[o.Default]:null},a=({children:t,dataTestId:s,style:d,type:r=o.Default,onClose:l})=>{const g=!!l,i=v[r];return e.jsxs(w,{"data-testid":s??"message",style:d,type:r,children:[i?e.jsx(m,{type:r,children:e.jsx(i,{"data-testid":"message-icon",height:"16px",width:"16px"})}):null,e.jsx(j,{children:t}),g?e.jsx($,{onClick:l,children:e.jsx(p,{height:"16px",width:"16px"})}):null]})};a.Title=({children:t})=>e.jsx(c,{color:"content.dark",element:"h2",fontStyles:"body2Bold",children:t});a.Description=({children:t})=>e.jsx(c,{color:"content.default",fontStyles:"body3",children:t});a.Action=({children:t,dataTestId:s})=>e.jsx(M,{"data-testid":s??"message-action",children:t});export{a as M,o as O};
