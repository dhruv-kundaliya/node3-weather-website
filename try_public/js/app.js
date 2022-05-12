

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message_1 = document.querySelector('#message-1')
const message_2 = document.querySelector('#message-2')

message_1.textContent = ''
message_2.textContent = ''

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    message_1.textContent = 'lodaing..'
    const location = search.value
    if (!location) {
        message_1.textContent = 'you must enter location'
    }else{
        fetch(`/weather?address=${location}`).then((response)=>{
            response.json().then((data)=>{
                if (data.error) {
                    message_1.textContent = data.error
                }
                else{
                    message_1.textContent = data.data
                    message_2.textContent = data.location
                }
            })
        })
    }
  
})