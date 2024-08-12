import React from 'react';
import { ComponentBlock, ComponentContainer } from 'src/components/compoenet-block/component-block';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { fCurrency } from 'src/utils/format-number';
import { Box, Chip, useMediaQuery, useTheme } from '@mui/material';
import { decodeGoogleSpecialCharacters } from 'src/utils/decode-google-characters';
import { Label } from 'src/components/label';
import { getCountry } from 'src/components/country-select';
import { FlagIcon } from 'src/components/iconify';

export const ReviewSubmit = ({
  sx,
  campaignData,
  slotProps,

  // 0 ~ 1 => 0% => 100%
  offsetValue = 0.3,

  queryClassName = 'scroll__to__view',
  ...other
}) => {
  // let campaignData = {
  //   channel: {
  //     selectedChannel: {
  //       channelId: 'UC1Myj674wRVXB9I4c6Hm5zA',
  //       title: 'Apple TV',
  //       description:
  //         'The official rabbit hole of Apple TV+\n\nApple TV+ is a streaming service with original stories from the most creative minds in TV and film. Watch now on the Apple TV app: https://apple.co/_AppleTVapp\n',
  //       thumbnail:
  //         'https://yt3.ggpht.com/ytc/AIdro_nppMjm4op7es6kjvbv2DSpU982hkTz7N4o_nqtCB3PeHM=s800-c-k-c0x00ffffff-no-rj',
  //       img: {
  //         default: {
  //           url: 'https://yt3.ggpht.com/ytc/AIdro_nppMjm4op7es6kjvbv2DSpU982hkTz7N4o_nqtCB3PeHM=s88-c-k-c0x00ffffff-no-rj',
  //           width: 88,
  //           height: 88,
  //         },
  //         medium: {
  //           url: 'https://yt3.ggpht.com/ytc/AIdro_nppMjm4op7es6kjvbv2DSpU982hkTz7N4o_nqtCB3PeHM=s240-c-k-c0x00ffffff-no-rj',
  //           width: 240,
  //           height: 240,
  //         },
  //         high: {
  //           url: 'https://yt3.ggpht.com/ytc/AIdro_nppMjm4op7es6kjvbv2DSpU982hkTz7N4o_nqtCB3PeHM=s800-c-k-c0x00ffffff-no-rj',
  //           width: 800,
  //           height: 800,
  //         },
  //       },
  //       subscribersCount: '1.8M',
  //     },
  //     ChannelsList: [
  //       {
  //         channelId: 'UCneD8oYNapJ7AfhTGfiuWvg',
  //         title: 'Ms Apple | Toddler Learning Videos',
  //         description:
  //           "Develop preschool skills and reach important milestones through music, play & language learning with Ms Apple.\n\nWelcome to the Ms Apple YouTube channel, a safe and nurturing space where your little ones can enjoy fun, enriching, and educational screen time. \n\nAs a caring and experienced educator, I'm so excited to take your little sprouts on an educational adventure. Together, we'll sing original songs, and classic nursery rhymes, and play fun educational games while using techniques employed by speech pathologists and BSL/SSE to improve communication for healthier screen time!\n\n⭐️  Ms Apple has extensive experience teaching music to children and young adults in a Special Educational Needs (SEN) environment, operating after-school music programs at primary schools, and teaching English as a second language to children aged 3+. ⭐️ \n\nPlease remember to subscribe to our channel and hit the notification bell to stay updated on our latest videos!\n",
  //         thumbnail:
  //           'https://yt3.ggpht.com/RdOLdvQAT_TqsW5bcTbViUUm3kUjdkpJ5krNmpDfmkH6F8UiML67Po6bhjfi3npIbotfKCG9iw=s800-c-k-c0x00ffffff-no-rj',
  //         img: {
  //           default: {
  //             url: 'https://yt3.ggpht.com/RdOLdvQAT_TqsW5bcTbViUUm3kUjdkpJ5krNmpDfmkH6F8UiML67Po6bhjfi3npIbotfKCG9iw=s88-c-k-c0x00ffffff-no-rj',
  //             width: 88,
  //             height: 88,
  //           },
  //           medium: {
  //             url: 'https://yt3.ggpht.com/RdOLdvQAT_TqsW5bcTbViUUm3kUjdkpJ5krNmpDfmkH6F8UiML67Po6bhjfi3npIbotfKCG9iw=s240-c-k-c0x00ffffff-no-rj',
  //             width: 240,
  //             height: 240,
  //           },
  //           high: {
  //             url: 'https://yt3.ggpht.com/RdOLdvQAT_TqsW5bcTbViUUm3kUjdkpJ5krNmpDfmkH6F8UiML67Po6bhjfi3npIbotfKCG9iw=s800-c-k-c0x00ffffff-no-rj',
  //             width: 800,
  //             height: 800,
  //           },
  //         },
  //         subscribersCount: '28.1K',
  //       },
  //       {
  //         channelId: 'UC1X0BSe3KboTiP5TtXi6Mpg',
  //         title: 'Apple México',
  //         description:
  //           'El canal oficial de Apple en YouTube te da la bienvenida. Aquí encontrarás noticias sobre nuevos productos, tutoriales y otros contenidos que no te puedes perder.\n\nApple revolucionó la tecnología personal en 1984, cuando lanzó Macintosh. Hoy, continúa liderando la innovación tecnológica con productos como iPhone, iPad, Mac y Apple Watch. Nuestras cinco plataformas de software (iOS, iPadOS, macOS, watchOS y tvOS) ofrecen experiencias magistralmente integradas en todos los dispositivos Apple. También creamos servicios revolucionarios como App Store, Apple Music, Apple Pay y iCloud; y seguimos renovándonos con nuevas ideas como HomePod, Apple Fitness+ y Apple Card. Nuestro equipo de más de 160,000 personas tiene la misión de crear los mejores productos del mundo y dejar el planeta mejor de lo que lo encontramos.\n\nAdemás de lo ya mencionado, Apple también ha creado productos como AirPods, AirTags, Apple Arcade, Apple Books, Apple News, Apple Podcasts, Apple TV y el iPod touch.',
  //         thumbnail:
  //           'https://yt3.ggpht.com/JUmXUNG_asU17Qg55BJXrKn7iXR8CbdkDHvq3mHjkJRdvOJoCAaR3r8YQE16IU3eHMr6DuXF7g=s800-c-k-c0x00ffffff-no-rj',
  //         img: {
  //           default: {
  //             url: 'https://yt3.ggpht.com/JUmXUNG_asU17Qg55BJXrKn7iXR8CbdkDHvq3mHjkJRdvOJoCAaR3r8YQE16IU3eHMr6DuXF7g=s88-c-k-c0x00ffffff-no-rj',
  //             width: 88,
  //             height: 88,
  //           },
  //           medium: {
  //             url: 'https://yt3.ggpht.com/JUmXUNG_asU17Qg55BJXrKn7iXR8CbdkDHvq3mHjkJRdvOJoCAaR3r8YQE16IU3eHMr6DuXF7g=s240-c-k-c0x00ffffff-no-rj',
  //             width: 240,
  //             height: 240,
  //           },
  //           high: {
  //             url: 'https://yt3.ggpht.com/JUmXUNG_asU17Qg55BJXrKn7iXR8CbdkDHvq3mHjkJRdvOJoCAaR3r8YQE16IU3eHMr6DuXF7g=s800-c-k-c0x00ffffff-no-rj',
  //             width: 800,
  //             height: 800,
  //           },
  //         },
  //         subscribersCount: '3.3M',
  //       },
  //       {
  //         channelId: 'UCBCQ-YdmMIA_JEaFMS8nqtg',
  //         title: 'Apple UAE',
  //         description:
  //           'Welcome to the official Apple YouTube channel. Here you’ll find news about product launches, tutorials, and other great content. \n\nApple revolutionized personal technology with the introduction of the Macintosh in 1984. Today Apple continues to be a global leader in innovation with products like iPhone, iPad, Mac, and Apple Watch. Our five software platforms (iOS, iPadOS, macOS, watchOS, and tvOS) provide seamless experiences across Apple devices. Breakthrough services include the App Store, Apple Music, Apple Pay, and iCloud. And Apple keeps pursuing innovation with products like HomePod, Apple Fitness+, and Apple Card. Apple’s more than 160,000 employees are dedicated to making the best products on earth, and to leaving the world better than we found it. \n\nAdditional products include AirPods, AirTags, Apple Arcade, Apple Books, Apple News, Apple Podcasts, Apple TV, and iPod touch.',
  //         thumbnail:
  //           'https://yt3.ggpht.com/oaiNJ3TFXNQCM3Zpq1jnAu4p7TbIAk8LFGbVB4Ltqvg_lMmx-nf5FKVEhA46Z34MLdpwhfkCBA=s800-c-k-c0x00ffffff-no-rj',
  //         img: {
  //           default: {
  //             url: 'https://yt3.ggpht.com/oaiNJ3TFXNQCM3Zpq1jnAu4p7TbIAk8LFGbVB4Ltqvg_lMmx-nf5FKVEhA46Z34MLdpwhfkCBA=s88-c-k-c0x00ffffff-no-rj',
  //             width: 88,
  //             height: 88,
  //           },
  //           medium: {
  //             url: 'https://yt3.ggpht.com/oaiNJ3TFXNQCM3Zpq1jnAu4p7TbIAk8LFGbVB4Ltqvg_lMmx-nf5FKVEhA46Z34MLdpwhfkCBA=s240-c-k-c0x00ffffff-no-rj',
  //             width: 240,
  //             height: 240,
  //           },
  //           high: {
  //             url: 'https://yt3.ggpht.com/oaiNJ3TFXNQCM3Zpq1jnAu4p7TbIAk8LFGbVB4Ltqvg_lMmx-nf5FKVEhA46Z34MLdpwhfkCBA=s800-c-k-c0x00ffffff-no-rj',
  //             width: 800,
  //             height: 800,
  //           },
  //         },
  //         subscribersCount: '275.0K',
  //       },
  //       {
  //         channelId: 'UCojUnOYXmI4EUDb_kYm0TCA',
  //         title: 'Cool apple',
  //         description:
  //           'Hi everybody!\nWelcome to my channel Cool Apple!\nI would be very glad if my videos will be useful to you!\nThe channel was created solely for informative purposes, to obtain interesting skills and general information about phones.\nBrief phone reviews, general characteristics and incoming calls are the basic principles of shooting\nI would be grateful for the feedback, write, like and comment on your wishes!\n******************************************************************************************\n\n\n',
  //         thumbnail:
  //           'https://yt3.ggpht.com/UnR8KuE95w4v59NEZmRi0mK-AQjqyQKZuABlgJ_sEIC2AJ8h4g_zXANuNuTan6VbHFI1gGE4YA=s800-c-k-c0x00ffffff-no-rj',
  //         img: {
  //           default: {
  //             url: 'https://yt3.ggpht.com/UnR8KuE95w4v59NEZmRi0mK-AQjqyQKZuABlgJ_sEIC2AJ8h4g_zXANuNuTan6VbHFI1gGE4YA=s88-c-k-c0x00ffffff-no-rj',
  //             width: 88,
  //             height: 88,
  //           },
  //           medium: {
  //             url: 'https://yt3.ggpht.com/UnR8KuE95w4v59NEZmRi0mK-AQjqyQKZuABlgJ_sEIC2AJ8h4g_zXANuNuTan6VbHFI1gGE4YA=s240-c-k-c0x00ffffff-no-rj',
  //             width: 240,
  //             height: 240,
  //           },
  //           high: {
  //             url: 'https://yt3.ggpht.com/UnR8KuE95w4v59NEZmRi0mK-AQjqyQKZuABlgJ_sEIC2AJ8h4g_zXANuNuTan6VbHFI1gGE4YA=s800-c-k-c0x00ffffff-no-rj',
  //             width: 800,
  //             height: 800,
  //           },
  //         },
  //         subscribersCount: '92.1K',
  //       },
  //       {
  //         channelId: 'UCv5iVjD-tFfl04V4AB4XRYw',
  //         title: 'Apple Japan',
  //         description:
  //           'Apple公式YouTubeチャンネルへようこそ。ここでは新製品のリリース情報やチュートリアルをはじめ、様々な素晴らしいコンテンツをご覧いただけます。\n\nAppleは1984年にMacintoshを発表し、パーソナルなテクノロジーに革命を起こしました。今日では、iPhone、iPad、Mac、Apple Watchといった製品で世界のイノベーションを牽引し続けています。私たちのiOS、iPadOS、macOS、watchOS、tvOSという5つのソフトウェアプラットフォームは、すべてのApple製デバイス上でシームレスな体験を届けながら、App Store、Apple Music、Apple Pay、iCloudなどの画期的なサービスを提供しています。そして、HomePod、Apple Fitness+、Apple Cardといった製品やサービスなど、Appleは常に新たなイノベーションを追い求めています。16万人を超えるAppleの社員は、地球上で最も優れた製品を作り出し、私たちが出会った時よりも良い世界を未来へ渡すために力を注いでいます。\n\nさらにAppleでは、AirPods、AirTag、Apple Arcade、Apple Books、Apple News、Apple Podcasts、Apple TV、iPod touchといった製品やサービスを提供しています。',
  //         thumbnail:
  //           'https://yt3.ggpht.com/ytc/AIdro_mRg7NoUgSO3sNaGrYg_1KYAQUoa4zQTPWuqeKfXWemFAY=s800-c-k-c0x00ffffff-no-rj',
  //         img: {
  //           default: {
  //             url: 'https://yt3.ggpht.com/ytc/AIdro_mRg7NoUgSO3sNaGrYg_1KYAQUoa4zQTPWuqeKfXWemFAY=s88-c-k-c0x00ffffff-no-rj',
  //             width: 88,
  //             height: 88,
  //           },
  //           medium: {
  //             url: 'https://yt3.ggpht.com/ytc/AIdro_mRg7NoUgSO3sNaGrYg_1KYAQUoa4zQTPWuqeKfXWemFAY=s240-c-k-c0x00ffffff-no-rj',
  //             width: 240,
  //             height: 240,
  //           },
  //           high: {
  //             url: 'https://yt3.ggpht.com/ytc/AIdro_mRg7NoUgSO3sNaGrYg_1KYAQUoa4zQTPWuqeKfXWemFAY=s800-c-k-c0x00ffffff-no-rj',
  //             width: 800,
  //             height: 800,
  //           },
  //         },
  //         subscribersCount: '714.0K',
  //       },
  //       {
  //         channelId: 'UC9qctUVUfQpqwmMMR4H-A_Q',
  //         title: 'Apple Saudi Arabia',
  //         description:
  //           'أهلاً بكم في قناة Apple الرسمية على YouTube. تجدون هنا أحدث الأخبار عن منتجاتنا المطروحة حديثاً، والعروض التوضيحية والتعليمية، والمزيد من المحتوى الرائع.\n\nأحدثت Apple ثورة في عالم التقنية الشخصية منذ طرحها لجهاز Macintosh في 1984. اليوم تستمر Apple بالريادة العالمية في الإبتكار، من خلال منتجات مثل iPhone وiPad وMac وApple Watch. منصات برامجنا الخمسة (iOS وiPadOS وmacOS وwatchOS وtvOS) تحرص على تقديم تجربة مستخدم سلسة عبر أجهزة Apple المختلفة. تتضمن خدماتنا المبتكرة App Store، وApple Music، وApple Pay، وiCloud. تستمر Apple في رحلتها بابتكار منتجات مثل HomePod، وApple Fitness+، وApple Card. لدى شركة Apple أكثر من 160 ألف موظف يعملون بجدٍّ لصنع أفضل المنتجات في العالم، ولترك الأرض في وضع أفضل مما كانت عليه.\n\nمن المنتجات الإضافية أيضًا: AirPods، وAirTags، وApple Arcade، وApple Books، وApple News، وApple Podcasts، وApple TV، وiPod touch.',
  //         thumbnail:
  //           'https://yt3.ggpht.com/Z6sINYwvculn1KrBt3Nf4QcjWrMqyml1OKN6ZfQ0LKhK_4JYfNCfduqUb8Ghr5R2SBT_W20vkQ=s800-c-k-c0x00ffffff-no-rj',
  //         img: {
  //           default: {
  //             url: 'https://yt3.ggpht.com/Z6sINYwvculn1KrBt3Nf4QcjWrMqyml1OKN6ZfQ0LKhK_4JYfNCfduqUb8Ghr5R2SBT_W20vkQ=s88-c-k-c0x00ffffff-no-rj',
  //             width: 88,
  //             height: 88,
  //           },
  //           medium: {
  //             url: 'https://yt3.ggpht.com/Z6sINYwvculn1KrBt3Nf4QcjWrMqyml1OKN6ZfQ0LKhK_4JYfNCfduqUb8Ghr5R2SBT_W20vkQ=s240-c-k-c0x00ffffff-no-rj',
  //             width: 240,
  //             height: 240,
  //           },
  //           high: {
  //             url: 'https://yt3.ggpht.com/Z6sINYwvculn1KrBt3Nf4QcjWrMqyml1OKN6ZfQ0LKhK_4JYfNCfduqUb8Ghr5R2SBT_W20vkQ=s800-c-k-c0x00ffffff-no-rj',
  //             width: 800,
  //             height: 800,
  //           },
  //         },
  //         subscribersCount: '111.0K',
  //       },
  //       {
  //         channelId: 'UCh5CL7XbLPZPfJa7Bf6ifng',
  //         title: 'Apple France',
  //         description:
  //           'Bienvenue sur la chaîne YouTube officielle d’Apple. Vous y trouverez des informations sur les lancements de produits, des tutoriels et bien d’autres contenus passionnants. \n\nEn 1984, Apple révolutionnait la technologie personnelle avec le lancement du Macintosh. Aujourd’hui, nous restons leader mondial en matière d’innovation, avec des produits comme l’iPhone, l’iPad, le Mac et l’Apple Watch. Nos cinq plateformes logicielles (iOS, iPadOS, macOS, watchOS et tvOS) offrent des expériences uniques pour tous les appareils Apple. Parmi ces services innovants, citons l’App Store, Apple Music, Apple Pay et iCloud. Et nous continuons d’innover avec des produits comme HomePod, Apple Fitness+ et Apple Card. Nous employons globalement plus de 160 000 personnes pour concevoir les meilleurs produits et contribuer à rendre le monde meilleur.\n\nParmi les autres produits et services Apple, citons AirPods, AirTags, Apple Arcade, Apple Books, Apple News, Apple Podcasts, Apple TV et iPod touch.',
  //         thumbnail:
  //           'https://yt3.ggpht.com/ytc/AIdro_kD-uOjJ71ZHwOBUKxfovzXcIVd-K-ufaRvN2kZWuObvks=s800-c-k-c0x00ffffff-no-rj',
  //         img: {
  //           default: {
  //             url: 'https://yt3.ggpht.com/ytc/AIdro_kD-uOjJ71ZHwOBUKxfovzXcIVd-K-ufaRvN2kZWuObvks=s88-c-k-c0x00ffffff-no-rj',
  //             width: 88,
  //             height: 88,
  //           },
  //           medium: {
  //             url: 'https://yt3.ggpht.com/ytc/AIdro_kD-uOjJ71ZHwOBUKxfovzXcIVd-K-ufaRvN2kZWuObvks=s240-c-k-c0x00ffffff-no-rj',
  //             width: 240,
  //             height: 240,
  //           },
  //           high: {
  //             url: 'https://yt3.ggpht.com/ytc/AIdro_kD-uOjJ71ZHwOBUKxfovzXcIVd-K-ufaRvN2kZWuObvks=s800-c-k-c0x00ffffff-no-rj',
  //             width: 800,
  //             height: 800,
  //           },
  //         },
  //         subscribersCount: '587.0K',
  //       },
  //       {
  //         channelId: 'UCcw6J0OSd6JFqf81455S-HA',
  //         title: 'Apple Craft',
  //         description: 'Minecraft is my life! 🍎\n\n#minecraft #craft #minecraftvideos \n',
  //         thumbnail:
  //           'https://yt3.ggpht.com/11gkkgIx4m7-jtbNTotCweQBpjMXa6t3VCqHB4JnxjV4uS_CVaki4NmZutj8etZ9ycsaDuBI=s800-c-k-c0x00ffffff-no-rj',
  //         img: {
  //           default: {
  //             url: 'https://yt3.ggpht.com/11gkkgIx4m7-jtbNTotCweQBpjMXa6t3VCqHB4JnxjV4uS_CVaki4NmZutj8etZ9ycsaDuBI=s88-c-k-c0x00ffffff-no-rj',
  //             width: 88,
  //             height: 88,
  //           },
  //           medium: {
  //             url: 'https://yt3.ggpht.com/11gkkgIx4m7-jtbNTotCweQBpjMXa6t3VCqHB4JnxjV4uS_CVaki4NmZutj8etZ9ycsaDuBI=s240-c-k-c0x00ffffff-no-rj',
  //             width: 240,
  //             height: 240,
  //           },
  //           high: {
  //             url: 'https://yt3.ggpht.com/11gkkgIx4m7-jtbNTotCweQBpjMXa6t3VCqHB4JnxjV4uS_CVaki4NmZutj8etZ9ycsaDuBI=s800-c-k-c0x00ffffff-no-rj',
  //             width: 800,
  //             height: 800,
  //           },
  //         },
  //         subscribersCount: '264.0K',
  //       },
  //       {
  //         channelId: 'UCcj-jHbPUgQqpfTJRGpByRA',
  //         title: 'Apple Brasil',
  //         description:
  //           'Bem-vindo ao canal oficial da Apple no YouTube. Aqui você encontrará notícias sobre lançamentos de produtos, tutoriais e mais conteúdo incrível.\n\nA Apple revolucionou a tecnologia pessoal com o lançamento do Macintosh em 1984. Hoje, a Apple é líder de inovação global com iPhone, iPad, Mac e Apple Watch. Nossas cinco plataformas de software — iOS, iPadOS, macOS, watchOS e tvOS — fornecem uma experiência integrada em todos os dispositivos Apple. Serviços inovadores incluem App Store, Apple Music, Apple Pay e iCloud. Além disso, a Apple continua inovando sempre com produtos, como HomePod, Apple Fitness+ e Apple Card. Nossos mais de 160 mil funcionários se dedicam a fazer os melhores produtos do mundo e a deixar nosso planeta melhor. \n\nProdutos adicionais incluem AirPods, AirTags, Apple Arcade, Apple Books, Apple News, Apple Podcasts, Apple TV e iPod touch.',
  //         thumbnail:
  //           'https://yt3.ggpht.com/M6YRDTT4TuycM6WeCoAC3UBre6Yu_i7RnK6bIs8ysWM1PBJFBvA9uOryoK_kF_4UeHKvTpPdLCY=s800-c-k-c0x00ffffff-no-rj',
  //         img: {
  //           default: {
  //             url: 'https://yt3.ggpht.com/M6YRDTT4TuycM6WeCoAC3UBre6Yu_i7RnK6bIs8ysWM1PBJFBvA9uOryoK_kF_4UeHKvTpPdLCY=s88-c-k-c0x00ffffff-no-rj',
  //             width: 88,
  //             height: 88,
  //           },
  //           medium: {
  //             url: 'https://yt3.ggpht.com/M6YRDTT4TuycM6WeCoAC3UBre6Yu_i7RnK6bIs8ysWM1PBJFBvA9uOryoK_kF_4UeHKvTpPdLCY=s240-c-k-c0x00ffffff-no-rj',
  //             width: 240,
  //             height: 240,
  //           },
  //           high: {
  //             url: 'https://yt3.ggpht.com/M6YRDTT4TuycM6WeCoAC3UBre6Yu_i7RnK6bIs8ysWM1PBJFBvA9uOryoK_kF_4UeHKvTpPdLCY=s800-c-k-c0x00ffffff-no-rj',
  //             width: 800,
  //             height: 800,
  //           },
  //         },
  //         subscribersCount: '3.8M',
  //       },
  //       {
  //         channelId: 'UC1Myj674wRVXB9I4c6Hm5zA',
  //         title: 'Apple TV',
  //         description:
  //           'The official rabbit hole of Apple TV+\n\nApple TV+ is a streaming service with original stories from the most creative minds in TV and film. Watch now on the Apple TV app: https://apple.co/_AppleTVapp\n',
  //         thumbnail:
  //           'https://yt3.ggpht.com/ytc/AIdro_nppMjm4op7es6kjvbv2DSpU982hkTz7N4o_nqtCB3PeHM=s800-c-k-c0x00ffffff-no-rj',
  //         img: {
  //           default: {
  //             url: 'https://yt3.ggpht.com/ytc/AIdro_nppMjm4op7es6kjvbv2DSpU982hkTz7N4o_nqtCB3PeHM=s88-c-k-c0x00ffffff-no-rj',
  //             width: 88,
  //             height: 88,
  //           },
  //           medium: {
  //             url: 'https://yt3.ggpht.com/ytc/AIdro_nppMjm4op7es6kjvbv2DSpU982hkTz7N4o_nqtCB3PeHM=s240-c-k-c0x00ffffff-no-rj',
  //             width: 240,
  //             height: 240,
  //           },
  //           high: {
  //             url: 'https://yt3.ggpht.com/ytc/AIdro_nppMjm4op7es6kjvbv2DSpU982hkTz7N4o_nqtCB3PeHM=s800-c-k-c0x00ffffff-no-rj',
  //             width: 800,
  //             height: 800,
  //           },
  //         },
  //         subscribersCount: '1.8M',
  //       },
  //       {
  //         channelId: 'UCfw2hvuj40AChU7n-N-PRHA',
  //         title: 'Apple Explained',
  //         description:
  //           'Apple Explained is a YouTube channel created by Greg Wyatt Jr. He creates animated videos to explain various aspects of Apple and their products.\n\nViewers can contact Greg here: info@appleexplained.com',
  //         thumbnail:
  //           'https://yt3.ggpht.com/hZKYJUQbjlo0ph5iCIlGvpKF2oRI0EXAbVGYCimQobs-rtThHKtZEFMVxgSrOxy4IJIxQ3lu=s800-c-k-c0x00ffffff-no-rj',
  //         img: {
  //           default: {
  //             url: 'https://yt3.ggpht.com/hZKYJUQbjlo0ph5iCIlGvpKF2oRI0EXAbVGYCimQobs-rtThHKtZEFMVxgSrOxy4IJIxQ3lu=s88-c-k-c0x00ffffff-no-rj',
  //             width: 88,
  //             height: 88,
  //           },
  //           medium: {
  //             url: 'https://yt3.ggpht.com/hZKYJUQbjlo0ph5iCIlGvpKF2oRI0EXAbVGYCimQobs-rtThHKtZEFMVxgSrOxy4IJIxQ3lu=s240-c-k-c0x00ffffff-no-rj',
  //             width: 240,
  //             height: 240,
  //           },
  //           high: {
  //             url: 'https://yt3.ggpht.com/hZKYJUQbjlo0ph5iCIlGvpKF2oRI0EXAbVGYCimQobs-rtThHKtZEFMVxgSrOxy4IJIxQ3lu=s800-c-k-c0x00ffffff-no-rj',
  //             width: 800,
  //             height: 800,
  //           },
  //         },
  //         subscribersCount: '1.4M',
  //       },
  //       {
  //         channelId: 'UCfJcxY7o1UjUQE4oObwritw',
  //         title: 'Apple UK',
  //         description:
  //           'Welcome to the official Apple YouTube channel. Here you’ll find news about product launches, tutorials, and other great content. \n\nApple revolutionized personal technology with the introduction of the Macintosh in 1984. Today Apple continues to be a global leader in innovation with products like iPhone, iPad, Mac, and Apple Watch. Our five software platforms (iOS, iPadOS, macOS, watchOS, and tvOS) provide seamless experiences across Apple devices. Breakthrough services include the App Store, Apple Music, Apple Pay, and iCloud. And Apple keeps pursuing innovation with products like HomePod, Apple Fitness+, and Apple Card. Apple’s more than 160,000 employees are dedicated to making the best products on earth, and to leaving the world better than we found it. \n\nAdditional products include AirPods, AirTags, Apple Arcade, Apple Books, Apple News, Apple Podcasts, Apple TV, and iPod touch.',
  //         thumbnail:
  //           'https://yt3.ggpht.com/bSdD99YvjIxBZpMD3101k4gR8fYYbuqxHAri7_YZ53TifBbAKADnGQLxHHQleCdkFiRMGw0mZNA=s800-c-k-c0x00ffffff-no-rj',
  //         img: {
  //           default: {
  //             url: 'https://yt3.ggpht.com/bSdD99YvjIxBZpMD3101k4gR8fYYbuqxHAri7_YZ53TifBbAKADnGQLxHHQleCdkFiRMGw0mZNA=s88-c-k-c0x00ffffff-no-rj',
  //             width: 88,
  //             height: 88,
  //           },
  //           medium: {
  //             url: 'https://yt3.ggpht.com/bSdD99YvjIxBZpMD3101k4gR8fYYbuqxHAri7_YZ53TifBbAKADnGQLxHHQleCdkFiRMGw0mZNA=s240-c-k-c0x00ffffff-no-rj',
  //             width: 240,
  //             height: 240,
  //           },
  //           high: {
  //             url: 'https://yt3.ggpht.com/bSdD99YvjIxBZpMD3101k4gR8fYYbuqxHAri7_YZ53TifBbAKADnGQLxHHQleCdkFiRMGw0mZNA=s800-c-k-c0x00ffffff-no-rj',
  //             width: 800,
  //             height: 800,
  //           },
  //         },
  //         subscribersCount: '456.0K',
  //       },
  //       {
  //         channelId: 'UCGMcVCg3tHKmy9oaUCIw8xw',
  //         title: 'Apple India',
  //         description:
  //           'Welcome to the official Apple YouTube channel. Here you’ll find news about product launches, tutorials, and other great content. \n\nApple revolutionized personal technology with the introduction of the Macintosh in 1984. Today Apple continues to be a global leader in innovation with products like iPhone, iPad, Mac, and Apple Watch. Our five software platforms (iOS, iPadOS, macOS, watchOS, and tvOS) provide seamless experiences across Apple devices. Breakthrough services include the App Store, Apple Music, Apple Pay, and iCloud. And Apple keeps pursuing innovation with products like HomePod, Apple Fitness+, and Apple Card. Apple’s more than 160,000 employees are dedicated to making the best products on earth, and to leaving the world better than we found it. \n\nAdditional products include AirPods, AirTags, Apple Arcade, Apple Books, Apple News, Apple Podcasts, Apple TV, and iPod touch.',
  //         thumbnail:
  //           'https://yt3.ggpht.com/2_sHsG6tjwgoRDtIzlgwmkfyijrmbe70Cjn8p-R9XX3fLf9_jmlKGx2KcPZwKfhYS-cbVoS6=s800-c-k-c0x00ffffff-no-rj',
  //         img: {
  //           default: {
  //             url: 'https://yt3.ggpht.com/2_sHsG6tjwgoRDtIzlgwmkfyijrmbe70Cjn8p-R9XX3fLf9_jmlKGx2KcPZwKfhYS-cbVoS6=s88-c-k-c0x00ffffff-no-rj',
  //             width: 88,
  //             height: 88,
  //           },
  //           medium: {
  //             url: 'https://yt3.ggpht.com/2_sHsG6tjwgoRDtIzlgwmkfyijrmbe70Cjn8p-R9XX3fLf9_jmlKGx2KcPZwKfhYS-cbVoS6=s240-c-k-c0x00ffffff-no-rj',
  //             width: 240,
  //             height: 240,
  //           },
  //           high: {
  //             url: 'https://yt3.ggpht.com/2_sHsG6tjwgoRDtIzlgwmkfyijrmbe70Cjn8p-R9XX3fLf9_jmlKGx2KcPZwKfhYS-cbVoS6=s800-c-k-c0x00ffffff-no-rj',
  //             width: 800,
  //             height: 800,
  //           },
  //         },
  //         subscribersCount: '13.2M',
  //       },
  //       {
  //         channelId: 'UCE_M8A5yxnLfW0KghEeajjw',
  //         title: 'Apple',
  //         description:
  //           'Welcome to the official Apple YouTube channel. Here you’ll find news about product launches, tutorials, and other great content. \n\nApple revolutionized personal technology with the introduction of the Macintosh in 1984. Today Apple continues to be a global leader in innovation with products like iPhone, iPad, Mac, Apple Watch and Apple Vision Pro. Our six software platforms (iOS, iPadOS, macOS, watchOS, tvOS, and visionOS) provide seamless experiences across Apple devices. Breakthrough services include the App Store, Apple Music, Apple Pay, and iCloud. And Apple keeps pursuing innovation with products like HomePod, Apple Fitness+, and Apple Card. Apple’s more than 160,000 employees are dedicated to making the best products on earth, and to leaving the world better than we found it. \n\nAdditional products include AirPods, AirTags, Apple Arcade, Apple Books, Apple News, Apple Podcasts, and Apple TV.',
  //         thumbnail:
  //           'https://yt3.ggpht.com/05lhMeAH6tZrPIUsp2yHNz3DwzhKbDUQcxcY0_qeXVyZttR_pktBzw0FcLUSR6D4fVqsEgL3ZO0=s800-c-k-c0x00ffffff-no-rj',
  //         img: {
  //           default: {
  //             url: 'https://yt3.ggpht.com/05lhMeAH6tZrPIUsp2yHNz3DwzhKbDUQcxcY0_qeXVyZttR_pktBzw0FcLUSR6D4fVqsEgL3ZO0=s88-c-k-c0x00ffffff-no-rj',
  //             width: 88,
  //             height: 88,
  //           },
  //           medium: {
  //             url: 'https://yt3.ggpht.com/05lhMeAH6tZrPIUsp2yHNz3DwzhKbDUQcxcY0_qeXVyZttR_pktBzw0FcLUSR6D4fVqsEgL3ZO0=s240-c-k-c0x00ffffff-no-rj',
  //             width: 240,
  //             height: 240,
  //           },
  //           high: {
  //             url: 'https://yt3.ggpht.com/05lhMeAH6tZrPIUsp2yHNz3DwzhKbDUQcxcY0_qeXVyZttR_pktBzw0FcLUSR6D4fVqsEgL3ZO0=s800-c-k-c0x00ffffff-no-rj',
  //             width: 800,
  //             height: 800,
  //           },
  //         },
  //         subscribersCount: '19.2M',
  //       },
  //       {
  //         channelId: 'UCXNi96LB5AZcQVHnNGwo96g',
  //         title: 'Apple Gaming',
  //         description:
  //           '所属 : 父ノ背中\nほぼ毎日昼12時投稿\nプレイゲーム : レインボーシックスシージ . Fortnite . VALORANT . Apex\nゲーミングデバイスの開封・レビュー動画も出してます\nデジタルガジェット系も好物です\n',
  //         thumbnail:
  //           'https://yt3.ggpht.com/ytc/AIdro_k9ii3OMWOb6eKQKv8GbeBfkMc5P6LlAwM1j-aJyqP98K8=s800-c-k-c0x00ffffff-no-rj',
  //         img: {
  //           default: {
  //             url: 'https://yt3.ggpht.com/ytc/AIdro_k9ii3OMWOb6eKQKv8GbeBfkMc5P6LlAwM1j-aJyqP98K8=s88-c-k-c0x00ffffff-no-rj',
  //             width: 88,
  //             height: 88,
  //           },
  //           medium: {
  //             url: 'https://yt3.ggpht.com/ytc/AIdro_k9ii3OMWOb6eKQKv8GbeBfkMc5P6LlAwM1j-aJyqP98K8=s240-c-k-c0x00ffffff-no-rj',
  //             width: 240,
  //             height: 240,
  //           },
  //           high: {
  //             url: 'https://yt3.ggpht.com/ytc/AIdro_k9ii3OMWOb6eKQKv8GbeBfkMc5P6LlAwM1j-aJyqP98K8=s800-c-k-c0x00ffffff-no-rj',
  //             width: 800,
  //             height: 800,
  //           },
  //         },
  //         subscribersCount: '194.0K',
  //       },
  //       {
  //         channelId: 'UCdHwip-Xqhp-nZIywpI67sw',
  //         title: 'Apple 대한민국',
  //         description:
  //           'Apple 공식 YouTube 채널에 오신 것을 환영합니다. 이곳에서 제품 출시 소식과 튜토리얼 등 유익한 콘텐츠를 만날 수 있습니다.\n\nApple은 1984년 Macintosh를 선보이며 개인 기술에 혁명을 일으켰고, 현재 iPhone, iPad, Mac, Apple Watch 등의 제품으로 전 세계 혁신의 선두를 지키고 있습니다. 저희의 5가지 소프트웨어 플랫폼(iOS, iPadOS, macOS, watchOS, tvOS)은 다양한 Apple 기기에서 매끄러운 사용 경험을 제공하죠. Apple은 또한 App Store, Apple Music, Apple Pay, iCloud 등의 획기적인 서비스 및 HomePod, Apple Fitness+, Apple Card 등의 제품을 통해 지속적인 혁신을 추구합니다. 세계 최고의 제품을 만들고, 더 나은 세상을 열어 가기 위해 16만 명의 Apple 직원들은 끊임없이 노력하고 있습니다.\n\nApple 제품으로는 그 외에도 AirPods, AirTags, Apple Arcade, Apple Books, Apple News, Apple Podcasts, Apple TV, iPod touch 등이 있습니다.',
  //         thumbnail:
  //           'https://yt3.ggpht.com/ytc/AIdro_kt5wWyx5mgGt4M76y87ArgV-_jyEGiONOZ8hOf94tPwZQ=s800-c-k-c0x00ffffff-no-rj',
  //         img: {
  //           default: {
  //             url: 'https://yt3.ggpht.com/ytc/AIdro_kt5wWyx5mgGt4M76y87ArgV-_jyEGiONOZ8hOf94tPwZQ=s88-c-k-c0x00ffffff-no-rj',
  //             width: 88,
  //             height: 88,
  //           },
  //           medium: {
  //             url: 'https://yt3.ggpht.com/ytc/AIdro_kt5wWyx5mgGt4M76y87ArgV-_jyEGiONOZ8hOf94tPwZQ=s240-c-k-c0x00ffffff-no-rj',
  //             width: 240,
  //             height: 240,
  //           },
  //           high: {
  //             url: 'https://yt3.ggpht.com/ytc/AIdro_kt5wWyx5mgGt4M76y87ArgV-_jyEGiONOZ8hOf94tPwZQ=s800-c-k-c0x00ffffff-no-rj',
  //             width: 800,
  //             height: 800,
  //           },
  //         },
  //         subscribersCount: '441.0K',
  //       },
  //       {
  //         channelId: 'UCMWc04n2YO39TRyi1I1o9pw',
  //         title: 'Apple Deutschland',
  //         description:
  //           'Herzlich Willkommen auf dem offiziellen YouTube-Kanal von Apple! Hier findest du News zu Produkten, Tutorials und weitere spannende Beiträge.\n\nMit der Einführung des Macintosh im Jahr 1984 hat Apple die Heimtechnologie revolutioniert. Mit Produkten wie iPhone, iPad, Mac und Apple Watch ist Apple auch heute ein weltweiter Innovationsführer. Unsere fünf Softwareplattformen (iOS, iPadOS, macOS, watchOS und tvOS) sorgen für ein nahtloses Erlebnis auf allen Apple-Geräten. Zu unseren wegweisenden Diensten gehören der App Store, Apple Music, Apple Pay und iCloud. Und Apple treibt die Innovation mit Produkten wie HomePod, Apple Fitness+ und Apple Card weiter voran. Unsere mehr als 160.000 Mitarbeiter:innen setzen sich dafür ein, die besten Produkte zu entwickeln und einen Beitrag für eine bessere Welt zu leisten.\n\nWeitere Produkte sind AirPods, AirTags, Apple Arcade, Apple Books, Apple News, Apple Podcasts, Apple TV und iPod touch.',
  //         thumbnail:
  //           'https://yt3.ggpht.com/ytc/AIdro_ndkv5Mty93hoJOC8RSsrh-84yMyn-aJJTSTCmsIvIJ6lo=s800-c-k-c0x00ffffff-no-rj',
  //         img: {
  //           default: {
  //             url: 'https://yt3.ggpht.com/ytc/AIdro_ndkv5Mty93hoJOC8RSsrh-84yMyn-aJJTSTCmsIvIJ6lo=s88-c-k-c0x00ffffff-no-rj',
  //             width: 88,
  //             height: 88,
  //           },
  //           medium: {
  //             url: 'https://yt3.ggpht.com/ytc/AIdro_ndkv5Mty93hoJOC8RSsrh-84yMyn-aJJTSTCmsIvIJ6lo=s240-c-k-c0x00ffffff-no-rj',
  //             width: 240,
  //             height: 240,
  //           },
  //           high: {
  //             url: 'https://yt3.ggpht.com/ytc/AIdro_ndkv5Mty93hoJOC8RSsrh-84yMyn-aJJTSTCmsIvIJ6lo=s800-c-k-c0x00ffffff-no-rj',
  //             width: 800,
  //             height: 800,
  //           },
  //         },
  //         subscribersCount: '405.0K',
  //       },
  //       {
  //         channelId: 'UCYFQ33UIPERYx8-ZHucZbDA',
  //         title: 'Apple Support',
  //         description: 'Tips and how-tos—straight from Apple.',
  //         thumbnail:
  //           'https://yt3.ggpht.com/ytc/AIdro_lJEtDh1MLI4pVkacP5nGr3_i1iP_x12fi-0coGrw_C5Aw=s800-c-k-c0x00ffffff-no-rj',
  //         img: {
  //           default: {
  //             url: 'https://yt3.ggpht.com/ytc/AIdro_lJEtDh1MLI4pVkacP5nGr3_i1iP_x12fi-0coGrw_C5Aw=s88-c-k-c0x00ffffff-no-rj',
  //             width: 88,
  //             height: 88,
  //           },
  //           medium: {
  //             url: 'https://yt3.ggpht.com/ytc/AIdro_lJEtDh1MLI4pVkacP5nGr3_i1iP_x12fi-0coGrw_C5Aw=s240-c-k-c0x00ffffff-no-rj',
  //             width: 240,
  //             height: 240,
  //           },
  //           high: {
  //             url: 'https://yt3.ggpht.com/ytc/AIdro_lJEtDh1MLI4pVkacP5nGr3_i1iP_x12fi-0coGrw_C5Aw=s800-c-k-c0x00ffffff-no-rj',
  //             width: 800,
  //             height: 800,
  //           },
  //         },
  //         subscribersCount: '1.8M',
  //       },
  //       {
  //         channelId: 'UClRndksq206TDYB-xUduVPA',
  //         title: 'White Apple Communications',
  //         description:
  //           "White Apple Communications channel specializes in unboxing of cell phones and speed test and also other products related to technology.\nFree Cash on Delivery Available all over Pakistan.\nIn the spirit of learning and exchange of cell phones buying and selling.\nWe hope to receive a lot of support around the world.\nPlease Subscribe to our Channel.\n\n#50000 SUBSCRIBERS 17SEP2022 @ 10:40:19Am\n\n#10Million Views with Achievement of 94000 Subscriber's 30thMarch2023 @5pm \n\nWhatsapp #\n +923371717179\n +923350080946\n +923309500300\n +923158787709\n\nLand Line #\n +920912561136\n\nShop Address: \nShop# A5, ESSA KHAIL PLAZA, HASHTNAGRI STOP NEAR MUSHTAQ TEA STORE, MAIN GRAND TRUNK ROAD,\nPESHAWAR, PAKISTAN\n",
  //         thumbnail:
  //           'https://yt3.ggpht.com/ytc/AIdro_mxofZmAjgvsfRPlDffq6sMb0HBh_PwsODN831aJq9FTg=s800-c-k-c0x00ffffff-no-rj',
  //         img: {
  //           default: {
  //             url: 'https://yt3.ggpht.com/ytc/AIdro_mxofZmAjgvsfRPlDffq6sMb0HBh_PwsODN831aJq9FTg=s88-c-k-c0x00ffffff-no-rj',
  //             width: 88,
  //             height: 88,
  //           },
  //           medium: {
  //             url: 'https://yt3.ggpht.com/ytc/AIdro_mxofZmAjgvsfRPlDffq6sMb0HBh_PwsODN831aJq9FTg=s240-c-k-c0x00ffffff-no-rj',
  //             width: 240,
  //             height: 240,
  //           },
  //           high: {
  //             url: 'https://yt3.ggpht.com/ytc/AIdro_mxofZmAjgvsfRPlDffq6sMb0HBh_PwsODN831aJq9FTg=s800-c-k-c0x00ffffff-no-rj',
  //             width: 800,
  //             height: 800,
  //           },
  //         },
  //         subscribersCount: '173.0K',
  //       },
  //       {
  //         channelId: 'UC_dRA4Gl7XHnXvpcP5T0Vww',
  //         title: 'Apple Россия',
  //         description:
  //           'Приветствуем вас на официальном канале Apple на YouTube. Здесь вы найдете интересную информацию о наших новых устройствах, обучающие видео и другие полезные материалы.\n\nВ 1984 году компания Apple внесла огромный вклад в развитие технологий, создав первый персональный компьютер в линейке Macintosh. Сегодня мы остаемся лидерами в сфере инноваций, выпуская iPhone, iPad, Mac и Apple Watch. Пять наших программных платформ (iOS, iPadOS, macOS, watchOS и tvOS) обеспечивают отличную работу всех устройств Apple, а уникальные сервисы App Store, Apple Music, Apple Pay и iCloud делают жизнь ярче. Благодаря новым технологиям мы постоянно разрабатываем новые продукты, такие как HomePod, Apple Fitness+ и Apple Card. Мы гордимся сервисами и устройствами, которые мы создали: среди них AirPods, AirTag, Apple Arcade, Apple Books, Apple News, Apple Podcasts, Apple TV, iPod touch. \n\nБолее 160 000 сотрудников Apple стремятся создавать отличные продукты и делать мир лучше.',
  //         thumbnail:
  //           'https://yt3.ggpht.com/ytc/AIdro_lSCR60t1b_SOZmwySCG8AoaDLjKK11_iSFT0WyabwtfmU=s800-c-k-c0x00ffffff-no-rj',
  //         img: {
  //           default: {
  //             url: 'https://yt3.ggpht.com/ytc/AIdro_lSCR60t1b_SOZmwySCG8AoaDLjKK11_iSFT0WyabwtfmU=s88-c-k-c0x00ffffff-no-rj',
  //             width: 88,
  //             height: 88,
  //           },
  //           medium: {
  //             url: 'https://yt3.ggpht.com/ytc/AIdro_lSCR60t1b_SOZmwySCG8AoaDLjKK11_iSFT0WyabwtfmU=s240-c-k-c0x00ffffff-no-rj',
  //             width: 240,
  //             height: 240,
  //           },
  //           high: {
  //             url: 'https://yt3.ggpht.com/ytc/AIdro_lSCR60t1b_SOZmwySCG8AoaDLjKK11_iSFT0WyabwtfmU=s800-c-k-c0x00ffffff-no-rj',
  //             width: 800,
  //             height: 800,
  //           },
  //         },
  //         subscribersCount: '673.0K',
  //       },
  //     ],
  //     url: 'apple',
  //   },
  //   videos: {
  //     selectedVideos: [
  //       {
  //         videoId: 'coAs7qLekCE',
  //         title:
  //           '#TimeBandits in a nutshell, if that nutshell was an ever-expanding magical adventure through history',
  //         thumbnail: 'https://i.ytimg.com/vi/coAs7qLekCE/mqdefault.jpg',
  //       },
  //       {
  //         videoId: '7cFlyphTCsg',
  //         title:
  //           'It&#39;s time to take down the cartel&#39;s money laundering scheme, no matter the cost. #CowboyCartel',
  //         thumbnail: 'https://i.ytimg.com/vi/7cFlyphTCsg/mqdefault.jpg',
  //       },
  //       {
  //         videoId: 'Iy4-cTtZD28',
  //         title: 'Whistle while you work? Hard pass. #WomenInBlue',
  //         thumbnail: 'https://i.ytimg.com/vi/Iy4-cTtZD28/mqdefault.jpg',
  //       },
  //     ],
  //     VideosList: [],
  //     url: '',
  //     selectedType: 1,
  //     ManualSelected: false,
  //   },
  //   audience: {
  //     automated: false,
  //     age: ['45-54', '18-24'],
  //     intrest: ['Arts & Entertainment', 'Business & Industrial', 'Games'],
  //     countries: ['Anguilla', 'Armenia'],
  //     tags: ['Health and Wellness', 'Travel', 'Finance'],
  //     gender: 'All genders',
  //   },
  //   budget: {
  //     amount: 4700,
  //     currency: 'USD',
  //     percentage: {
  //       custom_tax_percentage: 15,
  //       custom_percentage_enabled: true,
  //       custom_percentage_amount: 705,
  //     },
  //   },
  // };

  const ReviewDetails = [
    { name: 'Review the Budget', component: <BudgetReview data={campaignData.budget} /> },
    {
      name: 'Review the Channel',
      component: <ChannelReview data={campaignData?.channel?.selectedChannel} />,
    },
    {
      name: 'Review the Videos',
      component: <VideosReview data={campaignData?.videos?.selectedVideos} />,
    },
    {
      name: 'Review the Audience and Inrests Targeting',
      component: <AudienceAndInrestReview data={campaignData.audience} />,
    },
  ];

  const renderReview = (
    <Stack
      component="section"
      spacing={5}
      flex="1 1 auto"
      sx={{
        minWidth: 0,
        borderRadius: 2,
        p: { xs: 3, md: 5 },
        bgcolor: 'background.neutral',
        ...slotProps?.section,
      }}
    >
      {ReviewDetails.map((section, index) => (
        <Card key={index} className={queryClassName}>
          <CardHeader title={section.name} />
          <CardContent>{section.component}</CardContent>
        </Card>
      ))}
    </Stack>
  );
  return <>{renderReview}</>;
};

