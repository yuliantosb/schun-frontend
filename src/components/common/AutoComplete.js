import React from 'react';
class AutoComplete extends React.Component {
    
    render() {
        return (
            <div>
                <input type="text" value={this.props.value} onChange={this.props.onChange} className="form-control form-control-lg" placeholder="barcode or name" />
                <div className="autocomplete">
                    {
                        this.props.data && this.props.data.map(item => {
                            return (
                                <span key={item._id} onClick={this.props.onGetValue} data-value={item.name} id={item._id}>{item.code} - {item.name}</span>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

}

export default AutoComplete;