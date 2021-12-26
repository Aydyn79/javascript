let text = "Rece'ntly, I’ve `been` “flying“, 'quite' a lot — 'for' the usual reasons"
const regex = /\b['“`]|['“`]\b/g
console.log(text.replace(regex, "\""))

//----------------------------------------------------- 1,2 задание
// let mylo = "Recemymail  I’ve `been` mymailquite' dmy-mail@mail.ru a my-mail — 'for' my1mail@mail.ru my.mail@mail.ru the my.mailmy-mail@mail.ru mymail@mail.ru reasons"
// const regmail = /(\bmy[-\.]?mail)@mail\.([a-z]{2,6}\b)/g
const regmail = /\b([a-z]{2})[-\.]?([a-z]{4})@([a-z]{4})\.([a-z]{2,6}\b)/g
// console.log(mylo.match(regmail))

// let tel = "+7(569)456-12378 7(569)456*12*37 +7(5569)456*12*37 +7(569)456-1237"
const telh = /(\B\+7)(\([0-9]{3}\))([0-9]{3}\-[0-9]{4})\b/g
// console.log(tel.match(telh))

// let name = "ivan иван иван+7(5569)456*12*37ан +7(569)456-1237ivan ив5ан"
const namer = /([a-z]|[а-я]\D){2,25}/g
// console.log(name.match(namer))




let data = {};
const form = document.getElementsByTagName('form')[0];
form.addEventListener('submit', getFormValue);

const name = form.querySelector('[name="user_name"]'), 
    phone = form.querySelector('[name="user_phone"]'), 
    email = form.querySelector('[name="user_mail"]')
	
function getFormValue(event) {
    event.preventDefault();    
	if (namer.test(name.value)){
		data['name']=name.value;
	} else {
		name.className = "alert";
		document.getElementById('name').innerText = 'укажите правильно имя'
	}
	if (telh.test(phone.value)){
		data['phone']=phone.value;
	} else {
		phone.className = "alert";
		document.getElementById('phone').innerText = 'укажите телефон в формате +7(000)000-0000'
	}
	if (regmail.test(email.value)){
		data['email']=email.value;
	} else {
		email.className = "alert";
		document.getElementById('mail').innerText = 'укажите мыло в формате mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru'
	}
	
	
}

console.log(data);