const BudgetReview = ({ data }) => {
  return (
    <Stack
      sx={{
        rowGap: 5,
        columnGap: 3,
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
      }}
    >
      <ComponentBlock title="Campaign Total Amount ($)">
        <Typography variant="body1">{fCurrency(data.amount)}</Typography>
      </ComponentBlock>
      <ComponentBlock title="Company's Revenue (%)">
        <Typography variant="body1">{data.percentage.custom_tax_percentage}%</Typography>
      </ComponentBlock>
      <ComponentBlock title="Revenue Amount ($)">
        <Typography variant="body1">
          {fCurrency(data.percentage.custom_percentage_amount)}
        </Typography>
      </ComponentBlock>
    </Stack>
  );
};

const ChannelReview = ({ data }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <ComponentBlock sx={{ p: 2 }} title="Selected Channel">
      {isLargeScreen ? (
        <Stack sx={{ flexDirection: 'row' }} alignItems="center" textAlign="center">
          <Stack sx={{ p: 3, pb: 0 }} alignItems="center" textAlign="center">
            <Avatar
              alt={data?.title}
              src={data?.thumbnail}
              variant="rounded"
              sx={{ width: 100, height: 100, mb: 2 }}
            />
          </Stack>
          <Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />
          <Stack sx={{ p: 3, pb: 2 }} textAlign="left">
            <Typography variant="button" sx={{ color: 'text.primary', pb: 2 }}>
              Channel Name: {decodeGoogleSpecialCharacters(data?.title)}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.primary', pb: 2 }}>
              Subscribers: {data?.subscribersCount}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.primary' }}>
              Description: {decodeGoogleSpecialCharacters(data?.description)}
            </Typography>
          </Stack>
        </Stack>
      ) : (
        <Grid container spacing={2} alignItems="center" textAlign="center">
          <Grid item xs={12}>
            <Stack alignItems="center" textAlign="center">
              <Avatar
                alt={data?.title}
                src={data?.thumbnail}
                variant="rounded"
                sx={{ width: 100, height: 100, mb: 2 }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ borderStyle: 'dashed', width: '100%' }} />
          </Grid>
          <Grid item xs={12}>
            <Stack textAlign="left">
              <Typography variant="button" sx={{ color: 'text.primary', pb: 2 }}>
                Channel Name: {decodeGoogleSpecialCharacters(data?.title)}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.primary', pb: 2 }}>
                Subscribers: {data?.subscribersCount}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.primary' }}>
                Description: {decodeGoogleSpecialCharacters(data?.title)}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      )}
    </ComponentBlock>
  );
};

