# 大乐透的js 生成方式
## 秉承着好玩的态度来写哒
    
    var LeTou = {
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
        for(var i = 0 ; i < 5; i++) {
          var temp = self.getNum(36)
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
        for(var i = 0 ; i < 2; i++) {
          var temp = self.getNum(12)
          if(blueRes.indexOf(temp) < 0) {
            blueRes.push(temp);
          } else {
            --i;
          }
        }
        return blueRes.sort(self.sortFn());
      },
      getNum: function(range) {
        return 1 + Math.floor(Math.random() * (range - 1))
      },
      sortFn: function(a, b) {
        return a > b;
      }
    }
    var res = LeTou.getResult(5)
    console.log(res)
