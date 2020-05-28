import React from "react";
import "./index.scss";
import Section from "../section/index";
import { Button } from "react-bootstrap";
import tasklistData from "../tasklist/tasklistData";
import Tasklist from "../tasklist/tasklist";
import RelatedList from "../relatedlist/relatedlist";

class Post extends React.Component {
	// const [file, setFile] = useState('');
	// const [preview, setPreview] = useState('');
	constructor(props) {
		super(props);

		this.state = {
			checkedItems: new Map(),
		};

		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e) {
		const item = e.target.name;
		const isChecked = e.target.checked;
		this.setState(prevState => ({
			checkedItems: prevState.checkedItems.set(item, isChecked),
		}));
	}

	render() {
		return (
			<div className="row">
				<div className="Post col-md-9 col-sm-12">
					<header className="Header">
						{this.props.image_file && (
							<img src={URL.createObjectURL(this.props.image_file)} />
						)}

						<div className="Text">
							<h4>{this.props.title}</h4>
							<h6>{this.props.description}</h6>
							{this.props.tags && (
								<div className="tags">
									{this.props.tags.split(",").map((item, index) => {
										return <span key={index + "__li"}>{item}</span>;
									})}
								</div>
							)}
						</div>
						<div className="postMenu">
							<Button
								variant="secondary"
								className="add_section_id"
								id="add_section_id"
								size="sm"
								onClick={() => this.props.addSection(this.props.num)}
							>
								+ section
							</Button>
							<Button
								variant="info"
								className="add_section_id"
								id="add_section_id"
								size="sm"
								onClick={() => this.props.toggleEditPost(this.props.num)}
							>
								Edit Post
							</Button>
							<Button
								variant="danger"
								className="add_section_id"
								id="add_section_id"
								size="sm"
								onClick={() => this.props.deletePost(this.props.num)}
							>
								Delete Post
							</Button>
						</div>
					</header>
					<div className="Content">
						{this.props.items.map((section, index) => {
							return (
								<Section
									key={`section-${index}`}
									image_file={section.image_file}
									num={index}
									tags={section.tags}
									postNum={this.props.num}
									editCard={this.props.editCard}
									pasteCard={this.props.pasteCard}
									copyCard={this.props.copyCard}
									deleteCard={this.props.deleteCard}
									addNote={this.props.addNote}
									deleteSection={this.props.deleteSection}
									toggleEditSection={this.props.toggleEditSection}
									addList={this.props.addList}
									addQA={this.props.addQA}
									title={section.title}
									desc={section.description}
									notes={section.notes}
									questions={section.questions}
									list={section.lists}
								/>
							);
						})}
					</div>
				</div>
				<div className="RightSide col-md-3 col-sm-12">
					<div className="TaskList">
						<h4 style={{ textAlign: "center", color: "#6c757d" }}>Task List</h4>
						<React.Fragment>
							{tasklistData.map(item => (
								<div key={item.key} className="RightSideList">
									<label>
										<Tasklist
											name={item.name}
											checked={this.state.checkedItems.get(item.name)}
											onChange={this.handleChange}
										/>
										{item.name}
									</label>
									<br />
								</div>
							))}
						</React.Fragment>
					</div>
					<div className="RelatedList">
						<h4 style={{ textAlign: "center", color: "#6c757d" }}>
							Related List
						</h4>
						<RelatedList />
					</div>
				</div>
			</div>
		);
	}
}

export default Post;
