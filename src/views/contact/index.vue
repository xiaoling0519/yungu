<template>
  <div class="body_content">
    <div class="contact">
      <p class="contact_phone">微信昵称</p>
      <p class="contact_number">{{ list.user_name }}</p>
    </div>
    <div class="contact">
      <p class="contact_phone">联系电话</p>
      <p class="contact_number">{{ list.phone }}</p>
    </div>
    <div class="content-list">
      <p>一对一负责制：</p>
      <ul>
        <li>
          <div class="cmy-list-ls">
          <span class="cmy-l"></span>
          </div>
          <div class="content-r">如遇问题，请联系你的上级，具体联系方式如上列表，同理，你必须对你的下级负责。</div>
        </li>
        <li>
          <div class="cmy-list-ls">
          <span class="cmy-l"></span>
          </div>
          <div class="content-r">如有重大问题无法得以解决，可留言官方客服，我们会及时了解情况跟进处理。</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/javascript">
import { getlist } from '@/api/contact.js';
export default {
  data() {
    return {
      list: ''
    };
  },
  methods: {
    //获取数据
    loadList() {
      getlist({})
        .then(data => {
          this.list = data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.loadList();
  }
};
</script>
<style scoped="scoped">
.body_content {
  width: 100%;
  height: 100%;
  background-color: #f8f6f6;
}

.contact {
  background-color: white;
  padding: 15px 15px;
  border-bottom: 1px solid #f0f0f0;
}
p {
  font-size: 14px;
  color: ;
}

.contact_phone {
  display: inline-block;
}
.contact_number {
  display: inline-block;
  float: right;
}
.content-list {
  background-color: #ffffff;
  padding: 20px;
}
.content-list p {
  line-height: 1.5;
  font-size: 15px;
  padding-bottom: 15px;
}
.content-list li {
  font-size: 14px;
  line-height: 20px;
  display: flex;
  justify-content: space-between;
}
.cmy-list-ls{
  height: 20px;
  display: flex;
  align-items: center;
}
.cmy-l {
  display: inline-block;
  border-radius: 100px;
  background-color: #333333;
  height: 3px;
  width: 3px;
}
.content-r{
  text-indent: 1em;
}
</style>
