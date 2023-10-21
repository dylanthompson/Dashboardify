/* eslint-disable */
import Dialog from './Dialog';

export default {
  title: "Dialog",
};

export const Default = () => <Dialog open={false} onClose={function (value: string): void {
  throw new Error('Function not implemented.');
} } />;

Default.story = {
  name: 'default',
};
