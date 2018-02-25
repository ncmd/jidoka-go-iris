// RunbookField  contains logic to render runbook input 147
import React from 'react';
import Typography from 'material-ui/Typography';

export default ({ input, label, meta: { error, touched } }) => {
    return (
        <div>
            {/* Label */}
            <label style={{ marginLeft: '2%' }}>{label}</label>
            {/* User Input Fields */}
            <input
                {...input}
                style={{
                    marginBottom: '5px',
                    marginLeft: '2%',
                    marginRight: '2%',
                    width: '96%',
                }}
            />
            <Typography type="caption" style={{ color: 'red' }}>
                {/* Error below User Input */}
                <div
                    className="red-text"
                    style={{ marginBottom: '20px', marginLeft: '2%' }}
                >
                    {touched && error}
                </div>
            </Typography>
        </div>
    );
};

