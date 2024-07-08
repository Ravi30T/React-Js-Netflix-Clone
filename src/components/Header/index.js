import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {IoIosCloseCircle} from 'react-icons/io'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenu} from 'react-icons/md'

import MoviesContext from '../../context/MoviesContext'

import './index.css'

class Header extends Component {
  state = {smMenu: false, searchVal: ''}

  onClickSmMenuIcon = () => {
    this.setState({smMenu: true})
  }

  onClickSmMenuCloseIcon = () => {
    this.setState({smMenu: false})
  }

  onEnterSearchVal = event => {
    this.setState({searchVal: event.target.value})
  }

  onClickEnterKey = event => {
    const {searchVal} = this.state
    const {getSearchMovies} = this.props
    if (event.key === 'Enter' && searchVal !== '') {
      getSearchMovies(searchVal)
    }
  }

  onClickSearchBoxIcon = () => {
    const {searchVal} = this.state
    const {getSearchMovies} = this.props
    if (searchVal !== '') {
      getSearchMovies(searchVal)
    }
  }

  renderSearchLogic = () => {
    const {history} = this.props

    const path = history.location.pathname

    if (path === '/search') {
      return (
        <div className="search-box-container">
          <input
            type="search"
            className="search-box"
            onChange={this.onEnterSearchVal}
            onKeyDown={this.onClickEnterKey}
            placeholder="Search"
          />
          <div className="search-icon-container">
            <button
              type="button"
              testid="searchButton"
              className="search-box-icon"
              onClick={this.onClickSearchBoxIcon}
            >
              <HiOutlineSearch />
            </button>
          </div>
        </div>
      )
    }
    return (
      <div>
        <Link to="/search" className="search-bar-link-item">
          <button
            type="button"
            testid="searchButton"
            className="empty-search-icon"
          >
            <HiOutlineSearch />
          </button>
        </Link>
      </div>
    )
  }

  render() {
    const {smMenu} = this.state
    const {history} = this.props

    const path = history.location.pathname

    const homeActive = path === '/' && 'home-active'
    const popularActive = path === '/popular' && 'popular-active'
    const accountActive = path === '/account' && 'account-active'

    return (
      <nav className="lg-navbar-main-container">
        <ul className="navbar">
          <li className="lg-navbar-list-item">
            <div className="logo-tabs-container">
              <div className="navbar-logo-container">
                <Link to="/">
                  <img
                    src="https://res.cloudinary.com/dhvmbmaar/image/upload/v1718959127/MoviesApp/rgdwnrmlrenzm4rsz1us.png"
                    className="navbar-website-logo"
                    alt="website logo"
                  />
                </Link>
              </div>

              <div className="lg-tabs-container">
                <Link to="/">
                  <button type="button" className={`home-btn ${homeActive}`}>
                    Home
                  </button>
                </Link>

                <Link to="/popular">
                  <button
                    type="button"
                    className={`popular-btn ${popularActive}`}
                  >
                    {' '}
                    Popular{' '}
                  </button>
                </Link>
              </div>
            </div>

            <div className="lg-navbar-search-profile-container">
              <div className="search-box-profile-container">
                {this.renderSearchLogic()}

                <div className="profile-container">
                  <button type="button" className="profile-button">
                    <Link to="/account">
                      <img
                        src="https://res.cloudinary.com/dhvmbmaar/image/upload/v1719042780/Avatar_gnx6f2.png"
                        className="profile-avatar"
                        alt="profile"
                      />
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </li>

          <li className="sm-navbar-list-item">
            <div className="sm-navbar-logo-search-menu-container">
              <div className="navbar-logo-container">
                <Link to="/">
                  <img
                    src="https://res.cloudinary.com/dhvmbmaar/image/upload/v1718959127/MoviesApp/rgdwnrmlrenzm4rsz1us.png"
                    className="navbar-website-logo"
                    alt="website logo"
                  />
                </Link>
              </div>

              <div className="search-box-sm-menu-icon-container">
                {this.renderSearchLogic()}

                <MoviesContext.Consumer>
                  {value => {
                    const {onToggleSmMenu} = value

                    const smMenuClick = () => {
                      this.onClickSmMenuIcon()
                      onToggleSmMenu()
                    }
                    return (
                      <div className="sm-menu-button-container">
                        <button
                          type="button"
                          className="sm-menu-icon-button"
                          onClick={smMenuClick}
                        >
                          <MdMenu />
                        </button>
                      </div>
                    )
                  }}
                </MoviesContext.Consumer>
              </div>
            </div>

            {smMenu && (
              <div className="sm-menu-items-container">
                <div className="sm-home-popular-account-button-container">
                  <Link to="/">
                    <button type="button" className={`home-btn ${homeActive}`}>
                      Home
                    </button>
                  </Link>

                  <Link to="/popular">
                    <button
                      type="button"
                      className={`popular-btn ${popularActive}`}
                    >
                      {' '}
                      Popular{' '}
                    </button>
                  </Link>

                  <Link to="/account">
                    <button
                      type="button"
                      className={`account-btn ${accountActive}`}
                    >
                      Account
                    </button>
                  </Link>
                </div>

                <MoviesContext.Consumer>
                  {value => {
                    const {onToggleSmMenuClose} = value

                    const smMenuClose = () => {
                      this.onClickSmMenuCloseIcon()
                      onToggleSmMenuClose()
                    }
                    return (
                      <div className="sm-menu-close-container">
                        <button
                          type="button"
                          className="sm-menu-close-button"
                          onClick={smMenuClose}
                        >
                          <IoIosCloseCircle />
                        </button>
                      </div>
                    )
                  }}
                </MoviesContext.Consumer>
              </div>
            )}
          </li>
        </ul>
      </nav>
    )
  }
}
export default withRouter(Header)
