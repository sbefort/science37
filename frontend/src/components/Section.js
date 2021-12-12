const defaultStyles = {
  marginTop: '0',
  marginRight: '20px',
  marginBottom: '20px',
  paddingLeft: '20px',
};

const Section = ({ styles, children }) => (
  <section
    style={{
      ...defaultStyles,
      ...styles
    }}
  >
    {children}
  </section>
);

export default Section;
