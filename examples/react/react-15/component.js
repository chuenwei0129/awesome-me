export class Component {
	constructor(props) {
		this.props = props
	}
	setState(nextState) {
		this._currentUnit.update(null, nextState)
	}
}