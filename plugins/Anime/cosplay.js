import axios from "axios";
let handler = async (m, { conn, command }) => {
  let wipu = (
    await axios.get(
      "https://raw.githubusercontent.com/Arya-was/endak-tau/main/cosplay.json"
    )
  ).data;
  let url = wipu[Math.floor(Math.random() * wipu.length)];
  let caption = "Nih";
  conn.sendMessage(m.chat, { image: { url }, caption }, { quoted: m });
};
handler.command = /^(cosplay)$/i;
handler.tags = ["anime"];
handler.help = ["cosplay"];

export default handler;
