var MyAudio = function(params) {
    var audio;

    try {
        audio = new Audio(params.src);
        audio.volume = params.volume;
        audio.loop = params.loop;
    } catch(e) {
        audio = {};

        ['play', 'volume', 'pause'].forEach(function(key) {
            audio[key] = function() {};
        }, this);
    }
    
    this._audio = audio;

    this.volume = function(val) {
        this._audio.volume = val;
    };

    this.play = function() {
        this._audio.play();
    };

    this.pause = function() {
        this._audio.pause();
    };

    if (params.autoplay) {
        this._audio.play();
    }
};

$(document).ready(function() {
    var state = 1,
        volume = 0.5,
        audioSnow = new MyAudio({
            src: 'audio/snowstorm.mp3',
            loop: true,
            volume: volume,
            autoplay: true
        });
        
    setTimeout(function() {
        $('.card').fadeIn('slow');
    }, 1000);

    $('.button').click(function() {
        state++;
        $('.button').hide();
        $('.button_n_' + state).fadeIn('fast');
        $('.layer_n_' + state).fadeIn('fast');

        volume -= 0.1;
        audioSnow.volume(volume);

        if (state === 6) {
            $('.new-year, .copyright-music').fadeIn('slow');

            setInterval(function() {
                $('.layer_img_6').css('opacity', 0.5 + Math.random() * 0.5);
            }, 150);

            new SnowDiv($('.layers')[0]).start();

            new MyAudio({
                src: 'audio/xmas.mp3',
                volume: 0.5,
                loop: false,
                autoplay: true
            });
        }
    });
});
