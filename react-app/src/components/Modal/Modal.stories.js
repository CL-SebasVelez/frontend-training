import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Modal from './Modal';

storiesOf('Modal', module)
    .add('with title', withInfo()(() => (
        <Modal title="Modal title" />
    )));
