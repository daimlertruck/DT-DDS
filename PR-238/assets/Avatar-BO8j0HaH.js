var x=Object.defineProperty;var s=(t,a)=>x(t,"name",{value:a,configurable:!0});import{o as j}from"./rolldown-runtime-CzYk_CEw.js";import{t as k}from"./react-HNhQAnN4.js";import{t as S}from"./emotion-styled.browser.esm-BD_8_ENF.js";import{t as T}from"./src-Cgsrikn0.js";import{t as w}from"./jsx-runtime-Br4tQxt1.js";import"./icon-BVKwuEsa.js";import{t as m}from"./Tooltip-CV1x-ycZ.js";import"./tooltip-B7p4pHEA.js";var r={Letter:"letter",Collapsed:"collapsed",Thumbnail:"thumbnail",Photo:"photo"},C=j(k()),E=S.div`
  ${({theme:t,type:a,size:e})=>{let o=`
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      border-radius: ${t.radius.radius_500};
    `;const i={small:`
        width: 20px;
        height: 20px;
        ${t.fontStyles.bodyXsBold};
      `,medium:`
        width: ${t.spacing.spacing_60};
        height: ${t.spacing.spacing_60};
        ${t.fontStyles.bodyXsBold};
      `,large:`
        width: ${t.spacing.spacing_70};
        height: ${t.spacing.spacing_70};
        ${t.fontStyles.bodySmBold};
      `};switch(o+=i[e],a){case r.Letter:o+=`
          color: ${t.palette.content.contrast};
          background-color: ${t.palette.primary.default};
        `;break;case r.Collapsed:o+=`
          color: ${t.palette.content.medium};
          background-color: ${t.palette.content.contrast};
        `;break;case r.Thumbnail:o+=`
          color: ${t.palette.content.contrast};
          background-color: ${t.palette.primary.default};
        `;break;case r.Photo:o+=`
          & > * {
            width: 100%;
            height: 100%;
            border-radius: ${t.radius.radius_500};
          }
        `}return o}}
`,I=s((t="")=>t.split(" ").slice(0,2).join(" ").split(/\s/).reduce((a,e)=>a+=e.slice(0,1),"").toUpperCase(),"acronymGenerator"),n=w(),H=s(({title:t,type:a=r.Letter,size:e="medium",imageSrc:o="",dataTestId:i,customInitials:l,collapsedCount:g="+1",hasTooltip:b=!1,style:h})=>{const[y,f]=(0,C.useState)(!1),$=s(()=>{f(!0)},"handleImageError"),c=a===r.Photo&&(y||!o),d=(0,n.jsx)(T,{code:"person",color:"primary",size:e}),v=s(()=>c?d:(0,n.jsx)("img",{alt:t,onError:$,src:o}),"renderImage"),_={[r.Photo]:v(),[r.Thumbnail]:d,[r.Collapsed]:g.substring(0,3),[r.Letter]:l?l.substring(0,2):I(t)},p=s(()=>{const u=c?r.Thumbnail:a;return(0,n.jsx)(E,{"data-avatar-type":u,"data-testid":i??"avatar",size:e,style:h,type:u,children:_[a]})},"renderAvatarContent");return b?(0,n.jsxs)(m,{children:[p(),(0,n.jsx)(m.Content,{children:t})]}):p()},"Avatar");export{r as n,H as t};
