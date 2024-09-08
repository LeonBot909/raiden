import fetch from 'node-fetch'
import axios from "axios";
let handler = async (m, { conn, text }) => {
	if (!text) throw "[!] Masukan teks."
	try {
		let anu = await getChat(text)

		m.reply(`${anu}`)
	} catch (e) {
		console.log(e)
		throw "Error, server disturbance" 
	}
	
}

handler.menuai = ["ai"]
handler.tagsai = ["openai"]
handler.command = ['bb','blackbox']

 

export default handler 

const getChat = (text) => {
	return new Promise(async (resolve, reject) => {
    await axios.post("https://www.useblackbox.io/chat-request-v4", {
      "textInput": text,
      "allMessages": [
        {
          "user": text
        }
      ],
      "stream": "",
      "clickedContinue": false
    })
    .then((response) => {
      resolve(response.data.response[0][0].trim())
    })
    .catch((e) => {
      resolve(e?.response)
    })
  })
}