import { Scrollbar } from 'src/components/scrollbar';
import { ChannelItem } from './channel-item';
import { ChannelSearchToolbar } from './channel-search-toolbar';
import Box from '@mui/material/Box';
import { useCallback } from 'react';
import { useChannels } from 'src/actions/custom-campaigns';
import { endpoints } from 'src/utils/axios';
import { LoadingScreen } from 'src/components/loading-screen';
import { m } from 'framer-motion';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { PageNotFoundIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';

let Channeldata = [
  {
    channelId: 'UCSqjCCo7ay3vkdvWCbYa15w',
    title: 'La F1 dimenticata',
    description:
      'LA F1 DEI PICCOLI TEAM, DELLE IMPRESE IMPOSSIBILI E DELLA PASSIONE PURA.\nSiamo Andrea e Yuri, due appassionati che si sono incontrati per dar vita a questo canale, dove racconteremo la F1 dimenticata dai più.\n\nPer contatti: info@f1dimenticata.com\n',
    thumbnail:
      'https://yt3.ggpht.com/-vM-T9081YY8Tk3gpm2rr7Cg7a12fDkKtMWOIPO3N7faNfqSLaljXJUa-a0YmWnxFF8CeQbh=s800-c-k-c0x00ffffff-no-rj',
    img: {
      default: {
        url: 'https://yt3.ggpht.com/-vM-T9081YY8Tk3gpm2rr7Cg7a12fDkKtMWOIPO3N7faNfqSLaljXJUa-a0YmWnxFF8CeQbh=s88-c-k-c0x00ffffff-no-rj',
        width: 88,
        height: 88,
      },
      medium: {
        url: 'https://yt3.ggpht.com/-vM-T9081YY8Tk3gpm2rr7Cg7a12fDkKtMWOIPO3N7faNfqSLaljXJUa-a0YmWnxFF8CeQbh=s240-c-k-c0x00ffffff-no-rj',
        width: 240,
        height: 240,
      },
      high: {
        url: 'https://yt3.ggpht.com/-vM-T9081YY8Tk3gpm2rr7Cg7a12fDkKtMWOIPO3N7faNfqSLaljXJUa-a0YmWnxFF8CeQbh=s800-c-k-c0x00ffffff-no-rj',
        width: 800,
        height: 800,
      },
    },
    subscribersCount: '114.0K',
  },
  {
    channelId: 'UCbsCmBNSW6mf9DGW3g5VlNA',
    title: 'Formula 1 TOTAL',
    description:
      'FORMULA TOTAL 1\n\nAquí hablamos de la Formula 1 de otra manera: \n"Cortamos el árbol que nos quieren poner delante, y vemos el auténtico bosque de la Formula 1". \n\nMuchos habréis notado que los análisis de muchos canales y medios generalistas no hablan de lo que pensáis realmente, para todos vosotros he creado este canal. \n\nDonación Paypal:\nformula1total2022@gmail.com\n\nCANAL YOUTUBE DIRECTOS Y MUNDO MOTOR:\nhttps://www.youtube.com/channel/UCNIYY1T8-wU6JV_LikQR6zQ \n\nDIRECTOS SEMANALES (tenéis que darle a "activar notificaciones")\nhttps://www.twitch.tv/formula1_total\n\nCONTACTO:  Formula1total2022@gmail.com\n\nThis website is unofficial and is not associated in any way with the Formula 1 companies. F1, FORMULA ONE, FORMULA 1, FIA FORMULA ONE WORLD CHAMPIONSHIP, GRAND PRIX and related marks are trade marks of Formula One Licensing B.V.',
    thumbnail:
      'https://yt3.ggpht.com/PNChzeLdb2gcDdK8PgyIok-g94LStnhbZ9YDJqlINgExAPuyRSV0KT8PWS4Pe4gTyLlhOrwk5Mw=s800-c-k-c0x00ffffff-no-rj',
    img: {
      default: {
        url: 'https://yt3.ggpht.com/PNChzeLdb2gcDdK8PgyIok-g94LStnhbZ9YDJqlINgExAPuyRSV0KT8PWS4Pe4gTyLlhOrwk5Mw=s88-c-k-c0x00ffffff-no-rj',
        width: 88,
        height: 88,
      },
      medium: {
        url: 'https://yt3.ggpht.com/PNChzeLdb2gcDdK8PgyIok-g94LStnhbZ9YDJqlINgExAPuyRSV0KT8PWS4Pe4gTyLlhOrwk5Mw=s240-c-k-c0x00ffffff-no-rj',
        width: 240,
        height: 240,
      },
      high: {
        url: 'https://yt3.ggpht.com/PNChzeLdb2gcDdK8PgyIok-g94LStnhbZ9YDJqlINgExAPuyRSV0KT8PWS4Pe4gTyLlhOrwk5Mw=s800-c-k-c0x00ffffff-no-rj',
        width: 800,
        height: 800,
      },
    },
    subscribersCount: '154.0K',
  },
  {
    channelId: 'UCw3bFltc5gY-3KXyEtTHy7Q',
    title: 'F1 News - TacticalRab',
    description:
      'Formula 1 (F1) News - Updates, Rumors & Analysis\n\nFollow me on Twitter for updates: https://twitter.com/TacticalRab\n\nCDL Channel - Call of Duty esports: https://www.youtube.com/c/TacticalRab/\n\nVALORANT Channel: https://www.youtube.com/c/TRValorant/\n\nEmail: tacticalrab@breakingpoint.gg\n',
    thumbnail:
      'https://yt3.ggpht.com/XVHBDFIht6Y-yMp9SKmnprxR6psSf065xnPnkoykN07J-sxw2xN8ucoJbcHWpgdKtQtvP3gW4g=s800-c-k-c0x00ffffff-no-rj',
    img: {
      default: {
        url: 'https://yt3.ggpht.com/XVHBDFIht6Y-yMp9SKmnprxR6psSf065xnPnkoykN07J-sxw2xN8ucoJbcHWpgdKtQtvP3gW4g=s88-c-k-c0x00ffffff-no-rj',
        width: 88,
        height: 88,
      },
      medium: {
        url: 'https://yt3.ggpht.com/XVHBDFIht6Y-yMp9SKmnprxR6psSf065xnPnkoykN07J-sxw2xN8ucoJbcHWpgdKtQtvP3gW4g=s240-c-k-c0x00ffffff-no-rj',
        width: 240,
        height: 240,
      },
      high: {
        url: 'https://yt3.ggpht.com/XVHBDFIht6Y-yMp9SKmnprxR6psSf065xnPnkoykN07J-sxw2xN8ucoJbcHWpgdKtQtvP3gW4g=s800-c-k-c0x00ffffff-no-rj',
        width: 800,
        height: 800,
      },
    },
    subscribersCount: '54.2K',
  },
  {
    channelId: 'UCLVV1nin4PTVInUMWpqqC9A',
    title: 'ams.F1',
    description:
      'Infos zur Formel 1 aus erster Hand – von Michael Schmidt, Tobias Grüner, Andreas Haupt und Joel Lischka. Direkt aus dem Fahrerlager! Hintergründe zur Technik der Autos und Form der Piloten. Die kleinen und großen Geschichten rund um die Königsklasse des Motorsports. Das alles bekommt ihr von unserem Formel-1-Team serviert. auto motor und sport Formel 1 ist bei jedem Grand Prix mit zwei Reportern an der Rennstrecke – und spricht dort mit den wichtigsten Akteuren: Formel-1-Fahrer, Teamchefs und Ingenieuren. \n\n#formel1 #f1 \n\nAbonniert den Channel und aktiviert die Glocke, um immer auf dem Laufenden zu bleiben.\nWeitere Neuigkeiten findet ihr auch hier:\n\nWebsite: https://www.auto-motor-und-sport.de/formel-1/\nFacebook: https://www.facebook.com/automotorundsport/\nTwitter: https://twitter.com/amsonline\nIm TV: auto motor und sport channel\n\nImpressum\nMotor Presse Stuttgart GmbH\nLeuschnerstraße 1\n70174 Stuttgart\n\nTelefon: 0711/182-1267\nTelefax: 0711/182-2220\nE-Mail: redaktion_ams@motorpresse.de\n',
    thumbnail:
      'https://yt3.ggpht.com/B1CODqWgHzidAapUF2w8rgQ7b53Iqytv1zAkBkNnIVGfVT11qx_YwiGxlkRJ61R1AIgCOOnw96k=s800-c-k-c0x00ffffff-no-rj',
    img: {
      default: {
        url: 'https://yt3.ggpht.com/B1CODqWgHzidAapUF2w8rgQ7b53Iqytv1zAkBkNnIVGfVT11qx_YwiGxlkRJ61R1AIgCOOnw96k=s88-c-k-c0x00ffffff-no-rj',
        width: 88,
        height: 88,
      },
      medium: {
        url: 'https://yt3.ggpht.com/B1CODqWgHzidAapUF2w8rgQ7b53Iqytv1zAkBkNnIVGfVT11qx_YwiGxlkRJ61R1AIgCOOnw96k=s240-c-k-c0x00ffffff-no-rj',
        width: 240,
        height: 240,
      },
      high: {
        url: 'https://yt3.ggpht.com/B1CODqWgHzidAapUF2w8rgQ7b53Iqytv1zAkBkNnIVGfVT11qx_YwiGxlkRJ61R1AIgCOOnw96k=s800-c-k-c0x00ffffff-no-rj',
        width: 800,
        height: 800,
      },
    },
    subscribersCount: '15.9K',
  },
  {
    channelId: 'UCgDAnKZngqzL2sJHTI7eUuA',
    title: 'Telemetrico F1  Adrian Puente #TelemetricoF1',
    description:
      'Periodista | Especialista en Formula 1 | Tecnología | Precisión | Velocidad \n\nAdrián Puente F1 #telemetricof1 #f1 #formula1 #adrianpuente #gp \nIG • X (ex Twitter) • Twitch • TikTok: @telemetricof1 • Facebook @TelemetricoF1 \n\nFOX SPORTS 🇦🇷 TELEMETRICO \nLunes 22h  | Transmisiones de los Grandes Premios\nTransmisión de los GRANDES PREMIOS #envivo \n\nSpotify: Telemetrico F1\n#AdrianPuente #podcasts \n\nSpotify https://open.spotify.com/show/2Rvq4xaffyZWoSDBoctksw?si=13a66838aded4bd4\n',
    thumbnail:
      'https://yt3.ggpht.com/JEJFpkkAsBlfjVDGfPIZMH_EVdphL-ak0MH-iYHd-NlU5olZQJ-daU1k7q_4uC6ZBrNcWB0VVQ=s800-c-k-c0x00ffffff-no-rj',
    img: {
      default: {
        url: 'https://yt3.ggpht.com/JEJFpkkAsBlfjVDGfPIZMH_EVdphL-ak0MH-iYHd-NlU5olZQJ-daU1k7q_4uC6ZBrNcWB0VVQ=s88-c-k-c0x00ffffff-no-rj',
        width: 88,
        height: 88,
      },
      medium: {
        url: 'https://yt3.ggpht.com/JEJFpkkAsBlfjVDGfPIZMH_EVdphL-ak0MH-iYHd-NlU5olZQJ-daU1k7q_4uC6ZBrNcWB0VVQ=s240-c-k-c0x00ffffff-no-rj',
        width: 240,
        height: 240,
      },
      high: {
        url: 'https://yt3.ggpht.com/JEJFpkkAsBlfjVDGfPIZMH_EVdphL-ak0MH-iYHd-NlU5olZQJ-daU1k7q_4uC6ZBrNcWB0VVQ=s800-c-k-c0x00ffffff-no-rj',
        width: 800,
        height: 800,
      },
    },
    subscribersCount: '162.0K',
  },
  {
    channelId: 'UCd5AoKkUTG1A6yrX7c35tEg',
    title: 'F1 Teller ',
    description: 'CANAL DE FÓRMULA 1 PARA LOS AMANTES DE LA FÓRMULA 1 ',
    thumbnail:
      'https://yt3.ggpht.com/GZf8fFCyPHUKUZRG9mmXkm9uHpTazUNGVHnx75TxuV93doSmll1-axO-6X0yAwDWd3itr24R=s800-c-k-c0x00ffffff-no-rj',
    img: {
      default: {
        url: 'https://yt3.ggpht.com/GZf8fFCyPHUKUZRG9mmXkm9uHpTazUNGVHnx75TxuV93doSmll1-axO-6X0yAwDWd3itr24R=s88-c-k-c0x00ffffff-no-rj',
        width: 88,
        height: 88,
      },
      medium: {
        url: 'https://yt3.ggpht.com/GZf8fFCyPHUKUZRG9mmXkm9uHpTazUNGVHnx75TxuV93doSmll1-axO-6X0yAwDWd3itr24R=s240-c-k-c0x00ffffff-no-rj',
        width: 240,
        height: 240,
      },
      high: {
        url: 'https://yt3.ggpht.com/GZf8fFCyPHUKUZRG9mmXkm9uHpTazUNGVHnx75TxuV93doSmll1-axO-6X0yAwDWd3itr24R=s800-c-k-c0x00ffffff-no-rj',
        width: 800,
        height: 800,
      },
    },
    subscribersCount: '36.1K',
  },
  {
    channelId: 'UCWWEjWWo3LfdgufR0YL_t0g',
    title: 'F1 na wstecznym',
    description: '',
    thumbnail:
      'https://yt3.ggpht.com/05G-GTpmHY2LhJVdBt-6rRrojzmjLuyGh59w4G2QX-BFRSpRj5a--FDPBskJDC9nJnXkc60ePcA=s800-c-k-c0x00ffffff-no-rj',
    img: {
      default: {
        url: 'https://yt3.ggpht.com/05G-GTpmHY2LhJVdBt-6rRrojzmjLuyGh59w4G2QX-BFRSpRj5a--FDPBskJDC9nJnXkc60ePcA=s88-c-k-c0x00ffffff-no-rj',
        width: 88,
        height: 88,
      },
      medium: {
        url: 'https://yt3.ggpht.com/05G-GTpmHY2LhJVdBt-6rRrojzmjLuyGh59w4G2QX-BFRSpRj5a--FDPBskJDC9nJnXkc60ePcA=s240-c-k-c0x00ffffff-no-rj',
        width: 240,
        height: 240,
      },
      high: {
        url: 'https://yt3.ggpht.com/05G-GTpmHY2LhJVdBt-6rRrojzmjLuyGh59w4G2QX-BFRSpRj5a--FDPBskJDC9nJnXkc60ePcA=s800-c-k-c0x00ffffff-no-rj',
        width: 800,
        height: 800,
      },
    },
    subscribersCount: '3.8K',
  },
  {
    channelId: 'UCMQ7Gx6v-pQy_gsRoMJYzOA',
    title: 'Sky Sport F1',
    description:
      'Goditi tutta la Formula 1® in diretta esclusiva su Sky. Prova Sky Q a 9€ per 30 giorni 🔗 http://tiny.cc/ytdes\n',
    thumbnail:
      'https://yt3.ggpht.com/bKydV-9WEUOhZf1o-yGZ9V4nxO3iR9qZjz2ka6TUNBM0F7_w-wcsAEseY7RAPw8ypANsDoSx1w=s800-c-k-c0x00ffffff-no-rj',
    img: {
      default: {
        url: 'https://yt3.ggpht.com/bKydV-9WEUOhZf1o-yGZ9V4nxO3iR9qZjz2ka6TUNBM0F7_w-wcsAEseY7RAPw8ypANsDoSx1w=s88-c-k-c0x00ffffff-no-rj',
        width: 88,
        height: 88,
      },
      medium: {
        url: 'https://yt3.ggpht.com/bKydV-9WEUOhZf1o-yGZ9V4nxO3iR9qZjz2ka6TUNBM0F7_w-wcsAEseY7RAPw8ypANsDoSx1w=s240-c-k-c0x00ffffff-no-rj',
        width: 240,
        height: 240,
      },
      high: {
        url: 'https://yt3.ggpht.com/bKydV-9WEUOhZf1o-yGZ9V4nxO3iR9qZjz2ka6TUNBM0F7_w-wcsAEseY7RAPw8ypANsDoSx1w=s800-c-k-c0x00ffffff-no-rj',
        width: 800,
        height: 800,
      },
    },
    subscribersCount: '145.0K',
  },
  {
    channelId: 'UCB_qr75-ydFVKSF9Dmo6izg',
    title: 'FORMULA 1',
    description:
      'The home of risk takers, late brakers and history makers! 💫\n\nNEXT UP - RACE 13 OF 24: HUNGARY 🇭🇺 JULY 19-21\n',
    thumbnail:
      'https://yt3.ggpht.com/tyLW5LsJGwr4ViM30OeYbuLcu_MXfpRzP8y-X9_aKfTNJeMFHmnNbPyxxhaFDA9NRgwEu9mT-g=s800-c-k-c0x00ffffff-no-rj',
    img: {
      default: {
        url: 'https://yt3.ggpht.com/tyLW5LsJGwr4ViM30OeYbuLcu_MXfpRzP8y-X9_aKfTNJeMFHmnNbPyxxhaFDA9NRgwEu9mT-g=s88-c-k-c0x00ffffff-no-rj',
        width: 88,
        height: 88,
      },
      medium: {
        url: 'https://yt3.ggpht.com/tyLW5LsJGwr4ViM30OeYbuLcu_MXfpRzP8y-X9_aKfTNJeMFHmnNbPyxxhaFDA9NRgwEu9mT-g=s240-c-k-c0x00ffffff-no-rj',
        width: 240,
        height: 240,
      },
      high: {
        url: 'https://yt3.ggpht.com/tyLW5LsJGwr4ViM30OeYbuLcu_MXfpRzP8y-X9_aKfTNJeMFHmnNbPyxxhaFDA9NRgwEu9mT-g=s800-c-k-c0x00ffffff-no-rj',
        width: 800,
        height: 800,
      },
    },
    subscribersCount: '10.8M',
  },
  {
    channelId: 'UCOk4aV-6664rInjgClOBfig',
    title: 'F1-Thailand',
    description: 'พื้นที่คุยกัน สำหรับคนที่ชื่นชอบการแข่งรถ F1 ยินดีต้อนรับสุภาพชนทุกคนครับ',
    thumbnail:
      'https://yt3.ggpht.com/ytc/AIdro_l68wtzngvDoHeyZs_OnGYWBcQOv18po4a0TgX_Ma_fTI8=s800-c-k-c0x00ffffff-no-rj',
    img: {
      default: {
        url: 'https://yt3.ggpht.com/ytc/AIdro_l68wtzngvDoHeyZs_OnGYWBcQOv18po4a0TgX_Ma_fTI8=s88-c-k-c0x00ffffff-no-rj',
        width: 88,
        height: 88,
      },
      medium: {
        url: 'https://yt3.ggpht.com/ytc/AIdro_l68wtzngvDoHeyZs_OnGYWBcQOv18po4a0TgX_Ma_fTI8=s240-c-k-c0x00ffffff-no-rj',
        width: 240,
        height: 240,
      },
      high: {
        url: 'https://yt3.ggpht.com/ytc/AIdro_l68wtzngvDoHeyZs_OnGYWBcQOv18po4a0TgX_Ma_fTI8=s800-c-k-c0x00ffffff-no-rj',
        width: 800,
        height: 800,
      },
    },
    subscribersCount: '12.6K',
  },
  {
    channelId: 'UCmaItsxNPLEQ-NIjv5gPScg',
    title: 'Sky Sport Formel 1',
    description:
      'Hallo und herzlich willkommen auf dem offiziellen Formel 1 Kanal von Sky Sport Deutschland. Hier findet Ihr alle Highlights der schnellsten Rennserie der Welt. Darüber hinaus zeigen wir Euch interessante Features und alles, was das Motorsportherz höher schlagen lässt. Abonniert jetzt unseren neuen Formel 1 YouTube-Kanal und verpasst kein Video mehr!\n\nImpressum:\nSky Deutschland Fernsehen GmbH & Co. KG\nMedienallee 26\n85774 Unterföhring\nDeutschland\nTel.: 089/9958-02\nimpressum@sky.de\n\nAmtsgericht München, HRA 80699\nUStIdNr.: DE 118 376 113\n\nAufsichtsbehörde nach § 5 TMG Abs. 1 Nr. 8: Bayerische Landeszentrale für neue Medien\n',
    thumbnail:
      'https://yt3.ggpht.com/QSpKYw8w4paK-b8mrOOQFU2bQYBEKLjVkcPPlmOZZYC55MxfCM8BSh8is84dN9aGX-b8IidzXw=s800-c-k-c0x00ffffff-no-rj',
    img: {
      default: {
        url: 'https://yt3.ggpht.com/QSpKYw8w4paK-b8mrOOQFU2bQYBEKLjVkcPPlmOZZYC55MxfCM8BSh8is84dN9aGX-b8IidzXw=s88-c-k-c0x00ffffff-no-rj',
        width: 88,
        height: 88,
      },
      medium: {
        url: 'https://yt3.ggpht.com/QSpKYw8w4paK-b8mrOOQFU2bQYBEKLjVkcPPlmOZZYC55MxfCM8BSh8is84dN9aGX-b8IidzXw=s240-c-k-c0x00ffffff-no-rj',
        width: 240,
        height: 240,
      },
      high: {
        url: 'https://yt3.ggpht.com/QSpKYw8w4paK-b8mrOOQFU2bQYBEKLjVkcPPlmOZZYC55MxfCM8BSh8is84dN9aGX-b8IidzXw=s800-c-k-c0x00ffffff-no-rj',
        width: 800,
        height: 800,
      },
    },
    subscribersCount: '114.0K',
  },
  {
    channelId: 'UCxyxUe_jRskL8xH7n580Ecw',
    title: 'Cameron F1',
    description:
      "Cameron F1 is an F1 fan channel where you can have your say on the latest F1 news and F1 updates whether that's Abu Dhabi 2021, Max Verstappen, Lewis Hamilton, Charles Leclerc, FIA, Lando Norris. Cameron F1 is here to listen to your opinions and discuss F1's biggest stories.\n\nSubscribe to the Cameron F1 Youtube Channel here:\nhttps://bit.ly/2Z6INf4\n\n\n\n",
    thumbnail:
      'https://yt3.ggpht.com/YdP7jbJPmmM5B6v5bHC3X3uhV3ZXYuPNlUnsBCyQvk88_Upd293ptCRezIIIms0Rn_Im1XUV7z0=s800-c-k-c0x00ffffff-no-rj',
    img: {
      default: {
        url: 'https://yt3.ggpht.com/YdP7jbJPmmM5B6v5bHC3X3uhV3ZXYuPNlUnsBCyQvk88_Upd293ptCRezIIIms0Rn_Im1XUV7z0=s88-c-k-c0x00ffffff-no-rj',
        width: 88,
        height: 88,
      },
      medium: {
        url: 'https://yt3.ggpht.com/YdP7jbJPmmM5B6v5bHC3X3uhV3ZXYuPNlUnsBCyQvk88_Upd293ptCRezIIIms0Rn_Im1XUV7z0=s240-c-k-c0x00ffffff-no-rj',
        width: 240,
        height: 240,
      },
      high: {
        url: 'https://yt3.ggpht.com/YdP7jbJPmmM5B6v5bHC3X3uhV3ZXYuPNlUnsBCyQvk88_Upd293ptCRezIIIms0Rn_Im1XUV7z0=s800-c-k-c0x00ffffff-no-rj',
        width: 800,
        height: 800,
      },
    },
    subscribersCount: '27.3K',
  },
  {
    channelId: 'UCQCOt-7Wi6VR6UNTuN9i4HA',
    title: 'SPLASH AND GO - F1',
    description: 'Opinião e informação sobre automobilismo com ênfase em F1.\n\n\n\n',
    thumbnail:
      'https://yt3.ggpht.com/Se3CEhJ_4XivqIKy-6E4zqO5stOq7dCm5Qbay6fsk4CdihqHUTF7N5vsajBePol7hv5v-mJVOw=s800-c-k-c0x00ffffff-no-rj',
    img: {
      default: {
        url: 'https://yt3.ggpht.com/Se3CEhJ_4XivqIKy-6E4zqO5stOq7dCm5Qbay6fsk4CdihqHUTF7N5vsajBePol7hv5v-mJVOw=s88-c-k-c0x00ffffff-no-rj',
        width: 88,
        height: 88,
      },
      medium: {
        url: 'https://yt3.ggpht.com/Se3CEhJ_4XivqIKy-6E4zqO5stOq7dCm5Qbay6fsk4CdihqHUTF7N5vsajBePol7hv5v-mJVOw=s240-c-k-c0x00ffffff-no-rj',
        width: 240,
        height: 240,
      },
      high: {
        url: 'https://yt3.ggpht.com/Se3CEhJ_4XivqIKy-6E4zqO5stOq7dCm5Qbay6fsk4CdihqHUTF7N5vsajBePol7hv5v-mJVOw=s800-c-k-c0x00ffffff-no-rj',
        width: 800,
        height: 800,
      },
    },
    subscribersCount: '157.0K',
  },
  {
    channelId: 'UCsc_vaQj7XgAsdtIxes5EXA',
    title: "津川哲夫のF1グランプリボーイズ  Tetsuo's F1 Grand Prix Boys",
    description:
      "F1大好きおじいちゃんの津川哲夫のチャンネル。\nF1レースのあんなことやこんなこと、ドライバーやエンジン話まで、F1を語り尽くします！\n\nF1 favorite grandfather Tetsuo Tsugawa's channel.\nWe will talk about F1 such things as F1 racing, such things, drivers and engines!\n\n\n",
    thumbnail:
      'https://yt3.ggpht.com/JWLSLoVbn8C0SxgLT0i8L-U0rMXy9QhExsusRzNXBeoRuh8AQ_IP003VmklFa3Unq6tCYI5qxQ=s800-c-k-c0x00ffffff-no-rj',
    img: {
      default: {
        url: 'https://yt3.ggpht.com/JWLSLoVbn8C0SxgLT0i8L-U0rMXy9QhExsusRzNXBeoRuh8AQ_IP003VmklFa3Unq6tCYI5qxQ=s88-c-k-c0x00ffffff-no-rj',
        width: 88,
        height: 88,
      },
      medium: {
        url: 'https://yt3.ggpht.com/JWLSLoVbn8C0SxgLT0i8L-U0rMXy9QhExsusRzNXBeoRuh8AQ_IP003VmklFa3Unq6tCYI5qxQ=s240-c-k-c0x00ffffff-no-rj',
        width: 240,
        height: 240,
      },
      high: {
        url: 'https://yt3.ggpht.com/JWLSLoVbn8C0SxgLT0i8L-U0rMXy9QhExsusRzNXBeoRuh8AQ_IP003VmklFa3Unq6tCYI5qxQ=s800-c-k-c0x00ffffff-no-rj',
        width: 800,
        height: 800,
      },
    },
    subscribersCount: '44.8K',
  },
  {
    channelId: 'UCpWvIVpcyW0mWv4xAWNda5Q',
    title: 'F1 Esports',
    description:
      "Don't blink 👀 The official home of the @Formula1 Sim Racing World Championship 🏎️\n",
    thumbnail:
      'https://yt3.ggpht.com/k8ohd51VpjWBf0Niy3PqYVtVhQ0264f2Oaf9kS13YHL_hAUQVfrI7WQ1LG_yeRfe1O5m9HQGtw=s800-c-k-c0x00ffffff-no-rj',
    img: {
      default: {
        url: 'https://yt3.ggpht.com/k8ohd51VpjWBf0Niy3PqYVtVhQ0264f2Oaf9kS13YHL_hAUQVfrI7WQ1LG_yeRfe1O5m9HQGtw=s88-c-k-c0x00ffffff-no-rj',
        width: 88,
        height: 88,
      },
      medium: {
        url: 'https://yt3.ggpht.com/k8ohd51VpjWBf0Niy3PqYVtVhQ0264f2Oaf9kS13YHL_hAUQVfrI7WQ1LG_yeRfe1O5m9HQGtw=s240-c-k-c0x00ffffff-no-rj',
        width: 240,
        height: 240,
      },
      high: {
        url: 'https://yt3.ggpht.com/k8ohd51VpjWBf0Niy3PqYVtVhQ0264f2Oaf9kS13YHL_hAUQVfrI7WQ1LG_yeRfe1O5m9HQGtw=s800-c-k-c0x00ffffff-no-rj',
        width: 800,
        height: 800,
      },
    },
    subscribersCount: '11.3K',
  },
  {
    channelId: 'UCdi2gN2JC9qsKdC-jlCU1-g',
    title: 'ゆっくりF1ラボ',
    description:
      '「どうなるか？見てみよう！」\n\n今のF1のレース情報、角田選手の速報などを中心に動画投稿しています。\nF1好きな人や、これから見ようと思っている人が集える場所になれたらうれしいです！\n世界最高峰のモータースポーツを一緒に楽しみましょう！！\n\n＜当チャンネルはコンテンツの繰り返しをしていません＞\n当チャンネルが公開している動画は全て人の手によって作られたオリジナルの動画であり、”テンプレートに基づいたコンテンツ”でも”プログラムによって生成されたコンテンツ”でもありません。１つ１つの動画が異なる主題を扱っており、それらは全て独自の解説と説明で構成されています。',
    thumbnail:
      'https://yt3.ggpht.com/gqEM2kxoWKnxOtM4WltBaDC6VLLtqPVL_oPVMkJUU7xRWSSwR1sldBUeiKnW_9pKsTtRpwE13Q=s800-c-k-c0x00ffffff-no-rj',
    img: {
      default: {
        url: 'https://yt3.ggpht.com/gqEM2kxoWKnxOtM4WltBaDC6VLLtqPVL_oPVMkJUU7xRWSSwR1sldBUeiKnW_9pKsTtRpwE13Q=s88-c-k-c0x00ffffff-no-rj',
        width: 88,
        height: 88,
      },
      medium: {
        url: 'https://yt3.ggpht.com/gqEM2kxoWKnxOtM4WltBaDC6VLLtqPVL_oPVMkJUU7xRWSSwR1sldBUeiKnW_9pKsTtRpwE13Q=s240-c-k-c0x00ffffff-no-rj',
        width: 240,
        height: 240,
      },
      high: {
        url: 'https://yt3.ggpht.com/gqEM2kxoWKnxOtM4WltBaDC6VLLtqPVL_oPVMkJUU7xRWSSwR1sldBUeiKnW_9pKsTtRpwE13Q=s800-c-k-c0x00ffffff-no-rj',
        width: 800,
        height: 800,
      },
    },
    subscribersCount: '38.0K',
  },
  {
    channelId: 'UC-Tg6OSiAdbM0cgo4bh8jEw',
    title: 'F1 sin Fanatismos',
    description:
      'Tu canal de actualidad de F1. Sin fanatismos, sin tapujos. Aquí se habla con datos, experiencia y hechos.\nPor @roldan.rodriguez y @dani_juncadella\n',
    thumbnail:
      'https://yt3.ggpht.com/7pw5FoYh5kWvLUh1FD_AnGExfuBDbGtMQ_dzK1wEOUTpP-ga07Pa2HpkPC-r0TyLQUZ089VX=s800-c-k-c0x00ffffff-no-rj',
    img: {
      default: {
        url: 'https://yt3.ggpht.com/7pw5FoYh5kWvLUh1FD_AnGExfuBDbGtMQ_dzK1wEOUTpP-ga07Pa2HpkPC-r0TyLQUZ089VX=s88-c-k-c0x00ffffff-no-rj',
        width: 88,
        height: 88,
      },
      medium: {
        url: 'https://yt3.ggpht.com/7pw5FoYh5kWvLUh1FD_AnGExfuBDbGtMQ_dzK1wEOUTpP-ga07Pa2HpkPC-r0TyLQUZ089VX=s240-c-k-c0x00ffffff-no-rj',
        width: 240,
        height: 240,
      },
      high: {
        url: 'https://yt3.ggpht.com/7pw5FoYh5kWvLUh1FD_AnGExfuBDbGtMQ_dzK1wEOUTpP-ga07Pa2HpkPC-r0TyLQUZ089VX=s800-c-k-c0x00ffffff-no-rj',
        width: 800,
        height: 800,
      },
    },
    subscribersCount: '2.5K',
  },
  {
    channelId: 'UCXHm4g2vzvFYgZUL8PETqKw',
    title: 'BOTECO F1',
    description:
      'Primeiro canal brasileiro especializado em Fórmula 1 do YouTube.\n\nMissão: Nosso compromisso é sempre falar de F1 da forma mais coerente e informal possível, com responsabilidade com os conteúdos publicados e ao mesmo tempo, com a alegria de fãs que fazem de seus dias mais felizes com informações e coberturas do esporte à motor mais respeitado de todos os tempos.\n\nObjetivo: Renovar a abordagem automobilística no Brasil e levar a beleza do esporte para novas gerações.\n\nThis website is unofficial and is not associated in any way with the Formula One group of \ncompanies. F1, FORMULA ONE, FORMULA 1, FIA FORMULA ONE WORLD CHAMPIONSHIP, GRAND PRIX and \nrelated marks are trade marks of Formula One Licensing B.V.',
    thumbnail:
      'https://yt3.ggpht.com/bdkTlswBix_p45hg7TwmopJEi_c-wfz1R3y3oeIiqxfEvW2enqM-ZSuAEJZdzTUsYNmCHcam2mw=s800-c-k-c0x00ffffff-no-rj',
    img: {
      default: {
        url: 'https://yt3.ggpht.com/bdkTlswBix_p45hg7TwmopJEi_c-wfz1R3y3oeIiqxfEvW2enqM-ZSuAEJZdzTUsYNmCHcam2mw=s88-c-k-c0x00ffffff-no-rj',
        width: 88,
        height: 88,
      },
      medium: {
        url: 'https://yt3.ggpht.com/bdkTlswBix_p45hg7TwmopJEi_c-wfz1R3y3oeIiqxfEvW2enqM-ZSuAEJZdzTUsYNmCHcam2mw=s240-c-k-c0x00ffffff-no-rj',
        width: 240,
        height: 240,
      },
      high: {
        url: 'https://yt3.ggpht.com/bdkTlswBix_p45hg7TwmopJEi_c-wfz1R3y3oeIiqxfEvW2enqM-ZSuAEJZdzTUsYNmCHcam2mw=s800-c-k-c0x00ffffff-no-rj',
        width: 800,
        height: 800,
      },
    },
    subscribersCount: '236.0K',
  },
  {
    channelId: 'UCZDb1s_gORJHxTE0vwIKaiw',
    title: 'F1 Seba',
    description:
      'F1 fan\nPresets/Scp’s - https://payhip.com/F1Seba \n18 - Australian\n#stopf1toxicity\n',
    thumbnail:
      'https://yt3.ggpht.com/5KXAT7G6b7etY56uzvvaXHwRtYkJZZ0EredgmG9LAXiQtQZy4n75Pwb-G5fpC0053ILA61NoNQg=s800-c-k-c0x00ffffff-no-rj',
    img: {
      default: {
        url: 'https://yt3.ggpht.com/5KXAT7G6b7etY56uzvvaXHwRtYkJZZ0EredgmG9LAXiQtQZy4n75Pwb-G5fpC0053ILA61NoNQg=s88-c-k-c0x00ffffff-no-rj',
        width: 88,
        height: 88,
      },
      medium: {
        url: 'https://yt3.ggpht.com/5KXAT7G6b7etY56uzvvaXHwRtYkJZZ0EredgmG9LAXiQtQZy4n75Pwb-G5fpC0053ILA61NoNQg=s240-c-k-c0x00ffffff-no-rj',
        width: 240,
        height: 240,
      },
      high: {
        url: 'https://yt3.ggpht.com/5KXAT7G6b7etY56uzvvaXHwRtYkJZZ0EredgmG9LAXiQtQZy4n75Pwb-G5fpC0053ILA61NoNQg=s800-c-k-c0x00ffffff-no-rj',
        width: 800,
        height: 800,
      },
    },
    subscribersCount: '26.0K',
  },
  {
    channelId: 'UCe-K9V3g7kfdeIbTxvaP-aQ',
    title: 'Rami F1',
    description:
      "Salut les amis, cette chaîne comme son nom l'indique ne traite et ne traitera que de l'univers de la Formule 1 !\nLe Contenu est très simple 👇🏼\n\n🏁-Des Débrief des Grand prix !\n\n📝-Les Analyses d'avant Grand Prix avec mon Pronostic et ceux de la Communauté.\n\n📰-L'Actualité de la F1 avec une vidéo News toutes les semaines !\n\nEt bien plus....\n_______________________________\n\nAdresse Pro : ramif1@fojow.com\n\n 🗣️Discord https://discord.gg/y2kfCQG\n🎮Twitch: https://twitch.tv/ramif1\n🕊️Twitter: @F1Rami \n📸Insta:RamiF1\n",
    thumbnail:
      'https://yt3.ggpht.com/ah7_9LuTJIgZXBKdIa2D5_Ci1Tyi4nUNfrD-CwBCGAwL9NBvs0TvpM-rIMTZCSBTYXA2uUnHWw=s800-c-k-c0x00ffffff-no-rj',
    img: {
      default: {
        url: 'https://yt3.ggpht.com/ah7_9LuTJIgZXBKdIa2D5_Ci1Tyi4nUNfrD-CwBCGAwL9NBvs0TvpM-rIMTZCSBTYXA2uUnHWw=s88-c-k-c0x00ffffff-no-rj',
        width: 88,
        height: 88,
      },
      medium: {
        url: 'https://yt3.ggpht.com/ah7_9LuTJIgZXBKdIa2D5_Ci1Tyi4nUNfrD-CwBCGAwL9NBvs0TvpM-rIMTZCSBTYXA2uUnHWw=s240-c-k-c0x00ffffff-no-rj',
        width: 240,
        height: 240,
      },
      high: {
        url: 'https://yt3.ggpht.com/ah7_9LuTJIgZXBKdIa2D5_Ci1Tyi4nUNfrD-CwBCGAwL9NBvs0TvpM-rIMTZCSBTYXA2uUnHWw=s800-c-k-c0x00ffffff-no-rj',
        width: 800,
        height: 800,
      },
    },
    subscribersCount: '21.6K',
  },
];
let RecentVideos = [
  {
    videoId: 'cq7XxNrhoJU',
    title: 'It was totally worth it for Smoggy 🌪️🗡️ #valorant #shorts #valorantclips',
    thumbnail: 'https://i.ytimg.com/vi/cq7XxNrhoJU/mqdefault.jpg',
  },
  {
    videoId: 'po9rDQqJr5Y',
    title: 'Close call for Boaster and Alfajer 😮‍💨 #valorant #shorts #vct',
    thumbnail: 'https://i.ytimg.com/vi/po9rDQqJr5Y/mqdefault.jpg',
  },
  {
    videoId: 'ebum_CkU_YU',
    title: 'Pretty good for their first time 😂 #valorant #shorts #valorantclips',
    thumbnail: 'https://i.ytimg.com/vi/ebum_CkU_YU/mqdefault.jpg',
  },
];
let ReleventVideos = [
  {
    videoId: 'Xb5HiljNfbc',
    title: 'Aspas ACES 100 Thieves with the Marshal 💥 #vct #valorant #shorts',
    thumbnail: 'https://i.ytimg.com/vi/Xb5HiljNfbc/mqdefault.jpg',
  },
  {
    videoId: 'xzIIi-qyw_g',
    title: 'FNS is the biggest trash talker on OpTic #shorts #VCT',
    thumbnail: 'https://i.ytimg.com/vi/xzIIi-qyw_g/mqdefault.jpg',
  },
  {
    videoId: 'BkpTSlcoQdY',
    title:
      'Made FiNESSE&#39;s day 🍬 #shorts #vct #valorant #funnyvideo #funnyshorts #valorantmasters',
    thumbnail: 'https://i.ytimg.com/vi/BkpTSlcoQdY/mqdefault.jpg',
  },
];
let ManualVideos = [
  {
    videoId: 'cq7XxNrhoJU',
    title: 'It was totally worth it for Smoggy 🌪️🗡️ #valorant #shorts #valorantclips',
    thumbnail: 'https://i.ytimg.com/vi/cq7XxNrhoJU/mqdefault.jpg',
  },
  {
    videoId: 'po9rDQqJr5Y',
    title: 'Close call for Boaster and Alfajer 😮‍💨 #valorant #shorts #vct',
    thumbnail: 'https://i.ytimg.com/vi/po9rDQqJr5Y/mqdefault.jpg',
  },
  {
    videoId: 'ebum_CkU_YU',
    title: 'Pretty good for their first time 😂 #valorant #shorts #valorantclips',
    thumbnail: 'https://i.ytimg.com/vi/ebum_CkU_YU/mqdefault.jpg',
  },
  {
    videoId: 'vv2CzFwvoPw',
    title: 'Sentinels Zekken And G2 Trent Coach Their Moms In A 1v1 Game Of VALORANT | Duo Duels',
    thumbnail: 'https://i.ytimg.com/vi/vv2CzFwvoPw/mqdefault.jpg',
  },
  {
    videoId: 'IP74l57MLfE',
    title:
      'VALORANT Pros React To Masters Shanghai Plays (Wo0t, Boostio, F0rsaken, JonahP, and more)',
    thumbnail: 'https://i.ytimg.com/vi/IP74l57MLfE/mqdefault.jpg',
  },
  {
    videoId: 'Q3EKDqDmp-0',
    title: 'need to see cNed’s 5 stack in the server fr #VCT #shorts #valorant',
    thumbnail: 'https://i.ytimg.com/vi/Q3EKDqDmp-0/mqdefault.jpg',
  },
  {
    videoId: 'ZY6jY-0sUv8',
    title: 'I wonder how Lakia is going to take this 😱 #valorant #shorts #valorantmasters',
    thumbnail: 'https://i.ytimg.com/vi/ZY6jY-0sUv8/mqdefault.jpg',
  },
  {
    videoId: '4loaYCFRSrw',
    title: 'We had to check Derke’s PC after this round. #valorant #shorts #valorantclips',
    thumbnail: 'https://i.ytimg.com/vi/4loaYCFRSrw/mqdefault.jpg',
  },
  {
    videoId: 'anXnsewUifA',
    title:
      'Expert position ✅ Expert precision ✅ FNATIC to Shanghai ✅ #valorant #shorts #valorantmasters',
    thumbnail: 'https://i.ytimg.com/vi/anXnsewUifA/mqdefault.jpg',
  },
  {
    videoId: '4NIpbPEDt-c',
    title: 'HE GOT THAT JAWG IN HIM! #valorant #vct #shorts #valorantclips',
    thumbnail: 'https://i.ytimg.com/vi/4NIpbPEDt-c/mqdefault.jpg',
  },
  {
    videoId: 'jNL2IrGZvcM',
    title: 'Zekken is a big FUT Esports fan #valorant #valorantmasters #shorts #valorantpros',
    thumbnail: 'https://i.ytimg.com/vi/jNL2IrGZvcM/mqdefault.jpg',
  },
  {
    videoId: 'Tmic9cMm-NY',
    title: 'Well, that escalated quickly #vct #valorant #shorts #valorantmasters',
    thumbnail: 'https://i.ytimg.com/vi/Tmic9cMm-NY/mqdefault.jpg',
  },
  {
    videoId: 'XjfSnRiXMag',
    title: 'TenZ was just looking out for the boys 🤝 #vct #valorant #shorts #sentinels',
    thumbnail: 'https://i.ytimg.com/vi/XjfSnRiXMag/mqdefault.jpg',
  },
  {
    videoId: 'K2lSXjiRzzs',
    title: 'Zellsis finishing the clutch with the pre-fire 💥 #vct #sentinels #valorant #shorts',
    thumbnail: 'https://i.ytimg.com/vi/K2lSXjiRzzs/mqdefault.jpg',
  },
  {
    videoId: 'TGrNc5iw1nU',
    title: 'Demon1’s confidence is unmatched! #VCT #shorts #valorant #gaming',
    thumbnail: 'https://i.ytimg.com/vi/TGrNc5iw1nU/mqdefault.jpg',
  },
  {
    videoId: '5RcxqhiQB8Q',
    title:
      'They had more duelists than rounds lost 🤺🤺🤺🤺 #vctgamechangers #teamsmg #shorts #valorantpro',
    thumbnail: 'https://i.ytimg.com/vi/5RcxqhiQB8Q/mqdefault.jpg',
  },
  {
    videoId: '1AwBmCgriIQ',
    title:
      'BBL Queens got creative during the Tech Pause 🔴🟢 #shorts #vctgamechangers #valorant #valorantclip',
    thumbnail: 'https://i.ytimg.com/vi/1AwBmCgriIQ/mqdefault.jpg',
  },
  {
    videoId: 'qOHxdPVoiw8',
    title: 'THAT WAS QUITE SOMETHING! #valorant #paperrex #shorts #valorantclips',
    thumbnail: 'https://i.ytimg.com/vi/qOHxdPVoiw8/mqdefault.jpg',
  },
  {
    videoId: 'DaJA48hiAOM',
    title: 'Jinggg with the ACE! #valorant #shorts #paperrex',
    thumbnail: 'https://i.ytimg.com/vi/DaJA48hiAOM/mqdefault.jpg',
  },
  {
    videoId: 'NTqrZ1hOx_Q',
    title: 'WHAT WAS THAT SHOT FROM NATS?? #valorant #teamliquid #valorantclips #shorts',
    thumbnail: 'https://i.ytimg.com/vi/NTqrZ1hOx_Q/mqdefault.jpg',
  },
];

export function ChannelSelection({ campagineData, updateCampaignData }) {
  const { fetchChannels, loading, error } = useChannels();
  console.log(loading, error, 'loading, error');
  const handleChannelClick = useCallback(
    (channel) => {
      console.log('Selected channel:', channel);
      updateCampaignData('channel', {
        selectedChannel: channel,
      });
    },
    [updateCampaignData]
  );

  const handleUrlChange = useCallback(
    (e) => {
      console.log('URL changed:', e.target.value);
      updateCampaignData('channel', {
        url: e.target.value,
      });
    },
    [updateCampaignData]
  );

  const searchChannels = useCallback(async () => {
    console.log('Search channels with data:', campagineData);
    if (campagineData.url === '') {
      return;
    }
    const channels = await fetchChannels(endpoints.customCampaigns.getchannels, campagineData.url);
    updateCampaignData('channel', { ChannelsList: channels, selectedChannel: null });
  }, [campagineData]);

  const isSelected = (channel) => campagineData?.selectedChannel?.channelId === channel?.channelId;

  const renderLoading = (
    <Box sx={{ p: 5 }}>
      <LoadingScreen />
    </Box>
  );

  const renderError = (
    <Box sx={{ p: 5 }} textAlign={'center'}>
      <Container component={MotionContainer}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            {error}
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration sx={{ my: { xs: 5, sm: 10 } }} />
        </m.div>
      </Container>
    </Box>
  );
  return (
    <>
      <ChannelSearchToolbar
        url={campagineData.url}
        handleUrlChange={handleUrlChange}
        searchChannels={searchChannels}
      />
      {loading && renderLoading}
      {error && renderError}
      <Scrollbar>
        <Box
          gap={2}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
        >
          {/* {!loading && campagineData?.ChannelsList?.length === 0 && <div>No channels found</div>} */}
          {campagineData?.ChannelsList?.map((row, index) => (
            <ChannelItem
              key={index}
              row={row}
              isSelected={isSelected(row)}
              onClick={() => handleChannelClick(row)}
            />
          ))}
        </Box>
      </Scrollbar>
    </>
  );
}
