# vue-count-down
vue-count-down for vue2 component

this component just for vue2.x

HOW USE:
    npm install vue-count-down 
    
    <count-down :end="endTime" :process="processTime" @startCB="start" :styleObj="styleObj"></count-down> 
    import CountDown from "count-down"
    export default{
     data (){
          return {
            styleObj:{
              background:'red'
            },
            processTime:0.1*1000 * 60,
            endTime:new Date().getTime() + 1000 * 10  //eg
          }
      }
     }
    
    end： Distance from start time（Must be milliseconds）
    process ：Duration of activity （Must be milliseconds）
    startCB：start callback
    endCB ：end callback
    styleObj：modify style
