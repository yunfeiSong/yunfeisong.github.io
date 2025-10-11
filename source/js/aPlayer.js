// 初始化 MetingJS 播放器（全局）
new APlayer({
    container: document.getElementById('global-player'),
    fixed: true,  // 固定在底部
    mini: true,  // 非迷你模式
    autoplay: false,  // 不自动播放
    loop: 'all',  // 循环播放
    order: 'random',  // 随机顺序
    preload: 'auto',
    volume: 0.7,
    lrcType: 3,
    mutex: true,  // 互斥（只有一个播放）
    listFolded: false,
    audio: [  // 音乐列表（本地或在线）
        {
            name: '倾尽天下',
            artist: '河图',
            url: '/music/qjtx.mp3',  // 本地文件路径
            cover: '/music/qjtx.jpg',
            lrc: '/music/qjtx.lrc'  // 歌词（可选）
        },
        {
            name: '琴师',
            artist: '音频怪物',
            url: '/music/qs.mp3',  // 本地文件路径
            cover: '/music/qs.jpg',
            lrc: '/music/qs.lrc'  // 歌词（可选）
        }
    ]
});