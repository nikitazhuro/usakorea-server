import axios from 'axios';
import * as dayjs from 'dayjs';

const sentry_chats = [1715992777, 323934151, 298938846];
const sentry_secret = '6422334794:AAHIFVI0pG5H9UAqVv9DGAZforNoqjgTnzU';

export const sendErrorToSentry = async (location: string, errorMsg: string) => {
  try {
    const fields = [
      `<b>Локация</b>: ${location}`,
      `<b>Ошибка</b>: ${errorMsg}`,
    ];
    const date = dayjs().format('DD.MM.YY, HH:mm');

    fields.push(`<b>Время</b>: ${date}`);

    let msg = '';
    fields.forEach((field) => {
      msg += field + '\n';
    });

    for (let i = 0; i < sentry_chats.length; i++) {
      const id = sentry_chats[i];
      await axios.post(
        `https://api.telegram.org/bot${sentry_secret}/sendMessage?chat_id=${id}&parse_mode=html&text=${msg}`,
      );
    }
  } catch (error) {
    console.log('sentry', error);
  }
};
