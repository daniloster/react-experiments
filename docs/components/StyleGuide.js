import React from 'react';
import PropTypes from 'prop-types';
import Logo from 'rsg-components/Logo';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';

const xsmall = '@media (max-width: 600px)';

const styles = ({ font, base, light, link, linkHover, baseBackground, mq }) => ({
  root: {
    color: base,
    backgroundColor: baseBackground,
    width: '100%',
    overflowX: 'hidden',
    '& a': {
      '&, &:link, &:visited': {
        fontFamily: font,
        color: link,
      },
      '&:hover, &:active': {
        color: linkHover,
        cursor: 'pointer',
      },
    },
  },
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '51px',
    padding: '0 10px',
    color: '#fff',
    backgroundColor: '#274e75',
    alignItems: 'center',
    display: 'flex',
    fontFamily: font,
    zIndex: '1',
  },
  bar: {
    display: 'flex',
    alignItems: 'center',
    '& h1': {
      padding: '0 10px',
      fontFamily: '"Roboto", "Open Sans", "sans-serif"',
    },
    [xsmall]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  nav: {
    marginLeft: 'auto',
    marginRight: '-0.5em',
    [xsmall]: {
      margin: [[10, 0, 0]],
    },
  },
  footerLink: {
    '&, &:link, &:visited': {
      marginLeft: '0.5em',
      marginRight: '0.5em',
      fontFamily: font,
      color: link,
    },
    '&:hover, &:active': {
      color: linkHover,
      cursor: 'pointer',
    },
  },
  sidebar: {
    position: 'fixed',
    background: '#fafafa',
    boxSizing: 'border-box',
    top: '51px',
    left: 0,
    bottom: 0,
    minWidth: '230px',
    transition: 'all ease-out 300ms',
    zIndex: 1,
    boxShadow: '5px 7px 38px -8px',
    '& *': {
      boxSizing: 'border-box',
    },
    '& > div > div > div > ul': {
      overflowY: 'scroll',
      maxHeight: 'calc(100vh - 120px)',
    }
  },
  sidebarHidden: {
    transform: 'translateX(-100%)',
  },
  input: {
    boxSizing: 'border-box',
  },
  sidebarContent: {
    position: 'relative',
  },
  sidebarAnchor: {
    height: '30px',
    width: '30px',
    fontSize: '28px',
    fontWeight: '600',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    top: '50vh',
    left: '100%',
    zIndex: '1000',
    color: 'white',
    backgroundColor: '#274e75',
    borderRadius: '100px',
    boxSizing: 'border-box',
  },
  arrowRight: {
    width: '0',
    height: '0',
    borderTop: '7px solid transparent',
    borderBottom: '7px solid transparent',
    borderLeft: '7px solid white',
    display: 'block',
    margin: '8px 0px 8px 13px',
  },
  arrowLeft: {
    width: '0',
    height: '0',
    borderTop: '7px solid transparent',
    borderBottom: '7px solid transparent',
    borderRight: '7px solid white',
    display: 'block',
    margin: '8px 0px 8px 10px',
  },
  content: {
    maxWidth: '100%',
    padding: [[15, 30]],
    margin: [['51px', 'auto', 0, 'auto']],
    [mq.small]: {
      padding: 15,
    },
    display: 'block',
  },
  components: {
    overflow: 'auto', // To prevent the pane from growing out of the screen
  },
  footer: {
    display: 'block',
    color: light,
    fontFamily: font,
    fontSize: 12,
  },
});

export class StyleGuideRenderer extends React.Component {
  state = { isOpen: false };

  onToggleSidebar = () => {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  };

  render() {
    const { classes, title, homepageUrl, children, toc } = this.props;
    const { isOpen } = this.state;
    return (
      <div className={classes.root}>
        <header className={classes.header}>
          <Logo>{title}</Logo>
        </header>
        <section className={`${classes.sidebar} ${isOpen ? '' : classes.sidebarHidden}`}>
          <div className={classes.sidebarContent}>
            {toc}
            <i className={classes.sidebarAnchor} onClick={this.onToggleSidebar}>
              <i className={isOpen ? classes.arrowLeft : classes.arrowRight} />
            </i>
          </div>
        </section>
        <main className={classes.content}>
          {children}
          <footer className={classes.footer}>
            <nav className={classes.nav}>
              <a
                className={classes.footerLink}
                href="https://github.com/styleguidist/react-styleguidist/tree/master/docs"
              >
                Docs
              </a>
              <a
                className={classes.footerLink}
                href="https://github.com/styleguidist/react-styleguidist"
              >
                GitHub
              </a>
              <a className={classes.footerLink} href="https://gitter.im/styleguidist/styleguidist">
                Gitter
              </a>
            </nav>
            <Markdown text={`Generated with [React Styleguidist](${homepageUrl}) ❤️`} />
          </footer>
        </main>
      </div>
    );
  }
}

StyleGuideRenderer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  homepageUrl: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  toc: PropTypes.node,
};

StyleGuideRenderer.defaultProps = {
  toc: null,
};

export default Styled(styles)(StyleGuideRenderer);
