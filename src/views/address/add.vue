<template>
  <div class="body_content">
	  <div class="seach">
	    <el-input placeholder="查询收货地址" prefix-icon="el-icon-search" v-model="value"></el-input><span class="seach_box" @click="tosearch()">搜索</span>
	  </div>
    <div class="adress">
      <div class="address_title">智能地址<span>（在下方粘贴诊断地址，系统自动识别）</span></div>
      <textarea type="textarea" class="address_text" rows="5" cols="30" placeholder="例如：张三，13654521454，浙江省，杭州市，西湖区，毛家桥路564号中天MCC206室（特别说明：若要地址识别度高，请隔开展示姓名、电话、所在省、市、区、详细地址这几段信息）"
        v-model="textarea"></textarea>
      <div class="address_btn">
        <p class="confirm" @click="empty()">清空内容</p>
        <p class="confirm Submission" @click="tijiao()">提交</p>
      </div>
    </div>
    <div class="address_input">
      <div class="mail_ship">
        <p class="shipping">收货人</p><span class="input_text"><input type="text" v-model="username" /></span>
      </div>
      <div class="mail_ship">
        <p class="shipping">联系电话</p><span class="input_text"><input type="text" v-model="userphone" /></span>
      </div>
      <div class="mail_ship">
        <p class="shipping">所在地区</p>
        <div class="input_text address_check">
          <input type="text" v-model="address" @click="show()" style="text-align: right;" />
          <p class="img"></p>
        </div>
      </div>
      <!-- <div class="mail_ship">
        <p class="shipping">所在街道</p>
        <div class="input_text address_check">
          <input type="text" v-model="street" />
        </div>
      </div> -->
      <div class="mail_ship">
        <textarea type="textarea" class="street_text" rows="1" cols="30" placeholder="详细地址" v-model="address_street"></textarea>
      </div>
    </div>
    <div class="confirm_add" @click="add_address">确认添加</div>
    <div class="dialog_bg" v-bind:class="{ hover: isActive }"></div>
    <div class="dialog-footer" v-bind:class="{ hover: isActive }">
      <div class="dialog-top">
        <p class="top_img" @click.stop='cancel()'><img src="./img/img041.png"></p>
      </div>
      <section class="myAddress">
        <!-- 省市区三级联动选项 -->
        <section class="showChose">
          <section class="address_body">
            <section class="title">
              <div class="area" @click="provinceSelected(0)" :class="tabIndex===0?'active':''">
                {{Province?Province:'请选择'}}
              </div>
              <div class="area" @click="citySelected(1)" :class="tabIndex===1?'active':''" v-show="Province">
                {{City?City:'请选择'}}
              </div>
              <div class="area" @click="districtSelected(2)" :class="tabIndex===2?'active':''" v-show="City && hasDistrict">
                {{District?District:'请选择'}}
              </div>
            </section>
            <ul class="cmy-address-box cmy-display-flex">
              <!-- 省市区列表 -->
              <li class="addList" v-for="(v , k) in info" @click="getProvinceId(v.areaId, v.name, k)" v-show="showProvince"
                :class="v.selected ? 'active' : ''">{{v.name}}</li>
              <li class="addList" v-for="(v,k) in showCityList" @click="getCityId(v.areaId, v.name, k)" v-show="showCity"
                :class="v.selected ? 'active' : ''">{{v.name}}</li>
              <li class="addList" v-for="(v,k) in showDistrictList" @click="getDistrictId(v.areaId, v.name, k)" v-show="showDistrict"
                :class="v.selected ? 'active' : ''">{{v.name}}</li>
            </ul>
          </section>
        </section>
      </section>

    </div>
  </div>
</template>

