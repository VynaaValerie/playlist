const songs = [
    {
        "title": "Teramini - Ghea",
        "file": "/audio/Teramini-Ghea.mp3",
        "image": "https://telegra.ph/file/cdc3e5c8b924d57a36060.jpg",
        "description": "Lagu romantis oleh Ghea Indrawari.",
        "background": "https://telegra.ph/file/cdc3e5c8b924d57a36060.jpg"
    },
    {
        "title": "Sal Priadi - Gala Bunga",
        "file": "/audio/SalPriadi-Gala-bunga.mp3",
        "image": "https://telegra.ph/file/a609844fd6f3ab99ac4ef.jpg",
        "description": "Lagu indie penuh makna oleh Sal Priadi.",
        "background": "https://telegra.ph/file/a609844fd6f3ab99ac4ef.jpg"
    },
    {
        "title": "Bertaut - Nadin Amizah",
        "file": "/audio/Bertaut-Nadin-Amizah.mp3",
        "image": "https://telegra.ph/file/fca62ea24c5ad5288044f.jpg",
        "description": "Lagu tentang cinta yang tak terungkap oleh Nadin Amizah.",
        "background": "https://telegra.ph/file/fca62ea24c5ad5288044f.jpg"
    },
    {
        "title": "Ghea Indrawari - Jiwa Yang Bersedih",
        "file": "/audio/Ghea-Indrawari-Jiwa-Yang-Bersedih.mp3",
        "image": "https://telegra.ph/file/aa78c364673eceb44c0ff.jpg",
        "description": "Lagu tentang kesedihan dan penyesalan oleh Ghea Indrawari.",
        "background": "https://telegra.ph/file/aa78c364673eceb44c0ff.jpg"
    },
    {
        "title": "Bohongi Hati - Mahalini",
        "file": "/audio/Bohongi-hati-mahalini.mp3",
        "image": "https://telegra.ph/file/49a515c7390c3260472e3.jpg",
        "description": "Lagu tentang pura-pura bahagia oleh Mahalini.",
        "background": "https://telegra.ph/file/49a515c7390c3260472e3.jpg"
    },
    {
        "title": "DUKA - Last Child",
        "file": "/audio/DUKA-last-chilid.mp3",
        "image": "https://telegra.ph/file/aba254cf76a49fae21407.jpg",
        "description": "Lagu tentang kesedihan dan kehilangan oleh Last Child.",
        "background": "https://telegra.ph/file/aba254cf76a49fae21407.jpg"
    },
    {
        "title": "Mendua - Astrid",
        "file": "/audio/Mendua-Astrid.mp3",
        "image": "https://telegra.ph/file/a10370b50e724643008f9.jpg",
        "description": "Lagu tentang kebingungan dalam cinta oleh Astrid.",
        "background": "https://telegra.ph/file/a10370b50e724643008f9.jpg"
    },
    {
        "title": "Sekuat Hatimu - Last Child",
        "file": "/audio/Sekuat-Hatimu-Last-Child.mp3",
        "image": "https://telegra.ph/file/550ef2f05c4eed994beb4.jpg",
        "description": "Lagu tentang kekuatan cinta oleh Last Child.",
        "background": "https://telegra.ph/file/550ef2f05c4eed994beb4.jpg"
    },
    {
        "title": "Rindu Rumah - Wizz Baker",
        "file": "/audio/Wizz-Baker-Rindu-Rumah.mp3",
        "image": "https://telegra.ph/file/cf2463b5e83f3f28dcb12.jpg",
        "description": "Lagu tentang kerinduan akan rumah oleh Wizz Baker.",
        "background": "https://telegra.ph/file/cf2463b5e83f3f28dcb12.jpg"
    },
    {
        "title": "Bawadia Kembali - Mahalini",
        "file": "/audio/Mahalini-bawadia-kembali.mp3",
        "image": "https://telegra.ph/file/670e8d7d77f603efb78cf.jpg",
        "description": "Lagu tentang harapan dan kembalinya cinta oleh Mahalini.",
        "background": "https://telegra.ph/file/670e8d7d77f603efb78cf.jpg"
    },
    {
        "title": "Ajarkan Aku - Arvian Dwi",
        "file": "/audio/AJARKAN-AKU-ARVIAN-DWI.mp3",
        "image": "https://telegra.ph/file/f548f9a33579d4dc210a5.jpg",
        "description": "Lagu tentang belajar mencintai oleh Arvian Dwi.",
        "background": "https://telegra.ph/file/f548f9a33579d4dc210a5.jpg"
    },
    {
        "title": "Takut - Idgitaf",
        "file": "/audio/Takut-Idgitaf.mp3",
        "image": "https://telegra.ph/file/c103bf36302371de2963d.jpg",
        "description": "Lagu tentang ketakutan dalam cinta oleh Idgitaf.",
        "background": "https://telegra.ph/file/c103bf36302371de2963d.jpg"
    },
    {
        "title": "Hanya Rindu - Andmesh",
        "file": "/audio/ANDMESH-HANYA-RINDU.mp3",
        "image": "https://telegra.ph/file/7c56a77256acd3f8a8ae2.jpg",
        "description": "Lagu tentang kerinduan oleh Andmesh.",
        "background": "https://telegra.ph/file/7c56a77256acd3f8a8ae2.jpg"
    },
    {
        "title": "Tak Kan Hilang - Budi Doremi",
        "file": "/audio/TAK-KAN-HILANG-Budi-Doremi.mp3",
        "image": "https://telegra.ph/file/1aa0cf150ae3c664dd1bd.jpg",
        "description": "Lagu tentang cinta yang abadi oleh Budi Doremi.",
        "background": "https://telegra.ph/file/1aa0cf150ae3c664dd1bd.jpg"
    },
    {
        "title": "Nala - Tulus",
        "file": "/audio/TULUS-Nala.mp3",
        "image": "https://telegra.ph/file/25d0c4c6687728c0fb225.jpg",
        "description": "Lagu tentang cinta yang sederhana oleh Tulus.",
        "background": "https://telegra.ph/file/25d0c4c6687728c0fb225.jpg"
    },
    {
        "title": "Aku Yang Jatuh Cinta - Dudy Oris",
        "file": "/audio/Dudy-Oris-Aku-Yang-Jatuh-Cinta.mp3",
        "image": "https://telegra.ph/file/4bd164cf8c040c4a4becc.jpg",
        "description": "Lagu tentang jatuh cinta oleh Dudy Oris.",
        "background": "https://telegra.ph/file/4bd164cf8c040c4a4becc.jpg"
    },
    {
        "title": "Tak Dianggap - Lyodra",
        "file": "/audio/Lyodra-tak-Dianggap.mp3",
        "image": "https://telegra.ph/file/cac8e3202f6427b5d8e97.jpg",
        "description": "Lagu tentang perasaan tak dianggap oleh Lyodra.",
        "background": "https://telegra.ph/file/cac8e3202f6427b5d8e97.jpg"
    },
    {
        "title": "Ku Ingin Pisah - Nabila Taqiyyah",
        "file": "/audio/Ku-Ingin-Pisah-Nabila-Taqiyyah.mp3",
        "image": "https://telegra.ph/file/cdc3e5c8b924d57a36060.jpg",
        "description": "Lagu tentang keinginan untuk berpisah oleh Nabila Taqiyyah.",
        "background": "https://telegra.ph/file/cdc3e5c8b924d57a36060.jpg"
    },
    {
        "title": "Cukup - Ziva",
        "file": "/audio/Ziva-Magnolya-Cukup.mp3",
        "image": "https://telegra.ph/file/097c89f80f74b47dad392.jpg",
        "description": "Lagu tentang kepuasan dalam cinta oleh Ziva.",
        "background": "https://telegra.ph/file/097c89f80f74b47dad392.jpg"
    },
    {
        "title": "Berisik - Dere",
        "file": "/audio/Berisik-Dere.mp3",
        "image": "https://telegra.ph/file/f7234cbd5ff2e815c3ebe.jpg",
        "description": "Lagu tentang kegaduhan dalam hubungan oleh Dere.",
        "background": "https://telegra.ph/file/f7234cbd5ff2e815c3ebe.jpg"
    },
    {
        "title": "Asmalibrasi - Soegi Bornean",
        "file": "/audio/Soegi-Bornean-Asmalibrasi.mp3",
        "image": "https://telegra.ph/file/966dccb1549fc858bcd6e.jpg",
        "description": "Lagu tentang cinta yang sederhana oleh Soegi Bornean.",
        "background": "https://telegra.ph/file/966dccb1549fc858bcd6e.jpg"
    },
    {
        "title": "Ku Akan Menanti - Nikita Willy",
        "file": "/audio/KuAkan-Menanti-NikitaWilly.mp3",
        "image": "https://telegra.ph/file/87dd835eec372010c9e7d.jpg",
        "description": "Lagu tentang kesetiaan menanti cinta oleh Nikita Willy.",
        "background": "https://telegra.ph/file/87dd835eec372010c9e7d.jpg"
    },
    {
        "title": "Hapus Aku - Nidji",
        "file": "/audio/Hapus-Aku-Nidji.mp3",
        "image": "https://telegra.ph/file/5042ab83697eac160ba35.jpg",
        "description": "Lagu tentang keinginan untuk dilupakan oleh Nidji.",
        "background": "https://telegra.ph/file/5042ab83697eac160ba35.jpg"
    },
    {
        "title": "Karena Kamu - Geisha",
        "file": "/audio/Gheisha-Karena-Kamu.mp3",
        "image": "https://telegra.ph/file/ea8a771ad5485c251ec39.jpg",
        "description": "Lagu tentang cinta yang tulus oleh Geisha.",
        "background": "https://telegra.ph/file/ea8a771ad5485c251ec39.jpg"
    },
    {
        "title": "Terpikat Senyumu - Idgitaf",
        "file": "/audio/Idgitaf-Terpika-Senyumu.mp3",
        "image": "https://telegra.ph/file/ad23d806ee0a767d6bf72.jpg",
        "description": "Lagu tentang pesona senyuman oleh Idgitaf.",
        "background": "https://telegra.ph/file/ad23d806ee0a767d6bf72.jpg"
    },
    {
        "title": "Muak - Aruma",
        "file": "/audio/Muak-Aruma.mp3",
        "image": "https://telegra.ph/file/0a7143d421b291321e1c9.jpg",
        "description": "Lagu tentang kejenuhan dalam hubungan oleh Aruma.",
        "background": "https://telegra.ph/file/0a7143d421b291321e1c9.jpg"
    },
    {
        "title": "Diary Depresiku - Last Child",
        "file": "/audio/Diary-Depresiku-Last-Child.mp3",
        "image": "https://telegra.ph/file/ca076fbc055617a23d125.jpg",
        "description": "Lagu tentang depresi dan kesedihan oleh Last Child.",
        "background": "https://telegra.ph/file/ca076fbc055617a23d125.jpg"
    },
    {
        "title": "Tak Pernah Ternilai - Last Child",
        "file": "/audio/Last-Child-Tak-pernah-ternilai.mp3",
        "image": "https://telegra.ph/file/1d95e1f41104b89738b17.jpg",
        "description": "Lagu tentang cinta yang tak ternilai oleh Last Child.",
        "background": "https://telegra.ph/file/1d95e1f41104b89738b17.jpg"
    },
    {
        "title": "Dendam - Last Child feat Sansan",
        "file": "/audio/Last-Child-feat-Sansan-Dendam.mp3",
        "image": "https://telegra.ph/file/00288289f19304e418e7d.jpg",
        "description": "Lagu tentang dendam dalam cinta oleh Last Child feat Sansan.",
        "background": "https://telegra.ph/file/00288289f19304e418e7d.jpg"
    },
    {
        "title": "Pedih - Last Child",
        "file": "/audio/Last-Child-Pedih.mp3",
        "image": "https://telegra.ph/file/1d95e1f41104b89738b17.jpg",
        "description": "Lagu tentang kepedihan dalam cinta oleh Last Child.",
        "background": "https://telegra.ph/file/1d95e1f41104b89738b17.jpg"
    },
    {
        "title": "Govinda - masing masing",
        "file": "/audio/Ade-Govinda-masing-masing.mp3",
        "image": "https://files.catbox.moe/ne54wp.jpg",
        "description": "Lagu tentang perpisahan dan kebebasan oleh Govinda.",
        "background": "https://files.catbox.moe/ne54wp.jpg"
    },
    {
        "title": "Bila Memang Kamu - Betrand",
        "file": "/audio/BilaMemangKamu-Betrand.mp3",
        "image": "https://files.catbox.moe/nhu3kc.jpg",
        "description": "Lagu tentang cinta yang tulus oleh Betrand.",
        "background": "https://files.catbox.moe/nhu3kc.jpg"
    },
    {
        "title": "Tak Satu Cerita - Rizwan Ft Nabila",
        "file": "/audio/Tak-Satu-Cerita-Rizwan-Nabila.mp3",
        "image": "https://files.catbox.moe/sidcyg.jpg",
        "description": "Lagu tentang kisah cinta yang rumit oleh Rizwan ft Nabila.",
        "background": "https://files.catbox.moe/sidcyg.jpg"
    },
    {
        "title": "Sorai - Nadin Amizah",
        "file": "/audio/Sorai-Nadin-Amizah.mp3",
        "image": "https://files.catbox.moe/f5gpre.jpg",
        "description": "Lagu tentang cinta yang indah oleh Nadin Amizah.",
        "background": "https://files.catbox.moe/f5gpre.jpg"
    },
    {
        "title": "Nadin Amizah - Rayuan Perempuan Gila",
        "file": "/audio/Nadin-Amizah-Rayuan-Perempuan-Gila.mp3",
        "image": "https://files.catbox.moe/bhcofl.jpg",
        "description": "Lagu tentang rayuan yang menggoda oleh Nadin Amizah.",
        "background": "https://files.catbox.moe/bhcofl.jpg"
    },
    {
        "title": "Bernadya Satu - Bulan",
        "file": "/audio/Bernadya-Satu-Bulan.mp3",
        "image": "https://files.catbox.moe/bih5ke.jpg",
        "description": "Lagu tentang cinta yang sederhana oleh Bernadya.",
        "background": "https://files.catbox.moe/bih5ke.jpg"
    },
    {
        "title": "Mahalini - Melawan Restu",
        "file": "/audio/Mahalini-Melawan-Restu-Lirik.mp3",
        "image": "https://files.catbox.moe/y1eder.jpg",
        "description": "Lagu tentang cinta yang melawan restu oleh Mahalini.",
        "background": "https://files.catbox.moe/y1eder.jpg"
    },
    {
        "title": "Ghea Indrawari - Berdamai",
        "file": "/audio/Ghea-Indrawari-Berdamai.mp3",
        "image": "https://files.catbox.moe/5m8u96.jpg",
        "description": "Lagu tentang berdamai dengan masa lalu oleh Ghea Indrawari.",
        "background": "https://files.catbox.moe/5m8u96.jpg"
    },
    {
        "title": "Ghea - Masa Mudaku Habis",
        "file": "/audio/Ghea-Masa-Mudaku-Habis.mp3",
        "image": "https://files.catbox.moe/1qo7y7.jpg",
        "description": "Lagu tentang penyesalan dan masa muda oleh Ghea.",
        "background": "https://files.catbox.moe/1qo7y7.jpg"
    },
    {
        "title": "Mahalini - Putar Waktu",
        "file": "/audio/Mahalini-Putar-Waktu.mp3",
        "image": "https://files.catbox.moe/2qa0pq.jpg",
        "description": "Lagu tentang keinginan untuk memutar waktu oleh Mahalini.",
        "background": "https://files.catbox.moe/2qa0pq.jpg"
    },
    {
        "title": "Sisa Rasa - Mahalini",
        "file": "/audio/Sisa-Rasa-Mahalini.mp3",
        "image": "https://files.catbox.moe/3fwqfi.jpg",
        "description": "Lagu tentang sisa-sisa cinta oleh Mahalini.",
        "background": "https://files.catbox.moe/3fwqfi.jpg"
    },
    {
        "title": "Astrid - Silakan",
        "file": "/audio/Astrid-Silakan.mp3",
        "image": "https://files.catbox.moe/oydn6y.jpg",
        "description": "Lagu tentang kebebasan dalam cinta oleh Astrid.",
        "background": "https://files.catbox.moe/oydn6y.jpg"
    },
    {
        "title": "Lumpuhkan Ingatanku - Geisha",
        "file": "/audio/Lumpuhkan-Ingatanku-Geisha.mp3",
        "image": "https://files.catbox.moe/9hpvad.jpg",
        "description": "Lagu tentang keinginan untuk melupakan oleh Geisha.",
        "background": "https://files.catbox.moe/9hpvad.jpg"
    },
    {
        "title": "Kau Rumahku - Raisa",
        "file": "/audio/Kau_Rumahku_Raisa.mp3",
        "image": "https://qu.ax/uQdLk.jpg",
        "description": "Lagu romantis yang menggambarkan kenyamanan cinta sebagai rumah.",
        "background": "https://qu.ax/uQdLk.jpg"
    },
    {
        "title": "Usik - Feby Putri",
        "file": "/audio/Usik_Feby_Putri.mp3",
        "image": "https://qu.ax/ELbKk.jpg",
        "description": "Curahan hati tentang kegelisahan dan pertanyaan dalam cinta.",
        "background": "https://qu.ax/ELbKk.jpg"
    },
    {
        "title": "Liar Angin - Feby Putri",
        "file": "/audio/Liar_Angin_Feby_Putri.mp3",
        "image": "https://qu.ax/viMlG.jpg",
        "description": "Suara lembut Feby mengiringi perasaan yang berhembus seperti angin.",
        "background": "https://qu.ax/viMlG.jpg"
    },
    {
        "title": "Tuhan Sebut Sia-Sia - Siamigdala",
        "file": "/audio/Tuhan_Sebut_Sia-Sia_Siamigdala.mp3",
        "image": "https://qu.ax/vCGDV.jpg",
        "description": "Perjalanan batin mencari makna yang tidak selalu dijawab dunia.",
        "background": "https://qu.ax/vCGDV.jpg"
    },
    {
        "title": "Untuk Apa Untuk Apa - Hindia",
        "file": "/audio/Untuk_Apa_Untuk_Apa_Hindia.mp3",
        "image": "https://qu.ax/WmtRv.jpg",
        "description": "Pertanyaan eksistensial tentang tujuan hidup dan realita sehari-hari.",
        "background": "https://qu.ax/WmtRv.jpg"
    },
    {
        "title": "Besok Mungkin Kita Sampai - Hindia",
        "file": "/audio/Besok_Mungkin_Kita_Sampai_Hindia.mp3",
        "image": "https://qu.ax/vPNrT.jpg",
        "description": "Lagu penuh harapan dalam perjalanan meraih tujuan bersama.",
        "background": "https://qu.ax/vPNrT.jpg"
    },
    {
        "title": "Sulung - Kunto Aji",
        "file": "/audio/Sulung_Kunto_Aji.mp3",
        "image": "https://qu.ax/sNuKP.jpg",
        "description": "Refleksi seorang anak pertama tentang beban, luka, dan keluarga.",
        "background": "https://qu.ax/sNuKP.jpg"
    },
    {
        "title": "Mata Air - Hindia, Natasha Udu, Kamga",
        "file": "/audio/Mata_Air_Hindia_&_Natasha_Udu_&_Kamga.mp3",
        "image": "https://qu.ax/MGcWD.jpg",
        "description": "Kolaborasi hangat yang membawa nuansa alami dan harapan.",
        "background": "https://qu.ax/MGcWD.jpg"
    },
    {
        "title": "Semua Orang Pernah Sakit Hati - Lomba Sihir",
        "file": "/audio/Semua_Orang_Pernah_Sakit_Hati_Lomba.mp3",
        "image": "https://qu.ax/ptHop.jpg",
        "description": "Lagu pop menyentuh hati, mengingatkan kita bahwa luka itu manusiawi.",
        "background": "https://qu.ax/ptHop.jpg"
    },
    {
        "title": "Dunia Tipu-Tipu - Yura Yunita",
        "file": "/audio/Dunia-Tipu-Tipu-Yura_Yunita.mp3",
        "image": "https://qu.ax/eirek.jpg",
        "description": "Kritik manis tentang realita palsu yang sering kita hadapi.",
        "background": "https://qu.ax/eirek.jpg"
    },
    {
        "title": "Aku Tenang - Fourtwnty",
        "file": "/audio/Aku_Tenang_Fourtwnty.mp3",
        "image": "https://qu.ax/vAKSQ.jpg",
        "description": "Ketenangan batin dalam terima kasih atas hidup yang sederhana.",
        "background": "https://qu.ax/vAKSQ.jpg"
    },
    {
        "title": "Belum Tidur - Hindia, Sal Priadi",
        "file": "/audio/Belum_Tidur_Hindia_&_Sal Priadi_.mp3",
        "image": "https://qu.ax/XRhBp.jpg",
        "description": "Suasana larut malam penuh renungan tentang cinta dan waktu.",
        "background": "https://qu.ax/XRhBp.jpg"
    },
    {
        "title": "Kata Mereka ini Berlebihan - Bernadya",
        "file": "/audio/Kata_Mereka_ini_Berlebihan_Bernadya.mp3",
        "image": "https://qu.ax/XpBly.jpg",
        "description": "Ekspresi emosi yang dianggap berlebihan tapi justru jujur.",
        "background": "https://qu.ax/XpBly.jpg"
    },
    {
        "title": "Amin Paling Serius - Sal Priadi, Nadin Amizah",
        "file": "/audio/Amin_Paling_Serius_Sal_Priadi_&_Nadin_Amizah.mp3",
        "image": "https://qu.ax/uOzZE.jpg",
        "description": "Doa cinta terdalam dan penuh harapan dari dua jiwa sensitif.",
        "background": "https://qu.ax/uOzZE.jpg"
    }
];