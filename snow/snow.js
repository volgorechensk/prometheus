function SnowDiv(element) {
    if (typeof element == 'string') {
        this.conElement = document.getElementById(element);
    }
    else {
        this.conElement = element;
    }

    this.prefixId = 'dot-' + this.id + '-';

    this.dx = [];
    this.xp = [];
    this.yp = [];
    this.zp = [];
    this.am = [];
    this.stx = [];
    this.sty = [];
    this.stz = [];
    this.isStop = false;
    this.isHide = false;

    for (var i = 0; i < this.snowN; i++) {
        this.dx[i] = 0;
        this.xp[i] = Math.random() * (this.conWidth - this.dotWidth);
        this.yp[i] = Math.random() * this.conHeight;
        this.stz[i] = 0;
        this.zp[i] = Math.floor(Math.random() * 4);
        this.am[i] = Math.random() * 20;
        this.stx[i] = 0.02 + Math.random() / 10;
        this.sty[i] = 0.7 + Math.random();

        var div = document.createElement('div'),
            st = div.style;

        div.id = this.prefixId + i;
        this.defaultStyle(div);
        st.width = this.dotWidth + 'px';
        st.height = this.dotHeight + 'px';
        st.left = '0';
        st.zIndex = i;

        var left = '-' + Math.floor(Math.random() * this.typeSnowN) * this.dotWidth + 'px';
        st.background = 'url(\'' + this.imageUrl + '\') no-repeat ' + left + ' 0px';

        this.conElement.appendChild(div);
    }

    this.id = this.id;
    SnowDiv.prototype.id++;
}

SnowDiv.prototype.conElement = null; //  Контейнер (DOM-элемент) для размещения снежинок
SnowDiv.prototype.conWidth = 500; // Ширина контейнера, 0 - вся ширина окна браузера
SnowDiv.prototype.conHeight = 500;    // Высота контайнера, 0 - вся высота окна браузера
SnowDiv.prototype.snowN = 30; // Количество снежинок в контейнере
SnowDiv.prototype.typeSnowN = 9; // Количество видов снежинок
SnowDiv.prototype.dotWidth = 16; // Ширина снежинки
SnowDiv.prototype.dotHeight = 18; // Высота снежинки
SnowDiv.prototype.imageUrl = './snow/snow.png'; // Картинка со снежинками
SnowDiv.prototype.imageWidth = 144; // Ширина картинки со снежинками
SnowDiv.prototype.sin = true; // Перемещаем снежики по синусоиде
SnowDiv.prototype.timer = 20;
SnowDiv.prototype.id = 0;

SnowDiv.prototype.defaultStyle = function(obj) {
    var st = obj.style;
    st.position = 'absolute';
    st.lineHeight = '0';
    st.fontSize = '0';
    st.top = '0';
    st.visibility = 'visible';
};

SnowDiv.prototype.refresh = function() {
    var el;
    for (var i = 0; i < this.snowN; i++) {
        this.yp[i] += this.sty[i];
        el = this.dot(i);
        if (this.yp[i] > this.conHeight - this.dotHeight) {
            this.xp[i] = Math.random() * (this.conWidth - this.am[i] - this.dotWidth * 1.5);
            this.yp[i] = - this.dotHeight;
            this.stx[i] = 0.02 + Math.random() / 10;
            this.sty[i] = 0.7 + Math.random();
        }

        this.stz[i] += this.zp[i];
        if (this.stz[i] > 360) {
            this.stz[i] -= 360;
        }

        this.dx[i] += this.stx[i];

        var x, y;
        if (this.sin) {
            x = this.xp[i] + this.am[i] * Math.sin(this.dx[i]);
        }
        else {
            x = this.xp[i] + this.am[i];
        }

        x = Math.floor(x);
        y = Math.floor(this.yp[i]);

        if (x > this.conWidth) {
            x = this.conWidth;
        }
        if (y > this.conHeight) {
            y = this.conHeight;
        }
        el.style.top = y + 'px';
        el.style.left = x + 'px';
        el.style.WebkitTransform = el.style.MozTransform = 'rotate(' + this.stz[i] + 'deg)';
    }

    var cl = this;
    if (!this.isStop) {
        setTimeout(function () {cl.refresh();}, this.timer);
    }
};

SnowDiv.prototype.start = function ()  {
    this.isStop = false;
    this.refresh();
}

SnowDiv.prototype.stop = function ()  {
    this.isStop = true;
}

SnowDiv.prototype.show = function () {
    if (this.isHide) {
        this.isHide = false;
        for (var i = 0; i < this.snowN; i++) {
            this.dot(i).style.display = 'block';
        }
    }
}

SnowDiv.prototype.hide = function () {
    this.stop();
    if (!this.isHide) {
        this.isHide = true;
        for (var i = 0; i < this.snowN; i++) {
            this.dot(i).style.display = 'none';
        }
    }
};

SnowDiv.prototype.dot = function(i) {
    return document.getElementById(this.prefixId + i);
};