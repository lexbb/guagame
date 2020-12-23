class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function() {
            var s = Scene.new(game)
            game.replaceScene(s)
        })
        game.registerAction('e', function() {
            var s = SceneEditor.new(game)
            game.replaceScene(s)
        })
    }
    draw() {
        // draw labels
        this.game.context.fillStyle = 'black'
        this.game.context.fillText('按 k 开始游戏', 100, 190)
        this.game.context.fillText('按 e 進入编辑', 100, 230)
    }
}
