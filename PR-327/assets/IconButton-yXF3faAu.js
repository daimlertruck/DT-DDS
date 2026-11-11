var b=Object.defineProperty;var e=(t,a)=>b(t,"name",{value:a,configurable:!0});import{n as f}from"./rolldown-runtime-CzYk_CEw.js";import{n as B,t as y}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{t as I}from"./jsx-runtime-Br4tQxt1.js";var d,g;function D(){return(D=f((()=>{y(),d={"extra-small":`
    font-size: 12px;
  `,small:`
    font-size: 16px;
  `,medium:`
    font-size: 20px;
  `,large:`
    font-size: 24px;
  `,"extra-large":`
    font-size: 32px;
  `},g=B.button(({theme:t,disabled:a,variant:o="default",size:i="large",cssOverrides:r})=>{const n=o==="default",l=e(()=>a?n?t.palette.content.light:t.palette.content.default:n?t.palette.content.default:t.palette.content.contrast,"baseColor"),p=n?t.palette.accent.default:t.palette.accent.medium,s=`
      display: flex;
      align-items: center;
      border: none;
      background-color: transparent;
      cursor: ${a?"not-allowed":"pointer"};

      > i {
        ${d[i]};
        color: ${l()};
      }

      &:not(:disabled) > i {
        &:hover, &:active {
          color: ${p};
        }
      }

      &:focus-visible {
        outline: 2px solid ${t.palette.primary.default};
      }

      &:hover:not(:disabled) {
        [data-avatar-type='letter'] {
          background-color: ${t.palette.primary.dark};
        }

        [data-avatar-type='collapsed'] {
          background-color: ${t.palette.primary.light};
        }

        [data-avatar-type='thumbnail'] {
          background-color: ${t.palette.primary.dark};
        }
      }

    ${a&&`
        [data-avatar-type='letter'] {
          background-color: ${t.palette.primary.light};
        }

        [data-avatar-type='collapsed'] {
          background-color: ${t.palette.surface.contrast};
        }

        [data-avatar-type='thumbnail'] {
          background-color: ${t.palette.primary.light};
        }

        [data-avatar-type='photo'] {
          opacity: 0.38;
        }
      `}
    `;return r?[s,r]:s})})))()}e(D,"init_IconButton_styled");var m,c;function x(){return(x=f((()=>{D(),m=I(),c=e(({children:t,dataTestId:a,isDisabled:o,ariaLabel:i,variant:r,size:n,onClick:l,cssOverrides:p,...s})=>{const k=e(u=>{o||(u.preventDefault(),u.stopPropagation(),l?.(u))},"handleClick");return(0,m.jsx)(g,{"aria-label":i,cssOverrides:p,"data-testid":a||"icon-button",disabled:o,onClick:k,size:n,variant:r,...s,children:t})},"IconButton"),c.displayName="IconButton";try{c.displayName="IconButton",c.__docgenInfo={description:"",displayName:"IconButton",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/icon-button/src/IconButton.tsx",methods:[],props:{onClick:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.tsx",name:"IconButtonProps"}],description:"",name:"onClick",parent:{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.tsx",name:"IconButtonProps"},required:!1,tags:{},type:{name:"((e: MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined"}},isDisabled:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.tsx",name:"IconButtonProps"}],description:"",name:"isDisabled",parent:{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.tsx",name:"IconButtonProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},ariaLabel:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.tsx",name:"IconButtonProps"}],description:"",name:"ariaLabel",parent:{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.tsx",name:"IconButtonProps"},required:!1,tags:{},type:{name:"string | undefined"}},variant:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.tsx",name:"IconButtonProps"}],description:"",name:"variant",parent:{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.tsx",name:"IconButtonProps"},required:!1,tags:{},type:{name:"IconButtonVariant | undefined"}},size:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.tsx",name:"IconButtonProps"}],description:"",name:"size",parent:{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.tsx",name:"IconButtonProps"},required:!1,tags:{},type:{name:"ComponentSize | undefined"}},cssOverrides:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.tsx",name:"IconButtonProps"}],description:"",name:"cssOverrides",parent:{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.tsx",name:"IconButtonProps"},required:!1,tags:{},type:{name:"SerializedStyles | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}}},tags:{}}}catch{}})))()}e(x,"init_IconButton");export{x as n,c as t};
