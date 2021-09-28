import React from 'react';
import {FormattedMessage} from 'react-intl';

import tfabbitIconURL from './entry-icon.png';
import tfabbitInsetIconURL from './inset-icon.svg';
import tfabbitConnectionIconURL from './connection-icon.svg';
import tfabbitConnectionSmallIconURL from './connection-small-icon.svg';

const version = 'v1';

const translationMap = {
    'en': {
        'gui.extension.tfabbit.description': `Use tfabbit. (${version})`
    },
    'ja': {
        'gui.extension.tfabbit.description': `tfabbitを使う。 (${version})`
    },
    'ja-Hira': {
        'gui.extension.tfabbit.description': `ティーファブビットをつかう。 (${version})`
    }
};

const entry = {
    name: 'tfabbit',
    extensionId: 'tfabbit',
    //extensionURL: 'https://microbit-more.github.io/dist/microbitMore.mjs',
    collaborator: 'TFabWorks',
    iconURL: tfabbitIconURL,
    insetIconURL: tfabbitInsetIconURL,
    description: (
        <FormattedMessage
            //defaultMessage="Play with all functions of micro:bit."
            //description="Description for the 'Microbit More' extension"
            id="gui.extension.tfabbit.description"
        />
    ),
    featured: true,
    disabled: false,
    bluetoothRequired: false,
    internetConnectionRequired: false,
    launchPeripheralConnectionFlow: true,
    useAutoScan: false,
    connectionIconURL: tfabbitConnectionIconURL,
    connectionSmallIconURL: tfabbitConnectionSmallIconURL,
    connectingMessage: (
        <FormattedMessage
            defaultMessage="Connecting"
            description="Message to help people connect to tfabbit."
            id="gui.extension.microbit.connectingMessage"
        />
    ),
    helpLink: 'https://tfabworks.com/',
    translationMap: translationMap
};

export {entry}; // loadable-extension needs this line.
export default entry;