<script>
  import info from './address.js';
  import {
    add_address,
    search_address
  } from '@/api/address.js';
  import {
    Toast,
    MessageBox
  } from 'mint-ui';
  export default {
    data() {
      return {
        oid:'',
        list:'',
        isActive: true,
        value: '',
        textarea: '',
        address: '', //省市区
        sheng: '', //省
        shi: '', //市
        qu: '', //区
        username: '', //收货人姓名
        userphone: '', //收货人电话
        address_street: '', //详细地址
        addressObj: {
          province: '', // 当前选择的省份code
          city: '', // 当前选择的城市code
          district: '', // 当前选择的区code
          District: '', // 区名字
          Province: '', // 省名字
          City: '', // 城市名字
        },
        showChose: false, // 是否显示省市区弹框
        showProvince: true, // 显示省份列表
        showCity: false, // 显示城市列表
        showDistrict: false, // 显示区列表
        showCityList: false, // 城市数据列表
        showDistrictList: false, // 区数据列表
        province: '', // 当前选择的省份code
        city: '', // 当前选择的城市code
        district: '', // 当前选择的区code
        District: false, // 区名字
        Province: false, // 省名字
        City: false, // 城市名字
        areaProvince: '',
        areaCity: '',
        areaDistrict: '',
        tabIndex: 0, // 当前选择的tab下标
        hasDistrict: true, // 是否有区
        selected: false, // 是否选中(active)
        info: info.items, // 后台交互的省市区接口数据
        frequentCitys: [], // 常用城市数据
        saveCityData: [], // 存储选择的省市区的缓存数据
        showFrequentCity: false // 是否显示常用城市
      }
    },
    watch: {
      district(newValue) {
        this.addressObj.province = this.province; // 当前选择的省份code
        this.addressObj.city = this.city; // 当前选择的城市code
        this.addressObj.district = newValue; // 当前选择的区code
        this.addressObj.District = this.District; // 区名字
        this.addressObj.Province = this.Province; // 省名字
        this.addressObj.City = this.City; // 城市名字
      }
    },
    methods: {
      //搜索收货地址
      tosearch(){
          search_address({
            keyword: this.value
          }).then((
            data
          ) => {
            this.list = data.data
            if(data.code == 400){
               this.$message({
                message: data.msg,
                type: 'error',
                offset: 50
              });
            }else{
            this.$router.push({path: '/address/index',query: { value:this.value, oid: this.oid}})
            }
            console.log(data)
          }).catch((err) => {
            console.log(err);
          })
      },
      add_address() {
        if (this.sheng == '' || this.shi == '' || this.qu == '') {
         console.log(this.sheng,this.shi,this.qu, 555)
          this.sheng = this.Province;
          this.shi = this.City;
          this.qu = this.District;
        }
        // if (this.sheng != this.Province || this.shi != this.City || this.qu != this.District) {
        //    console.log(this.sheng,this.shi,this.qu, 666)
        //    console.log(this.Province,this.City,this.District, 777)
        //   this.sheng = '';
        //   this.shi = '';
        //   this.qu = '';
        //   this.sheng = this.Province;
        //   this.shi = this.City;
        //   this.qu = this.District;
        // }
        if (this.Province != false || this.City != false || this.District != false) {
           console.log(this.sheng,this.shi,this.qu, 666)
           console.log(this.Province,this.City,this.District, 777)
          this.sheng = '';
          this.shi = '';
          this.qu = '';
          this.sheng = this.Province;
          this.shi = this.City;
          this.qu = this.District;
        }
        if(this.username == ''){
          this.$message({
            message: '请填写收货人',
            type: 'error',
            offset: 50
          });
          return;
        }
        if(this.userphone == ''){
          this.$message({
            message: '请填写联系电话',
            type: 'error',
            offset: 50
          });
          return;
        }
         if(this.sheng == '' || this.shi == '' || this.qu == '' ){
          this.$message({
            message: '请填写省市区',
            type: 'error',
            offset: 50
          });
          return;
        }
        if(this.address_street == ''){
          this.$message({
            message: '请填写详细地址',
            type: 'error',
            offset: 50
          });
          return;
        }
        add_address({
          oid: this.oid,
          name: this.username,
          phone: this.userphone,
          province: this.sheng,
          city: this.shi,
          area: this.qu,
          address: this.address_street
        }).then((
          data
        ) => {
        this.$router.push({path: '/order/index',query: {id: this.oid}})
        }).catch((err) => {
          console.log(err);
        })
      },
      tijiao() {
        var address = this.textarea;
        //console.log(address, 11)
        var address = address.replace(/,/ig, '，');
        var result = address.split("，");
        // console.log(address, 11)
        // console.log(result, 22)
        this.username = result[0];
        this.userphone = result[1];
        this.address = result[2] + result[3] + result[4];
        this.sheng = result[2];
        this.shi = result[3];
        this.qu = result[4];
        this.address_street = result[5];
        console.log(this.sheng,this.shi,this.qu, 111)
      },
      empty() {
        this.textarea = '';
      },
      cancel() {
        //取消弹窗
        this.isActive = true
        this.address = this.Province + this.City + this.District;
        //console.log(this.address,111)
      },
      show() {
        // 显示弹窗
        this.isActive = false
      },

      // 选择常用城市
      selectFrequentCity: function(frequentCityData) {
        console.log('frequentCityData', frequentCityData)
      },
      // 点击选择省市区
      choseAdd: function() {
        this.showChose = true
      },
      // 关闭弹框
      closeAdd: function() {
        this.showChose = false
      },
      /* eslint-disable */
      // 对选择当前的数据,进行下一级的数据的筛选
      _filter(add, name, code) {
        let result = []
        // 循环对象筛选指定对象
        for (let i = 0; i < add.length; i++) {
          if (code == add[i].areaId) {
            // 返回选中对象的数据
            result = add[i].areaList
          }
        }
        return result
      },
      /* eslint-enable */
      // 选择省份列表
      getProvinceId: function(code, input, index) {
        this.tabIndex = 1
        // 保存省份id
        this.province = code
        // 保存省份名字
        this.Province = input
        // 隐藏省份
        this.showProvince = false
        // 显示城市
        this.showCity = true
        // 隐藏县
        this.showDistrict = false
        if (!this.City) {

        } else {
          this.City = '请选择';
          this.addressObj.city = ''; //清除选中的城市
        }
        if (!this.District) {

        } else {
          this.hasDistrict = false
          this.District = '请选择'
          this.addressObj.district = ''; //清除选中的区域
        }
        // 查询选中的城市
        this.showCityList = this._filter(this.info, 'city', this.province)
        // 点击选择当前
        /* eslint-disable */
        this.info.map(a => a.selected = false)
        /* eslint-enable */
        this.info[index].selected = true
        this.areaProvince = input
      },
      // 点击省份tab
      provinceSelected: function(index) {
        this.tabIndex = index
        // 选项页面的切换
        this.showProvince = true
        this.showCity = false
        this.showDistrict = false
      },
      // 选择城市列表
      getCityId: function(code, input, index) {
        this.tabIndex = 2
        this.city = code
        this.City = input
        this.showProvince = false
        this.showCity = false
        this.showDistrict = true
        this.District = '请选择';
        this.addressObj.district = ''; //清除选中的区域
        this.showDistrictList = this._filter(this.showCityList, 'district', this.city)
        console.log('this.showDistrictList', this.showDistrictList)
        // 选择当前添加active
        /* eslint-disable */
        this.showCityList.map(a => a.selected = false)
        /* eslint-enable */
        this.showCityList[index].selected = true
        this.areaCity = input
        // 判断当前选的城市是否有地区
        if (this.showDistrictList.length === 0) {
          this.hasDistrict = false
          this.showDistrict = false
          this.District = false
          this.showChose = false
          // // 把选择的省市放入缓存中
          // let selectCity = {}
          // selectCity.province = this.Province
          // selectCity.city = this.City
          // selectCity.district = ''
          // this.saveCityData.push(selectCity)
          // localStorage.setItem('frequentList', JSON.stringify(this.saveCityData))
        } else {
          this.hasDistrict = true
          this.showDistrict = true
        }
      },
      // 点击城市tab
      citySelected: function(index) {
        this.tabIndex = index
        this.showProvince = false
        this.showCity = true
        this.showDistrict = false
      },
      // 选择区列表
      getDistrictId: function(code, input, index) {
        this.district = code
        this.District = input
        // 选择当前添加active
        /* eslint-disable */
        this.showDistrictList.map(a => a.selected = false)
        /* eslint-enable */
        this.showDistrictList[index].selected = true
        // 选取市区选项之后关闭弹层
        this.showChose = false
        this.areaDistrict = input
        // 把选择的数据放入缓存中
        // let selectCity = {}
        // selectCity.province = this.Province
        // selectCity.city = this.City
        // selectCity.district = this.District
        // this.saveCityData.push(selectCity)
        // localStorage.setItem('frequentList', JSON.stringify(this.saveCityData))
      },
      // 点击区tab
      districtSelected: function(index) {
        this.tabIndex = index
        this.showProvince = false
        this.showCity = false
        this.showDistrict = true
      }
    },
    created() {
      //
      this.oid = this.$route.query.id;
      if (!this.frequentCitys) {
        this.showFrequentCity = false
      } else {
        this.showFrequentCity = true
      }
    }
  }
