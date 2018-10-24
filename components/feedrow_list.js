import React, { Component } from 'react';
import  FeedRow from "./feedrow"
import { connect } from 'react-redux'
import { feedsFetchData } from '../actions/feedrowlist';
import { setFeedsLoaded }  from '../actions/set_data_loaded';
import { bindActionCreators } from 'redux';

class FeedRowList extends Component {

	componentDidMount() {
		if (this.props.hasLoaded === false ) {
			this.props.feedsFetchData();
			this.props.setFeedsLoaded();
		}
	}

	render() {
			return (
			<div>
				<p>Active</p>
				<table className="table-striped table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Feed URL</th>
							<th>Active</th>
							<th>Filter Out Episodes with this Text</th>
							<th>Static</th>
						</tr>

					</thead>
					<tbody>					
						{ this.props.feeds.map((row, i) => 
							<FeedRow key={row['feed_id']}
							id={row['feed_id']}
							text={row['name']}
							url={row['url']}
							filterout={row['filterout']}
							active={row['active']}
							static={row['static']}
							/>
						)}
					</tbody> 
				</table> 
			</div>
		)
    }
}

function mapStateToProps(state) {
	 return {
        feeds: state.feeds,
        hasErrored: state.feedsHasErrored,
		isLoading: state.feedsIsLoading,
		hasLoaded: state.intialFeedsLoadDone
    };
}


function mapDispatchToProps(dispatch) {
	return bindActionCreators ( { feedsFetchData, setFeedsLoaded }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(FeedRowList)
