# 大乐透的js 生成方式
## 秉承着好玩的态度来写哒
    
      var LeTou = {
        res: [],
        /**
        * num  注数
        * pre 前区要杀掉的号
        * fix 后区要杀掉的号
        */
        getResult: function(num, pre, fix) {
          var self = this
          var tres = []
          for(var i = 0 ; i < num; i++) {
            tres = []
            tres.push(self.getRedBall(pre));
            tres.push(self.getBlueBall(fix));
            self.res.push(tres.join(' '));
          }
          return self.res;
        },
        getRedBall: function(pre) {
          var self = this
          var redRes = [];
          for(var i = 0 ; i < 5; i++) {
            var temp = Number(self.getNum(36, pre))
            if(redRes.indexOf(temp) < 0) {
                redRes.push(temp);  
            } else {
              --i;
            }
          }
          return redRes.sort(self.sortFn());
        },
        getBlueBall: function(fix) {
          var self = this
          var blueRes = [];
          for(var i = 0 ; i < 2; i++) {
            var temp = Number(self.getNum(13, fix))
            if(blueRes.indexOf(temp) < 0) {
              blueRes.push(temp);
            } else {
              --i;
            }
          }
          return blueRes.sort(self.sortFn());
        },
        getNum: function(range, killNum) {
          var self = this;
          var randomNum = self.randomNum(range);
          if(killNum && killNum.length > 0) {
            if(killNum.indexOf(randomNum) < 0) {
              return randomNum;
            } else {
              return self.getNum(range, killNum);
            }
          } else {
            return randomNum;
          }
        },
        randomNum: function(range) {
          return 1 + Math.floor(Math.random() * (range - 1));
        },
        sortFn: function(a, b) {
          return Number(a) - Number(b);
        }
      }


      for(var i =0; i < 99; i++) {
        // console.log(LeTou.getResult(5, [1, 3, 8, 10, 11, 14, 26, 28, 30, 33], [2, 6]))  
        // console.log(LeTou.getResult(5, [1, 2, 3, 4, 6, 8, 10, 11, 14, 18, 21, 26, 28, 30, 33], [2, ,5, 8, 6]))  
          console.log(LeTou.getResult(5))  
      }

