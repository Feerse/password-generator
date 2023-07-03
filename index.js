let passwordLength = document.getElementById('passwordLength');
let password = document.getElementById('password');
let saveButton = document.getElementById('saveButton');
let copyButton = document.getElementById('copyButton');
let form = document.getElementById('formId');

let lowerCheck = document.getElementById('lowercaseCheck');
let upperCheck = document.getElementById('uppercaseCheck');
let numbersCheck = document.getElementById('numbersCheck');
let symbolsCheck = document.getElementById('symbolsCheck');

function generatePassword(length) {
	const charSets = [
		lowerCheck.checked ? 'abcdefghijklmnopqrstuvwxyz' : '',
		upperCheck.checked ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '',
		numbersCheck.checked ? '0123456789' : '',
		symbolsCheck.checked ? "!@#$%^&*()_+=-{}[]';?.,<>~`" : '',
	];
	let generator = '';

	if (
		!lowerCheck.checked &&
		!upperCheck.checked &&
		!numbersCheck.checked &&
		!symbolsCheck.checked
	) {
		generator = '';
		return generator;
	}

	const data = charSets.join('');

	for (let i = 0; i < length; i++) {
		generator += data[~~(Math.random() * data.length)];
	}

	console.log(generator);
	return generator;
}

function getPassword() {
	const newPassword = generatePassword(passwordLength.value);
	password.value = newPassword;
	if (newPassword) {
		copyButton.disabled = false;
		saveButton.classList.remove('disabled');
	} else {
		copyButton.disabled = true;
		saveButton.classList.add('disabled');
	}
}

const copyPassword = async () => {
	try {
		await navigator.clipboard.writeText(password.value);
		alert('Password copied to clipboard!');
	} catch (err) {
		alert('Failed to copy: ', err);
	}
};

const savePassword = () => {
	saveButton.setAttribute(
		'href',
		'data:text/plain;charset=utf-8,' + encodeURIComponent(password.value),
	);
	saveButton.setAttribute('download', 'password.txt');
};

// Preventing page refresh
function submitForm(event) {
	event.preventDefault();
}
form.addEventListener('submit', submitForm);
