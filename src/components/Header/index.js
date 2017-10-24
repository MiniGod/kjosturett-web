import React, { PureComponent } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Container from '../Container';
import Countdown from '../Countdown';
import Link from '../../Link';
import s from './Header.scss';
import logo from '../../logo.svg';

class Header extends PureComponent {
  state = {
    isTop: true
  };
  componentDidMount() {
    window.addEventListener('scroll', this.scroll);
    this.scroll();
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scroll);
  }
  lastScrollPos = undefined;
  scroll = () => {
    const scroll = window.pageYOffset;
    if (this.lastScrollPos === scroll) {
      return;
    }

    this.lastScrollPos = scroll;
    this.setState({
      isTop: scroll < 50
    });
  };
  render() {
    const { isTop } = this.state;
    const { page } = this.props;
    return (
      <div>
        <div className={s.fake} />
        <header className={cx(s.root, !isTop && s.sticky)}>
          <Container>
            <div className={s.wrap}>
              <div className={s.leftWrap}>
                <Link href="/">
                  <img src={logo} className={s.logo} />
                </Link>
                <div className={cx(s.countdown)}>
                  <Countdown />
                </div>
              </div>
              <div className={s.links}>
                <Link
                  href="/"
                  className={cx(
                    s.politics,
                    page === 'flokkar' ? s.active : null
                  )}
                >
                  {/* <span className={s.politicsPrefix} /> */}
                  Flokkar
                </Link>

                <Link
                  href="/malefni/atvinnumal"
                  className={cx(page === 'malefni' ? s.active : null)}
                >
                  Málefni
                </Link>
                <Link
                  href="/kjorskra"
                  className={cx(page === 'kjorskra' ? s.active : null)}
                >
                  Kjörstaðir
                </Link>
                <Link
                  href="/kosningaprof"
                  className={cx(page === 'kosningaprof' ? s.active : null)}
                >
                  Kosningapróf
                </Link>
                <Link
                  className={cx(page === 'verkefnid' ? s.active : null)}
                  href={'/verkefnid'}
                >
                  <span className={s.politicsPrefix}>Um </span>verkefnið
                </Link>
              </div>
            </div>
          </Container>
        </header>
      </div>
    );
  }
}

export default withStyles(s)(Header);
