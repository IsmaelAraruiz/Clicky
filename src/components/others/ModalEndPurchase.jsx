import React, { useState } from 'react'
import Modal from 'react-modal';
import Swal from 'sweetalert2';


const ModalEndPurchase = ({ isOpen, onRequestClose, onSubmit }) => {

    //! States 
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validar el número de teléfono
        const phoneRegex = /^\d{9}$/; 
        if (!phoneRegex.test(phone)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El número de teléfono debe tener 9 dígitos sin espacios.',
                confirmButtonText: 'OK'
            });
            return;
        }

        if (email === confirmEmail) {
            onSubmit({ name, lastName, email, phone });
            onRequestClose();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Emails do not match!',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Order Information"
            className="modal-content"
            overlayClassName="modal-overlay"
            ariaHideApp={false}
        >
            <h2 className='modal-title'>Complete your Order</h2>
            <form onSubmit={handleSubmit} className='form-modal'>
                <input
                    type="text"
                    name='name'
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='input-field'
                    required
                />
                <input
                    type="text"
                    name='lastName'
                    placeholder='Last Name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className='input-field'
                    required
                />
                <input
                    type="number"
                    name='phone'
                    placeholder='Ej: 9 53635246'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className='input-field'
                    required
                />
                <input
                    type="email"
                    name='email'
                    placeholder='ejemplo@gmail.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='input-field'
                    required
                />
                <input
                    type="email"
                    name='confirmEmail'
                    placeholder='Confirm Email'
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    className='input-field'
                    required
                />
                <button type='submit' className='btn-submit'>Submit</button>
                <button type='button' onClick={onRequestClose} className='btn-cancel'>Cancel</button>
            </form>
        </Modal>


    )
}

export default ModalEndPurchase