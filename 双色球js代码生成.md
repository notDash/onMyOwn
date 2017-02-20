#双色球js代码生成
##纯属娱乐

    var CaiPiao = {
      res: [],
      getResult: function(num) {
        var self = this
        var tres = []
        for(var i = 0 ; i < num; i++) {
          tres = []
          tres.push(self.getRedBall());
          tres.push(self.getBlueBall());
          self.res.push(tres);
        }
        return self.res;
      },
      getRedBall: function() {
        var self = this
        var redRes = [];
        for(var i = 0 ; i < 6; i++) {
          var temp = self.getNum(34)
          if(redRes.indexOf(temp) < 0) {
            redRes.push(temp);
          } else {
            --i;
          }
        }
        return redRes.sort(self.sortFn());
      },
      getBlueBall: function() {
        var self = this
        var blueRes = [];
        var temp = self.getNum(17)
        blueRes.push(temp);
        return blueRes.sort(self.sortFn());
      },
      getNum: function(range) {
        return 1 + Math.floor(Math.random() * (range - 1))
      },
      sortFn: function(a, b) {
        return a > b;
      }
    }
    var res = CaiPiao.getResult(5)
    console.log(res)
