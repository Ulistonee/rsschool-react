import { Component } from 'react';

type Props = null;
type State = { throwError: boolean };

class ErrorThrower extends Component<Props, State> {
  state: State = { throwError: false };

  a = 0;

  render() {
    if (this.state.throwError) {
      throw new Error('Manual error');
    }

    return (
      <button onClick={() => this.setState({ throwError: true })}>
        Throw Error
      </button>
    );
  }
}

export default ErrorThrower;
