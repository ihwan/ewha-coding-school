
var points = {
    'list': {'nick': 10, 'sam': 6, 'june': 80, 'jack': 30, 'reo': 25},
    'show': function(){
        for(var item in this.list){
            console.log(item + ':' + this.list[item]);
        }
    },
    'sum': function() {
        var total = 0;
        for(var item in this.list) {
            total += this.list[item];
        }
        return total;
    }
};

points.show();

points.sum();

