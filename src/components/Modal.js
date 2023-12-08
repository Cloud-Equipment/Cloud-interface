import React from 'react'

function Modal(props) {
    return (
        <div>
            {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                {props.name}
            </button> */}

            <div class="modal fade modal-dialog  modal-dialog-centered" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        {/* <div class="modal-header">
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div> */}
                        <div class="modal-body EditBodyReport">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal