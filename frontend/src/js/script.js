let bannerPhoneMask, questionPhoneMask, modalPhoneMask = false
$(document).ready(function (){
  let bannerPhoneInput = document.querySelector(".callback-form__input");
  let questionPhoneInput = document.querySelector("#question_phone");
  let modalPhoneInput = document.querySelector("#modal_phone");
  bannerPhoneMask = new IMask(bannerPhoneInput, {
    mask: "+{7}(000)000-00-00",
    lazy: false
  });
  questionPhoneMask = new IMask(questionPhoneInput, {
    mask: "+{7}(000)000-00-00",
    lazy: false
  });
  modalPhoneMask = new IMask(modalPhoneInput, {
    mask: "+{7}(000)000-00-00",
    lazy: false
  });

  // open/close return call modal
  $('.header__button, .model-item__button--red, .model-item__button--white').on('click', function(){
    clearErrors()
    $('.modal-return-call-inner').on('click', function(event){
      event.stopPropagation()
    })
    $('.modal-return-call-outer').addClass('active').on('click', function(){
      $(this).removeClass('active')
      $('#modal_name, #modal_phone').val('').focus().blur()  // clear input
    })
  })
  // close modal by close button
  $('.close-button').on('click', function(){
    $('.modal-return-call-outer').removeClass('active')
    $('#modal_name, #modal_phone').val('').focus().blur()  // clear input
  })
})
// send data to the server from modal
async function sendDataModal(formData){
  if(!modalPhoneMask.masked.isComplete){
    clearErrors()
    $('.modal-return-call-errors').append('<div>phone number is not complete</div>')
    return
  }
  clearErrors()

  const res = await fetch('http://backend/callme', {
    method: 'POST',
    body: formData
  })
  const data = await res.json()

  $('.modal-return-call-outer').removeClass('active')

  if(data === 'success'){
    $('#modal_name, #modal_phone').val('').focus().blur()  // clear input
    $('.modal-success-send-inner').on('click', function(event){
      event.stopPropagation()
    })
    $('.modal-success-send-outer').addClass('active').on('click', function(){
      $(this).removeClass('active')
    })
    $('.modal-success-send__button').on('click', function(){
      $('.modal-success-send-outer').removeClass('active')
      $('.modal-success-send__button').off('click')
    })
  } else if(data === 'fail'){
    $('.modal-fail-send-inner').on('click', function(event){
      event.stopPropagation()
    })
    $('.modal-fail-send-outer').addClass('active').on('click', function(){
      $(this).removeClass('active')
    })
    $('.modal-fail-send__button').on('click', function(){
      $('.modal-fail-send-outer').removeClass('active')
      $('.modal-return-call-outer').addClass('active')
      $('.modal-fail-send__button').off('click')
    })
  }
}
// send data to the server from page
async function bannerSendData(formData){
  if($('.questions__button').text() === 'Отправлено'
  || $('.callback-form__button').text() === 'Отправлено'
  || !bannerPhoneMask.masked.isComplete){
    return
  }

  const res = await fetch('http://backend/callme', {
    method: 'POST',
    body: formData
  })
  const data = await res.json()
  $('.callback-form__input').val('').focus().blur()  // clear input

  // if success
  if(data === 'success'){
    $('.questions__button').css('background-color', '#0FB551').html('Отправлено')
    $('.callback-form__button').css('background-color', '#0FB551').html('Отправлено')
  }
}
async function questionSendData(formData){
  if($('.questions__button').text() === 'Отправлено'
  || $('.callback-form__button').text() === 'Отправлено'
  || !questionPhoneMask.masked.isComplete){
    return
  }

  const res = await fetch('http://backend/callme', {
    method: 'POST',
    body: formData
  })
  const data = await res.json()
  $('#question_name, #question_phone').val('').focus().blur()  // clear input

  // if success
  if(data === 'success'){
    $('.questions__button').css('background-color', '#0FB551').html('Отправлено')
    $('.callback-form__button').css('background-color', '#0FB551').html('Отправлено')
  }
}
// remove errors in modal form
function clearErrors(){
  $('.modal-return-call-errors').children().remove()
}
// clear form
function removeFormValues(){
  $('.custom-large-button__input-name, .input-phone, #modal_phone').val('').focus().blur()
}