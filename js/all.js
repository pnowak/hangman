var publisher = {
    subscribers: {},
    on: function (type, fn, context) {
        fn = typeof fn === "function" ? fn : context[fn];
        
        if (typeof this.subscribers[type] === "undefined") {
            this.subscribers[type] = [];
        }
        this.subscribers[type].push({fn: fn, context: context || this});
    },
    remove: function (type, fn, context) {
        this.visitSubscribers('unsubscribe', type, fn, context);
    },
    fire: function (type, publication) {
        this.visitSubscribers('publish', type, publication);
    },
    visitSubscribers: function (action, type, arg, context) {
        var pubtype = type,
            subscribers = this.subscribers[pubtype],
            i,
            max = subscribers ? subscribers.length : 0;
            
        for (i = 0; i < max; i += 1) {
            if (action === 'publish') {
                subscribers[i].fn.call(subscribers[i].context, arg);
            } else {
                if (subscribers[i].fn === arg && subscribers[i].context === context) {
                    subscribers.splice(i, 1);
                }
            }
        }
    }
};

var canvas = {
    screen : get("screen").getContext('2d'),
    LINEWIDTH : 2,
    STROKESTYLE : '#ef4338',
    gibbet : function () {
        var context = this.screen;

        context.lineWidth = 5;
        context.strokeStyle = '#1e3e4a';
        
        context.beginPath();
        context.moveTo(50, 0);
        context.lineTo(50, 300);
        context.stroke();

        context.beginPath();
        context.moveTo(200, 3);
        context.lineTo(50, 3);
        context.stroke();

        context.beginPath();
        context.moveTo(197, 3);
        context.lineTo(197, 15);
        context.stroke();
    },
    head : function () {
        var context = this.screen;

        context.lineWidth = this.LINEWIDTH;
        context.strokeStyle = this.STROKESTYLE;

        context.beginPath();
        context.arc(197, 45, 30, 0, Math.PI*2, true);
        context.stroke();
    },
    body : function () {
        var context = this.screen;

        context.lineWidth = this.LINEWIDTH;
        context.strokeStyle = this.STROKESTYLE;

        context.beginPath();
        context.moveTo(197, 74);
        context.lineTo(197, 174);
        context.stroke();
    },
    leftHand : function () {
        var context = this.screen;

        context.lineWidth = this.LINEWIDTH;
        context.strokeStyle = this.STROKESTYLE;

        context.beginPath();
        context.moveTo(270, 44);
        context.lineTo(197, 104);
        context.stroke();
    },
    rightHand : function () {
        var context = this.screen;

        context.lineWidth = this.LINEWIDTH;
        context.strokeStyle = this.STROKESTYLE;

        context.beginPath();
        context.moveTo(120, 44);
        context.lineTo(197, 104);
        context.stroke();
    },
    leftLeg : function () {
        var context = this.screen;

        context.lineWidth = this.LINEWIDTH;
        context.strokeStyle = this.STROKESTYLE;

        context.beginPath();
        context.moveTo(197, 174);
        context.lineTo(270, 254);
        context.stroke();
    },
    rightLeg : function () {
        var context = this.screen;

        context.lineWidth = this.LINEWIDTH;
        context.strokeStyle = this.STROKESTYLE;

        context.beginPath();
        context.moveTo(197, 174);
        context.lineTo(120, 254);
        context.stroke();
    },
    drawBody : function (x, y, p, q) {
        var context = this.screen;

        context.lineWidth = this.LINEWIDTH;
        context.strokeStyle = this.STROKESTYLE;

        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(p, q);
        context.stroke();
    }
};

var check = {
    letter : function () {
        return alpha.played.pop();
    },
    key : function () {
        return alpha.played.pop();
    },
    checkPhrase : function () {
        console.log(puzzle.played[0]);
        return puzzle.played[0];
    },
    checkPoint : function () {
        var letter = this.letter(), 
            key = this.key(),
            phrase = this.checkPhrase();

        if (phrase.indexOf(letter || key) === -1) {
            check.fire('countDown', iterator);
        }

        phrase.forEach(function (item, index) {
            if ((letter === item) || (key === item)) {
                get(index).innerHTML = item;
                delete phrase[index];
            } 
        });
    },
    missing : function () {
        var phrase = this.checkPhrase();

        phrase.forEach(function (item, index) {
            get(index).style.color = '#ef4338';
            get(index).innerHTML = item;
        });
    },
    win : function () {
        var phrase = this.checkPhrase(),
            newArray;
        newArray = phrase.filter(function (x) {
            return true;
        });
        if (newArray.length === 0) {
            return alert('Wygrałaś Alu!');
        }
    }
};

var keyCodeToKeyName = {
    97:'a', 261:'ą', 98:'b', 99:'c', 263:'ć', 100:'d', 101:'e', 281:'ę', 102:'f', 103:'g', 104:'h', 105:'i', 106:'j', 107:'k', 108:'l', 322:'ł', 109:'m', 110:'n', 324:'ń', 111:'o', 243:'ó', 112:'p', 113:'q', 114:'r', 115:'s', 347:'ś', 116:'t', 117:'u', 118:'v', 119:'w', 120:'x', 121:'y', 122:'z', 378:'ź', 380:'ż'
};


