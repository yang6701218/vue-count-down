module.exports = {
   template:`<div style="display:inline-block;font-size:18px">
               <span>{{state}}</span>
               <span :style="timeStyle">{{nHour}}</span>
               <span>{{colon}}</span>
               <span :style="timeStyle">{{nMinute}}</span>
               <span>{{colon}}</span>
               <span :style="timeStyle">{{nSecond}}</span>
             </div>`,
    props:{
    	end:{ //开抢时间
    		type:Number// 传毫秒
    	},
    	process:{ //持续时间
        type:Number// 传分钟数
    	},
      colon:{
        type:String,
        default:':'
      },
      styleObj:{ //可以改变颜色等
        type:Object
      }
    },
    data:function(){
       return {
           stateIndex:0,
           states:["距开始","距结束","已结束"],
           time:{
           	   hour:00,
           	   minute:00,
           	   second:00
           },
           clear:null,
           nowTime:new Date().getTime(),
           started:false //判断是否已经开始
       }
    },
    beforeUpdate:function(){
       if (this.nowTime > this.end && this.nowTime < this.overTime && !this.started) {
            this.started = true;
            this.stateIndex = 1;
        }else if (parseInt(this.end/1000) - parseInt(this.nowTime/1000) == 0) {
            this.startCallback();
        }else if(this.nowTime > (this.overTime-1000)) { //在前一秒就停下
            this.stateIndex = 2;
            this.endCallback();
            clearInterval(this.clear);
        };
    },
    beforeMount:function(){
        //计算事件
    },
    mounted:function(){
       this.clear = setInterval(function(){
            this.nowTime+=1000;
        }.bind(this),1000);
    },
    computed:{
        timeStyle:function(){
            var style = {
                display:'inline-block',
                background:"#fb8e25",
                color: "#fff",
                padding: "4px",
                borderRadius: "6px"
            }
            return this._extend(style,this.styleObj)
        },
        sTime:function(){ 
          if (this.started) {
             return  this.overTime - this.nowTime;
          }else{
             return  this.end - this.nowTime;
          }
        },
        overTime:function(){//间隔时间
           return this.end + this.process
        },
        state:function(){
           return this.states[this.stateIndex]
        },
        nHour:function(){
           if (Math.floor(this.sTime/(1000*3600)) < 10) {
               return  "0" +  Math.floor(this.sTime/(1000*3600));
           };
        },
        nMinute:function(){
           this.time.minute = Math.floor(this.sTime/(1000*60))%60;
           if (this.time.minute < 10) {
              return "0" +  this.time.minute;
           };
        },
        nSecond:function(){
          this.time.second = Math.floor(this.sTime/1000)%60;
          if (this.time.second < 10) {
             return "0" +  this.time.second;
          }else{
             return this.time.second
          };
        }
    },
    methods:{
       startCallback:function(){
           this.$emit("startCB") //开始的动作
       },
       endCallback:function(){
       	   this.$emit("endCB") // 结束时的动作
       },
       _extend:function(destination, source){
          for (var property in source) {
              destination[property] = source[property];
          }
          return destination;
       }
    }
}