</script>
<style>
  .el-input--prefix .el-input__inner {
    border-radius: 25px;

  }

  .el-input.is-active .el-input__inner,
  .el-input__inner:focus {
    border-color: white;
    outline: 0;
  }

  .el-input__inner {
    border: none;
  }

  .el-input__prefix {
    font-size: 18px;
    margin-right: 10px;
  }

  .el-input__icon {
    width: 35px;
    color: #666666;
  }

  .el-input--prefix .el-input__inner {
    padding-left: 40px;
  }
</style>
<style scoped="scoped">
  .seach_box{
      margin-left: 10px;
      font-size: 16px;
      color: #757575;
  }
  .el-input{
    width:85% ;
    }
  .el-input__inner {
    border-radius: 20px !important;
  }

  .body_content {
    width: 100%;
    background-color: #F8F6F6;
    position: absolute;
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  .seach {
    background-color: #F8F6F6;
    padding: 15px 15px;
  }

  .adress {
    background-color: white;
    padding: 15px 15px;
  }

  .adress span {
    font-size: 12px;
    color: #999999;
  }

  .address_title {
    border-bottom: 1px solid #F0F0F0;
    padding-bottom: 10px;
  }

  .address_text {
    width: 100%;
    padding: 10px 0px;
    overflow: hidden;
    overflow-x: hidden;
    overflow-y: auto;
    min-height: 100px;
    max-height: 1000px;
    font-size: 14px;
  }

  .street_text {
    width: 100%;
    overflow: hidden;
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 1000px;
    font-size: 14px;
  }

  .address_btn {
    text-align: right;
  }

  .confirm {
    display: inline-block;
    border: 1px solid #CCCCCC;
    padding: 3px 20px;
    border-radius: 50px;
    margin-left: 15px;
  }

  .Submission {
    border: 1px solid #128E93 !important;
    color: #128E93 !important;
  }

  .address_input {
    width: 100%;
    margin-top: 15px;
    background-color: white;
    padding: 0px 15px;
  }

  .mail_ship {
    padding-bottom: 15px;
    color: #333333;
    border-bottom: 1px solid #F0F0F0;
    padding: 12px 0px;
  }

  .shipping {
    color: #3E414;
    font-size: 16px;
    width: 90px;
    display: inline-block;

  }

  .mail_ship:last-child {
    border-bottom: none;
  }

  .input_text {
    font-size: 14px;
  }

  .address_check {
    display: inline-block;
    text-align: right;
    float: right;
  }

  .img {
    display: inline-block;
    width: 15px;
    float: right;
    height: 18px;
    margin-top: 4px;
    background-image: url(./img/zuola.png);
    margin-left: 5px;
  }

  .confirm_add {
    width: 70%;
    margin: 30px auto;
    background: #128E93;
    color: white;
    padding: 10px 20px;
    text-align: center;
    border-radius: 50px;
  }

  .dialog_bg {
    background-color: #000000;
    z-index: 99;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    position: absolute;
    top: 0px;
  }

  .dialog-footer {
    position: fixed;
    bottom: 0px;
    background-color: white;
    width: 100%;
    z-index: 999;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;

  }

  .dialog-top {
    padding: 20px 15px;
    border-bottom: 1px solid #EEEEEE;
    width: 100%;
    height: 60px
  }

  .top_title {
    display: inline-block;
    float: left;
    font-size: 16px;
    font-weight: bold;
    color: #333333 !important;
  }

  .top_img {
    display: inline-block;
    float: right;
  }

  .dialog-content {
    padding: 0px 15px;
  }

  .hover {
    display: none;
  }

  .myAddress {
    width: 100%;
    background-color: white;
    color: #333;
  }

  .myAddress .cont {
    border-bottom: 1px solid rgba(245, 245, 245, 0.8);
  }

  .myAddress .cont span {
    font-size: 0.6rem;
    color: #999999;
    line-height: 1.8rem;
  }

  .myAddress .cont section {
    float: left;
  }

  .myAddress .cont img {
    float: right;
    width: 0.28rem;
    height: 0.48rem;
    margin: 0.7rem 0.7rem 0.7rem 0;
  }

  .showChose {
    width: 100%;
    height: 250px;
    z-index: 120;
    overflow: scroll;

  }

  .address_body {
    bottom: 0;
    left: 0;
    z-index: 121;
    background: #fff;
    width: 100%;
    height: 100%;
  }

  .title {
    position: fixed;
    background: white;
    padding-bottom: 8px;
    width: 100%;
  }

  .title h4 {
    display: block;
    margin-left: 0.5rem;
    font-size: 0.7rem;
    line-height: 1.8rem;
    font-weight: normal;
    color: #999;

  }

  .cmy-address-box {
    padding-top: 30px !important;
  }

  .title span {
    display: block;
    margin-right: 0.5rem;
    font-size: 1rem;
    line-height: 0.78rem;
    color: #D8D8D8;
  }

  .area {
    display: inline-block;
    font-size: 0.7rem;
    line-height: 1rem;
    margin-left: 0.85rem;
    color: #333;
  }


  .addList {
    font-size: 0.7rem;
    line-height: 1.8rem;
    color: #333;
    min-width: 5rem;
  }

  /* 修改的格式 */
  .address_body ul {
    overflow: auto;
    flex-wrap: wrap;
    padding: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    align-items: flex-start;

  }

  .address_body .title .active {
    color: #0071B8;
    border-bottom: 0.05rem solid #0071B8;
  }

  .address_body ul .active {
    color: #0071B8;
  }

  .frequentCity {
    width: 100%;
  }

  .frequentCityTip {
    text-align: left;
    font-size: 0.6rem;
    margin: 0.6rem;
    font-weight: bold;
  }

  .frequentCityList {
    display: -webkit-box;
    /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
    display: -moz-box;
    /* Firefox 17- */
    display: -webkit-flex;
    /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
    display: -moz-flex;
    /* Firefox 18+ */
    display: -ms-flexbox;
    /* IE 10 */
    display: flex;
    /* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */
    flex-wrap: wrap;
    margin-right: 5%;
    margin-left: 5%;
  }

  .cityName {
    letter-spacing: 0.06rem;
    margin: 0.2rem 0.2rem 0.6rem 0.6rem;
    font-size: 0.6rem;
  }
</style>
