import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { DeleteFeed } from '../actions/feedrowlist';
import { postFlagChange, postFieldToggle, postFilterChange } from '../actions/feedrow';
import { connect } from 'react-redux';


class FeedRow extends Component {

	
	onDeleteClick() {
		const { id, active } = this.props;
		
		this.props.DeleteFeed(id, active);
	}
	onToggleStaticClick() {
		const { id } = this.props;
	
		var val = this.activeStaticVal.checked  ? 1 : 0;
		this.props.postFlagChange("static", val, id);
	}

	onSubmitFilter() {
		const { id } = this.props;
		this.props.postFilterChange(this.inputFilter.value, id);
	}

	onToggleClick() {
		const { id } = this.props;
		var feedobj = 
			{   
				feed_id: id,
				active: this.props.active,
				feedurl : this.props.url,
				name : this.props.text
			};
		this.props.postFieldToggle(feedobj);
	}
	

	render() {

		var feedrow_style = {
			width: '600px'
		}

		var feedrow_style_name = {
			width: '300px'
		}
	
		return ( 
		<tr >
			
			<td style={feedrow_style_name}>
				{this.props.text}
			</td>
			<td style={feedrow_style}>
				{this.props.url}
			</td>
			<td>
				<input type="checkbox"
					onClick={this.onToggleClick.bind(this)}
					ref={(input) => { this.activeVal = input }} 
					defaultChecked={this.props.active}
				/>
				
			</td>
			<td>
					<input
						style={{width: "240px", float: "left"}}
						placeholder="Enter Comma-Delimited Strings"
						className="form-control"
						defaultValue={this.props.filterout}
						ref={el => this.inputFilter = el}
					/>

					<button
						
						className="btn btn-primary"
						onClick={this.onSubmitFilter.bind(this)}
					>
						Save

					</button>
			</td>

				<td>
					<input type="checkbox"
						onClick={this.onToggleStaticClick.bind(this)}
						ref={(input) => { this.activeStaticVal = input }}
						defaultChecked={this.props.static}
					/>

				</td>

			<td>
					<button
						className="btn btn-danger float-left"
						onClick={this.onDeleteClick.bind(this)}
					>
					Delete
					</button>
			</td>

		</tr>
		);
	}
}


FeedRow.propTypes = {
	id: React.PropTypes.number.isRequired,
	active: React.PropTypes.bool.isRequired
  }



function mapDispatchToProps(dispatch) {
	return bindActionCreators({ DeleteFeed, postFlagChange, postFieldToggle, postFilterChange }, dispatch);
}


export default connect(null, mapDispatchToProps)(FeedRow);