const VideosReview = ({ data }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <ComponentBlock sx={{ p: 2 }} title="Selected Videos">
      {isLargeScreen ? (
        <Stack sx={{ flexDirection: 'column' }} alignItems="flex-start" textAlign="center">
          {data?.map((video, index) => (
            <React.Fragment key={index}>
              <Stack sx={{ flexDirection: 'row' }}>
                <Stack sx={{ p: 3, pb: 0 }} alignItems="center" textAlign="center">
                  <Avatar
                    alt={video?.title}
                    src={video?.thumbnail}
                    variant="rounded"
                    sx={{ width: 100, height: 100, mb: 2 }}
                  />
                </Stack>
                <Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />
                <Stack sx={{ p: 3, pb: 2 }} textAlign="left">
                  <Typography variant="button" sx={{ color: 'text.primary', pb: 2 }}>
                    Video Title : {decodeGoogleSpecialCharacters(video?.title)}
                  </Typography>
                </Stack>
              </Stack>
              {index < data.length - 1 && <Divider sx={{ borderStyle: 'dashed', width: '100%' }} />}
            </React.Fragment>
          ))}
        </Stack>
      ) : (
        <Grid container spacing={2}>
          {data?.map((video, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12}>
                <Stack sx={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <Avatar
                    alt={video?.title}
                    src={video?.thumbnail}
                    variant="rounded"
                    sx={{ width: 100, height: 100, mb: 2 }}
                  />
                  <Typography variant="caption" sx={{ color: 'text.primary', pb: 2 }}>
                    Video Title: {decodeGoogleSpecialCharacters(video?.title)}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ borderStyle: 'dashed', width: '100%' }} />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      )}
    </ComponentBlock>
  );
};

