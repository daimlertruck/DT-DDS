import{g as k}from"./index-D9dZuxfj.js";import{f as $}from"./emotion-styled.browser.esm-DBghOYGd.js";const n={Letter:"letter",Collapsed:"collapsed",Thumbnail:"thumbnail",Photo:"photo"},l={Small:"small",Medium:"medium",Large:"large"},m={[l.Small]:"s",[l.Medium]:"m",[l.Large]:"l"},x=$.div`
  ${({theme:t,type:u,size:y,isActive:c,isDisabled:o,bgColor:p,hoverBgColor:s,activeBgColor:d})=>{let r=`
      & > * {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        text-transform: uppercase;
        border-radius: ${t.radius.radius_500};
        cursor: ${o?"not-allowed":"pointer"};
      }
    `;const a=(i,e)=>e?k(e,t):i;switch(y){case l.Small:r+=`
          width: 20px;
          height: 20px;
          ${t.fontStyles.bodyXsBold};
        `;break;case l.Medium:r+=`
          width: 24px;
          height: 24px;
          ${t.fontStyles.bodyXsBold};
        `;break;case l.Large:r+=`
          width: 32px;
          height: 32px;
          ${t.fontStyles.bodySmBold};
        `;break}switch(u){case n.Letter:const i=o?t.palette.primary.light:c?a(t.palette.primary.dark,d):a(t.palette.primary.default,p);r+=`
          color: ${t.palette.content.contrast};
          
          & > * {
            background-color: ${i};

            &:hover {
              background-color: ${a(t.palette.primary.dark,s)};
            }
          }
        `;break;case n.Collapsed:const e=o?t.palette.content.contrast:c?a(t.palette.primary.light,d):a(t.palette.content.contrast,p);r+=`
          color: ${t.palette.content.medium};
          
          & > * {
            background-color: ${e};

            ${!o&&`
              &:hover {
                background-color: ${a(t.palette.primary.light,s)};
              }
            `}
          }
        `;break;case n.Thumbnail:const g=o?t.palette.primary.light:c?a(t.palette.primary.dark,d):a(t.palette.primary.default,p);r+=`
          color: ${t.palette.content.contrast};
          
          & > * {
            background-color: ${g};

            &:hover {
              background-color: ${a(t.palette.primary.dark,s)};
            }
          }
        `;break;case n.Photo:r+=`
          & > * {
            ${o?"opacity: 0.38;":""}
          }
        `;break}return r}}
`;export{l as A,n as a,x as b,m as i};
