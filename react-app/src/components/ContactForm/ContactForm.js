import React from 'react';
import { string } from 'prop-types';

import {
    Title,
} from './styles';

function ContactForm ({
    title,
}) {
    return (
        <Title>{title}</Title>
    );
}

ContactForm.defaultProps = {
    title: "",
};

ContactForm.propTypes = {
    title: string,
};

export default ContactForm;