const AudienceAndInrestReview = ({ data }) => {
  return (
    <>
      {data.automated == true ? (
        <ComponentContainer>
          <ComponentBlock title="Automated Targetting">
            <Chip
              key="all-ages"
              color="info"
              variant="soft"
              sx={{
                whiteSpace: 'normal',
                height: 'auto',
                wordBreak: 'break-word',
                display: 'flex',
                alignItems: 'center',
                padding: '8px',
              }}
              label={
                <Box sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                  Automatic Targeting will use YouTube Ads Algorithm to show your videos in the
                  recommended list only to interested viewers that were watching similar content
                  worldwide.
                </Box>
              }
            />
          </ComponentBlock>
        </ComponentContainer>
      ) : (
        <ComponentContainer>
          {data.countries.length > 0 && (
            <ComponentBlock sx={{ gap: 1 }} title="Selected Countries">
              <GetCountries data={data?.countries} />
            </ComponentBlock>
          )}
          {data.age.length > 0 && (
            <ComponentBlock title="Selected Age">
              <RenderChips data={data?.age} type="age" />
            </ComponentBlock>
          )}
          {data.gender.length > 0 && (
            <ComponentBlock title="Selected Gender">
              <RenderChips data={data?.gender} type="gender" />
              {/* <Chip label={data?.gender} size="small" color="info" variant="soft" /> */}
            </ComponentBlock>
          )}
          {data.intrest.length > 0 && (
            <ComponentBlock title="Selected Intrests">
              <RenderChips data={data?.intrest} type="intrest" />
            </ComponentBlock>
          )}
          {data.tags.length > 0 && (
            <ComponentBlock title="Selected Tags">
              <RenderChips data={data?.tags} type="tags" />
            </ComponentBlock>
          )}
        </ComponentContainer>
      )}
    </>
  );
};

