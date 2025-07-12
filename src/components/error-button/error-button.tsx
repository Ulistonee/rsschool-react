import { Component } from 'react';

type Props = {
  onClick?: () => void;
};

class ErrorButton extends Component<Props> {
  render() {
    return <button onClick={this.props.onClick}>throw error</button>;
  }
}

export default ErrorButton;
