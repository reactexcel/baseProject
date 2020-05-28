import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { TextArea } from "semantic-ui-react";
// import { Input } from "reactstrap";
import { useDispatch, connect } from "react-redux";
import * as Actions from "../../store/actions";
import * as post from "../../store/actions/post";

const Listitemeditmodal = props => {
	const { list_modal_show, list_edit_item, set_list_edit_item_index } = props;
	const [temtitle, setTemTitle] = useState([]);

	const dispatch = useDispatch();

	const modalClose = () => {
		dispatch(Actions.setListModalShow(false));
	};
	const handleChange = e => {
		setTemTitle(e.target.value);
		// dispatch(Actions.setListEditItem(e.target.value));
	};
	const savaChange = index => {
		dispatch(Actions.setListModalShow(false));
		dispatch(Actions.setListEditItemModal(temtitle, index));
		dispatch(
			post.editListItems(
				temtitle,
				set_list_edit_item_index,
				set_list_edit_item_index.p,
				set_list_edit_item_index.s,
				set_list_edit_item_index.i
			)
		);
		// setTemTitle([]);
	};
	return (
		<Modal show={list_modal_show} onHide={modalClose}>
			<Modal.Header closeButton>
				<Modal.Title>Edit List Item</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{/* <Input type="text" defaultValue={set_list_edit_item_index.content} onChange={handleChange} /> */}
				<TextArea
					className="w-100"
					defaultValue={set_list_edit_item_index.content}
					onChange={handleChange}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="primary"
					onClick={() => savaChange(set_list_edit_item_index.index)}
				>
					Save Changes
				</Button>
				<Button variant="secondary" onClick={modalClose}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

const mapStateToProps = state => {
	return {
		list_edit_item: state.Reducer.list_edit_item,
		set_list_edit_item_index: state.Reducer.set_list_edit_item_index,
		list_modal_show: state.Reducer.list_modal_show,
	};
};

export default connect(mapStateToProps, null)(Listitemeditmodal);
