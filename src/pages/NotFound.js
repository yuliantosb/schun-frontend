import React from 'react';
import {Link} from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="text-center not-found">
            <h3 className="text-muted">404 Not Found</h3>
            <p>Your page seems don't appear, maybe you're typo</p>
            <br/>
            <Link to="/" className="btn btn-primary">Take Me Home</Link>
        </div>
    )
}

export default NotFound;