var puzzle = {
    play : ['powiedzenie', 'przypomnienie', 'ogłoszenie', 'szkoła', 'telefon', 'start', 'sytuacja', 'gol', 'straszne', 'biblioteka', 'internet', 'wiara', 'arystoteles', 'fąfary', 'krzyżówka', 'wódka', 'papieros', 'półki', 'imbecyl', 'absztyfikant', 'bynajmniej', 'niemniej', 'kuzynka', 'teflon', 'cud', 'bergman', 'reżyser', 'tytuł', 'nic', 'cokolwiek', 'pomoc', 'ucieczka', 'wywiad', 'kupa', 'wisienka', 'tort', 'urodziny', 'imieniny', 'immunited', 'introligator', 'górka', 'żelazo', 'wapń', 'geometria', 'hacjenda', 'szklanka', 'poniedziałek', 'rower', 'lody', 'mielonka', 'kaszanka', 'złoto', 'frytki', 'szubrawiec', 'beznadzieja', 'bakłażan', 'borówka', 'mięta', 'trofeum', 'miłość', 'czekan', 'nicpoń', 'siatkówka', 'okrąg', 'żaluzje', 'fragment', 'beczka', 'babeczka', 'śmiech', 'obibok', 'śmierć', 'cukier', 'sól', 'etui', 'futerał', 'wycieczka', 'turysta', 'termos', 'drożdżówka', 'dżdżownica', 'piramida', 'atlas', 'zwierzyniec', 'zoo', 'terakota', 'tiramisu', 'panna', 'kot', 'zjeżdżalnia', 'gigant', 'groteska', 'słowo', 'klasztor', 'rapsodia', 'rynsztunek', 'tata', 'żyrandol', 'kokarda', 'kokaina', 'program'],
    played : [],
    stringToArray : function (s) {
        return s.split('');
    },
    random : function () {
        var choices = this.play.shuffle();
        return choices.pop();
    },
    newGame: function () {
        var select = this.random(),
            split = this.stringToArray(select),
            p = get('puzzle'),
            td;
        split.forEach(function(item, index) {
            td = document.createElement('td');
            td.setAttribute('id', index);
            p.appendChild(td);
        });
        this.played.push(split);
        this.fire('newPhrase', this);
    }
}

var alpha = {
    played: [],
    getValue: function (e) {
        var src, val;

        e = e || window.event;
        src = e.target || e.srcElement;
        val = src.value;

        get(val).setAttribute('class', 'visited');

        alpha.played.push(val);
        alpha.fire('play', alpha);

        if (typeof e.stopPropagation === "function") {
            e.stopPropagation();
        }
        e.cancelBubble = true;

        if (typeof e.preventDefault === "function") {
            e.preventDefault();
        }
        e.returnValue = false;   
    },
    handleKeypress: function (e) {
        e = e || window.event;
        key = keyCodeToKeyName[e.which];

        get(key).setAttribute('class', 'visited');
        
        alpha.played.push(key); 
        alpha.fire('key', alpha);
    },
};

var iterator = (function () {
    var index = 0,
        data = [
            canvas.head,
            canvas.body,
            canvas.leftHand, 
            canvas.rightHand, 
            canvas.leftLeg, 
            canvas.rightLeg
        ],
        length = data.length;

    return {
        next: function () { 
            var element;

            element = data[index]; 
            index = index + 1; 
            element.call(canvas);

            if (!this.hasNext()) {
                this.fire('missing', this);
            }
        },
        hasNext: function () {
            return index < length; 
        },
        current: function () {
            return data[index]; 
        }
    };

}());

Array.prototype.shuffle = function() {
    return this.sort(function() { return 0.5 - Math.random(); });
}

function makePublisher(o) {
    var i;
    for (i in publisher) {
        if (publisher.hasOwnProperty(i) && typeof publisher[i] === "function") {
            o[i] = publisher[i];
        }
    }
    o.subscribers = {};
}

function get (id) { 
    return document.getElementById(id);
}

makePublisher(alpha);
makePublisher(puzzle);
makePublisher(check);
makePublisher(iterator);

alpha.on('play', check.checkPoint, check);
alpha.on('key', check.checkPoint, check);
alpha.on('play', check.win, check);
alpha.on('key', check.win, check);
puzzle.on('newPhrase', check.checkPhrase, check);
check.on('countDown', iterator.next, iterator);
iterator.on('missing', check.missing, check);

var el = document.getElementById('click-wrap');

if (document.addEventListener) { // W3C
    el.addEventListener('click', alpha.getValue, false);
} else if (document.attachEvent) { // IE
    el.attachEvent('click', alpha.getValue);
} else { // last resort
    el.onclick = alpha.getValue;
}

//init
window.onload = puzzle.newGame();
window.onload = canvas.gibbet();
window.onkeypress = alpha.handleKeypress;