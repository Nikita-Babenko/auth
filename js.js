$(function() {
    var
        $field = $('#game_field'),
        $timeLeftInput = $('#time'),
        $pointsInput = $('#points'),
        $startStopButton = $('#start_stop'),
        $resultsTbody = $('#results_tbody'),
        blockSize = 20,
        maxLeft = $field.width() - blockSize,
        maxTop = $field.height() - blockSize,
        timeLeft = 60,
        points = 0,
        gameInterval;

    function newGame() {
        $field.html('');
        createBlocks(randomInt(1,3));
        setTimeLeft(60);
        setPoints(0);
        $startStopButton.show();
        startGame();
    }

    function setTimeLeft(currentTime) {
        timeLeft = currentTime;
        $timeLeftInput.val(timeLeft);
    }

    function setPoints(currentPoints) {
        points = currentPoints;
        $pointsInput.val(points);
    }

    function startGame() {
        gameInterval = setInterval(gameTick, 1000);
        $startStopButton.html('Pause').show();
    }

    function gameTick() {
        setTimeLeft(timeLeft - 1);

        if (timeLeft == 0) {
            endGame();
        }
    }

    function endGame() {
        stopGame();

        $('#points_result').html(points);
        $('#results_modal').modal();
        $startStopButton.hide();
        $field.html('');
    }

    function stopGame() {
        clearInterval(gameInterval);
        $startStopButton.html('Start');
    }

    function createBlocks(count) {
        for (var i = 0; i < count; i++) {
            var $block = $('<div class="block"/>');

            $block.css({
                width: blockSize,
                height: blockSize,
                left: randomInt(0, maxLeft),
                top: randomInt(0, maxTop),
            });
            $field.append($block);
        }
    }

    function fire() {
        if ($startStopButton.html() == 'Start') {
            return;
        }

        setPoints(points + 1);
        $(this).remove();
        createBlocks(randomInt(0, 3));
    }

    function randomInt(max, min) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function saveResults() {
        var
            name = $('#name_input').val(),
            $tr = $('<tr>');

        $('<td>').html(name).appendTo($tr);
        $('<td>').html(points).appendTo($tr);
        $resultsTbody.append($tr);
        $('#results_modal').modal('hide');
    }

    $('#new').click(newGame);
    $field.on('click', '.block', fire);
    $('#save_button').click(saveResults);

    $startStopButton.click(function() {
        if ($startStopButton.html() == 'Start') {
            startGame();
        } else {
            stopGame();
        }
    })
});
