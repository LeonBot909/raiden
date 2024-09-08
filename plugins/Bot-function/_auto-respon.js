import fetch from "node-fetch";
import axios from 'axios';



let handler = (m) => m;
handler.before = async function (m, { conn, command, q, prefix, isAccept }) {
  const chat = global.db.data.chats[m.chat];
  const numberQuery = q.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net`
  const Input = m.isGroup? m.mentionByTag[0]? m.mentionByTag[0] : m.mentionByReply ? m.mentionByReply : q? numberQuery : false : false
  const isSticker = m.type == "stickerMessage";
  const isCmd = m.body.startsWith(prefix);
  const allcommand = db.data.allcommand;
  const replyCommand = isCmd
    ? isCmd
    : allcommand.includes(toFirstCase(command));
  const isAudio = m.type == "audioMessage";

  const isReplySticker =
    m.type === "stickerMessage" && m.content.includes("stickerMessage");
  const isQuotedReplySticker =
    m.type === "stickerMessage" && m.content.includes("extendedTextMessage");
  const mentionByReplySticker =
    m.type == "stickerMessage" && m.message.stickerMessage.contextInfo != null
      ? m.message.stickerMessage.contextInfo.participant || ""
      : "";
  if (
    (m.isGroup &&
      chat.simi &&
      Input == m.botNumber &&
      !replyCommand &&
      !isAudio &&
      !isAccept &&
      !allcommand.includes(toFirstCase(command))) ||
    (m.isGroup &&
      chat.simi &&
      m.mentionByReplySticker == m.botNumber &&
      isSticker &&
      !replyCommand) ||
    (m.isGroup &&
      chat.simi &&
      (m.body.toLowerCase().includes(botName.toLowerCase()) ||
       m.body.toLowerCase().includes(botName.toLowerCase().substring(0, 3)))) ||  
      (!m.isGroup && (m.body.toLowerCase().includes(botName.toLowerCase()) ||
       m.body.toLowerCase().includes(botName.toLowerCase().substring(0, 3))))
  ) {


// Loop through the keys in the obj
for (let key in conn.game) {
  // Check if the key contains '1234' without 'lala-'
  if (key.includes(m.chat)) {
      // Add any additional logic here to halt the process if needed
      // For example, you might return from a function or throw an error
      return
  }
}




    await sleep(2000);
    conn.sendPresenceUpdate("composing", m.chat);








  //tutup group
  if ( m.body.includes('group') && m.body.includes('tutup') || m.body.includes('grup') && m.body.includes('tutup')) {
    if (!m.isBotAdmin) throw `Maaf, Aku bukan admin group ini. 😔`
    if (!m.isAdmin) throw `Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`

    await conn.groupSettingUpdate(m.chat, "announcement");
    return m.reply(`Oke, grup telah ditutup. Semoga lebih teratur ya~ 😉`);
  }

  //buka group
  if (m.body.includes('group') && m.body.includes('buka') || m.body.includes('grup') && m.body.includes('buka')) {
    if (!m.isBotAdmin) throw `Maaf, Aku bukan admin group ini. 😔`
    if (!m.isAdmin) throw `Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`

    await conn.groupSettingUpdate(m.chat, "not_announcement");
    return m.reply(`Oke, grup telah dibuka. Ayo kita beraktivitas bersama-sama! 🤗`);
  }















    if (isQuotedReplySticker || isReplySticker) {
      await sleep(2000);
      if(db.data.stickerBot == {}) {return}
      let namastc = Object.keys(db.data.stickerBot).getRandom();
      if(db.data.stickerBot[namastc]) conn.sendMessage(m.chat, {sticker: {url:db.data.stickerBot[namastc].link}}, {quoted:m })
    } else {
      let jawab = [
        "Afa iyah 🗿",
        "Oh",
        "Aku ga ngerti om 🐦",
        "Boong",
        "🗿",
        "🐦",
        "Oh gitu 🐦",
      ];
      let teks1 = jawab.getRandom();
      let teks2 = m.body;
      let hasil = [`${teks1}`, `${teks2}`];
      let random = hasil.getRandom();
      let kata = m.mentionByTag ? m.body.replace(m.mentionByTag, "") : m.body;
      let kato = [
        "Kenapa ?",
        "Ha ?",
        "Napa tag gua ?",
        "napa ?",
        "ya ?",
        "apa ?",
        "Hmm ?",
      ];
      let acak = kato.getRandom();
      if (kata == "")
        return conn.sendMessage(m.chat, { text: acak }, { quoted: m });
      const nana =
        /bjgn|babi|asu|anjing|tai|memek|kontol|bangsat|lonte|silet|tetek|pler|tempik|tempek|jembut|ngewe|kentu|titid/;
      //if(body.includes(nana)) {return}
      try {
        await sleep(1000);
        //try{
          let replacedString = kata.includes(botName) ? kata.replace(botName, 'simi') : kata.replace(botName.substring(0, 3), 'simi');
        var simi = await SimSimi(replacedString);
        //}catch(err){
        //let simi = await getMessage(kata.replace(botName, 'simi'), 'id')
        //}
        let teksnya = simi.replace(nana, "****");
        //if(simi.includes(nana)) return
        m.reply(teksnya);
      } catch (e) {
       // await conn.sendMessage(nomerOwner+"@s.whatsapp.net",{text: `${e}`})
        Log(e);
        await sleep(1000);
        m.reply(random);
      }
/*
      async function SimSimi(input) {
        try {
          let res = await fetch(
            "http://api.simsimi.com/request.p?key=ae752867-ab2f-4827-ab64-88aebed49a1c&lc=id&text=" +
              encodeURIComponent(input)
          );
          let json = await res.json();
          return json.response.replace("simi", botName);
        } catch (e) {
          throw "Erorr";
        }
      }
*/
 

async function SimSimi(yourMessage) {
  const res = await axios.post(
    "https://api.simsimi.vn/v2/simtalk",
    new URLSearchParams({
      text: yourMessage,
      lc: "id",
    })
  );

  if (res.status > 200) throw new Error(res.data.success);

  return res.data.message.replace("simi", botName);
}


    }
  }
};
export default handler;
