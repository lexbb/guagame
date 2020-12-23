class SceneEditor extends GuaScene {
    constructor(game) {
        super(game)
        this.paddle = Paddle(game)
        this.ball = Ball(game)
        this.blocks = []
        this.positions = allBlockPosition()
        this.score = 0
        game.canvas.addEventListener('click', event => {
            var x = event.offsetX
            var y = event.offsetY
            for (var i = 0; i < this.positions.length; i++) {
                var p = this.positions[i]
                if (isBlockPosition(p, x, y)) {
                    var b = Block(game, p)
                    this.blocks.push(b)
                }
            }
        })
        game.registerAction('a', () => {
            this.paddle.moveLeft()
        })
        game.registerAction('d', () => {
            this.paddle.moveRight()
        })
        game.registerAction('f', () => {
            this.ball.fire()
        })
    }

    draw() {
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
        this.game.context.fillText('分数: ' + this.score, 60, 290)
        this.game.context.fillText('点击画面编辑砖块', 200, 290)

    }

    update() {
        if (window.paused) {
            return
        }

        this.ball.move()
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
