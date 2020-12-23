class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.paddle = Paddle(game)
        this.ball = Ball(game)
        this.score = 0
        this.blocks = loadLevel(game, 1)
        this.enableDrag = false

        game.registerAction('a', () => {
            this.paddle.moveLeft()
        })
        game.registerAction('d', () => {
            this.paddle.moveRight()
        })
        game.registerAction('f', () => {
            this.ball.fire()
        })

        // mouse event
        game.canvas.addEventListener('mousedown', event => {
            var x = event.offsetX
            var y = event.offsetY
            // log(x, y, event)
            // 检查是否点中了 ball
            if (this.ball.hasPoint(x, y)) {
                // 设置拖拽状态
                this.enableDrag = true
            }
        })
        game.canvas.addEventListener('mousemove', event => {
            var x = event.offsetX
            var y = event.offsetY
            // log(x, y, 'move')
            if (this.enableDrag) {
                // log(x, y, 'move')
                this.ball.x = x
                this.ball.y = y
            }
        })
        game.canvas.addEventListener('mouseup', event => {
            var x = event.offsetX
            var y = event.offsetY
            this.enableDrag = false
            // log(x, y, 'up')
        })
    }
    draw() {
        // var game = this.game
        // var paddle = this.paddle
        // var ball = this.ball
        // var blocks = this.blocks
        // var score = this.score
        // draw 背景
        this.game.context.fillStyle = '#554'
        this.game.context.fillRect(0, 0, 400, 300)
        // draw
        this.game.drawImage(this.paddle)
        this.game.drawImage(this.ball)
        // draw blocks
        for (var i = 0; i < this.blocks.length; i++) {
            var block = this.blocks[i]
            if (block.alive) {
                this.game.drawImage(block)
            }
        }
        // draw labels
        this.game.context.fillStyle = 'white'
        this.game.context.fillText('分数: ' + this.score, 10, 290)
        this.game.context.fillText('按 F 发球', 60, 290)
        this.game.context.fillText('按 P 暂停', 120, 290)
    }
    update() {
        // var game = this.game
        // var paddle = this.paddle
        // var ball = this.ball
        // var blocks = this.blocks
        // var score = this.score
        // log(this.score)

        if (window.paused) {
            return
        }

        this.ball.move()
        // 判断游戏结束
        if (this.ball.y > this.paddle.y) {
            // 跳转到 游戏结束 的场景
            var end = SceneEnd.new(this.game)
            this.game.replaceScene(end)
        }
        // 判断相撞
        if (this.paddle.collide(this.ball)) {
            // 这里应该调用一个 ball.反弹() 来实现
            this.ball.反弹()
        }
        // 判断 ball 和 blocks 相撞
        for (var i = 0; i < this.blocks.length; i++) {
            var block = this.blocks[i]
            if (block.collide(this.ball)) {
                log('block 相撞')
                block.kill()
                this.ball.反弹()
                // 更新分数
                this.score += 100
            }
        }
    }
}
