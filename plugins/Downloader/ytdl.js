import fetch from "node-fetch";

import axios from 'axios';
let handler = async (m, { q, conn, args, usedPrefix, command }) => {
  if (!q) return m.reply("Masukan link youtube");
  m.reply(wait);
  /*
  let api_y2mate = await fetch(
    `https://skizo.tech/api/y2mate?url=${q}O&apikey=officialdittaz`
  );
  let tech = await api_y2mate.json();
  let url = tech.video["720p"]
    ? tech.video["720p"]
    : tech.video["3600p"]
    ? tech.video["3600p"]
    : tech.video["240p"]
    ? tech.video["240p"]
    : null;
  if (!url) return "can't download video now, try again later";
  let resp = await fetch(url.url);
  if (/text|json/.test(resp.headers.get("content-type")))
    throw await resp.text();
  let y2mate_bf = await resp.buffer();

  conn.sendFile(m.chat, y2mate_bf, "", `*${tech.title}*`, m);

*/





  async function ytdlnew(videoUrl) {
    return new Promise(async (resolve, reject) => {
        try {
            const searchParams = new URLSearchParams();
            searchParams.append('query', videoUrl);
            searchParams.append('vt', 'mp3');
            
            const searchResponse = await axios.post(
                'https://tomp3.cc/api/ajax/search',
                searchParams.toString(),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Accept': '/',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                }
            );

            if (searchResponse.data.status !== 'ok') {
                throw new Error('Failed to search for the video.');
            }

            const videoId = searchResponse.data.vid;
            const videoTitle = searchResponse.data.title;
            const mp4Options = searchResponse.data.links.mp4;
            const mp3Options = searchResponse.data.links.mp3;
            const mediumQualityMp4Option = mp4Options[136]; 
            const mp3Option = mp3Options['mp3128']; 

            const mp4ConvertParams = new URLSearchParams();
            mp4ConvertParams.append('vid', videoId);
            mp4ConvertParams.append('k', mediumQualityMp4Option.k);
            
            const mp4ConvertResponse = await axios.post(
                'https://tomp3.cc/api/ajax/convert',
                mp4ConvertParams.toString(),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Accept': '/',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                }
            );

            if (mp4ConvertResponse.data.status !== 'ok') {
                throw new Error('Failed to convert the video to MP4.');
            }

            const mp4DownloadLink = mp4ConvertResponse.data.dlink;

            const mp3ConvertParams = new URLSearchParams();
            mp3ConvertParams.append('vid', videoId);
            mp3ConvertParams.append('k', mp3Option.k);
            
            const mp3ConvertResponse = await axios.post(
                'https://tomp3.cc/api/ajax/convert',
                mp3ConvertParams.toString(),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Accept': '/',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                }
            );

            if (mp3ConvertResponse.data.status !== 'ok') {
                throw new Error('Failed to convert the video to MP3.');
            }

            const mp3DownloadLink = mp3ConvertResponse.data.dlink;

            resolve({
                title: videoTitle,
                mp4DownloadLink,
                mp3DownloadLink
            });
        } catch (error) {
            reject('Error: ' + error.message);
        }
    });
}




let {title,mp4DownloadLink,mp3DownloadLink} = await ytdlnew(q)

if(q.endsWith('-mp4')){
  conn.sendMessage(m.chat,{video:{url:mp4DownloadLink}})
  //conn.sendFile(m.chat, mp4DownloadLink, "", `*${title}*`, m);
} else  conn.sendMessage(m.chat,{audio:{url:mp3DownloadLink}})







};
handler.help = ["chatgpt"];
handler.tags = ["internet", "ai", "gpt"];
handler.command = ["yt", "ytdl"];

export default handler;







  