const GetCountries = ({ data }) => {
  return data.map((option, index) => {
    const country = getCountry(option);
    return (
      <Chip
        key={country.label}
        label={country.label}
        size="small"
        variant="soft"
        color="info"
        icon={<FlagIcon code={country.code} sx={{ width: 16, height: 16, borderRadius: '50%' }} />}
      />
    );
  });
};

const RenderChips = ({ data, type }) => {
  switch (type) {
    case 'age':
      if (data.includes('All ages')) {
        return <Chip key="all-ages" label="All ages" size="small" color="info" variant="soft" />;
      }

      // Sort the age ranges
      const sortedData = data.sort((a, b) => {
        const ageOrder = {
          '18-24': 1,
          '25-34': 2,
          '35-44': 3,
          '45-54': 4,
          '55-64': 5,
          '65+': 6,
        };
        return (ageOrder[a] || 0) - (ageOrder[b] || 0);
      });

      return sortedData.map((age, index) => (
        <Chip key={index} label={age} size="small" color="info" variant="soft" />
      ));
    case 'gender':
      return <Chip label={data} size="small" color="info" variant="soft" />;
    case 'intrest':
      return data.map((intrest, index) => (
        <Chip key={index} label={intrest} size="small" color="info" variant="soft" />
      ));
    case 'tags':
      return data.map((tags, index) => (
        <Chip key={index} label={tags} size="small" color="info" variant="soft" />
      ));
  }

  // if (type === 'age') {
  //   if (data.includes('All ages')) {
  //     return <Chip key="all-ages" label="All ages" size="small" color="info" variant="soft" />;
  //   }

  //   // Sort the age ranges
  //   const sortedData = data.sort((a, b) => {
  //     const ageOrder = {
  //       '18-24': 1,
  //       '25-34': 2,
  //       '35-44': 3,
  //       '45-54': 4,
  //       '55-64': 5,
  //       '65+': 6,
  //     };
  //     return (ageOrder[a] || 0) - (ageOrder[b] || 0);
  //   });

  //   return sortedData.map((age, index) => (
  //     <Chip key={index} label={age} size="small" color="info" variant="soft" />
  //   ));
  // }
  // return data.map((age, index) => (
  //   <Chip key={index} label={age} size="small" color="info" variant="soft" />
  // ));
};
