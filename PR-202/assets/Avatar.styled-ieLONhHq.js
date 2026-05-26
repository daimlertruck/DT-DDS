import{f as e}from"./emotion-styled.browser.esm-CIRWz9XU.js";const o={Letter:"letter",Collapsed:"collapsed",Thumbnail:"thumbnail",Photo:"photo"},n=e.div`
  ${({theme:t,type:s,size:r})=>{let a=`
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      border-radius: ${t.radius.radius_500};
    `;const l={small:`
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
      `};switch(a+=l[r],s){case o.Letter:a+=`
          color: ${t.palette.content.contrast};
          background-color: ${t.palette.primary.default};
        `;break;case o.Collapsed:a+=`
          color: ${t.palette.content.medium};
          background-color: ${t.palette.content.contrast};
        `;break;case o.Thumbnail:a+=`
          color: ${t.palette.content.contrast};
          background-color: ${t.palette.primary.default};
        `;break;case o.Photo:a+=`
          & > * {
            width: 100%;
            height: 100%;
            border-radius: ${t.radius.radius_500};
          }
        `;break}return a}}
`;export{o as A,n as a};
