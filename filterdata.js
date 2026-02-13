// Filter data only - no logic
const filterData = {
    actress: [
    { 
        name: "Minamo", 
        image: "https://lh3.googleusercontent.com/d/13F5qz6Dg9EUA9_KI1nAeRsQ5fNK-nCFB" 
    },
    { 
        name: "Yatsugake Umi", 
        image: "https://lh3.googleusercontent.com/d/13uZgn64wryobSTq7SMQMFyFV2hDA2QI4" 
    },
    { 
        name: "Yoshitaka Nene", 
        image: "https://lh3.googleusercontent.com/d/13dd8yEZuzyx5Yj31yJIdUoefj2kygQeY" 
    },
    { 
        name: "Asano Kokoro", 
        image: "https://lh3.googleusercontent.com/d/13TKLdkbxAkuw6a05esoPjV7G3FxqS_n8" 
    },
    { 
        name: "Miyajima Mei", 
        image: "https://lh3.googleusercontent.com/d/14sQWLO4bcmDn-AlimVujYE2BKgoJbs4g" 
    },
    { 
        name: "Sakakihara Moe", 
        image: "https://lh3.googleusercontent.com/d/13l9JhLM-pHwk9FS_PDll00AtdmebwPOL" 
    },
    { 
        name: "Shitara Yuuhi", 
        image: "https://lh3.googleusercontent.com/d/13gQzdwUUMPDqsUjzSx9jaDoKaFw0_6-K" 
    },
    { 
        name: "Tachibana Mary", 
        image: "https://lh3.googleusercontent.com/d/15_3vEPu0vITayCg3eJjOMXpUmpTcxpJI" 
    },
    { 
        name: "Kawakita Saika", 
        image: "https://lh3.googleusercontent.com/d/13NLn5XnZV_KVRR7_EtUm6qbGn8Vqpp4w" 
    },
    { 
        name: "Kaede Karen", 
        image: "https://lh3.googleusercontent.com/d/151tX4Xuuls3qzuZRgE7egZ5-Yc90o4oW" 
    },
    { 
        name: "Kodama Nanami", 
        image: "https://lh3.googleusercontent.com/d/154RQeEbyraafSZDD6QKieXY2xELdz5nV" 
    },
    { 
        name: "Nanatsumori Riri", 
        image: "https://lh3.googleusercontent.com/d/13OkczwZyXT01U9-jzV4B6zFTm0AFuiOy" 
    },
    { 
        name: "Miyashita Rena", 
        image: "https://lh3.googleusercontent.com/d/154t2XiQic1erJ3V9omTC4rjbHFEHfE5h" 
    },
    { 
        name: "Itsukaichi Mei", 
        image: "https://lh3.googleusercontent.com/d/1590aJAgYvZTQXafRLFQM8nPjBhXjFV3j" 
    },
    { 
        name: "Honjou Suzu", 
        image: "https://lh3.googleusercontent.com/d/15CNd9Xf_5WoEU79_h6XoA2R6EUZfnlcM" 
    },
    { 
        name: "Miho Nana", 
        image: "https://lh3.googleusercontent.com/d/157Yh1rZ_okPhbUt7WkCTd6W3PAalWj8N" 
    },
    { 
        name: "Sakura Norino", 
        image: "https://lh3.googleusercontent.com/d/15Hru0i5O0KFPlD6S6YZ8fdE96i3L4SvP" 
    },
    { 
        name: "Hayasaka Hime", 
        image: "https://lh3.googleusercontent.com/d/15QTFVxxBxBG340akHDdo4mxbTyi9zAFz" 
    },
    { 
        name: "Nonoura Non", 
        image: "https://lh3.googleusercontent.com/d/15WIHB_pa-GfBHKxT4wdERvZzRr-b_UOR" 
    },
    { 
        name: "Arata Arina", 
        image: "https://lh3.googleusercontent.com/d/15YTRCB6Rrgiv5uQMi6y9fY7YTPmOusJW" 
    },
    { 
        name: "Sakura Momo", 
        image: "https://lh3.googleusercontent.com/d/160LlM224pxbY_7Kef3ptJmAmcTd29bqY" 
    },
    { 
        name: "Minami Aizawa", 
        image: "https://lh3.googleusercontent.com/d/164sA3dmx52D9K8QVOUbS13ex76XupaMI" 
    },
    { 
        name: "Nosaka Hiyori", 
        image: "https://lh3.googleusercontent.com/d/16URYYdIkjrGK83XQFETUjI7jaxlGNnqI" 
    },
    { 
        name: "Tokita Ami", 
        image: "https://lh3.googleusercontent.com/d/16iFaPaDm2uF7ncZvVMjuZikb4T8smWWH" 
    },
    { 
        name: "Mori Ayami", 
        image: "https://lh3.googleusercontent.com/d/17XfF4AxcIjxn54zC189Z4SrQFUhCIUmg" 
    },
    { 
        name: "Mochizuki Tsubomi", 
        image: "https://lh3.googleusercontent.com/d/16o77GrSsKd335_lEj-jM4v6olq_sPJi3" 
    },
    { 
        name: "Suzunoya Rin", 
        image: "https://lh3.googleusercontent.com/d/16l3devfyiGiiW0Pt4ftBCBFLqNIhb7M3" 
    },
    { 
        name: "Nijimura Yumi", 
        image: "https://lh3.googleusercontent.com/d/1-SXJROKyfoBe1yQ_XjO3Glqlyb6N0Q-z" 
    },
    { 
        name: "Ashitaba Mitsuha", 
        image: "https://lh3.googleusercontent.com/d/1-Z_293LnV7YAwoITP_tggvF953gVAd9q" 
    },
    { 
        name: "Sasaki Saki", 
        image: "https://lh3.googleusercontent.com/d/1-RnpmNAMzN-m-gjJboHsVKkvk-ihi52X" 
    },
    { 
        name: "Miru", 
        image: "https://lh3.googleusercontent.com/d/108EojxVxUborKqo7HxGoz6wUgA1pPmlJ" 
    },
    { 
        name: "Kudou Rara", 
        image: "https://lh3.googleusercontent.com/d/10eqZpiePoI5_hjUsEZv-zTZDv8hXVydZ" 
    },
    { 
        name: "Kurumi Sakura", 
        image: "https://lh3.googleusercontent.com/d/10lGxBXeHBZVSL4zFDfenNswDdSiSSuyh" 
    },
    { 
        name: "Nagisa Airi", 
        image: "https://lh3.googleusercontent.com/d/10mOc4Gn5zJEJZ1mt2L44gehS8CHYW-P0" 
    },
    { 
        name: "Tsubasa Mai", 
        image: "https://lh3.googleusercontent.com/d/10pfkl_-1PWK8_EiwQBRqaq-BaZCthvNu" 
    },
    { 
        name: "Kaede Fuua", 
        image: "https://lh3.googleusercontent.com/d/10yqQ9iuMS-ZdGLTPdwm_Tfa4hZJ7-Rfl" 
    },
    { 
        name: "Ayumi Ryou", 
        image: "https://lh3.googleusercontent.com/d/11-IYV7MYcv7MDp1cPKDNVTbVWEwVhdcc" 
    },
    { 
        name: "Yorimoto Shiori", 
        image: "https://lh3.googleusercontent.com/d/115qSkdLb9UDGqy8-VoujfQ3wrM_Pe1D_" 
    },
    { 
        name: "Hinata Marin", 
        image: "https://lh3.googleusercontent.com/d/11FQqEffRc3ZZiVAwnlnMB7GvdPVO98FT" 
    },
    { 
        name: "Amane Mahina", 
        image: "https://lh3.googleusercontent.com/d/11O2uOJWZkC3f-VQ9XMpUz6WLaOr8uuNW" 
    },
    { 
        name: "Nanashima Mai", 
        image: "https://lh3.googleusercontent.com/d/11rArnb4ZN2qnvoP5iquFi7o9uN7YJory" 
    },
    { 
        name: "Aoba Haru", 
        image: "https://lh3.googleusercontent.com/d/11tJ_4Q51WvuXyi_5yq0zWkxNYc8-Ox-G" 
    },
    { 
        name: "Mio Mao", 
        image: "https://lh3.googleusercontent.com/d/11wbiKXkNT0JnuwXjodJiDIvNjpx2CiNc" 
    },
    { 
        name: "Nagisa Mitsuki", 
        image: "https://lh3.googleusercontent.com/d/121rT1vVIUSIGpVTFIkdCLJGWkOW1JQWe" 
    },
    { 
        name: "Shiromine Miu", 
        image: "https://lh3.googleusercontent.com/d/124zq0am6yb5KczFRpUz-G6xDGc3eN3e4" 
    },
    { 
        name: "Momonogi Kana", 
        image: "https://lh3.googleusercontent.com/d/12iehLsCmBjrbDzibTQwE_AuGFqwiHBEl" 
    },
    { 
        name: "Ichika Nenne", 
        image: "https://lh3.googleusercontent.com/d/112e5i7r6OQrZANIkKN4LR54oXTvGOZZO" 
    },
    { 
        name: "Kosaka Nanaka", 
        image: "https://lh3.googleusercontent.com/d/12phTVEuvBU1EXFbhSY4z99S_M0M4MQpd" 
    },
    { 
        name: "Irita Maaya", 
        image: "https://lh3.googleusercontent.com/d/11VdSQy0KzHZ7R-NVg6zYtX89qMe6luf-" 
    },
    { 
        name: "Azusa Hikari", 
        image: "https://lh3.googleusercontent.com/d/17Q5wRlvT0VEHF2iAFWLTHmaWcCLXVoeQ" 
    },
    { 
        name: "Kuroshima Rei", 
        image: "https://lh3.googleusercontent.com/d/111i0fkxtQP7Dr34I22LFQMB0ilGIZGiC" 
    },
    { 
        name: "Akari Matsunaga", 
        image: "https://lh3.googleusercontent.com/d/12qILO-84ZMyGVqOIo9O9yQ3lRmxNTCVs" 
    },
    { 
        name: "Mito Kana", 
        image: "https://lh3.googleusercontent.com/d/12vao9oAL-tRtN4J_MnnO-5JdsbEIrxGj" 
    },
    { 
        name: "Jinguji Nao", 
        image: "https://lh3.googleusercontent.com/d/13WwYomyqb7gpuqO2rjuUm6fJxBCjLBdE" 
    },
    { 
        name: "Mikami Yua", 
        image: "https://lh3.googleusercontent.com/d/163Ehim2T7JDp8BSuw4gY1vu8AfLhyAs2" 
    },
    { 
        name: "Yuzuriha Karen", 
        image: "https://lh3.googleusercontent.com/d/13aMNnpld-t2NaJqsPM0-admugKjlY-fc" 
    },
    { 
        name: "Hongou Ai", 
        image: "https://lh3.googleusercontent.com/d/13nCLgHgEX8MivRYN0jEHfbMxDlCWH-0c" 
    },
    { 
        name: "Suzumori Remu", 
        image: "https://lh3.googleusercontent.com/d/13oGLTd9Hm9-sOZxFHxpEgXziH2MurX0j" 
    }
],
    tags: [
        { 
            name: "Outdoor", 
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
        },
        { 
            name: "Scenic", 
            image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
        },
        { 
            name: "HD", 
            image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1168&q=80" 
        },
        { 
            name: "Nature", 
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
        },
        { 
            name: "Adventure", 
            image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
        },
        { 
            name: "Mountain", 
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
        },
        { 
            name: "City", 
            image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1168&q=80" 
        },
        { 
            name: "Night", 
            image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1194&q=80" 
        },
        { 
            name: "Urban", 
            image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1168&q=80" 
        },
        { 
            name: "Tokyo", 
            image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1194&q=80" 
        },
        { 
            name: "Nightlife", 
            image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1194&q=80" 
        },
        { 
            name: "Lights", 
            image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1194&q=80" 
        },
        { 
            name: "Beach", 
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80" 
        },
        { 
            name: "Sunset", 
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80" 
        },
        { 
            name: "Summer", 
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80" 
        },
        { 
            name: "Ocean", 
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80" 
        }
    ],
    studios: [
        { 
            name: "Prestige", 
            image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1168&q=80" 
        },
        { 
            name: "S1", 
            image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1194&q=80" 
        },
        { 
            name: "Moodyz", 
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
        },
        { 
            name: "IDEA POCKET", 
            image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
        },
        { 
            name: "Attackers", 
            image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1168&q=80" 
        },
        { 
            name: "Madonna", 
            image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1194&q=80" 
        },
        { 
            name: "Faleno", 
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
        },
        { 
            name: "KM Produce", 
            image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
        }
    ],
    tokens: [
        { 
            name: "Tok-001", 
            image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1168&q=80" 
        },
        { 
            name: "Tok-002", 
            image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1194&q=80" 
        },
        { 
            name: "Tok-003", 
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
        },
        { 
            name: "Tok-004", 
            image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
        },
        { 
            name: "Tok-005", 
            image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1168&q=80" 
        }
    ],
    series: [
        { 
            name: "Mountain Adventures", 
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
        },
        { 
            name: "City Nights", 
            image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1168&q=80" 
        },
        { 
            name: "Beach Collection", 
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80" 
        },
        { 
            name: "Seasonal Beauty", 
            image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
        },
        { 
            name: "Urban Exploration", 
            image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1194&q=80" 
        }
    ]
};
