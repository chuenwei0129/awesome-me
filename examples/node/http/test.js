const body = document.querySelector('body')
const btn = document.querySelector('#button')
const p = document.querySelector('p')
const ul = document.querySelector('ul')
const userid = document.querySelector('#userid')
const searchid = document.querySelector('#searchid')
const addbtn = document.querySelector('#addbtn')
const username = document.querySelector('#username')

body.style.backgroundColor = 'red'

btn.addEventListener('click', () => {
	const xhr = new XMLHttpRequest()
	xhr.open('get', '/clock')
	xhr.onreadystatechange = function () {
		if (this.readyState === 4) {
			if (this.status === 200) {
				p.innerHTML = xhr.response
			}
		}
	}
	xhr.send()
})

window.onload = function () {
	fetch('/user', {
		method: 'GET',
	})
		.then((res) => {
			return res.json()
		})
		.then((data) => {
			let users = ''
			// 渲染li
			data.forEach(({ username, id }) => {
				users += `
				<li>
					<span>${username}</span>
					<button class="${id}">删除用户</button>
				 	<button id="${id}">编辑用户名</button>
				</li>`
			})
			ul.innerHTML = users
		})
}

searchid.addEventListener('click', function () {
	fetch(userid.value && `/user?id=${userid.value}`)
		.then((res) => res.json())
		.catch(() => {
			alert('当前用户不存在')
		})
		.then(({ username, id }) => {
			ul.innerHTML = `
				<li>
					<span>${username}</span>
					<button class="${id}">删除用户</button>
				 	<button id="${id}">编辑用户名</button>
				</li>`
		})
})

addbtn.addEventListener('click', function () {
	username.value &&
		fetch('/user', {
			method: 'POST',
			body: JSON.stringify({ username: username.value }),
		})
			.then((res) => res.json())
			.then(({ username, id }) => {
				const li = document.createElement('li')
				li.innerHTML = `
				<span>${username}</span>
				<button class="${id}">删除用户</button>
				<button id="${id}">编辑用户名</button>
			`
				ul.appendChild(li)
			})
})

ul.addEventListener('click', function (e) {
	if (e.target.className) {
		fetch('/user', {
			method: 'DELETE',
			body: JSON.stringify({ id: e.target.className }),
		})
			.then((res) => res.json())
			.then(() => {
				window.onload()
			})
	} else if (e.target.id) {
		let username = prompt(
			'请输入新的用户名？',
			`${e.target.parentNode.firstElementChild.textContent}`
		)
		username &&
			fetch('/user', {
				method: 'PUT',
				body: JSON.stringify({ username, id: e.target.id }),
			})
				.then((res) => res.json())
				.then(() => {
					window.onload()
				})
	}
})
