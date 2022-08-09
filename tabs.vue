<template>
  <div :class="container">
    <div class="show_scoller">
      <div :class="labelPosition">
        <button v-for="(item, index) of tabBtnData" :key="index" class="tab_btn">{{item.labelName}}</button>
        <div class="line"></div>
      </div>
    </div>
    <div class="content_box">
      <div v-for="(item, index) of tabBtnData" :key="index" class="content">
        <p>{{index}}</p>
        <p>{{item.labelName}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Tabs',
  props: {
    conf: {
      type: Object,
      default: () => {}
    },
    tabPosition: String
  },
  data(){
    return {
      tabBtnData: [
        {
          labelName: '首页iouioui'
        },
        {
          labelName: '首页'
        },
        {
          labelName: '首页'
        }
      ],
      labelPosition: {
        tab_box_top: true,
        tab_box_left: false
      },
      container: {
        container: true,
        container_top: true,
        container_left: false,
      }
    }
  },
  mounted() {
    this.getPosition(this.tabPosition)
    this.getEle()
  },
  methods: {
    getPosition(position) {
      switch(position){
        case 'top':
          this.tab_btn_top = true
          this.container_top = true 
          break
        case 'left':
          this.labelPosition.tab_box_left = true
          this.labelPosition.tab_box_top = false
          this.container.container_left = true
          this.container.container_top = false
          break
        default:
          return
      }
    },
    getEle() {
      const tabs = document.querySelectorAll('.tab_btn')
      const contents = document.querySelectorAll('.content')
      tabs[0].classList.add('active')
      contents[0].classList.add('active')
      tabs.forEach((tab, index) => {
        tab.addEventListener('click', (e) => {
          tabs.forEach(tab => {
            tab.classList.remove('active')
          })
          tab.classList.add('active')
          const line = document.querySelector('.line')
          switch(this.tabPosition){
            case 'top':
              line.style.width = `${e.target.offsetWidth}px`
              line.style.left = `${e.target.offsetLeft}px`
              break
            case 'left':
              line.style.height = `${e.target.offsetHeight}px`
              line.style.top = `${e.target.offsetTop}px`
              break
            default:
              return
          }
          contents.forEach(item => {
            item.classList.remove('active')
          })
          contents[index].classList.add('active')
        }) 
      })
    }
  },
}
</script>

<style lang="less" scoped>

  .container_top {
    display: block;
  }
  .container_left {
    display: flex;
  }
  .container {
    width: 1000px;
    background-color: #fff;
    padding: 30px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, .1);
    border-radius: 20px;
    .show_scoller {
      height: 300px;
      overflow-y: scroll;
      overflow-x: hidden;
      .tab_box_left {
        position: relative;
        display: block;
        width: 200px;
        height: 500px;
        .tab_btn {
          display: block;
          border: none;
          height: 40px;
          width: 100%;
          line-height: 40px;
          text-align: left;
          font-size: 18px;
          font-weight: 600;
          color: #919199;
          padding: 0;
          cursor: pointer;
        }
        .active {
          color: #ff6060;
          background-color: #ebdfdf;
        }
        .line {
          position: absolute;
          top: 0;
          left: 200px;
          width: 3px;
          height: 40px;
          background-color: #7360ff;
          transition: all .2s ease-in-out;
        }
    }
    }
    .tab_box_top {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-bottom: 2px solid rgb(229, 229, 229);
      .tab_btn {
        border: none;
        font-size: 18px;
        font-weight: 600;
        color: #919199;
        background: none;
        padding: 18px;
        cursor: pointer;
      }
      .active {
        color: #ff6060
      }
      .line {
        position: absolute;
        top: 56px;
        left: 52px;
        width: 74px;
        height: 5px;
        background-color: #7360ff;
        transition: all .2s ease-in-out;
      }
    }
    .content_box {
      padding: 20px;
      flex-shrink: 0;
      .content {
        display: none;
        animation: moving .5s ease;
        h2 {
          margin-bottom: 10px;
        }
      }
      @keyframes moving {
        from{transform: translateX(60px); opacity: 0;}
        to{transform: translateX(0px); opacity: 1;}
      }
      .content.active {
        display: block;
      }
    }
  }
  
</style>

