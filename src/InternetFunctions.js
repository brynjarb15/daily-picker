//import request from 'request';
import buildUrl from 'build-url';
import axios from 'axios';

function getAllNames(cb) {
	//let url = 'https://script.google.com/macros/s/AKfycbwV_Bw6shvkcPVE3eAHRe9fqg48haLJuAJqSWb8PYgqh1yoA84n/exec?';
	const url = process.env.REACT_APP_GOOGLE_URL;
	axios.get(url).then((res) => cb(res));

} function sendNewlyPickedPerson(name, cb) {
	//let url = 'https://script.google.com/macros/s/AKfycbwV_Bw6shvkcPVE3eAHRe9fqg48haLJuAJqSWb8PYgqh1yoA84n/exec?';
	const url = process.env.REACT_APP_GOOGLE_URL + '?name=' + name;
	axios.post(url).then((res) => console.log(res));
}

export { getAllNames, sendNewlyPickedPerson };