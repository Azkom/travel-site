import $ from 'jquery';

class Modal {
    constructor() {
       this.openModalButton = $(".open-modal");
       this.modal = $(".modal");
       this.closeModalButton = $(".modal__close");
       this.events(); 
    }

    events(){
        //clicking the open modal button
        this.openModalButton.click(this.openModal.bind(this));

        // clicking the x close modal button
         this.closeModalButton.click(this.closeModal.bind(this));
        //  pushes any key  
        $(document).keyup(this.keyPressHandler.bind(this));
    }

    keyPressHandler(e){
        // The code of escape key is 27
        if (e.keyCode == 27){
            this.closeModal();
        }
    }

    openModal() {
        this.modal.addClass("modal--is-visble");
        return false;


    }

    closeModal() {
        this.modal.removeClass("modal--is-visble");

    } 


}

export default Modal;