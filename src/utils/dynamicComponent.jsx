import PropTypes from "prop-types";
import { Component } from "react";

// 컴포넌트를 동적으로 로드할수 있도록 도와줍니다.
class DynamicImport extends Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired
  };

  state = {
    Loaded: null
  };

  componentDidMount() {
    const { load } = this.props;
    load().then(component => {
      this.setState(() => ({
        Loaded: component.default ? component.default : component
      }));
    });
  }

  render() {
    const { children } = this.props;
    const { Loaded } = this.state;
    const DNcompoent = Loaded;
    return children(DNcompoent);
  }
}

export default DynamicImport;
