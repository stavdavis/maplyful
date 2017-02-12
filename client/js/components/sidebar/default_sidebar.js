import React from 'react';
import { hashHistory } from 'react-router';

const DefaultSidebar = (props) => {

  return (
    <div className="sidebar">
      <div className="sidebar-nav">
        <ul>
          <li> <button className="sidebar-nav-button" onClick={() => {props.displayTags()}}>{"Filter"}</button></li>
          <li> <button className="sidebar-nav-button">Users</button></li>
        </ul>
      </div>
      <div className="sidebar-inner-container">
        <div>
          {props.users.map((user) => {
            return (
              <ul className="user-info" key={user.id}>
                <img className="user-image" src={user.image} />
                <li className="user-name">{user.first_name}</li>
                <li className="user-bio">{user.bio}</li>
                <li><button className="see-user-city">See {user.first_name}{'\'s '}{props.city}</button></li>
                <li><button className="see-user-profile">See {user.first_name}{'\'s profile'}</button></li>
              </ul>
            )
          })}
          </div>
      </div>
    </div>
  )
}

export default DefaultSidebar;
