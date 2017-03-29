import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postActionCreators from '../../../actions/post_request.js'
import * as syncActionCreators from '../../../actions/sync.js';
import SidebarPresentation from './sidebar_presentation';
import LocalDetailsDisplay from './local_details_display';
import LocationDetailsDisplay from './location_details_display';
import LocalsDisplay from './locals_display';
import TagsDisplay from './tags_display';

class NewSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { displayLocals: props.locals, displayTags: false, displayOneUser: props.oneLocal }
  }

  componentWillMount() {
    this.props.syncActionCreators.deselectUser();
  }

  showTagsView() { 
    this.setState({ displayLocals: false, displayTags: true, displayOneUser: false }); 
    this.props.postActionCreators.grabRelevantTags(this.props.filteredLocations);
  }

  showAllLocalsOrSingleLocal() {
    this.props.selectedUser ?
      this.setState({ displayLocals: false, displayTags: false, displayOneUser: true }) :
      this.setState({ displayLocals: true, displayTags: false, displayOneUser: false })
  }

  clearSelectedUser() {
    this.setState({ displayLocals: true, displayTags: false, displayOneUser: false });
    this.props.syncActionCreators.deselectUser();
  }

  selectLocalUser(user) {
    this.setState({ displayLocals: false, displayTags: false, displayOneUser: true });
    //fire off the actions filters that array
    // this.props.selectUserAndUpdateTags(user);
    this.props.syncActionCreators.filterLocationsForUser(user); 
    this.props.syncActionCreators.selectUser(user); 
  }

  render() {
    let display, navLocalsText, filterId, userIcon;
    const { selectedLocation, selectLocationById, relevantUsers, allTags, selectedTags, clearAllAppliedTags, filterByTag, selectedUser, tagsFilteredByUser, filteredTags } = this.props;
    if (selectedLocation) {
      display = <LocationDetailsDisplay
        locationInfo={selectedLocation}
        selectLocationById={selectLocationById} />
    } else if (this.state.displayLocals) {
      display = <LocalsDisplay
        city={'Portland'}
        users={relevantUsers}
        clearAllAppliedTags={clearAllAppliedTags}
        selectLocalUser={this.selectLocalUser.bind(this)} />
    } else if (this.state.displayTags) {
      display = <TagsDisplay
        tags={filteredTags}
        selected={selectedTags}
        clearAllAppliedTags={clearAllAppliedTags}
        filterByTag={filterByTag} />
    } else if (this.state.displayOneUser) {
      display = <LocalDetailsDisplay
        clearSelectedUser={this.clearSelectedUser.bind(this)}
        userInfo={selectedUser} />
    }

    return (
      <SidebarPresentation
        display={display}
        selectedTags={selectedTags}
        selectedUser={selectedUser}
        showTags={this.showTagsView.bind(this)}
        showAllOrSingle={this.showAllLocalsOrSingleLocal.bind(this)} />
    )
  }
}

   // tags={tagsFilteredByUser ? tagsFilteredByUser : allTags}

const mapStateToProps = (state) => ({
  relevantUsers: state.relevantUsers,
  selectedTags: state.selectedTags,
  allTags: state.allTags,
  filteredTags: state.filteredTags,
  selectedLocation: state.selectedLocation,
  selectedUser: state.selectedUser,
  tagsFilteredByUser: state.tagsFilteredByUser, 
  filteredLocations: state.filteredLocations
});

const mapDispatchToProps = dispatch => {
  return {
    postActionCreators: bindActionCreators(postActionCreators, dispatch),
    syncActionCreators: bindActionCreators(syncActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewSidebar);
