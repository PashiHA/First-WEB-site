class PopUp{
    constructor(modal,modalImg){
        this.modal = modal;
        this.modalImg = modalImg;
        var popUp = this;
       this.open = function(content){
        modalImg.src = content.src;
        modal.style.display ="block";
       } 
       this.close = ()=>{
        modal.style.display ="none";
       } 
    }

}
  const galleryCard = document.querySelectorAll('.gallery-card')
  const galleryImages = document.querySelectorAll('.gallery-photo')
  const modal = document.querySelector(".modal")
  var modalImg = document.querySelector('.modalImage');
  const popup1 = new PopUp(modal,modalImg)

  for(let i=0;i<=galleryImages.length-1;i++){
    galleryImages[i].onclick = function() {
        popup1.open(this);
    }
  }
  galleryImages[0].onclick = function() {
    modal.style.display = 'block';
    console.log(this.src);
    modalImg.src = this.src;
  };
  popup1.modal.addEventListener('click', popup1.close)
  window.onclick = function(event) {
    if (event.target == modal) {
      popup1.close();
    }
  }