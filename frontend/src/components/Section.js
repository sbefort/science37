const defaultStyles = {
  marginTop: '0',
  marginRight: '10px',
  marginBottom: '20px',
  marginLeft: '10px',
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
