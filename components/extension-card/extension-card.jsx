import * as React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import styles from './extension-card.module.css';

class ExtensionCard extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, ['handleClick']);
        this.state = { disabled: false, loading: true };
    }

    async componentDidMount () {
        console.log('componentDidMount');
        const getInstalled = new Promise((resolve, reject) => {
            const extensionChannel = new BroadcastChannel('extension');
            extensionChannel.postMessage({ action: 'get' });
            extensionChannel.addEventListener('message', (event) => {
                if (event.data.action === 'tell') {
                    this.setState({ disabled: event.data.data.includes(this.props.id) });
                    this.setState({ loading: false });
                }
            }, { once: true });
        });
        console.log('getInstalled');
        await getInstalled;
    }

    handleClick () {
        const extensionChannel = new BroadcastChannel('extension');
        extensionChannel.postMessage({
            action: 'add',
            extension: this.props.id,
            download: this.props.download
        });
        this.setState({ disabled: true });
    }

    getStatusText () {
        if (this.state.disabled) {
            return 'Installed';
        } else if (this.state.loading) {
            return 'Loading...';
        } else {
            return 'Install';
        }
    }        

    render () {
        return (
            <Box className={styles.box}>
                <Card className={styles.card}>
                    <Box className={styles.info}>
                    <Typography
                        sx={{ fontSize: 21 }}
                        color="text.primary"
                        className={styles.text}
                        align="center"
                    >
                        {this.props.name}
                    </Typography>
                    <Typography
                        sx={{ fontSize: 12 }}
                        color="text.secondary"
                        className={styles.text}
                        align="center"
                    >
                        {"Author: " + this.props.author}
                    </Typography>
                    </Box>
                    <Box className={styles.switch}>
                        <Button
                            variant="outlined"
                            onClick={this.handleClick}
                            disabled={this.state.disabled || this.state.loading}
                        >
                            {this.getStatusText()}
                        </Button>
                    </Box>
                </Card>
            </Box>
        );
    }
}

ExtensionCard.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    inset_icon: PropTypes.string
};

ExtensionCard.defaultProps = {
    id: 'example',
    name: 'Example Extension',
    author: 'Anonymous',
    inset_icon: 'https://raw.fastgit.org/SinanGentoo/oh-my-catblocks/master/assets/inset_icon.svg',
};

export default ExtensionCard;