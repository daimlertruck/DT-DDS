var v=Object.defineProperty;var a=(n,r)=>v(n,"name",{value:r,configurable:!0});import{j as e}from"./jsx-runtime-Cgz2XvFB.js";import{r as k}from"./index-CwbBKW39.js";import{C as s}from"./Checkbox-D9udkHMJ.js";import"./Icon-BWIy_dZb.js";import"./emotion-styled.browser.esm-CIRWz9XU.js";const A={title:"Data Display/Checkbox",component:s,argTypes:{size:{control:"radio",options:["small","large"],description:"Size variant of the checkbox"},isChecked:{control:"boolean",description:"Controlled checked state"},isDisabled:{control:"boolean",description:"Whether the checkbox is disabled"},isIndeterminate:{control:"boolean",description:"Whether the checkbox is in an indeterminate state"},hasError:{control:"boolean",description:"Whether the checkbox is in an error state"},label:{control:"text",description:"Label text for the checkbox"}},args:{size:"large",isDisabled:!1,isIndeterminate:!1,hasError:!1,isChecked:!1}},i={args:{label:"Checkbox label"},render:a(n=>{const r=a(()=>{const[l,t]=k.useState(n.isChecked);return e.jsx(s,{...n,isChecked:l,onChange:a(c=>t(c.target.checked),"onChange")})},"CheckboxWrapper");return e.jsx(r,{})},"render"),parameters:{docs:{source:{code:`
          const [checked, setChecked] = useState(false);

          return (
            <Checkbox
              label="Checkbox label"
              isChecked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
          );`,language:"tsx"}}}},d={render:a(n=>{const r=a(()=>{const[l,t]=k.useState(!0),[c,b]=k.useState(!1),D=a(()=>{l?(t(!1),b(!0)):c?b(!1):t(!0)},"handleChange");return e.jsx(s,{...n,isChecked:c,isIndeterminate:l,label:"Indeterminate → Checked → Unchecked",onChange:D})},"CheckboxWrapper");return e.jsx(r,{})},"render"),parameters:{docs:{source:{code:`
          const [indeterminate, setIndeterminate] = useState(true);
          const [checked, setChecked] = useState(false);

          const handleChange = () => {
            if (indeterminate) {
              setIndeterminate(false);
              setChecked(true);
            } else if (checked) {
              setChecked(false);
            } else {
              setIndeterminate(true);
            }
          };

          return (
            <Checkbox
              isChecked={checked}
              isIndeterminate={indeterminate}
              label="Indeterminate → Checked → Unchecked"
              onChange={handleChange}
            />
          );`,language:"tsx"}}}},h={render:a(()=>e.jsxs("div",{style:{display:"flex",gap:"40px"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx("h3",{style:{margin:"0 0 8px 0"},children:"Large"}),e.jsx(s,{isChecked:!0,label:"Checked",size:"large"}),e.jsx(s,{isChecked:!1,label:"Unchecked",size:"large"}),e.jsx(s,{isIndeterminate:!0,label:"Indeterminate",size:"large"}),e.jsx(s,{isChecked:!0,isDisabled:!0,label:"Checked disabled",size:"large"}),e.jsx(s,{isChecked:!1,isDisabled:!0,label:"Unchecked disabled",size:"large"}),e.jsx(s,{hasError:!0,isChecked:!0,label:"Checked error",size:"large"}),e.jsx(s,{hasError:!0,isChecked:!1,label:"Unchecked error",size:"large"}),e.jsx(s,{hasError:!0,isIndeterminate:!0,label:"Indeterminate error",size:"large"})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx("h3",{style:{margin:"0 0 8px 0"},children:"Small"}),e.jsx(s,{isChecked:!0,label:"Checked",size:"small"}),e.jsx(s,{isChecked:!1,label:"Unchecked",size:"small"}),e.jsx(s,{isIndeterminate:!0,label:"Indeterminate",size:"small"}),e.jsx(s,{isChecked:!0,isDisabled:!0,label:"Checked disabled",size:"small"}),e.jsx(s,{isChecked:!1,isDisabled:!0,label:"Unchecked disabled",size:"small"}),e.jsx(s,{hasError:!0,isChecked:!0,label:"Checked error",size:"small"}),e.jsx(s,{hasError:!0,isChecked:!1,label:"Unchecked error",size:"small"}),e.jsx(s,{hasError:!0,isIndeterminate:!0,label:"Indeterminate error",size:"small"})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx("h3",{style:{margin:"0 0 8px 0"},children:"Without Labels"}),e.jsx(s,{"aria-label":"Large checked",isChecked:!0,size:"large"}),e.jsx(s,{"aria-label":"Large unchecked",isChecked:!1,size:"large"}),e.jsx(s,{"aria-label":"Small checked",isChecked:!0,size:"small"}),e.jsx(s,{"aria-label":"Small unchecked",isChecked:!1,size:"small"})]})]}),"render")},o={render:a(()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx("h3",{style:{margin:"0 0 8px 0"},children:"Label Wrapping Behavior"}),e.jsx("p",{style:{fontSize:"14px",color:"#666",margin:"0 0 10px 0"},children:"We recommend checkbox labels being fewer than three words or 60 characters. Long labels may wrap to a second line."}),e.jsx(s,{isChecked:!0,label:"Short label"}),e.jsx(s,{isChecked:!1,label:"This is a moderately long checkbox label"}),e.jsx(s,{isChecked:!1,label:"Small checkbox with a long label that also wraps",size:"small"})]}),"render")};var C,x,m;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    label: 'Checkbox label'
  },
  render: args => {
    const CheckboxWrapper = () => {
      const [checked, setChecked] = useState(args.isChecked);
      return <Checkbox {...args} isChecked={checked} onChange={e => setChecked(e.target.checked)} />;
    };
    return <CheckboxWrapper />;
  },
  parameters: {
    docs: {
      source: {
        code: \`
          const [checked, setChecked] = useState(false);

          return (
            <Checkbox
              label="Checkbox label"
              isChecked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
          );\`,
        language: 'tsx'
      }
    }
  }
}`,...(m=(x=i.parameters)==null?void 0:x.docs)==null?void 0:m.source}}};var p,g,u;d.parameters={...d.parameters,docs:{...(p=d.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: args => {
    const CheckboxWrapper = () => {
      const [indeterminate, setIndeterminate] = useState(true);
      const [checked, setChecked] = useState(false);
      const handleChange = () => {
        if (indeterminate) {
          setIndeterminate(false);
          setChecked(true);
        } else if (checked) {
          setChecked(false);
        } else {
          setIndeterminate(true);
        }
      };
      return <Checkbox {...args} isChecked={checked} isIndeterminate={indeterminate} label='Indeterminate → Checked → Unchecked' onChange={handleChange} />;
    };
    return <CheckboxWrapper />;
  },
  parameters: {
    docs: {
      source: {
        code: \`
          const [indeterminate, setIndeterminate] = useState(true);
          const [checked, setChecked] = useState(false);

          const handleChange = () => {
            if (indeterminate) {
              setIndeterminate(false);
              setChecked(true);
            } else if (checked) {
              setChecked(false);
            } else {
              setIndeterminate(true);
            }
          };

          return (
            <Checkbox
              isChecked={checked}
              isIndeterminate={indeterminate}
              label="Indeterminate → Checked → Unchecked"
              onChange={handleChange}
            />
          );\`,
        language: 'tsx'
      }
    }
  }
}`,...(u=(g=d.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var f,z,j;h.parameters={...h.parameters,docs:{...(f=h.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '40px'
  }}>
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
        <h3 style={{
        margin: '0 0 8px 0'
      }}>Large</h3>
        <Checkbox isChecked label='Checked' size='large' />
        <Checkbox isChecked={false} label='Unchecked' size='large' />
        <Checkbox isIndeterminate label='Indeterminate' size='large' />
        <Checkbox isChecked isDisabled label='Checked disabled' size='large' />
        <Checkbox isChecked={false} isDisabled label='Unchecked disabled' size='large' />
        <Checkbox hasError isChecked label='Checked error' size='large' />
        <Checkbox hasError isChecked={false} label='Unchecked error' size='large' />
        <Checkbox hasError isIndeterminate label='Indeterminate error' size='large' />
      </div>

      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
        <h3 style={{
        margin: '0 0 8px 0'
      }}>Small</h3>
        <Checkbox isChecked label='Checked' size='small' />
        <Checkbox isChecked={false} label='Unchecked' size='small' />
        <Checkbox isIndeterminate label='Indeterminate' size='small' />
        <Checkbox isChecked isDisabled label='Checked disabled' size='small' />
        <Checkbox isChecked={false} isDisabled label='Unchecked disabled' size='small' />
        <Checkbox hasError isChecked label='Checked error' size='small' />
        <Checkbox hasError isChecked={false} label='Unchecked error' size='small' />
        <Checkbox hasError isIndeterminate label='Indeterminate error' size='small' />
      </div>

      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
        <h3 style={{
        margin: '0 0 8px 0'
      }}>Without Labels</h3>
        <Checkbox aria-label='Large checked' isChecked size='large' />
        <Checkbox aria-label='Large unchecked' isChecked={false} size='large' />
        <Checkbox aria-label='Small checked' isChecked size='small' />
        <Checkbox aria-label='Small unchecked' isChecked={false} size='small' />
      </div>
    </div>
}`,...(j=(z=h.parameters)==null?void 0:z.docs)==null?void 0:j.source}}};var I,y,S;o.parameters={...o.parameters,docs:{...(I=o.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      <h3 style={{
      margin: '0 0 8px 0'
    }}>Label Wrapping Behavior</h3>
      <p style={{
      fontSize: '14px',
      color: '#666',
      margin: '0 0 10px 0'
    }}>
        We recommend checkbox labels being fewer than three words or 60
        characters. Long labels may wrap to a second line.
      </p>
      <Checkbox isChecked label='Short label' />
      <Checkbox isChecked={false} label='This is a moderately long checkbox label' />
      <Checkbox isChecked={false} label='Small checkbox with a long label that also wraps' size='small' />
    </div>
}`,...(S=(y=o.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};const B=["Default","IndeterminateToggle","AllSizesAndStates","LongLabelWrapping"];export{h as AllSizesAndStates,i as Default,d as IndeterminateToggle,o as LongLabelWrapping,B as __namedExportsOrder,A as default};
