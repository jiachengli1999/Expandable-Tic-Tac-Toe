import ReactModal from 'react-modal'
import React, { Component } from 'react';
import './MyModal.css'

class MyModal extends Component{
    render(){
        return(
            <ReactModal 
            isOpen={this.props.showModal} 
            onRequestClose={this.props.closeModal}
            ariaHideApp={false}
            className='Modal'>
                <div>Hello</div>
            </ReactModal>
        )
    }
}

export default MyModal