var q=Object.defineProperty;var t=(a,r)=>q(a,"name",{value:r,configurable:!0});import{n as o}from"./rolldown-runtime-CzYk_CEw.js";import{t as I}from"./react-HNhQAnN4.js";import{n as j,t as C}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{n as V}from"./src-DQMELJtN.js";import{t as w}from"./jsx-runtime-Br4tQxt1.js";import{t as E}from"./icon-O_kaPnXc.js";import{t as v}from"./Tooltip-BxXxST4o.js";import{t as L}from"./tooltip-SQvtY5Fg.js";var e;function l(){return(l=o((()=>{e={Letter:"letter",Collapsed:"collapsed",Thumbnail:"thumbnail",Photo:"photo"}})))()}t(l,"init_AvatarType");var D;function k(){return(k=o((()=>{C(),l(),D=j.div`
  ${({theme:a,type:r,size:n})=>{let s=`
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      border-radius: ${a.radius.radius_500};
    `;const c={small:`
        width: 20px;
        height: 20px;
        ${a.fontStyles.bodyXsBold};
      `,medium:`
        width: ${a.spacing.spacing_60};
        height: ${a.spacing.spacing_60};
        ${a.fontStyles.bodyXsBold};
      `,large:`
        width: ${a.spacing.spacing_70};
        height: ${a.spacing.spacing_70};
        ${a.fontStyles.bodySmBold};
      `};switch(s+=c[n],r){case e.Letter:s+=`
          color: ${a.palette.content.contrast};
          background-color: ${a.palette.primary.default};
        `;break;case e.Collapsed:s+=`
          color: ${a.palette.content.medium};
          background-color: ${a.palette.content.contrast};
        `;break;case e.Thumbnail:s+=`
          color: ${a.palette.content.contrast};
          background-color: ${a.palette.primary.default};
        `;break;case e.Photo:s+=`
          & > * {
            width: 100%;
            height: 100%;
            border-radius: ${a.radius.radius_500};
          }
        `}return s}}
`})))()}t(k,"init_Avatar_styled");var S;function _(){return(_=o((()=>{S=t((a="")=>a.split(" ").slice(0,2).join(" ").split(/\s/).reduce((r,n)=>r+=n.slice(0,1),"").toUpperCase(),"acronymGenerator")})))()}t(_,"init_acronymGenerator");var y,i,p;function z(){return(z=o((()=>{y=I(),E(),L(),k(),l(),_(),i=w(),p=t(({title:a,type:r=e.Letter,size:n="medium",imageSrc:s="",dataTestId:c,customInitials:d,collapsedCount:T="+1",hasTooltip:x=!1,style:A})=>{const[h,P]=(0,y.useState)(!1),b=t(()=>{P(!0)},"handleImageError"),m=r===e.Photo&&(h||!s),u=(0,i.jsx)(V,{code:"person",color:"primary",size:n}),N=t(()=>m?u:(0,i.jsx)("img",{alt:a,onError:b,src:s}),"renderImage"),$={[e.Photo]:N(),[e.Thumbnail]:u,[e.Collapsed]:T.substring(0,3),[e.Letter]:d?d.substring(0,2):S(a)},g=t(()=>{const f=m?e.Thumbnail:r;return(0,i.jsx)(D,{"data-avatar-type":f,"data-testid":c??"avatar",size:n,style:A,type:f,children:$[r]})},"renderAvatarContent");return x?(0,i.jsxs)(v,{children:[g(),(0,i.jsx)(v.Content,{children:a})]}):g()},"Avatar");try{p.displayName="Avatar",p.__docgenInfo={description:"",displayName:"Avatar",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/avatar/src/Avatar.tsx",methods:[],props:{title:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/avatar/src/types/index.ts",name:"AvatarProps"}],description:"",name:"title",parent:{fileName:"DT-DDS/packages/react-packages/avatar/src/types/index.ts",name:"AvatarProps"},required:!0,tags:{},type:{name:"string"}},imageSrc:{defaultValue:{value:""},declarations:[{fileName:"DT-DDS/packages/react-packages/avatar/src/types/index.ts",name:"AvatarProps"}],description:"",name:"imageSrc",parent:{fileName:"DT-DDS/packages/react-packages/avatar/src/types/index.ts",name:"AvatarProps"},required:!1,tags:{},type:{name:"string | undefined"}},dataTestId:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/avatar/src/types/index.ts",name:"AvatarProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/avatar/src/types/index.ts",name:"AvatarProps"},required:!1,tags:{},type:{name:"string | undefined"}},style:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/avatar/src/types/index.ts",name:"AvatarProps"}],description:"",name:"style",parent:{fileName:"DT-DDS/packages/react-packages/avatar/src/types/index.ts",name:"AvatarProps"},required:!1,tags:{},type:{name:"CSSProperties | undefined"}},customInitials:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/avatar/src/types/index.ts",name:"AvatarProps"}],description:"",name:"customInitials",parent:{fileName:"DT-DDS/packages/react-packages/avatar/src/types/index.ts",name:"AvatarProps"},required:!1,tags:{},type:{name:"string | undefined"}},hasTooltip:{defaultValue:{value:"false"},declarations:[{fileName:"DT-DDS/packages/react-packages/avatar/src/types/index.ts",name:"AvatarProps"}],description:"",name:"hasTooltip",parent:{fileName:"DT-DDS/packages/react-packages/avatar/src/types/index.ts",name:"AvatarProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},collapsedCount:{defaultValue:{value:"+1"},declarations:[{fileName:"DT-DDS/packages/react-packages/avatar/src/types/index.ts",name:"AvatarProps"}],description:"",name:"collapsedCount",parent:{fileName:"DT-DDS/packages/react-packages/avatar/src/types/index.ts",name:"AvatarProps"},required:!1,tags:{},type:{name:"string | undefined"}},type:{defaultValue:{value:"letter"},declarations:[{fileName:"DT-DDS/packages/react-packages/avatar/src/types/index.ts",name:"AvatarStyledProps"}],description:"",name:"type",parent:{fileName:"DT-DDS/packages/react-packages/avatar/src/types/index.ts",name:"AvatarStyledProps"},required:!1,tags:{},type:{name:"AvatarType | undefined"}},size:{defaultValue:{value:"medium"},declarations:[{fileName:"DT-DDS/packages/react-packages/avatar/src/types/index.ts",name:"AvatarStyledProps"}],description:"",name:"size",parent:{fileName:"DT-DDS/packages/react-packages/avatar/src/types/index.ts",name:"AvatarStyledProps"},required:!1,tags:{},type:{name:"AvatarSize"}}},tags:{}}}catch{}})))()}t(z,"init_Avatar");export{l as i,z as n,e as r,p as t};
