var k=Object.defineProperty;var a=(e,t)=>k(e,"name",{value:t,configurable:!0});import{n as D}from"./rolldown-runtime-CzYk_CEw.js";import{n as B,t as I}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{t as b}from"./jsx-runtime-Br4tQxt1.js";var m,i;function g(){return(g=D((()=>{I(),m={"extra-small":`
    font-size: 12px;
  `,small:`
    font-size: 16px;
  `,medium:`
    font-size: 20px;
  `,large:`
    font-size: 24px;
  `,"extra-large":`
    font-size: 32px;
  `},i=B.button(({theme:e,disabled:t,variant:o="default",size:l="large",cssOverrides:s})=>{const n=o==="default",u=a(()=>t?n?e.palette.content.light:e.palette.content.default:n?e.palette.content.default:e.palette.content.contrast,"baseColor"),p=n?e.palette.accent.default:e.palette.accent.medium,r=`
      display: flex;
      align-items: center;
      border: none;
      background-color: transparent;
      cursor: ${t?"not-allowed":"pointer"};

      > i {
        ${m[l]};
        color: ${u()};
      }

      &:not(:disabled) > i {
        &:hover, &:active {
          color: ${p};
        }
      }

      &:focus-visible {
        outline: 2px solid ${e.palette.primary.default};
      }

      &:hover:not(:disabled) {
        [data-avatar-type='letter'] {
          background-color: ${e.palette.primary.dark};
        }

        [data-avatar-type='collapsed'] {
          background-color: ${e.palette.primary.light};
        }

        [data-avatar-type='thumbnail'] {
          background-color: ${e.palette.primary.dark};
        }
      }

    ${t&&`
        [data-avatar-type='letter'] {
          background-color: ${e.palette.primary.light};
        }

        [data-avatar-type='collapsed'] {
          background-color: ${e.palette.surface.contrast};
        }

        [data-avatar-type='thumbnail'] {
          background-color: ${e.palette.primary.light};
        }

        [data-avatar-type='photo'] {
          opacity: 0.38;
        }
      `}
    `;return s?[r,s]:r});try{i.displayName="IconButtonStyled",i.__docgenInfo={description:"",displayName:"IconButtonStyled",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/icon-button/src/IconButton.styled.ts",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}},variant:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.styled.ts",name:"IconButtonStyledProps"}],description:"",name:"variant",parent:{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.styled.ts",name:"IconButtonStyledProps"},required:!1,tags:{},type:{name:"IconButtonVariant | undefined"}},size:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.styled.ts",name:"IconButtonStyledProps"}],description:"",name:"size",parent:{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.styled.ts",name:"IconButtonStyledProps"},required:!1,tags:{},type:{name:"ComponentSize | undefined"}},cssOverrides:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.styled.ts",name:"IconButtonStyledProps"}],description:"",name:"cssOverrides",parent:{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.styled.ts",name:"IconButtonStyledProps"},required:!1,tags:{},type:{name:"SerializedStyles | undefined"}}},tags:{}}}catch{}})))()}a(g,"init_IconButton_styled");var f,c;function S(){return(S=D((()=>{g(),f=b(),c=a(({children:e,dataTestId:t,isDisabled:o,ariaLabel:l,variant:s,size:n,onClick:u,cssOverrides:p,...r})=>{const y=a(d=>{o||(d.preventDefault(),d.stopPropagation(),u?.(d))},"handleClick");return(0,f.jsx)(i,{"aria-label":l,cssOverrides:p,"data-testid":t||"icon-button",disabled:o,onClick:y,size:n,variant:s,...r,children:e})},"IconButton"),c.displayName="IconButton";try{c.displayName="IconButton",c.__docgenInfo={description:"",displayName:"IconButton",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/icon-button/src/IconButton.tsx",methods:[],props:{onClick:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.tsx",name:"IconButtonProps"}],description:"",name:"onClick",parent:{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.tsx",name:"IconButtonProps"},required:!1,tags:{},type:{name:"((e: MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined"}},isDisabled:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.tsx",name:"IconButtonProps"}],description:"",name:"isDisabled",parent:{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.tsx",name:"IconButtonProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},ariaLabel:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.tsx",name:"IconButtonProps"}],description:"",name:"ariaLabel",parent:{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.tsx",name:"IconButtonProps"},required:!1,tags:{},type:{name:"string | undefined"}},variant:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.tsx",name:"IconButtonProps"}],description:"",name:"variant",parent:{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.tsx",name:"IconButtonProps"},required:!1,tags:{},type:{name:"IconButtonVariant | undefined"}},size:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.tsx",name:"IconButtonProps"}],description:"",name:"size",parent:{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.tsx",name:"IconButtonProps"},required:!1,tags:{},type:{name:"ComponentSize | undefined"}},cssOverrides:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.tsx",name:"IconButtonProps"}],description:"",name:"cssOverrides",parent:{fileName:"DT-DDS/packages/react-packages/icon-button/src/IconButton.tsx",name:"IconButtonProps"},required:!1,tags:{},type:{name:"SerializedStyles | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}}},tags:{}}}catch{}})))()}a(S,"init_IconButton");export{S as n,c as t};
