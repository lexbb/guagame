var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var allBlockPosition = function() {
    // 砖块的大小是 40 * 19
    // 最多画 10 * 10 的方块
    var positions = []
    var width = 40
    var height = 19
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var p = []
            p[0] = i * width
            p[1] = j * height
            positions.push(p)
        }
    }
    return positions
}

var isBlockPosition = function(position, x, y) {
    var p = position
    var width = 40
    var height = 19
    var xIn = x > p[0] && x <= p[0] + width
    var yIn = y > p[1] && y <= p[1] + height
    return xIn && yIn
}

var enableDebugMode = function(game, enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event) {
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        window.fps = Number(input.value)
    })
}

var __main = function() {
    var images = {
        ball: 'img/ball.png',
        block: 'img/block.png',
        paddle: 'img/paddle.png',
    }
    var game = GuaGame.instance(30, images, function(g) {
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
