const songs = [
    {
        title: "Teramini - Ghea",
        file: "/audio/Teramini-Ghea.mp3",
        image: "https://telegra.ph/file/cdc3e5c8b924d57a36060.jpg"
    },
    {
        title: "Sal Priadi - Gala Bunga",
        file: "/audio/SalPriadi-Gala-bunga.mp3",
        image: "https://telegra.ph/file/a609844fd6f3ab99ac4ef.jpg"
    },
    {
        title: "Bertaut - Nadin Amizah",
        file: "/audio/Bertaut-Nadin-Amizah.mp3",
        image: "https://telegra.ph/file/fca62ea24c5ad5288044f.jpg"
    },
    {
        title: "Ghea Indrawari - Jiwa Yang Bersedih",
        file: "/audio/Ghea-Indrawari-Jiwa-Yang-Bersedih.mp3",
        image: "https://telegra.ph/file/aa78c364673eceb44c0ff.jpg"
    },
    {
        title: "Bohongi Hati - Mahalini",
        file: "/audio/Bohongi-hati-mahalini.mp3",
        image: "https://telegra.ph/file/49a515c7390c3260472e3.jpg"
    },
    {
        title: "DUKA - Last Child",
        file: "/audio/DUKA-last-chilid.mp3",
        image: "https://telegra.ph/file/aba254cf76a49fae21407.jpg"
    },
    {
        title: "Indah - Tak Sempurna",
        file: "/audio/INDAH-TAK-SEMPURNA.mp3",
        image: "https://telegra.ph/file/097c89f80f74b47dad392.jpg"
    },
    {
        title: "Mendua - Astrid",
        file: "/audio/Mendua-Astrid.mp3",
        image: "https://telegra.ph/file/a10370b50e724643008f9.jpg"
    },
    {
        title: "Sekuat Hatimu - Last Child",
        file: "/audio/Sekuat-Hatimu-Last-Child.mp3",
        image: "https://telegra.ph/file/550ef2f05c4eed994beb4.jpg"
    },
    {
        title: "Rindu Rumah - Wizz Baker",
        file: "/audio/Wizz-Baker-Rindu-Rumah.mp3",
        image: "https://telegra.ph/file/cf2463b5e83f3f28dcb12.jpg"
    },
    {
        title: "Bawadia Kembali - Mahalini",
        file: "/audio/Mahalini-bawadia-kembali.mp3",
        image: "https://telegra.ph/file/670e8d7d77f603efb78cf.jpg"
    },
    {
        title: "Ajarkan Aku - Arvian Dwi",
        file: "/audio/AJARKAN-AKU-ARVIAN-DWI.mp3",
        image: "https://telegra.ph/file/f548f9a33579d4dc210a5.jpg"
    },
    {
        title: "Takut - Idgitaf",
        file: "/audio/Takut-Idgitaf.mp3",
        image: "https://telegra.ph/file/c103bf36302371de2963d.jpg"
    },
    {
        title: "Hanya Rindu - Andmesh",
        file: "/audio/ANDMESH-HANYA-RINDU.mp3",
        image: "https://telegra.ph/file/7c56a77256acd3f8a8ae2.jpg"
    },
    {
        title: "Tak Kan Hilang - Budi Doremi",
        file: "/audio/TAK-KAN-HILANG-Budi-Doremi.mp3",
        image: "https://telegra.ph/file/1aa0cf150ae3c664dd1bd.jpg"
    },
    {
        title: "Nala - Tulus",
        file: "/audio/TULUS-Nala.mp3",
        image: "https://telegra.ph/file/25d0c4c6687728c0fb225.jpg"
    },
    {
        title: "Aku Yang Jatuh Cinta - Dudy Oris",
        file: "/audio/Dudy-Oris-Aku-Yang-Jatuh-Cinta.mp3",
        image: "https://telegra.ph/file/4bd164cf8c040c4a4becc.jpg"
    },
    {
        title: "Tak Dianggap - Lyodra",
        file: "/audio/Lyodra-tak-Dianggap.mp3",
        image: "https://telegra.ph/file/cac8e3202f6427b5d8e97.jpg"
    },
    {
        title: "Ku Ingin Pisah - Nabila Taqiyyah",
        file: "/audio/Ku-Ingin-Pisah-Nabila-Taqiyyah.mp3",
        image: "https://telegra.ph/file/cdc3e5c8b924d57a36060.jpg"
    },
    {
        title: "Cukup - Ziva",
        file: "/audio/Ziva-Magnolya-Cukup.mp3",
        image: "https://telegra.ph/file/097c89f80f74b47dad392.jpg"
    },
    {
        title: "Berisik - Dere",
        file: "/audio/Berisik-Dere.mp3",
        image: "https://telegra.ph/file/f7234cbd5ff2e815c3ebe.jpg"
    },
    {
        title: "Asmalibrasi - Soegi Bornean",
        file: "/audio/Soegi-Bornean-Asmalibrasi.mp3",
        image: "https://telegra.ph/file/966dccb1549fc858bcd6e.jpg"
    },
    {
        title: "Ku Akan Menanti - Nikita Willy",
        file: "/audio/KuAkan-Menanti-NikitaWilly.mp3",
        image: "https://telegra.ph/file/87dd835eec372010c9e7d.jpg"
    },
    {
        title: "Hapus Aku - Nidji",
        file: "/audio/Hapus-Aku-Nidji.mp3",
        image: "https://telegra.ph/file/5042ab83697eac160ba35.jpg"
    },
    {
        title: "Karena Kamu - Geisha",
        file: "/audio/Gheisha-Karena-Kamu.mp3",
        image: "https://telegra.ph/file/ea8a771ad5485c251ec39.jpg"
    },
    {
        title: "Terpikat Senyumu - Idgitaf",
        file: "/audio/Idgitaf-Terpika-Senyumu.mp3",
        image: "https://telegra.ph/file/ad23d806ee0a767d6bf72.jpg"
    },
    {
        title: "Muak - Aruma",
        file: "/audio/Muak-Aruma.mp3",
        image: "https://telegra.ph/file/0a7143d421b291321e1c9.jpg"
    },
    {
        title: "Diary Depresiku - Last Child",
        file: "/audio/Diary-Depresiku-Last-Child.mp3",
        image: "https://telegra.ph/file/ca076fbc055617a23d125.jpg"
    },
    {
        title: "Tak Pernah Ternilai - Last Child",
        file: "/audio/Last-Child-Tak-pernah-ternilai.mp3",
        image: "https://telegra.ph/file/1d95e1f41104b89738b17.jpg"
    },
    {
        title: "Dendam - Last Child feat Sansan",
        file: "/audio/Last-Child-feat-Sansan-Dendam.mp3",
        image: "https://telegra.ph/file/00288289f19304e418e7d.jpg"
    },
    {
        title: "Pedih - Last Child",
        file: "/audio/Last-Child-Pedih.mp3",
        image: "https://telegra.ph/file/1d95e1f41104b89738b17.jpg"
    }
];
